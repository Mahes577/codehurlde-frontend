import { EventEmitter } from 'events';
import { v4 as uuidv4 } from 'uuid';
import { JobStore } from '../storage/job-store.js';
import { Job } from '../types/job.js';
import { JobHandler, WorkerOptions } from '../types/worker.js';
import { BackoffCalculator } from './backoff.js';
import { StaleLeaseReaper } from './reaper.js';
import { Logger, logger } from '../logger/logger.js';
import { WebhookDispatcher } from '../webhook/dispatcher.js';

interface ActiveJobExecution {
  job: Job;
  abortController: AbortController;
  promise: Promise<void>;
  heartbeatTimer: NodeJS.Timeout | null;
}

export class WorkerPool extends EventEmitter {
  private jobStore: JobStore;
  private workerId: string;
  private queues: string[];
  private concurrency: number;
  private queueConcurrency: Record<string, number>;
  private pollIntervalMs: number;
  private heartbeatIntervalMs: number;
  private leaseDurationMs: number;
  private reaper: StaleLeaseReaper;
  private drainTimeoutMs: number;
  private webhookDispatcher: WebhookDispatcher;

  private defaultHandler: JobHandler | null = null;
  private queueHandlers = new Map<string, JobHandler>();

  private isRunning = false;
  private isStopping = false;
  private activeJobs = new Map<string, ActiveJobExecution>();
  private activeByQueue = new Map<string, number>();

  private pollTimer: NodeJS.Timeout | null = null;
  private log: Logger;

  constructor(jobStore: JobStore, options: WorkerOptions = {}, customLogger?: Logger) {
    super();
    this.jobStore = jobStore;
    this.workerId = options.workerId ?? `worker-${uuidv4().slice(0, 8)}`;
    this.queues = options.queues && options.queues.length > 0 ? options.queues : ['default'];
    this.concurrency = options.concurrency ?? 5;
    this.queueConcurrency = options.queueConcurrency ?? {};
    this.pollIntervalMs = options.pollIntervalMs ?? 200;
    this.heartbeatIntervalMs = options.heartbeatIntervalMs ?? 3000;
    this.leaseDurationMs = options.leaseDurationMs ?? 10000; // 10s lease duration
    this.drainTimeoutMs = options.drainTimeoutMs ?? 15000;

    this.log = customLogger ?? logger.child(`worker:${this.workerId}`);
    this.webhookDispatcher =
      options.webhookDispatcher ?? new WebhookDispatcher({ logger: this.log });
    this.reaper = new StaleLeaseReaper(
      jobStore,
      { checkIntervalMs: options.reaperIntervalMs ?? 5000 },
      this.log
    );

    for (const q of this.queues) {
      this.activeByQueue.set(q, 0);
    }
  }

  public getWorkerId(): string {
    return this.workerId;
  }

  /**
   * Register default job handler for all queues without specific handler.
   */
  public handle(handler: JobHandler): this;
  /**
   * Register specific job handler for a queue.
   */
  public handle(queue: string, handler: JobHandler): this;
  public handle(queueOrHandler: string | JobHandler, handler?: JobHandler): this {
    if (typeof queueOrHandler === 'string' && handler) {
      this.queueHandlers.set(queueOrHandler, handler);
      if (!this.queues.includes(queueOrHandler)) {
        this.queues.push(queueOrHandler);
        this.activeByQueue.set(queueOrHandler, 0);
      }
    } else if (typeof queueOrHandler === 'function') {
      this.defaultHandler = queueOrHandler;
    }
    return this;
  }

  public getActiveCount(queue?: string): number {
    if (queue) {
      return this.activeByQueue.get(queue) ?? 0;
    }
    return this.activeJobs.size;
  }

  private canAcceptWork(queue: string): boolean {
    if (this.activeJobs.size >= this.concurrency) return false;

    const queueMax = this.queueConcurrency[queue];
    if (queueMax !== undefined) {
      const current = this.activeByQueue.get(queue) ?? 0;
      if (current >= queueMax) return false;
    }

    return true;
  }

  private getEligibleQueues(): string[] {
    return this.queues.filter((q) => this.canAcceptWork(q));
  }

  /**
   * Start worker pool and polling loop.
   */
  public start(): void {
    if (this.isRunning) return;
    this.isRunning = true;
    this.isStopping = false;

    this.log.info(
      `Worker pool started: id=${this.workerId}, queues=[${this.queues.join(', ')}], concurrency=${this.concurrency}`
    );

    // Start background reaper for stale leases and scheduled job promotion
    this.reaper.start();

    // Trigger immediate poll
    this.pollLoop();
  }

  private pollLoop(): void {
    if (!this.isRunning || this.isStopping) return;

    try {
      const eligibleQueues = this.getEligibleQueues();

      if (eligibleQueues.length > 0 && this.activeJobs.size < this.concurrency) {
        const job = this.jobStore.leaseNextJob(
          eligibleQueues,
          this.workerId,
          this.leaseDurationMs
        );

        if (job) {
          this.dispatchJob(job);
          // Immediately try to lease more if capacity allows
          if (this.activeJobs.size < this.concurrency) {
            setImmediate(() => this.pollLoop());
            return;
          }
        }
      }
    } catch (err: any) {
      this.log.error(`Error in worker poll: ${err.message}`, { error: err });
    }

    if (this.isRunning && !this.isStopping) {
      this.pollTimer = setTimeout(() => this.pollLoop(), this.pollIntervalMs);
    }
  }

  private dispatchJob(job: Job): void {
    const abortController = new AbortController();
    const handler = this.queueHandlers.get(job.queue) ?? this.defaultHandler;

    this.activeByQueue.set(job.queue, (this.activeByQueue.get(job.queue) ?? 0) + 1);
    this.emit('job:leased', job);

    this.log.info(`Leased job ${job.id} (queue: ${job.queue}, priority: ${job.priority})`);

    // Setup periodic heartbeat
    const heartbeatTimer = setInterval(() => {
      try {
        const success = this.jobStore.heartbeat(job.id, this.workerId, this.leaseDurationMs);
        if (!success) {
          this.log.warn(`Heartbeat renewal failed for job ${job.id}`);
        }
      } catch (err: any) {
        this.log.error(`Heartbeat error for job ${job.id}: ${err.message}`);
      }
    }, this.heartbeatIntervalMs);

    const executionPromise = (async () => {
      const startedAt = Date.now();
      let timeoutTimer: NodeJS.Timeout | null = null;

      try {
        if (!handler) {
          throw new Error(`No handler registered for queue "${job.queue}"`);
        }

        // Setup job execution timeout
        const timeoutPromise = new Promise<never>((_, reject) => {
          if (job.timeout_ms > 0) {
            timeoutTimer = setTimeout(() => {
              abortController.abort();
              reject(new Error(`Job timed out after ${job.timeout_ms}ms`));
            }, job.timeout_ms);
          }
        });

        // Run handler raced against timeout and abort signal
        await Promise.race([
          handler(job, abortController.signal),
          timeoutPromise,
        ]);

        if (timeoutTimer) clearTimeout(timeoutTimer);
        clearInterval(heartbeatTimer);

        // Mark completed and cascade
        this.jobStore.markCompleted(job.id, this.workerId);
        const durationMs = Date.now() - startedAt;
        this.log.info(`Job ${job.id} completed successfully in ${durationMs}ms`);
        this.emit('job:completed', { job, durationMs });
        this.webhookDispatcher.dispatch(
          { ...job, state: 'completed', completed_at: Date.now() },
          'completed',
          null
        );
      } catch (err: any) {
        if (timeoutTimer) clearTimeout(timeoutTimer);
        clearInterval(heartbeatTimer);

        const durationMs = Date.now() - startedAt;
        const errorMessage = err?.message || String(err);
        const nextRetryCount = job.retry_count + 1;
        const isDead = nextRetryCount >= job.max_retries;

        if (isDead) {
          this.jobStore.markFailed(job.id, errorMessage, Date.now(), true);
          this.log.error(
            `Job ${job.id} failed after ${nextRetryCount} retries and moved to DLQ: ${errorMessage}`
          );
          this.emit('job:dead', { job, error: errorMessage, durationMs });
          this.webhookDispatcher.dispatch(
            {
              ...job,
              state: 'dead',
              retry_count: nextRetryCount,
              completed_at: Date.now(),
              last_error: errorMessage,
            },
            'dead',
            errorMessage
          );
        } else {
          const backoff = BackoffCalculator.calculate(nextRetryCount, {
            strategy: job.backoff_strategy,
            baseMs: job.backoff_base_ms,
          });
          const nextRunAt = Date.now() + backoff;
          this.jobStore.markFailed(job.id, errorMessage, nextRunAt, false);
          this.log.warn(
            `Job ${job.id} failed (attempt ${nextRetryCount}/${job.max_retries}), retrying in ${backoff}ms: ${errorMessage}`
          );
          this.emit('job:failed', {
            job,
            error: errorMessage,
            durationMs,
            retryCount: nextRetryCount,
            nextRunAt,
          });
          this.webhookDispatcher.dispatch(
            {
              ...job,
              state: 'failed',
              retry_count: nextRetryCount,
              completed_at: Date.now(),
              last_error: errorMessage,
            },
            'failed',
            errorMessage
          );
        }
      } finally {
        // Cleanup tracking
        this.activeJobs.delete(job.id);
        const currentQueueCount = this.activeByQueue.get(job.queue) ?? 1;
        this.activeByQueue.set(job.queue, Math.max(0, currentQueueCount - 1));

        // Continue polling if more work is waiting
        if (this.isRunning && !this.isStopping) {
          setImmediate(() => this.pollLoop());
        }
      }
    })();

    this.activeJobs.set(job.id, {
      job,
      abortController,
      promise: executionPromise,
      heartbeatTimer,
    });
  }

  /**
   * Graceful shutdown:
   * 1. Stops accepting new leases.
   * 2. Waits for in-flight tasks to finish within drainTimeoutMs.
   * 3. Aborts remaining tasks if drain timeout expires.
   */
  public async stop(drainTimeoutMs: number = this.drainTimeoutMs): Promise<void> {
    if (!this.isRunning || this.isStopping) return;
    this.isStopping = true;

    this.log.info(
      `Worker pool graceful shutdown initiated. Waiting for ${this.activeJobs.size} in-flight tasks to drain (timeout: ${drainTimeoutMs}ms)...`
    );

    if (this.pollTimer) {
      clearTimeout(this.pollTimer);
      this.pollTimer = null;
    }

    this.reaper.stop();

    if (this.activeJobs.size > 0) {
      const activePromises = Array.from(this.activeJobs.values()).map((a) => a.promise);

      const drainTimer = new Promise<void>((resolve) => {
        setTimeout(() => {
          this.log.warn(
            `Drain timeout (${drainTimeoutMs}ms) expired. Aborting remaining ${this.activeJobs.size} in-flight tasks.`
          );
          for (const active of this.activeJobs.values()) {
            active.abortController.abort();
            if (active.heartbeatTimer) clearInterval(active.heartbeatTimer);
          }
          resolve();
        }, drainTimeoutMs);
      });

      await Promise.race([
        Promise.allSettled(activePromises),
        drainTimer,
      ]);
    }

    this.isRunning = false;
    this.isStopping = false;
    this.emit('stopped');
    this.log.info('Worker pool stopped cleanly');
  }
}
