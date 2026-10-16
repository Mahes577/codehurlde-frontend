import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { DatabaseManager } from '../../src/storage/database.js';
import { JobStore } from '../../src/storage/job-store.js';
import { WorkerPool } from '../../src/engine/worker-pool.js';
import { WebhookDispatcher } from '../../src/webhook/dispatcher.js';
import { Logger } from '../../src/logger/logger.js';

describe('Webhook Notification Integration with WorkerPool', () => {
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

  it('automatically dispatches webhook on successful job completion', async () => {
    const dispatchedWebhooks: any[] = [];

    const mockFetch = vi.fn().mockImplementation(async (url: string, opts: any) => {
      dispatchedWebhooks.push({
        url,
        body: JSON.parse(opts.body),
        headers: opts.headers,
      });
      return { ok: true, status: 200, statusText: 'OK' };
    });

    const webhookDispatcher = new WebhookDispatcher({
      fetchFn: mockFetch as any,
      logger: silentLogger,
    });

    const worker = new WorkerPool(
      jobStore,
      {
        queues: ['webhook-q'],
        concurrency: 1,
        pollIntervalMs: 20,
        webhookDispatcher,
      },
      silentLogger
    );

    worker.handle('webhook-q', async (job) => {
      return { result: 'processed', input: job.payload };
    });

    worker.start();

    const job = jobStore.submitJob({
      queue: 'webhook-q',
      payload: { orderId: 'ord-999' },
      webhook_url: 'https://api.merchant.com/webhook/orders',
      webhook_headers: { Authorization: 'Bearer token-123' },
    });

    // Wait for job completion and webhook dispatch
    const deadline = Date.now() + 4000;
    while (dispatchedWebhooks.length === 0 && Date.now() < deadline) {
      await new Promise((res) => setTimeout(res, 40));
    }

    await worker.stop(1000);

    expect(dispatchedWebhooks.length).toBe(1);
    expect(dispatchedWebhooks[0].url).toBe('https://api.merchant.com/webhook/orders');
    expect(dispatchedWebhooks[0].headers.Authorization).toBe('Bearer token-123');
    expect(dispatchedWebhooks[0].body.job_id).toBe(job.id);
    expect(dispatchedWebhooks[0].body.state).toBe('completed');
    expect(dispatchedWebhooks[0].body.payload).toEqual({ orderId: 'ord-999' });
    expect(dispatchedWebhooks[0].body.error).toBeNull();
  });

  it('automatically dispatches webhook when job dies (DLQ)', async () => {
    const dispatchedWebhooks: any[] = [];

    const mockFetch = vi.fn().mockImplementation(async (url: string, opts: any) => {
      dispatchedWebhooks.push({
        url,
        body: JSON.parse(opts.body),
      });
      return { ok: true, status: 200, statusText: 'OK' };
    });

    const webhookDispatcher = new WebhookDispatcher({
      fetchFn: mockFetch as any,
      logger: silentLogger,
    });

    const worker = new WorkerPool(
      jobStore,
      {
        queues: ['webhook-dead-q'],
        concurrency: 1,
        pollIntervalMs: 20,
        webhookDispatcher,
      },
      silentLogger
    );

    worker.handle('webhook-dead-q', async () => {
      throw new Error('Critical service outage');
    });

    worker.start();

    const job = jobStore.submitJob({
      queue: 'webhook-dead-q',
      payload: { account: 'acc-1' },
      max_retries: 0, // dies immediately on first failure
      webhook_url: 'https://api.merchant.com/webhook/alerts',
    });

    const deadline = Date.now() + 4000;
    while (dispatchedWebhooks.length === 0 && Date.now() < deadline) {
      await new Promise((res) => setTimeout(res, 40));
    }

    await worker.stop(1000);

    expect(dispatchedWebhooks.length).toBe(1);
    expect(dispatchedWebhooks[0].body.job_id).toBe(job.id);
    expect(dispatchedWebhooks[0].body.state).toBe('dead');
    expect(dispatchedWebhooks[0].body.error).toContain('Critical service outage');
  });

  it('ensures webhook network crash does NOT block worker or prevent job completion', async () => {
    const mockFetch = vi.fn().mockRejectedValue(new Error('DNS resolution failure'));

    const webhookDispatcher = new WebhookDispatcher({
      fetchFn: mockFetch as any,
      maxRetries: 1, // Quick test
      backoffBaseMs: 10,
      logger: silentLogger,
    });

    let jobCompletedNormally = false;

    const worker = new WorkerPool(
      jobStore,
      {
        queues: ['webhook-fail-q'],
        concurrency: 1,
        pollIntervalMs: 20,
        webhookDispatcher,
      },
      silentLogger
    );

    worker.handle('webhook-fail-q', async () => {
      jobCompletedNormally = true;
    });

    worker.start();

    const job = jobStore.submitJob({
      queue: 'webhook-fail-q',
      payload: { foo: 'bar' },
      webhook_url: 'https://invalid-host-unreachable.example',
    });

    const deadline = Date.now() + 4000;
    while (!jobCompletedNormally && Date.now() < deadline) {
      await new Promise((res) => setTimeout(res, 40));
    }

    // Wait a brief moment for worker to complete transition
    await new Promise((res) => setTimeout(res, 100));
    await worker.stop(1000);

    expect(jobCompletedNormally).toBe(true);
    expect(jobStore.getJob(job.id)?.state).toBe('completed');
  });
});
