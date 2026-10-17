import React from 'react';
import { Flame } from 'lucide-react';

export interface StreakBadgeProps {
  days: number;
  label?: string;
  className?: string;
}

export const StreakBadge: React.FC<StreakBadgeProps> = ({
  days,
  label = 'Days',
  className = ''
}) => {
  return (
    <div className={`inline-flex items-center gap-1.5 rounded-xl border border-amber-500/25 bg-amber-950/20 px-2.5 py-1 text-xs font-mono text-amber-300 shadow-sm select-none ${className}`}>
      <Flame className="w-3.5 h-3.5 fill-amber-400 text-amber-500 animate-pulse" />
      <span className="font-bold">{days}</span>
      <span className="text-[10px] text-amber-400/80 uppercase font-sans tracking-wider">{label}</span>
    </div>
  );
};
