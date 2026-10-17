import React from 'react';
import { Play, RotateCcw, ChevronRight, CheckCircle2 } from 'lucide-react';
import { Button } from '../atoms/Button';
import { Badge } from '../atoms/Badge';

export interface AlgorithmStepControllerProps {
  currentStep: number;
  totalSteps: number;
  stepTitle: string;
  isComplete: boolean;
  onNextStep: () => void;
  onReset: () => void;
  className?: string;
}

export const AlgorithmStepController: React.FC<AlgorithmStepControllerProps> = ({
  currentStep,
  totalSteps,
  stepTitle,
  isComplete,
  onNextStep,
  onReset,
  className = ''
}) => {
  return (
    <div className={`p-4 rounded-xl bg-zinc-950/80 border border-white/[0.08] space-y-3 font-mono text-xs ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Badge variant={isComplete ? 'emerald' : 'amber'} size="xs">
            Step {currentStep} of {totalSteps}
          </Badge>
          <span className="text-zinc-400 font-sans font-semibold text-xs truncate">{stepTitle}</span>
        </div>
        {isComplete && (
          <span className="flex items-center gap-1 text-emerald-400 font-bold text-[11px]">
            <CheckCircle2 className="w-3.5 h-3.5" /> Solved
          </span>
        )}
      </div>

      {/* Visual step pills */}
      <div className="grid grid-cols-4 gap-1.5">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div
            key={i}
            className={`h-1.5 rounded-full transition-all ${
              i + 1 < currentStep || (i + 1 === currentStep && isComplete)
                ? 'bg-emerald-400'
                : i + 1 === currentStep
                ? 'bg-amber-400 animate-pulse'
                : 'bg-zinc-800'
            }`}
          />
        ))}
      </div>

      {/* Action buttons */}
      <div className="flex items-center justify-between pt-1">
        <Button
          variant="ghost"
          size="xs"
          onClick={onReset}
          icon={<RotateCcw className="w-3 h-3" />}
        >
          Reset Invariant
        </Button>

        <Button
          variant="primary"
          size="xs"
          onClick={onNextStep}
          icon={isComplete ? <RotateCcw className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
        >
          {isComplete ? 'Replay Run' : 'Next Step →'}
        </Button>
      </div>
    </div>
  );
};
