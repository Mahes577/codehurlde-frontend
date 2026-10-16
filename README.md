# Distributed Task Queue & Scheduling Engine

A production-grade, distributed-style task queue and scheduling engine in TypeScript (Node.js) backed by SQLite (`better-sqlite3`).

## Key Capabilities

1. **Core Job Model & Storage**:
   - Persistent SQLite storage using `better-sqlite3` with WAL mode and transaction concurrency.
   - Job definition: `id`, `queue`, `payload` (JSON), `priority` (critical: 0, high: 1, normal: 2, low: 3), `state` (pending, scheduled, running, completed, failed, dead, canceled, blocked), `max_retries`, `retry_count`, `backoff_strategy` (exponential, fixed), `timeout_ms`, `run_at` (timestamp for delayed execution), `created_at`, `started_at`, `completed_at`, `last_error`.
   - Automatic schema migration mechanism on startup (`_migrations` table).

2. **Job Dependency DAG**:
   - Upstream parent dependencies per job (`job_dependencies`).
   - Jobs remain scheduled until all parent jobs reach `completed` status.
   - Failure cascading: if any parent fails/dead letters, downstream dependent jobs cascade to `canceled` or `blocked`.
   - Cycle detection algorithm (DFS 3-color & Kahn's topological sort) to reject cyclic dependencies upon submission.

3. **Execution Engine & Worker Pool**:
   - Configurable worker concurrency per queue and globally.
   - Priority-based scheduling (critical jobs processed before low priority, ties broken by `run_at` then `created_at`).
   - Atomic job leasing using SQLite `BEGIN IMMEDIATE` transactions with optimistic locking (`version`).
   - Heartbeat extension and stale lease recovery (re-queues jobs whose worker died or timed out).
   - Graceful shutdown on `SIGINT` / `SIGTERM` signals stopping new job pickups and waiting for in-flight tasks to drain within a drain timeout.

4. **Retries & Dead Letter Queue (DLQ)**:
   - Exponential and fixed backoff with configurable jitter for failed jobs.
   - Automatic transition to Dead Letter Queue (`state = 'dead'`) when `max_retries` is exceeded.
   - CLI commands & TypeScript API to inspect, purge, or replay failed DLQ jobs.

5. **Recurring Cron Scheduler**:
   - Register recurring jobs with standard cron expressions (e.g. `*/5 * * * *`) or fixed intervals.
   - Non-overlapping execution guarantee (`prevent_overlap = true`) preventing concurrent executions if a previous job is still in-flight.

6. **CLI & Monitoring**:
   - `taskqueue worker start [--queue <queues...>] [--concurrency <n>]`
   - `taskqueue job submit --queue <name> --payload <json> [--priority <0..3>] [--parents <ids>]`
   - `taskqueue job status <id>`
   - `taskqueue metrics [--queue <name>]`
   - `taskqueue dlq list`, `taskqueue dlq replay <id|all>`, `taskqueue dlq purge <id|all>`
   - `taskqueue cron register`, `taskqueue cron list`, `taskqueue cron unregister`
   - Structured logging supporting `json` and `pretty` formats.

7. **Automated Test Suite**:
   - Comprehensive unit and integration test suite using Vitest (11 test suites, 31 tests).

---

## Installation & Build

```bash
npm install
npm run build
npm test
```

## CLI Usage

### 1. Start Worker Daemon
```bash
npx taskqueue worker start --queue default emails --concurrency 5 --enable-cron
```

### 2. Submit a Job
```bash
# Basic job
npx taskqueue job submit --queue emails --payload '{"to":"alice@example.com"}' --priority 1

# Delayed job (5000ms delay)
npx taskqueue job submit --queue emails --payload '{"to":"bob@example.com"}' --delay 5000

# DAG Dependent job (runs only after parent job completes)
npx taskqueue job submit --queue analytics --payload '{"action":"aggregate"}' --parents "job-id-1,job-id-2"
```

### 3. Check Job Status
```bash
npx taskqueue job status <job-id>
```

### 4. Queue Metrics
```bash
npx taskqueue metrics
```

### 5. DLQ (Dead Letter Queue) Management
```bash
# List dead jobs
npx taskqueue dlq list

# Replay dead job back to pending
npx taskqueue dlq replay <job-id>
npx taskqueue dlq replay all

# Purge dead jobs
npx taskqueue dlq purge <job-id>
npx taskqueue dlq purge all
```

### 6. Recurring Cron Scheduler
```bash
# Register a cron job (every hour)
npx taskqueue cron register --name hourly-sync --cron "0 * * * *" --queue sync --payload '{"type":"full"}'

# Register with fixed interval (every 30 seconds)
npx taskqueue cron register --name ping-service --interval 30000 --queue ping

# List registered recurring jobs
npx taskqueue cron list
```

---

## Programmatic TypeScript API

```typescript
import { DatabaseManager, JobStore, WorkerPool, CronScheduler, JobPriority } from 'taskqueue';

// 1. Initialize SQLite Database & Schema Migrations
const dbManager = new DatabaseManager({ filename: 'queue.db' });
const jobStore = new JobStore(dbManager.getDatabase());

// 2. Submit Jobs with DAG Dependencies
const parent = jobStore.submitJob({
  queue: 'reports',
  payload: { report: 'sales' },
  priority: JobPriority.HIGH,
});

const child = jobStore.submitJob({
  queue: 'reports',
  payload: { report: 'notify-management' },
  priority: JobPriority.NORMAL,
  parents: [parent.id],
});

// 3. Start Worker Pool
const worker = new WorkerPool(jobStore, {
  queues: ['reports'],
  concurrency: 4,
  drainTimeoutMs: 10000,
});

worker.handle('reports', async (job, signal) => {
  console.log(`Processing report:`, job.payload);
  // Perform work...
});

worker.start();
```
