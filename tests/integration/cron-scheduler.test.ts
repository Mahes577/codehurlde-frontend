import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { DatabaseManager } from '../../src/storage/database.js';
import { JobStore } from '../../src/storage/job-store.js';
import { CronScheduler } from '../../src/scheduler/cron-scheduler.js';
import { Logger } from '../../src/logger/logger.js';

describe('Recurring Cron Scheduler & Overlap Prevention', () => {
  let dbManager: DatabaseManager;
  let jobStore: JobStore;
  let scheduler: CronScheduler;
  const silentLogger = new Logger({ level: 'error' });

  beforeEach(() => {
    dbManager = new DatabaseManager({ filename: ':memory:', logger: silentLogger });
    jobStore = new JobStore(dbManager.getDatabase(), silentLogger);
    scheduler = new CronScheduler(dbManager.getDatabase(), jobStore, silentLogger);
  });

  afterEach(() => {
    scheduler.stop();
    dbManager.close();
  });

  it('registers and evaluates fixed-interval recurring jobs', () => {
    const reg = scheduler.register({
      name: 'cleanup-task',
      queue: 'maintenance',
      interval_ms: 1000,
      payload: { action: 'clean' },
    });

    expect(reg.name).toBe('cleanup-task');
    expect(reg.interval_ms).toBe(1000);
    expect(reg.prevent_overlap).toBe(true);

    // Fast-forward time past next_run_at
    const futureTime = reg.next_run_at + 10;
    const triggered = scheduler.evaluateAndTrigger(futureTime);
    expect(triggered).toBe(1);

    const updatedCron = scheduler.get('cleanup-task');
    expect(updatedCron?.last_job_id).toBeDefined();
    expect(updatedCron?.last_run_at).toBe(futureTime);

    const queuedJob = jobStore.getJob(updatedCron!.last_job_id!);
    expect(queuedJob).not.toBeNull();
    expect(queuedJob?.queue).toBe('maintenance');
    expect(queuedJob?.payload).toEqual({ action: 'clean' });
  });

  it('prevents overlapping runs when previous instance is still running', () => {
    scheduler.register({
      name: 'heavy-sync',
      queue: 'sync',
      interval_ms: 500,
      prevent_overlap: true,
    });

    const cron = scheduler.get('heavy-sync')!;

    // 1st trigger
    scheduler.evaluateAndTrigger(cron.next_run_at + 10);
    const afterFirst = scheduler.get('heavy-sync')!;
    const firstJobId = afterFirst.last_job_id!;

    // Lease the first job so it enters 'running' state
    const leased = jobStore.leaseNextJob(['sync'], 'worker-1', 10000);
    expect(leased?.id).toBe(firstJobId);
    expect(leased?.state).toBe('running');

    // Attempt 2nd trigger while 1st is still 'running'
    const triggeredSecond = scheduler.evaluateAndTrigger(afterFirst.next_run_at + 10);
    expect(triggeredSecond).toBe(0); // SKIPPED because of overlap!

    // Now complete the first job
    jobStore.markCompleted(firstJobId);

    // Now 3rd trigger should succeed
    const afterSecond = scheduler.get('heavy-sync')!;
    const triggeredThird = scheduler.evaluateAndTrigger(afterSecond.next_run_at + 10);
    expect(triggeredThird).toBe(1);
  });
});
