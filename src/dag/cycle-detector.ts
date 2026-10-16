import { CycleDetectedError } from '../types/dag.js';

export interface DependencyGraph {
  // node -> array of node IDs that this node depends on (parents)
  // or node -> children. Let's explicitly define parents and children.
  getParents(id: string): string[];
  getChildren?(id: string): string[];
}

/**
 * Validates dependencies and detects cycles in directed graphs.
 * Graph edges: parent -> child (parent must execute before child).
 * A cycle exists if child is an ancestor of parent.
 */
export class CycleDetector {
  /**
   * Check if adding edges creates a cycle.
   * @param existingEdges map of child -> parents
   * @param newEdges map of child -> parents
   */
  public static detectCycle(
    existingParents: Map<string, string[]>,
    newParents?: Map<string, string[]>
  ): { hasCycle: boolean; cyclePath?: string[] } {
    // Merge existing and new adjacency
    // We build an adjacency list representing: dependency -> dependent (parent -> child)
    // and also child -> parents for ancestor checks.
    const parentToChildren = new Map<string, Set<string>>();
    const allNodes = new Set<string>();

    const addEdges = (map: Map<string, string[]>) => {
      for (const [child, parents] of map.entries()) {
        allNodes.add(child);
        for (const parent of parents) {
          allNodes.add(parent);
          if (!parentToChildren.has(parent)) {
            parentToChildren.set(parent, new Set());
          }
          parentToChildren.get(parent)!.add(child);
        }
      }
    };

    addEdges(existingParents);
    if (newParents) {
      addEdges(newParents);
    }

    // 3-color DFS cycle detection:
    // 0: Unvisited (white)
    // 1: Visiting in current recursion stack (gray)
    // 2: Visited (black)
    const color = new Map<string, number>();
    const parentMap = new Map<string, string>(); // To trace cycle path
    let cyclePath: string[] | undefined;

    const dfs = (node: string): boolean => {
      color.set(node, 1); // Gray

      const children = parentToChildren.get(node) || new Set();
      for (const child of children) {
        const childColor = color.get(child) ?? 0;
        if (childColor === 1) {
          // Cycle found! Reconstruct cycle path from node back to child
          const path = [child];
          let curr = node;
          while (curr && curr !== child) {
            path.push(curr);
            curr = parentMap.get(curr)!;
          }
          path.push(child);
          cyclePath = path.reverse();
          return true;
        }

        if (childColor === 0) {
          parentMap.set(child, node);
          if (dfs(child)) {
            return true;
          }
        }
      }

      color.set(node, 2); // Black
      return false;
    };

    for (const node of allNodes) {
      if ((color.get(node) ?? 0) === 0) {
        if (dfs(node)) {
          return { hasCycle: true, cyclePath };
        }
      }
    }

    return { hasCycle: false };
  }

  /**
   * Kahn's algorithm for topological sorting of a set of nodes.
   * Returns topological order if acyclic, throws CycleDetectedError if cycle detected.
   */
  public static topologicalSort(
    nodes: string[],
    childToParents: Map<string, string[]>
  ): string[] {
    const inDegree = new Map<string, number>();
    const parentToChildren = new Map<string, string[]>();

    for (const node of nodes) {
      inDegree.set(node, 0);
      parentToChildren.set(node, []);
    }

    // Compute in-degrees (number of parents)
    for (const [child, parents] of childToParents.entries()) {
      if (!inDegree.has(child)) inDegree.set(child, 0);

      for (const parent of parents) {
        if (!parentToChildren.has(parent)) parentToChildren.set(parent, []);
        parentToChildren.get(parent)!.push(child);
        inDegree.set(child, (inDegree.get(child) ?? 0) + 1);
      }
    }

    // Queue of nodes with in-degree 0 (no unresolved dependencies)
    const queue: string[] = [];
    for (const node of nodes) {
      if ((inDegree.get(node) ?? 0) === 0) {
        queue.push(node);
      }
    }

    const order: string[] = [];
    while (queue.length > 0) {
      const curr = queue.shift()!;
      order.push(curr);

      const children = parentToChildren.get(curr) || [];
      for (const child of children) {
        const deg = (inDegree.get(child) ?? 1) - 1;
        inDegree.set(child, deg);
        if (deg === 0) {
          queue.push(child);
        }
      }
    }

    if (order.length < nodes.length) {
      // Find remaining nodes with inDegree > 0 to report cycle
      const cycleNodes = nodes.filter((n) => (inDegree.get(n) ?? 0) > 0);
      throw new CycleDetectedError(cycleNodes);
    }

    return order;
  }
}
