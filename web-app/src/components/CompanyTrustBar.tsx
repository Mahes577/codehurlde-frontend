import React, { useState } from 'react';
import { Building2, ChevronRight, Sparkles } from 'lucide-react';
import { CompanyPill } from './molecules/CompanyPill';
import { Card } from './atoms/Card';
import { Button } from './atoms/Button';
import { Badge } from './atoms/Badge';

interface Company {
  name: string;
  count: number;
  topTopics: string;
}

const COMPANIES: Company[] = [
  { 
    name: 'Google', 
    count: 142, 
    topTopics: 'Graphs, Dynamic Programming, Topological Sort'
  },
  { 
    name: 'Meta', 
    count: 185, 
    topTopics: 'Trees, Sliding Window, Recursion & Backtracking'
  },
  { 
    name: 'Amazon', 
    count: 210, 
    topTopics: 'Two Pointers, Heaps, String Tokenization'
  },
  { 
    name: 'Microsoft', 
    count: 130, 
    topTopics: 'Linked Lists, Trie, LRU Cache Design'
  },
  { 
    name: 'Apple', 
    count: 95, 
    topTopics: 'Bit Manipulation, Low-Level Concurrency, Math'
  },
  { 
    name: 'Netflix', 
    count: 84, 
    topTopics: 'Distributed State, Caching Invariants, Interval Sets'
  },
  { 
    name: 'Uber', 
    count: 112, 
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

        {/* Company Pills Selector Molecule Group */}
        <div className="flex flex-wrap items-center gap-2.5">
          {COMPANIES.map((company) => (
            <CompanyPill
              key={company.name}
              name={company.name}
              count={company.count}
              isSelected={activeCompany.name === company.name}
              onClick={() => setActiveCompany(company)}
            />
          ))}
        </div>

        {/* Active Company Detail Spotlight Card */}
        <Card variant="surface" className="mt-4 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-emerald-500/20">
          <div className="space-y-1">
            <div className="text-xs font-mono text-zinc-400 flex items-center gap-2">
              <Badge variant="emerald" size="xs">
                {activeCompany.name} Technical Track
              </Badge>
              <span className="text-zinc-600">|</span>
              <span className="text-emerald-400 font-semibold">{activeCompany.count} Verified Questions</span>
            </div>
            <div className="text-xs text-zinc-300">
              High frequency patterns: <strong className="text-white">{activeCompany.topTopics}</strong>
            </div>
          </div>

          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              const el = document.getElementById('problems');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            icon={<ChevronRight className="w-3.5 h-3.5 text-emerald-400" />}
            iconPosition="right"
          >
            Filter {activeCompany.name} Questions
          </Button>
        </Card>

      </div>
    </section>
  );
};
