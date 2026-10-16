import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { DatabaseManager } from '../../src/storage/database.js';
import { JobStore } from '../../src/storage/job-store.js';
import { StaleLeaseReaper } from '../../src/engine/reaper.js';
import { Logger } from '../../src/logger/logger.js';

describe('Heartbeats & Stale Lease Recovery', () => {
  let dbManager: DatabaseManager;
  let jobStore: JobStore;
  let reaper: StaleLeaseReaper;
  const silentLogger = new Logger({ level: 'error' });

  beforeEach(() => {
    dbManager = new DatabaseManager({ filename: ':memory:', logger: silentLogger });
    jobStore = new JobStore(dbManager.getDatabase(), silentLogger);
    reaper = new StaleLeaseReaper(jobStore, { checkIntervalMs: 100 }, silentLogger);
  });

  afterEach(() => {
    reaper.stop();
    dbManager.close();
  });

  it('heartbeat extends lease_expires_at and updates heartbeat_at', () => {
    const job = jobStore.submitJob({ queue: 'hb-q', payload: {} });
    const leased = jobStore.leaseNextJob(['hb-q'], 'worker-alpha', 5000);
    expect(leased).not.toBeNull();

    const originalHeartbeat = leased!.heartbeat_at!;
    const originalExpires = leased!.lease_expires_at!;

    // Wait a brief moment to ensure timestamp advances
    const futureTime = Date.now() + 200;
    const success = jobStore.heartbeat(leased!.id, 'worker-alpha', 8000);
    expect(success).toBe(true);

    const updated = jobStore.getJob(leased!.id);
    expect(updated?.heartbeat_at).toBeGreaterThanOrEqual(originalHeartbeat);
    expect(updated?.lease_expires_at).toBeGreaterThan(originalExpires);
  });

  it('reclaims running job whose worker died (expired lease) and reschedules for retry', () => {
    const job = jobStore.submitJob({
      queue: 'crash-q',
      payload: {},
      max_retries: 3,
      backoff_strategy: 'fixed',
      backoff_base_ms: 100,
    });

    const leased = jobStore.leaseNextJob(['crash-q'], 'worker-crashed', 1000);
    expect(leased?.state).toBe('running');

    // Simulate worker crashing: fast forward lease_expires_at to the past
    const db = dbManager.getDatabase();
    db.prepare('UPDATE jobs SET lease_expires_at = ? WHERE id = ?').run(Date.now() - 5000, job.id);

    // Run reaper sweep
    const result = reaper.sweep();
    expect(result.recovered).toBe(1);

    const recoveredJob = jobStore.getJob(job.id);
    expect(recoveredJob?.state).toBe('scheduled');
    expect(recoveredJob?.retry_count).toBe(1);
    expect(recoveredJob?.last_error).toContain('Stale lease');
  });

  it('moves stale job to DLQ if max retries exceeded', () => {
    const job = jobStore.submitJob({
      queue: 'crash-q',
      payload: {},
      max_retries: 1, // Only 1 attempt allowed
    });

    jobStore.leaseNextJob(['crash-q'], 'worker-crashed', 1000);

    // Expire lease
    const db = dbManager.getDatabase();
    db.prepare('UPDATE jobs SET lease_expires_at = ? WHERE id = ?').run(Date.now() - 5000, job.id);

    const result = reaper.sweep();
    expect(result.recovered).toBe(1);

    const deadJob = jobStore.getJob(job.id);
    expect(deadJob?.state).toBe('dead');
    expect(deadJob?.retry_count).toBe(1);
    expect(deadJob?.last_error).toContain('max retries exceeded');
  });
});
