import React from 'react';
import { Card } from '../atoms/Card';

export interface StatMetricCardProps {
  icon?: React.ReactNode;
  iconBgColor?: string;
  label: string;
  value: string | number;
  subtext?: string;
  accentColor?: string;
  className?: string;
}

export const StatMetricCard: React.FC<StatMetricCardProps> = ({
  icon,
  iconBgColor = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  label,
  value,
  subtext,
  accentColor = 'text-white',
  className = ''
}) => {
  return (
    <Card variant="surface" padding="sm" className={`flex flex-col justify-between ${className}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 font-medium">
          {label}
        </span>
        {icon && (
          <div className={`p-1.5 rounded-lg border text-xs shrink-0 ${iconBgColor}`}>
            {icon}
          </div>
        )}
      </div>

      <div>
        <div className={`text-xl sm:text-2xl font-bold font-mono tracking-tight ${accentColor}`}>
          {value}
        </div>
        {subtext && (
          <div className="text-[11px] text-zinc-500 font-mono mt-0.5">
            {subtext}
          </div>
        )}
      </div>
    </Card>
  );
};
