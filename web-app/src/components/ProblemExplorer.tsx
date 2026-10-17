import React, { useState, useMemo } from 'react';
import { Search, CheckCircle2, Circle, ChevronRight, FileText } from 'lucide-react';
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
        return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
      case 'Medium':
        return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
      case 'Hard':
        return 'text-rose-400 bg-rose-500/10 border-rose-500/20';
    }
  };

  const solvedCount = problems.filter(p => p.solved).length;

  return (
    <section id="problems" className="py-16 sm:py-20 bg-[#090a0f] border-b border-white/[0.08]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-white/[0.08]">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-zinc-500 font-medium mb-1">
              Curated Problem Catalog
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Problems & Learning Paths
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-zinc-400">
              Completed: <strong className="text-white">{solvedCount}</strong> / {problems.length}
            </span>
            <div className="w-28 h-1.5 bg-white/[0.08] rounded-full overflow-hidden">
              <div 
                className="h-full bg-emerald-400 rounded-full transition-all duration-300"
                style={{ width: `${(solvedCount / problems.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Filter controls */}
        <div className="mt-6 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
          
          {/* Difficulty Toggles */}
          <div className="flex items-center gap-1 bg-white/[0.02] p-1 rounded-md border border-white/[0.08] w-fit">
            {(['All', 'Easy', 'Medium', 'Hard'] as const).map((diff) => (
              <button
                key={diff}
                onClick={() => setSelectedDifficulty(diff)}
                className={`px-3 py-1 text-xs font-mono rounded transition-colors ${
                  selectedDifficulty === diff 
                    ? 'bg-white/[0.1] text-white font-medium border border-white/[0.12]'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {diff}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by title, #, or company..."
              className="w-full rounded-md border border-white/[0.08] bg-white/[0.03] py-1.5 pl-8 pr-3 text-xs text-zinc-200 placeholder-zinc-500 focus:border-white/[0.2] focus:outline-none"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded px-2.5 py-1 text-xs font-mono transition-colors border ${
                selectedCategory === cat 
                  ? 'border-white/[0.2] bg-white/[0.08] text-white font-medium'
                  : 'border-white/[0.06] bg-white/[0.02] text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Problem Table */}
        <div className="mt-6 rounded-lg border border-white/[0.08] bg-[#0c0e16] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/[0.08] bg-white/[0.02] text-[11px] font-mono uppercase tracking-wider text-zinc-500">
                  <th className="py-2.5 px-3 w-10 text-center">Status</th>
                  <th className="py-2.5 px-3">Title</th>
                  <th className="py-2.5 px-3">Category</th>
                  <th className="py-2.5 px-3">Difficulty</th>
                  <th className="py-2.5 px-3">Acceptance</th>
                  <th className="py-2.5 px-3">Company Tags</th>
                  <th className="py-2.5 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04] text-xs">
                {filteredProblems.map((problem) => (
                  <tr 
                    key={problem.id}
                    className="hover:bg-white/[0.02] transition-colors group"
                  >
                    {/* Solved checkmark */}
                    <td className="py-2.5 px-3 text-center">
                      <button 
                        onClick={() => toggleSolved(problem.id)}
                        className="text-zinc-600 hover:text-emerald-400 transition-colors"
                        title={problem.solved ? 'Mark as uncompleted' : 'Mark as completed'}
                      >
                        {problem.solved ? (
                          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                        ) : (
                          <Circle className="h-4 w-4" />
                        )}
                      </button>
                    </td>

                    {/* Title */}
                    <td className="py-2.5 px-3">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-mono text-zinc-500 w-8">#{problem.id}</span>
                        <a 
                          href="#problems" 
                          className="font-medium text-zinc-200 hover:text-white transition-colors"
                        >
                          {problem.title}
                        </a>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-2.5 px-3 font-mono text-[11px] text-zinc-400">
                      {problem.category}
                    </td>

                    {/* Difficulty */}
                    <td className="py-2.5 px-3">
                      <span className={`inline-block rounded px-1.5 py-0.2 text-[11px] font-mono font-medium border ${getDifficultyBadge(problem.difficulty)}`}>
                        {problem.difficulty}
                      </span>
                    </td>

                    {/* Acceptance */}
                    <td className="py-2.5 px-3 font-mono text-[11px] text-zinc-400">
                      {problem.acceptance}
                    </td>

                    {/* Company tags */}
                    <td className="py-2.5 px-3">
                      <div className="flex flex-wrap gap-1">
                        {problem.companies.slice(0, 2).map((comp, idx) => (
                          <span key={idx} className="rounded border border-white/[0.06] bg-white/[0.02] px-1.5 py-0.2 text-[10px] font-mono text-zinc-400">
                            {comp}
                          </span>
                        ))}
                        {problem.companies.length > 2 && (
                          <span className="text-[10px] font-mono text-zinc-600 self-center">
                            +{problem.companies.length - 2}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Action */}
                    <td className="py-2.5 px-3 text-right">
                      <a 
                        href="#problems"
                        className="inline-flex items-center gap-1 rounded border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.08] px-2 py-1 text-[11px] font-mono text-zinc-300 transition-colors"
                      >
                        <span>Solve</span>
                        <ChevronRight className="h-3 w-3 text-zinc-500" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredProblems.length === 0 && (
            <div className="py-10 text-center text-zinc-500 text-xs font-mono">
              No problems match current filters.
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
