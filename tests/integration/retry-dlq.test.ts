import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { DatabaseManager } from '../../src/storage/database.js';
import { JobStore } from '../../src/storage/job-store.js';
import { WorkerPool } from '../../src/engine/worker-pool.js';
import { DLQManager } from '../../src/dlq/dlq-manager.js';
import { Logger } from '../../src/logger/logger.js';

describe('Retries & Dead Letter Queue (DLQ)', () => {
  let dbManager: DatabaseManager;
  let jobStore: JobStore;
  let dlqManager: DLQManager;
  const silentLogger = new Logger({ level: 'error' });

  beforeEach(() => {
    dbManager = new DatabaseManager({ filename: ':memory:', logger: silentLogger });
    jobStore = new JobStore(dbManager.getDatabase(), silentLogger);
    dlqManager = new DLQManager(jobStore, silentLogger);
  });

  afterEach(() => {
    dbManager.close();
  });

  it('moves job to DLQ (state: dead) once max_retries is exceeded', async () => {
    const job = jobStore.submitJob({
      queue: 'dlq-test',
      payload: { shouldFail: true },
      max_retries: 2,
      backoff_strategy: 'fixed',
      backoff_base_ms: 50, // fast retry for testing
    });

    let attemptCount = 0;

    const worker = new WorkerPool(
      jobStore,
      {
        queues: ['dlq-test'],
        concurrency: 1,
        pollIntervalMs: 20,
        reaperIntervalMs: 50,
      },
      silentLogger
    );

    worker.handle(async () => {
      attemptCount++;
      throw new Error(`Intentional test failure attempt ${attemptCount}`);
    });

    worker.start();

    // Wait until job is processed through retries and moves to dead state
    const deadline = Date.now() + 5000;
    while (Date.now() < deadline) {
      const current = jobStore.getJob(job.id);
      if (current?.state === 'dead') break;
      await new Promise((res) => setTimeout(res, 50));
    }

    await worker.stop(2000);

    const deadJob = jobStore.getJob(job.id);
    expect(deadJob?.state).toBe('dead');
    expect(deadJob?.retry_count).toBe(2);
    expect(deadJob?.last_error).toContain('Intentional test failure');

    // Verify DLQ list
    const deadJobs = dlqManager.list('dlq-test');
    expect(deadJobs.length).toBe(1);
    expect(deadJobs[0].id).toBe(job.id);
  });

  it('replays dead job back to pending and allows it to succeed', async () => {
    // Submit dead job directly or simulate failure
    const job = jobStore.submitJob({
      queue: 'dlq-test',
      payload: { failInitially: true },
      max_retries: 0,
    });

    // Mark it dead
    jobStore.markFailed(job.id, 'Initial crash', Date.now(), true);
    expect(jobStore.getJob(job.id)?.state).toBe('dead');

    // Replay it
    const replayed = dlqManager.replay(job.id);
    expect(replayed).toBe(true);

    const replayedJob = jobStore.getJob(job.id);
    expect(replayedJob?.state).toBe('pending');
    expect(replayedJob?.retry_count).toBe(0);
    expect(replayedJob?.last_error).toBeNull();

    // Now run worker to complete it
    let executed = false;
    const worker = new WorkerPool(
      jobStore,
      { queues: ['dlq-test'], concurrency: 1, pollIntervalMs: 20 },
      silentLogger
    );

    worker.handle(async () => {
      executed = true;
    });

    worker.start();
    await new Promise((res) => setTimeout(res, 150));
    await worker.stop(1000);

    expect(executed).toBe(true);
    expect(jobStore.getJob(job.id)?.state).toBe('completed');
  });

  it('purges dead jobs from DLQ', () => {
    const job = jobStore.submitJob({ queue: 'dlq-test', payload: {} });
    jobStore.markFailed(job.id, 'Died', Date.now(), true);

    expect(dlqManager.list('dlq-test').length).toBe(1);

    const purged = dlqManager.purge(job.id);
    expect(purged).toBe(true);
    expect(dlqManager.list('dlq-test').length).toBe(0);
    expect(jobStore.getJob(job.id)).toBeNull();
  });
});
