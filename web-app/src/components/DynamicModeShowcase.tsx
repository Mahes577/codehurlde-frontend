import React, { useState } from 'react';
import { Sparkles, BrainCircuit, TrendingUp, CheckCircle, ArrowRight, Zap, Target, RefreshCw } from 'lucide-react';

interface SkillTopic {
  name: string;
  level: number;
  status: 'Mastered' | 'In Progress' | 'Target Area';
  color: string;
}

export const DynamicModeShowcase: React.FC = () => {
  const [activeRecommendation, setActiveRecommendation] = useState({
    title: 'Number of Islands',
    id: 200,
    difficulty: 'Medium',
    category: 'Graph BFS / DFS',
    acceptance: '58.2%',
    matchScore: '94% Match',
    reasoning: 'You mastered Binary Tree BFS with 96% speed. Number of Islands translates BFS into 2D grid matrices, giving you the optimal stretch without cognitive stall.'
  });

  const [skills, setSkills] = useState<SkillTopic[]>([
    { name: 'Arrays & Two Pointers', level: 84, status: 'Mastered', color: 'bg-emerald-400' },
    { name: 'Binary Trees & BFS', level: 76, status: 'Mastered', color: 'bg-emerald-400' },
    { name: 'Binary Search', level: 65, status: 'In Progress', color: 'bg-amber-400' },
    { name: 'Graph Traversal', level: 54, status: 'In Progress', color: 'bg-amber-400' },
    { name: 'Dynamic Programming', level: 31, status: 'Target Area', color: 'bg-rose-400' },
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
        matchScore: '97% Match',
        reasoning: 'Adaptive Engine detected you are ready for Directed Acyclic Graphs. Course Schedule II reinforces cycle detection algorithms.'
      });
    }, 500);
  };

  return (
    <section id="dynamic-mode" className="relative py-20 bg-[#080c14] overflow-hidden border-t border-slate-800">
      
      {/* Background glow */}
      <div className="pointer-events-none absolute -top-40 right-10 h-96 w-96 rounded-full bg-violet-600/10 blur-[140px]" />
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-950/40 px-3.5 py-1.5 text-xs font-mono font-medium text-violet-300">
            <BrainCircuit className="h-4 w-4 text-violet-400" />
            <span>THE CODEHURDLE ADVANTAGE</span>
          </div>
          <h2 className="mt-4 text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Practice Built Around <span className="bg-gradient-to-r from-violet-400 to-indigo-300 bg-clip-text text-transparent">You</span>, Not a Fixed List.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
            Dynamic Mode watches your code submissions, execution times, and bug patterns to serve the optimal next problem.
            Always in your flow state — stretched, but never stuck.
          </p>
        </div>

        {/* Comparison: Traditional vs Dynamic Mode */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          
          <div className="rounded-xl border border-rose-500/20 bg-rose-950/10 p-6 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-rose-400 font-mono text-xs font-semibold uppercase tracking-wider">
              <span>✕ Traditional Problem Grinding</span>
            </div>
            <ul className="mt-4 space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-2">
                <span className="text-rose-400">✕</span>
                <span>Random blind sheets (Blind 75, LeetCode top 150) without personalized sequencing</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400">✕</span>
                <span>Jumping straight from Easy to impossible Hard questions causes burnout</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400">✕</span>
                <span>Spending 30 minutes deciding what problem to practice next ("choice paralysis")</span>
              </li>
            </ul>
          </div>

          <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/15 p-6 backdrop-blur-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 h-16 w-16 bg-emerald-500/10 rounded-bl-full" />
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-semibold uppercase tracking-wider">
              <span>✓ CodeHurdle Dynamic Mode</span>
            </div>
            <ul className="mt-4 space-y-3 text-sm text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Adaptive difficulty: problem picks scale precisely with your real-time performance</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Targeted weak-spot reinforcement (e.g. DP space optimization, Graph cycle detection)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Zero choice fatigue: open the app and instantly start solving the perfect challenge</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Interactive Live Skill Matrix & Adaptive Pick */}
        <div className="mt-14 rounded-2xl border border-slate-800 bg-[#0c1220]/90 p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Real-Time Skill Profile (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div>
                  <div className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">User Skill Level</div>
                  <div className="text-2xl font-black font-mono text-white flex items-center gap-2">
                    Level 14 <span className="text-xs font-sans font-medium text-violet-400 bg-violet-500/20 px-2 py-0.5 rounded border border-violet-500/30">Top 4.2%</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-mono text-slate-400">Weekly Target</div>
                  <div className="text-sm font-mono font-bold text-emerald-400">18 / 20 Solved</div>
                </div>
              </div>

              {/* Progress bars for skills */}
              <div className="space-y-4">
                {skills.map((skill, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-slate-200">{skill.name}</span>
                      <span className="text-slate-400 font-semibold">{skill.level}%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${skill.color} transition-all duration-500`}
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Recently Solved */}
              <div className="pt-2">
                <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2 font-semibold">
                  Recently Solved
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                  <span className="rounded bg-slate-800 px-2 py-0.5 border border-slate-700">Two Sum · Easy</span>
                  <span className="text-slate-500">4 min ago</span>
                  <span className="text-slate-600">|</span>
                  <span className="rounded bg-slate-800 px-2 py-0.5 border border-slate-700">Merge Intervals · Med</span>
                  <span className="text-slate-500">18 min ago</span>
                </div>
              </div>
            </div>

            {/* Right Column: AI Dynamic Recommendation Card (7 cols) */}
            <div className="lg:col-span-7 rounded-xl border border-violet-500/30 bg-gradient-to-br from-violet-950/25 via-[#0e1424] to-[#0c1220] p-6 sm:p-7 relative">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-violet-500/20">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-600/30 text-violet-300 border border-violet-500/40">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider font-semibold text-violet-300">
                      Adaptive Pick for You
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-violet-500/20 px-2.5 py-0.5 text-xs font-mono font-semibold text-violet-300 border border-violet-500/30">
                    {activeRecommendation.matchScore}
                  </span>
                  <button
                    onClick={handleNextAdaptivePick}
                    disabled={isRefreshing}
                    className="p-1.5 rounded-lg border border-slate-700 hover:border-slate-500 text-slate-400 hover:text-white transition-colors"
                    title="Simulate Next Adaptive Pick"
                  >
                    <RefreshCw className={`h-3.5 w-3.5 ${isRefreshing ? 'animate-spin text-violet-400' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Recommendation Details */}
              <div className="mt-5 space-y-4">
                <div className="flex items-baseline justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-slate-400">#{activeRecommendation.id}</span>
                    <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                      {activeRecommendation.title}
                    </h3>
                  </div>
                  <span className="rounded bg-amber-500/10 px-2 py-0.5 text-xs font-mono font-semibold text-amber-400 border border-amber-500/20">
                    {activeRecommendation.difficulty}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
                  <span>Topic: <strong className="text-slate-200">{activeRecommendation.category}</strong></span>
                  <span>•</span>
                  <span>Acceptance: <strong className="text-slate-200">{activeRecommendation.acceptance}</strong></span>
                </div>

                {/* Adaptive Rationale Note */}
                <div className="rounded-lg bg-violet-950/40 p-4 border border-violet-500/20">
                  <div className="text-[11px] font-mono uppercase tracking-wider font-semibold text-violet-400 flex items-center gap-1.5 mb-1">
                    <Target className="h-3.5 w-3.5" />
                    Adaptive Rationale
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    "{activeRecommendation.reasoning}"
                  </p>
                </div>

                {/* Action button */}
                <div className="pt-2 flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-mono">Estimated solve time: ~20 mins</span>
                  <a
                    href="#dsa"
                    className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-lg shadow-violet-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <span>Solve in Dynamic Mode</span>
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>

              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
