import React, { useState, useEffect } from 'react';
import { Trophy, Timer, Users, Medal, ChevronRight, Flame, Shield, ArrowUp } from 'lucide-react';
import { LeaderboardUser } from '../types';

const TOP_SOLVERS: LeaderboardUser[] = [
  { rank: 1, name: 'Alexandre C.', handle: 'tourist_clone', avatar: '🧙‍♂️', rating: 2842, solvedCount: 498, badge: 'Grandmaster' },
  { rank: 2, name: 'Priya Sharma', handle: 'priya_algo', avatar: '🚀', rating: 2690, solvedCount: 476, badge: 'Master' },
  { rank: 3, name: 'Chen Wei', handle: 'chen_dp_god', avatar: '⚡', rating: 2580, solvedCount: 452, badge: 'Master' },
  { rank: 4, name: 'Marcus Vance', handle: 'marcus_v', avatar: '🔥', rating: 2465, solvedCount: 430, badge: 'Candidate Master' },
  { rank: 5, name: 'Sophia Miller', handle: 'sophia_cs', avatar: '⭐', rating: 2390, solvedCount: 412, badge: 'Candidate Master' },
];

export const ContestArena: React.FC = () => {
  // Live countdown timer simulation
  const [timeLeft, setTimeLeft] = useState({
    hours: 2,
    minutes: 42,
    seconds: 18,
  });

  const [registered, setRegistered] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="cp-arena" className="py-20 bg-[#090d18] border-t border-slate-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-950/40 px-3 py-1 text-xs font-mono font-medium text-amber-400 mb-3">
              <Trophy className="h-3.5 w-3.5" />
              <span>CP ARENA · TIMED BATTLES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Competitive Programming Arena
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-300 max-w-2xl">
              Sharpen your speed, algorithmic rigor, and edge-case testing under real contest pressure. Compete weekly with thousands of global engineers.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-xs font-mono text-slate-300">
              Div 1 · Div 2 · Div 3 Rounds
            </span>
          </div>
        </div>

        {/* Contest Grid */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Live / Next Contest Card (7 cols) */}
          <div className="lg:col-span-7 rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-950/15 via-[#0c1220] to-[#0a0f1d] p-6 sm:p-8 backdrop-blur-xl shadow-xl">
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
                </span>
                <span className="text-xs font-mono uppercase tracking-wider font-semibold text-amber-400">
                  Upcoming Rated Contest
                </span>
              </div>
              <span className="text-xs font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                Weekly #42
              </span>
            </div>

            <h3 className="mt-4 text-2xl sm:text-3xl font-extrabold text-white">
              CodeHurdle Weekly Contest 42
            </h3>
            <p className="mt-2 text-sm text-slate-300">
              4 algorithmic problems: 1 Easy, 2 Medium, 1 Hard. Penalty of 5 minutes for each incorrect submission.
            </p>

            {/* Countdown Clock */}
            <div className="mt-8 rounded-xl bg-slate-950/80 p-5 border border-slate-800">
              <div className="text-xs font-mono uppercase text-slate-400 mb-3 text-center">
                Contest Commences In
              </div>
              <div className="flex items-center justify-center gap-4 text-center font-mono">
                <div className="bg-slate-900 border border-slate-800 rounded-lg p-3 min-w-[70px]">
                  <div className="text-2xl sm:text-3xl font-bold text-amber-400">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </div>
                  <div className="text-[10px] uppercase text-slate-500 font-sans mt-1">Hours</div>
                </div>
                <span className="text-xl font-bold text-slate-600">:</span>
                <div className="bg-slate-900 border border-slate-800 rounded-lg p-3 min-w-[70px]">
                  <div className="text-2xl sm:text-3xl font-bold text-amber-400">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </div>
                  <div className="text-[10px] uppercase text-slate-500 font-sans mt-1">Mins</div>
                </div>
                <span className="text-xl font-bold text-slate-600">:</span>
                <div className="bg-slate-900 border border-slate-800 rounded-lg p-3 min-w-[70px]">
                  <div className="text-2xl sm:text-3xl font-bold text-amber-400">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </div>
                  <div className="text-[10px] uppercase text-slate-500 font-sans mt-1">Secs</div>
                </div>
              </div>
            </div>

            {/* Registration status */}
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                <Users className="h-4 w-4 text-slate-400" />
                <span><strong className="text-white">4,812</strong> coders registered</span>
              </div>

              <button
                onClick={() => setRegistered(!registered)}
                className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg px-6 py-2.5 text-xs sm:text-sm font-semibold transition-all ${
                  registered 
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold shadow-lg shadow-amber-500/20 active:scale-95'
                }`}
              >
                {registered ? (
                  <>
                    <span>✓ Registered · Add to Calendar</span>
                  </>
                ) : (
                  <>
                    <span>Register Now (Free)</span>
                    <ChevronRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>

          </div>

          {/* Right Column: Live Global Leaderboard (5 cols) */}
          <div className="lg:col-span-5 rounded-2xl border border-slate-800 bg-[#0c1220]/90 p-6 backdrop-blur-xl shadow-xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Medal className="h-4 w-4 text-amber-400" />
                <h3 className="text-sm font-mono uppercase tracking-wider font-semibold text-slate-200">
                  Global Leaderboard
                </h3>
              </div>
              <span className="text-xs font-mono text-emerald-400">Season 2026</span>
            </div>

            {/* Solver List */}
            <div className="mt-4 divide-y divide-slate-850">
              {TOP_SOLVERS.map((solver) => (
                <div key={solver.rank} className="py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className={`w-5 text-center font-mono font-bold text-xs ${
                      solver.rank === 1 ? 'text-amber-400' :
                      solver.rank === 2 ? 'text-slate-300' :
                      solver.rank === 3 ? 'text-amber-600' : 'text-slate-500'
                    }`}>
                      #{solver.rank}
                    </span>
                    <span className="text-lg">{solver.avatar}</span>
                    <div>
                      <div className="text-xs font-semibold text-slate-200">{solver.name}</div>
                      <div className="text-[11px] font-mono text-slate-500">@{solver.handle}</div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-xs font-mono font-bold text-amber-400">{solver.rating}</div>
                    <div className="text-[10px] font-mono text-slate-400">{solver.solvedCount} solved</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 text-center">
              <a href="#leaderboard" className="text-xs font-mono text-indigo-400 hover:text-indigo-300 flex items-center justify-center gap-1">
                <span>View Full Global Rankings (50,000+)</span>
                <ChevronRight className="h-3 w-3" />
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
