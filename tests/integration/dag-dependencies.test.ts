import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { DatabaseManager } from '../../src/storage/database.js';
import { JobStore } from '../../src/storage/job-store.js';
import { WorkerPool } from '../../src/engine/worker-pool.js';
import { Logger } from '../../src/logger/logger.js';
import { CycleDetectedError } from '../../src/types/dag.js';

describe('Job Dependency DAG Execution & Cascading', () => {
  let dbManager: DatabaseManager;
  let jobStore: JobStore;
  const silentLogger = new Logger({ level: 'error' });

  beforeEach(() => {
    dbManager = new DatabaseManager({ filename: ':memory:', logger: silentLogger });
    jobStore = new JobStore(dbManager.getDatabase(), silentLogger);
  });

  afterEach(() => {
    dbManager.close();
  });

  it('rejects submission of cyclic job dependencies', () => {
    expect(() => {
      jobStore.submitJobsBatch([
        { id: 'job-A', queue: 'dag', payload: {}, parents: ['job-B'] },
        { id: 'job-B', queue: 'dag', payload: {}, parents: ['job-A'] },
      ]);
    }).toThrowError(CycleDetectedError);
  });

  it('executes linear dependency chain in strict sequential order (Parent -> Child -> Grandchild)', async () => {
    const executionOrder: string[] = [];

    // Create 3 jobs: A (no parents), B (parent A), C (parent B)
    const jobs = jobStore.submitJobsBatch([
      { id: 'task-A', queue: 'dag', payload: { name: 'A' } },
      { id: 'task-B', queue: 'dag', payload: { name: 'B' }, parents: ['task-A'] },
      { id: 'task-C', queue: 'dag', payload: { name: 'C' }, parents: ['task-B'] },
    ]);

    expect(jobs[0].state).toBe('pending');
    expect(jobs[1].state).toBe('scheduled');
    expect(jobs[2].state).toBe('scheduled');

    const worker = new WorkerPool(
      jobStore,
      {
        queues: ['dag'],
        concurrency: 5, // high concurrency to prove ordering is enforced by DAG
        pollIntervalMs: 20,
      },
      silentLogger
    );

    worker.handle(async (job) => {
      executionOrder.push(job.id);
      await new Promise((res) => setTimeout(res, 30));
    });

    worker.start();

    // Wait until all 3 jobs complete
    const deadline = Date.now() + 5000;
    while (executionOrder.length < 3 && Date.now() < deadline) {
      await new Promise((res) => setTimeout(res, 40));
    }

    await worker.stop(2000);

    expect(executionOrder).toEqual(['task-A', 'task-B', 'task-C']);

    const jobA = jobStore.getJob('task-A');
    const jobB = jobStore.getJob('task-B');
    const jobC = jobStore.getJob('task-C');

    expect(jobA?.state).toBe('completed');
    expect(jobB?.state).toBe('completed');
    expect(jobC?.state).toBe('completed');
  });

  it('cascades cancellation/blocked to downstream dependents when a parent reaches dead letter', async () => {
    // Parent A will fail and die immediately (max_retries: 0)
    jobStore.submitJobsBatch([
      {
        id: 'failing-parent',
        queue: 'dag',
        payload: { shouldFail: true },
        max_retries: 0,
      },
      {
        id: 'child-1',
        queue: 'dag',
        payload: { name: 'child-1' },
        parents: ['failing-parent'],
      },
      {
        id: 'grandchild-1',
        queue: 'dag',
        payload: { name: 'grandchild-1' },
        parents: ['child-1'],
      },
    ]);

    const executedIds: string[] = [];

    const worker = new WorkerPool(
      jobStore,
      {
        queues: ['dag'],
        concurrency: 3,
        pollIntervalMs: 20,
      },
      silentLogger
    );

    worker.handle(async (job) => {
      executedIds.push(job.id);
      if ((job.payload as any)?.shouldFail) {
        throw new Error('Fatal parent error');
      }
    });

    worker.start();

    // Give it time to process and cascade
    await new Promise((res) => setTimeout(res, 300));
    await worker.stop(2000);

    const parent = jobStore.getJob('failing-parent');
    const child = jobStore.getJob('child-1');
    const grandchild = jobStore.getJob('grandchild-1');

    expect(parent?.state).toBe('dead');
    expect(child?.state).toBe('canceled');
    expect(grandchild?.state).toBe('canceled');
    expect(executedIds).toEqual(['failing-parent']);
  });
});
