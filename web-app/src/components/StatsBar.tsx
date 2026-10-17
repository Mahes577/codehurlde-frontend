import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Flame, 
  Award, 
  TrendingUp, 
  ChevronRight, 
  Code2, 
  Target, 
  ArrowUpRight,
  Zap,
  Activity,
  Cpu
} from 'lucide-react';
import { Card } from './atoms/Card';
import { ProgressBar } from './atoms/ProgressBar';
import { StatMetricCard } from './molecules/StatMetricCard';

export const StatsBar: React.FC = () => {
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
  const circumference = 2 * Math.PI * radius;
  const solvedRatio = totalSolved / totalProblems;
  const strokeDashoffset = circumference - (solvedRatio * circumference);

  return (
    <section id="stats" className="py-8 bg-[#07090e]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Main Scorecard Card */}
        <Card variant="default" padding="lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left 4 cols: Circular Progress Ring & Total Solved */}
            <div className="lg:col-span-4 flex items-center gap-6 border-b lg:border-b-0 lg:border-r border-white/[0.08] pb-6 lg:pb-0 lg:pr-6">
              
              {/* Circular SVG Ring */}
              <div className="relative shrink-0">
                <svg width="136" height="136" className="transform -rotate-90">
                  <circle
                    cx="68"
                    cy="68"
                    r={radius}
                    stroke="rgba(255, 255, 255, 0.06)"
                    strokeWidth="10"
                    fill="transparent"
                  />
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

            {/* Right 8 cols: Difficulty breakdown progress bars */}
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                <span className="uppercase tracking-wider font-bold text-zinc-300">Curated Difficulty Breakdown</span>
                <span className="text-emerald-400 font-bold">69.2% Completed</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Easy Card */}
                <div className="rounded-xl border border-white/[0.08] bg-zinc-950/60 p-3.5 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-emerald-400 font-bold font-mono">Easy</span>
                    <span className="font-mono text-zinc-300 font-bold">
                      {easySolved} <span className="text-zinc-600">/ {easyTotal}</span>
                    </span>
                  </div>
                  <ProgressBar value={(easySolved / easyTotal) * 100} color="emerald" size="sm" />
                </div>

                {/* Medium Card */}
                <div className="rounded-xl border border-white/[0.08] bg-zinc-950/60 p-3.5 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-amber-400 font-bold font-mono">Medium</span>
                    <span className="font-mono text-zinc-300 font-bold">
                      {medSolved} <span className="text-zinc-600">/ {medTotal}</span>
                    </span>
                  </div>
                  <ProgressBar value={(medSolved / medTotal) * 100} color="amber" size="sm" />
                </div>

                {/* Hard Card */}
                <div className="rounded-xl border border-white/[0.08] bg-zinc-950/60 p-3.5 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-rose-400 font-bold font-mono">Hard</span>
                    <span className="font-mono text-zinc-300 font-bold">
                      {hardSolved} <span className="text-zinc-600">/ {hardTotal}</span>
                    </span>
                  </div>
                  <ProgressBar value={(hardSolved / hardTotal) * 100} color="rose" size="sm" />
                </div>
              </div>
            </div>

          </div>
        </Card>

        {/* 4 Telemetry Metrics Grid using StatMetricCard Molecule */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatMetricCard
            label="Median Runtime"
            value="38ms"
            subtext="GCC 11 & Python 3.11"
            icon={<Cpu className="w-4 h-4" />}
            accentColor="text-emerald-400"
          />
          <StatMetricCard
            label="Active Solvers Today"
            value="1,420"
            subtext="+18% vs last week"
            icon={<Activity className="w-4 h-4" />}
            iconBgColor="bg-cyan-500/10 text-cyan-400 border-cyan-500/20"
            accentColor="text-cyan-400"
          />
          <StatMetricCard
            label="Current Habit Streak"
            value="14 Days"
            subtext="Personal record: 21 days"
            icon={<Flame className="w-4 h-4" />}
            iconBgColor="bg-amber-500/10 text-amber-400 border-amber-500/20"
            accentColor="text-amber-400"
          />
          <StatMetricCard
            label="Weekly Contest Rating"
            value="1,840 Elo"
            subtext="Division 1 Global #242"
            icon={<Award className="w-4 h-4" />}
            iconBgColor="bg-purple-500/10 text-purple-400 border-purple-500/20"
            accentColor="text-purple-400"
          />
        </div>

      </div>
    </section>
  );
};
