import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { DatabaseManager } from '../../src/storage/database.js';
import { JobStore } from '../../src/storage/job-store.js';
import { WorkerPool } from '../../src/engine/worker-pool.js';
import { Logger } from '../../src/logger/logger.js';

describe('Queue Pause & Resume Controls', () => {
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

  it('persists queue pause state in the database', () => {
    expect(jobStore.isQueuePaused('billing')).toBe(false);

    jobStore.pauseQueue('billing');
    expect(jobStore.isQueuePaused('billing')).toBe(true);
    expect(jobStore.getPausedQueues()).toContain('billing');

    jobStore.resumeQueue('billing');
    expect(jobStore.isQueuePaused('billing')).toBe(false);
    expect(jobStore.getPausedQueues()).not.toContain('billing');
  });

  it('prevents leasing jobs from paused queue while allowing unpaused queues to lease', () => {
    const jobA = jobStore.submitJob({ queue: 'paused-q', payload: { id: 'A' } });
    const jobB = jobStore.submitJob({ queue: 'active-q', payload: { id: 'B' } });

    jobStore.pauseQueue('paused-q');

    // Worker polls both queues
    const leased1 = jobStore.leaseNextJob(['paused-q', 'active-q'], 'worker-1', 5000);

    // Only jobB from active-q should be leased
    expect(leased1).not.toBeNull();
    expect(leased1?.id).toBe(jobB.id);
    expect(leased1?.queue).toBe('active-q');

    // Second lease attempt: only paused-q remains with pending jobs, so lease should return null
    const leased2 = jobStore.leaseNextJob(['paused-q', 'active-q'], 'worker-1', 5000);
    expect(leased2).toBeNull();

    // Verify jobA is still pending
    expect(jobStore.getJob(jobA.id)?.state).toBe('pending');

    // Resume paused-q
    jobStore.resumeQueue('paused-q');

    // Now jobA from paused-q can be leased!
    const leased3 = jobStore.leaseNextJob(['paused-q', 'active-q'], 'worker-1', 5000);
    expect(leased3).not.toBeNull();
    expect(leased3?.id).toBe(jobA.id);
  });

  it('allows in-flight jobs on a paused queue to complete cleanly', async () => {
    const job = jobStore.submitJob({
      queue: 'in-flight-pause-q',
      payload: { value: 42 },
    });

    let completed = false;

    const worker = new WorkerPool(
      jobStore,
      {
        queues: ['in-flight-pause-q'],
        concurrency: 1,
        pollIntervalMs: 20,
      },
      silentLogger
    );

    worker.handle('in-flight-pause-q', async () => {
      // While this job is actively running in the worker, pause the queue!
      jobStore.pauseQueue('in-flight-pause-q');
      expect(jobStore.isQueuePaused('in-flight-pause-q')).toBe(true);

      // Simulate some processing time
      await new Promise((res) => setTimeout(res, 80));
      completed = true;
    });

    worker.start();

    // Wait for in-flight job to finish
    const deadline = Date.now() + 3000;
    while (!completed && Date.now() < deadline) {
      await new Promise((res) => setTimeout(res, 30));
    }

    await worker.stop(1000);

    expect(completed).toBe(true);
    expect(jobStore.getJob(job.id)?.state).toBe('completed');
  });

  it('reports summary list of queues with pause state and counts', () => {
    jobStore.submitJob({ queue: 'alpha', payload: {} });
    jobStore.submitJob({ queue: 'alpha', payload: {} });
    jobStore.submitJob({ queue: 'beta', payload: {} });

    jobStore.pauseQueue('alpha');

    const summary = jobStore.listQueuesSummary();
    const alphaSummary = summary.find((q) => q.name === 'alpha');
    const betaSummary = summary.find((q) => q.name === 'beta');

    expect(alphaSummary).toBeDefined();
    expect(alphaSummary?.is_paused).toBe(true);
    expect(alphaSummary?.pending).toBe(2);

    expect(betaSummary).toBeDefined();
    expect(betaSummary?.is_paused).toBe(false);
    expect(betaSummary?.pending).toBe(1);
  });
});
