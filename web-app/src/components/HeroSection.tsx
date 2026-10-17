import React, { useState } from 'react';
import { Play, Check, Copy, Code2, ArrowRight, CornerDownRight, CheckCircle2 } from 'lucide-react';

type Language = 'python' | 'cpp' | 'javascript';

const SNIPPETS: Record<Language, { filename: string; code: string }> = {
  python: {
    filename: 'solution.py',
    code: `class Solution:
    def twoSum(self, nums: list[int], target: int) -> list[int]:
        # Hash map: val -> index for O(n) lookup
        lookup = {}
        for idx, val in enumerate(nums):
            diff = target - val
            if diff in lookup:
                return [lookup[diff], idx]
            lookup[val] = idx
        return []

# Example invocation
s = Solution()
result = s.twoSum([2, 7, 11, 15], 9)
print(result)  # [0, 1]`
  },
  cpp: {
    filename: 'solution.cpp',
    code: `#include <vector>
#include <unordered_map>

class Solution {
public:
    std::vector<int> twoSum(std::vector<int>& nums, int target) {
        std::unordered_map<int, int> lookup;
        for (int i = 0; i < (int)nums.size(); ++i) {
            int complement = target - nums[i];
            if (lookup.find(complement) != lookup.end()) {
                return {lookup[complement], i};
            }
            lookup[nums[i]] = i;
        }
        return {};
    }
};`
  },
  javascript: {
    filename: 'solution.js',
    code: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
};

console.log(twoSum([2, 7, 11, 15], 9)); // [0, 1]`
  }
};

export const HeroSection: React.FC = () => {
  const [lang, setLang] = useState<Language>('python');
  const [isRunning, setIsRunning] = useState(false);
  const [activeTestcase, setActiveTestcase] = useState<number>(1);
  const [copied, setCopied] = useState(false);

  const handleRunCode = () => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
    }, 600);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(SNIPPETS[lang].code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative pt-12 pb-16 lg:pt-16 lg:pb-20 border-b border-white/[0.08] bg-[#090a0f] bg-subtle-grid">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Top Header Block */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 mb-4">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
            <span>Curated DSA & Competitive Programming</span>
            <span className="text-zinc-600">/</span>
            <span className="text-zinc-400">Adaptive calibration</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.15]">
            Algorithmic problem solving, calibrated to your level.
          </h1>

          <p className="mt-4 text-sm sm:text-base text-zinc-300 leading-relaxed max-w-2xl">
            A focused coding platform for engineers preparing for technical interviews and competitive rounds.
            Practice 500+ curated problems, benchmark execution in Python, C++, and JavaScript, and track skill growth without choice fatigue.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href="#problems"
              className="inline-flex items-center gap-2 rounded-md bg-white hover:bg-zinc-100 px-4 py-2 text-xs font-medium text-zinc-950 transition-colors shadow-sm"
            >
              <span>Explore Problem Catalog</span>
              <ArrowRight className="h-3.5 w-3.5 text-zinc-700" />
            </a>

            <a
              href="#dynamic-mode"
              className="inline-flex items-center gap-2 rounded-md border border-white/[0.12] bg-white/[0.04] hover:bg-white/[0.08] px-4 py-2 text-xs font-medium text-zinc-200 transition-colors"
            >
              <span>How Dynamic Calibration Works</span>
            </a>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-mono text-zinc-400">
            <div><strong className="text-zinc-200">520</strong> curated problems</div>
            <div><strong className="text-zinc-200">16</strong> topic tracks</div>
            <div><strong className="text-zinc-200">3</strong> execution runtimes</div>
            <div><strong className="text-zinc-200">Weekly</strong> rated contests</div>
          </div>
        </div>

        {/* IDE Workbench Frame */}
        <div className="mt-10 rounded-xl border border-white/[0.1] bg-[#0c0e16] shadow-xl overflow-hidden">
          
          {/* Editor Header Bar */}
          <div className="flex flex-wrap items-center justify-between border-b border-white/[0.08] bg-[#090b12] px-3 py-2 gap-2">
            
            {/* File Tabs */}
            <div className="flex items-center gap-1">
              <span className="text-xs font-mono font-medium text-zinc-300 px-2 py-1 bg-white/[0.04] rounded border border-white/[0.06] flex items-center gap-1.5">
                <span className="text-emerald-400 font-bold">1.</span> Two Sum
                <span className="text-[10px] text-emerald-400 font-mono bg-emerald-500/10 px-1 rounded">Easy</span>
              </span>

              <div className="h-4 w-[1px] bg-white/[0.08] mx-1" />

              {(['python', 'cpp', 'javascript'] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-2.5 py-1 text-xs font-mono rounded transition-colors ${
                    lang === l
                      ? 'bg-white/[0.08] text-white font-medium border border-white/[0.1]'
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.02]'
                  }`}
                >
                  {SNIPPETS[l].filename}
                </button>
              ))}
            </div>

            {/* Run Code / Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 px-2.5 py-1 text-xs font-mono text-zinc-400 hover:text-zinc-200 rounded border border-white/[0.08] bg-white/[0.02]"
                title="Copy code"
              >
                {copied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                <span className="text-[11px]">{copied ? 'Copied' : 'Copy'}</span>
              </button>

              <button
                onClick={handleRunCode}
                disabled={isRunning}
                className="flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-emerald-950 bg-emerald-400 hover:bg-emerald-300 rounded transition-colors disabled:opacity-75"
              >
                {isRunning ? (
                  <>
                    <div className="h-3 w-3 animate-spin rounded-full border-2 border-emerald-950 border-t-transparent" />
                    <span>Executing...</span>
                  </>
                ) : (
                  <>
                    <Play className="h-3 w-3 fill-emerald-950" />
                    <span>Run Code</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Workbench Grid: Code on left, Testcase & Output on right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[320px]">
            
            {/* Code pane (7 cols) */}
            <div className="lg:col-span-7 bg-[#0b0d14] p-4 font-mono text-xs overflow-x-auto border-b lg:border-b-0 lg:border-r border-white/[0.08]">
              <div className="flex gap-4">
                <div className="select-none text-zinc-600 text-right pr-2 border-r border-white/[0.06] space-y-1">
                  {SNIPPETS[lang].code.split('\n').map((_, i) => (
                    <div key={i}>{i + 1}</div>
                  ))}
                </div>
                <pre className="text-zinc-200 leading-relaxed font-mono whitespace-pre overflow-x-auto">
                  <code>{SNIPPETS[lang].code}</code>
                </pre>
              </div>
            </div>

            {/* Testcase & Execution Results (5 cols) */}
            <div className="lg:col-span-5 bg-[#090b12] p-4 flex flex-col justify-between text-xs font-mono">
              <div>
                
                {/* Result header */}
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-400 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      Accepted
                    </span>
                    <span className="text-zinc-500">|</span>
                    <span className="text-zinc-400">Runtime: <strong className="text-zinc-200">32 ms</strong></span>
                  </div>
                  <span className="text-zinc-400">Memory: <strong className="text-zinc-200">16.4 MB</strong></span>
                </div>

                {/* Testcases selector */}
                <div className="mt-3">
                  <div className="text-[11px] text-zinc-500 uppercase tracking-wider mb-1.5">
                    Test Cases
                  </div>
                  <div className="flex gap-1.5">
                    {[1, 2, 3].map((tc) => (
                      <button
                        key={tc}
                        onClick={() => setActiveTestcase(tc)}
                        className={`px-2.5 py-1 rounded text-xs transition-colors border ${
                          activeTestcase === tc
                            ? 'bg-white/[0.08] text-white border-white/[0.15] font-semibold'
                            : 'bg-white/[0.02] text-zinc-400 border-white/[0.06] hover:text-zinc-200'
                        }`}
                      >
                        Case {tc}
                      </button>
                    ))}
                  </div>

                  {/* Input / Expected display */}
                  <div className="mt-3 rounded border border-white/[0.06] bg-black/30 p-2.5 space-y-2 text-zinc-300 text-[11px]">
                    {activeTestcase === 1 && (
                      <>
                        <div><span className="text-zinc-500">nums =</span> [2, 7, 11, 15]</div>
                        <div><span className="text-zinc-500">target =</span> 9</div>
                        <div className="pt-1 border-t border-white/[0.06] text-emerald-400">
                          <span className="text-zinc-500">Output:</span> [0, 1]
                        </div>
                      </>
                    )}
                    {activeTestcase === 2 && (
                      <>
                        <div><span className="text-zinc-500">nums =</span> [3, 2, 4]</div>
                        <div><span className="text-zinc-500">target =</span> 6</div>
                        <div className="pt-1 border-t border-white/[0.06] text-emerald-400">
                          <span className="text-zinc-500">Output:</span> [1, 2]
                        </div>
                      </>
                    )}
                    {activeTestcase === 3 && (
                      <>
                        <div><span className="text-zinc-500">nums =</span> [3, 3]</div>
                        <div><span className="text-zinc-500">target =</span> 6</div>
                        <div className="pt-1 border-t border-white/[0.06] text-emerald-400">
                          <span className="text-zinc-500">Output:</span> [0, 1]
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Runtime percentile breakdown */}
                <div className="mt-3 rounded border border-white/[0.06] bg-white/[0.02] p-2.5">
                  <div className="flex items-center justify-between text-[11px] text-zinc-400 mb-1">
                    <span>Speed Percentile</span>
                    <span className="text-emerald-400 font-semibold">Beats 96.4%</span>
                  </div>
                  <div className="w-full bg-white/[0.06] rounded-full h-1 overflow-hidden">
                    <div className="bg-emerald-400 h-1 rounded-full" style={{ width: '96.4%' }} />
                  </div>
                </div>

              </div>

              {/* Bottom footer note */}
              <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between text-[11px] text-zinc-500">
                <span>All test cases passed (3/3)</span>
                <span className="text-zinc-400">Next: #20 Valid Parentheses</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
