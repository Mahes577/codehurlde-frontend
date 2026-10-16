import { describe, it, expect } from 'vitest';
import Database from 'better-sqlite3';
import { MigrationEngine } from '../../src/storage/migrations.js';

describe('Schema Migration Engine', () => {
  it('applies migrations to clean database and creates schema', () => {
    const db = new Database(':memory:');
    const engine = new MigrationEngine(db);

    engine.run();

    const applied = engine.getAppliedMigrations();
    expect(applied.length).toBe(1);
    expect(applied[0].name).toBe('001_initial_schema');

    // Verify tables exist
    const tables = db
      .prepare("SELECT name FROM sqlite_master WHERE type='table'")
      .all() as { name: string }[];
    const tableNames = tables.map((t) => t.name);

    expect(tableNames).toContain('_migrations');
    expect(tableNames).toContain('jobs');
    expect(tableNames).toContain('job_dependencies');
    expect(tableNames).toContain('cron_jobs');

    db.close();
  });

  it('is idempotent when run repeatedly', () => {
    const db = new Database(':memory:');
    const engine = new MigrationEngine(db);

    engine.run();
    const firstCount = engine.getAppliedMigrations().length;

    engine.run();
    const secondCount = engine.getAppliedMigrations().length;

    expect(secondCount).toBe(firstCount);
    db.close();
  });
});
