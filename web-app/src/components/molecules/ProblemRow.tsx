import React from 'react';
import { Star, CheckCircle2, Circle, ChevronRight, Play } from 'lucide-react';
import { DifficultyBadge, DifficultyLevel } from '../atoms/Badge';
import { Badge } from '../atoms/Badge';

export interface ProblemRowData {
  id: number | string;
  title: string;
  difficulty: DifficultyLevel;
  acceptance: string;
  category: string;
  companies: string[];
  solved?: boolean;
  starred?: boolean;
  frequency?: number;
}

export interface ProblemRowProps {
  problem: ProblemRowData;
  isSelected?: boolean;
  onSelect?: () => void;
  onSolve?: () => void;
  onToggleSolved?: (e: React.MouseEvent) => void;
  onToggleStarred?: (e: React.MouseEvent) => void;
}

export const ProblemRow: React.FC<ProblemRowProps> = ({
  problem,
  isSelected = false,
  onSelect,
  onSolve,
  onToggleSolved,
  onToggleStarred
}) => {
  return (
    <tr
      onClick={onSelect}
      className={`group transition-colors cursor-pointer border-b border-white/[0.04] ${
        isSelected ? 'bg-zinc-500/[0.08]' : 'hover:bg-white/[0.02]'
      }`}
    >
      {/* Solved Status Checkbox */}
      <td 
        className="py-3 px-3 w-10 text-center cursor-pointer" 
        onClick={(e) => {
          e.stopPropagation();
          onToggleSolved?.(e);
        }}
      >
        {problem.solved ? (
          <CheckCircle2 className="w-4 h-4 text-zinc-400 fill-zinc-500/20 inline" />
        ) : (
          <Circle className="w-4 h-4 text-zinc-600 hover:text-zinc-400 inline" />
        )}
      </td>

      {/* Star Bookmark */}
      <td 
        className="py-3 px-2 w-8 text-center cursor-pointer" 
        onClick={(e) => {
          e.stopPropagation();
          onToggleStarred?.(e);
        }}
      >
        <Star className={`w-3.5 h-3.5 inline ${problem.starred ? 'fill-zinc-400 text-zinc-400' : 'text-zinc-600 hover:text-zinc-400/80'}`} />
      </td>

      {/* ID & Title */}
      <td className="py-3 px-3">
        <div className="flex items-center gap-2">
          <span className="font-mono text-zinc-500 text-xs font-semibold w-8">
            #{problem.id}
          </span>
          <span className={`text-xs font-semibold font-sans tracking-tight ${
            isSelected ? 'text-zinc-400' : 'text-zinc-200 group-hover:text-white'
          }`}>
            {problem.title}
          </span>
        </div>
        <div className="text-[10px] font-mono text-zinc-500 pl-10">
          {problem.category}
        </div>
      </td>

      {/* Difficulty */}
      <td className="py-3 px-3">
        <DifficultyBadge difficulty={problem.difficulty} size="sm" />
      </td>

      {/* Acceptance */}
      <td className="py-3 px-3 font-mono text-xs text-zinc-300">
        {problem.acceptance}
      </td>

      {/* Frequency bar */}
      {problem.frequency !== undefined && (
        <td className="py-3 px-3">
          <div className="w-16 bg-white/[0.06] rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-zinc-400 h-full rounded-full"
              style={{ width: `${problem.frequency}%` }}
              title={`${problem.frequency}% Frequency`}
            />
          </div>
        </td>
      )}

      {/* Company Badges */}
      <td className="py-3 px-3">
        <div className="flex flex-wrap gap-1">
          {problem.companies.slice(0, 2).map((comp, idx) => (
            <Badge key={idx} variant="neutral" size="xs">
              {comp}
            </Badge>
          ))}
          {problem.companies.length > 2 && (
            <span className="text-[10px] font-mono text-zinc-500 self-center">
              +{problem.companies.length - 2}
            </span>
          )}
        </div>
      </td>

      {/* Solve Action */}
      <td className="py-3 px-3 text-right">
        {onSolve ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSolve();
            }}
            className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-500 hover:text-black text-zinc-300 transition-colors"
            title="Solve in IDE"
          >
            <Play className="w-3 h-3 fill-current" />
          </button>
        ) : (
          <ChevronRight className="w-4 h-4 text-zinc-600 group-hover:text-zinc-300 transition-colors inline" />
        )}
      </td>
    </tr>
  );
};
