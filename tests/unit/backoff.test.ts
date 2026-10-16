import { describe, it, expect } from 'vitest';
import { BackoffCalculator } from '../../src/engine/backoff.js';

describe('BackoffCalculator', () => {
  it('calculates deterministic exponential backoff without jitter', () => {
    const baseMs = 1000;
    const opt = { strategy: 'exponential' as const, baseMs, jitter: false };

    // retry 1: 1000 * 2^0 = 1000
    expect(BackoffCalculator.calculate(1, opt)).toBe(1000);
    // retry 2: 1000 * 2^1 = 2000
    expect(BackoffCalculator.calculate(2, opt)).toBe(2000);
    // retry 3: 1000 * 2^2 = 4000
    expect(BackoffCalculator.calculate(3, opt)).toBe(4000);
    // retry 4: 1000 * 2^3 = 8000
    expect(BackoffCalculator.calculate(4, opt)).toBe(8000);
  });

  it('calculates fixed backoff without jitter', () => {
    const baseMs = 2500;
    const opt = { strategy: 'fixed' as const, baseMs, jitter: false };

    expect(BackoffCalculator.calculate(1, opt)).toBe(2500);
    expect(BackoffCalculator.calculate(2, opt)).toBe(2500);
    expect(BackoffCalculator.calculate(5, opt)).toBe(2500);
  });

  it('respects maxDelayMs upper bound', () => {
    const baseMs = 1000;
    const maxDelayMs = 5000;
    const opt = { strategy: 'exponential' as const, baseMs, maxDelayMs, jitter: false };

    // retry 10 would be 512,000 without cap, but should be capped at 5000
    expect(BackoffCalculator.calculate(10, opt)).toBe(5000);
  });

  it('applies jitter within configured ratio bounds', () => {
    const baseMs = 10000;
    const jitterRatio = 0.2; // +/- 20%: between 8000 and 12000
    const opt = { strategy: 'fixed' as const, baseMs, jitter: true, jitterRatio };

    for (let i = 0; i < 50; i++) {
      const delay = BackoffCalculator.calculate(1, opt);
      expect(delay).toBeGreaterThanOrEqual(8000);
      expect(delay).toBeLessThanOrEqual(12000);
    }
  });
});
