import Database from 'better-sqlite3';
import { Logger, logger } from '../logger/logger.js';

export interface Migration {
  name: string;
  up: (db: Database.Database) => void;
  down?: (db: Database.Database) => void;
}

export const migrations: Migration[] = [
  {
    name: '001_initial_schema',
    up: (db: Database.Database) => {
      // Jobs table
      db.exec(`
        CREATE TABLE IF NOT EXISTS jobs (
          id TEXT PRIMARY KEY,
          queue TEXT NOT NULL DEFAULT 'default',
          payload TEXT NOT NULL,
          priority INTEGER NOT NULL DEFAULT 2, -- 0: critical, 1: high, 2: normal, 3: low
          state TEXT NOT NULL DEFAULT 'pending',
          max_retries INTEGER NOT NULL DEFAULT 3,
          retry_count INTEGER NOT NULL DEFAULT 0,
          backoff_strategy TEXT NOT NULL DEFAULT 'exponential', -- 'exponential' | 'fixed'
          backoff_base_ms INTEGER NOT NULL DEFAULT 1000,
          timeout_ms INTEGER NOT NULL DEFAULT 30000,
          run_at INTEGER NOT NULL,
          created_at INTEGER NOT NULL,
          started_at INTEGER,
          completed_at INTEGER,
          last_error TEXT,
          worker_id TEXT,
          heartbeat_at INTEGER,
          lease_expires_at INTEGER,
          version INTEGER NOT NULL DEFAULT 0
        );

        -- Indexes for high throughput leasing and state transitions
        CREATE INDEX IF NOT EXISTS idx_jobs_lease 
          ON jobs (queue, state, priority, run_at, created_at);

        CREATE INDEX IF NOT EXISTS idx_jobs_stale 
          ON jobs (state, lease_expires_at);

        CREATE INDEX IF NOT EXISTS idx_jobs_run_at 
          ON jobs (state, run_at);

        CREATE INDEX IF NOT EXISTS idx_jobs_queue_state 
          ON jobs (queue, state);

        -- Job dependencies table (DAG)
        CREATE TABLE IF NOT EXISTS job_dependencies (
          job_id TEXT NOT NULL,
          parent_job_id TEXT NOT NULL,
          PRIMARY KEY (job_id, parent_job_id),
          FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE,
          FOREIGN KEY (parent_job_id) REFERENCES jobs(id) ON DELETE CASCADE
        );

        CREATE INDEX IF NOT EXISTS idx_dep_parent 
          ON job_dependencies (parent_job_id);

        CREATE INDEX IF NOT EXISTS idx_dep_job 
          ON job_dependencies (job_id);

        -- Cron and recurring jobs table
        CREATE TABLE IF NOT EXISTS cron_jobs (
          name TEXT PRIMARY KEY,
          queue TEXT NOT NULL DEFAULT 'default',
          payload TEXT NOT NULL DEFAULT '{}',
          cron_expression TEXT,
          interval_ms INTEGER,
          priority INTEGER NOT NULL DEFAULT 2,
          max_retries INTEGER NOT NULL DEFAULT 3,
          backoff_strategy TEXT NOT NULL DEFAULT 'exponential',
          timeout_ms INTEGER NOT NULL DEFAULT 30000,
          prevent_overlap INTEGER NOT NULL DEFAULT 1,
          last_run_at INTEGER,
          next_run_at INTEGER NOT NULL,
          is_active INTEGER NOT NULL DEFAULT 1,
          last_job_id TEXT,
          created_at INTEGER NOT NULL,
          updated_at INTEGER NOT NULL
        );

        CREATE INDEX IF NOT EXISTS idx_cron_next 
          ON cron_jobs (is_active, next_run_at);
      `);
    },
  },
  {
    name: '002_webhooks_and_queues',
    up: (db: Database.Database) => {
      const tableInfo = db.prepare('PRAGMA table_info(jobs)').all() as { name: string }[];
      const colNames = new Set(tableInfo.map((c) => c.name));

      if (!colNames.has('webhook_url')) {
        db.exec('ALTER TABLE jobs ADD COLUMN webhook_url TEXT;');
      }
      if (!colNames.has('webhook_headers')) {
        db.exec('ALTER TABLE jobs ADD COLUMN webhook_headers TEXT;');
      }

      db.exec(`
        CREATE TABLE IF NOT EXISTS queues (
          name TEXT PRIMARY KEY,
          is_paused INTEGER NOT NULL DEFAULT 0,
          created_at INTEGER NOT NULL,
          updated_at INTEGER NOT NULL
        );
      `);
    },
  },
];

export class MigrationEngine {
  private db: Database.Database;
  private log: Logger;

  constructor(db: Database.Database, customLogger?: Logger) {
    this.db = db;
    this.log = customLogger ?? logger.child('migrations');
  }

  public run(): void {
    // Ensure _migrations table exists
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS _migrations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE,
        applied_at INTEGER NOT NULL
      );
    `);

    const appliedRows = this.db
      .prepare('SELECT name FROM _migrations ORDER BY id ASC')
      .all() as { name: string }[];
    const appliedSet = new Set(appliedRows.map((r) => r.name));

    const insertMigration = this.db.prepare(
      'INSERT INTO _migrations (name, applied_at) VALUES (?, ?)'
    );

    for (const migration of migrations) {
      if (!appliedSet.has(migration.name)) {
        this.log.info(`Applying migration: ${migration.name}`);
        const executeTransaction = this.db.transaction(() => {
          migration.up(this.db);
          insertMigration.run(migration.name, Date.now());
        });
        executeTransaction();
        this.log.info(`Applied migration: ${migration.name}`);
      }
    }
  }

  public getAppliedMigrations(): { id: number; name: string; applied_at: number }[] {
    return this.db
      .prepare('SELECT id, name, applied_at FROM _migrations ORDER BY id ASC')
      .all() as { id: number; name: string; applied_at: number }[];
  }
}
