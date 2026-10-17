import React, { useState } from 'react';
import { Play, CheckCircle2, Terminal, Sparkles, ChevronRight, Zap, Code2, ArrowUpRight, Copy, Check } from 'lucide-react';

type Language = 'python' | 'cpp' | 'javascript';

interface CodeSnippets {
  python: string;
  cpp: string;
  javascript: string;
}

const SNIPPETS: CodeSnippets = {
  python: `def two_sum(nums: list[int], target: int) -> list[int]:
    # Hash map for O(n) lookup time
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []

# Test execution
print(two_sum([2, 7, 11, 15], 9)) # Output: [0, 1]`,

  cpp: `#include <vector>
#include <unordered_map>

class Solution {
public:
    std::vector<int> twoSum(std::vector<int>& nums, int target) {
        std::unordered_map<int, int> seen;
        for (int i = 0; i < nums.size(); ++i) {
            int complement = target - nums[i];
            if (seen.find(complement) != seen.end()) {
                return {seen[complement], i};
            }
            seen[nums[i]] = i;
        }
        return {};
    }
};`,

  javascript: `function twoSum(nums, target) {
  // Hash map for O(n) lookup time
  const seen = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (seen.has(complement)) {
      return [seen.get(complement), i];
    }
    seen.set(nums[i], i);
  }
  return [];
}

console.log(twoSum([2, 7, 11, 15], 9)); // [0, 1]`
};

export const HeroSection: React.FC = () => {
  const [lang, setLang] = useState<Language>('python');
  const [isRunning, setIsRunning] = useState(false);
  const [runSuccess, setRunSuccess] = useState(true);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'code' | 'testcase'>('code');

  const handleRunCode = () => {
    setIsRunning(true);
    setRunSuccess(false);
    setTimeout(() => {
      setIsRunning(false);
      setRunSuccess(true);
      setActiveTab('testcase');
    }, 750);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(SNIPPETS[lang]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-16 lg:pb-24">
      {/* Background neon ambient gradients */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-[550px] w-full max-w-7xl">
        <div className="absolute top-10 left-1/4 h-80 w-80 rounded-full bg-emerald-500/10 blur-[120px]" />
        <div className="absolute top-20 right-1/4 h-96 w-96 rounded-full bg-indigo-600/15 blur-[140px]" />
        <div className="absolute top-60 left-1/2 -translate-x-1/2 h-64 w-[600px] rounded-full bg-cyan-500/10 blur-[130px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Top Announcement Tag */}
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/40 px-3.5 py-1.5 text-xs font-medium text-emerald-300 shadow-inner">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-emerald-400 font-semibold">DYNAMIC MODE 2.0</span>
            <span className="text-slate-400">|</span>
            <span>AI tailored problem difficulty for real retention</span>
            <ArrowUpRight className="h-3.5 w-3.5 text-emerald-400" />
          </div>
        </div>

        {/* Hero Title & Pitch */}
        <div className="mt-6 text-center max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
            Conquer Every <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent">Coding Hurdle</span>, One Problem at a Time.
          </h1>
          <p className="mt-5 text-base sm:text-lg text-slate-300/90 leading-relaxed">
            Stop grinding 3,000 disconnected questions. Practice Data Structures, Algorithms, and Competitive Programming with 
            <span className="text-emerald-400 font-medium"> adaptive problem matching</span>, in-browser execution, and an active community of solvers.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <a
              href="#dsa"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-500 px-6 py-3.5 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/25 hover:bg-emerald-400 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <Zap className="h-4 w-4 fill-slate-950" />
              <span>Start Practicing Free</span>
            </a>

            <a
              href="#dynamic-mode"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg border border-slate-700 bg-slate-900/80 px-6 py-3.5 text-sm font-medium text-slate-200 hover:border-slate-600 hover:bg-slate-800 transition-all"
            >
              <Sparkles className="h-4 w-4 text-violet-400" />
              <span>Explore Dynamic Mode</span>
            </a>
          </div>

          {/* Feature Badges */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-400 font-mono">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
              <span>500+ Curated Problems</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
              <span>Python • C++ • JavaScript</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
              <span>No Credit Card Required</span>
            </div>
          </div>
        </div>

        {/* Interactive Code Editor Playground Card */}
        <div className="mt-12 lg:mt-16 max-w-4xl mx-auto">
          <div className="relative rounded-2xl border border-slate-800 bg-[#0c1220]/90 shadow-2xl shadow-indigo-950/40 backdrop-blur-xl overflow-hidden">
            
            {/* Window Chrome Header */}
            <div className="flex flex-wrap items-center justify-between border-b border-slate-800 bg-[#080d18] px-4 py-3 gap-3">
              
              {/* Window controls & Problem info */}
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-rose-500/80" />
                  <div className="h-3 w-3 rounded-full bg-amber-500/80" />
                  <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
                </div>
                <div className="h-4 w-[1px] bg-slate-800" />
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-medium text-slate-300">1. Two Sum</span>
                  <span className="rounded bg-emerald-500/10 px-2 py-0.5 text-[11px] font-mono font-semibold text-emerald-400 border border-emerald-500/20">Easy</span>
                  <span className="hidden sm:inline text-[11px] font-mono text-slate-500">52.4% Acceptance</span>
                </div>
              </div>

              {/* Language Switcher & Controls */}
              <div className="flex items-center gap-2">
                <div className="flex rounded-lg bg-slate-900/90 p-1 border border-slate-800">
                  <button
                    onClick={() => setLang('python')}
                    className={`rounded px-2.5 py-1 text-xs font-mono transition-colors ${lang === 'python' ? 'bg-emerald-500/20 text-emerald-300 font-semibold' : 'text-slate-400 hover:text-slate-200'}`}
                  >
                    Python
                  </button>
                  <button
                    onClick={() => setLang('cpp')}
                    className={`rounded px-2.5 py-1 text-xs font-mono transition-colors ${lang === 'cpp' ? 'bg-indigo-500/20 text-indigo-300 font-semibold' : 'text-slate-400 hover:text-slate-200'}`}
                  >
                    C++20
                  </button>
                  <button
                    onClick={() => setLang('javascript')}
                    className={`rounded px-2.5 py-1 text-xs font-mono transition-colors ${lang === 'javascript' ? 'bg-amber-500/20 text-amber-300 font-semibold' : 'text-slate-400 hover:text-slate-200'}`}
                  >
                    JS
                  </button>
                </div>

                <button
                  onClick={handleCopy}
                  className="hidden sm:flex h-7 w-7 items-center justify-center rounded-md border border-slate-800 bg-slate-900 text-slate-400 hover:text-white"
                  title="Copy snippet"
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                </button>

                <button
                  onClick={handleRunCode}
                  disabled={isRunning}
                  className="flex items-center gap-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 px-3.5 py-1.5 text-xs font-semibold text-slate-950 transition-all active:scale-95 disabled:opacity-75"
                >
                  {isRunning ? (
                    <>
                      <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-slate-950 border-t-transparent" />
                      <span>Running...</span>
                    </>
                  ) : (
                    <>
                      <Play className="h-3.5 w-3.5 fill-slate-950" />
                      <span>Run Code</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Code Body & Editor */}
            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[300px]">
              
              {/* Code Editor Pane (8 cols) */}
              <div className="lg:col-span-8 p-4 font-mono text-xs sm:text-sm bg-[#090e18] overflow-x-auto border-b lg:border-b-0 lg:border-r border-slate-800">
                <div className="flex gap-4">
                  {/* Line numbers */}
                  <div className="select-none text-slate-600 text-right font-mono text-xs space-y-1.5 pr-2 border-r border-slate-800/60">
                    {SNIPPETS[lang].split('\n').map((_, i) => (
                      <div key={i}>{i + 1}</div>
                    ))}
                  </div>

                  {/* Code display with syntax style highlights */}
                  <pre className="text-slate-200 font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto whitespace-pre">
                    <code>
                      {SNIPPETS[lang].split('\n').map((line, idx) => {
                        // Simple custom token highlight
                        const isComment = line.trim().startsWith('#') || line.trim().startsWith('//');
                        return (
                          <div key={idx} className={isComment ? 'text-slate-500 italic' : 'text-slate-200'}>
                            {line.includes('def ') || line.includes('function ') || line.includes('class ') ? (
                              <span className="text-violet-400 font-semibold">{line}</span>
                            ) : line.includes('return ') ? (
                              <span className="text-rose-400">{line}</span>
                            ) : line.includes('for ') || line.includes('if ') ? (
                              <span className="text-amber-300">{line}</span>
                            ) : (
                              line
                            )}
                          </div>
                        );
                      })}
                    </code>
                  </pre>
                </div>
              </div>

              {/* Execution / Output Test Pane (4 cols) */}
              <div className="lg:col-span-4 bg-[#0a0f1d] p-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400">Execution Output</span>
                    {runSuccess && (
                      <span className="inline-flex items-center gap-1 rounded bg-emerald-500/10 px-2 py-0.5 text-[10px] font-mono font-semibold text-emerald-400 border border-emerald-500/20">
                        <CheckCircle2 className="h-3 w-3" />
                        Accepted
                      </span>
                    )}
                  </div>

                  {/* Test Cases / Benchmark */}
                  <div className="mt-3 space-y-2.5">
                    <div className="rounded-lg bg-slate-900/90 p-2.5 border border-slate-800">
                      <div className="flex items-center justify-between text-[11px] font-mono">
                        <span className="text-slate-400">Case 1: [2,7,11,15], target=9</span>
                        <span className="text-emerald-400 font-semibold">Output: [0, 1] ✓</span>
                      </div>
                    </div>

                    <div className="rounded-lg bg-slate-900/90 p-2.5 border border-slate-800">
                      <div className="flex items-center justify-between text-[11px] font-mono">
                        <span className="text-slate-400">Case 2: [3,2,4], target=6</span>
                        <span className="text-emerald-400 font-semibold">Output: [1, 2] ✓</span>
                      </div>
                    </div>

                    <div className="rounded-lg bg-slate-900/90 p-2.5 border border-slate-800">
                      <div className="flex items-center justify-between text-[11px] font-mono">
                        <span className="text-slate-400">Case 3: [3,3], target=6</span>
                        <span className="text-emerald-400 font-semibold">Output: [0, 1] ✓</span>
                      </div>
                    </div>
                  </div>

                  {/* Benchmark Performance Card */}
                  <div className="mt-3 rounded-lg bg-gradient-to-br from-slate-900 to-indigo-950/40 p-3 border border-indigo-500/20">
                    <div className="text-[10px] uppercase font-mono font-semibold text-indigo-300">Runtime Benchmark</div>
                    <div className="mt-1 flex items-baseline justify-between">
                      <span className="text-base font-bold font-mono text-emerald-400">32 ms</span>
                      <span className="text-xs font-mono text-slate-300">Beats <strong className="text-emerald-400">96.4%</strong> of users</span>
                    </div>
                    <div className="mt-1.5 w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                      <div className="bg-emerald-400 h-1.5 rounded-full" style={{ width: '96.4%' }} />
                    </div>
                  </div>
                </div>

                {/* Next Problem Prompt */}
                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-mono">Dynamic Mode: Next Problem</span>
                  <a href="#dsa" className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-0.5">
                    Valid Parentheses →
                  </a>
                </div>

              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
