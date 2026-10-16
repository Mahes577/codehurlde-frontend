import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { DatabaseManager } from '../../src/storage/database.js';
import { JobStore } from '../../src/storage/job-store.js';
import { WorkerPool } from '../../src/engine/worker-pool.js';
import { Logger } from '../../src/logger/logger.js';

describe('Delayed Jobs Execution', () => {
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

  it('delays execution until delay_ms has elapsed', async () => {
    const delayMs = 150;
    const submittedAt = Date.now();

    const job = jobStore.submitJob({
      queue: 'delayed-q',
      payload: { message: 'hello after delay' },
      delay_ms: delayMs,
    });

    expect(job.state).toBe('scheduled');
    expect(job.run_at).toBeGreaterThanOrEqual(submittedAt + delayMs);

    // Immediate lease should return null
    const immediateLease = jobStore.leaseNextJob(['delayed-q'], 'w1', 5000);
    expect(immediateLease).toBeNull();

    let executedAt = 0;

    const worker = new WorkerPool(
      jobStore,
      {
        queues: ['delayed-q'],
        concurrency: 1,
        pollIntervalMs: 20,
        reaperIntervalMs: 50, // Reaper will promote scheduled jobs whose run_at <= now
      },
      silentLogger
    );

    worker.handle(async () => {
      executedAt = Date.now();
    });

    worker.start();

    // Wait for delayed execution
    const deadline = Date.now() + 3000;
    while (executedAt === 0 && Date.now() < deadline) {
      await new Promise((res) => setTimeout(res, 30));
    }

    await worker.stop(1000);

    expect(executedAt).toBeGreaterThanOrEqual(submittedAt + delayMs - 10);
    expect(jobStore.getJob(job.id)?.state).toBe('completed');
  });
});
