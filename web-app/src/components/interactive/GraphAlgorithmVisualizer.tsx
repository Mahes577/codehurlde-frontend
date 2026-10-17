import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  ChevronRight, 
  ChevronLeft, 
  Network, 
  Sparkles, 
  CheckCircle2, 
  Info,
  Maximize2,
  Code2,
  Flame,
  Award
} from 'lucide-react';
import { Button } from '../atoms/Button';
import { Badge } from '../atoms/Badge';

export interface GraphNode {
  id: string;
  label: string;
  x: number;
  y: number;
  neighbors: { target: string; weight: number }[];
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  weight: number;
}

export interface StepRecord {
  step: number;
  title: string;
  description: string;
  currentNode: string;
  examiningEdge?: string;
  visitedNodes: string[];
  frontierNodes: string[];
  distances: Record<string, number | string>;
  minHeap: { node: string; dist: number }[];
  activeEdges: string[]; // edges currently being relaxed/evaluated
  relaxedEdges: string[]; // settled tree edges
  shortestPathNodes: string[]; // nodes in finalized shortest path
  shortestPathEdges: string[]; // edges in finalized shortest path
  codeLine: number;
}

// 6 Nodes with a clean, balanced layout
const NODES: GraphNode[] = [
  { id: 'A', label: 'A (Src)', x: 90, y: 170, neighbors: [{ target: 'C', weight: 2 }, { target: 'B', weight: 4 }] },
  { id: 'B', label: 'B', x: 230, y: 85, neighbors: [{ target: 'D', weight: 5 }, { target: 'E', weight: 4 }] },
  { id: 'C', label: 'C', x: 230, y: 255, neighbors: [{ target: 'E', weight: 3 }, { target: 'B', weight: 4 }] },
  { id: 'D', label: 'D', x: 410, y: 85, neighbors: [{ target: 'F', weight: 4 }] },
  { id: 'E', label: 'E', x: 410, y: 255, neighbors: [{ target: 'F', weight: 2 }] },
  { id: 'F', label: 'F (Tgt)', x: 550, y: 170, neighbors: [] }
];

// Clean directed edges: Shortest Path is cleanly A -> C (2) -> E (3) -> F (2) = 7
const EDGES: GraphEdge[] = [
  { id: 'A-C', source: 'A', target: 'C', weight: 2 },
  { id: 'A-B', source: 'A', target: 'B', weight: 4 },
  { id: 'C-E', source: 'C', target: 'E', weight: 3 },
  { id: 'C-B', source: 'C', target: 'B', weight: 4 },
  { id: 'B-D', source: 'B', target: 'D', weight: 5 },
  { id: 'B-E', source: 'B', target: 'E', weight: 4 },
  { id: 'D-F', source: 'D', target: 'F', weight: 4 },
  { id: 'E-F', source: 'E', target: 'F', weight: 2 }
];

const STEPS: StepRecord[] = [
  {
    step: 0,
    title: 'Initialize Dijkstra Priority Queue',
    description: 'Set source node A distance to 0, all other nodes to ∞. Push (0, A) into the Min-Heap priority queue.',
    currentNode: 'A',
    visitedNodes: [],
    frontierNodes: ['A'],
    distances: { A: 0, B: '∞', C: '∞', D: '∞', E: '∞', F: '∞' },
    minHeap: [{ node: 'A', dist: 0 }],
    activeEdges: [],
    relaxedEdges: [],
    shortestPathNodes: [],
    shortestPathEdges: [],
    codeLine: 1
  },
  {
    step: 1,
    title: 'Pop A (dist=0) & Relax Outgoing Edges',
    description: 'A is settled. Relax edge (A→C, wt=2): dist[C]=2. Relax edge (A→B, wt=4): dist[B]=4. Min-Heap receives C and B.',
    currentNode: 'A',
    visitedNodes: ['A'],
    frontierNodes: ['C', 'B'],
    distances: { A: 0, B: 4, C: 2, D: '∞', E: '∞', F: '∞' },
    minHeap: [{ node: 'C', dist: 2 }, { node: 'B', dist: 4 }],
    activeEdges: ['A-C', 'A-B'],
    relaxedEdges: ['A-C', 'A-B'],
    shortestPathNodes: [],
    shortestPathEdges: [],
    codeLine: 4
  },
  {
    step: 2,
    title: 'Pop C (dist=2) — Closest Unvisited Node',
    description: 'C is smallest in Min-Heap (dist=2). Relax (C→E, wt=3): dist[E] = 2+3 = 5. Checking (C→B, wt=4): 2+4 = 6 > 4 (current dist[B]), so B stays at 4.',
    currentNode: 'C',
    visitedNodes: ['A', 'C'],
    frontierNodes: ['B', 'E'],
    distances: { A: 0, B: 4, C: 2, D: '∞', E: 5, F: '∞' },
    minHeap: [{ node: 'B', dist: 4 }, { node: 'E', dist: 5 }],
    activeEdges: ['C-E', 'C-B'],
    relaxedEdges: ['A-C', 'A-B', 'C-E'],
    shortestPathNodes: [],
    shortestPathEdges: [],
    codeLine: 5
  },
  {
    step: 3,
    title: 'Pop B (dist=4) & Explore Branch',
    description: 'B is settled. Relax (B→D, wt=5): dist[D] = 4+5 = 9. Evaluating (B→E, wt=4): 4+4 = 8 > 5 (dist[E] already 5 via C, pruned!).',
    currentNode: 'B',
    visitedNodes: ['A', 'C', 'B'],
    frontierNodes: ['E', 'D'],
    distances: { A: 0, B: 4, C: 2, D: 9, E: 5, F: '∞' },
    minHeap: [{ node: 'E', dist: 5 }, { node: 'D', dist: 9 }],
    activeEdges: ['B-D', 'B-E'],
    relaxedEdges: ['A-C', 'C-E', 'B-D'],
    shortestPathNodes: [],
    shortestPathEdges: [],
    codeLine: 4
  },
  {
    step: 4,
    title: 'Pop E (dist=5) & Reach Target Node F',
    description: 'E is settled at dist=5. Relax edge (E→F, wt=2): dist[F] = 5+2 = 7. Target node F is reached and pushed to Min-Heap!',
    currentNode: 'E',
    visitedNodes: ['A', 'C', 'B', 'E'],
    frontierNodes: ['F', 'D'],
    distances: { A: 0, B: 4, C: 2, D: 9, E: 5, F: 7 },
    minHeap: [{ node: 'F', dist: 7 }, { node: 'D', dist: 9 }],
    activeEdges: ['E-F'],
    relaxedEdges: ['A-C', 'C-E', 'E-F', 'B-D'],
    shortestPathNodes: [],
    shortestPathEdges: [],
    codeLine: 5
  },
  {
    step: 5,
    title: 'Pop F (dist=7) — Target Settled at Min Distance',
    description: 'Target F is popped from Min-Heap with settled dist=7. Evaluating remaining node D (dist=9): 9+4 = 13 > 7 (pruned).',
    currentNode: 'F',
    visitedNodes: ['A', 'C', 'B', 'E', 'F'],
    frontierNodes: ['D'],
    distances: { A: 0, B: 4, C: 2, D: 9, E: 5, F: 7 },
    minHeap: [{ node: 'D', dist: 9 }],
    activeEdges: ['D-F'],
    relaxedEdges: ['A-C', 'C-E', 'E-F'],
    shortestPathNodes: ['A', 'C', 'E', 'F'],
    shortestPathEdges: ['A-C', 'C-E', 'E-F'],
    codeLine: 7
  },
  {
    step: 6,
    title: 'Shortest Path Fully Illuminated: A → C → E → F',
    description: 'Complete unbroken shortest path finalized: A → C → E → F with minimum weight cost = 7 (2 + 3 + 2). Optimal in O((V + E) log V).',
    currentNode: 'F',
    visitedNodes: ['A', 'C', 'B', 'E', 'D', 'F'],
    frontierNodes: [],
    distances: { A: 0, B: 4, C: 2, D: 9, E: 5, F: 7 },
    minHeap: [],
    activeEdges: [],
    relaxedEdges: [],
    shortestPathNodes: ['A', 'C', 'E', 'F'],
    shortestPathEdges: ['A-C', 'C-E', 'E-F'],
    codeLine: 8
  }
];

export const GraphAlgorithmVisualizer: React.FC<{
  onLaunchSolver?: () => void;
}> = ({ onLaunchSolver }) => {
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedNodeInfo, setSelectedNodeInfo] = useState<GraphNode | null>(null);

  const step = STEPS[currentStepIdx];
  const isFinal = currentStepIdx === STEPS.length - 1;

  useEffect(() => {
    let timer: any;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentStepIdx(prev => {
          if (prev < STEPS.length - 1) {
            return prev + 1;
          } else {
            setIsPlaying(false);
            return prev;
          }
        });
      }, 1900);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  const handleNext = () => {
    if (currentStepIdx < STEPS.length - 1) {
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

  // Helper to compute exact geometric edge coordinates clipped to circle radii
  const getEdgeGeom = (src: GraphNode, tgt: GraphNode, radius = 24) => {
    const dx = tgt.x - src.x;
    const dy = tgt.y - src.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist === 0) return { x1: src.x, y1: src.y, x2: tgt.x, y2: tgt.y, midX: src.x, midY: src.y, perpX: 0, perpY: 0 };
    const uX = dx / dist;
    const uY = dy / dist;
    return {
      x1: src.x + uX * radius,
      y1: src.y + uY * radius,
      x2: tgt.x - uX * (radius + 5), // leave gap for arrow marker
      y2: tgt.y - uY * (radius + 5),
      midX: (src.x + tgt.x) / 2,
      midY: (src.y + tgt.y) / 2,
      perpX: -uY * 13,
      perpY: uX * 13
    };
  };

  // Build the continuous polyline points string for shortest path: A -> C -> E -> F
  const shortestPointsString = ['A', 'C', 'E', 'F']
    .map(id => {
      const n = NODES.find(node => node.id === id)!;
      return `${n.x},${n.y}`;
    })
    .join(' ');

  return (
    <div className="rounded-2xl border border-white/[0.1] bg-[#090d18] text-zinc-100 p-5 sm:p-6 shadow-2xl space-y-6 font-sans">
      {/* Top Header & Telemetry Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="cyan" size="xs">
              #743 Network Delay Time · Dijkstra BFS
            </Badge>
            <span className="text-[11px] font-mono text-zinc-500">O((V + E) log V)</span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-white mt-1 flex items-center gap-2">
            <Network className="w-5 h-5 text-cyan-400" />
            <span>Interactive Graph & Edge Traversal Visualizer</span>
          </h3>
          <p className="text-xs text-zinc-400 mt-0.5">
            Watch edge relaxation, priority queue pop orders, and shortest path illumination in real time.
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

      {/* Step Explanation Banner */}
      <div className="p-4 rounded-xl border border-cyan-500/25 bg-gradient-to-r from-cyan-950/30 via-zinc-950/60 to-black/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-xs font-mono font-bold text-cyan-300">
              Stage {step.step + 1} of {STEPS.length}: {step.title}
            </span>
          </div>
          <p className="text-xs text-zinc-300 leading-relaxed max-w-2xl">
            {step.description}
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[11px] font-mono text-zinc-400">Current Node:</span>
          <span className="px-2.5 py-1 rounded-lg bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 font-mono font-bold text-xs">
            {step.currentNode} (dist: {step.distances[step.currentNode]})
          </span>
        </div>
      </div>

      {/* Main SVG Graph Interactive Canvas */}
      <div className="relative rounded-2xl border border-white/[0.08] bg-[#060911] p-4 overflow-hidden">
        {/* Graph Legend */}
        <div className="absolute top-3 left-4 flex flex-wrap items-center gap-3 text-[10px] font-mono text-zinc-400 z-10 pointer-events-none">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-emerald-500/90 border border-emerald-400 shadow-sm shadow-emerald-500/50" />
            <span className="text-emerald-300 font-bold">Shortest Path</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-cyan-500/80 border border-cyan-400" />
            <span>Settled / Visited</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-amber-500/80 border border-amber-400" />
            <span>Frontier / PQ</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-zinc-800 border border-zinc-600" />
            <span>Unvisited</span>
          </div>
        </div>

        <svg 
          viewBox="0 0 640 340" 
          className="w-full h-auto max-h-[380px] select-none"
        >
          <defs>
            {/* Arrow markers */}
            <marker id="arrow-default" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <path d="M0,0 L0,6 L6,3 z" fill="#52525b" />
            </marker>
            <marker id="arrow-active" markerWidth="7" markerHeight="7" refX="5.5" refY="3.5" orient="auto">
              <path d="M0,0 L0,7 L7,3.5 z" fill="#38bdf8" />
            </marker>
            <marker id="arrow-tree" markerWidth="6.5" markerHeight="6.5" refX="5" refY="3.25" orient="auto">
              <path d="M0,0 L0,6.5 L6.5,3.25 z" fill="#059669" />
            </marker>
            <marker id="arrow-shortest" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <path d="M0,0 L0,8 L8,4 z" fill="#10b981" />
            </marker>
          </defs>

          {/* 0. CONTINUOUS UNBROKEN SHORTEST PATH CABLE (When Finalized) */}
          {step.shortestPathNodes.length > 0 && (
            <g className="shortest-path-ribbon animate-fade-in">
              {/* Outer Radiant Glow Beam */}
              <polyline
                points={shortestPointsString}
                fill="none"
                stroke="#10b981"
                strokeWidth="10"
                strokeOpacity="0.35"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Solid Core Cable */}
              <polyline
                points={shortestPointsString}
                fill="none"
                stroke="#34d399"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          )}

          {/* 1. EDGES */}
          {EDGES.map(edge => {
            const src = NODES.find(n => n.id === edge.source)!;
            const tgt = NODES.find(n => n.id === edge.target)!;
            
            const isShortest = step.shortestPathEdges.includes(edge.id);
            const isActive = step.activeEdges.includes(edge.id);
            const isRelaxed = step.relaxedEdges.includes(edge.id);

            const { x1, y1, x2, y2, midX, midY, perpX, perpY } = getEdgeGeom(src, tgt, 23);

            let strokeColor = '#27272a'; // zinc-800
            let strokeWidth = 1.5;
            let marker = 'url(#arrow-default)';
            let dashArray = undefined;

            if (isShortest) {
              strokeColor = '#10b981'; // emerald-500
              strokeWidth = 3.5;
              marker = 'url(#arrow-shortest)';
            } else if (isActive) {
              strokeColor = '#38bdf8'; // cyan-400
              strokeWidth = 2.5;
              marker = 'url(#arrow-active)';
              dashArray = '5,3';
            } else if (isRelaxed) {
              strokeColor = '#059669'; // emerald-600 tree edge
              strokeWidth = 2;
              marker = 'url(#arrow-tree)';
            }

            return (
              <g key={edge.id} className="transition-all duration-300">
                {/* Background glow stroke for active or shortest edges */}
                {isShortest && (
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
                    stroke="#38bdf8"
                    strokeWidth="6"
                    strokeOpacity="0.3"
                    strokeLinecap="round"
                  />
                )}

                {/* Main Edge Line */}
                <line
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke={strokeColor}
                  strokeWidth={strokeWidth}
                  strokeDasharray={dashArray}
                  markerEnd={marker}
                />

                {/* Edge Weight Badge Pill */}
                <g transform={`translate(${midX + perpX}, ${midY + perpY})`}>
                  <rect
                    x="-12"
                    y="-9"
                    width="24"
                    height="18"
                    rx="6"
                    fill={isShortest ? '#064e3b' : isActive ? '#082f49' : isRelaxed ? '#022c22' : '#18181b'}
                    stroke={isShortest ? '#34d399' : isActive ? '#38bdf8' : isRelaxed ? '#059669' : '#27272a'}
                    strokeWidth="1.2"
                  />
                  <text
                    textAnchor="middle"
                    dy="3.5"
                    className="text-[10px] font-mono font-bold"
                    fill={isShortest ? '#6ee7b7' : isActive ? '#7dd3fc' : isRelaxed ? '#34d399' : '#a1a1aa'}
                  >
                    {edge.weight}
                  </text>
                </g>
              </g>
            );
          })}

          {/* 2. NODES (Rendered on top for crisp elevation) */}
          {NODES.map(node => {
            const isCurrent = step.currentNode === node.id;
            const isShortest = step.shortestPathNodes.includes(node.id);
            const isVisited = step.visitedNodes.includes(node.id);
            const isFrontier = step.frontierNodes.includes(node.id);
            const dist = step.distances[node.id];

            let nodeFill = '#111625';
            let strokeColor = '#3f3f46';
            let strokeWidth = 2;

            if (isShortest) {
              nodeFill = '#064e3b';
              strokeColor = '#10b981';
              strokeWidth = 3;
            } else if (isCurrent) {
              nodeFill = '#082f49';
              strokeColor = '#38bdf8';
              strokeWidth = 3;
            } else if (isVisited) {
              nodeFill = '#164e63';
              strokeColor = '#06b6d4';
              strokeWidth = 2;
            } else if (isFrontier) {
              nodeFill = '#451a03';
              strokeColor = '#f59e0b';
              strokeWidth = 2;
            }

            return (
              <g 
                key={node.id} 
                className="cursor-pointer transition-transform duration-200 hover:scale-110"
                onClick={() => setSelectedNodeInfo(node)}
              >
                {/* Outer Glow Ring for Shortest Path or Current */}
                {isShortest && (
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r="28"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="3"
                    strokeOpacity="0.45"
                    className="animate-pulse"
                  />
                )}
                {isCurrent && !isShortest && (
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r="28"
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="3"
                    strokeOpacity="0.45"
                  />
                )}

                {/* Node Solid Circle */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r="23"
                  fill={nodeFill}
                  stroke={strokeColor}
                  strokeWidth={strokeWidth}
                />

                {/* Node Letter */}
                <text
                  x={node.x}
                  y={node.y}
                  textAnchor="middle"
                  dy="-2"
                  className="text-xs font-mono font-black"
                  fill={isShortest ? '#ecfdf5' : isCurrent ? '#f0f9ff' : '#fafafa'}
                >
                  {node.id}
                </text>

                {/* Distance Subscript inside/below node */}
                <text
                  x={node.x}
                  y={node.y}
                  textAnchor="middle"
                  dy="11"
                  className="text-[9px] font-mono font-bold"
                  fill={isShortest ? '#6ee7b7' : isCurrent ? '#7dd3fc' : isFrontier ? '#fcd34d' : '#94a3b8'}
                >
                  d={dist}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Shortest Path Success Banner */}
        {step.shortestPathNodes.length > 0 && (
          <div className="mt-3 p-3.5 rounded-xl border border-emerald-500/40 bg-emerald-950/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono animate-fade-in">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="font-bold text-emerald-300">Continuous Shortest Path Verified:</span>
              <span className="text-zinc-200">
                A <span className="text-emerald-400 font-bold">(wt 2)</span> → C <span className="text-emerald-400 font-bold">(wt 3)</span> → E <span className="text-emerald-400 font-bold">(wt 2)</span> → F
              </span>
            </div>
            <div className="px-3 py-1 rounded-lg bg-emerald-500 text-zinc-950 font-bold text-xs shrink-0">
              Total Distance = 7
            </div>
          </div>
        )}

        {/* Selected Node Tooltip or hint */}
        <div className="mt-2 text-center text-xs font-mono text-zinc-500">
          💡 Click any node on the graph to inspect its outgoing adjacency weights & neighbors.
        </div>
      </div>

      {/* Telemetry Dashboard: Priority Queue + Distance Map + Execution Code */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
        {/* Min-Heap Priority Queue */}
        <div className="p-4 rounded-xl border border-white/[0.08] bg-[#0c101c] space-y-2">
          <div className="flex items-center justify-between text-zinc-400 pb-1 border-b border-white/[0.06]">
            <span className="uppercase font-bold text-amber-400">Min-Heap (PQ):</span>
            <span>{step.minHeap.length} Elements</span>
          </div>

          <div className="flex flex-wrap gap-1.5 min-h-[48px] items-center">
            {step.minHeap.length === 0 ? (
              <span className="text-zinc-600 italic">Empty queue (All reachable nodes settled)</span>
            ) : (
              step.minHeap.map((item, idx) => (
                <div 
                  key={idx}
                  className="px-2.5 py-1 rounded-lg border border-amber-500/30 bg-amber-500/10 text-amber-300 font-bold flex items-center gap-1"
                >
                  <span>{item.node}</span>
                  <span className="text-[10px] text-amber-500 font-normal">({item.dist})</span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Settled Distances Table */}
        <div className="p-4 rounded-xl border border-white/[0.08] bg-[#0c101c] space-y-2">
          <div className="flex items-center justify-between text-zinc-400 pb-1 border-b border-white/[0.06]">
            <span className="uppercase font-bold text-cyan-400">Distances Array:</span>
            <span>dist[u]</span>
          </div>

          <div className="grid grid-cols-6 gap-1 text-center">
            {Object.entries(step.distances).map(([k, v]) => (
              <div 
                key={k} 
                className={`p-1.5 rounded-lg border ${
                  step.shortestPathNodes.includes(k) 
                    ? 'border-emerald-500/50 bg-emerald-500/15 text-emerald-300 font-bold'
                    : k === step.currentNode
                    ? 'border-cyan-500/50 bg-cyan-500/15 text-cyan-300 font-bold'
                    : 'border-white/[0.06] bg-black/30 text-zinc-400'
                }`}
              >
                <div className="text-[10px] text-zinc-500">{k}</div>
                <div className="text-xs">{v}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Algorithm Code Execution Tracker */}
        <div className="p-4 rounded-xl border border-white/[0.08] bg-[#0c101c] space-y-2">
          <div className="flex items-center justify-between text-zinc-400 pb-1 border-b border-white/[0.06]">
            <span className="uppercase font-bold text-emerald-400 flex items-center gap-1">
              <Code2 className="w-3.5 h-3.5" />
              Dijkstra Core:
            </span>
            <span>Python 3</span>
          </div>

          <div className="text-[11px] font-mono leading-relaxed space-y-0.5 text-zinc-400">
            <div className={step.codeLine === 1 ? 'bg-cyan-500/20 text-cyan-200 px-1 rounded' : ''}>
              1: dist = &#123;u: inf&#125;; dist[src] = 0
            </div>
            <div className={step.codeLine === 2 ? 'bg-cyan-500/20 text-cyan-200 px-1 rounded' : ''}>
              2: pq = [(0, src)]
            </div>
            <div className={step.codeLine === 3 ? 'bg-cyan-500/20 text-cyan-200 px-1 rounded' : ''}>
              3: while pq: d, u = heappop(pq)
            </div>
            <div className={step.codeLine === 4 || step.codeLine === 5 ? 'bg-emerald-500/25 text-emerald-300 font-bold px-1 rounded' : ''}>
              4:   for v, w in adj[u]:
            </div>
            <div className={step.codeLine === 5 ? 'bg-emerald-500/25 text-emerald-300 font-bold px-1 rounded' : ''}>
              5:     if d + w &lt; dist[v]:
            </div>
            <div className={step.codeLine === 7 ? 'bg-amber-500/20 text-amber-200 px-1 rounded' : ''}>
              6:       dist[v] = d + w; heappush(pq)
            </div>
            <div className={step.codeLine === 8 ? 'bg-emerald-500/30 text-emerald-200 font-bold px-1 rounded' : ''}>
              7: return dist[target]  # = 7
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
