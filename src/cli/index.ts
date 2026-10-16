#!/usr/bin/env node
import { Command } from 'commander';
import { DatabaseManager } from '../storage/database.js';
import { JobStore } from '../storage/job-store.js';
import { WorkerPool } from '../engine/worker-pool.js';
import { CronScheduler } from '../scheduler/cron-scheduler.js';
import { DLQManager } from '../dlq/dlq-manager.js';
import { GracefulShutdownManager } from '../engine/shutdown.js';
import { Logger, LogFormat, LogLevel, logger } from '../logger/logger.js';
import { JobPriority, BackoffStrategy } from '../types/job.js';

const program = new Command();

program
  .name('taskqueue')
  .description('Production-grade distributed-style task queue and scheduler in TypeScript')
  .version('1.0.0')
  .option('--db <path>', 'Path to SQLite database file', process.env.QUEUE_DB_PATH ?? 'queue.db')
  .option('--log-format <format>', 'Log format: pretty | json', (process.env.LOG_FORMAT as LogFormat) ?? 'pretty')
  .option('--log-level <level>', 'Log level: debug | info | warn | error', (process.env.LOG_LEVEL as LogLevel) ?? 'info');

function initContext(options: { db?: string; logFormat?: string; logLevel?: string }) {
  const log = new Logger({
    format: (options.logFormat as LogFormat) ?? 'pretty',
    level: (options.logLevel as LogLevel) ?? 'info',
  });

  const dbManager = new DatabaseManager({
    filename: options.db ?? 'queue.db',
    logger: log,
  });

  const jobStore = new JobStore(dbManager.getDatabase(), log);
  const dlqManager = new DLQManager(jobStore, log);
  const cronScheduler = new CronScheduler(dbManager.getDatabase(), jobStore, log);

  return { dbManager, jobStore, dlqManager, cronScheduler, log };
}

// 1. Worker Start
program
  .command('worker')
  .description('Worker engine commands')
  .command('start')
  .description('Start the queue worker daemon')
  .option('-q, --queue <queues...>', 'Queues to process', ['default'])
  .option('-c, --concurrency <number>', 'Worker concurrency limit', '5')
  .option('--poll-interval <ms>', 'Polling interval in ms', '200')
  .option('--drain-timeout <ms>', 'Drain timeout for graceful shutdown in ms', '15000')
  .option('--enable-cron', 'Also run cron scheduler in this daemon process', false)
  .action(async (cmdOptions) => {
    const globalOpts = program.opts();
    const { dbManager, jobStore, cronScheduler, log } = initContext(globalOpts);

    const queues = Array.isArray(cmdOptions.queue) ? cmdOptions.queue : [cmdOptions.queue];
    const concurrency = parseInt(cmdOptions.concurrency, 10);
    const pollIntervalMs = parseInt(cmdOptions.pollInterval, 10);
    const drainTimeoutMs = parseInt(cmdOptions.drainTimeout, 10);

    const workerPool = new WorkerPool(
      jobStore,
      {
        queues,
        concurrency,
        pollIntervalMs,
        drainTimeoutMs,
      },
      log
    );

    // Default built-in handler for demonstration and execution
    workerPool.handle(async (job, signal) => {
      log.info(`Executing job ${job.id} [${job.queue}]`, {
        payload: job.payload,
        priority: job.priority,
      });

      // Simulating processing or payload command
      if (typeof job.payload === 'object' && job.payload !== null) {
        const p = job.payload as Record<string, any>;
        if (p.sleepMs) {
          await new Promise<void>((resolve, reject) => {
            const timer = setTimeout(resolve, p.sleepMs);
            signal.addEventListener('abort', () => {
              clearTimeout(timer);
              reject(new Error('Job aborted by worker'));
            });
          });
        }
        if (p.shouldFail) {
          throw new Error(p.errorMessage ?? 'Simulated job failure');
        }
      }
    });

    if (cmdOptions.enableCron) {
      cronScheduler.start();
    }

    const shutdown = new GracefulShutdownManager({
      workerPool,
      cronScheduler: cmdOptions.enableCron ? cronScheduler : undefined,
      dbManager,
      drainTimeoutMs,
      logger: log,
    });
    shutdown.register();

    workerPool.start();
    log.info(`Worker daemon running. Press Ctrl+C to stop gracefully.`);
  });

// 2. Job Submit
const jobCmd = program.command('job').description('Job management commands');

jobCmd
  .command('submit')
  .description('Submit a new job')
  .option('-q, --queue <name>', 'Queue name', 'default')
  .requiredOption('-p, --payload <json>', 'Job payload (JSON string or text)')
  .option('--priority <priority>', 'Priority: 0 (critical), 1 (high), 2 (normal), 3 (low)', '2')
  .option('--delay <ms>', 'Delay before execution in milliseconds', '0')
  .option('--parents <ids>', 'Comma-separated parent job IDs that must complete first')
  .option('--max-retries <n>', 'Max retry attempts', '3')
  .option('--backoff <strategy>', 'Backoff strategy: exponential | fixed', 'exponential')
  .option('--timeout <ms>', 'Job timeout in milliseconds', '30000')
  .option('--webhook-url <url>', 'Webhook URL for completion/failure notifications')
  .option('--webhook-headers <json>', 'JSON headers to send with webhook request')
  .action((cmdOptions) => {
    const globalOpts = program.opts();
    const { dbManager, jobStore } = initContext(globalOpts);

    let parsedPayload: any;
    try {
      parsedPayload = JSON.parse(cmdOptions.payload);
    } catch {
      parsedPayload = { data: cmdOptions.payload };
    }

    let webhookHeaders: Record<string, string> | undefined;
    if (cmdOptions.webhookHeaders) {
      try {
        webhookHeaders = JSON.parse(cmdOptions.webhookHeaders);
      } catch {
        console.error('Invalid JSON provided for --webhook-headers');
      }
    }

    const parents = cmdOptions.parents
      ? cmdOptions.parents.split(',').map((s: string) => s.trim()).filter(Boolean)
      : [];

    const job = jobStore.submitJob({
      queue: cmdOptions.queue,
      payload: parsedPayload,
      priority: parseInt(cmdOptions.priority, 10),
      delay_ms: parseInt(cmdOptions.delay, 10),
      parents,
      max_retries: parseInt(cmdOptions.maxRetries, 10),
      backoff_strategy: cmdOptions.backoff as BackoffStrategy,
      timeout_ms: parseInt(cmdOptions.timeout, 10),
      webhook_url: cmdOptions.webhookUrl,
      webhook_headers: webhookHeaders,
    });

    console.log(
      JSON.stringify(
        {
          success: true,
          job: {
            id: job.id,
            queue: job.queue,
            state: job.state,
            priority: job.priority,
            run_at: new Date(job.run_at).toISOString(),
            parents,
          },
        },
        null,
        2
      )
    );
    dbManager.close();
  });

// 3. Job Status
jobCmd
  .command('status <id>')
  .description('Get job details and status by ID')
  .action((id: string) => {
    const globalOpts = program.opts();
    const { dbManager, jobStore } = initContext(globalOpts);

    const job = jobStore.getJob(id);
    if (!job) {
      console.error(`Error: Job ${id} not found.`);
      dbManager.close();
      process.exit(1);
    }

    const parents = jobStore.getParents(id);
    const children = jobStore.getChildren(id);

    console.log(
      JSON.stringify(
        {
          ...job,
          parents,
          children,
          created_at_iso: new Date(job.created_at).toISOString(),
          run_at_iso: new Date(job.run_at).toISOString(),
          started_at_iso: job.started_at ? new Date(job.started_at).toISOString() : null,
          completed_at_iso: job.completed_at ? new Date(job.completed_at).toISOString() : null,
        },
        null,
        2
      )
    );
    dbManager.close();
  });

// 4. Metrics
program
  .command('metrics')
  .description('Inspect queue metrics and job counts')
  .option('-q, --queue <name>', 'Filter by queue')
  .option('--json', 'Output raw JSON')
  .action((cmdOptions) => {
    const globalOpts = program.opts();
    const { dbManager, jobStore } = initContext(globalOpts);

    const metrics = jobStore.getMetrics(cmdOptions.queue);

    if (cmdOptions.json) {
      console.log(JSON.stringify(metrics, null, 2));
    } else {
      console.log('\n=== TASK QUEUE METRICS ===\n');
      console.table(
        metrics.queues.map((q) => ({
          Queue: q.queue,
          Pending: q.pending,
          Scheduled: q.scheduled,
          Running: q.running,
          Completed: q.completed,
          Failed: q.failed,
          Dead: q.dead,
          Canceled: q.canceled,
          Blocked: q.blocked,
          Total: q.total,
        }))
      );
      console.log(
        `Totals: Pending=${metrics.totalPending} | Running=${metrics.totalRunning} | Completed=${metrics.totalCompleted} | Failed=${metrics.totalFailed} | Dead=${metrics.totalDead}\n`
      );
    }

    dbManager.close();
  });

// 5. DLQ Commands
const dlqCmd = program.command('dlq').description('Dead Letter Queue management');

dlqCmd
  .command('list')
  .description('List jobs currently in DLQ')
  .option('-q, --queue <name>', 'Filter by queue')
  .option('--limit <n>', 'Limit count', '20')
  .option('--offset <n>', 'Offset', '0')
  .option('--json', 'Output as JSON')
  .action((cmdOptions) => {
    const globalOpts = program.opts();
    const { dbManager, dlqManager } = initContext(globalOpts);

    const jobs = dlqManager.list(
      cmdOptions.queue,
      parseInt(cmdOptions.limit, 10),
      parseInt(cmdOptions.offset, 10)
    );

    if (cmdOptions.json) {
      console.log(JSON.stringify(jobs, null, 2));
    } else {
      console.log(`\n=== DEAD LETTER QUEUE (${jobs.length} jobs) ===\n`);
      if (jobs.length === 0) {
        console.log('DLQ is clean. No dead jobs found.');
      } else {
        console.table(
          jobs.map((j) => ({
            ID: j.id,
            Queue: j.queue,
            Retries: `${j.retry_count}/${j.max_retries}`,
            Error: (j.last_error ?? '').slice(0, 40),
            DiedAt: j.completed_at ? new Date(j.completed_at).toISOString() : '-',
          }))
        );
      }
    }

    dbManager.close();
  });

dlqCmd
  .command('replay <target>')
  .description('Replay a dead job by ID, or specify "all" to replay all dead jobs')
  .option('-q, --queue <name>', 'Queue filter (used when target is "all")')
  .action((target: string, cmdOptions) => {
    const globalOpts = program.opts();
    const { dbManager, dlqManager } = initContext(globalOpts);

    if (target.toLowerCase() === 'all') {
      const count = dlqManager.replayAll(cmdOptions.queue);
      console.log(`Replayed ${count} jobs from DLQ back to pending.`);
    } else {
      const success = dlqManager.replay(target);
      if (success) {
        console.log(`Job ${target} successfully replayed to pending state.`);
      } else {
        console.error(`Failed to replay job ${target}: Job not found in DLQ.`);
        process.exit(1);
      }
    }

    dbManager.close();
  });

dlqCmd
  .command('purge <target>')
  .description('Purge (delete) a dead job by ID, or specify "all" to purge all dead jobs')
  .option('-q, --queue <name>', 'Queue filter (used when target is "all")')
  .action((target: string, cmdOptions) => {
    const globalOpts = program.opts();
    const { dbManager, dlqManager } = initContext(globalOpts);

    if (target.toLowerCase() === 'all') {
      const count = dlqManager.purgeAll(cmdOptions.queue);
      console.log(`Purged ${count} jobs from DLQ.`);
    } else {
      const success = dlqManager.purge(target);
      if (success) {
        console.log(`Job ${target} successfully purged from DLQ.`);
      } else {
        console.error(`Failed to purge job ${target}: Job not found in DLQ.`);
        process.exit(1);
      }
    }

    dbManager.close();
  });

// 6. Cron Commands
const cronCmd = program.command('cron').description('Recurring cron scheduler management');

cronCmd
  .command('register')
  .description('Register or update a recurring cron job')
  .requiredOption('--name <name>', 'Unique recurring job name')
  .option('--cron <expression>', 'Cron expression (e.g. "*/5 * * * *")')
  .option('--interval <ms>', 'Fixed interval in milliseconds')
  .option('-q, --queue <name>', 'Queue to dispatch into', 'default')
  .option('-p, --payload <json>', 'Payload JSON', '{}')
  .option('--priority <0|1|2|3>', 'Job priority', '2')
  .option('--no-overlap', 'Allow overlapping runs (default prevents overlap)')
  .action((cmdOptions) => {
    const globalOpts = program.opts();
    const { dbManager, cronScheduler } = initContext(globalOpts);

    let payload: any;
    try {
      payload = JSON.parse(cmdOptions.payload);
    } catch {
      payload = { data: cmdOptions.payload };
    }

    const intervalMs = cmdOptions.interval ? parseInt(cmdOptions.interval, 10) : undefined;

    const registered = cronScheduler.register({
      name: cmdOptions.name,
      queue: cmdOptions.queue,
      cron_expression: cmdOptions.cron,
      interval_ms: intervalMs,
      payload,
      priority: parseInt(cmdOptions.priority, 10),
      prevent_overlap: cmdOptions.overlap !== false,
    });

    console.log(
      JSON.stringify(
        {
          success: true,
          cron: {
            name: registered.name,
            queue: registered.queue,
            cron_expression: registered.cron_expression,
            interval_ms: registered.interval_ms,
            prevent_overlap: registered.prevent_overlap,
            next_run_at: new Date(registered.next_run_at).toISOString(),
          },
        },
        null,
        2
      )
    );

    dbManager.close();
  });

cronCmd
  .command('list')
  .description('List registered recurring jobs')
  .option('--json', 'Output as JSON')
  .action((cmdOptions) => {
    const globalOpts = program.opts();
    const { dbManager, cronScheduler } = initContext(globalOpts);

    const list = cronScheduler.list();

    if (cmdOptions.json) {
      console.log(JSON.stringify(list, null, 2));
    } else {
      console.log(`\n=== REGISTERED CRON JOBS (${list.length}) ===\n`);
      if (list.length === 0) {
        console.log('No recurring jobs registered.');
      } else {
        console.table(
          list.map((c) => ({
            Name: c.name,
            Queue: c.queue,
            Schedule: c.cron_expression ?? `Every ${c.interval_ms}ms`,
            PreventOverlap: c.prevent_overlap ? 'YES' : 'NO',
            LastRun: c.last_run_at ? new Date(c.last_run_at).toISOString() : '-',
            NextRun: new Date(c.next_run_at).toISOString(),
          }))
        );
      }
    }

    dbManager.close();
  });

cronCmd
  .command('unregister <name>')
  .description('Unregister a recurring cron job')
  .action((name: string) => {
    const globalOpts = program.opts();
    const { dbManager, cronScheduler } = initContext(globalOpts);

    const success = cronScheduler.unregister(name);
    if (success) {
      console.log(`Recurring job "${name}" successfully unregistered.`);
    } else {
      console.error(`Recurring job "${name}" not found.`);
      process.exit(1);
    }

    dbManager.close();
  });

// 7. Queue Controls
const queueCmd = program.command('queue').description('Queue management and pause/resume controls');

queueCmd
  .command('pause <name>')
  .description('Pause a queue to stop leasing new jobs')
  .action((name: string) => {
    const globalOpts = program.opts();
    const { dbManager, jobStore } = initContext(globalOpts);

    jobStore.pauseQueue(name);
    console.log(`Queue "${name}" is now paused.`);
    dbManager.close();
  });

queueCmd
  .command('resume <name>')
  .description('Resume a paused queue')
  .action((name: string) => {
    const globalOpts = program.opts();
    const { dbManager, jobStore } = initContext(globalOpts);

    jobStore.resumeQueue(name);
    console.log(`Queue "${name}" is now resumed.`);
    dbManager.close();
  });

queueCmd
  .command('list')
  .description('List queues with paused status and job counts')
  .option('--json', 'Output as JSON')
  .action((cmdOptions) => {
    const globalOpts = program.opts();
    const { dbManager, jobStore } = initContext(globalOpts);

    const queues = jobStore.listQueuesSummary();

    if (cmdOptions.json) {
      console.log(JSON.stringify(queues, null, 2));
    } else {
      console.log(`\n=== QUEUES STATUS (${queues.length}) ===\n`);
      if (queues.length === 0) {
        console.log('No queues found.');
      } else {
        console.table(
          queues.map((q) => ({
            Queue: q.name,
            Status: q.is_paused ? 'PAUSED' : 'ACTIVE',
            Pending: q.pending,
            Scheduled: q.scheduled,
            Running: q.running,
            Completed: q.completed,
            Failed: q.failed,
            Dead: q.dead,
            Total: q.total,
          }))
        );
      }
    }

    dbManager.close();
  });

program.parse(process.argv);
