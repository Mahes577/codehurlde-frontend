import React, { useState, useMemo } from 'react';
import { Search, CheckCircle2, Circle, ChevronRight, Zap, ExternalLink, ArrowRight } from 'lucide-react';
import { Problem } from '../types';

const PROBLEMS_DATA: Problem[] = [
  { id: 1, title: 'Two Sum', difficulty: 'Easy', acceptance: '52.4%', category: 'Arrays & Hashing', companies: ['Google', 'Meta', 'Amazon'], solved: true },
  { id: 20, title: 'Valid Parentheses', difficulty: 'Easy', acceptance: '41.2%', category: 'Stack', companies: ['Meta', 'Amazon', 'Microsoft'], solved: true },
  { id: 56, title: 'Merge Intervals', difficulty: 'Medium', acceptance: '47.5%', category: 'Intervals', companies: ['Google', 'Uber', 'Bloomberg'], solved: false },
  { id: 3, title: 'Longest Substring Without Repeating Characters', difficulty: 'Medium', acceptance: '35.1%', category: 'Sliding Window', companies: ['Amazon', 'Meta', 'Apple'], solved: false },
  { id: 139, title: 'Word Break', difficulty: 'Medium', acceptance: '46.8%', category: 'Dynamic Programming', companies: ['Meta', 'Amazon'], solved: false },
  { id: 4, title: 'Median of Two Sorted Arrays', difficulty: 'Hard', acceptance: '39.0%', category: 'Binary Search', companies: ['Google', 'Microsoft'], solved: false },
  { id: 70, title: 'Climbing Stairs', difficulty: 'Easy', acceptance: '53.6%', category: 'Dynamic Programming', companies: ['Amazon', 'Google'], solved: true },
  { id: 200, title: 'Number of Islands', difficulty: 'Medium', acceptance: '58.2%', category: 'Graphs', companies: ['Amazon', 'Google', 'Meta'], solved: false },
  { id: 207, title: 'Course Schedule', difficulty: 'Medium', acceptance: '46.0%', category: 'Graphs', companies: ['Google', 'Uber'], solved: false },
  { id: 146, title: 'LRU Cache', difficulty: 'Medium', acceptance: '43.1%', category: 'System Design', companies: ['Amazon', 'Microsoft', 'Netflix'], solved: false },
  { id: 23, title: 'Merge k Sorted Lists', difficulty: 'Hard', acceptance: '52.0%', category: 'Heap / Priority Queue', companies: ['Meta', 'Amazon', 'Uber'], solved: false },
  { id: 15, title: '3Sum', difficulty: 'Medium', acceptance: '36.4%', category: 'Two Pointers', companies: ['Google', 'Amazon', 'Apple'], solved: false },
  { id: 42, title: 'Trapping Rain Water', difficulty: 'Hard', acceptance: '44.8%', category: 'Two Pointers', companies: ['Google', 'Meta'], solved: false },
  { id: 124, title: 'Binary Tree Maximum Path Sum', difficulty: 'Hard', acceptance: '39.4%', category: 'Trees', companies: ['Meta', 'DoorDash'], solved: false },
];

export const ProblemExplorer: React.FC = () => {
  const [problems, setProblems] = useState<Problem[]>(PROBLEMS_DATA);
  const [selectedDifficulty, setSelectedDifficulty] = useState<'All' | 'Easy' | 'Medium' | 'Hard'>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Arrays & Hashing', 'Two Pointers', 'Sliding Window', 'Graphs', 'Dynamic Programming', 'Trees'];

  const filteredProblems = useMemo(() => {
    return problems.filter((prob) => {
      const matchDiff = selectedDifficulty === 'All' || prob.difficulty === selectedDifficulty;
      const matchCat = selectedCategory === 'All' || prob.category === selectedCategory;
      const matchSearch = prob.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          prob.id.toString().includes(searchQuery) ||
                          prob.companies.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchDiff && matchCat && matchSearch;
    });
  }, [problems, selectedDifficulty, selectedCategory, searchQuery]);

  const toggleSolved = (id: number) => {
    setProblems(prev => prev.map(p => p.id === id ? { ...p, solved: !p.solved } : p));
  };

  const getDifficultyBadge = (diff: 'Easy' | 'Medium' | 'Hard') => {
    switch (diff) {
      case 'Easy':
        return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
      case 'Medium':
        return 'text-amber-400 bg-amber-500/10 border-amber-500/30';
      case 'Hard':
        return 'text-rose-400 bg-rose-500/10 border-rose-500/30';
    }
  };

  const solvedEasy = problems.filter(p => p.difficulty === 'Easy' && p.solved).length;
  const totalEasy = problems.filter(p => p.difficulty === 'Easy').length;

  const solvedMed = problems.filter(p => p.difficulty === 'Medium' && p.solved).length;
  const totalMed = problems.filter(p => p.difficulty === 'Medium').length;

  const solvedHard = problems.filter(p => p.difficulty === 'Hard' && p.solved).length;
  const totalHard = problems.filter(p => p.difficulty === 'Hard').length;

  return (
    <section id="problems" className="py-20 bg-[#080c16] border-b border-white/[0.08]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/[0.08]">
          <div className="max-w-2xl">
            <div className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-2 mb-2">
              <Zap className="h-4 w-4" />
              Curated Problem Catalog
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              520 Curated Algorithmic Problems
            </h2>
            <p className="mt-2 text-sm sm:text-base text-zinc-300">
              Filter by core algorithmic invariants, difficulty tiers, and company appearance frequency.
            </p>
          </div>

          {/* Difficulty breakdown cards */}
          <div className="flex items-center gap-3 font-mono text-xs">
            <div className="rounded-xl border border-emerald-500/25 bg-emerald-950/20 px-3.5 py-2 text-center">
              <div className="text-base font-black text-emerald-400">{solvedEasy} / {totalEasy}</div>
              <div className="text-[10px] text-zinc-400 uppercase font-sans">Easy Solved</div>
            </div>

            <div className="rounded-xl border border-amber-500/25 bg-amber-950/20 px-3.5 py-2 text-center">
              <div className="text-base font-black text-amber-400">{solvedMed} / {totalMed}</div>
              <div className="text-[10px] text-zinc-400 uppercase font-sans">Medium Solved</div>
            </div>

            <div className="rounded-xl border border-rose-500/25 bg-rose-950/20 px-3.5 py-2 text-center">
              <div className="text-base font-black text-rose-400">{solvedHard} / {totalHard}</div>
              <div className="text-[10px] text-zinc-400 uppercase font-sans">Hard Solved</div>
            </div>
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="mt-8 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          
          {/* Difficulty Toggles */}
          <div className="flex items-center gap-1.5 bg-[#0c1220] p-1.5 rounded-xl border border-white/[0.1] w-fit">
            {(['All', 'Easy', 'Medium', 'Hard'] as const).map((diff) => (
              <button
                key={diff}
                onClick={() => setSelectedDifficulty(diff)}
                className={`px-3.5 py-1.5 text-xs font-mono rounded-lg transition-all ${
                  selectedDifficulty === diff 
                    ? diff === 'Easy'
                      ? 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40 shadow-sm'
                      : diff === 'Medium'
                      ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40 shadow-sm'
                      : diff === 'Hard'
                      ? 'bg-rose-500/20 text-rose-300 font-bold border border-rose-500/40 shadow-sm'
                      : 'bg-white/[0.15] text-white font-bold border border-white/[0.2] shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {diff}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by title, #, or company..."
              className="w-full rounded-xl border border-white/[0.1] bg-[#0c1220] py-2.5 pl-9 pr-4 text-xs sm:text-sm text-zinc-100 placeholder-zinc-500 focus:border-emerald-500/60 focus:outline-none"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="mt-4 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-lg px-3 py-1.5 text-xs font-mono transition-all border ${
                selectedCategory === cat 
                  ? 'border-emerald-500/40 bg-emerald-950/40 text-emerald-300 font-bold shadow-sm'
                  : 'border-white/[0.08] bg-[#0c1220]/60 text-zinc-400 hover:text-white hover:border-white/[0.16]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Problem Table */}
        <div className="mt-6 rounded-2xl border border-white/[0.1] bg-[#0c1220]/90 shadow-2xl overflow-hidden backdrop-blur-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/[0.08] bg-[#080d18] text-[11px] font-mono uppercase tracking-wider text-zinc-400">
                  <th className="py-3 px-4 w-12 text-center">Status</th>
                  <th className="py-3 px-4">Title</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Difficulty</th>
                  <th className="py-3 px-4">Acceptance</th>
                  <th className="py-3 px-4">Company Tags</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04] text-sm">
                {filteredProblems.map((problem) => (
                  <tr 
                    key={problem.id}
                    className="hover:bg-white/[0.03] transition-colors group cursor-pointer"
                  >
                    {/* Checkbox */}
                    <td className="py-3.5 px-4 text-center">
                      <button 
                        onClick={() => toggleSolved(problem.id)}
                        className="text-zinc-600 hover:text-emerald-400 transition-colors"
                        title={problem.solved ? 'Mark as unsolved' : 'Mark as solved'}
                      >
                        {problem.solved ? (
                          <CheckCircle2 className="h-4 w-4 text-emerald-400 fill-emerald-500/20" />
                        ) : (
                          <Circle className="h-4 w-4 text-zinc-600 hover:text-zinc-400" />
                        )}
                      </button>
                    </td>

                    {/* Title */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2.5">
                        <span className="text-xs font-mono text-zinc-500 w-8">#{problem.id}</span>
                        <a 
                          href="#problems" 
                          className="font-semibold text-zinc-100 group-hover:text-emerald-400 transition-colors"
                        >
                          {problem.title}
                        </a>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3.5 px-4 text-xs font-mono text-zinc-400">
                      {problem.category}
                    </td>

                    {/* Difficulty */}
                    <td className="py-3.5 px-4">
                      <span className={`inline-block rounded-md px-2 py-0.5 text-xs font-mono font-bold border ${getDifficultyBadge(problem.difficulty)}`}>
                        {problem.difficulty}
                      </span>
                    </td>

                    {/* Acceptance */}
                    <td className="py-3.5 px-4 text-xs font-mono text-zinc-300">
                      {problem.acceptance}
                    </td>

                    {/* Company tags */}
                    <td className="py-3.5 px-4">
                      <div className="flex flex-wrap gap-1.5">
                        {problem.companies.slice(0, 2).map((comp, idx) => (
                          <span key={idx} className="rounded-md border border-white/[0.08] bg-white/[0.03] px-2 py-0.5 text-[10px] font-mono text-zinc-300">
                            {comp}
                          </span>
                        ))}
                        {problem.companies.length > 2 && (
                          <span className="text-[10px] font-mono text-zinc-500 self-center">
                            +{problem.companies.length - 2}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Action */}
                    <td className="py-3.5 px-4 text-right">
                      <a 
                        href="#problems"
                        className="inline-flex items-center gap-1 rounded-lg bg-white/[0.05] hover:bg-emerald-500 hover:text-zinc-950 border border-white/[0.08] hover:border-emerald-400 px-3 py-1 text-xs font-mono font-bold text-zinc-200 transition-all"
                      >
                        <span>Solve</span>
                        <ChevronRight className="h-3 w-3" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredProblems.length === 0 && (
            <div className="py-12 text-center text-zinc-500 text-xs font-mono">
              No problems match current filters.
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
