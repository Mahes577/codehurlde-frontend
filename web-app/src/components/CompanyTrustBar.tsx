import React, { useState } from 'react';
import { Building2, ChevronRight, Sparkles } from 'lucide-react';

interface Company {
  name: string;
  count: number;
  color: string;
  borderHover: string;
  bgHover: string;
  topTopics: string;
}

const COMPANIES: Company[] = [
  { 
    name: 'Google', 
    count: 142, 
    color: 'text-amber-300',
    borderHover: 'hover:border-amber-400/40',
    bgHover: 'hover:bg-amber-500/10',
    topTopics: 'Graphs, Dynamic Programming, Topological Sort'
  },
  { 
    name: 'Meta', 
    count: 185, 
    color: 'text-blue-400',
    borderHover: 'hover:border-blue-400/40',
    bgHover: 'hover:bg-blue-500/10',
    topTopics: 'Trees, Sliding Window, Recursion & Backtracking'
  },
  { 
    name: 'Amazon', 
    count: 210, 
    color: 'text-orange-400',
    borderHover: 'hover:border-orange-400/40',
    bgHover: 'hover:bg-orange-500/10',
    topTopics: 'Two Pointers, Heaps, String Tokenization'
  },
  { 
    name: 'Microsoft', 
    count: 130, 
    color: 'text-cyan-400',
    borderHover: 'hover:border-cyan-400/40',
    bgHover: 'hover:bg-cyan-500/10',
    topTopics: 'Linked Lists, Trie, LRU Cache Design'
  },
  { 
    name: 'Apple', 
    count: 95, 
    color: 'text-zinc-200',
    borderHover: 'hover:border-zinc-300/40',
    bgHover: 'hover:bg-zinc-400/10',
    topTopics: 'Bit Manipulation, Low-Level Concurrency, Math'
  },
  { 
    name: 'Netflix', 
    count: 84, 
    color: 'text-rose-400',
    borderHover: 'hover:border-rose-400/40',
    bgHover: 'hover:bg-rose-500/10',
    topTopics: 'Distributed State, Caching Invariants, Interval Sets'
  },
  { 
    name: 'Uber', 
    count: 112, 
    color: 'text-emerald-400',
    borderHover: 'hover:border-emerald-400/40',
    bgHover: 'hover:bg-emerald-500/10',
    topTopics: 'Dijkstra, Shortest Path, Quadtree Partitioning'
  },
];

export const CompanyTrustBar: React.FC = () => {
  const [activeCompany, setActiveCompany] = useState<Company>(COMPANIES[0]);

  return (
    <section id="companies" className="py-12 bg-[#07090e] border-b border-white/[0.08]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6">
          <div className="space-y-1">
            <div className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1.5">
              <Building2 className="h-4 w-4" />
              Targeted Interview Vaults
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Practice By High-Frequency Company Question Banks
            </h3>
          </div>

          <div className="text-xs font-mono text-zinc-400">
            Updated weekly with recent candidate feedback
          </div>
        </div>

        {/* Company Pills Selector */}
        <div className="flex flex-wrap items-center gap-2.5">
          {COMPANIES.map((company) => {
            const isSelected = activeCompany.name === company.name;
            return (
              <button
                key={company.name}
                onClick={() => setActiveCompany(company)}
                className={`flex items-center gap-2.5 rounded-xl border px-3.5 py-2 text-xs font-mono transition-all duration-200 cursor-pointer ${
                  isSelected 
                    ? 'border-white/[0.3] bg-white/[0.08] shadow-lg shadow-black/50 text-white font-bold scale-[1.02]'
                    : `border-white/[0.08] bg-[#0c101c] text-zinc-400 ${company.borderHover} ${company.bgHover}`
                }`}
              >
                <span className={`h-2 w-2 rounded-full ${isSelected ? 'bg-emerald-400 animate-pulse' : 'bg-zinc-600'}`} />
                <span className="font-sans font-semibold text-zinc-200">{company.name}</span>
                <span className="text-[11px] text-zinc-500">{company.count} problems</span>
              </button>
            );
          })}
        </div>

        {/* Active Company Detail Spotlight */}
        <div className="mt-4 rounded-xl border border-white/[0.1] bg-[#0c1220]/90 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="text-xs font-mono text-zinc-400 flex items-center gap-2">
              <span className="font-bold text-white">{activeCompany.name} Technical Interview Track</span>
              <span className="text-zinc-600">|</span>
              <span className="text-emerald-400 font-semibold">{activeCompany.count} Verified Questions</span>
            </div>
            <div className="text-xs text-zinc-300">
              High frequency patterns: <strong className="text-white">{activeCompany.topTopics}</strong>
            </div>
          </div>

          <a
            href="#problems"
            className="inline-flex items-center gap-1.5 rounded-lg bg-white/[0.08] hover:bg-white/[0.14] border border-white/[0.12] px-3.5 py-1.5 text-xs font-mono font-medium text-white transition-colors"
          >
            <span>Open {activeCompany.name} Sheet</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </a>
        </div>

      </div>
    </section>
  );
};
