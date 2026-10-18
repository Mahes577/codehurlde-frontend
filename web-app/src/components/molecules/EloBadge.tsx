import React from 'react';
import { Trophy } from 'lucide-react';

export interface EloBadgeProps {
  elo: number | string;
  division?: string;
  className?: string;
}

export const EloBadge: React.FC<EloBadgeProps> = ({
  elo,
  division = 'Div 1',
  className = ''
}) => {
  return (
    <div className={`inline-flex items-center gap-1.5 rounded-xl border border-blue-500/25 bg-blue-950/20 px-2.5 py-1 text-xs font-mono text-blue-300 shadow-sm select-none ${className}`}>
      <Trophy className="w-3.5 h-3.5 text-blue-400" />
      <span className="font-bold">{typeof elo === 'number' ? elo.toLocaleString() : elo}</span>
      <span className="text-[10px] text-blue-300/80 uppercase font-sans tracking-wider">· {division}</span>
    </div>
  );
};
