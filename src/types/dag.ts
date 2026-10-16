export interface JobDependencyRow {
  job_id: string;
  parent_job_id: string;
}

export interface DAGNode {
  id: string;
  parents: string[];
  children: string[];
}

export interface DAGValidationResult {
  hasCycle: boolean;
  cycleNodes?: string[];
  topologicalOrder?: string[];
}

export class CycleDetectedError extends Error {
  public readonly cyclePath: string[];

  constructor(cyclePath: string[]) {
    super(`Cycle detected in job dependency graph: ${cyclePath.join(' -> ')}`);
    this.name = 'CycleDetectedError';
    this.cyclePath = cyclePath;
  }
}

export class JobNotFoundError extends Error {
  constructor(jobId: string) {
    super(`Job with ID ${jobId} not found`);
    this.name = 'JobNotFoundError';
  }
}
