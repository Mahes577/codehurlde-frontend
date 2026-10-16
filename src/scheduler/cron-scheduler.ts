import Database from 'better-sqlite3';
import { Cron } from 'croner';
import { JobStore } from '../storage/job-store.js';
import {
  CronJobDefinition,
  CronJobRow,
  RegisterCronOptions,
} from '../types/cron.js';
import { JobPriority, BackoffStrategy } from '../types/job.js';
import { Logger, logger } from '../logger/logger.js';

export class CronScheduler {
  private db: Database.Database;
  private jobStore: JobStore;
  private log: Logger;
  private timer: NodeJS.Timeout | null = null;
  private isRunning = false;

  constructor(
    db: Database.Database,
    jobStore: JobStore,
    customLogger?: Logger
  ) {
    this.db = db;
    this.jobStore = jobStore;
    this.log = customLogger ?? logger.child('cron-scheduler');
  }

  private mapRowToDefinition<T = unknown>(row: CronJobRow): CronJobDefinition<T> {
    return {
      name: row.name,
      queue: row.queue,
      payload: JSON.parse(row.payload) as T,
      cron_expression: row.cron_expression,
      interval_ms: row.interval_ms,
      priority: row.priority as JobPriority,
      max_retries: row.max_retries,
      backoff_strategy: row.backoff_strategy as BackoffStrategy,
      timeout_ms: row.timeout_ms,
      prevent_overlap: Boolean(row.prevent_overlap),
      last_run_at: row.last_run_at,
      next_run_at: row.next_run_at,
      is_active: Boolean(row.is_active),
      last_job_id: row.last_job_id,
      created_at: row.created_at,
      updated_at: row.updated_at,
    };
  }

  /**
   * Register or update a recurring job.
   */
  public register<T = unknown>(options: RegisterCronOptions<T>): CronJobDefinition<T> {
    const {
      name,
      queue = 'default',
      payload = {} as T,
      cron_expression,
      interval_ms,
      priority = JobPriority.NORMAL,
      max_retries = 3,
      backoff_strategy = 'exponential',
      timeout_ms = 30000,
      prevent_overlap = true,
    } = options;

    if (!cron_expression && !interval_ms) {
      throw new Error('Either cron_expression or interval_ms must be provided');
    }

    const now = Date.now();
    let nextRunAt: number;

    if (cron_expression) {
      try {
        const cron = new Cron(cron_expression);
        const next = cron.nextRun(new Date(now));
        if (!next) {
          throw new Error('Cron expression does not produce any future run dates');
        }
        nextRunAt = next.getTime();
      } catch (err: any) {
        throw new Error(`Invalid cron expression "${cron_expression}": ${err.message}`);
      }
    } else {
      nextRunAt = now + (interval_ms ?? 60000);
    }

    this.db
      .prepare(`
        INSERT INTO cron_jobs (
          name, queue, payload, cron_expression, interval_ms, priority,
          max_retries, backoff_strategy, timeout_ms, prevent_overlap,
          last_run_at, next_run_at, is_active, last_job_id, created_at, updated_at
        ) VALUES (
          ?, ?, ?, ?, ?, ?,
          ?, ?, ?, ?,
          NULL, ?, 1, NULL, ?, ?
        )
        ON CONFLICT(name) DO UPDATE SET
          queue = excluded.queue,
          payload = excluded.payload,
          cron_expression = excluded.cron_expression,
          interval_ms = excluded.interval_ms,
          priority = excluded.priority,
          max_retries = excluded.max_retries,
          backoff_strategy = excluded.backoff_strategy,
          timeout_ms = excluded.timeout_ms,
          prevent_overlap = excluded.prevent_overlap,
          next_run_at = excluded.next_run_at,
          is_active = 1,
          updated_at = excluded.updated_at
      `)
      .run(
        name,
        queue,
        JSON.stringify(payload),
        cron_expression ?? null,
        interval_ms ?? null,
        priority,
        max_retries,
        backoff_strategy,
        timeout_ms,
        prevent_overlap ? 1 : 0,
        nextRunAt,
        now,
        now
      );

    this.log.info(`Registered recurring job: "${name}" next run at ${new Date(nextRunAt).toISOString()}`);

    return this.get(name)!;
  }

  /**
   * Unregister a recurring job.
   */
  public unregister(name: string): boolean {
    const result = this.db.prepare('DELETE FROM cron_jobs WHERE name = ?').run(name);
    return result.changes > 0;
  }

  /**
   * Get a registered cron job by name.
   */
  public get<T = unknown>(name: string): CronJobDefinition<T> | null {
    const row = this.db.prepare('SELECT * FROM cron_jobs WHERE name = ?').get(name) as CronJobRow | undefined;
    if (!row) return null;
    return this.mapRowToDefinition<T>(row);
  }

  /**
   * List all registered cron jobs.
   */
  public list<T = unknown>(): CronJobDefinition<T>[] {
    const rows = this.db.prepare('SELECT * FROM cron_jobs ORDER BY name ASC').all() as CronJobRow[];
    return rows.map((r) => this.mapRowToDefinition<T>(r));
  }

  /**
   * Evaluate upcoming cron jobs and trigger them if due.
   */
  public evaluateAndTrigger(now: number = Date.now()): number {
    const dueRows = this.db
      .prepare(`
        SELECT * FROM cron_jobs
        WHERE is_active = 1 AND next_run_at <= ?
      `)
      .all(now) as CronJobRow[];

    let triggeredCount = 0;

    for (const row of dueRows) {
      const cronDef = this.mapRowToDefinition(row);

      // Check overlap prevention
      if (cronDef.prevent_overlap && cronDef.last_job_id) {
        const lastJob = this.jobStore.getJob(cronDef.last_job_id);
        if (lastJob && (lastJob.state === 'running' || lastJob.state === 'pending' || lastJob.state === 'scheduled')) {
          this.log.warn(
            `Skipping run of cron job "${cronDef.name}" because previous run ${cronDef.last_job_id} is still ${lastJob.state}`
          );
          // Advance next_run_at so it doesn't get stuck in loop
          const nextRunAt = this.calculateNextRun(cronDef, now);
          this.db
            .prepare('UPDATE cron_jobs SET next_run_at = ?, updated_at = ? WHERE name = ?')
            .run(nextRunAt, now, cronDef.name);
          continue;
        }
      }

      // Enqueue the new job instance
      const job = this.jobStore.submitJob({
        queue: cronDef.queue,
        payload: cronDef.payload,
        priority: cronDef.priority,
        max_retries: cronDef.max_retries,
        backoff_strategy: cronDef.backoff_strategy,
        timeout_ms: cronDef.timeout_ms,
      });

      const nextRunAt = this.calculateNextRun(cronDef, now);

      this.db
        .prepare(`
          UPDATE cron_jobs
          SET last_run_at = ?,
              last_job_id = ?,
              next_run_at = ?,
              updated_at = ?
          WHERE name = ?
        `)
        .run(now, job.id, nextRunAt, now, cronDef.name);

      this.log.info(
        `Triggered cron job "${cronDef.name}" -> queued job ${job.id}. Next run: ${new Date(nextRunAt).toISOString()}`
      );
      triggeredCount++;
    }

    return triggeredCount;
  }

  private calculateNextRun(cronDef: CronJobDefinition, fromTime: number): number {
    if (cronDef.cron_expression) {
      const cron = new Cron(cronDef.cron_expression);
      const next = cron.nextRun(new Date(fromTime));
      if (next) {
        return next.getTime();
      }
    }

    if (cronDef.interval_ms) {
      return fromTime + cronDef.interval_ms;
    }

    return fromTime + 60000;
  }

  /**
   * Start recurring scheduler loop.
   */
  public start(pollIntervalMs = 1000): void {
    if (this.isRunning) return;
    this.isRunning = true;
    this.log.info(`Cron scheduler started (poll interval: ${pollIntervalMs}ms)`);

    const tick = () => {
      if (!this.isRunning) return;
      try {
        this.evaluateAndTrigger();
      } catch (err: any) {
        this.log.error(`Error in cron scheduler tick: ${err.message}`, { error: err });
      } finally {
        if (this.isRunning) {
          this.timer = setTimeout(tick, pollIntervalMs);
        }
      }
    };

    tick();
  }

  /**
   * Stop recurring scheduler loop.
   */
  public stop(): void {
    this.isRunning = false;
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    this.log.info('Cron scheduler stopped');
  }
}
