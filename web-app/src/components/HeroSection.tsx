import React, { useState } from 'react';
import { 
  Play, 
  RotateCcw, 
  CheckCircle2, 
  Sparkles, 
  Terminal, 
  ArrowRight, 
  Code2, 
  Eye, 
  Flame, 
  ChevronRight, 
  Zap, 
  Check, 
  Copy,
  Layers,
  Clock
} from 'lucide-react';

type Language = 'python' | 'cpp' | 'javascript';

interface HeroSectionProps {
  onLaunchCompiler?: () => void;
  onExploreRoadmap?: () => void;
}

const CODE_SNIPPETS: Record<Language, { filename: string; code: string }> = {
  python: {
    filename: 'solution.py',
    code: `class Solution:
    def twoSum(self, nums: list[int], target: int) -> list[int]:
        # Hash Map: O(n) Time, O(n) Space
        seen = {}
        for i, num in enumerate(nums):
            complement = target - num
            if complement in seen:
                return [seen[complement], i]
            seen[num] = i
        return []

# Test execution:
print(Solution().twoSum([2, 7, 11, 15], 9)) # Output: [0, 1]`
  },
  cpp: {
    filename: 'solution.cpp',
    code: `#include <vector>
#include <unordered_map>

class Solution {
public:
    std::vector<int> twoSum(std::vector<int>& nums, int target) {
        std::unordered_map<int, int> seen;
        for (int i = 0; i < (int)nums.size(); ++i) {
            int complement = target - nums[i];
            if (seen.find(complement) != seen.end()) {
                return {seen[complement], i};
            }
            seen[nums[i]] = i;
        }
        return {};
    }
};`
  },
  javascript: {
    filename: 'solution.js',
    code: `var twoSum = function(nums, target) {
  const seen = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (seen.has(complement)) {
      return [seen.get(complement), i];
    }
    seen.set(nums[i], i);
  }
  return [];
};

console.log(twoSum([2, 7, 11, 15], 9)); // [0, 1]`
  }
};

export const HeroSection: React.FC<HeroSectionProps> = ({ onLaunchCompiler, onExploreRoadmap }) => {
  const [viewMode, setViewMode] = useState<'visualizer' | 'code'>('visualizer');
  const [lang, setLang] = useState<Language>('python');
  const [copied, setCopied] = useState(false);
  
  // Interactive visualizer state
  const [step, setStep] = useState<number>(0);
  const [isPlayingAuto, setIsPlayingAuto] = useState(false);

  // Runner state
  const [isRunningCode, setIsRunningCode] = useState(false);
  const [activeCase, setActiveCase] = useState<number>(1);

  const arrayData = [
    { index: 0, val: 2 },
    { index: 1, val: 7 },
    { index: 2, val: 11 },
    { index: 3, val: 15 },
  ];

  const handleNextStep = () => {
    setStep((prev) => (prev < 2 ? prev + 1 : 0));
  };

  const handleResetStep = () => {
    setStep(0);
  };

  const handleRunCode = () => {
    setIsRunningCode(true);
    setTimeout(() => {
      setIsRunningCode(false);
    }, 550);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(CODE_SNIPPETS[lang].code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative pt-12 pb-20 lg:pt-16 lg:pb-28 overflow-hidden bg-mesh-grid">
      {/* Ambient glowing radial flares */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-[600px] w-full max-w-7xl">
        <div className="absolute top-10 left-1/4 h-96 w-96 rounded-full bg-emerald-500/15 blur-[120px]" />
        <div className="absolute top-20 right-1/4 h-96 w-96 rounded-full bg-indigo-500/15 blur-[140px]" />
        <div className="absolute top-40 left-1/2 -translate-x-1/2 h-64 w-[500px] rounded-full bg-cyan-500/10 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Top Feature Pill */}
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/50 px-3.5 py-1.5 text-xs font-mono font-medium text-emerald-300 shadow-inner backdrop-blur-md">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-semibold text-emerald-400">DYNAMIC CALIBRATION v2</span>
            <span className="text-zinc-500">|</span>
            <span className="text-zinc-300">Adaptive Problem Sequences For Real Retention</span>
            <ArrowRight className="h-3 w-3 text-emerald-400" />
          </div>
        </div>

        {/* Hero Title & Pitch */}
        <div className="mt-6 text-center max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.12]">
            Master Every Algorithm Hurdle. <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              Without The LeetCode Burnout.
            </span>
          </h1>

          <p className="mt-5 text-base sm:text-lg text-zinc-300 max-w-2xl mx-auto leading-relaxed">
            Stop grinding 3,000 disconnected questions. Practice 500+ curated problems with 
            <span className="text-emerald-400 font-semibold"> step-by-step visual execution</span>, 
            adaptive difficulty matching, and competitive timed rounds.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <button
              onClick={() => onLaunchCompiler ? onLaunchCompiler() : undefined}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 px-6 py-3.5 text-sm font-bold text-zinc-950 shadow-lg shadow-emerald-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Zap className="h-4 w-4 fill-zinc-950" />
              <span>Launch In-Browser IDE</span>
            </button>

            <button
              onClick={() => onExploreRoadmap ? onExploreRoadmap() : undefined}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-white/[0.15] bg-white/[0.05] hover:bg-white/[0.09] px-6 py-3.5 text-sm font-semibold text-white transition-all backdrop-blur-md"
            >
              <Sparkles className="h-4 w-4 text-emerald-400" />
              <span>Explore 29-Topic Roadmap</span>
            </button>
          </div>

          {/* Key Metrics Strip */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-mono text-zinc-400">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
              <span>520 Curated Problems</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
              <span>Interactive Step Visualizer</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
              <span>Python · C++20 · Node.js</span>
            </div>
          </div>
        </div>

        {/* Hero Interactive Showcase Workbench */}
        <div className="mt-12 lg:mt-16 max-w-5xl mx-auto">
          <div className="rounded-2xl border border-white/[0.12] bg-[#0c101c]/90 shadow-2xl shadow-emerald-950/30 backdrop-blur-xl overflow-hidden">
            
            {/* Workbench Top Bar */}
            <div className="flex flex-wrap items-center justify-between border-b border-white/[0.08] bg-[#080b14] px-4 py-3 gap-3">
              
              {/* Problem info & View switcher */}
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-rose-500/80" />
                  <div className="h-3 w-3 rounded-full bg-amber-500/80" />
                  <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
                </div>
                <div className="h-4 w-[1px] bg-white/[0.1]" />
                
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-white">#1 Two Sum</span>
                  <span className="rounded bg-emerald-500/10 px-2 py-0.5 text-[10px] font-mono font-bold text-emerald-400 border border-emerald-500/30">
                    Easy
                  </span>
                  <span className="hidden sm:inline text-[11px] font-mono text-zinc-400">
                    Target = 9
                  </span>
                </div>
              </div>

              {/* View Switcher: Interactive Visualizer vs Code Editor */}
              <div className="flex items-center gap-2">
                <div className="flex rounded-lg bg-black/40 p-1 border border-white/[0.08]">
                  <button
                    onClick={() => setViewMode('visualizer')}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs font-mono transition-all ${
                      viewMode === 'visualizer'
                        ? 'bg-emerald-500 text-zinc-950 font-bold shadow-md shadow-emerald-500/20'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    <Eye className="h-3.5 w-3.5" />
                    <span>Visual Algorithm</span>
                  </button>
                  <button
                    onClick={() => setViewMode('code')}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs font-mono transition-all ${
                      viewMode === 'code'
                        ? 'bg-emerald-500 text-zinc-950 font-bold shadow-md shadow-emerald-500/20'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    <Code2 className="h-3.5 w-3.5" />
                    <span>Code Editor</span>
                  </button>
                </div>

                {viewMode === 'code' && (
                  <button
                    onClick={handleRunCode}
                    disabled={isRunningCode}
                    className="flex items-center gap-1.5 rounded-lg bg-emerald-400 hover:bg-emerald-300 px-3.5 py-1.5 text-xs font-bold text-zinc-950 transition-all active:scale-95 disabled:opacity-75"
                  >
                    {isRunningCode ? (
                      <>
                        <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-zinc-950 border-t-transparent" />
                        <span>Running...</span>
                      </>
                    ) : (
                      <>
                        <Play className="h-3.5 w-3.5 fill-zinc-950" />
                        <span>Run Code</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>

            {/* TAB A: INTERACTIVE ALGORITHM VISUALIZER */}
            {viewMode === 'visualizer' && (
              <div className="p-6 bg-[#090d18] min-h-[380px] flex flex-col justify-between">
                
                {/* Visualizer Status Bar */}
                <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
                  <div className="space-y-0.5">
                    <div className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold flex items-center gap-1.5">
                      <Sparkles className="h-3.5 w-3.5" />
                      Step-by-Step Hash Map Lookup Visualization
                    </div>
                    <div className="text-xs text-zinc-300">
                      Watch how O(N) single-pass lookup resolves the Two Sum invariant without nested loops.
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleResetStep}
                      className="flex items-center gap-1 rounded-lg border border-white/[0.1] bg-white/[0.03] px-3 py-1.5 text-xs font-mono text-zinc-300 hover:text-white hover:bg-white/[0.06] transition-colors"
                    >
                      <RotateCcw className="h-3.5 w-3.5" />
                      <span>Reset</span>
                    </button>

                    <button
                      onClick={handleNextStep}
                      className="flex items-center gap-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 px-4 py-1.5 text-xs font-bold text-zinc-950 shadow-md shadow-emerald-500/20 transition-all active:scale-95"
                    >
                      <span>{step === 2 ? 'Restart Walkthrough' : 'Next Step →'}</span>
                    </button>
                  </div>
                </div>

                {/* Array Elements Visual Display */}
                <div className="my-6 space-y-6">
                  
                  {/* Array Row */}
                  <div>
                    <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-2 font-medium">
                      Input Array: <span className="text-white font-mono">nums = [2, 7, 11, 15]</span> | <span className="text-emerald-400">target = 9</span>
                    </div>

                    <div className="grid grid-cols-4 gap-3 sm:gap-4 max-w-xl">
                      {arrayData.map((item) => {
                        const isCurrent = (step === 0 && item.index === 0) || (step >= 1 && item.index === 1);
                        const isMatched = step >= 1 && (item.index === 0 || item.index === 1);

                        return (
                          <div 
                            key={item.index}
                            className={`relative rounded-xl p-3 sm:p-4 text-center border transition-all duration-300 ${
                              isMatched && step === 2
                                ? 'border-emerald-400 bg-emerald-500/20 shadow-lg shadow-emerald-500/20 scale-105'
                                : isCurrent
                                ? 'border-amber-400 bg-amber-500/15 shadow-md shadow-amber-500/20'
                                : 'border-white/[0.08] bg-black/40 text-zinc-400'
                            }`}
                          >
                            {/* Pointer Indicator */}
                            {isCurrent && (
                              <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-amber-400 px-2 py-0.2 text-[9px] font-mono font-bold text-zinc-950 animate-bounce">
                                i = {item.index}
                              </div>
                            )}

                            <div className="text-xl sm:text-2xl font-black font-mono text-white">
                              {item.val}
                            </div>
                            <div className="text-[10px] font-mono text-zinc-500 mt-1">
                              Index {item.index}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Hash Map State and Current Calculation */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    
                    {/* Calculation Card */}
                    <div className="rounded-xl border border-white/[0.08] bg-black/30 p-4 font-mono text-xs space-y-2">
                      <div className="text-[11px] text-zinc-400 uppercase tracking-wider font-semibold">
                        Iteration Calculation
                      </div>

                      {step === 0 && (
                        <div className="space-y-1 text-zinc-300">
                          <div>Pointer at <strong className="text-amber-300">i = 0</strong>, value = <strong className="text-white">2</strong></div>
                          <div>Needed complement = target - num = <strong className="text-emerald-400">9 - 2 = 7</strong></div>
                          <div className="text-rose-400">Lookup: Is 7 in seen hash map? <span className="font-bold">No</span></div>
                          <div className="pt-1 text-emerald-300">→ Store seen[2] = 0 in map. Advance pointer to i = 1.</div>
                        </div>
                      )}

                      {step === 1 && (
                        <div className="space-y-1 text-zinc-300">
                          <div>Pointer at <strong className="text-amber-300">i = 1</strong>, value = <strong className="text-white">7</strong></div>
                          <div>Needed complement = target - num = <strong className="text-emerald-400">9 - 7 = 2</strong></div>
                          <div className="text-emerald-400 font-bold">Lookup: Is 2 in seen hash map? YES! Found at index 0!</div>
                          <div className="pt-1 text-amber-300">→ Solution pair found: [seen[2], 1] = [0, 1].</div>
                        </div>
                      )}

                      {step === 2 && (
                        <div className="space-y-1 text-emerald-300">
                          <div className="font-bold text-sm text-emerald-400 flex items-center gap-1.5">
                            <CheckCircle2 className="h-4 w-4" />
                            Target Satisfied: nums[0] + nums[1] = 2 + 7 = 9!
                          </div>
                          <div>Execution Complete in 2 Operations (O(N) single-pass)</div>
                          <div>Memory consumed: 1 Hash Map Entry · Runtime: 32ms</div>
                        </div>
                      )}
                    </div>

                    {/* Hash Map Table State */}
                    <div className="rounded-xl border border-white/[0.08] bg-black/30 p-4 font-mono text-xs">
                      <div className="flex items-center justify-between pb-2 border-b border-white/[0.08] mb-2">
                        <span className="text-[11px] text-zinc-400 uppercase tracking-wider font-semibold">Hash Map State</span>
                        <span className="text-[10px] text-zinc-500">seen = &#123; value: index &#125;</span>
                      </div>

                      {step === 0 ? (
                        <div className="text-zinc-500 italic py-3 text-center">
                          Hash map is currently empty: &#123;&#125;
                        </div>
                      ) : (
                        <div className="space-y-1.5">
                          <div className={`p-2 rounded border flex items-center justify-between ${
                            step >= 1 ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300' : 'border-white/[0.06]'
                          }`}>
                            <span>Key: <strong className="text-white">2</strong></span>
                            <span>Value: <strong className="text-emerald-400">Index 0</strong></span>
                            <span className="text-[10px] text-emerald-400 font-bold">MATCHED ✓</span>
                          </div>
                        </div>
                      )}
                    </div>

                  </div>

                </div>

                {/* Footer Insight */}
                <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono text-zinc-400">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                    <span>Complexity: Time <strong className="text-emerald-400">O(N)</strong> · Space <strong className="text-emerald-400">O(N)</strong></span>
                  </div>
                  <button 
                    onClick={() => setViewMode('code')}
                    className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-semibold"
                  >
                    View Code Implementation →
                  </button>
                </div>

              </div>
            )}

            {/* TAB B: INTERACTIVE CODE EDITOR & RUNNER */}
            {viewMode === 'code' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[380px]">
                
                {/* Code pane (7 cols) */}
                <div className="lg:col-span-7 bg-[#090d18] p-4 font-mono text-xs overflow-x-auto border-b lg:border-b-0 lg:border-r border-white/[0.08]">
                  
                  {/* Language switch bar */}
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/[0.08]">
                    <div className="flex gap-1">
                      {(['python', 'cpp', 'javascript'] as const).map((l) => (
                        <button
                          key={l}
                          onClick={() => setLang(l)}
                          className={`px-2.5 py-1 text-xs font-mono rounded transition-colors ${
                            lang === l
                              ? 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30'
                              : 'text-zinc-400 hover:text-white'
                          }`}
                        >
                          {CODE_SNIPPETS[l].filename}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={handleCopy}
                      className="flex items-center gap-1 text-[11px] font-mono text-zinc-400 hover:text-white px-2 py-0.5 rounded border border-white/[0.08]"
                    >
                      {copied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                      <span>{copied ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>

                  {/* Code listing */}
                  <div className="flex gap-3">
                    <div className="select-none text-zinc-600 text-right pr-2 border-r border-white/[0.06] space-y-1">
                      {CODE_SNIPPETS[lang].code.split('\n').map((_, i) => (
                        <div key={i}>{i + 1}</div>
                      ))}
                    </div>
                    <pre className="text-zinc-200 leading-relaxed font-mono whitespace-pre overflow-x-auto">
                      <code>{CODE_SNIPPETS[lang].code}</code>
                    </pre>
                  </div>
                </div>

                {/* Test Results Output (5 cols) */}
                <div className="lg:col-span-5 bg-[#080b14] p-5 flex flex-col justify-between text-xs font-mono">
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                      <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                        <CheckCircle2 className="h-4 w-4" />
                        <span>Accepted</span>
                      </div>
                      <span className="text-[11px] text-zinc-400">Runtime: <strong className="text-emerald-400">32 ms</strong></span>
                    </div>

                    {/* Testcase tabs */}
                    <div className="mt-3">
                      <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 mb-2">
                        Test Cases
                      </div>
                      <div className="flex gap-1.5">
                        {[1, 2, 3].map((tc) => (
                          <button
                            key={tc}
                            onClick={() => setActiveCase(tc)}
                            className={`px-2.5 py-1 rounded text-xs transition-colors border ${
                              activeCase === tc
                                ? 'bg-white/[0.1] text-white border-white/[0.2] font-semibold'
                                : 'bg-white/[0.02] text-zinc-400 border-white/[0.06] hover:text-white'
                            }`}
                          >
                            Case {tc}
                          </button>
                        ))}
                      </div>

                      <div className="mt-3 rounded-lg border border-white/[0.08] bg-black/40 p-3 space-y-1.5 text-[11px] text-zinc-300">
                        {activeCase === 1 && (
                          <>
                            <div>nums = [2, 7, 11, 15]</div>
                            <div>target = 9</div>
                            <div className="pt-1 border-t border-white/[0.06] text-emerald-400 font-bold">
                              Output: [0, 1] ✓
                            </div>
                          </>
                        )}
                        {activeCase === 2 && (
                          <>
                            <div>nums = [3, 2, 4]</div>
                            <div>target = 6</div>
                            <div className="pt-1 border-t border-white/[0.06] text-emerald-400 font-bold">
                              Output: [1, 2] ✓
                            </div>
                          </>
                        )}
                        {activeCase === 3 && (
                          <>
                            <div>nums = [3, 3]</div>
                            <div>target = 6</div>
                            <div className="pt-1 border-t border-white/[0.06] text-emerald-400 font-bold">
                              Output: [0, 1] ✓
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Speed benchmark percentiles */}
                    <div className="mt-4 rounded-lg border border-white/[0.08] bg-white/[0.02] p-3 space-y-2">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-zinc-400">Speed Percentile</span>
                        <span className="text-emerald-400 font-bold font-mono">Beats 96.4%</span>
                      </div>
                      <div className="h-1.5 w-full bg-white/[0.08] rounded-full overflow-hidden">
                        <div className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full" style={{ width: '96.4%' }} />
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between text-[11px] text-zinc-500">
                    <span>3 / 3 test cases passed</span>
                    <a href="#problems" className="text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-0.5">
                      Next Problem →
                    </a>
                  </div>
                </div>

              </div>
            )}

          </div>
        </div>

      </div>
    </section>
  );
};
