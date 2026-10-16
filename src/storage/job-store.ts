import Database from 'better-sqlite3';
import { v4 as uuidv4 } from 'uuid';
import {
  Job,
  JobRow,
  JobState,
  JobPriority,
  CreateJobInput,
  JobFilter,
  BackoffStrategy,
} from '../types/job.js';
import { CycleDetectedError, JobNotFoundError } from '../types/dag.js';
import { CycleDetector } from '../dag/cycle-detector.js';
import { Logger, logger } from '../logger/logger.js';

export class JobStore {
  private db: Database.Database;
  private log: Logger;

  constructor(db: Database.Database, customLogger?: Logger) {
    this.db = db;
    this.log = customLogger ?? logger.child('job-store');
  }

  private mapRowToJob<T = unknown>(row: JobRow): Job<T> {
    return {
      id: row.id,
      queue: row.queue,
      payload: JSON.parse(row.payload) as T,
      priority: row.priority as JobPriority,
      state: row.state as JobState,
      max_retries: row.max_retries,
      retry_count: row.retry_count,
      backoff_strategy: row.backoff_strategy as BackoffStrategy,
      backoff_base_ms: row.backoff_base_ms,
      timeout_ms: row.timeout_ms,
      run_at: row.run_at,
      created_at: row.created_at,
      started_at: row.started_at,
      completed_at: row.completed_at,
      last_error: row.last_error,
      worker_id: row.worker_id,
      heartbeat_at: row.heartbeat_at,
      lease_expires_at: row.lease_expires_at,
      webhook_url: row.webhook_url ?? null,
      webhook_headers: row.webhook_headers ? JSON.parse(row.webhook_headers) : null,
      version: row.version,
    };
  }

  /**
   * Submit a single job with optional dependencies.
   */
  public submitJob<T = unknown>(input: CreateJobInput<T>): Job<T> {
    const jobs = this.submitJobsBatch([input]);
    return jobs[0] as Job<T>;
  }

  /**
   * Submit a batch of jobs with DAG cycle detection.
   */
  public submitJobsBatch<T = unknown>(inputs: CreateJobInput<T>[]): Job<T>[] {
    if (inputs.length === 0) return [];

    const now = Date.now();

    // Prepare job models
    const jobsToInsert = inputs.map((input) => {
      const id = input.id ?? uuidv4();
      const queue = input.queue ?? 'default';
      const priority = input.priority !== undefined ? Number(input.priority) : JobPriority.NORMAL;
      const maxRetries = input.max_retries !== undefined ? input.max_retries : 3;
      const backoffStrategy = input.backoff_strategy ?? 'exponential';
      const backoffBaseMs = input.backoff_base_ms ?? 1000;
      const timeoutMs = input.timeout_ms ?? 30000;
      const parents = input.parents ?? [];

      let runAt: number;
      if (input.run_at instanceof Date) {
        runAt = input.run_at.getTime();
      } else if (typeof input.run_at === 'number') {
        runAt = input.run_at;
      } else if (input.delay_ms && input.delay_ms > 0) {
        runAt = now + input.delay_ms;
      } else {
        runAt = now;
      }

      const webhookUrl = input.webhook_url ?? null;
      const webhookHeaders = input.webhook_headers ? JSON.stringify(input.webhook_headers) : null;

      return {
        id,
        queue,
        payload: input.payload,
        priority,
        maxRetries,
        backoffStrategy,
        backoffBaseMs,
        timeoutMs,
        runAt,
        parents,
        webhookUrl,
        webhookHeaders,
      };
    });

    // Check for cycles
    // 1. Fetch existing dependencies from database
    const existingDepsRows = this.db
      .prepare('SELECT job_id, parent_job_id FROM job_dependencies')
      .all() as { job_id: string; parent_job_id: string }[];

    const existingParentsMap = new Map<string, string[]>();
    for (const row of existingDepsRows) {
      if (!existingParentsMap.has(row.job_id)) {
        existingParentsMap.set(row.job_id, []);
      }
      existingParentsMap.get(row.job_id)!.push(row.parent_job_id);
    }

    // 2. New dependencies
    const newParentsMap = new Map<string, string[]>();
    for (const job of jobsToInsert) {
      if (job.parents.length > 0) {
        newParentsMap.set(job.id, job.parents);
      }
    }

    // Validate cycle
    const cycleCheck = CycleDetector.detectCycle(existingParentsMap, newParentsMap);
    if (cycleCheck.hasCycle) {
      throw new CycleDetectedError(cycleCheck.cyclePath || []);
    }

    // Perform atomic insertion in transaction
    const insertTransaction = this.db.transaction(() => {
      const insertJobStmt = this.db.prepare(`
        INSERT INTO jobs (
          id, queue, payload, priority, state, max_retries, retry_count,
          backoff_strategy, backoff_base_ms, timeout_ms, run_at, created_at,
          started_at, completed_at, last_error, worker_id, heartbeat_at,
          lease_expires_at, webhook_url, webhook_headers, version
        ) VALUES (
          ?, ?, ?, ?, ?, ?, 0,
          ?, ?, ?, ?, ?,
          NULL, NULL, NULL, NULL, NULL,
          NULL, ?, ?, 0
        )
      `);

      const insertDepStmt = this.db.prepare(`
        INSERT INTO job_dependencies (job_id, parent_job_id)
        VALUES (?, ?)
      `);

      const checkParentStmt = this.db.prepare(`
        SELECT id, state FROM jobs WHERE id = ?
      `);

      const insertedJobs: Job<T>[] = [];

      for (const item of jobsToInsert) {
        // Determine initial state:
        // If it has parents, check their statuses
        let state: JobState = 'pending';

        if (item.parents.length > 0) {
          let allParentsCompleted = true;
          let anyParentFailedOrDead = false;

          for (const parentId of item.parents) {
            const parentRow = checkParentStmt.get(parentId) as { id: string; state: string } | undefined;
            if (!parentRow) {
              // Parent could be in this current batch
              const batchParent = jobsToInsert.find((j) => j.id === parentId);
              if (!batchParent) {
                throw new JobNotFoundError(parentId);
              }
              // It's in the batch, so it's not completed yet
              allParentsCompleted = false;
            } else {
              if (parentRow.state === 'dead' || parentRow.state === 'failed' || parentRow.state === 'canceled') {
                anyParentFailedOrDead = true;
              } else if (parentRow.state !== 'completed') {
                allParentsCompleted = false;
              }
            }
          }

          if (anyParentFailedOrDead) {
            state = 'blocked';
          } else if (!allParentsCompleted) {
            state = 'scheduled';
          } else {
            // All completed, check runAt
            state = item.runAt > now ? 'scheduled' : 'pending';
          }
        } else {
          state = item.runAt > now ? 'scheduled' : 'pending';
        }

        insertJobStmt.run(
          item.id,
          item.queue,
          JSON.stringify(item.payload),
          item.priority,
          state,
          item.maxRetries,
          item.backoffStrategy,
          item.backoffBaseMs,
          item.timeoutMs,
          item.runAt,
          now,
          item.webhookUrl,
          item.webhookHeaders
        );

        for (const parentId of item.parents) {
          insertDepStmt.run(item.id, parentId);
        }

        insertedJobs.push({
          id: item.id,
          queue: item.queue,
          payload: item.payload,
          priority: item.priority as JobPriority,
          state,
          max_retries: item.maxRetries,
          retry_count: 0,
          backoff_strategy: item.backoffStrategy as BackoffStrategy,
          backoff_base_ms: item.backoffBaseMs,
          timeout_ms: item.timeoutMs,
          run_at: item.runAt,
          created_at: now,
          started_at: null,
          completed_at: null,
          last_error: null,
          worker_id: null,
          heartbeat_at: null,
          lease_expires_at: null,
          webhook_url: item.webhookUrl,
          webhook_headers: item.webhookHeaders ? JSON.parse(item.webhookHeaders) : null,
          version: 0,
        });
      }

      return insertedJobs;
    });

    return insertTransaction();
  }

  /**
   * Get job by ID.
   */
  public getJob<T = unknown>(id: string): Job<T> | null {
    const row = this.db.prepare('SELECT * FROM jobs WHERE id = ?').get(id) as JobRow | undefined;
    if (!row) return null;
    return this.mapRowToJob<T>(row);
  }

  /**
   * Get parent IDs for a job.
   */
  public getParents(jobId: string): string[] {
    const rows = this.db
      .prepare('SELECT parent_job_id FROM job_dependencies WHERE job_id = ?')
      .all(jobId) as { parent_job_id: string }[];
    return rows.map((r) => r.parent_job_id);
  }

  /**
   * Get child IDs for a job.
   */
  public getChildren(jobId: string): string[] {
    const rows = this.db
      .prepare('SELECT job_id FROM job_dependencies WHERE parent_job_id = ?')
      .all(jobId) as { job_id: string }[];
    return rows.map((r) => r.job_id);
  }

  /**
   * List jobs by filter.
   */
  public listJobs<T = unknown>(filter: JobFilter = {}): Job<T>[] {
    const conditions: string[] = [];
    const params: (string | number)[] = [];

    if (filter.queue) {
      conditions.push('queue = ?');
      params.push(filter.queue);
    }

    if (filter.state) {
      if (Array.isArray(filter.state)) {
        const placeholders = filter.state.map(() => '?').join(',');
        conditions.push(`state IN (${placeholders})`);
        params.push(...filter.state);
      } else {
        conditions.push('state = ?');
        params.push(filter.state);
      }
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';
    const orderClause = `ORDER BY created_at ${filter.order === 'ASC' ? 'ASC' : 'DESC'}`;
    const limitClause = filter.limit ? `LIMIT ${filter.limit}` : '';
    const offsetClause = filter.offset ? `OFFSET ${filter.offset}` : '';

    const sql = `SELECT * FROM jobs ${whereClause} ${orderClause} ${limitClause} ${offsetClause}`;
    const rows = this.db.prepare(sql).all(...params) as JobRow[];

    return rows.map((r) => this.mapRowToJob<T>(r));
  }

  /**
   * Atomic optimistic lease of the next eligible job for given queues.
   */
  public leaseNextJob<T = unknown>(
    queues: string[],
    workerId: string,
    leaseDurationMs: number
  ): Job<T> | null {
    if (queues.length === 0) return null;

    const now = Date.now();
    const leaseExpiresAt = now + leaseDurationMs;
    const placeholders = queues.map(() => '?').join(',');

    const selectSql = `
      SELECT * FROM jobs
      WHERE state = 'pending'
        AND queue IN (${placeholders})
        AND queue NOT IN (SELECT name FROM queues WHERE is_paused = 1)
        AND run_at <= ?
      ORDER BY priority ASC, run_at ASC, created_at ASC
      LIMIT 1
    `;

    const leaseTx = this.db.transaction(() => {
      const candidate = this.db.prepare(selectSql).get(...queues, now) as JobRow | undefined;
      if (!candidate) return null;

      const updateStmt = this.db.prepare(`
        UPDATE jobs
        SET state = 'running',
            worker_id = ?,
            started_at = ?,
            heartbeat_at = ?,
            lease_expires_at = ?,
            version = version + 1
        WHERE id = ? AND version = ? AND state = 'pending'
      `);

      const result = updateStmt.run(
        workerId,
        now,
        now,
        leaseExpiresAt,
        candidate.id,
        candidate.version
      );

      if (result.changes === 1) {
        candidate.state = 'running';
        candidate.worker_id = workerId;
        candidate.started_at = now;
        candidate.heartbeat_at = now;
        candidate.lease_expires_at = leaseExpiresAt;
        candidate.version += 1;
        return this.mapRowToJob<T>(candidate);
      }

      // Optimistic concurrency collision, caller will retry next poll
      return null;
    });

    return leaseTx();
  }

  /**
   * Heartbeat for an in-flight job lease extension.
   */
  public heartbeat(jobId: string, workerId: string, leaseDurationMs: number): boolean {
    const now = Date.now();
    const leaseExpiresAt = now + leaseDurationMs;

    const result = this.db
      .prepare(`
        UPDATE jobs
        SET heartbeat_at = ?,
            lease_expires_at = ?
        WHERE id = ? AND worker_id = ? AND state = 'running'
      `)
      .run(now, leaseExpiresAt, jobId, workerId);

    return result.changes > 0;
  }

  /**
   * Complete a job and cascade dependency resolution to children.
   */
  public markCompleted(jobId: string, workerId?: string): void {
    const now = Date.now();

    const completeTx = this.db.transaction(() => {
      // 1. Mark job completed
      const updateStmt = this.db.prepare(`
        UPDATE jobs
        SET state = 'completed',
            completed_at = ?,
            lease_expires_at = NULL
        WHERE id = ?
      `);
      updateStmt.run(now, jobId);

      // 2. Cascade to downstream dependent children
      const childrenRows = this.db
        .prepare('SELECT job_id FROM job_dependencies WHERE parent_job_id = ?')
        .all(jobId) as { job_id: string }[];

      for (const child of childrenRows) {
        this.checkAndPromoteDependentJob(child.job_id, now);
      }
    });

    completeTx();
  }

  /**
   * Check if all parents of a dependent job are completed.
   * If yes, and job is currently scheduled or blocked, transition to pending (or scheduled if run_at > now).
   */
  private checkAndPromoteDependentJob(jobId: string, now: number): void {
    const job = this.db.prepare('SELECT * FROM jobs WHERE id = ?').get(jobId) as JobRow | undefined;
    if (!job) return;

    // Only promote if currently in scheduled or blocked state
    if (job.state !== 'scheduled' && job.state !== 'blocked') return;

    // Check all parents
    const parentStatuses = this.db
      .prepare(`
        SELECT j.state FROM jobs j
        JOIN job_dependencies d ON j.id = d.parent_job_id
        WHERE d.job_id = ?
      `)
      .all(jobId) as { state: string }[];

    const anyFailedOrDead = parentStatuses.some(
      (p) => p.state === 'dead' || p.state === 'failed' || p.state === 'canceled'
    );

    if (anyFailedOrDead) {
      // Cascade cancellation / blocked
      this.cascadeCancelDownstream(jobId, 'Parent dependency failed or reached dead letter');
      return;
    }

    const allCompleted = parentStatuses.every((p) => p.state === 'completed');
    if (allCompleted) {
      const newState: JobState = job.run_at <= now ? 'pending' : 'scheduled';
      this.db
        .prepare('UPDATE jobs SET state = ? WHERE id = ?')
        .run(newState, jobId);
      this.log.info(`Promoted dependent job ${jobId} to ${newState}`);
    }
  }

  /**
   * Mark a job as failed, reschedule with backoff, or move to DLQ (dead).
   */
  public markFailed(
    jobId: string,
    error: string,
    nextRunAt: number,
    isDead: boolean
  ): void {
    const now = Date.now();

    const failTx = this.db.transaction(() => {
      if (isDead) {
        // Move to dead letter queue
        this.db
          .prepare(`
            UPDATE jobs
            SET state = 'dead',
                retry_count = retry_count + 1,
                last_error = ?,
                completed_at = ?,
                lease_expires_at = NULL,
                worker_id = NULL
            WHERE id = ?
          `)
          .run(error, now, jobId);

        this.log.warn(`Job ${jobId} moved to DLQ (dead): ${error}`);

        // Cascade failure to all downstream dependents
        this.cascadeCancelDownstream(jobId, `Upstream parent job ${jobId} failed`);
      } else {
        // Reschedule for retry
        this.db
          .prepare(`
            UPDATE jobs
            SET state = 'scheduled',
                retry_count = retry_count + 1,
                last_error = ?,
                run_at = ?,
                lease_expires_at = NULL,
                worker_id = NULL
            WHERE id = ?
          `)
          .run(error, nextRunAt, jobId);

        this.log.info(`Job ${jobId} scheduled for retry at ${new Date(nextRunAt).toISOString()}`);
      }
    });

    failTx();
  }

  /**
   * Recursively cancel downstream dependent jobs.
   */
  public cascadeCancelDownstream(parentJobId: string, reason: string): void {
    const visited = new Set<string>();
    const now = Date.now();

    const queue: string[] = [parentJobId];

    const cancelStmt = this.db.prepare(`
      UPDATE jobs
      SET state = 'canceled',
          last_error = ?,
          completed_at = ?,
          lease_expires_at = NULL,
          worker_id = NULL
      WHERE id = ? AND state IN ('pending', 'scheduled', 'blocked')
    `);

    const getChildrenStmt = this.db.prepare(`
      SELECT job_id FROM job_dependencies WHERE parent_job_id = ?
    `);

    while (queue.length > 0) {
      const current = queue.shift()!;
      const children = getChildrenStmt.all(current) as { job_id: string }[];

      for (const child of children) {
        if (!visited.has(child.job_id)) {
          visited.add(child.job_id);
          cancelStmt.run(reason, now, child.job_id);
          queue.push(child.job_id);
        }
      }
    }
  }

  /**
   * Cancel an individual job and cascade to downstream dependents.
   */
  public cancelJob(jobId: string, reason = 'Manually canceled'): boolean {
    const now = Date.now();
    const cancelTx = this.db.transaction(() => {
      const result = this.db
        .prepare(`
          UPDATE jobs
          SET state = 'canceled',
              last_error = ?,
              completed_at = ?,
              lease_expires_at = NULL,
              worker_id = NULL
          WHERE id = ? AND state NOT IN ('completed', 'canceled')
        `)
        .run(reason, now, jobId);

      if (result.changes > 0) {
        this.cascadeCancelDownstream(jobId, reason);
        return true;
      }
      return false;
    });

    return cancelTx();
  }

  /**
   * Find stale running jobs whose leases expired.
   */
  public findStaleRunningJobs(now: number): Job[] {
    const rows = this.db
      .prepare(`
        SELECT * FROM jobs
        WHERE state = 'running'
          AND lease_expires_at IS NOT NULL
          AND lease_expires_at < ?
      `)
      .all(now) as JobRow[];

    return rows.map((r) => this.mapRowToJob(r));
  }

  /**
   * Promote scheduled/delayed jobs whose run_at has passed and whose dependencies are met.
   */
  public promoteScheduledJobs(now: number): number {
    const promoteTx = this.db.transaction(() => {
      // Find candidate scheduled jobs whose run_at <= now
      const candidates = this.db
        .prepare(`
          SELECT j.id FROM jobs j
          WHERE j.state = 'scheduled'
            AND j.run_at <= ?
        `)
        .all(now) as { id: string }[];

      let count = 0;
      for (const candidate of candidates) {
        // Check if all parents are completed
        const uncompletedParents = this.db
          .prepare(`
            SELECT count(*) as count FROM job_dependencies d
            JOIN jobs p ON d.parent_job_id = p.id
            WHERE d.job_id = ? AND p.state != 'completed'
          `)
          .get(candidate.id) as { count: number };

        if (uncompletedParents.count === 0) {
          const res = this.db
            .prepare(`UPDATE jobs SET state = 'pending' WHERE id = ? AND state = 'scheduled'`)
            .run(candidate.id);
          count += res.changes;
        }
      }
      return count;
    });

    return promoteTx();
  }

  /**
   * Dead Letter Queue (DLQ) operations.
   */
  public listDeadJobs<T = unknown>(queue?: string, limit = 50, offset = 0): Job<T>[] {
    let sql = `SELECT * FROM jobs WHERE state = 'dead'`;
    const params: (string | number)[] = [];

    if (queue) {
      sql += ' AND queue = ?';
      params.push(queue);
    }

    sql += ' ORDER BY completed_at DESC LIMIT ? OFFSET ?';
    params.push(limit, offset);

    const rows = this.db.prepare(sql).all(...params) as JobRow[];
    return rows.map((r) => this.mapRowToJob<T>(r));
  }

  public replayDeadJob(jobId: string): boolean {
    const now = Date.now();
    const result = this.db
      .prepare(`
        UPDATE jobs
        SET state = 'pending',
            retry_count = 0,
            last_error = NULL,
            run_at = ?,
            started_at = NULL,
            completed_at = NULL,
            worker_id = NULL,
            heartbeat_at = NULL,
            lease_expires_at = NULL,
            version = version + 1
        WHERE id = ? AND state = 'dead'
      `)
      .run(now, jobId);

    return result.changes > 0;
  }

  public replayAllDeadJobs(queue?: string): number {
    const now = Date.now();
    let sql = `
      UPDATE jobs
      SET state = 'pending',
          retry_count = 0,
          last_error = NULL,
          run_at = ?,
          started_at = NULL,
          completed_at = NULL,
          worker_id = NULL,
          heartbeat_at = NULL,
          lease_expires_at = NULL,
          version = version + 1
      WHERE state = 'dead'
    `;
    const params: (string | number)[] = [now];

    if (queue) {
      sql += ' AND queue = ?';
      params.push(queue);
    }

    const result = this.db.prepare(sql).run(...params);
    return result.changes;
  }

  public purgeDeadJob(jobId: string): boolean {
    const purgeTx = this.db.transaction(() => {
      this.db.prepare('DELETE FROM job_dependencies WHERE job_id = ? OR parent_job_id = ?').run(jobId, jobId);
      const res = this.db.prepare(`DELETE FROM jobs WHERE id = ? AND state = 'dead'`).run(jobId);
      return res.changes > 0;
    });

    return purgeTx();
  }

  public purgeAllDeadJobs(queue?: string): number {
    const purgeTx = this.db.transaction(() => {
      let selectSql = `SELECT id FROM jobs WHERE state = 'dead'`;
      const params: string[] = [];
      if (queue) {
        selectSql += ' AND queue = ?';
        params.push(queue);
      }
      const deadRows = this.db.prepare(selectSql).all(...params) as { id: string }[];
      if (deadRows.length === 0) return 0;

      const deleteDepStmt = this.db.prepare('DELETE FROM job_dependencies WHERE job_id = ? OR parent_job_id = ?');
      const deleteJobStmt = this.db.prepare('DELETE FROM jobs WHERE id = ?');

      for (const r of deadRows) {
        deleteDepStmt.run(r.id, r.id);
        deleteJobStmt.run(r.id);
      }

      return deadRows.length;
    });

    return purgeTx();
  }

  /**
   * Queue counts and aggregated metrics.
   */
  public getMetrics(queue?: string): {
    queues: {
      queue: string;
      pending: number;
      scheduled: number;
      running: number;
      completed: number;
      failed: number;
      dead: number;
      canceled: number;
      blocked: number;
      total: number;
    }[];
    totalPending: number;
    totalRunning: number;
    totalCompleted: number;
    totalFailed: number;
    totalDead: number;
  } {
    let sql = `
      SELECT
        queue,
        SUM(CASE WHEN state = 'pending' THEN 1 ELSE 0 END) as pending,
        SUM(CASE WHEN state = 'scheduled' THEN 1 ELSE 0 END) as scheduled,
        SUM(CASE WHEN state = 'running' THEN 1 ELSE 0 END) as running,
        SUM(CASE WHEN state = 'completed' THEN 1 ELSE 0 END) as completed,
        SUM(CASE WHEN state = 'failed' THEN 1 ELSE 0 END) as failed,
        SUM(CASE WHEN state = 'dead' THEN 1 ELSE 0 END) as dead,
        SUM(CASE WHEN state = 'canceled' THEN 1 ELSE 0 END) as canceled,
        SUM(CASE WHEN state = 'blocked' THEN 1 ELSE 0 END) as blocked,
        COUNT(*) as total
      FROM jobs
    `;
    const params: string[] = [];

    if (queue) {
      sql += ' WHERE queue = ?';
      params.push(queue);
    }

    sql += ' GROUP BY queue';

    const rows = this.db.prepare(sql).all(...params) as {
      queue: string;
      pending: number;
      scheduled: number;
      running: number;
      completed: number;
      failed: number;
      dead: number;
      canceled: number;
      blocked: number;
      total: number;
    }[];

    let totalPending = 0;
    let totalRunning = 0;
    let totalCompleted = 0;
    let totalFailed = 0;
    let totalDead = 0;

    for (const r of rows) {
      totalPending += r.pending;
      totalRunning += r.running;
      totalCompleted += r.completed;
      totalFailed += r.failed;
      totalDead += r.dead;
    }

    return {
      queues: rows,
      totalPending,
      totalRunning,
      totalCompleted,
      totalFailed,
      totalDead,
    };
  }

  /**
   * Queue Pause & Resume Controls
   */
  public pauseQueue(queue: string): void {
    const now = Date.now();
    this.db
      .prepare(`
        INSERT INTO queues (name, is_paused, created_at, updated_at)
        VALUES (?, 1, ?, ?)
        ON CONFLICT(name) DO UPDATE SET
          is_paused = 1,
          updated_at = excluded.updated_at
      `)
      .run(queue, now, now);
    this.log.info(`Queue "${queue}" is now paused`);
  }

  public resumeQueue(queue: string): void {
    const now = Date.now();
    this.db
      .prepare(`
        INSERT INTO queues (name, is_paused, created_at, updated_at)
        VALUES (?, 0, ?, ?)
        ON CONFLICT(name) DO UPDATE SET
          is_paused = 0,
          updated_at = excluded.updated_at
      `)
      .run(queue, now, now);
    this.log.info(`Queue "${queue}" is now resumed`);
  }

  public isQueuePaused(queue: string): boolean {
    const row = this.db
      .prepare('SELECT is_paused FROM queues WHERE name = ?')
      .get(queue) as { is_paused: number } | undefined;
    return Boolean(row && row.is_paused === 1);
  }

  public getPausedQueues(): string[] {
    const rows = this.db
      .prepare('SELECT name FROM queues WHERE is_paused = 1')
      .all() as { name: string }[];
    return rows.map((r) => r.name);
  }

  public listQueuesSummary(): {
    name: string;
    is_paused: boolean;
    pending: number;
    scheduled: number;
    running: number;
    completed: number;
    failed: number;
    dead: number;
    canceled: number;
    blocked: number;
    total: number;
  }[] {
    const sql = `
      WITH all_queues AS (
        SELECT DISTINCT queue as name FROM jobs
        UNION
        SELECT name FROM queues
      )
      SELECT
        q.name as name,
        COALESCE(pq.is_paused, 0) as is_paused,
        COALESCE(SUM(CASE WHEN j.state = 'pending' THEN 1 ELSE 0 END), 0) as pending,
        COALESCE(SUM(CASE WHEN j.state = 'scheduled' THEN 1 ELSE 0 END), 0) as scheduled,
        COALESCE(SUM(CASE WHEN j.state = 'running' THEN 1 ELSE 0 END), 0) as running,
        COALESCE(SUM(CASE WHEN j.state = 'completed' THEN 1 ELSE 0 END), 0) as completed,
        COALESCE(SUM(CASE WHEN j.state = 'failed' THEN 1 ELSE 0 END), 0) as failed,
        COALESCE(SUM(CASE WHEN j.state = 'dead' THEN 1 ELSE 0 END), 0) as dead,
        COALESCE(SUM(CASE WHEN j.state = 'canceled' THEN 1 ELSE 0 END), 0) as canceled,
        COALESCE(SUM(CASE WHEN j.state = 'blocked' THEN 1 ELSE 0 END), 0) as blocked,
        COALESCE(COUNT(j.id), 0) as total
      FROM all_queues q
      LEFT JOIN queues pq ON q.name = pq.name
      LEFT JOIN jobs j ON q.name = j.queue
      GROUP BY q.name
      ORDER BY q.name ASC
    `;
    const rows = this.db.prepare(sql).all() as any[];
    return rows.map((r) => ({
      name: r.name,
      is_paused: Boolean(r.is_paused),
      pending: r.pending,
      scheduled: r.scheduled,
      running: r.running,
      completed: r.completed,
      failed: r.failed,
      dead: r.dead,
      canceled: r.canceled,
      blocked: r.blocked,
      total: r.total,
    }));
  }
}
