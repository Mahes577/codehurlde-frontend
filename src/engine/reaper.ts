import { JobStore } from '../storage/job-store.js';
import { BackoffCalculator } from './backoff.js';
import { Logger, logger } from '../logger/logger.js';

export interface ReaperOptions {
  checkIntervalMs?: number;
}

export class StaleLeaseReaper {
  private jobStore: JobStore;
  private log: Logger;
  private timer: NodeJS.Timeout | null = null;
  private isRunning = false;
  private checkIntervalMs: number;

  constructor(jobStore: JobStore, options: ReaperOptions = {}, customLogger?: Logger) {
    this.jobStore = jobStore;
    this.checkIntervalMs = options.checkIntervalMs ?? 5000;
    this.log = customLogger ?? logger.child('reaper');
  }

  /**
   * Run a single sweep for stale leases and scheduled job promotion.
   */
  public sweep(now: number = Date.now()): { recovered: number; promoted: number } {
    // 1. Promote scheduled jobs whose run_at <= now
    const promoted = this.jobStore.promoteScheduledJobs(now);
    if (promoted > 0) {
      this.log.debug(`Promoted ${promoted} scheduled jobs to pending`);
    }

    // 2. Find running jobs whose lease expired
    const staleJobs = this.jobStore.findStaleRunningJobs(now);
    let recovered = 0;

    for (const job of staleJobs) {
      const nextRetryCount = job.retry_count + 1;
      const isDead = nextRetryCount >= job.max_retries;

      if (isDead) {
        this.log.warn(
          `Reaping stale job ${job.id} (worker ${job.worker_id}): max retries exceeded, moving to DLQ`
        );
        this.jobStore.markFailed(
          job.id,
          `Stale lease: worker ${job.worker_id ?? 'unknown'} heartbeat timed out; max retries exceeded`,
          now,
          true
        );
      } else {
        const backoff = BackoffCalculator.calculate(nextRetryCount, {
          strategy: job.backoff_strategy,
          baseMs: job.backoff_base_ms,
        });
        const nextRunAt = now + backoff;

        this.log.warn(
          `Reaping stale job ${job.id} (worker ${job.worker_id}): retry ${nextRetryCount}/${job.max_retries} scheduled at ${new Date(nextRunAt).toISOString()}`
        );

        this.jobStore.markFailed(
          job.id,
          `Stale lease: worker ${job.worker_id ?? 'unknown'} heartbeat timed out`,
          nextRunAt,
          false
        );
      }

      recovered++;
    }

    return { recovered, promoted };
  }

  public start(): void {
    if (this.isRunning) return;
    this.isRunning = true;
    this.log.info(`Stale lease reaper started (interval: ${this.checkIntervalMs}ms)`);

    const loop = () => {
      if (!this.isRunning) return;
      try {
        this.sweep();
      } catch (err: any) {
        this.log.error(`Reaper sweep failed: ${err.message}`, { error: err });
      } finally {
        if (this.isRunning) {
          this.timer = setTimeout(loop, this.checkIntervalMs);
        }
      }
    };

    loop();
  }

  public stop(): void {
    this.isRunning = false;
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    this.log.info('Stale lease reaper stopped');
  }
}
