import React, { useState } from 'react';
import { Flame, Calendar, Award, CheckCircle2, TrendingUp, Sparkles, ChevronLeft, ChevronRight, Check } from 'lucide-react';

interface DayActivity {
  date: string;
  dayName: string;
  count: number;
  problems?: { id: number; title: string; difficulty: 'Easy' | 'Medium' | 'Hard'; time: string }[];
}

export const ActivityHeatmap: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<number>(2026);
  
  // Real active day modal/drawer
  const [activeDay, setActiveDay] = useState<DayActivity>({
    date: 'Oct 17, 2026',
    dayName: 'Saturday',
    count: 3,
    problems: [
      { id: 1, title: 'Two Sum', difficulty: 'Easy', time: '10:14 AM' },
      { id: 200, title: 'Number of Islands', difficulty: 'Medium', time: '11:45 AM' },
      { id: 56, title: 'Merge Intervals', difficulty: 'Medium', time: '4:20 PM' }
    ]
  });

  const weeks = 52;
  const days = ['Mon', '', 'Wed', '', 'Fri', '', 'Sun'];

  // Generate deterministic realistic yearly calendar
  const gridData = React.useMemo(() => {
    const grid: DayActivity[][] = [];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    for (let w = 0; w < weeks; w++) {
      const week: DayActivity[] = [];
      for (let d = 0; d < 7; d++) {
        const dayIdx = w * 7 + d;
        // Natural human pattern: active on weekdays, heavy on weekends, occasional breaks
        let count = 0;
        if (w >= 40) {
          // Recent high consistency streak
          count = (w + d) % 5 === 0 ? 0 : ((w * 3 + d * 2) % 4) + 1;
        } else if (w % 7 === 0) {
          count = 0; // rest week
        } else {
          count = (dayIdx % 3 === 0 || dayIdx % 7 === 0) ? (dayIdx % 4) : 0;
        }

        const dateStr = `Week ${w + 1}, Day ${d + 1}`;
        week.push({
          date: dateStr,
          dayName: days[d] || 'Day',
          count: count,
          problems: count > 0 ? [
            { id: (dayIdx % 150) + 1, title: 'Algorithmic Problem', difficulty: count > 2 ? 'Medium' : 'Easy', time: '2:15 PM' }
          ] : undefined
        });
      }
      grid.push(week);
    }
    return grid;
  }, [selectedYear]);

  const getColorClass = (val: number) => {
    switch (val) {
      case 0:
        return 'bg-white/[0.04] border-white/[0.02] hover:border-zinc-500';
      case 1:
        return 'bg-emerald-950/80 border-emerald-900/60 hover:border-emerald-400';
      case 2:
        return 'bg-emerald-800/80 border-emerald-700/60 hover:border-emerald-300';
      case 3:
        return 'bg-emerald-600 border-emerald-500 hover:border-emerald-200 shadow-sm shadow-emerald-600/30';
      case 4:
      default:
        return 'bg-emerald-400 border-emerald-300 hover:border-white shadow-md shadow-emerald-400/40';
    }
  };

  return (
    <section className="py-12 bg-[#07090e] border-b border-white/[0.08]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Main Card Container */}
        <div className="rounded-2xl border border-white/[0.1] bg-[#0c1220]/90 p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
          
          {/* Top Section Header with Human Badges */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-white/[0.08]">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  Submission Activity Heatmap
                </span>
                <span className="rounded-full bg-white/[0.06] px-2 py-0.2 text-[10px] font-mono text-zinc-300 border border-white/[0.08]">
                  UTC Timezone
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                365-Day Problem Solving Consistency
              </h3>
            </div>

            {/* Year selector & Streak badges */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Year Buttons */}
              <div className="flex rounded-lg bg-black/40 p-1 border border-white/[0.08] text-xs font-mono">
                {[2026, 2025, 2024].map((yr) => (
                  <button
                    key={yr}
                    onClick={() => setSelectedYear(yr)}
                    className={`px-3 py-1 rounded transition-colors ${
                      selectedYear === yr
                        ? 'bg-emerald-500 text-zinc-950 font-bold'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    {yr}
                  </button>
                ))}
              </div>

              {/* Verified Streak Pill */}
              <div className="flex items-center gap-2 rounded-xl bg-amber-500/10 border border-amber-500/25 px-3 py-1.5 text-amber-300 font-mono text-xs">
                <Flame className="h-4 w-4 fill-amber-400 text-amber-500" />
                <span className="font-bold text-white">14 Days Active Streak</span>
              </div>
            </div>
          </div>

          {/* Heatmap Grid & Day-of-week labels */}
          <div className="mt-6 flex flex-col xl:flex-row items-start gap-6">
            
            {/* The 52-Week Matrix */}
            <div className="flex-1 overflow-x-auto pb-2 w-full">
              
              {/* Month Header row */}
              <div className="flex text-[10px] font-mono text-zinc-500 mb-2 gap-6 pl-9 select-none">
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

              {/* Days Column + Grid */}
              <div className="flex gap-2">
                {/* Mon / Wed / Fri labels */}
                <div className="flex flex-col justify-between text-[9px] font-mono text-zinc-500 pr-1 py-0.5 select-none h-[104px]">
                  <span>Mon</span>
                  <span>Wed</span>
                  <span>Fri</span>
                </div>

                {/* 52 Week columns */}
                <div className="flex gap-1 min-w-[740px]">
                  {gridData.map((week, wIdx) => (
                    <div key={wIdx} className="flex flex-col gap-1">
                      {week.map((dayItem, dIdx) => (
                        <button
                          key={dIdx}
                          onClick={() => setActiveDay(dayItem)}
                          className={`h-3 w-3 rounded-sm border transition-all duration-150 cursor-pointer ${getColorClass(dayItem.count)}`}
                          title={`${dayItem.count} submissions on ${dayItem.date}`}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              {/* Heatmap Summary Footer */}
              <div className="mt-4 pt-3 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-zinc-400">
                <div className="flex items-center gap-4">
                  <div>Total Submissions in {selectedYear}: <strong className="text-white">684</strong></div>
                  <span>•</span>
                  <div>Active Days: <strong className="text-emerald-400">224 / 365</strong></div>
                  <span>•</span>
                  <div>Max Daily Solved: <strong className="text-white">7 problems</strong></div>
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

            {/* Right Drawer: Selected Day Detailed Audit */}
            <div className="w-full xl:w-72 shrink-0 rounded-xl border border-white/[0.08] bg-black/40 p-4 font-mono text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-white/[0.08] mb-3">
                <span className="font-bold text-white text-[11px] uppercase tracking-wider">
                  Day Inspector
                </span>
                <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-500/10 px-1.5 py-0.2 rounded border border-emerald-500/20">
                  {activeDay.count} Submissions
                </span>
              </div>

              <div className="text-zinc-300 text-xs mb-3">
                <div className="font-bold text-white font-sans">{activeDay.date}</div>
                <div className="text-[11px] text-zinc-500">{activeDay.dayName}</div>
              </div>

              {/* Problems list solved that day */}
              {activeDay.problems && activeDay.problems.length > 0 ? (
                <div className="space-y-2">
                  <div className="text-[10px] text-zinc-500 uppercase tracking-wider">Solved Problems</div>
                  {activeDay.problems.map((prob, idx) => (
                    <div key={idx} className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-2 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white text-[11px]">#{prob.id} {prob.title}</span>
                        <span className={`text-[9px] px-1 rounded font-bold ${
                          prob.difficulty === 'Easy' ? 'text-emerald-400 bg-emerald-500/10' :
                          prob.difficulty === 'Medium' ? 'text-amber-400 bg-amber-500/10' : 'text-rose-400 bg-rose-500/10'
                        }`}>
                          {prob.difficulty}
                        </span>
                      </div>
                      <div className="text-[10px] text-zinc-500">{prob.time} · Accepted ✓</div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-4 text-center text-zinc-500 italic text-[11px]">
                  Rest day. No accepted submissions recorded on this date.
                </div>
              )}

              {/* Milestone Badge in this period */}
              <div className="mt-4 pt-3 border-t border-white/[0.06]">
                <div className="flex items-center gap-2 text-amber-300 text-[11px]">
                  <Award className="h-4 w-4 shrink-0 text-amber-400" />
                  <span>Earned: <strong>October 50 Days Badge</strong></span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
