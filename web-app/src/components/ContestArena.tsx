import React, { useState, useEffect } from 'react';
import { Trophy, Timer, Users, ChevronRight, Calendar } from 'lucide-react';

interface LeaderboardEntry {
  rank: number;
  initials: string;
  name: string;
  handle: string;
  rating: number;
  tier: 'Grandmaster' | 'Master' | 'Candidate Master';
  solved: number;
}

const TOP_SOLVERS: LeaderboardEntry[] = [
  { rank: 1, initials: 'AC', name: 'Alexandre C.', handle: 'alex_c', rating: 2842, tier: 'Grandmaster', solved: 498 },
  { rank: 2, initials: 'PS', name: 'Priya Sharma', handle: 'priya_s', rating: 2690, tier: 'Master', solved: 476 },
  { rank: 3, initials: 'CW', name: 'Chen Wei', handle: 'chen_w', rating: 2580, tier: 'Master', solved: 452 },
  { rank: 4, initials: 'MV', name: 'Marcus Vance', handle: 'marcus_v', rating: 2465, tier: 'Candidate Master', solved: 430 },
  { rank: 5, initials: 'SM', name: 'Sophia Miller', handle: 'sophia_m', rating: 2390, tier: 'Candidate Master', solved: 412 },
];

export const ContestArena: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 36, seconds: 40 });
  const [registered, setRegistered] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="contests" className="py-16 sm:py-20 bg-[#090a0f] border-b border-white/[0.08]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-white/[0.08]">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-zinc-500 font-medium mb-1">
              Competitive Programming Arena
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Weekly Rated Contests & Leaderboard
            </h2>
          </div>
          <div className="text-xs font-mono text-zinc-400">
            Divisions: Div 1 (&gt;1900) · Div 2 (1400–1900) · Div 3 (&lt;1400)
          </div>
        </div>

        {/* 2-Column Layout */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Upcoming Contest Card (7 cols) */}
          <div className="lg:col-span-7 rounded-lg border border-white/[0.08] bg-[#0c0e16] p-6">
            
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-amber-400" />
                <span className="text-xs font-mono uppercase tracking-wider font-medium text-zinc-300">
                  Upcoming Rated Round
                </span>
              </div>
              <span className="text-xs font-mono text-zinc-500">
                Weekly Round #42
              </span>
            </div>

            <div className="mt-4">
              <h3 className="text-xl font-bold text-white tracking-tight">
                CodeHurdle Weekly Contest 42
              </h3>
              <p className="mt-1 text-xs text-zinc-400">
                4 problems · 90 minutes duration · ICPC-style 5-minute incorrect submission penalty.
              </p>
            </div>

            {/* Countdown timer strip */}
            <div className="mt-6 rounded border border-white/[0.08] bg-white/[0.02] p-4 text-center">
              <div className="text-[11px] font-mono uppercase text-zinc-500 mb-2">
                Contest Commences In
              </div>
              <div className="flex items-center justify-center gap-3 font-mono">
                <div className="px-3 py-1.5 rounded bg-black/40 border border-white/[0.06] min-w-[56px]">
                  <div className="text-xl font-bold text-white">{String(timeLeft.hours).padStart(2, '0')}</div>
                  <div className="text-[10px] text-zinc-500">Hours</div>
                </div>
                <span className="text-zinc-600 font-bold">:</span>
                <div className="px-3 py-1.5 rounded bg-black/40 border border-white/[0.06] min-w-[56px]">
                  <div className="text-xl font-bold text-white">{String(timeLeft.minutes).padStart(2, '0')}</div>
                  <div className="text-[10px] text-zinc-500">Mins</div>
                </div>
                <span className="text-zinc-600 font-bold">:</span>
                <div className="px-3 py-1.5 rounded bg-black/40 border border-white/[0.06] min-w-[56px]">
                  <div className="text-xl font-bold text-white">{String(timeLeft.seconds).padStart(2, '0')}</div>
                  <div className="text-[10px] text-zinc-500">Secs</div>
                </div>
              </div>
            </div>

            {/* Registration action */}
            <div className="mt-6 pt-4 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                <Users className="h-3.5 w-3.5 text-zinc-500" />
                <span><strong className="text-zinc-200">4,812</strong> engineers registered</span>
              </div>

              <button
                onClick={() => setRegistered(!registered)}
                className={`w-full sm:w-auto px-4 py-2 rounded text-xs font-medium transition-colors ${
                  registered
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    : 'bg-white text-zinc-950 hover:bg-zinc-200'
                }`}
              >
                {registered ? '✓ Registered · Added to Calendar' : 'Register for Contest'}
              </button>
            </div>

          </div>

          {/* Leaderboard (5 cols) */}
          <div className="lg:col-span-5 rounded-lg border border-white/[0.08] bg-[#0c0e16] p-5">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <div className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-medium">
                Season 2026 Rankings
              </div>
              <span className="text-[11px] font-mono text-zinc-500">Top Rated</span>
            </div>

            <div className="mt-3 divide-y divide-white/[0.04]">
              {TOP_SOLVERS.map((solver) => (
                <div key={solver.rank} className="py-2.5 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="w-5 text-center font-mono font-medium text-xs text-zinc-500">
                      #{solver.rank}
                    </span>
                    <div className="h-6 w-6 rounded bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-[10px] font-mono font-bold text-zinc-300">
                      {solver.initials}
                    </div>
                    <div>
                      <div className="text-xs font-medium text-zinc-200">{solver.name}</div>
                      <div className="text-[10px] font-mono text-zinc-500">@{solver.handle}</div>
                    </div>
                  </div>

                  <div className="text-right font-mono text-xs">
                    <div className="font-semibold text-zinc-200">{solver.rating}</div>
                    <div className="text-[10px] text-zinc-500">{solver.tier}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-3 pt-3 border-t border-white/[0.08] text-center">
              <a href="#contests" className="text-xs font-mono text-zinc-400 hover:text-white flex items-center justify-center gap-1">
                <span>View Full Global Standings</span>
                <ChevronRight className="h-3 w-3" />
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
