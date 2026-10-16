export enum JobPriority {
  CRITICAL = 0,
  HIGH = 1,
  NORMAL = 2,
  LOW = 3,
}

export type JobState =
  | 'pending'
  | 'scheduled'
  | 'running'
  | 'completed'
  | 'failed'
  | 'dead'
  | 'canceled'
  | 'blocked';

export type BackoffStrategy = 'exponential' | 'fixed';

export interface Job<T = unknown> {
  id: string;
  queue: string;
  payload: T;
  priority: JobPriority;
  state: JobState;
  max_retries: number;
  retry_count: number;
  backoff_strategy: BackoffStrategy;
  backoff_base_ms: number;
  timeout_ms: number;
  run_at: number; // Unix timestamp in ms
  created_at: number; // Unix timestamp in ms
  started_at: number | null;
  completed_at: number | null;
  last_error: string | null;
  worker_id: string | null;
  heartbeat_at: number | null;
  lease_expires_at: number | null;
  version: number;
}

export interface JobRow {
  id: string;
  queue: string;
  payload: string;
  priority: number;
  state: string;
  max_retries: number;
  retry_count: number;
  backoff_strategy: string;
  backoff_base_ms: number;
  timeout_ms: number;
  run_at: number;
  created_at: number;
  started_at: number | null;
  completed_at: number | null;
  last_error: string | null;
  worker_id: string | null;
  heartbeat_at: number | null;
  lease_expires_at: number | null;
  version: number;
}

export interface CreateJobInput<T = unknown> {
  id?: string;
  queue?: string;
  payload: T;
  priority?: JobPriority | number;
  max_retries?: number;
  backoff_strategy?: BackoffStrategy;
  backoff_base_ms?: number;
  timeout_ms?: number;
  delay_ms?: number;
  run_at?: number | Date;
  parents?: string[]; // IDs of parent jobs that must complete before this job runs
}

export interface JobFilter {
  queue?: string;
  state?: JobState | JobState[];
  limit?: number;
  offset?: number;
  order?: 'ASC' | 'DESC';
}
