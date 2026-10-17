import React, { useState, useMemo } from 'react';
import { Search, CheckCircle2, Circle, ExternalLink, Filter, Sparkles, Building2, ChevronRight } from 'lucide-react';
import { Problem } from '../types';

const INITIAL_PROBLEMS: Problem[] = [
  { id: 1, title: 'Two Sum', difficulty: 'Easy', acceptance: '52.4%', category: 'Arrays & Hashing', companies: ['Google', 'Meta', 'Amazon'], solved: true },
  { id: 20, title: 'Valid Parentheses', difficulty: 'Easy', acceptance: '41.2%', category: 'Stack', companies: ['Meta', 'Amazon', 'Microsoft'], solved: true },
  { id: 56, title: 'Merge Intervals', difficulty: 'Medium', acceptance: '47.5%', category: 'Intervals', companies: ['Google', 'Uber', 'Bloomberg'], solved: false },
  { id: 3, title: 'Longest Substring Without Repeating Characters', difficulty: 'Medium', acceptance: '35.1%', category: 'Sliding Window', companies: ['Amazon', 'Meta', 'Apple'], solved: false },
  { id: 139, title: 'Word Break', difficulty: 'Medium', acceptance: '46.8%', category: 'Dynamic Programming', companies: ['Meta', 'Amazon'], solved: false },
  { id: 4, title: 'Median of Two Sorted Arrays', difficulty: 'Hard', acceptance: '39.0%', category: 'Binary Search', companies: ['Google', 'Microsoft'], solved: false },
  { id: 70, title: 'Climbing Stairs', difficulty: 'Easy', acceptance: '53.6%', category: 'Dynamic Programming', companies: ['Amazon', 'Google'], solved: true },
  { id: 200, title: 'Number of Islands', difficulty: 'Medium', acceptance: '58.2%', category: 'Graphs', companies: ['Amazon', 'Google', 'Meta'], solved: false },
  { id: 207, title: 'Course Schedule', difficulty: 'Medium', acceptance: '46.0%', category: 'Graphs', companies: ['Google', 'Uber'], solved: false },
  { id: 146, title: 'LRU Cache', difficulty: 'Medium', acceptance: '43.1%', category: 'Design', companies: ['Amazon', 'Microsoft', 'Netflix'], solved: false },
  { id: 23, title: 'Merge k Sorted Lists', difficulty: 'Hard', acceptance: '52.0%', category: 'Heap / Priority Queue', companies: ['Meta', 'Amazon', 'Uber'], solved: false },
  { id: 15, title: '3Sum', difficulty: 'Medium', acceptance: '36.4%', category: 'Two Pointers', companies: ['Google', 'Amazon', 'Apple'], solved: false },
  { id: 42, title: 'Trapping Rain Water', difficulty: 'Hard', acceptance: '44.8%', category: 'Two Pointers', companies: ['Google', 'Meta', 'Goldman Sachs'], solved: false },
  { id: 124, title: 'Binary Tree Maximum Path Sum', difficulty: 'Hard', acceptance: '39.4%', category: 'Trees', companies: ['Meta', 'DoorDash'], solved: false },
];

export const ProblemExplorer: React.FC = () => {
  const [problems, setProblems] = useState<Problem[]>(INITIAL_PROBLEMS);
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

  const getDifficultyColor = (diff: 'Easy' | 'Medium' | 'Hard') => {
    switch (diff) {
      case 'Easy':
        return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
      case 'Medium':
        return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
      case 'Hard':
        return 'text-rose-400 bg-rose-500/10 border-rose-500/20';
    }
  };

  return (
    <section id="dsa" className="py-16 sm:py-20 bg-[#090d18] border-t border-slate-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-950/40 px-3 py-1 text-xs font-mono font-medium text-emerald-400 mb-3">
              <Sparkles className="h-3.5 w-3.5" />
              <span>DSA HUB · 500+ PROBLEMS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Curated Problem Directory
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-300 max-w-2xl">
              Filter by core algorithmic patterns, difficulty tiers, and target companies. Track your completion progress in real-time.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-slate-400">
              Solved: <strong className="text-emerald-400">{problems.filter(p => p.solved).length}</strong> / {problems.length}
            </span>
            <div className="w-24 h-2 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-emerald-400 rounded-full transition-all duration-300"
                style={{ width: `${(problems.filter(p => p.solved).length / problems.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="mt-8 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          
          {/* Difficulty Toggles */}
          <div className="flex items-center gap-1.5 bg-slate-900/90 p-1.5 rounded-xl border border-slate-800 w-fit">
            {(['All', 'Easy', 'Medium', 'Hard'] as const).map((diff) => (
              <button
                key={diff}
                onClick={() => setSelectedDifficulty(diff)}
                className={`px-3 py-1.5 text-xs font-mono rounded-lg transition-all ${
                  selectedDifficulty === diff 
                    ? diff === 'Easy' 
                      ? 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30'
                      : diff === 'Medium'
                      ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30'
                      : diff === 'Hard'
                      ? 'bg-rose-500/20 text-rose-300 font-bold border border-rose-500/30'
                      : 'bg-indigo-600/30 text-white font-bold border border-indigo-500/40'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {diff}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by problem name, #, or company..."
              className="w-full rounded-xl border border-slate-800 bg-slate-900/80 py-2 pl-9 pr-4 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/50"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="mt-4 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-lg px-2.5 py-1 text-xs font-mono transition-colors border ${
                selectedCategory === cat 
                  ? 'border-emerald-500/40 bg-emerald-950/40 text-emerald-300 font-medium'
                  : 'border-slate-800 bg-slate-900/40 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Problems Table */}
        <div className="mt-6 overflow-hidden rounded-xl border border-slate-800 bg-[#0c1220]/80 shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/90 text-[11px] font-mono uppercase tracking-wider text-slate-400">
                  <th className="py-3 px-4 w-12 text-center">Status</th>
                  <th className="py-3 px-4">Title</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Difficulty</th>
                  <th className="py-3 px-4">Acceptance</th>
                  <th className="py-3 px-4">Companies</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-850 text-sm">
                {filteredProblems.map((problem) => (
                  <tr 
                    key={problem.id}
                    className="hover:bg-slate-850/50 transition-colors group cursor-pointer"
                  >
                    {/* Solved Checkbox */}
                    <td className="py-3 px-4 text-center">
                      <button 
                        onClick={() => toggleSolved(problem.id)}
                        className="text-slate-600 hover:text-emerald-400 transition-colors"
                        title={problem.solved ? 'Mark as unsolved' : 'Mark as solved'}
                      >
                        {problem.solved ? (
                          <CheckCircle2 className="h-4 w-4 text-emerald-400 fill-emerald-500/20" />
                        ) : (
                          <Circle className="h-4 w-4" />
                        )}
                      </button>
                    </td>

                    {/* Title */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-slate-500 w-7">#{problem.id}</span>
                        <span className="font-medium text-slate-200 group-hover:text-emerald-300 transition-colors">
                          {problem.title}
                        </span>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3 px-4 text-xs font-mono text-slate-400">
                      {problem.category}
                    </td>

                    {/* Difficulty */}
                    <td className="py-3 px-4">
                      <span className={`inline-block rounded px-2 py-0.5 text-xs font-mono font-semibold border ${getDifficultyColor(problem.difficulty)}`}>
                        {problem.difficulty}
                      </span>
                    </td>

                    {/* Acceptance */}
                    <td className="py-3 px-4 text-xs font-mono text-slate-300">
                      {problem.acceptance}
                    </td>

                    {/* Companies */}
                    <td className="py-3 px-4">
                      <div className="flex flex-wrap gap-1">
                        {problem.companies.slice(0, 2).map((comp, idx) => (
                          <span key={idx} className="rounded bg-slate-800/80 px-1.5 py-0.5 text-[10px] font-mono text-slate-400 border border-slate-700/50">
                            {comp}
                          </span>
                        ))}
                        {problem.companies.length > 2 && (
                          <span className="text-[10px] font-mono text-slate-500 self-center">
                            +{problem.companies.length - 2}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Action */}
                    <td className="py-3 px-4 text-right">
                      <a 
                        href="#editor"
                        className="inline-flex items-center gap-1 rounded-lg bg-slate-800/90 hover:bg-emerald-500 hover:text-slate-950 px-2.5 py-1 text-xs font-mono font-semibold text-slate-300 transition-all"
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
            <div className="py-12 text-center text-slate-400 text-sm font-mono">
              No problems match your current filter criteria.
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
