import React, { useState } from 'react';
import { RefreshCw, ArrowRight, CheckCircle2, ChevronRight, Sliders, Target } from 'lucide-react';

interface SkillTopic {
  name: string;
  elo: number;
  problemsSolved: number;
  totalProblems: number;
  status: 'Mastered' | 'Proficient' | 'Target Area';
}

export const DynamicModeShowcase: React.FC = () => {
  const [activeRecommendation, setActiveRecommendation] = useState({
    title: 'Number of Islands',
    id: 200,
    difficulty: 'Medium',
    category: 'Graph BFS / Grid Traversal',
    acceptance: '58.2%',
    recommendedElo: '1,500 – 1,600',
    rationale: 'You achieved 96% speed on Binary Tree BFS. Number of Islands maps standard queue-based BFS into 2D grid matrix boundaries, bridging tree algorithms to general graph theory.'
  });

  const [skills] = useState<SkillTopic[]>([
    { name: 'Arrays & Two Pointers', elo: 1840, problemsSolved: 42, totalProblems: 45, status: 'Mastered' },
    { name: 'Binary Trees & BFS', elo: 1720, problemsSolved: 34, totalProblems: 40, status: 'Mastered' },
    { name: 'Binary Search', elo: 1590, problemsSolved: 26, totalProblems: 35, status: 'Proficient' },
    { name: 'Graphs & Disjoint Set', elo: 1480, problemsSolved: 18, totalProblems: 38, status: 'Proficient' },
    { name: 'Dynamic Programming', elo: 1320, problemsSolved: 14, totalProblems: 45, status: 'Target Area' },
  ]);

  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleNextAdaptivePick = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setActiveRecommendation({
        title: 'Course Schedule II',
        id: 210,
        difficulty: 'Medium',
        category: 'Topological Sort / DAG',
        acceptance: '49.1%',
        recommendedElo: '1,550 – 1,650',
        rationale: 'Calibrated to verify cycle detection via in-degree array (Kahn’s Algorithm) before moving to advanced shortest path algorithms.'
      });
    }, 400);
  };

  return (
    <section id="dynamic-mode" className="py-16 sm:py-20 bg-[#090a0f] border-b border-white/[0.08]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/[0.08]">
          <div className="max-w-2xl">
            <div className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-medium mb-2">
              Skill Calibration Engine
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Adaptive problem sequencing based on actual retention.
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-zinc-400 leading-relaxed">
              Static sheets like Blind 75 create knowledge cliffs when an easy problem jumps abruptly to a niche hard trick.
              CodeHurdle models your proficiency across 16 patterns, scheduling practice at your exact growth boundary.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-zinc-400 bg-white/[0.03] border border-white/[0.08] px-3 py-1.5 rounded">
              Elo Model: Dynamic v2.4
            </span>
          </div>
        </div>

        {/* Calibration Dashboard Display */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Skill Telemetry (5 cols) */}
          <div className="lg:col-span-5 rounded-lg border border-white/[0.08] bg-[#0c0e16] p-5">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <div>
                <div className="text-[11px] font-mono uppercase text-zinc-500">Overall Rating</div>
                <div className="text-xl font-bold font-mono text-white flex items-center gap-2">
                  1,620 Elo <span className="text-[11px] font-sans font-medium text-emerald-400 bg-emerald-500/10 px-1.5 py-0.2 rounded border border-emerald-500/20">Proficient</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[11px] font-mono text-zinc-500">Weekly Progress</div>
                <div className="text-xs font-mono font-medium text-zinc-300">18 / 20 Targets</div>
              </div>
            </div>

            {/* Topic ratings table */}
            <div className="mt-4 space-y-3">
              {skills.map((skill, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-200 font-medium">{skill.name}</span>
                    <div className="flex items-center gap-2 font-mono text-[11px]">
                      <span className="text-zinc-400">{skill.problemsSolved}/{skill.totalProblems}</span>
                      <span className={`font-semibold ${
                        skill.status === 'Mastered' ? 'text-emerald-400' :
                        skill.status === 'Proficient' ? 'text-amber-400' : 'text-zinc-400'
                      }`}>
                        {skill.elo}
                      </span>
                    </div>
                  </div>
                  <div className="h-1.5 w-full bg-white/[0.06] rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${
                        skill.status === 'Mastered' ? 'bg-emerald-400' :
                        skill.status === 'Proficient' ? 'bg-amber-400' : 'bg-zinc-500'
                      }`}
                      style={{ width: `${(skill.problemsSolved / skill.totalProblems) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 pt-3 border-t border-white/[0.08] flex items-center justify-between text-[11px] font-mono text-zinc-500">
              <span>Next rating audit: 2 problems</span>
              <a href="#problems" className="text-zinc-300 hover:text-white flex items-center gap-0.5">
                View skill tree <ChevronRight className="h-3 w-3" />
              </a>
            </div>
          </div>

          {/* Right Column: Next Calibrated Problem Pick (7 cols) */}
          <div className="lg:col-span-7 rounded-lg border border-white/[0.08] bg-[#0c0e16] p-5">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                <Target className="h-3.5 w-3.5 text-emerald-400" />
                <span>Next Calibrated Problem</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono text-zinc-400">
                  Target Band: {activeRecommendation.recommendedElo}
                </span>
                <button
                  onClick={handleNextAdaptivePick}
                  disabled={isRefreshing}
                  className="flex items-center gap-1 px-2 py-0.5 rounded border border-white/[0.08] bg-white/[0.03] text-[11px] font-mono text-zinc-400 hover:text-zinc-200 transition-colors"
                  title="Simulate Next Pick"
                >
                  <RefreshCw className={`h-3 w-3 ${isRefreshing ? 'animate-spin text-emerald-400' : ''}`} />
                  <span>Next Pick</span>
                </button>
              </div>
            </div>

            {/* Problem card info */}
            <div className="mt-4 space-y-3">
              <div className="flex items-baseline justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-zinc-500">#{activeRecommendation.id}</span>
                  <h3 className="text-lg font-bold text-white tracking-tight">
                    {activeRecommendation.title}
                  </h3>
                </div>
                <span className="text-xs font-mono font-medium text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded">
                  {activeRecommendation.difficulty}
                </span>
              </div>

              <div className="flex items-center gap-3 text-xs font-mono text-zinc-400">
                <span>Pattern: <strong className="text-zinc-300">{activeRecommendation.category}</strong></span>
                <span>•</span>
                <span>Acceptance: <strong className="text-zinc-300">{activeRecommendation.acceptance}</strong></span>
              </div>

              {/* Rationale explanation box */}
              <div className="rounded border border-white/[0.06] bg-white/[0.02] p-3 text-xs text-zinc-300 leading-relaxed font-sans">
                <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 mb-1 font-semibold">
                  Sequencing Rationale
                </div>
                {activeRecommendation.rationale}
              </div>

              {/* CTA button */}
              <div className="pt-2 flex items-center justify-between">
                <span className="text-[11px] font-mono text-zinc-500">
                  Target solve window: 20 minutes
                </span>
                <a
                  href="#problems"
                  className="inline-flex items-center gap-1.5 rounded bg-white hover:bg-zinc-100 px-3.5 py-1.5 text-xs font-medium text-zinc-950 transition-colors"
                >
                  <span>Solve Problem</span>
                  <ArrowRight className="h-3 w-3 text-zinc-700" />
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
