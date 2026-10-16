import { BackoffStrategy } from '../types/job.js';

export interface BackoffOptions {
  strategy?: BackoffStrategy;
  baseMs?: number;
  maxDelayMs?: number;
  jitter?: boolean;
  jitterRatio?: number; // 0 to 1, fraction of delay to randomize
}

export class BackoffCalculator {
  /**
   * Calculate next backoff delay in milliseconds.
   *
   * @param retryCount - Current attempt number (1-indexed, 1 for first retry)
   * @param options - Configuration for backoff
   */
  public static calculate(
    retryCount: number,
    options: BackoffOptions = {}
  ): number {
    const strategy = options.strategy ?? 'exponential';
    const baseMs = options.baseMs ?? 1000;
    const maxDelayMs = options.maxDelayMs ?? 3600 * 1000; // 1 hour cap
    const jitter = options.jitter ?? true;
    const jitterRatio = options.jitterRatio ?? 0.25; // randomize +/- 25%

    let delay: number;

    if (strategy === 'fixed') {
      delay = baseMs;
    } else {
      // Exponential: baseMs * 2^(retryCount - 1)
      const factor = Math.pow(2, Math.max(0, retryCount - 1));
      delay = baseMs * factor;
    }

    // Cap at max delay
    delay = Math.min(delay, maxDelayMs);

    if (jitter && delay > 0) {
      // Apply uniform jitter around delay: delay * (1 - jitterRatio + random * 2 * jitterRatio)
      const minDelay = Math.max(0, delay * (1 - jitterRatio));
      const maxRange = delay * (1 + jitterRatio);
      delay = Math.floor(minDelay + Math.random() * (maxRange - minDelay));
    }

    return Math.max(0, Math.floor(delay));
  }
}
