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
  activeEdges: string[]; // edges being evaluated
  relaxedEdges: string[]; // tree edges
  shortestPathNodes: string[];
  shortestPathEdges: string[];
  codeLine: number;
}

const NODES: GraphNode[] = [
  { id: 'A', label: 'A (Src)', x: 90, y: 170, neighbors: [{ target: 'C', weight: 2 }, { target: 'B', weight: 4 }] },
  { id: 'B', label: 'B', x: 230, y: 80, neighbors: [{ target: 'D', weight: 5 }, { target: 'E', weight: 2 }] },
  { id: 'C', label: 'C', x: 230, y: 260, neighbors: [{ target: 'B', weight: 1 }, { target: 'E', weight: 8 }] },
  { id: 'D', label: 'D', x: 410, y: 80, neighbors: [{ target: 'F', weight: 6 }] },
  { id: 'E', label: 'E', x: 410, y: 260, neighbors: [{ target: 'F', weight: 3 }] },
  { id: 'F', label: 'F (Tgt)', x: 550, y: 170, neighbors: [] }
];

const EDGES: GraphEdge[] = [
  { id: 'A-B', source: 'A', target: 'B', weight: 4 },
  { id: 'A-C', source: 'A', target: 'C', weight: 2 },
  { id: 'C-B', source: 'C', target: 'B', weight: 1 },
  { id: 'B-D', source: 'B', target: 'D', weight: 5 },
  { id: 'B-E', source: 'B', target: 'E', weight: 2 },
  { id: 'C-E', source: 'C', target: 'E', weight: 8 },
  { id: 'D-F', source: 'D', target: 'F', weight: 6 },
  { id: 'E-F', source: 'E', target: 'F', weight: 3 }
];

const STEPS: StepRecord[] = [
  {
    step: 0,
    title: 'Initialize Dijkstra Invariant',
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
    title: 'Pop C (dist=2) — Algorithmic Shortcut Found!',
    description: 'C is closest (dist=2). Relax (C→B, wt=1): 2+1=3 < 4! B is updated to dist=3 (better than direct A→B). Relax (C→E, wt=8): dist[E]=10.',
    currentNode: 'C',
    visitedNodes: ['A', 'C'],
    frontierNodes: ['B', 'E'],
    distances: { A: 0, B: 3, C: 2, D: '∞', E: 10, F: '∞' },
    minHeap: [{ node: 'B', dist: 3 }, { node: 'E', dist: 10 }],
    activeEdges: ['C-B', 'C-E'],
    relaxedEdges: ['A-C', 'C-B', 'C-E'],
    shortestPathNodes: [],
    shortestPathEdges: [],
    codeLine: 5
  },
  {
    step: 3,
    title: 'Pop B (dist=3) & Relax Sub-Branch',
    description: 'B is settled. Relax (B→D, wt=5): dist[D] = 3+5 = 8. Relax (B→E, wt=2): 3+2 = 5 < 10! dist[E] reduced from 10 to 5.',
    currentNode: 'B',
    visitedNodes: ['A', 'C', 'B'],
    frontierNodes: ['E', 'D'],
    distances: { A: 0, B: 3, C: 2, D: 8, E: 5, F: '∞' },
    minHeap: [{ node: 'E', dist: 5 }, { node: 'D', dist: 8 }],
    activeEdges: ['B-D', 'B-E'],
    relaxedEdges: ['A-C', 'C-B', 'B-E', 'B-D'],
    shortestPathNodes: [],
    shortestPathEdges: [],
    codeLine: 4
  },
  {
    step: 4,
    title: 'Pop E (dist=5) & Reach Target F',
    description: 'E is settled at dist=5. Relax (E→F, wt=3): dist[F] = 5+3 = 8. Target F entered the priority queue!',
    currentNode: 'E',
    visitedNodes: ['A', 'C', 'B', 'E'],
    frontierNodes: ['F', 'D'],
    distances: { A: 0, B: 3, C: 2, D: 8, E: 5, F: 8 },
    minHeap: [{ node: 'F', dist: 8 }, { node: 'D', dist: 8 }],
    activeEdges: ['E-F'],
    relaxedEdges: ['A-C', 'C-B', 'B-E', 'E-F', 'B-D'],
    shortestPathNodes: [],
    shortestPathEdges: [],
    codeLine: 5
  },
  {
    step: 5,
    title: 'Pop D (dist=8) — Redundant Path Pruning',
    description: 'D is settled at dist=8. Evaluating (D→F, wt=6): 8+6 = 14 > 8 (current F dist). Pruned! Target already has optimal path.',
    currentNode: 'D',
    visitedNodes: ['A', 'C', 'B', 'E', 'D'],
    frontierNodes: ['F'],
    distances: { A: 0, B: 3, C: 2, D: 8, E: 5, F: 8 },
    minHeap: [{ node: 'F', dist: 8 }],
    activeEdges: ['D-F'],
    relaxedEdges: ['A-C', 'C-B', 'B-E', 'E-F'],
    shortestPathNodes: [],
    shortestPathEdges: [],
    codeLine: 6
  },
  {
    step: 6,
    title: 'Target F Settled — Shortest Path Finalized!',
    description: 'Optimal path found: A → C → B → E → F with minimum weight cost = 8. Guaranteed optimal in O((V + E) log V).',
    currentNode: 'F',
    visitedNodes: ['A', 'C', 'B', 'E', 'D', 'F'],
    frontierNodes: [],
    distances: { A: 0, B: 3, C: 2, D: 8, E: 5, F: 8 },
    minHeap: [],
    activeEdges: [],
    relaxedEdges: [],
    shortestPathNodes: ['A', 'C', 'B', 'E', 'F'],
    shortestPathEdges: ['A-C', 'C-B', 'B-E', 'E-F'],
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
      }, 1800);
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
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 border border-emerald-400" />
            <span>Shortest Path</span>
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
          viewBox="0 0 640 330" 
          className="w-full h-auto max-h-[360px] select-none"
        >
          <defs>
            {/* Glow filters for optimal edges and nodes */}
            <filter id="glow-emerald" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="glow-cyan" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Arrow markers */}
            <marker id="arrow-default" markerWidth="6" markerHeight="6" refX="22" refY="3" orient="auto">
              <path d="M0,0 L0,6 L6,3 z" fill="#3f3f46" />
            </marker>
            <marker id="arrow-active" markerWidth="7" markerHeight="7" refX="22" refY="3.5" orient="auto">
              <path d="M0,0 L0,7 L7,3.5 z" fill="#38bdf8" />
            </marker>
            <marker id="arrow-shortest" markerWidth="8" markerHeight="8" refX="22" refY="4" orient="auto">
              <path d="M0,0 L0,8 L8,4 z" fill="#34d399" />
            </marker>
          </defs>

          {/* 1. EDGES */}
          {EDGES.map(edge => {
            const src = NODES.find(n => n.id === edge.source)!;
            const tgt = NODES.find(n => n.id === edge.target)!;
            
            const isShortest = step.shortestPathEdges.includes(edge.id);
            const isActive = step.activeEdges.includes(edge.id);
            const isRelaxed = step.relaxedEdges.includes(edge.id);

            const midX = (src.x + tgt.x) / 2;
            const midY = (src.y + tgt.y) / 2;

            // Offset label slightly perpendicular to edge
            const dx = tgt.x - src.x;
            const dy = tgt.y - src.y;
            const len = Math.sqrt(dx * dx + dy * dy);
            const offsetX = -dy / len * 12;
            const offsetY = dx / len * 12;

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
              strokeColor = '#065f46'; // emerald-900 / dark tree edge
              strokeWidth = 2;
            }

            return (
              <g key={edge.id} className="transition-all duration-300">
                <line
                  x1={src.x}
                  y1={src.y}
                  x2={tgt.x}
                  y2={tgt.y}
                  stroke={strokeColor}
                  strokeWidth={strokeWidth}
                  strokeDasharray={dashArray}
                  markerEnd={marker}
                  filter={isShortest ? 'url(#glow-emerald)' : undefined}
                />

                {/* Edge Weight Pill */}
                <g transform={`translate(${midX + offsetX}, ${midY + offsetY})`}>
                  <rect
                    x="-12"
                    y="-9"
                    width="24"
                    height="18"
                    rx="6"
                    fill={isShortest ? '#064e3b' : isActive ? '#082f49' : '#18181b'}
                    stroke={isShortest ? '#34d399' : isActive ? '#38bdf8' : '#27272a'}
                    strokeWidth="1"
                  />
                  <text
                    textAnchor="middle"
                    dy="3.5"
                    className="text-[10px] font-mono font-bold"
                    fill={isShortest ? '#6ee7b7' : isActive ? '#7dd3fc' : '#a1a1aa'}
                  >
                    {edge.weight}
                  </text>
                </g>
              </g>
            );
          })}

          {/* 2. NODES */}
          {NODES.map(node => {
            const isCurrent = step.currentNode === node.id;
            const isShortest = step.shortestPathNodes.includes(node.id);
            const isVisited = step.visitedNodes.includes(node.id);
            const isFrontier = step.frontierNodes.includes(node.id);
            const dist = step.distances[node.id];

            let nodeFill = '#111625';
            let strokeColor = '#3f3f46';
            let strokeWidth = 2;
            let filterId = undefined;

            if (isShortest) {
              nodeFill = '#064e3b';
              strokeColor = '#10b981';
              strokeWidth = 3;
              filterId = 'url(#glow-emerald)';
            } else if (isCurrent) {
              nodeFill = '#082f49';
              strokeColor = '#38bdf8';
              strokeWidth = 3;
              filterId = 'url(#glow-cyan)';
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
                {/* Node Outer Ring */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r="22"
                  fill={nodeFill}
                  stroke={strokeColor}
                  strokeWidth={strokeWidth}
                  filter={filterId}
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
                  dy="10"
                  className="text-[9px] font-mono font-bold"
                  fill={isShortest ? '#6ee7b7' : isCurrent ? '#7dd3fc' : '#94a3b8'}
                >
                  d={dist}
                </text>
              </g>
            );
          })}
        </svg>

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
            <div className={step.codeLine === 6 ? 'bg-amber-500/20 text-amber-200 px-1 rounded' : ''}>
              6:       dist[v] = d + w; heappush(pq)
            </div>
            <div className={step.codeLine === 8 ? 'bg-emerald-500/30 text-emerald-200 font-bold px-1 rounded' : ''}>
              7: return dist[target]  # = 8
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
