import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  ChevronRight, 
  ChevronLeft, 
  Layers, 
  Sparkles, 
  CheckCircle2, 
  TrendingUp, 
  Code2, 
  ArrowRight,
  Calculator,
  CornerDownRight,
  Coins
} from 'lucide-react';
import { Button } from '../atoms/Button';
import { Badge } from '../atoms/Badge';

export interface DpStep {
  amount: number;
  evaluatingCoin: number | null;
  candidates: { coin: number; prevAmount: number; prevVal: number; total: number; isMin: boolean }[];
  currentMin: number;
  chosenCoin: number | null;
  description: string;
  codeLine: number;
}

export const DpAlgorithmVisualizer: React.FC<{
  onLaunchSolver?: () => void;
}> = ({ onLaunchSolver }) => {
  const [targetAmount, setTargetAmount] = useState(7);
  const [coins] = useState([1, 3, 4, 5]);
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Precomputed DP steps for amount = 7 with coins [1, 3, 4, 5]
  const STEPS: DpStep[] = [
    {
      amount: 0,
      evaluatingCoin: null,
      candidates: [],
      currentMin: 0,
      chosenCoin: null,
      description: 'Base Case Initialization: dp[0] = 0 (0 coins needed to make amount 0). All other dp values initialized to ∞.',
      codeLine: 1
    },
    {
      amount: 1,
      evaluatingCoin: 1,
      candidates: [
        { coin: 1, prevAmount: 0, prevVal: 0, total: 1, isMin: true }
      ],
      currentMin: 1,
      chosenCoin: 1,
      description: 'Computing dp[1]: Using coin 1 → dp[1 - 1] + 1 = dp[0] + 1 = 0 + 1 = 1 coin.',
      codeLine: 4
    },
    {
      amount: 2,
      evaluatingCoin: 1,
      candidates: [
        { coin: 1, prevAmount: 1, prevVal: 1, total: 2, isMin: true }
      ],
      currentMin: 2,
      chosenCoin: 1,
      description: 'Computing dp[2]: Only coin 1 ≤ 2. dp[2 - 1] + 1 = dp[1] + 1 = 1 + 1 = 2 coins (two 1s).',
      codeLine: 4
    },
    {
      amount: 3,
      evaluatingCoin: 3,
      candidates: [
        { coin: 1, prevAmount: 2, prevVal: 2, total: 3, isMin: false },
        { coin: 3, prevAmount: 0, prevVal: 0, total: 1, isMin: true }
      ],
      currentMin: 1,
      chosenCoin: 3,
      description: 'Computing dp[3]: Compare coin 1 (dp[2]+1=3) vs coin 3 (dp[0]+1=1). Winner: coin 3 → dp[3] = 1.',
      codeLine: 5
    },
    {
      amount: 4,
      evaluatingCoin: 4,
      candidates: [
        { coin: 1, prevAmount: 3, prevVal: 1, total: 2, isMin: false },
        { coin: 3, prevAmount: 1, prevVal: 1, total: 2, isMin: false },
        { coin: 4, prevAmount: 0, prevVal: 0, total: 1, isMin: true }
      ],
      currentMin: 1,
      chosenCoin: 4,
      description: 'Computing dp[4]: Compare coins 1, 3, 4. Using single coin 4 gives dp[0] + 1 = 1 coin. Winner: coin 4 → dp[4] = 1.',
      codeLine: 5
    },
    {
      amount: 5,
      evaluatingCoin: 5,
      candidates: [
        { coin: 1, prevAmount: 4, prevVal: 1, total: 2, isMin: false },
        { coin: 3, prevAmount: 2, prevVal: 2, total: 3, isMin: false },
        { coin: 4, prevAmount: 1, prevVal: 1, total: 2, isMin: false },
        { coin: 5, prevAmount: 0, prevVal: 0, total: 1, isMin: true }
      ],
      currentMin: 1,
      chosenCoin: 5,
      description: 'Computing dp[5]: Direct match with coin 5 gives dp[0] + 1 = 1 coin. Winner: coin 5 → dp[5] = 1.',
      codeLine: 5
    },
    {
      amount: 6,
      evaluatingCoin: 3,
      candidates: [
        { coin: 1, prevAmount: 5, prevVal: 1, total: 2, isMin: true },
        { coin: 3, prevAmount: 3, prevVal: 1, total: 2, isMin: true },
        { coin: 4, prevAmount: 2, prevVal: 2, total: 3, isMin: false },
        { coin: 5, prevAmount: 1, prevVal: 1, total: 2, isMin: true }
      ],
      currentMin: 2,
      chosenCoin: 3,
      description: 'Computing dp[6]: Coins 1, 3, 5 all yield 2 coins (e.g. 3 + 3 = 6 or 1 + 5 = 6). Winner: min = 2 coins.',
      codeLine: 4
    },
    {
      amount: 7,
      evaluatingCoin: 4,
      candidates: [
        { coin: 1, prevAmount: 6, prevVal: 2, total: 3, isMin: false },
        { coin: 3, prevAmount: 4, prevVal: 1, total: 2, isMin: true },
        { coin: 4, prevAmount: 3, prevVal: 1, total: 2, isMin: true },
        { coin: 5, prevAmount: 2, prevVal: 2, total: 3, isMin: false }
      ],
      currentMin: 2,
      chosenCoin: 4,
      description: 'Final Target dp[7]: Coin 3 (dp[4]+1=2) or Coin 4 (dp[3]+1=2). Global optimal is 2 coins (4 + 3 = 7)!',
      codeLine: 7
    }
  ];

  const currentStep = STEPS[currentStepIdx];
  const isFinal = currentStepIdx === STEPS.length - 1;

  // Build the current DP array up to currentStepIdx
  const dpTable: (number | string)[] = Array(8).fill('∞');
  dpTable[0] = 0;
  for (let i = 1; i <= currentStepIdx; i++) {
    dpTable[i] = STEPS[i].currentMin;
  }

  useEffect(() => {
    let timer: any;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentStepIdx(prev => {
          if (prev < STEPS.length - 1) {
            return prev + 1;
          } else {
            setIsPlaying(false);
            return prev;
          }
        });
      }, 1900);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  const handleNext = () => {
    if (currentStepIdx < STEPS.length - 1) {
      setCurrentStepIdx(currentStepIdx + 1);
    } else {
      setCurrentStepIdx(0);
    }
  };

  const handlePrev = () => {
    if (currentStepIdx > 0) {
      setCurrentStepIdx(currentStepIdx - 1);
    }
  };

  const handleReset = () => {
    setCurrentStepIdx(0);
    setIsPlaying(false);
  };

  return (
    <div className="rounded-2xl border border-white/[0.1] bg-[#090d18] text-zinc-100 p-5 sm:p-6 shadow-2xl space-y-6 font-sans">
      {/* Top Header & Telemetry Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="amber" size="xs">
              #322 Coin Change · Dynamic Programming
            </Badge>
            <span className="text-[11px] font-mono text-zinc-500">O(Amount × Coins)</span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-white mt-1 flex items-center gap-2">
            <Coins className="w-5 h-5 text-amber-400" />
            <span>Interactive DP Table & Subproblem Transition Visualizer</span>
          </h3>
          <p className="text-xs text-zinc-400 mt-0.5">
            Watch subproblem memoization, bottom-up table filling, and optimal coin backtracking path.
          </p>
        </div>

        {/* Stepper Buttons */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="xs"
            onClick={handleReset}
            icon={<RotateCcw className="w-3.5 h-3.5" />}
          >
            Reset
          </Button>

          <Button
            variant="outline"
            size="xs"
            disabled={currentStepIdx === 0}
            onClick={handlePrev}
            icon={<ChevronLeft className="w-3.5 h-3.5" />}
          >
            Prev
          </Button>

          <Button
            variant={isPlaying ? 'amber' : 'outline'}
            size="xs"
            onClick={() => setIsPlaying(!isPlaying)}
            icon={isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          >
            {isPlaying ? 'Pause' : 'Auto Play'}
          </Button>

          <Button
            variant="primary"
            size="xs"
            onClick={handleNext}
            icon={isFinal ? <RotateCcw className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
          >
            {isFinal ? 'Restart' : 'Next Step →'}
          </Button>
        </div>
      </div>

      {/* Target & Coin Pill Strip */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-3.5 rounded-xl bg-zinc-950/70 border border-white/[0.06] text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="text-zinc-500 uppercase">Available Coin Denominations:</span>
          <div className="flex items-center gap-1.5">
            {coins.map(c => (
              <span 
                key={c}
                className="px-2 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-300 font-bold"
              >
                ${c}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-zinc-500 uppercase">Target Amount:</span>
          <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 font-bold">
            Amount = 7
          </span>
        </div>
      </div>

      {/* Step Explanation Banner */}
      <div className="p-4 rounded-xl border border-amber-500/25 bg-gradient-to-r from-amber-950/30 via-zinc-950/60 to-black/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-xs font-mono font-bold text-amber-300">
              Subproblem {currentStep.amount} / 7: {currentStepIdx === 0 ? 'Base Case' : `Solving for Amount $${currentStep.amount}`}
            </span>
          </div>
          <p className="text-xs text-zinc-300 leading-relaxed max-w-2xl">
            {currentStep.description}
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0 font-mono text-xs">
          <span className="text-zinc-400">dp[{currentStep.amount}] =</span>
          <span className="px-3 py-1 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-bold text-sm">
            {currentStep.currentMin} {currentStep.currentMin === 1 ? 'coin' : 'coins'}
          </span>
        </div>
      </div>

      {/* DP Array 1D Visual Grid with Dynamic Subproblem Connection Curves */}
      <div className="relative rounded-2xl border border-white/[0.08] bg-[#060911] p-6 overflow-hidden">
        <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-4 flex items-center justify-between">
          <span>1D Memoization Table: <strong className="text-zinc-200">dp[0...7]</strong></span>
          <span className="text-zinc-500">Indexed by Subproblem Amount</span>
        </div>

        {/* The DP Cells */}
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-3 relative z-10">
          {dpTable.map((val, idx) => {
            const isCurrent = idx === currentStep.amount;
            const isSettled = idx <= currentStepIdx;
            const isOptimalBacktrack = isFinal && (idx === 7 || idx === 3 || idx === 0);

            // Check if this cell is one of the candidate dependencies (i - coin)
            const candidateSource = currentStep.candidates.find(c => c.prevAmount === idx);

            return (
              <div
                key={idx}
                className={`relative rounded-xl p-3 sm:p-4 text-center border transition-all duration-300 ${
                  isOptimalBacktrack
                    ? 'border-emerald-400 bg-emerald-500/25 shadow-xl shadow-emerald-500/20 ring-2 ring-emerald-400 scale-105'
                    : isCurrent
                    ? 'border-amber-400 bg-amber-500/20 shadow-lg shadow-amber-500/20 scale-105'
                    : candidateSource
                    ? 'border-cyan-400/80 bg-cyan-950/30'
                    : isSettled
                    ? 'border-white/[0.12] bg-[#0c101c] text-zinc-200'
                    : 'border-white/[0.05] bg-black/40 text-zinc-600'
                }`}
              >
                {/* Pointer Indicator */}
                {isCurrent && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-amber-400 px-2 py-0.2 text-[9px] font-mono font-bold text-zinc-950 animate-bounce">
                    i = {idx}
                  </div>
                )}

                {/* Candidate Link Badge */}
                {candidateSource && !isCurrent && (
                  <div className={`absolute -top-2.5 left-1/2 -translate-x-1/2 rounded-full px-1.5 py-0.2 text-[8px] font-mono font-bold border ${
                    candidateSource.isMin ? 'bg-emerald-500 text-zinc-950 border-emerald-400' : 'bg-zinc-800 text-zinc-300 border-zinc-700'
                  }`}>
                    -${candidateSource.coin}
                  </div>
                )}

                <div className="text-lg sm:text-2xl font-black font-mono text-white">
                  {val}
                </div>

                <div className="text-[10px] font-mono text-zinc-500 mt-1">
                  dp[{idx}]
                </div>
              </div>
            );
          })}
        </div>

        {/* Backtrack Optimal Solution Banner when Complete */}
        {isFinal && (
          <div className="mt-6 p-4 rounded-xl border border-emerald-500/30 bg-emerald-950/20 flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-xs animate-fade-in">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span className="font-bold text-emerald-300">Optimal Coin Backtracking Path:</span>
              <span className="text-zinc-300">Start at dp[7] → subtract coin $4 → reach dp[3] → subtract coin $3 → reach dp[0]</span>
            </div>
            <div className="px-3 py-1 rounded-lg bg-emerald-500 text-zinc-950 font-bold text-xs shrink-0">
              Optimal: $4 + $3 = $7 (2 Coins)
            </div>
          </div>
        )}
      </div>

      {/* Candidate Decision Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
        {/* Subproblem Choices Evaluation */}
        <div className="p-4 rounded-xl border border-white/[0.08] bg-[#0c101c] space-y-3">
          <div className="flex items-center justify-between text-zinc-400 pb-1 border-b border-white/[0.06]">
            <span className="uppercase font-bold text-amber-400 flex items-center gap-1.5">
              <Calculator className="w-3.5 h-3.5" />
              Recurrence Relation Evaluation:
            </span>
            <span>min&#123;dp[i - c] + 1&#125;</span>
          </div>

          <div className="space-y-2">
            {currentStep.candidates.length === 0 ? (
              <div className="text-zinc-500 italic py-2">
                Base Case dp[0]: No subproblems evaluated. Base value is 0.
              </div>
            ) : (
              currentStep.candidates.map((cand, idx) => (
                <div 
                  key={idx}
                  className={`p-2.5 rounded-lg border flex items-center justify-between transition-all ${
                    cand.isMin
                      ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-300 font-bold'
                      : 'border-white/[0.06] bg-zinc-900/40 text-zinc-400'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">
                      Coin ${cand.coin}
                    </span>
                    <span>
                      dp[{currentStep.amount} - {cand.coin}] + 1 = dp[{cand.prevAmount}] + 1 = {cand.prevVal} + 1
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm">={cand.total}</span>
                    {cand.isMin && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 uppercase">
                        Optimal
                      </span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Live Code Highlighting */}
        <div className="p-4 rounded-xl border border-white/[0.08] bg-[#0c101c] space-y-3">
          <div className="flex items-center justify-between text-zinc-400 pb-1 border-b border-white/[0.06]">
            <span className="uppercase font-bold text-cyan-400 flex items-center gap-1">
              <Code2 className="w-3.5 h-3.5" />
              Dynamic Programming Code:
            </span>
            <span>Python 3</span>
          </div>

          <div className="text-[11px] font-mono leading-relaxed space-y-1 text-zinc-400">
            <div className={currentStep.codeLine === 1 ? 'bg-amber-500/20 text-amber-200 px-1.5 py-0.5 rounded' : ''}>
              1: dp = [float('inf')] * (amount + 1)
            </div>
            <div className={currentStep.codeLine === 1 ? 'bg-amber-500/20 text-amber-200 px-1.5 py-0.5 rounded' : ''}>
              2: dp[0] = 0  # base case
            </div>
            <div className={currentStep.codeLine === 4 ? 'bg-cyan-500/20 text-cyan-200 px-1.5 py-0.5 rounded' : ''}>
              3: for i in range(1, amount + 1):
            </div>
            <div className={currentStep.codeLine === 4 || currentStep.codeLine === 5 ? 'bg-emerald-500/25 text-emerald-300 font-bold px-1.5 py-0.5 rounded' : ''}>
              4:   for coin in coins:
            </div>
            <div className={currentStep.codeLine === 5 ? 'bg-emerald-500/25 text-emerald-300 font-bold px-1.5 py-0.5 rounded' : ''}>
              5:     if i - coin &gt;= 0:
            </div>
            <div className={currentStep.codeLine === 5 ? 'bg-emerald-500/25 text-emerald-300 font-bold px-1.5 py-0.5 rounded' : ''}>
              6:       dp[i] = min(dp[i], dp[i - coin] + 1)
            </div>
            <div className={currentStep.codeLine === 7 ? 'bg-emerald-500/30 text-emerald-200 font-bold px-1.5 py-0.5 rounded' : ''}>
              7: return dp[amount] if dp[amount] != inf else -1
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
