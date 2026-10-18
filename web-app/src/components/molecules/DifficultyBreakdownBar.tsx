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
        <span className="font-mono text-lime-300 font-bold">{overallPercentage}% ({totalSolved}/{totalProblems})</span>
      </div>

      {/* Segmented multi-color progress track */}
      <div className="w-full h-2.5 rounded-full bg-zinc-900 border border-white/[0.06] flex overflow-hidden p-0.5 gap-0.5">
        <div 
          style={{ width: `${easyPct}%` }} 
          className="bg-green-500 h-full rounded-sm transition-all duration-500 shadow-sm shadow-green-500/20" 
          title={`Easy: ${easy.solved}/${easy.total}`}
        />
        <div 
          style={{ width: `${medPct}%` }} 
          className="bg-lime-400 h-full rounded-sm transition-all duration-500 shadow-sm shadow-lime-500/20" 
          title={`Medium: ${medium.solved}/${medium.total}`}
        />
        <div 
          style={{ width: `${hardPct}%` }} 
          className="bg-red-500 h-full rounded-sm transition-all duration-500 shadow-sm shadow-red-500/20" 
          title={`Hard: ${hard.solved}/${hard.total}`}
        />
      </div>

      {/* Difficulty stats chips */}
      <div className="grid grid-cols-3 gap-2 pt-1 font-mono text-xs">
        <div className="p-2 rounded-lg bg-green-500/[0.06] border border-green-500/20 text-center">
          <div className="text-[10px] text-green-400 uppercase font-semibold">Easy</div>
          <div className="text-white font-bold mt-0.5">{easy.solved}/{easy.total}</div>
        </div>
        <div className="p-2 rounded-lg bg-lime-500/[0.06] border border-lime-500/20 text-center">
          <div className="text-[10px] text-lime-300 uppercase font-semibold">Medium</div>
          <div className="text-white font-bold mt-0.5">{medium.solved}/{medium.total}</div>
        </div>
        <div className="p-2 rounded-lg bg-red-500/[0.06] border border-red-500/20 text-center">
          <div className="text-[10px] text-red-400 uppercase font-semibold">Hard</div>
          <div className="text-white font-bold mt-0.5">{hard.solved}/{hard.total}</div>
        </div>
      </div>
    </div>
  );
};
