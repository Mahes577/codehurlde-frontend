import { WorkerPool } from './worker-pool.js';
import { CronScheduler } from '../scheduler/cron-scheduler.js';
import { DatabaseManager } from '../storage/database.js';
import { Logger, logger } from '../logger/logger.js';

export interface ShutdownOptions {
  drainTimeoutMs?: number;
  workerPool?: WorkerPool;
  cronScheduler?: CronScheduler;
  dbManager?: DatabaseManager;
  logger?: Logger;
  onBeforeShutdown?: () => Promise<void> | void;
}

export class GracefulShutdownManager {
  private isShuttingDown = false;
  private log: Logger;

  constructor(private options: ShutdownOptions) {
    this.log = options.logger ?? logger.child('shutdown');
  }

  public register(): void {
    const handler = async (signal: string) => {
      if (this.isShuttingDown) {
        this.log.warn(`Received ${signal} again, forcing immediate termination`);
        process.exit(1);
      }

      this.isShuttingDown = true;
      this.log.info(`Received ${signal}. Initiating graceful shutdown...`);

      try {
        if (this.options.onBeforeShutdown) {
          await this.options.onBeforeShutdown();
        }

        if (this.options.cronScheduler) {
          this.options.cronScheduler.stop();
        }

        if (this.options.workerPool) {
          await this.options.workerPool.stop(this.options.drainTimeoutMs);
        }

        if (this.options.dbManager) {
          this.options.dbManager.close();
        }

        this.log.info('Graceful shutdown completed successfully');
        process.exit(0);
      } catch (err: any) {
        this.log.error(`Error during graceful shutdown: ${err.message}`, { error: err });
        process.exit(1);
      }
    };

    process.once('SIGINT', () => handler('SIGINT'));
    process.once('SIGTERM', () => handler('SIGTERM'));
  }
}
