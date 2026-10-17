import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  ChevronRight, 
  ChevronLeft, 
  GitFork, 
  Sparkles, 
  CheckCircle2, 
  Info,
  Maximize2,
  Code2,
  Flame,
  Award,
  Crown,
  Search
} from 'lucide-react';
import { Button } from '../atoms/Button';
import { Badge } from '../atoms/Badge';

export interface TreeNode {
  id: string;
  val: number;
  label: string;
  x: number;
  y: number;
  depth: number;
  parentId?: string;
  isLeftChild?: boolean;
}

export interface TreeEdge {
  id: string;
  source: string;
  target: string;
  direction: 'left' | 'right';
}

export interface TreeStep {
  step: number;
  title: string;
  description: string;
  currentNode: string;
  visitingPath: string[]; // nodes currently on DFS call stack
  activeEdge?: string; // edge currently being traversed
  foundNodes: string[]; // p or q found so far
  lcaNode?: string; // final LCA node
  lcaPathEdges: string[]; // edges on the tree connecting p, q and LCA
  lcaPathNodes: string[]; // nodes on the tree connecting p, q and LCA
  callStack: string[];
  codeLine: number;
}

const TREE_NODES: TreeNode[] = [
  // Depth 0
  { id: '3', val: 3, label: '3 (Root)', x: 320, y: 55, depth: 0 },
  // Depth 1
  { id: '5', val: 5, label: '5', x: 180, y: 135, depth: 1, parentId: '3', isLeftChild: true },
  { id: '1', val: 1, label: '1', x: 460, y: 135, depth: 1, parentId: '3', isLeftChild: false },
  // Depth 2
  { id: '6', val: 6, label: '6', x: 110, y: 215, depth: 2, parentId: '5', isLeftChild: true },
  { id: '2', val: 2, label: '2', x: 250, y: 215, depth: 2, parentId: '5', isLeftChild: false },
  { id: '0', val: 0, label: '0', x: 390, y: 215, depth: 2, parentId: '1', isLeftChild: true },
  { id: '8', val: 8, label: '8', x: 530, y: 215, depth: 2, parentId: '1', isLeftChild: false },
  // Depth 3
  { id: '7', val: 7, label: '7', x: 210, y: 295, depth: 3, parentId: '2', isLeftChild: true },
  { id: '4', val: 4, label: '4', x: 290, y: 295, depth: 3, parentId: '2', isLeftChild: false }
];

const TREE_EDGES: TreeEdge[] = [
  { id: '3-5', source: '3', target: '5', direction: 'left' },
  { id: '3-1', source: '3', target: '1', direction: 'right' },
  { id: '5-6', source: '5', target: '6', direction: 'left' },
  { id: '5-2', source: '5', target: '2', direction: 'right' },
  { id: '1-0', source: '1', target: '0', direction: 'left' },
  { id: '1-8', source: '1', target: '8', direction: 'right' },
  { id: '2-7', source: '2', target: '7', direction: 'left' },
  { id: '2-4', source: '2', target: '4', direction: 'right' }
];

export interface Scenario {
  id: string;
  title: string;
  p: string;
  q: string;
  expectedLca: string;
  steps: TreeStep[];
}

const SCENARIOS: Scenario[] = [
  {
    id: 'p5-q4',
    title: 'LCA of p=5 and q=4 (Ancestor is in Subtree)',
    p: '5',
    q: '4',
    expectedLca: '5',
    steps: [
      {
        step: 0,
        title: 'Start DFS at Root (3)',
        description: 'Target query: Find Lowest Common Ancestor of node p = 5 and node q = 4. Call dfs(root=3).',
        currentNode: '3',
        visitingPath: ['3'],
        foundNodes: [],
        lcaPathEdges: [],
        lcaPathNodes: [],
        callStack: ['dfs(3)'],
        codeLine: 1
      },
      {
        step: 1,
        title: 'Traverse Left to Node (5) — Found Target p=5!',
        description: 'Traverse left branch edge 3→5. Node 5 matches target p = 5! Mark p found and continue exploring subtree for q.',
        currentNode: '5',
        visitingPath: ['3', '5'],
        activeEdge: '3-5',
        foundNodes: ['5'],
        lcaPathEdges: [],
        lcaPathNodes: [],
        callStack: ['dfs(3)', 'dfs(5) [p MATCH]'],
        codeLine: 3
      },
      {
        step: 2,
        title: 'Explore Subtree: Traverse 5→2',
        description: 'From node 5, recurse into right child 2. Call dfs(2). Node 2 does not match p or q; inspect its children.',
        currentNode: '2',
        visitingPath: ['3', '5', '2'],
        activeEdge: '5-2',
        foundNodes: ['5'],
        lcaPathEdges: [],
        lcaPathNodes: [],
        callStack: ['dfs(3)', 'dfs(5)', 'dfs(2)'],
        codeLine: 4
      },
      {
        step: 3,
        title: 'Traverse 2→7 (Leaf null search)',
        description: 'Inspect left child 7. Node 7 is a leaf that does not match p or q. Returns null back to node 2.',
        currentNode: '7',
        visitingPath: ['3', '5', '2', '7'],
        activeEdge: '2-7',
        foundNodes: ['5'],
        lcaPathEdges: [],
        lcaPathNodes: [],
        callStack: ['dfs(3)', 'dfs(5)', 'dfs(2)', 'dfs(7) → null'],
        codeLine: 2
      },
      {
        step: 4,
        title: 'Traverse 2→4 — Found Target q=4!',
        description: 'Inspect right child 4. Node 4 matches target q = 4! Returns node 4 up to parent node 2.',
        currentNode: '4',
        visitingPath: ['3', '5', '2', '4'],
        activeEdge: '2-4',
        foundNodes: ['5', '4'],
        lcaPathEdges: ['2-4'],
        lcaPathNodes: ['2', '4'],
        callStack: ['dfs(3)', 'dfs(5)', 'dfs(2)', 'dfs(4) [q MATCH]'],
        codeLine: 3
      },
      {
        step: 5,
        title: 'Unwind Recursion: Node 2 returns 4 to Node 5',
        description: 'Node 2 has left=null and right=4, so it bubbles 4 upward to Node 5. Node 5 now contains both targets in its subtree!',
        currentNode: '5',
        visitingPath: ['3', '5'],
        foundNodes: ['5', '4'],
        lcaNode: '5',
        lcaPathEdges: ['5-2', '2-4'],
        lcaPathNodes: ['5', '2', '4'],
        callStack: ['dfs(3)', 'dfs(5) [LCA Candidate]'],
        codeLine: 5
      },
      {
        step: 6,
        title: 'LCA Confirmed: Node 5 is the Lowest Common Ancestor!',
        description: 'Because Node 5 is itself node p and also contains descendant node q=4, LCA(5, 4) = 5. Optimal path 5 → 2 → 4 fully verified in O(N) Time and O(H) Space.',
        currentNode: '5',
        visitingPath: ['5', '2', '4'],
        foundNodes: ['5', '4'],
        lcaNode: '5',
        lcaPathEdges: ['5-2', '2-4'],
        lcaPathNodes: ['5', '2', '4'],
        callStack: ['return Node 5 (LCA Final)'],
        codeLine: 8
      }
    ]
  },
  {
    id: 'p6-q4',
    title: 'LCA of p=6 and q=4 (Common Parent Node 5)',
    p: '6',
    q: '4',
    expectedLca: '5',
    steps: [
      {
        step: 0,
        title: 'Start DFS at Root (3)',
        description: 'Target query: Find Lowest Common Ancestor of node p = 6 and node q = 4. Call dfs(3).',
        currentNode: '3',
        visitingPath: ['3'],
        foundNodes: [],
        lcaPathEdges: [],
        lcaPathNodes: [],
        callStack: ['dfs(3)'],
        codeLine: 1
      },
      {
        step: 1,
        title: 'Traverse 3→5 then 5→6 (Match p=6)',
        description: 'Left subtree dfs(5) explores left child 6. Node 6 matches p = 6! Returns 6 back to Node 5.',
        currentNode: '6',
        visitingPath: ['3', '5', '6'],
        activeEdge: '5-6',
        foundNodes: ['6'],
        lcaPathEdges: ['5-6'],
        lcaPathNodes: ['5', '6'],
        callStack: ['dfs(3)', 'dfs(5)', 'dfs(6) [p MATCH]'],
        codeLine: 3
      },
      {
        step: 2,
        title: 'Explore 5→2→4 (Match q=4)',
        description: 'Node 5 now explores right child 2. Recurse into child 4. Node 4 matches q = 4! Returns 4 to Node 2 and then to Node 5.',
        currentNode: '4',
        visitingPath: ['3', '5', '2', '4'],
        activeEdge: '2-4',
        foundNodes: ['6', '4'],
        lcaPathEdges: ['5-6', '5-2', '2-4'],
        lcaPathNodes: ['5', '6', '2', '4'],
        callStack: ['dfs(3)', 'dfs(5)', 'dfs(2)', 'dfs(4) [q MATCH]'],
        codeLine: 3
      },
      {
        step: 3,
        title: 'Convergence: Node 5 receives left=6 and right=4!',
        description: 'At Node 5: left subtree returned 6 and right subtree returned 4. Since both sides returned non-null values, Node 5 is the Lowest Common Ancestor!',
        currentNode: '5',
        visitingPath: ['5'],
        foundNodes: ['6', '4'],
        lcaNode: '5',
        lcaPathEdges: ['5-6', '5-2', '2-4'],
        lcaPathNodes: ['5', '6', '2', '4'],
        callStack: ['dfs(3)', 'dfs(5) [BOTH NON-NULL]'],
        codeLine: 7
      },
      {
        step: 4,
        title: 'LCA Verified: Node 5 (Fork Ancestor)',
        description: 'Complete tree paths: 6 ← 5 → 2 → 4 meet at ancestor Node 5. LCA(6, 4) = 5. Verified in O(N) time.',
        currentNode: '5',
        visitingPath: ['5', '6', '2', '4'],
        foundNodes: ['6', '4'],
        lcaNode: '5',
        lcaPathEdges: ['5-6', '5-2', '2-4'],
        lcaPathNodes: ['5', '6', '2', '4'],
        callStack: ['return Node 5'],
        codeLine: 8
      }
    ]
  }
];

export const TreeAlgorithmVisualizer: React.FC<{
  onLaunchSolver?: () => void;
}> = ({ onLaunchSolver }) => {
  const [selectedScenarioIdx, setSelectedScenarioIdx] = useState(0);
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedNode, setSelectedNode] = useState<TreeNode | null>(null);

  const scenario = SCENARIOS[selectedScenarioIdx];
  const step = scenario.steps[currentStepIdx];
  const isFinal = currentStepIdx === scenario.steps.length - 1;

  useEffect(() => {
    let timer: any;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentStepIdx(prev => {
          if (prev < scenario.steps.length - 1) {
            return prev + 1;
          } else {
            setIsPlaying(false);
            return prev;
          }
        });
      }, 1900);
    }
    return () => clearInterval(timer);
  }, [isPlaying, scenario]);

  const handleNext = () => {
    if (currentStepIdx < scenario.steps.length - 1) {
      setCurrentStepIdx(currentStepIdx + 1);
    } else {
      setCurrentStepIdx(0);
    }
  };

  const handlePrev = () => {
    if (currentStepIdx > 0) {
      setCurrentStepIdx(currentStepIdx - 1);
    }
  };

  const handleReset = () => {
    setCurrentStepIdx(0);
    setIsPlaying(false);
  };

  // Helper to compute exact geometric edge coordinates between parent and child nodes
  const getTreeEdgeGeom = (src: TreeNode, tgt: TreeNode, radius = 22) => {
    const dx = tgt.x - src.x;
    const dy = tgt.y - src.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist === 0) return { x1: src.x, y1: src.y, x2: tgt.x, y2: tgt.y, midX: src.x, midY: src.y };
    const uX = dx / dist;
    const uY = dy / dist;
    return {
      x1: src.x + uX * radius,
      y1: src.y + uY * radius,
      x2: tgt.x - uX * (radius + 4),
      y2: tgt.y - uY * (radius + 4),
      midX: (src.x + tgt.x) / 2,
      midY: (src.y + tgt.y) / 2
    };
  };

  return (
    <div className="rounded-2xl border border-white/[0.1] bg-[#090d18] text-zinc-100 p-5 sm:p-6 shadow-2xl space-y-6 font-sans">
      {/* Top Header & Telemetry Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="purple" size="xs">
              #236 Lowest Common Ancestor · Binary Tree DFS
            </Badge>
            <span className="text-[11px] font-mono text-zinc-500">O(N) Time · O(H) Space</span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-white mt-1 flex items-center gap-2">
            <GitFork className="w-5 h-5 text-purple-400" />
            <span>Interactive Binary Tree & Ancestor Traversal Visualizer</span>
          </h3>
          <p className="text-xs text-zinc-400 mt-0.5">
            Watch recursive depth-first search, parent-child branch traversals, and LCA ancestor convergence.
          </p>
        </div>

        {/* Stepper Buttons */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="xs"
            onClick={handleReset}
            icon={<RotateCcw className="w-3.5 h-3.5" />}
          >
            Reset
          </Button>

          <Button
            variant="outline"
            size="xs"
            disabled={currentStepIdx === 0}
            onClick={handlePrev}
            icon={<ChevronLeft className="w-3.5 h-3.5" />}
          >
            Prev
          </Button>

          <Button
            variant={isPlaying ? 'amber' : 'outline'}
            size="xs"
            onClick={() => setIsPlaying(!isPlaying)}
            icon={isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          >
            {isPlaying ? 'Pause' : 'Auto Play'}
          </Button>

          <Button
            variant="primary"
            size="xs"
            onClick={handleNext}
            icon={isFinal ? <RotateCcw className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
          >
            {isFinal ? 'Restart' : 'Next Step →'}
          </Button>
        </div>
      </div>

      {/* Target Nodes Selector Strip */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl bg-zinc-950/70 border border-white/[0.06] text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="text-zinc-500 uppercase">Target Query:</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setSelectedScenarioIdx(0);
                setCurrentStepIdx(0);
              }}
              className={`px-3 py-1 rounded-lg border transition-all cursor-pointer ${
                selectedScenarioIdx === 0
                  ? 'border-purple-500/50 bg-purple-500/20 text-purple-300 font-bold shadow-sm'
                  : 'border-white/[0.08] text-zinc-400 hover:text-white'
              }`}
            >
              Scenario A: p = 5, q = 4 (Subtree Ancestor)
            </button>

            <button
              onClick={() => {
                setSelectedScenarioIdx(1);
                setCurrentStepIdx(0);
              }}
              className={`px-3 py-1 rounded-lg border transition-all cursor-pointer ${
                selectedScenarioIdx === 1
                  ? 'border-purple-500/50 bg-purple-500/20 text-purple-300 font-bold shadow-sm'
                  : 'border-white/[0.08] text-zinc-400 hover:text-white'
              }`}
            >
              Scenario B: p = 6, q = 4 (Fork Ancestor)
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-zinc-500 uppercase">Target p:</span>
          <span className="px-2 py-0.5 rounded-md bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 font-bold">
            Node {scenario.p}
          </span>
          <span className="text-zinc-500 uppercase ml-2">Target q:</span>
          <span className="px-2 py-0.5 rounded-md bg-cyan-500/15 border border-cyan-500/40 text-cyan-300 font-bold">
            Node {scenario.q}
          </span>
        </div>
      </div>

      {/* Step Explanation Banner */}
      <div className="p-4 rounded-xl border border-purple-500/25 bg-gradient-to-r from-purple-950/30 via-zinc-950/60 to-black/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-purple-400 animate-pulse" />
            <span className="text-xs font-mono font-bold text-purple-300">
              Stage {step.step + 1} of {scenario.steps.length}: {step.title}
            </span>
          </div>
          <p className="text-xs text-zinc-300 leading-relaxed max-w-2xl">
            {step.description}
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[11px] font-mono text-zinc-400">Current Node:</span>
          <span className="px-2.5 py-1 rounded-lg bg-purple-500/20 border border-purple-500/40 text-purple-300 font-mono font-bold text-xs">
            Node {step.currentNode}
          </span>
        </div>
      </div>

      {/* Main SVG Binary Tree Interactive Canvas */}
      <div className="relative rounded-2xl border border-white/[0.08] bg-[#060911] p-4 overflow-hidden">
        {/* Tree Legend */}
        <div className="absolute top-3 left-4 flex flex-wrap items-center gap-3 text-[10px] font-mono text-zinc-400 z-10 pointer-events-none">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-amber-500/90 border border-amber-400 shadow-sm shadow-amber-500/50" />
            <span className="text-amber-300 font-bold">LCA Node</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-emerald-500/90 border border-emerald-400" />
            <span className="text-emerald-300">Target p</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-cyan-500/90 border border-cyan-400" />
            <span className="text-cyan-300">Target q</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-purple-500/80 border border-purple-400" />
            <span>Visiting / DFS</span>
          </div>
        </div>

        <svg 
          viewBox="0 0 640 350" 
          className="w-full h-auto max-h-[390px] select-none"
        >
          <defs>
            {/* Arrow markers */}
            <marker id="tree-arrow-default" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <path d="M0,0 L0,6 L6,3 z" fill="#52525b" />
            </marker>
            <marker id="tree-arrow-active" markerWidth="7" markerHeight="7" refX="5.5" refY="3.5" orient="auto">
              <path d="M0,0 L0,7 L7,3.5 z" fill="#a855f7" />
            </marker>
            <marker id="tree-arrow-lca" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <path d="M0,0 L0,8 L8,4 z" fill="#10b981" />
            </marker>
          </defs>

          {/* 1. TREE EDGES (Rendered first so circles sit neatly on top) */}
          {TREE_EDGES.map(edge => {
            const src = TREE_NODES.find(n => n.id === edge.source)!;
            const tgt = TREE_NODES.find(n => n.id === edge.target)!;

            const isLcaPath = step.lcaPathEdges.includes(edge.id);
            const isActive = step.activeEdge === edge.id;
            const isVisiting = step.visitingPath.includes(edge.source) && step.visitingPath.includes(edge.target);

            const { x1, y1, x2, y2, midX, midY } = getTreeEdgeGeom(src, tgt, 21);

            let strokeColor = '#27272a'; // zinc-800
            let strokeWidth = 1.5;
            let marker = 'url(#tree-arrow-default)';

            if (isLcaPath) {
              strokeColor = '#10b981'; // emerald-500
              strokeWidth = 3.5;
              marker = 'url(#tree-arrow-lca)';
            } else if (isActive) {
              strokeColor = '#c084fc'; // purple-400
              strokeWidth = 3;
              marker = 'url(#tree-arrow-active)';
            } else if (isVisiting) {
              strokeColor = '#7e22ce'; // purple-700
              strokeWidth = 2;
            }

            return (
              <g key={edge.id} className="transition-all duration-300">
                {/* Glow Beam for LCA Path Edges */}
                {isLcaPath && (
                  <line
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="#10b981"
                    strokeWidth="8"
                    strokeOpacity="0.4"
                    strokeLinecap="round"
                  />
                )}
                {isActive && (
                  <line
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="#a855f7"
                    strokeWidth="6"
                    strokeOpacity="0.3"
                    strokeLinecap="round"
                  />
                )}

                {/* Main Branch Line */}
                <line
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke={strokeColor}
                  strokeWidth={strokeWidth}
                  markerEnd={marker}
                />

                {/* Left/Right Direction Indicator */}
                <text
                  x={midX + (edge.direction === 'left' ? -10 : 10)}
                  y={midY - 2}
                  textAnchor="middle"
                  className="text-[9px] font-mono select-none"
                  fill={isLcaPath ? '#6ee7b7' : isActive ? '#d8b4fe' : '#71717a'}
                >
                  {edge.direction === 'left' ? 'L' : 'R'}
                </text>
              </g>
            );
          })}

          {/* 2. TREE NODES */}
          {TREE_NODES.map(node => {
            const isCurrent = step.currentNode === node.id;
            const isLca = step.lcaNode === node.id;
            const isP = node.id === scenario.p;
            const isQ = node.id === scenario.q;
            const isFoundP = isP && step.foundNodes.includes(node.id);
            const isFoundQ = isQ && step.foundNodes.includes(node.id);
            const isVisiting = step.visitingPath.includes(node.id);
            const isLcaPathNode = step.lcaPathNodes.includes(node.id);

            let nodeFill = '#111625';
            let strokeColor = '#3f3f46';
            let strokeWidth = 2;

            if (isLca) {
              nodeFill = '#451a03'; // amber-950
              strokeColor = '#f59e0b'; // amber-500
              strokeWidth = 3.5;
            } else if (isFoundP) {
              nodeFill = '#064e3b'; // emerald-950
              strokeColor = '#10b981'; // emerald-500
              strokeWidth = 3;
            } else if (isFoundQ) {
              nodeFill = '#082f49'; // cyan-950
              strokeColor = '#06b6d4'; // cyan-500
              strokeWidth = 3;
            } else if (isLcaPathNode) {
              nodeFill = '#064e3b';
              strokeColor = '#34d399';
              strokeWidth = 2.5;
            } else if (isCurrent) {
              nodeFill = '#3b0764'; // purple-950
              strokeColor = '#c084fc'; // purple-400
              strokeWidth = 3;
            } else if (isVisiting) {
              nodeFill = '#2e1065';
              strokeColor = '#9333ea';
              strokeWidth = 2;
            }

            return (
              <g 
                key={node.id} 
                className="cursor-pointer transition-transform duration-200 hover:scale-110"
                onClick={() => setSelectedNode(node)}
              >
                {/* Outer Glow Ring for LCA or Targets */}
                {isLca && (
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r="27"
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="3"
                    strokeOpacity="0.5"
                    className="animate-pulse"
                  />
                )}
                {(isFoundP || isFoundQ) && !isLca && (
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r="26"
                    fill="none"
                    stroke={isFoundP ? '#10b981' : '#06b6d4'}
                    strokeWidth="2.5"
                    strokeOpacity="0.45"
                  />
                )}

                {/* Node Solid Circle */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r="21"
                  fill={nodeFill}
                  stroke={strokeColor}
                  strokeWidth={strokeWidth}
                />

                {/* Crown Icon for LCA Node */}
                {isLca && (
                  <g transform={`translate(${node.x - 7}, ${node.y - 33})`}>
                    <Crown className="w-3.5 h-3.5 text-amber-400 fill-amber-400 animate-bounce" />
                  </g>
                )}

                {/* Target Tag above node */}
                {isP && !isLca && (
                  <text
                    x={node.x}
                    y={node.y - 25}
                    textAnchor="middle"
                    className="text-[9px] font-mono font-bold"
                    fill="#10b981"
                  >
                    p
                  </text>
                )}
                {isQ && !isLca && (
                  <text
                    x={node.x}
                    y={node.y - 25}
                    textAnchor="middle"
                    className="text-[9px] font-mono font-bold"
                    fill="#06b6d4"
                  >
                    q
                  </text>
                )}

                {/* Node Value */}
                <text
                  x={node.x}
                  y={node.y}
                  textAnchor="middle"
                  dy="4"
                  className="text-xs font-mono font-black"
                  fill={isLca ? '#fef3c7' : isFoundP ? '#ecfdf5' : isFoundQ ? '#f0f9ff' : '#fafafa'}
                >
                  {node.val}
                </text>
              </g>
            );
          })}
        </svg>

        {/* LCA Success Banner */}
        {step.lcaNode && (
          <div className="mt-3 p-3.5 rounded-xl border border-amber-500/40 bg-amber-950/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono animate-fade-in">
            <div className="flex items-center gap-2">
              <Crown className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="font-bold text-amber-300">Lowest Common Ancestor Found:</span>
              <span className="text-zinc-200">
                LCA(Node {scenario.p}, Node {scenario.q}) = <strong className="text-amber-400 text-sm">Node {step.lcaNode}</strong>
              </span>
            </div>
            <div className="px-3 py-1 rounded-lg bg-amber-400 text-zinc-950 font-bold text-xs shrink-0">
              Verified Optimal ✓
            </div>
          </div>
        )}

        {/* Node Hover Hint */}
        <div className="mt-2 text-center text-xs font-mono text-zinc-500">
          💡 Click any node on the tree to inspect its depth, left child, right child, and parent references.
        </div>
      </div>

      {/* Telemetry Dashboard: Call Stack + Status + Execution Code */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
        {/* Active Recursion Call Stack */}
        <div className="p-4 rounded-xl border border-white/[0.08] bg-[#0c101c] space-y-2">
          <div className="flex items-center justify-between text-zinc-400 pb-1 border-b border-white/[0.06]">
            <span className="uppercase font-bold text-purple-400">Call Stack:</span>
            <span>Depth: {step.visitingPath.length}</span>
          </div>

          <div className="space-y-1.5 min-h-[48px]">
            {step.callStack.map((frame, idx) => (
              <div 
                key={idx}
                className="px-2.5 py-1 rounded-lg border border-purple-500/30 bg-purple-500/10 text-purple-300 font-bold text-[11px]"
              >
                {frame}
              </div>
            ))}
          </div>
        </div>

        {/* Target Status Table */}
        <div className="p-4 rounded-xl border border-white/[0.08] bg-[#0c101c] space-y-2">
          <div className="flex items-center justify-between text-zinc-400 pb-1 border-b border-white/[0.06]">
            <span className="uppercase font-bold text-emerald-400">Target Indicators:</span>
            <span>Status</span>
          </div>

          <div className="space-y-2">
            <div className={`p-2 rounded-lg border flex items-center justify-between ${
              step.foundNodes.includes(scenario.p)
                ? 'border-emerald-500/50 bg-emerald-500/15 text-emerald-300 font-bold'
                : 'border-white/[0.06] bg-black/30 text-zinc-500'
            }`}>
              <span>Target p (Node {scenario.p})</span>
              <span>{step.foundNodes.includes(scenario.p) ? 'Found ✓' : 'Searching...'}</span>
            </div>

            <div className={`p-2 rounded-lg border flex items-center justify-between ${
              step.foundNodes.includes(scenario.q)
                ? 'border-cyan-500/50 bg-cyan-500/15 text-cyan-300 font-bold'
                : 'border-white/[0.06] bg-black/30 text-zinc-500'
            }`}>
              <span>Target q (Node {scenario.q})</span>
              <span>{step.foundNodes.includes(scenario.q) ? 'Found ✓' : 'Searching...'}</span>
            </div>
          </div>
        </div>

        {/* Python 3 Code Execution Line Tracker */}
        <div className="p-4 rounded-xl border border-white/[0.08] bg-[#0c101c] space-y-2">
          <div className="flex items-center justify-between text-zinc-400 pb-1 border-b border-white/[0.06]">
            <span className="uppercase font-bold text-cyan-400 flex items-center gap-1">
              <Code2 className="w-3.5 h-3.5" />
              LCA Recursive Core:
            </span>
            <span>Python 3</span>
          </div>

          <div className="text-[11px] font-mono leading-relaxed space-y-0.5 text-zinc-400">
            <div className={step.codeLine === 1 ? 'bg-purple-500/20 text-purple-200 px-1 rounded' : ''}>
              1: def lowestCommonAncestor(root, p, q):
            </div>
            <div className={step.codeLine === 2 ? 'bg-purple-500/20 text-purple-200 px-1 rounded' : ''}>
              2:   if not root: return None
            </div>
            <div className={step.codeLine === 3 ? 'bg-emerald-500/25 text-emerald-300 font-bold px-1 rounded' : ''}>
              3:   if root == p or root == q: return root
            </div>
            <div className={step.codeLine === 4 ? 'bg-cyan-500/20 text-cyan-200 px-1 rounded' : ''}>
              4:   left = lowestCommonAncestor(root.left, p, q)
            </div>
            <div className={step.codeLine === 5 ? 'bg-cyan-500/20 text-cyan-200 px-1 rounded' : ''}>
              5:   right = lowestCommonAncestor(root.right, p, q)
            </div>
            <div className={step.codeLine === 7 ? 'bg-amber-500/25 text-amber-300 font-bold px-1 rounded' : ''}>
              6:   if left and right: return root # LCA
            </div>
            <div className={step.codeLine === 8 ? 'bg-emerald-500/30 text-emerald-200 font-bold px-1 rounded' : ''}>
              7:   return left if left else right
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
