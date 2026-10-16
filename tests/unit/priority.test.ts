import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { DatabaseManager } from '../../src/storage/database.js';
import { JobStore } from '../../src/storage/job-store.js';
import { JobPriority } from '../../src/types/job.js';

describe('Job Priority & Scheduling Order', () => {
  let dbManager: DatabaseManager;
  let jobStore: JobStore;

  beforeEach(() => {
    dbManager = new DatabaseManager({ filename: ':memory:' });
    jobStore = new JobStore(dbManager.getDatabase());
  });

  afterEach(() => {
    dbManager.close();
  });

  it('leases critical priority (0) jobs before high (1), normal (2), and low (3)', () => {
    // Submit in reverse priority order
    const jobLow = jobStore.submitJob({
      queue: 'test',
      payload: { name: 'low' },
      priority: JobPriority.LOW, // 3
    });

    const jobNormal = jobStore.submitJob({
      queue: 'test',
      payload: { name: 'normal' },
      priority: JobPriority.NORMAL, // 2
    });

    const jobHigh = jobStore.submitJob({
      queue: 'test',
      payload: { name: 'high' },
      priority: JobPriority.HIGH, // 1
    });

    const jobCritical = jobStore.submitJob({
      queue: 'test',
      payload: { name: 'critical' },
      priority: JobPriority.CRITICAL, // 0
    });

    const leasedOrder: string[] = [];

    for (let i = 0; i < 4; i++) {
      const leased = jobStore.leaseNextJob(['test'], `worker-${i}`, 10000);
      expect(leased).not.toBeNull();
      leasedOrder.push(leased!.id);
    }

    expect(leasedOrder).toEqual([
      jobCritical.id,
      jobHigh.id,
      jobNormal.id,
      jobLow.id,
    ]);
  });

  it('breaks ties among same priority by run_at ASC, then created_at ASC', async () => {
    const now = Date.now();

    // 2 jobs with same priority, but jobA run_at is earlier
    const jobB = jobStore.submitJob({
      queue: 'test',
      payload: { name: 'B' },
      priority: JobPriority.NORMAL,
      run_at: now - 50,
    });

    const jobA = jobStore.submitJob({
      queue: 'test',
      payload: { name: 'A' },
      priority: JobPriority.NORMAL,
      run_at: now - 100,
    });

    const first = jobStore.leaseNextJob(['test'], 'w1', 10000);
    expect(first?.id).toBe(jobA.id);

    const second = jobStore.leaseNextJob(['test'], 'w2', 10000);
    expect(second?.id).toBe(jobB.id);
  });
});
