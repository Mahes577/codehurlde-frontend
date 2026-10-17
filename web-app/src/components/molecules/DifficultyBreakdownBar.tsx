import React from 'react';
import { DifficultyBadge } from '../atoms/Badge';

export interface DifficultyBreakdownProps {
  easy: { solved: number; total: number };
  medium: { solved: number; total: number };
  hard: { solved: number; total: number };
  className?: string;
}

export const DifficultyBreakdownBar: React.FC<DifficultyBreakdownProps> = ({
  easy,
  medium,
  hard,
  className = ''
}) => {
  const totalSolved = easy.solved + medium.solved + hard.solved;
  const totalProblems = easy.total + medium.total + hard.total;
  const overallPercentage = Math.round((totalSolved / totalProblems) * 100);

  const easyPct = (easy.solved / totalProblems) * 100;
  const medPct = (medium.solved / totalProblems) * 100;
  const hardPct = (hard.solved / totalProblems) * 100;

  return (
    <div className={`space-y-3 font-sans ${className}`}>
      {/* Top summary row */}
      <div className="flex items-center justify-between text-xs">
        <span className="text-zinc-400 font-medium">Curated Problem Mastery</span>
        <span className="font-mono text-emerald-400 font-bold">{overallPercentage}% ({totalSolved}/{totalProblems})</span>
      </div>

      {/* Segmented multi-color progress track */}
      <div className="w-full h-2.5 rounded-full bg-zinc-900 border border-white/[0.06] flex overflow-hidden p-0.5 gap-0.5">
        <div 
          style={{ width: `${easyPct}%` }} 
          className="bg-emerald-400 h-full rounded-sm transition-all duration-500 shadow-sm shadow-emerald-500/20" 
          title={`Easy: ${easy.solved}/${easy.total}`}
        />
        <div 
          style={{ width: `${medPct}%` }} 
          className="bg-amber-400 h-full rounded-sm transition-all duration-500 shadow-sm shadow-amber-500/20" 
          title={`Medium: ${medium.solved}/${medium.total}`}
        />
        <div 
          style={{ width: `${hardPct}%` }} 
          className="bg-rose-400 h-full rounded-sm transition-all duration-500 shadow-sm shadow-rose-500/20" 
          title={`Hard: ${hard.solved}/${hard.total}`}
        />
      </div>

      {/* Difficulty stats chips */}
      <div className="grid grid-cols-3 gap-2 pt-1 font-mono text-xs">
        <div className="p-2 rounded-lg bg-emerald-500/[0.06] border border-emerald-500/20 text-center">
          <div className="text-[10px] text-emerald-400 uppercase font-semibold">Easy</div>
          <div className="text-white font-bold mt-0.5">{easy.solved}/{easy.total}</div>
        </div>
        <div className="p-2 rounded-lg bg-amber-500/[0.06] border border-amber-500/20 text-center">
          <div className="text-[10px] text-amber-400 uppercase font-semibold">Medium</div>
          <div className="text-white font-bold mt-0.5">{medium.solved}/{medium.total}</div>
        </div>
        <div className="p-2 rounded-lg bg-rose-500/[0.06] border border-rose-500/20 text-center">
          <div className="text-[10px] text-rose-400 uppercase font-semibold">Hard</div>
          <div className="text-white font-bold mt-0.5">{hard.solved}/{hard.total}</div>
        </div>
      </div>
    </div>
  );
};
