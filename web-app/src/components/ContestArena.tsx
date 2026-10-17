import React, { useState, useEffect } from 'react';
import { Trophy, Timer, Users, Medal, ChevronRight, TrendingUp, Sparkles, Flame } from 'lucide-react';
import { Button } from './atoms/Button';
import { Badge } from './atoms/Badge';

interface LeaderboardUser {
  rank: number;
  name: string;
  handle: string;
  rating: number;
  badge: string;
  badgeColor: string;
  avatar: string;
}

const TOP_SOLVERS: LeaderboardUser[] = [
  { rank: 1, name: 'Alexandre C.', handle: 'alex_c', rating: 2842, badge: 'Grandmaster', badgeColor: 'text-rose-400 bg-rose-500/10 border-rose-500/30', avatar: 'AC' },
  { rank: 2, name: 'Priya Sharma', handle: 'priya_s', rating: 2690, badge: 'Master', badgeColor: 'text-amber-400 bg-amber-500/10 border-amber-500/30', avatar: 'PS' },
  { rank: 3, name: 'Chen Wei', handle: 'chen_w', rating: 2580, badge: 'Master', badgeColor: 'text-amber-400 bg-amber-500/10 border-amber-500/30', avatar: 'CW' },
  { rank: 4, name: 'Marcus Vance', handle: 'marcus_v', rating: 2465, badge: 'Candidate Master', badgeColor: 'text-purple-400 bg-purple-500/10 border-purple-500/30', avatar: 'MV' },
  { rank: 5, name: 'Sophia Miller', handle: 'sophia_m', rating: 2390, badge: 'Candidate Master', badgeColor: 'text-purple-400 bg-purple-500/10 border-purple-500/30', avatar: 'SM' },
];

export const ContestArena: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 28, seconds: 15 });
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

  // Rating history points for SVG curve
  const ratingHistory = [
    { contest: 'W32', rating: 1420 },
    { contest: 'W34', rating: 1510 },
    { contest: 'W36', rating: 1490 },
    { contest: 'W38', rating: 1640 },
    { contest: 'W39', rating: 1720 },
    { contest: 'W40', rating: 1780 },
    { contest: 'W41', rating: 1840 },
  ];

  return (
    <section id="contests" className="py-20 bg-[#07090e] border-b border-white/[0.08]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/[0.08]">
          <div className="max-w-2xl">
            <div className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold flex items-center gap-2 mb-2">
              <Trophy className="h-4 w-4" />
              Competitive Programming Arena
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Weekly Rated Contests & Global Leaderboards
            </h2>
            <p className="mt-3 text-sm sm:text-base text-zinc-300">
              Test your algorithmic speed and edge-case testing under real contest constraints. Compete in Division 1, 2, and 3 brackets with ICPC-style rules.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="rounded-lg bg-amber-500/10 border border-amber-500/30 px-3 py-1.5 text-xs font-mono font-bold text-amber-400">
              Season 2026 Active
            </span>
          </div>
        </div>

        {/* 2-Column Grid */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Live Contest Card & Rating Progression (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Contest Countdown Card */}
            <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-br from-[#121626] via-[#0c1220] to-[#080d18] p-6 sm:p-8 backdrop-blur-xl shadow-xl relative overflow-hidden">
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
                  </span>
                  <span className="text-xs font-mono uppercase tracking-wider font-bold text-amber-400">
                    Live Countdown · Weekly Contest 42
                  </span>
                </div>
                <span className="text-xs font-mono text-zinc-400 bg-black/40 px-2.5 py-0.5 rounded border border-white/[0.08]">
                  Div 1 + Div 2
                </span>
              </div>

              <div className="mt-5">
                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  CodeHurdle Weekly Round #42
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-zinc-300">
                  4 algorithmic problems: 1 Warmup Easy, 2 Interview Mediums, 1 ICPC Hard. 90-minute timed window.
                </p>
              </div>

              {/* Countdown Digits */}
              <div className="mt-6 rounded-xl border border-white/[0.08] bg-black/40 p-5 text-center">
                <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 mb-3">
                  Match Commences In
                </div>
                <div className="flex items-center justify-center gap-4 font-mono">
                  <div className="rounded-xl bg-[#0e1424] border border-amber-500/20 px-4 py-3 min-w-[70px]">
                    <div className="text-3xl font-black text-amber-400">{String(timeLeft.hours).padStart(2, '0')}</div>
                    <div className="text-[10px] text-zinc-500 uppercase font-sans mt-0.5">Hours</div>
                  </div>
                  <span className="text-2xl font-bold text-zinc-600">:</span>
                  <div className="rounded-xl bg-[#0e1424] border border-amber-500/20 px-4 py-3 min-w-[70px]">
                    <div className="text-3xl font-black text-amber-400">{String(timeLeft.minutes).padStart(2, '0')}</div>
                    <div className="text-[10px] text-zinc-500 uppercase font-sans mt-0.5">Mins</div>
                  </div>
                  <span className="text-2xl font-bold text-zinc-600">:</span>
                  <div className="rounded-xl bg-[#0e1424] border border-amber-500/20 px-4 py-3 min-w-[70px]">
                    <div className="text-3xl font-black text-amber-400">{String(timeLeft.seconds).padStart(2, '0')}</div>
                    <div className="text-[10px] text-zinc-500 uppercase font-sans mt-0.5">Secs</div>
                  </div>
                </div>
              </div>

              {/* Action row */}
              <div className="mt-6 pt-4 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                  <Users className="h-4 w-4 text-zinc-500" />
                  <span><strong className="text-white">4,812</strong> registered competitors</span>
                </div>

                <Button
                  variant={registered ? 'outline' : 'amber'}
                  size="md"
                  onClick={() => setRegistered(!registered)}
                  className="w-full sm:w-auto font-bold"
                >
                  {registered ? '✓ You Are Registered' : 'Register for Round (Free)'}
                </Button>
              </div>
            </div>

            {/* Rating Progression Graph Card */}
            <div className="rounded-2xl border border-white/[0.1] bg-[#0c1220]/90 p-5 backdrop-blur-xl shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                <div className="flex items-center gap-2 text-xs font-mono text-zinc-300 font-bold">
                  <TrendingUp className="h-4 w-4 text-emerald-400" />
                  <span>Your Rating Progression (Last 7 Contests)</span>
                </div>
                <span className="text-xs font-mono text-emerald-400 font-bold">+420 Elo Gain</span>
              </div>

              {/* SVG Sparkline Graph */}
              <div className="mt-4 pt-2">
                <div className="relative h-28 w-full">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 500 100" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="ratingGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>

                    {/* Gradient fill */}
                    <path
                      d="M 0,80 L 80,60 L 160,65 L 240,40 L 320,25 L 400,18 L 480,5 L 480,100 L 0,100 Z"
                      fill="url(#ratingGradient)"
                    />

                    {/* Curve line */}
                    <path
                      d="M 0,80 L 80,60 L 160,65 L 240,40 L 320,25 L 400,18 L 480,5"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="3"
                      className="filter drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]"
                    />

                    {/* Data Points */}
                    <circle cx="0" cy="80" r="4" fill="#10b981" />
                    <circle cx="80" cy="60" r="4" fill="#10b981" />
                    <circle cx="160" cy="65" r="4" fill="#10b981" />
                    <circle cx="240" cy="40" r="4" fill="#10b981" />
                    <circle cx="320" cy="25" r="4" fill="#10b981" />
                    <circle cx="400" cy="18" r="4" fill="#10b981" />
                    <circle cx="480" cy="5" r="5" fill="#34d399" stroke="#064e3b" strokeWidth="2" />
                  </svg>
                </div>

                <div className="mt-3 flex justify-between text-[11px] font-mono text-zinc-500">
                  {ratingHistory.map((item, idx) => (
                    <span key={idx}>{item.contest} ({item.rating})</span>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Global Standings Leaderboard (5 cols) */}
          <div className="lg:col-span-5 rounded-2xl border border-white/[0.1] bg-[#0c1220]/90 p-6 backdrop-blur-xl shadow-xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
              <div className="flex items-center gap-2">
                <Medal className="h-5 w-5 text-amber-400" />
                <h3 className="text-sm font-mono uppercase tracking-wider font-bold text-white">
                  Global Leaderboard
                </h3>
              </div>
              <span className="text-xs font-mono text-emerald-400">Live Tier 1</span>
            </div>

            {/* Solvers List */}
            <div className="mt-4 divide-y divide-white/[0.04]">
              {TOP_SOLVERS.map((solver) => (
                <div key={solver.rank} className="py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className={`w-5 text-center font-mono font-black text-sm ${
                      solver.rank === 1 ? 'text-amber-400' :
                      solver.rank === 2 ? 'text-zinc-300' :
                      solver.rank === 3 ? 'text-amber-600' : 'text-zinc-500'
                    }`}>
                      #{solver.rank}
                    </span>

                    <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-emerald-600/30 to-indigo-600/30 border border-white/[0.1] flex items-center justify-center font-mono font-bold text-xs text-white">
                      {solver.avatar}
                    </div>

                    <div>
                      <div className="text-xs font-bold text-white">{solver.name}</div>
                      <div className="text-[10px] font-mono text-zinc-400">@{solver.handle}</div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-xs font-mono font-black text-amber-400">{solver.rating}</div>
                    <span className={`inline-block text-[9px] font-mono font-bold px-1.5 py-0.2 rounded border ${solver.badgeColor}`}>
                      {solver.badge}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-white/[0.08] text-center">
              <a href="#contests" className="text-xs font-mono text-emerald-400 hover:text-emerald-300 font-semibold flex items-center justify-center gap-1">
                <span>View Full Standings (50,000+ engineers)</span>
                <ChevronRight className="h-3 w-3" />
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
