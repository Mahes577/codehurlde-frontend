import React from 'react';

export type DifficultyLevel = 'Easy' | 'Medium' | 'Hard';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'easy' | 'medium' | 'hard' | 'neutral' | 'emerald' | 'cyan' | 'purple' | 'amber' | 'rose';
  size?: 'xs' | 'sm' | 'md';
  icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  size = 'sm',
  icon,
  className = '',
  ...props
}) => {
  const baseStyles = "inline-flex items-center font-mono font-medium rounded-md border select-none leading-none";

  const sizeStyles = {
    xs: "px-1.5 py-0.5 text-[10px] gap-1",
    sm: "px-2 py-0.5 text-[11px] gap-1.5",
    md: "px-2.5 py-1 text-xs gap-1.5"
  };

  const variantStyles = {
    easy: "text-emerald-400 bg-emerald-500/10 border-emerald-500/25",
    medium: "text-amber-400 bg-amber-500/10 border-amber-500/25",
    hard: "text-rose-400 bg-rose-500/10 border-rose-500/25",
    neutral: "text-zinc-400 bg-zinc-900 border-white/[0.08]",
    emerald: "text-emerald-300 bg-emerald-950/40 border-emerald-500/30",
    cyan: "text-cyan-300 bg-cyan-950/40 border-cyan-500/30",
    purple: "text-purple-300 bg-purple-950/40 border-purple-500/30",
    amber: "text-amber-300 bg-amber-950/40 border-amber-500/30",
    rose: "text-rose-300 bg-rose-950/40 border-rose-500/30"
  };

  return (
    <span className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`} {...props}>
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};

export const DifficultyBadge: React.FC<{ difficulty: DifficultyLevel; size?: 'xs' | 'sm' | 'md'; className?: string }> = ({
  difficulty,
  size = 'sm',
  className = ''
}) => {
  const variantMap = {
    Easy: 'easy' as const,
    Medium: 'medium' as const,
    Hard: 'hard' as const
  };

  return (
    <Badge variant={variantMap[difficulty]} size={size} className={`font-bold ${className}`}>
      {difficulty}
    </Badge>
  );
};
