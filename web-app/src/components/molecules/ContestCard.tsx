import React from 'react';
import { Swords, Clock, Award, Users, CheckCircle2 } from 'lucide-react';
import { Card } from '../atoms/Card';
import { Badge } from '../atoms/Badge';
import { Button } from '../atoms/Button';

export interface ContestCardProps {
  id: string | number;
  title: string;
  division: string;
  startTime: string;
  duration: string;
  participants: number;
  isRegistered?: boolean;
  onRegisterToggle?: () => void;
  onOpenDetails?: () => void;
}

export const ContestCard: React.FC<ContestCardProps> = ({
  title,
  division,
  startTime,
  duration,
  participants,
  isRegistered = false,
  onRegisterToggle,
  onOpenDetails
}) => {
  return (
    <Card variant="surface" className="p-5 space-y-4 hover:border-zinc-500/40 transition-all">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <Badge variant={division.includes('1') ? 'blue' : 'blue'} size="xs">
              {division}
            </Badge>
            <span className="text-[11px] font-mono text-zinc-500">Rated Round</span>
          </div>
          <h3 className="text-base font-bold text-white tracking-tight">{title}</h3>
        </div>

        <div className="p-2 rounded-xl bg-white/[0.04] text-zinc-400">
          <Swords className="w-5 h-5" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs font-mono text-zinc-400 pt-1 border-t border-white/[0.04]">
        <div className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-zinc-500" />
          <span>{startTime}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Award className="w-3.5 h-3.5 text-zinc-400" />
          <span>{duration}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Users className="w-3.5 h-3.5 text-zinc-500" />
          <span>{participants.toLocaleString()} joined</span>
        </div>
        <div className="flex items-center gap-1.5 text-zinc-400">
          <span>Elo Rated ✓</span>
        </div>
      </div>

      <div className="flex items-center gap-2 pt-2">
        <Button
          variant={isRegistered ? 'outline' : 'primary'}
          size="sm"
          className="flex-1"
          onClick={onRegisterToggle}
          icon={isRegistered ? <CheckCircle2 className="w-3.5 h-3.5 text-zinc-400" /> : undefined}
        >
          {isRegistered ? 'Registered ✓' : 'Register Now'}
        </Button>
        {onOpenDetails && (
          <Button variant="ghost" size="sm" onClick={onOpenDetails}>
            Rules
          </Button>
        )}
      </div>
    </Card>
  );
};
