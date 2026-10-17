import React, { useState } from 'react';
import { Flame, Calendar, Award, CheckCircle2, TrendingUp, Sparkles } from 'lucide-react';

export const ActivityHeatmap: React.FC = () => {
  const [hoveredDay, setHoveredDay] = useState<{ date: string; count: number } | null>(null);

  // Generate 52 weeks x 7 days pseudo activity data
  const weeks = 52;
  const daysPerWeek = 7;
  
  const generateGrid = () => {
    const grid: number[][] = [];
    for (let w = 0; w < weeks; w++) {
      const week: number[] = [];
      for (let d = 0; d < daysPerWeek; d++) {
        // Patterned random intensity: higher recent streak in late weeks
        const rand = Math.random();
        if (w > 45) {
          week.push(rand > 0.2 ? Math.floor(rand * 4) + 1 : 0);
        } else if (w % 4 === 0) {
          week.push(rand > 0.4 ? Math.floor(rand * 3) + 1 : 0);
        } else {
          week.push(rand > 0.5 ? Math.floor(rand * 4) : 0);
        }
      }
      grid.push(week);
    }
    return grid;
  };

  const gridData = React.useMemo(() => generateGrid(), []);

  const getColorClass = (val: number) => {
    switch (val) {
      case 0:
        return 'bg-white/[0.04] border-white/[0.02]';
      case 1:
        return 'bg-emerald-950/80 border-emerald-900/60 text-emerald-300';
      case 2:
        return 'bg-emerald-800/80 border-emerald-700/60 text-white';
      case 3:
        return 'bg-emerald-600 border-emerald-500 text-white shadow-sm shadow-emerald-500/20';
      case 4:
      default:
        return 'bg-emerald-400 border-emerald-300 text-zinc-950 shadow-md shadow-emerald-400/40';
    }
  };

  return (
    <section className="py-12 bg-[#080c16] border-y border-white/[0.08]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Heatmap Card Container */}
        <div className="rounded-2xl border border-white/[0.1] bg-[#0c1220]/80 p-6 backdrop-blur-xl shadow-xl">
          
          {/* Header & Stats bar */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-white/[0.08]">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  Continuous Consistency Matrix
                </span>
                <span className="rounded-full bg-emerald-500/10 px-2 py-0.2 text-[10px] font-mono text-emerald-400 border border-emerald-500/20">
                  Live Sync
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Track Daily Problem Solving & Build Muscle Memory
              </h3>
            </div>

            {/* Streak Metrics Highlights */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 font-mono text-xs">
              <div className="flex items-center gap-2 rounded-xl bg-amber-500/10 border border-amber-500/25 px-3 py-2 text-amber-300">
                <Flame className="h-5 w-5 fill-amber-400 text-amber-500 animate-pulse" />
                <div>
                  <div className="text-base font-black text-white">14 Days</div>
                  <div className="text-[10px] uppercase text-amber-400 font-sans">Current Streak</div>
                </div>
              </div>

              <div className="rounded-xl bg-white/[0.03] border border-white/[0.08] px-3 py-2 text-zinc-300">
                <div className="text-base font-black text-white">684</div>
                <div className="text-[10px] uppercase text-zinc-400 font-sans">Total Solved (2026)</div>
              </div>

              <div className="rounded-xl bg-white/[0.03] border border-white/[0.08] px-3 py-2 text-zinc-300">
                <div className="text-base font-black text-emerald-400">89.4%</div>
                <div className="text-[10px] uppercase text-zinc-400 font-sans">Acceptance Rate</div>
              </div>
            </div>
          </div>

          {/* 52-Week Matrix Grid */}
          <div className="mt-6 overflow-x-auto pb-2">
            
            {/* Months row */}
            <div className="flex text-[10px] font-mono text-zinc-500 mb-2 gap-7 pl-4 select-none">
              <span>Nov</span>
              <span>Dec</span>
              <span>Jan</span>
              <span>Feb</span>
              <span>Mar</span>
              <span>Apr</span>
              <span>May</span>
              <span>Jun</span>
              <span>Jul</span>
              <span>Aug</span>
              <span>Sep</span>
              <span>Oct</span>
            </div>

            {/* Matrix squares */}
            <div className="flex gap-1 min-w-[760px]">
              {gridData.map((week, wIdx) => (
                <div key={wIdx} className="flex flex-col gap-1">
                  {week.map((level, dIdx) => (
                    <div
                      key={dIdx}
                      onMouseEnter={() => setHoveredDay({ date: `Week ${wIdx + 1}, Day ${dIdx + 1}`, count: level })}
                      onMouseLeave={() => setHoveredDay(null)}
                      className={`h-3 w-3 rounded-sm border transition-all duration-150 cursor-pointer hover:scale-125 ${getColorClass(level)}`}
                    />
                  ))}
                </div>
              ))}
            </div>

            {/* Tooltip & Legend Bar */}
            <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-zinc-400">
              <div className="h-5">
                {hoveredDay ? (
                  <span className="text-white font-medium">
                    {hoveredDay.count === 0 ? 'No problems solved' : `${hoveredDay.count * 2} problems solved`} on {hoveredDay.date}
                  </span>
                ) : (
                  <span className="text-zinc-500">Hover over any day square to inspect solved counts</span>
                )}
              </div>

              {/* Intensity Legend */}
              <div className="flex items-center gap-1.5 text-[11px] text-zinc-500">
                <span>Less</span>
                <div className="h-2.5 w-2.5 rounded-sm bg-white/[0.04]" />
                <div className="h-2.5 w-2.5 rounded-sm bg-emerald-950" />
                <div className="h-2.5 w-2.5 rounded-sm bg-emerald-800" />
                <div className="h-2.5 w-2.5 rounded-sm bg-emerald-600" />
                <div className="h-2.5 w-2.5 rounded-sm bg-emerald-400" />
                <span>More</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
