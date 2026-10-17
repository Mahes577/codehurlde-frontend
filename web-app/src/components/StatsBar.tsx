import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Flame, 
  Award, 
  TrendingUp, 
  ChevronRight, 
  Code2, 
  Target, 
  PieChart, 
  ArrowUpRight 
} from 'lucide-react';

export const StatsBar: React.FC = () => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<'All' | 'Easy' | 'Medium' | 'Hard'>('All');

  // Problem counts
  const easySolved = 184;
  const easyTotal = 210;
  const medSolved = 142;
  const medTotal = 230;
  const hardSolved = 34;
  const hardTotal = 80;

  const totalSolved = easySolved + medSolved + hardSolved; // 360
  const totalProblems = easyTotal + medTotal + hardTotal; // 520

  // Circular progress calculations
  const radius = 54;
  const circumference = 2 * Math.PI * radius; // ~339.29
  const solvedRatio = totalSolved / totalProblems; // 360 / 520 = ~0.692
  const strokeDashoffset = circumference - (solvedRatio * circumference);

  return (
    <section id="stats" className="py-12 bg-[#07090e] border-y border-white/[0.08]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Main Scorecard Card */}
        <div className="rounded-2xl border border-white/[0.1] bg-[#0c1220]/90 p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left 4 cols: Circular Progress Ring & Total Solved */}
            <div className="lg:col-span-4 flex items-center gap-6 border-b lg:border-b-0 lg:border-r border-white/[0.08] pb-6 lg:pb-0 lg:pr-6">
              
              {/* Circular SVG Ring */}
              <div className="relative shrink-0">
                <svg width="136" height="136" className="transform -rotate-90">
                  {/* Track ring */}
                  <circle
                    cx="68"
                    cy="68"
                    r={radius}
                    stroke="rgba(255, 255, 255, 0.06)"
                    strokeWidth="10"
                    fill="transparent"
                  />
                  {/* Progress ring */}
                  <circle
                    cx="68"
                    cy="68"
                    r={radius}
                    stroke="#10b981"
                    strokeWidth="10"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    fill="transparent"
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>

                {/* Inner center text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-2xl font-black font-mono text-white leading-tight">
                    {totalSolved}
                  </span>
                  <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
                    / {totalProblems} Solved
                  </span>
                </div>
              </div>

              {/* Progress Summary Info */}
              <div className="space-y-1.5 font-mono text-xs">
                <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                  <Target className="h-3.5 w-3.5" />
                  Mastery Progress
                </div>
                <div className="text-sm font-bold text-white font-sans">
                  Top 8.4% of Global Solvers
                </div>
                <div className="text-zinc-400 text-[11px]">
                  Passing rate: <strong className="text-emerald-400">89.4%</strong> on first submission
                </div>
                <div className="pt-1">
                  <a href="#problems" className="text-[11px] text-zinc-300 hover:text-white flex items-center gap-1">
                    <span>View all submissions</span>
                    <ArrowUpRight className="h-3 w-3 text-zinc-500" />
                  </a>
                </div>
              </div>

            </div>

            {/* Middle 5 cols: Segmented Difficulty Progress Bars */}
            <div className="lg:col-span-5 space-y-4 border-b lg:border-b-0 lg:border-r border-white/[0.08] pb-6 lg:pb-0 lg:pr-6">
              <div className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-medium">
                Problem Difficulty Breakdown
              </div>

              {/* Easy Bar */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-emerald-400 font-bold">Easy</span>
                  <span className="text-zinc-300">
                    <strong>{easySolved}</strong> / {easyTotal} <span className="text-zinc-500 text-[11px]">({Math.round((easySolved/easyTotal)*100)}%)</span>
                  </span>
                </div>
                <div className="h-2 w-full bg-white/[0.06] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-emerald-400 rounded-full transition-all duration-500"
                    style={{ width: `${(easySolved / easyTotal) * 100}%` }}
                  />
                </div>
              </div>

              {/* Medium Bar */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-amber-400 font-bold">Medium</span>
                  <span className="text-zinc-300">
                    <strong>{medSolved}</strong> / {medTotal} <span className="text-zinc-500 text-[11px]">({Math.round((medSolved/medTotal)*100)}%)</span>
                  </span>
                </div>
                <div className="h-2 w-full bg-white/[0.06] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-amber-400 rounded-full transition-all duration-500"
                    style={{ width: `${(medSolved / medTotal) * 100}%` }}
                  />
                </div>
              </div>

              {/* Hard Bar */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-rose-400 font-bold">Hard</span>
                  <span className="text-zinc-300">
                    <strong>{hardSolved}</strong> / {hardTotal} <span className="text-zinc-500 text-[11px]">({Math.round((hardSolved/hardTotal)*100)}%)</span>
                  </span>
                </div>
                <div className="h-2 w-full bg-white/[0.06] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-rose-400 rounded-full transition-all duration-500"
                    style={{ width: `${(hardSolved / hardTotal) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Right 3 cols: Platform Runtime & Contest Ratings */}
            <div className="lg:col-span-3 space-y-3 font-mono text-xs">
              <div className="text-[11px] uppercase tracking-wider text-zinc-400 font-medium">
                Contest & Performance
              </div>

              <div className="rounded-xl border border-white/[0.08] bg-black/30 p-3 space-y-1">
                <div className="text-[10px] text-zinc-500 uppercase">Contest Rating</div>
                <div className="text-lg font-black text-white flex items-center justify-between">
                  <span>1,840 Elo</span>
                  <span className="text-[10px] font-sans font-bold text-amber-400 bg-amber-500/10 px-1.5 py-0.2 rounded border border-amber-500/20">
                    Division 1
                  </span>
                </div>
                <div className="text-[10px] text-emerald-400 font-sans">Global Percentile: Top 4.2%</div>
              </div>

              <div className="rounded-xl border border-white/[0.08] bg-black/30 p-3 space-y-1">
                <div className="text-[10px] text-zinc-500 uppercase">Compiler Evaluation</div>
                <div className="text-lg font-black text-emerald-400 flex items-center justify-between">
                  <span>&lt; 38 ms</span>
                  <span className="text-[10px] text-zinc-400 font-sans">Clang / Node</span>
                </div>
                <div className="text-[10px] text-zinc-400 font-sans">Zero sandbox cold-starts</div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
