import { describe, it, expect } from 'vitest';
import { CycleDetector } from '../../src/dag/cycle-detector.js';
import { CycleDetectedError } from '../../src/types/dag.js';

describe('CycleDetector', () => {
  it('detects simple direct 2-node cycle (A -> B -> A)', () => {
    // A is parent of B, B is parent of A
    const edges = new Map<string, string[]>();
    edges.set('B', ['A']);
    edges.set('A', ['B']);

    const result = CycleDetector.detectCycle(edges);
    expect(result.hasCycle).toBe(true);
    expect(result.cyclePath).toBeDefined();
    expect(result.cyclePath!.length).toBeGreaterThanOrEqual(2);
  });

  it('detects self-loop (A -> A)', () => {
    const edges = new Map<string, string[]>();
    edges.set('A', ['A']);

    const result = CycleDetector.detectCycle(edges);
    expect(result.hasCycle).toBe(true);
  });

  it('detects 3-node transitive cycle (A -> B -> C -> A)', () => {
    const edges = new Map<string, string[]>();
    edges.set('B', ['A']);
    edges.set('C', ['B']);
    edges.set('A', ['C']);

    const result = CycleDetector.detectCycle(edges);
    expect(result.hasCycle).toBe(true);
  });

  it('allows valid acyclic diamond DAG (A -> B, A -> C, B -> D, C -> D)', () => {
    const edges = new Map<string, string[]>();
    edges.set('B', ['A']);
    edges.set('C', ['A']);
    edges.set('D', ['B', 'C']);

    const result = CycleDetector.detectCycle(edges);
    expect(result.hasCycle).toBe(false);
  });

  it('detects cycle when new edges connect back to an ancestor', () => {
    const existing = new Map<string, string[]>();
    existing.set('B', ['A']);
    existing.set('C', ['B']);

    const newEdges = new Map<string, string[]>();
    newEdges.set('A', ['C']); // C is descendant of A, so A depending on C forms cycle

    const result = CycleDetector.detectCycle(existing, newEdges);
    expect(result.hasCycle).toBe(true);
  });

  it('topologically sorts an acyclic graph via Kahn algorithm', () => {
    const nodes = ['A', 'B', 'C', 'D'];
    const childToParents = new Map<string, string[]>();
    childToParents.set('B', ['A']);
    childToParents.set('C', ['A']);
    childToParents.set('D', ['B', 'C']);

    const order = CycleDetector.topologicalSort(nodes, childToParents);
    expect(order.indexOf('A')).toBeLessThan(order.indexOf('B'));
    expect(order.indexOf('A')).toBeLessThan(order.indexOf('C'));
    expect(order.indexOf('B')).toBeLessThan(order.indexOf('D'));
    expect(order.indexOf('C')).toBeLessThan(order.indexOf('D'));
  });

  it('throws CycleDetectedError during topologicalSort if graph has cycle', () => {
    const nodes = ['A', 'B', 'C'];
    const childToParents = new Map<string, string[]>();
    childToParents.set('B', ['A']);
    childToParents.set('C', ['B']);
    childToParents.set('A', ['C']);

    expect(() => CycleDetector.topologicalSort(nodes, childToParents)).toThrowError(
      CycleDetectedError
    );
  });
});
