import React from 'react';

export interface ProgressBarProps {
  value: number; // 0 to 100
  color?: 'emerald' | 'amber' | 'rose' | 'cyan' | 'purple';
  size?: 'xs' | 'sm' | 'md';
  showLabel?: boolean;
  label?: string;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  color = 'emerald',
  size = 'sm',
  showLabel = false,
  label,
  className = ''
}) => {
  const clampedValue = Math.min(Math.max(value, 0), 100);

  const colorStyles = {
    emerald: 'bg-emerald-400',
    amber: 'bg-amber-400',
    rose: 'bg-rose-400',
    cyan: 'bg-cyan-400',
    purple: 'bg-purple-400'
  };

  const heightStyles = {
    xs: 'h-1',
    sm: 'h-1.5',
    md: 'h-2.5'
  };

  return (
    <div className={`w-full space-y-1 ${className}`}>
      {showLabel && (
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-zinc-400">{label}</span>
          <span className="text-zinc-200 font-semibold">{Math.round(clampedValue)}%</span>
        </div>
      )}
      <div className={`w-full bg-zinc-800/80 rounded-full overflow-hidden ${heightStyles[size]}`}>
        <div
          className={`${colorStyles[color]} h-full rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${clampedValue}%` }}
        />
      </div>
    </div>
  );
};
