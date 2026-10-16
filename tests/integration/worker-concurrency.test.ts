import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { DatabaseManager } from '../../src/storage/database.js';
import { JobStore } from '../../src/storage/job-store.js';
import { WorkerPool } from '../../src/engine/worker-pool.js';
import { Logger } from '../../src/logger/logger.js';

describe('Worker Pool Concurrency & Atomic Leasing', () => {
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

  it('atomically leases jobs across multiple distributed workers without duplicate execution', async () => {
    const jobCount = 20;
    for (let i = 0; i < jobCount; i++) {
      jobStore.submitJob({
        queue: 'concurrent-q',
        payload: { index: i },
      });
    }

    const executedJobIds = new Set<string>();
    let duplicates = 0;

    // Simulate 3 concurrent workers
    const workers: WorkerPool[] = [];
    for (let w = 0; w < 3; w++) {
      const worker = new WorkerPool(
        jobStore,
        {
          workerId: `worker-${w}`,
          queues: ['concurrent-q'],
          concurrency: 3,
          pollIntervalMs: 20,
        },
        silentLogger
      );

      worker.handle(async (job) => {
        if (executedJobIds.has(job.id)) {
          duplicates++;
        }
        executedJobIds.add(job.id);
        // Simulate async processing
        await new Promise((res) => setTimeout(res, 25));
      });

      workers.push(worker);
    }

    workers.forEach((w) => w.start());

    // Wait until all jobs are executed
    const deadline = Date.now() + 10000;
    while (executedJobIds.size < jobCount && Date.now() < deadline) {
      await new Promise((res) => setTimeout(res, 50));
    }

    await Promise.all(workers.map((w) => w.stop(2000)));

    expect(duplicates).toBe(0);
    expect(executedJobIds.size).toBe(jobCount);

    const metrics = jobStore.getMetrics('concurrent-q');
    expect(metrics.totalCompleted).toBe(jobCount);
    expect(metrics.totalPending).toBe(0);
    expect(metrics.totalRunning).toBe(0);
  });

  it('respects per-queue concurrency limits', async () => {
    // Fill queue with 10 long-running jobs
    for (let i = 0; i < 10; i++) {
      jobStore.submitJob({
        queue: 'throttled-q',
        payload: { index: i },
      });
    }

    let maxObservedActive = 0;
    let currentActive = 0;

    const worker = new WorkerPool(
      jobStore,
      {
        queues: ['throttled-q'],
        concurrency: 10,
        queueConcurrency: { 'throttled-q': 2 }, // Max 2 for this queue
        pollIntervalMs: 20,
      },
      silentLogger
    );

    worker.handle(async () => {
      currentActive++;
      maxObservedActive = Math.max(maxObservedActive, currentActive);
      await new Promise((res) => setTimeout(res, 100));
      currentActive--;
    });

    worker.start();

    // Allow workers to process for a bit
    await new Promise((res) => setTimeout(res, 350));
    await worker.stop(3000);

    expect(maxObservedActive).toBeLessThanOrEqual(2);
  });
});
