import { Job } from './job.js';

export type JobHandler<T = unknown, R = unknown> = (
  job: Job<T>,
  signal: AbortSignal
) => Promise<R> | R;

export interface WorkerOptions {
  workerId?: string;
  queues?: string[];
  concurrency?: number; // concurrency per queue or total
  queueConcurrency?: Record<string, number>; // queue-specific concurrency overrides
  pollIntervalMs?: number;
  heartbeatIntervalMs?: number;
  leaseDurationMs?: number;
  reaperIntervalMs?: number;
  drainTimeoutMs?: number;
}

export interface WorkerQueueStats {
  queue: string;
  concurrency: number;
  activeCount: number;
}

export interface OverallMetrics {
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
}
