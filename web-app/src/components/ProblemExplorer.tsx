import React, { useState, useMemo } from 'react';
import { 
  Zap, 
  Star, 
  Filter, 
  ChevronRight, 
  Play,
  Bookmark,
  Share2
} from 'lucide-react';
import { Problem } from '../types';
import { SectionHeader } from './atoms/SectionHeader';
import { SearchInput } from './molecules/SearchInput';
import { TabGroup } from './atoms/TabGroup';
import { ProblemRow, ProblemRowData } from './molecules/ProblemRow';
import { Card } from './atoms/Card';
import { DifficultyBadge } from './atoms/Badge';
import { Badge } from './atoms/Badge';
import { Button } from './atoms/Button';

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
    descriptionSnippet: 'Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays with O(log (m+n)) runtime.',
    similarProblems: ['K-th Element of Two Sorted Arrays', 'Find Median from Data Stream']
  },
  { 
    id: 70, 
    title: 'Climbing Stairs', 
    difficulty: 'Easy', 
    acceptance: '53.1%', 
    category: 'Dynamic Programming', 
    companies: ['Amazon', 'Apple'], 
    solved: true,
    starred: false,
    frequency: 76,
    descriptionSnippet: 'You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?',
    similarProblems: ['Min Cost Climbing Stairs', 'Fibonacci Number']
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

  const toggleSolved = (id: number | string, e: React.MouseEvent) => {
    e.stopPropagation();
    setProblems(prev => prev.map(p => p.id === id ? { ...p, solved: !p.solved } : p));
  };

  const toggleStarred = (id: number | string, e: React.MouseEvent) => {
    e.stopPropagation();
    setProblems(prev => prev.map(p => p.id === id ? { ...p, starred: !p.starred } : p));
  };

  return (
    <section id="problems" className="py-16 bg-[#07090e]">
      <div className="mx-auto max-w-[1720px] px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Unified Section Header Atom */}
        <SectionHeader
          eyebrow="Curated Problem Directory"
          eyebrowIcon={<Zap className="w-3.5 h-3.5" />}
          eyebrowColor="emerald"
          title="Master Algorithmic Patterns"
          highlightText="Without Burnout"
          subtitle="Filter 520 curated problems with instant test previews, real company frequency weightings, and acceptance rates."
          action={
            <Button
              variant={showOnlyStarred ? 'amber' : 'secondary'}
              size="sm"
              icon={<Star className={`w-3.5 h-3.5 ${showOnlyStarred ? 'fill-amber-400' : ''}`} />}
              onClick={() => setShowOnlyStarred(!showOnlyStarred)}
            >
              Starred Favorites
            </Button>
          }
        />

        {/* Search & Topic Filters Bar */}
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
          <div className="w-full md:max-w-md">
            <SearchInput
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search problem, company (Google, Meta), or ID..."
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <TabGroup
              tabs={[
                { id: 'All', label: 'All' },
                { id: 'Easy', label: 'Easy' },
                { id: 'Medium', label: 'Medium' },
                { id: 'Hard', label: 'Hard' }
              ]}
              activeTab={selectedDifficulty}
              onChange={(val) => setSelectedDifficulty(val as any)}
            />

            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="bg-[#0c101c] border border-white/[0.08] rounded-xl px-3 py-1.5 text-xs text-zinc-300 focus:outline-none focus:border-emerald-500/50 font-mono"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        {/* 2-Column Responsive Layout: Table + Preview Drawer */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
          
          {/* Problem Table Card (8 cols on XL) */}
          <Card variant="surface" padding="none" className="xl:col-span-8 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-white/[0.08] bg-[#0c101c]/90 text-[11px] font-mono font-semibold uppercase tracking-wider text-zinc-400">
                    <th className="py-3 px-3 w-10 text-center">Status</th>
                    <th className="py-3 px-2 w-8 text-center">Star</th>
                    <th className="py-3 px-3">Title & Pattern</th>
                    <th className="py-3 px-3">Difficulty</th>
                    <th className="py-3 px-3">Acceptance</th>
                    <th className="py-3 px-3">Frequency</th>
                    <th className="py-3 px-3">Top Companies</th>
                    <th className="py-3 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.03]">
                  {filteredProblems.map((problem) => (
                    <ProblemRow
                      key={problem.id}
                      problem={problem}
                      isSelected={previewProblem?.id === problem.id}
                      onSelect={() => setPreviewProblem(problem)}
                      onSolve={() => onSolveProblem && onSolveProblem(problem.id)}
                      onToggleSolved={(e) => toggleSolved(problem.id, e)}
                      onToggleStarred={(e) => toggleStarred(problem.id, e)}
                    />
                  ))}
                </tbody>
              </table>
            </div>

            {filteredProblems.length === 0 && (
              <div className="py-12 text-center text-zinc-500 text-xs font-mono">
                No problems match your current search and filter criteria.
              </div>
            )}
          </Card>

          {/* Problem Preview Drawer Card (4 cols on XL) */}
          <Card variant="surface" padding="md" className="xl:col-span-4 sticky top-20 space-y-4">
            {previewProblem ? (
              <div className="space-y-4 font-mono text-xs">
                
                {/* Header */}
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-zinc-400 font-mono">#{previewProblem.id}</span>
                    <DifficultyBadge difficulty={previewProblem.difficulty} size="sm" />
                  </div>
                  <button 
                    onClick={(e) => toggleStarred(previewProblem.id, e)}
                    className="p-1 rounded hover:bg-white/[0.05] text-zinc-400 hover:text-amber-400 cursor-pointer"
                  >
                    <Star className={`h-4 w-4 ${previewProblem.starred ? 'fill-amber-400 text-amber-400' : ''}`} />
                  </button>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white font-sans tracking-tight">
                    {previewProblem.title}
                  </h3>
                  <div className="text-[11px] text-zinc-400 mt-0.5">
                    Topic: <strong className="text-emerald-400 font-sans">{previewProblem.category}</strong>
                  </div>
                </div>

                {/* Problem Summary snippet */}
                <div className="rounded-xl border border-white/[0.08] bg-zinc-950/70 p-3.5 font-sans text-xs text-zinc-300 leading-relaxed">
                  <div className="font-mono text-[10px] uppercase tracking-wider text-zinc-500 mb-1.5 font-bold">
                    Problem Summary
                  </div>
                  {previewProblem.descriptionSnippet}
                </div>

                {/* Interview frequency & company tags */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-zinc-500">Interview Frequency</span>
                    <span className="text-amber-400 font-bold">{previewProblem.frequency}% Weight</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {previewProblem.companies.map((c, i) => (
                      <Badge key={i} variant="neutral" size="xs">
                        {c}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Similar Invariants */}
                <div className="pt-2">
                  <div className="text-[10px] uppercase text-zinc-500 font-bold mb-1.5">Similar Invariants</div>
                  <div className="space-y-1">
                    {previewProblem.similarProblems.map((sim, i) => (
                      <div key={i} className="text-zinc-400 hover:text-emerald-400 cursor-pointer flex items-center justify-between text-[11px] font-sans">
                        <span>• {sim}</span>
                        <ChevronRight className="h-3 w-3 text-zinc-600" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Direct Solve CTA Button */}
                <div className="pt-3 border-t border-white/[0.08]">
                  <Button
                    variant="primary"
                    size="md"
                    icon={<Play className="w-3.5 h-3.5 fill-current" />}
                    onClick={() => onSolveProblem && onSolveProblem(previewProblem.id)}
                    className="w-full font-bold"
                  >
                    Open in Code Editor
                  </Button>
                </div>

              </div>
            ) : (
              <div className="py-16 text-center text-zinc-500 italic text-xs font-mono">
                Select any problem from the table to inspect details.
              </div>
            )}
          </Card>

        </div>

      </div>
    </section>
  );
};
