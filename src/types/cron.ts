import { JobPriority, BackoffStrategy } from './job.js';

export interface CronJobDefinition<T = unknown> {
  name: string;
  queue: string;
  payload: T;
  cron_expression?: string | null;
  interval_ms?: number | null;
  priority: JobPriority;
  max_retries: number;
  backoff_strategy: BackoffStrategy;
  timeout_ms: number;
  prevent_overlap: boolean;
  last_run_at: number | null;
  next_run_at: number;
  is_active: boolean;
  last_job_id: string | null;
  created_at: number;
  updated_at: number;
}

export interface CronJobRow {
  name: string;
  queue: string;
  payload: string;
  cron_expression: string | null;
  interval_ms: number | null;
  priority: number;
  max_retries: number;
  backoff_strategy: string;
  timeout_ms: number;
  prevent_overlap: number;
  last_run_at: number | null;
  next_run_at: number;
  is_active: number;
  last_job_id: string | null;
  created_at: number;
  updated_at: number;
}

export interface RegisterCronOptions<T = unknown> {
  name: string;
  queue?: string;
  payload?: T;
  cron_expression?: string;
  interval_ms?: number;
  priority?: JobPriority | number;
  max_retries?: number;
  backoff_strategy?: BackoffStrategy;
  timeout_ms?: number;
  prevent_overlap?: boolean;
}
