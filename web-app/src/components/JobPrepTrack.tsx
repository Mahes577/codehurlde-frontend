import React from 'react';
import { Layers, GitBranch, Network, Building2, ChevronRight } from 'lucide-react';

export const JobPrepTrack: React.FC = () => {
  const tracks = [
    {
      icon: Layers,
      title: 'Foundations & Linear Structures',
      focus: 'Arrays, Two Pointers, Sliding Window, Linked Lists',
      problems: '60 Curated Problems',
      level: 'Easy to Medium',
      completed: 24,
      total: 60,
    },
    {
      icon: GitBranch,
      title: 'Trees & Graph Traversal',
      focus: 'Binary Trees, BFS/DFS, Dijkstra, Topological Sort, Disjoint Set',
      problems: '75 Curated Problems',
      level: 'Medium to Hard',
      completed: 18,
      total: 75,
    },
    {
      icon: Network,
      title: 'Dynamic Programming Mastery',
      focus: 'Memoization, 1D/2D Tabulation, Knapsack, Longest Common Subsequence',
      problems: '80 Curated Problems',
      level: 'Medium to Hard',
      completed: 12,
      total: 80,
    },
    {
      icon: Building2,
      title: 'FAANG & Tier-1 Interview Sprints',
      focus: 'Google 50, Meta 75, Amazon Top 100, Uber High-Frequency',
      problems: '120 Curated Problems',
      level: 'Targeted Companies',
      completed: 35,
      total: 120,
    }
  ];

  return (
    <section id="tracks" className="py-16 sm:py-20 bg-[#000000] border-b border-white/[0.08]">
      <div className="mx-auto max-w-[1720px] px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-white/[0.08]">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-zinc-500 font-medium mb-1">
              Structured Study Roadmaps
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Curated Pattern Tracks
            </h2>
          </div>
          <div className="text-xs font-mono text-zinc-400">
            Systematic pattern coverage with zero filler questions
          </div>
        </div>

        {/* 4 Cards Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {tracks.map((track, idx) => {
            const Icon = track.icon;
            const pct = Math.round((track.completed / track.total) * 100);
            return (
              <div 
                key={idx}
                className="rounded-lg border border-white/[0.08] bg-[#111111] p-5 flex flex-col justify-between hover:border-white/[0.16] transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="h-8 w-8 rounded bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-zinc-300">
                      <Icon className="h-4 w-4" />
                    </div>
                    <span className="text-[10px] font-mono text-zinc-400 border border-white/[0.06] bg-white/[0.02] px-1.5 py-0.2 rounded">
                      {track.level}
                    </span>
                  </div>

                  <h3 className="text-sm font-semibold text-white">
                    {track.title}
                  </h3>

                  <p className="mt-1 text-xs text-zinc-400 leading-relaxed">
                    {track.focus}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-white/[0.06]">
                  <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 mb-1.5">
                    <span>{track.problems}</span>
                    <span className="text-zinc-200">{pct}%</span>
                  </div>
                  <div className="h-1 w-full bg-white/[0.06] rounded-full overflow-hidden mb-3">
                    <div className="h-full bg-zinc-400 rounded-full" style={{ width: `${pct}%` }} />
                  </div>
                  
                  <a
                    href="#problems"
                    className="inline-flex items-center gap-1 text-xs font-mono text-zinc-300 hover:text-white transition-colors"
                  >
                    <span>View track</span>
                    <ChevronRight className="h-3 w-3 text-zinc-500" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
