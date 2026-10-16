import Database from 'better-sqlite3';
import { MigrationEngine } from './migrations.js';
import { Logger, logger } from '../logger/logger.js';
import path from 'path';
import fs from 'fs';

export interface DatabaseOptions {
  filename?: string;
  readonly?: boolean;
  timeout?: number;
  verbose?: (message?: unknown, ...additionalArgs: unknown[]) => void;
  runMigrations?: boolean;
  logger?: Logger;
}

export class DatabaseManager {
  private db: Database.Database;
  private log: Logger;

  constructor(options: DatabaseOptions = {}) {
    const filename = options.filename ?? process.env.QUEUE_DB_PATH ?? 'queue.db';
    this.log = options.logger ?? logger.child('db');

    if (filename !== ':memory:') {
      const dir = path.dirname(path.resolve(filename));
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
    }

    this.db = new Database(filename, {
      readonly: options.readonly ?? false,
      timeout: options.timeout ?? 10000,
      verbose: options.verbose,
    });

    // Configure SQLite pragmas for high performance and concurrency
    this.db.pragma('journal_mode = WAL');
    this.db.pragma('synchronous = NORMAL');
    this.db.pragma('foreign_keys = ON');
    this.db.pragma('busy_timeout = 10000');

    if (options.runMigrations !== false && !options.readonly) {
      const migrationEngine = new MigrationEngine(this.db, this.log);
      migrationEngine.run();
    }
  }

  public getDatabase(): Database.Database {
    return this.db;
  }

  public close(): void {
    if (this.db.open) {
      this.db.close();
      this.log.debug('Database connection closed');
    }
  }

  public isOpen(): boolean {
    return this.db.open;
  }
}
