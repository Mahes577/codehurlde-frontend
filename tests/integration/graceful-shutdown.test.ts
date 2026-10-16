import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { DatabaseManager } from '../../src/storage/database.js';
import { JobStore } from '../../src/storage/job-store.js';
import { WorkerPool } from '../../src/engine/worker-pool.js';
import { Logger } from '../../src/logger/logger.js';

describe('Graceful Shutdown & Drain Timeout', () => {
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

  it('allows in-flight task to complete cleanly during graceful drain', async () => {
    const job = jobStore.submitJob({
      queue: 'drain-q',
      payload: { name: 'in-flight' },
    });

    let completed = false;

    const worker = new WorkerPool(
      jobStore,
      { queues: ['drain-q'], concurrency: 1, pollIntervalMs: 20 },
      silentLogger
    );

    worker.handle(async () => {
      // Simulate task taking 100ms
      await new Promise((res) => setTimeout(res, 100));
      completed = true;
    });

    worker.start();

    // Give worker time to lease the job
    await new Promise((res) => setTimeout(res, 30));

    // Initiate graceful stop with 1000ms drain timeout
    await worker.stop(1000);

    expect(completed).toBe(true);
    expect(jobStore.getJob(job.id)?.state).toBe('completed');
  });

  it('aborts stuck in-flight tasks when drain timeout is exceeded', async () => {
    jobStore.submitJob({
      queue: 'stuck-q',
      payload: { name: 'stuck' },
    });

    let aborted = false;

    const worker = new WorkerPool(
      jobStore,
      { queues: ['stuck-q'], concurrency: 1, pollIntervalMs: 20 },
      silentLogger
    );

    worker.handle(async (_, signal) => {
      signal.addEventListener('abort', () => {
        aborted = true;
      });
      // Hang indefinitely
      await new Promise((res) => setTimeout(res, 10000));
    });

    worker.start();

    // Wait until job is leased
    await new Promise((res) => setTimeout(res, 30));

    // Stop with short drain timeout of 80ms
    await worker.stop(80);

    expect(aborted).toBe(true);
  });
});
