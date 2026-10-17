import React from 'react';

export interface SectionHeaderProps {
  eyebrow?: string;
  eyebrowIcon?: React.ReactNode;
  eyebrowColor?: 'emerald' | 'amber' | 'purple' | 'cyan' | 'rose' | 'blue';
  title: string;
  highlightText?: string;
  subtitle?: string;
  centered?: boolean;
  action?: React.ReactNode;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  eyebrow,
  eyebrowIcon,
  eyebrowColor = 'emerald',
  title,
  highlightText,
  subtitle,
  centered = false,
  action,
  className = ''
}) => {
  const eyebrowColors = {
    emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    amber: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    purple: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    cyan: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    rose: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    blue: 'bg-blue-500/10 text-blue-400 border-blue-500/20'
  };

  return (
    <div className={`flex flex-col ${centered ? 'items-center text-center' : 'items-start text-left'} ${className}`}>
      {eyebrow && (
        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium border mb-3 select-none ${eyebrowColors[eyebrowColor]}`}>
          {eyebrowIcon && <span className="shrink-0">{eyebrowIcon}</span>}
          <span>{eyebrow}</span>
        </div>
      )}

      <div className={`flex flex-col sm:flex-row ${centered ? 'justify-center' : 'justify-between'} items-baseline w-full gap-4`}>
        <div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white font-sans">
            {title}{' '}
            {highlightText && (
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
                {highlightText}
              </span>
            )}
          </h2>
          {subtitle && (
            <p className="mt-2 text-xs sm:text-sm text-zinc-400 max-w-2xl leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>

        {action && (
          <div className="shrink-0 mt-2 sm:mt-0">
            {action}
          </div>
        )}
      </div>
    </div>
  );
};
