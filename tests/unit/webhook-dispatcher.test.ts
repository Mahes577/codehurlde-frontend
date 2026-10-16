import { describe, it, expect, vi } from 'vitest';
import { WebhookDispatcher, WebhookEventPayload } from '../../src/webhook/dispatcher.js';
import { Job, JobPriority } from '../../src/types/job.js';
import { Logger } from '../../src/logger/logger.js';

describe('WebhookDispatcher', () => {
  const silentLogger = new Logger({ level: 'error' });

  const createDummyJob = (overrides: Partial<Job> = {}): Job => ({
    id: 'job-123',
    queue: 'notifications',
    payload: { user: 'alice', action: 'signup' },
    priority: JobPriority.NORMAL,
    state: 'completed',
    max_retries: 3,
    retry_count: 0,
    backoff_strategy: 'exponential',
    backoff_base_ms: 1000,
    timeout_ms: 30000,
    run_at: 1000,
    created_at: 1000,
    started_at: 1050,
    completed_at: 1200,
    last_error: null,
    worker_id: 'worker-1',
    heartbeat_at: 1100,
    lease_expires_at: 10000,
    webhook_url: 'https://example.com/webhook',
    webhook_headers: { 'X-Custom-Secret': 'secret-xyz' },
    version: 1,
    ...overrides,
  });

  it('formats payload properly and includes custom headers on POST', async () => {
    let capturedUrl = '';
    let capturedOptions: any = null;

    const mockFetch = vi.fn().mockImplementation(async (url: string, opts: any) => {
      capturedUrl = url;
      capturedOptions = opts;
      return { ok: true, status: 200, statusText: 'OK' };
    });

    const dispatcher = new WebhookDispatcher({
      fetchFn: mockFetch as any,
      logger: silentLogger,
    });

    const job = createDummyJob();
    const success = await dispatcher.dispatch(job, 'completed', null);

    expect(success).toBe(true);
    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(capturedUrl).toBe('https://example.com/webhook');
    expect(capturedOptions.method).toBe('POST');
    expect(capturedOptions.headers['Content-Type']).toBe('application/json');
    expect(capturedOptions.headers['X-Custom-Secret']).toBe('secret-xyz');

    const body: WebhookEventPayload = JSON.parse(capturedOptions.body);
    expect(body.job_id).toBe('job-123');
    expect(body.queue).toBe('notifications');
    expect(body.state).toBe('completed');
    expect(body.retry_count).toBe(0);
    expect(body.started_at).toBe(1050);
    expect(body.completed_at).toBe(1200);
    expect(body.error).toBeNull();
    expect(body.payload).toEqual({ user: 'alice', action: 'signup' });
  });

  it('retries up to 3 times on HTTP 500 error and succeeds when a retry returns 200', async () => {
    let callCount = 0;
    const mockFetch = vi.fn().mockImplementation(async () => {
      callCount++;
      if (callCount < 3) {
        return { ok: false, status: 500, statusText: 'Internal Server Error' };
      }
      return { ok: true, status: 200, statusText: 'OK' };
    });

    const dispatcher = new WebhookDispatcher({
      maxRetries: 3,
      backoffBaseMs: 10, // Fast backoff for test
      fetchFn: mockFetch as any,
      logger: silentLogger,
    });

    const job = createDummyJob();
    const success = await dispatcher.dispatch(job, 'completed', null);

    expect(success).toBe(true);
    expect(mockFetch).toHaveBeenCalledTimes(3); // 1 initial + 2 retries
  });

  it('retries on network fetch exception and fails gracefully after max retries without throwing', async () => {
    const mockFetch = vi.fn().mockRejectedValue(new Error('ECONNREFUSED'));

    const dispatcher = new WebhookDispatcher({
      maxRetries: 3,
      backoffBaseMs: 10,
      fetchFn: mockFetch as any,
      logger: silentLogger,
    });

    const job = createDummyJob();
    const success = await dispatcher.dispatch(job, 'dead', 'Fatal database error');

    expect(success).toBe(false);
    expect(mockFetch).toHaveBeenCalledTimes(4); // 1 initial + 3 retries
  });

  it('returns false immediately without network call if webhook_url is null', async () => {
    const mockFetch = vi.fn();
    const dispatcher = new WebhookDispatcher({
      fetchFn: mockFetch as any,
      logger: silentLogger,
    });

    const job = createDummyJob({ webhook_url: null });
    const success = await dispatcher.dispatch(job);

    expect(success).toBe(false);
    expect(mockFetch).not.toHaveBeenCalled();
  });
});
