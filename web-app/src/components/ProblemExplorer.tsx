import React, { useState, useMemo } from 'react';
import { 
  Search, 
  CheckCircle2, 
  Circle, 
  ChevronRight, 
  Zap, 
  Star, 
  Filter, 
  ArrowUpDown, 
  SlidersHorizontal,
  X,
  Play,
  Bookmark,
  Share2
} from 'lucide-react';
import { Problem } from '../types';

interface DetailedProblem extends Problem {
  starred?: boolean;
  frequency: number; // 1-100%
  descriptionSnippet: string;
  similarProblems: string[];
}

interface ProblemExplorerProps {
  onSolveProblem?: (problemId: number | string) => void;
}

const EXTENDED_PROBLEMS: DetailedProblem[] = [
  { 
    id: 1, 
    title: 'Two Sum', 
    difficulty: 'Easy', 
    acceptance: '52.4%', 
    category: 'Arrays & Hashing', 
    companies: ['Google', 'Meta', 'Amazon'], 
    solved: true,
    starred: true,
    frequency: 98,
    descriptionSnippet: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume exactly one solution exists.',
    similarProblems: ['3Sum', '4Sum', 'Two Sum II - Input Array Is Sorted']
  },
  { 
    id: 20, 
    title: 'Valid Parentheses', 
    difficulty: 'Easy', 
    acceptance: '41.2%', 
    category: 'Stack', 
    companies: ['Meta', 'Amazon', 'Microsoft'], 
    solved: true,
    starred: true,
    frequency: 94,
    descriptionSnippet: 'Given a string s containing just the characters "(", ")", "{", "}", "[" and "]", determine if the input string is valid.',
    similarProblems: ['Generate Parentheses', 'Longest Valid Parentheses', 'Remove Invalid Parentheses']
  },
  { 
    id: 56, 
    title: 'Merge Intervals', 
    difficulty: 'Medium', 
    acceptance: '47.5%', 
    category: 'Intervals', 
    companies: ['Google', 'Uber', 'Bloomberg'], 
    solved: false,
    starred: false,
    frequency: 89,
    descriptionSnippet: 'Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals, and return an array of non-overlapping intervals.',
    similarProblems: ['Insert Interval', 'Non-overlapping Intervals', 'Meeting Rooms II']
  },
  { 
    id: 3, 
    title: 'Longest Substring Without Repeating Characters', 
    difficulty: 'Medium', 
    acceptance: '35.1%', 
    category: 'Sliding Window', 
    companies: ['Amazon', 'Meta', 'Apple'], 
    solved: false,
    starred: true,
    frequency: 96,
    descriptionSnippet: 'Given a string s, find the length of the longest substring without duplicate characters.',
    similarProblems: ['Longest Substring with At Most Two Distinct Characters', 'Subarrays with K Different Integers']
  },
  { 
    id: 139, 
    title: 'Word Break', 
    difficulty: 'Medium', 
    acceptance: '46.8%', 
    category: 'Dynamic Programming', 
    companies: ['Meta', 'Amazon'], 
    solved: false,
    starred: false,
    frequency: 82,
    descriptionSnippet: 'Given a string s and a dictionary of strings wordDict, return true if s can be segmented into a space-separated sequence of dictionary words.',
    similarProblems: ['Word Break II', 'Concatenated Words']
  },
  { 
    id: 4, 
    title: 'Median of Two Sorted Arrays', 
    difficulty: 'Hard', 
    acceptance: '39.0%', 
    category: 'Binary Search', 
    companies: ['Google', 'Microsoft'], 
    solved: false,
    starred: false,
    frequency: 91,
    descriptionSnippet: 'Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays in O(log (m+n)) runtime.',
    similarProblems: ['Find K-th Smallest Element in Two Sorted Arrays']
  },
  { 
    id: 70, 
    title: 'Climbing Stairs', 
    difficulty: 'Easy', 
    acceptance: '53.6%', 
    category: 'Dynamic Programming', 
    companies: ['Amazon', 'Google'], 
    solved: true,
    starred: false,
    frequency: 78,
    descriptionSnippet: 'You are climbing a staircase. It takes n steps to reach the top. Each time you can climb 1 or 2 steps. How many distinct ways can you climb to the top?',
    similarProblems: ['Min Cost Climbing Stairs', 'Fibonacci Number', 'House Robber']
  },
  { 
    id: 200, 
    title: 'Number of Islands', 
    difficulty: 'Medium', 
    acceptance: '58.2%', 
    category: 'Graphs', 
    companies: ['Amazon', 'Google', 'Meta'], 
    solved: false,
    starred: true,
    frequency: 97,
    descriptionSnippet: 'Given an m x n 2D binary grid grid which represents a map of "1"s (land) and "0"s (water), return the number of islands.',
    similarProblems: ['Max Area of Island', 'Surrounded Regions', 'Walls and Gates']
  },
  { 
    id: 207, 
    title: 'Course Schedule', 
    difficulty: 'Medium', 
    acceptance: '46.0%', 
    category: 'Graphs', 
    companies: ['Google', 'Uber'], 
    solved: false,
    starred: false,
    frequency: 85,
    descriptionSnippet: 'There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given prerequisites. Return true if you can finish all courses.',
    similarProblems: ['Course Schedule II', 'Alien Dictionary', 'Minimum Height Trees']
  },
  { 
    id: 146, 
    title: 'LRU Cache', 
    difficulty: 'Medium', 
    acceptance: '43.1%', 
    category: 'System Design', 
    companies: ['Amazon', 'Microsoft', 'Netflix'], 
    solved: false,
    starred: true,
    frequency: 95,
    descriptionSnippet: 'Design a data structure that follows the constraints of a Least Recently Used (LRU) cache with O(1) get and put time complexity.',
    similarProblems: ['LFU Cache', 'Design In-Memory File System']
  },
  { 
    id: 23, 
    title: 'Merge k Sorted Lists', 
    difficulty: 'Hard', 
    acceptance: '52.0%', 
    category: 'Heap / Priority Queue', 
    companies: ['Meta', 'Amazon', 'Uber'], 
    solved: false,
    starred: false,
    frequency: 88,
    descriptionSnippet: 'You are given an array of k linked-lists lists, each linked-list is sorted in ascending order. Merge all the linked-lists into one sorted linked-list and return it.',
    similarProblems: ['Merge Two Sorted Lists', 'Ugly Number II']
  },
  { 
    id: 15, 
    title: '3Sum', 
    difficulty: 'Medium', 
    acceptance: '36.4%', 
    category: 'Two Pointers', 
    companies: ['Google', 'Amazon', 'Apple'], 
    solved: false,
    starred: true,
    frequency: 93,
    descriptionSnippet: 'Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.',
    similarProblems: ['3Sum Closest', '4Sum']
  },
];

export const ProblemExplorer: React.FC<ProblemExplorerProps> = ({ onSolveProblem }) => {
  const [problems, setProblems] = useState<DetailedProblem[]>(EXTENDED_PROBLEMS);
  const [selectedDifficulty, setSelectedDifficulty] = useState<'All' | 'Easy' | 'Medium' | 'Hard'>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showOnlyStarred, setShowOnlyStarred] = useState(false);
  
  // Interactive Drawer for selected problem preview
  const [previewProblem, setPreviewProblem] = useState<DetailedProblem | null>(EXTENDED_PROBLEMS[0]);

  const categories = ['All', 'Arrays & Hashing', 'Two Pointers', 'Sliding Window', 'Graphs', 'Dynamic Programming', 'System Design'];

  const filteredProblems = useMemo(() => {
    return problems.filter((prob) => {
      const matchDiff = selectedDifficulty === 'All' || prob.difficulty === selectedDifficulty;
      const matchCat = selectedCategory === 'All' || prob.category === selectedCategory;
      const matchSearch = prob.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          prob.id.toString().includes(searchQuery) ||
                          prob.companies.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchStar = !showOnlyStarred || prob.starred;
      return matchDiff && matchCat && matchSearch && matchStar;
    });
  }, [problems, selectedDifficulty, selectedCategory, searchQuery, showOnlyStarred]);

  const toggleSolved = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setProblems(prev => prev.map(p => p.id === id ? { ...p, solved: !p.solved } : p));
  };

  const toggleStarred = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setProblems(prev => prev.map(p => p.id === id ? { ...p, starred: !p.starred } : p));
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

  return (
    <section id="problems" className="py-20 bg-[#080c16] border-b border-white/[0.08]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/[0.08]">
          <div className="max-w-2xl">
            <div className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-2 mb-2">
              <Zap className="h-4 w-4" />
              Curated Problem Directory
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Master Algorithmic Patterns
            </h2>
            <p className="mt-2 text-sm sm:text-base text-zinc-300">
              Filter 520 curated problems with instant test previews, real company frequency weightings, and acceptance rates.
            </p>
          </div>

          {/* Quick Filter Pill Buttons */}
          <div className="flex items-center gap-2 font-mono text-xs">
            <button
              onClick={() => setShowOnlyStarred(!showOnlyStarred)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-colors ${
                showOnlyStarred 
                  ? 'border-amber-500/40 bg-amber-500/20 text-amber-300 font-bold'
                  : 'border-white/[0.08] bg-[#0c1220] text-zinc-400 hover:text-white'
              }`}
            >
              <Star className={`h-3.5 w-3.5 ${showOnlyStarred ? 'fill-amber-400 text-amber-400' : ''}`} />
              <span>Starred ({problems.filter(p => p.starred).length})</span>
            </button>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="mt-8 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          
          {/* Difficulty Toggles */}
          <div className="flex items-center gap-1 bg-[#0c1220] p-1.5 rounded-xl border border-white/[0.1] w-fit">
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

          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, #id, or company (e.g. Google)..."
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

        {/* 2-Column Split: Problem Table on Left, Live Problem Drawer Preview on Right */}
        <div className="mt-6 grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
          
          {/* Main Problem Table (8 cols on XL) */}
          <div className="xl:col-span-8 rounded-2xl border border-white/[0.1] bg-[#0c1220]/90 shadow-2xl overflow-hidden backdrop-blur-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/[0.08] bg-[#080d18] text-[11px] font-mono uppercase tracking-wider text-zinc-400">
                    <th className="py-3 px-3 w-10 text-center">Status</th>
                    <th className="py-3 px-2 w-8 text-center">★</th>
                    <th className="py-3 px-3">Title</th>
                    <th className="py-3 px-3">Difficulty</th>
                    <th className="py-3 px-3">Acceptance</th>
                    <th className="py-3 px-3">Frequency</th>
                    <th className="py-3 px-3">Companies</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04] text-xs">
                  {filteredProblems.map((problem) => {
                    const isSelected = previewProblem?.id === problem.id;
                    return (
                      <tr 
                        key={problem.id}
                        onClick={() => setPreviewProblem(problem)}
                        className={`transition-colors group cursor-pointer ${
                          isSelected ? 'bg-emerald-500/10 border-l-2 border-emerald-400' : 'hover:bg-white/[0.03]'
                        }`}
                      >
                        {/* Checkbox */}
                        <td className="py-3 px-3 text-center">
                          <button 
                            onClick={(e) => toggleSolved(problem.id, e)}
                            className="text-zinc-600 hover:text-emerald-400 transition-colors"
                            title={problem.solved ? 'Mark uncompleted' : 'Mark completed'}
                          >
                            {problem.solved ? (
                              <CheckCircle2 className="h-4 w-4 text-emerald-400 fill-emerald-500/20" />
                            ) : (
                              <Circle className="h-4 w-4 text-zinc-600 hover:text-zinc-400" />
                            )}
                          </button>
                        </td>

                        {/* Star */}
                        <td className="py-3 px-2 text-center">
                          <button 
                            onClick={(e) => toggleStarred(problem.id, e)}
                            className="text-zinc-600 hover:text-amber-400 transition-colors"
                          >
                            <Star className={`h-3.5 w-3.5 ${problem.starred ? 'fill-amber-400 text-amber-400' : ''}`} />
                          </button>
                        </td>

                        {/* Title & Pattern */}
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-mono text-zinc-500 w-7">#{problem.id}</span>
                            <span className={`font-semibold transition-colors ${
                              isSelected ? 'text-emerald-400' : 'text-zinc-200 group-hover:text-white'
                            }`}>
                              {problem.title}
                            </span>
                          </div>
                          <div className="text-[10px] font-mono text-zinc-500 pl-9">
                            {problem.category}
                          </div>
                        </td>

                        {/* Difficulty */}
                        <td className="py-3 px-3">
                          <span className={`inline-block rounded px-2 py-0.5 text-[11px] font-mono font-bold border ${getDifficultyBadge(problem.difficulty)}`}>
                            {problem.difficulty}
                          </span>
                        </td>

                        {/* Acceptance */}
                        <td className="py-3 px-3 font-mono text-zinc-300">
                          {problem.acceptance}
                        </td>

                        {/* Frequency bar */}
                        <td className="py-3 px-3">
                          <div className="w-16 bg-white/[0.06] rounded-full h-1.5 overflow-hidden">
                            <div 
                              className="bg-amber-400 h-full rounded-full" 
                              style={{ width: `${problem.frequency}%` }}
                              title={`${problem.frequency}% Interview Frequency`}
                            />
                          </div>
                        </td>

                        {/* Companies */}
                        <td className="py-3 px-3">
                          <div className="flex flex-wrap gap-1">
                            {problem.companies.slice(0, 2).map((comp, idx) => (
                              <span key={idx} className="rounded border border-white/[0.08] bg-white/[0.03] px-1.5 py-0.2 text-[10px] font-mono text-zinc-300">
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
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {filteredProblems.length === 0 && (
              <div className="py-12 text-center text-zinc-500 text-xs font-mono">
                No problems match current filters.
              </div>
            )}
          </div>

          {/* Problem Preview Drawer (4 cols on XL) */}
          <div className="xl:col-span-4 rounded-2xl border border-white/[0.1] bg-[#0c1220]/95 p-6 backdrop-blur-xl shadow-2xl font-mono text-xs">
            {previewProblem ? (
              <div className="space-y-4">
                
                {/* Header */}
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-zinc-400">#{previewProblem.id}</span>
                    <span className={`rounded px-2 py-0.5 text-[10px] font-bold border ${getDifficultyBadge(previewProblem.difficulty)}`}>
                      {previewProblem.difficulty}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={(e) => toggleStarred(previewProblem.id, e)}
                      className="p-1 rounded hover:bg-white/[0.05] text-zinc-400 hover:text-amber-400"
                    >
                      <Star className={`h-4 w-4 ${previewProblem.starred ? 'fill-amber-400 text-amber-400' : ''}`} />
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-black text-white font-sans tracking-tight">
                    {previewProblem.title}
                  </h3>
                  <div className="text-[11px] text-zinc-400 mt-0.5">
                    Topic: <strong className="text-emerald-400">{previewProblem.category}</strong>
                  </div>
                </div>

                {/* Problem snippet description */}
                <div className="rounded-xl border border-white/[0.08] bg-black/40 p-4 font-sans text-xs text-zinc-300 leading-relaxed">
                  <div className="font-mono text-[10px] uppercase tracking-wider text-zinc-500 mb-1.5 font-bold">
                    Problem Summary
                  </div>
                  {previewProblem.descriptionSnippet}
                </div>

                {/* Company & Frequency breakdown */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-zinc-500">Interview Frequency</span>
                    <span className="text-amber-400 font-bold">{previewProblem.frequency}% Weight</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {previewProblem.companies.map((c, i) => (
                      <span key={i} className="rounded-md border border-white/[0.08] bg-white/[0.04] px-2 py-0.5 text-[10px] text-zinc-200">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Similar recommended problems */}
                <div className="pt-2">
                  <div className="text-[10px] uppercase text-zinc-500 font-bold mb-1.5">Similar Invariants</div>
                  <div className="space-y-1">
                    {previewProblem.similarProblems.map((sim, i) => (
                      <div key={i} className="text-zinc-400 hover:text-emerald-400 cursor-pointer flex items-center justify-between text-[11px]">
                        <span>• {sim}</span>
                        <ChevronRight className="h-3 w-3 text-zinc-600" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Solve CTA */}
                <div className="pt-4 border-t border-white/[0.08]">
                  <button
                    onClick={() => onSolveProblem ? onSolveProblem(previewProblem.id) : undefined}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 py-3 text-xs font-bold text-zinc-950 shadow-lg shadow-emerald-500/25 transition-all"
                  >
                    <Play className="h-3.5 w-3.5 fill-zinc-950" />
                    <span>Open in Code Editor</span>
                  </button>
                </div>

              </div>
            ) : (
              <div className="py-16 text-center text-zinc-500 italic">
                Select any problem from the table to inspect details.
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
