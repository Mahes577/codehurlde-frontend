import { JobStore } from '../storage/job-store.js';
import { Job } from '../types/job.js';
import { Logger, logger } from '../logger/logger.js';

export class DLQManager {
  private jobStore: JobStore;
  private log: Logger;

  constructor(jobStore: JobStore, customLogger?: Logger) {
    this.jobStore = jobStore;
    this.log = customLogger ?? logger.child('dlq');
  }

  public list<T = unknown>(queue?: string, limit = 50, offset = 0): Job<T>[] {
    return this.jobStore.listDeadJobs<T>(queue, limit, offset);
  }

  public replay(jobId: string): boolean {
    const success = this.jobStore.replayDeadJob(jobId);
    if (success) {
      this.log.info(`Replayed dead job ${jobId}`);
    } else {
      this.log.warn(`Job ${jobId} not found in DLQ or could not be replayed`);
    }
    return success;
  }

  public replayAll(queue?: string): number {
    const count = this.jobStore.replayAllDeadJobs(queue);
    this.log.info(`Replayed ${count} dead jobs${queue ? ` for queue ${queue}` : ''}`);
    return count;
  }

  public purge(jobId: string): boolean {
    const success = this.jobStore.purgeDeadJob(jobId);
    if (success) {
      this.log.info(`Purged dead job ${jobId}`);
    } else {
      this.log.warn(`Job ${jobId} not found in DLQ or could not be purged`);
    }
    return success;
  }

  public purgeAll(queue?: string): number {
    const count = this.jobStore.purgeAllDeadJobs(queue);
    this.log.info(`Purged ${count} dead jobs${queue ? ` for queue ${queue}` : ''}`);
    return count;
  }
}
