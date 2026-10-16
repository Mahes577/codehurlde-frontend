import { Job, JobState } from '../types/job.js';
import { Logger, logger } from '../logger/logger.js';
import { BackoffCalculator } from '../engine/backoff.js';

export interface WebhookEventPayload {
  job_id: string;
  queue: string;
  state: JobState;
  retry_count: number;
  started_at: number | null;
  completed_at: number | null;
  error: string | null;
  payload: unknown;
}

export interface WebhookDispatcherOptions {
  maxRetries?: number;
  backoffBaseMs?: number;
  fetchFn?: typeof fetch;
  logger?: Logger;
  timeoutMs?: number;
}

export class WebhookDispatcher {
  private maxRetries: number;
  private backoffBaseMs: number;
  private fetchFn: typeof fetch;
  private log: Logger;
  private timeoutMs: number;

  constructor(options: WebhookDispatcherOptions = {}) {
    this.maxRetries = options.maxRetries ?? 3;
    this.backoffBaseMs = options.backoffBaseMs ?? 200;
    this.fetchFn = options.fetchFn ?? globalThis.fetch;
    this.log = options.logger ?? logger.child('webhook');
    this.timeoutMs = options.timeoutMs ?? 5000;
  }

  /**
   * Dispatch webhook asynchronously in the background.
   * Guarantees it will never throw or block the caller.
   */
  public dispatch(
    job: Job,
    state: JobState = job.state,
    error: string | null = job.last_error
  ): Promise<boolean> {
    if (!job.webhook_url) {
      return Promise.resolve(false);
    }

    const payload: WebhookEventPayload = {
      job_id: job.id,
      queue: job.queue,
      state,
      retry_count: job.retry_count,
      started_at: job.started_at,
      completed_at: job.completed_at ?? Date.now(),
      error,
      payload: job.payload,
    };

    // Run in background without unhandled rejection
    return this.deliverWithRetries(job.webhook_url, job.webhook_headers, payload, job.id).catch(
      (err) => {
        this.log.error(
          `Unexpected error during webhook dispatch for job ${job.id}: ${err.message}`
        );
        return false;
      }
    );
  }

  private async deliverWithRetries(
    url: string,
    customHeaders: Record<string, string> | null,
    payload: WebhookEventPayload,
    jobId: string
  ): Promise<boolean> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'User-Agent': 'taskqueue-webhook/1.0',
      ...(customHeaders || {}),
    };

    const body = JSON.stringify(payload);
    let attempt = 0;

    while (attempt <= this.maxRetries) {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), this.timeoutMs);

        const response = await this.fetchFn(url, {
          method: 'POST',
          headers,
          body,
          signal: controller.signal,
        });

        clearTimeout(timeout);

        if (response.ok) {
          this.log.info(
            `Webhook delivered for job ${jobId} to ${url} (status: ${response.status})`
          );
          return true;
        }

        throw new Error(`HTTP status ${response.status} ${response.statusText}`);
      } catch (err: any) {
        attempt++;
        if (attempt > this.maxRetries) {
          this.log.error(
            `Webhook delivery failed for job ${jobId} to ${url} after ${this.maxRetries} retries: ${err.message}`
          );
          return false;
        }

        const delay = BackoffCalculator.calculate(attempt, {
          strategy: 'exponential',
          baseMs: this.backoffBaseMs,
          jitter: true,
        });

        this.log.warn(
          `Webhook attempt ${attempt}/${this.maxRetries} failed for job ${jobId}: ${err.message}. Retrying in ${delay}ms...`
        );

        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }

    return false;
  }
}

export const defaultWebhookDispatcher = new WebhookDispatcher();
