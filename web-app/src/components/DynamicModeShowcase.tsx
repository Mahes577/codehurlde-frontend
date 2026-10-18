import React, { useState } from 'react';
import { 
  Sparkles, 
  BrainCircuit, 
  Target, 
  RefreshCw, 
  ArrowRight, 
  Activity, 
  ChevronRight, 
  CheckCircle2, 
  Layers,
  Sliders
} from 'lucide-react';

interface RadarAxis {
  label: string;
  score: number; // 0 - 100
  angle: number; // in degrees
}

const RADAR_AXES: RadarAxis[] = [
  { label: 'Arrays & Pointers', score: 88, angle: 0 },
  { label: 'Trees & BFS', score: 76, angle: 60 },
  { label: 'Binary Search', score: 65, angle: 120 },
  { label: 'Graphs & DFS', score: 58, angle: 180 },
  { label: 'Dynamic Prog', score: 42, angle: 240 },
  { label: 'Bit Manipulation', score: 70, angle: 300 },
];

export const DynamicModeShowcase: React.FC = () => {
  const [recommendation, setRecommendation] = useState({
    title: 'Number of Islands',
    id: 200,
    difficulty: 'Medium',
    category: 'Graph BFS / Grid Traversal',
    matchScore: '96% Fit',
    reasoning: 'You proved 94% speed on Binary Tree BFS. Number of Islands tests bounded queue traversal in a 2D matrix, seamlessly expanding your graph intuition without conceptual overload.'
  });

  const [isRefreshing, setIsRefreshing] = useState(false);

  // SVG Radar Chart calculations
  const size = 300;
  const center = size / 2;
  const radius = 105;

  const getCoordinates = (angleInDegrees: number, r: number) => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
    return {
      x: center + r * Math.cos(angleInRadians),
      y: center + r * Math.sin(angleInRadians),
    };
  };

  // Outer polygon points
  const polygonPoints = RADAR_AXES.map((axis) => {
    const r = (axis.score / 100) * radius;
    const { x, y } = getCoordinates(axis.angle, r);
    return `${x},${y}`;
  }).join(' ');

  const handleNextPick = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setRecommendation({
        title: 'Course Schedule II',
        id: 210,
        difficulty: 'Medium',
        category: 'Topological Sort / DAG',
        matchScore: '98% Fit',
        reasoning: 'Adaptive Engine detected optimal readiness for Directed Acyclic Graph traversal and Kahn’s Algorithm before advancing to Dijkstra shortest path.'
      });
    }, 450);
  };

  return (
    <section id="dynamic-mode" className="py-20 bg-[#000000] border-b border-white/[0.08] relative overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute top-1/2 right-10 -translate-y-1/2 h-96 w-96 rounded-full bg-zinc-500/10 blur-[130px]" />
      
      <div className="mx-auto max-w-[1720px] px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/[0.08]">
          <div className="max-w-2xl">
            <div className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-bold flex items-center gap-2 mb-2">
              <BrainCircuit className="h-4 w-4" />
              Algorithmic Skill Calibration
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Adaptive Sequencing. Zero Choice Paralysis.
            </h2>
            <p className="mt-3 text-sm sm:text-base text-zinc-300 leading-relaxed">
              Blind lists like NeetCode 150 leave you guessing what to tackle next. CodeHurdle profiles your runtime speed, memory limits, and logic gaps to serve problems at your exact learning boundary.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="rounded-lg bg-zinc-500/10 border border-zinc-500/25 px-3 py-1.5 text-xs font-mono font-bold text-zinc-400">
              Adaptive Engine: Active
            </span>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Visual Radar Chart & Skill Polygon (5 cols) */}
          <div className="lg:col-span-5 rounded-2xl border border-white/[0.1] bg-[#111111]/90 p-6 backdrop-blur-xl shadow-xl flex flex-col items-center">
            
            <div className="w-full flex items-center justify-between pb-3 border-b border-white/[0.08] mb-4">
              <div>
                <div className="text-[11px] font-mono uppercase text-zinc-500">Algorithm Proficiency</div>
                <div className="text-lg font-bold font-mono text-white flex items-center gap-2">
                  Level 14 Coder <span className="text-xs font-sans text-zinc-400 font-medium">Top 4%</span>
                </div>
              </div>
              <span className="text-xs font-mono text-zinc-400">Elo: 1,840</span>
            </div>

            {/* Radar SVG Graphic */}
            <div className="relative">
              <svg width={size} height={size} className="overflow-visible select-none">
                {/* Background Web Rings */}
                {[0.25, 0.5, 0.75, 1.0].map((scale, idx) => (
                  <polygon
                    key={idx}
                    points={RADAR_AXES.map((axis) => {
                      const { x, y } = getCoordinates(axis.angle, radius * scale);
                      return `${x},${y}`;
                    }).join(' ')}
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.08)"
                    strokeWidth="1"
                  />
                ))}

                {/* Spokes from center */}
                {RADAR_AXES.map((axis, idx) => {
                  const { x, y } = getCoordinates(axis.angle, radius);
                  return (
                    <line
                      key={idx}
                      x1={center}
                      y1={center}
                      x2={x}
                      y2={y}
                      stroke="rgba(255, 255, 255, 0.08)"
                      strokeWidth="1"
                    />
                  );
                })}

                {/* Active Skill Area Polygon */}
                <polygon
                  points={polygonPoints}
                  fill="rgba(161, 161, 170, 0.25)"
                  stroke="#a1a1aa"
                  strokeWidth="2"
                  className="filter drop-shadow-[0_0_12px_rgba(16,185,129,0.5)]"
                />

                {/* Vertex Points & Labels */}
                {RADAR_AXES.map((axis, idx) => {
                  const r = (axis.score / 100) * radius;
                  const { x, y } = getCoordinates(axis.angle, r);
                  const labelCoord = getCoordinates(axis.angle, radius + 22);

                  return (
                    <g key={idx}>
                      <circle cx={x} cy={y} r="4" fill="#e4e4e7" stroke="#18181b" strokeWidth="2" />
                      <text
                        x={labelCoord.x}
                        y={labelCoord.y}
                        textAnchor="middle"
                        dominantBaseline="central"
                        className="fill-zinc-400 text-[10px] font-mono font-semibold"
                      >
                        {axis.label} ({axis.score}%)
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            <div className="w-full mt-4 pt-3 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono text-zinc-400">
              <span>Weakest: Dynamic Programming</span>
              <span className="text-zinc-400 font-bold">Strongest: Arrays</span>
            </div>

          </div>

          {/* Right Column: AI Adaptive Recommendation Card (7 cols) */}
          <div className="lg:col-span-7 rounded-2xl border border-zinc-500/30 bg-gradient-to-br from-[#0e1629] via-[#0b101e] to-[#080c16] p-6 sm:p-8 backdrop-blur-xl shadow-2xl relative">
            
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/[0.08]">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-zinc-500/20 border border-zinc-500/30 flex items-center justify-center text-zinc-400">
                  <Target className="h-4 w-4" />
                </div>
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider font-bold text-zinc-400">
                    Next Optimal Challenge
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="rounded-full bg-zinc-500/20 px-3 py-1 text-xs font-mono font-bold text-zinc-300 border border-zinc-500/40 shadow-sm shadow-zinc-500/20">
                  {recommendation.matchScore}
                </span>

                <button
                  onClick={handleNextPick}
                  disabled={isRefreshing}
                  className="flex items-center gap-1.5 rounded-lg border border-white/[0.1] bg-white/[0.04] px-2.5 py-1 text-xs font-mono text-zinc-300 hover:text-white transition-colors"
                  title="Test Next Pick"
                >
                  <RefreshCw className={`h-3.5 w-3.5 ${isRefreshing ? 'animate-spin text-zinc-400' : ''}`} />
                  <span>Next Pick</span>
                </button>
              </div>
            </div>

            {/* Recommendation info */}
            <div className="mt-5 space-y-4">
              <div className="flex items-baseline justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-mono text-zinc-500">#{recommendation.id}</span>
                  <h3 className="text-2xl font-black text-white tracking-tight">
                    {recommendation.title}
                  </h3>
                </div>
                <span className="rounded-md bg-zinc-500/10 px-2.5 py-1 text-xs font-mono font-bold text-zinc-400 border border-zinc-500/30">
                  {recommendation.difficulty}
                </span>
              </div>

              <div className="flex items-center gap-4 text-xs font-mono text-zinc-400">
                <span>Pattern: <strong className="text-zinc-200">{recommendation.category}</strong></span>
                <span>•</span>
                <span>Target Time: <strong className="text-zinc-400">20 mins</strong></span>
              </div>

              {/* Rationale explanation callout */}
              <div className="rounded-xl border border-zinc-500/20 bg-zinc-950/20 p-4 font-sans">
                <div className="text-[11px] font-mono uppercase tracking-wider font-bold text-zinc-400 mb-1 flex items-center gap-1.5">
                  <Activity className="h-3.5 w-3.5" />
                  Calibration Rationale
                </div>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  "{recommendation.reasoning}"
                </p>
              </div>

              {/* Action buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs font-mono text-zinc-400">
                  Acceptance: <strong className="text-white">58.2%</strong> (214k submissions)
                </div>

                <a
                  href="#problems"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-zinc-500 hover:bg-zinc-400 px-6 py-3 text-xs sm:text-sm font-bold text-zinc-950 shadow-lg shadow-zinc-500/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>Solve with Dynamic Mode</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
