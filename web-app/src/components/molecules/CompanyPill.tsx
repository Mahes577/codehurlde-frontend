import React from 'react';
import { Building2 } from 'lucide-react';
import { Badge } from '../atoms/Badge';

export interface CompanyPillProps {
  name: string;
  count: number;
  icon?: React.ReactNode;
  isSelected?: boolean;
  onClick?: () => void;
}

export const CompanyPill: React.FC<CompanyPillProps> = ({
  name,
  count,
  icon,
  isSelected = false,
  onClick
}) => {
  return (
    <button
      onClick={onClick}
      className={`group flex items-center justify-between gap-3 px-4 py-2.5 rounded-xl border text-xs font-mono transition-all duration-200 cursor-pointer ${
        isSelected
          ? 'bg-emerald-500/15 border-emerald-500/50 text-emerald-300 shadow-md shadow-emerald-950/20'
          : 'bg-[#0c101c]/80 border-white/[0.08] text-zinc-300 hover:border-white/[0.2] hover:bg-zinc-900/90 hover:text-white'
      }`}
    >
      <div className="flex items-center gap-2">
        <span className="text-zinc-500 group-hover:text-emerald-400 transition-colors">
          {icon || <Building2 className="w-3.5 h-3.5" />}
        </span>
        <span className="font-semibold font-sans">{name}</span>
      </div>
      <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-white/[0.05] text-zinc-400 group-hover:text-zinc-200 border border-white/[0.06]">
        {count} Qs
      </span>
    </button>
  );
};
