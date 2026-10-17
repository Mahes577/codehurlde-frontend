import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Lock, 
  Play, 
  ChevronRight, 
  BookOpen, 
  Compass, 
  Target, 
  Sparkles, 
  Flame, 
  Layers, 
  ArrowRight,
  Clock,
  Code2
} from 'lucide-react';

interface TopicNode {
  id: number;
  slug: string;
  numberStr: string;
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'locked';
  totalProblems: number;
  solvedProblems: number;
  keyConcepts: string[];
  featuredProblem?: {
    id: string;
    title: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
  };
}

const TOPICS_DATA: TopicNode[] = [
  {
    id: 1,
    slug: 'basics',
    numberStr: '01',
    title: 'Basics & Complexity Analysis',
    description: 'Time and space complexity bounds, Big-O invariants, basic loop idioms, and asymptotic notation.',
    status: 'completed',
    totalProblems: 12,
    solvedProblems: 12,
    keyConcepts: ['Big-O Notation', 'Space Trade-offs', 'Best/Worst/Average Cases'],
    featuredProblem: { id: 'p1', title: 'Find Maximum Element', difficulty: 'Easy' }
  },
  {
    id: 2,
    slug: 'number-theory',
    numberStr: '02',
    title: 'Number Theory & Math',
    description: 'Divisibility, Prime Factorization, Sieve of Eratosthenes, Modular Arithmetic, and GCD.',
    status: 'completed',
    totalProblems: 18,
    solvedProblems: 18,
    keyConcepts: ['Sieve', 'GCD & LCM', 'Modular Exponentiation'],
    featuredProblem: { id: 'p2', title: 'Prime Multiplicity', difficulty: 'Medium' }
  },
  {
    id: 3,
    slug: 'bit-manipulation',
    numberStr: '03',
    title: 'Bit Manipulation',
    description: 'Bitwise masks, XOR tricks, single number variants, power of two checks, and lowbit operations.',
    status: 'completed',
    totalProblems: 16,
    solvedProblems: 16,
    keyConcepts: ['Bitwise XOR', 'Bitmask DP Prep', 'Two’s Complement'],
    featuredProblem: { id: 'p3', title: 'Counting Bits', difficulty: 'Easy' }
  },
  {
    id: 4,
    slug: 'arrays',
    numberStr: '04',
    title: 'Arrays & Prefix Sums',
    description: 'Subarray problems, prefix sums, Kadane’s algorithm, in-place rotation, and Dutch National Flag.',
    status: 'completed',
    totalProblems: 28,
    solvedProblems: 28,
    keyConcepts: ['Prefix Sums', 'Kadane Algo', 'Difference Arrays'],
    featuredProblem: { id: 'p4', title: 'Maximum Subarray', difficulty: 'Medium' }
  },
  {
    id: 5,
    slug: 'strings',
    numberStr: '05',
    title: 'Strings & Encoding',
    description: 'Palindromes, string manipulation, anagram detection, string hashing, and rolling polynomial hash.',
    status: 'completed',
    totalProblems: 20,
    solvedProblems: 20,
    keyConcepts: ['Anagrams', 'String Matching', 'Palindrome Substrings'],
    featuredProblem: { id: 'p5', title: 'Group Anagrams', difficulty: 'Medium' }
  },
  {
    id: 6,
    slug: 'hashing',
    numberStr: '06',
    title: 'Hashing & Frequency Maps',
    description: 'Hash tables, collision handling, frequency arrays, hash set lookups, and 2-Sum / 3-Sum patterns.',
    status: 'completed',
    totalProblems: 24,
    solvedProblems: 24,
    keyConcepts: ['Lookup Tables', 'Hash Sets', 'Subarray Sum Equals K'],
    featuredProblem: { id: 'p6', title: 'Two Sum', difficulty: 'Easy' }
  },
  {
    id: 7,
    slug: 'two-pointers',
    numberStr: '07',
    title: 'Two Pointers Pattern',
    description: 'Opposite direction pointers, same direction fast/slow pointers, Container with Most Water, 3Sum.',
    status: 'completed',
    totalProblems: 22,
    solvedProblems: 22,
    keyConcepts: ['Opposite Pointers', 'Fast & Slow', 'Sorted Array Traversal'],
    featuredProblem: { id: 'p7', title: 'Container With Most Water', difficulty: 'Medium' }
  },
  {
    id: 8,
    slug: 'sliding-window',
    numberStr: '08',
    title: 'Sliding Window',
    description: 'Fixed-size window, dynamic window expansion/contraction, Longest Substring Without Repeating Characters.',
    status: 'completed',
    totalProblems: 20,
    solvedProblems: 20,
    keyConcepts: ['Variable Windows', 'Fixed Windows', 'Subarray Constraints'],
    featuredProblem: { id: 'p8', title: 'Minimum Size Subarray Sum', difficulty: 'Medium' }
  },
  {
    id: 9,
    slug: 'sorting',
    numberStr: '09',
    title: 'Sorting Algorithms',
    description: 'Merge Sort, Quick Sort with randomized pivot, Counting Sort, Inversion counting, and comparator lambdas.',
    status: 'completed',
    totalProblems: 15,
    solvedProblems: 15,
    keyConcepts: ['Merge Inversions', 'Quickselect', 'Custom Comparators'],
    featuredProblem: { id: 'p9', title: 'Sort Colors', difficulty: 'Medium' }
  },
  {
    id: 10,
    slug: 'binary-search',
    numberStr: '10',
    title: 'Binary Search & Monotonicity',
    description: 'Classical search, binary search on answers (predicate functions), lower/upper bound, rotated arrays.',
    status: 'in-progress',
    totalProblems: 26,
    solvedProblems: 18,
    keyConcepts: ['Predicate Search', 'Search Space Pruning', 'Rotated Sorted Arrays'],
    featuredProblem: { id: '4b936e2c-cb8c-45c2-abcd-27e55f71b228', title: 'Roll Number Lookup', difficulty: 'Medium' }
  },
  {
    id: 11,
    slug: 'recursion',
    numberStr: '11',
    title: 'Recursion & Backtracking',
    description: 'Subsets generation, permutations, combination sum, N-Queens, Sudoku solver, recursion trees.',
    status: 'in-progress',
    totalProblems: 24,
    solvedProblems: 12,
    keyConcepts: ['State Space Tree', 'Pruning', 'Subsets & Permutations'],
    featuredProblem: { id: 'p11', title: 'Subsets II', difficulty: 'Medium' }
  },
  {
    id: 12,
    slug: 'linked-lists',
    numberStr: '12',
    title: 'Linked Lists & Fast/Slow',
    description: 'Cycle detection (Floyd’s algorithm), reversal, merge k sorted lists, LRU cache node manipulation.',
    status: 'in-progress',
    totalProblems: 18,
    solvedProblems: 10,
    keyConcepts: ['Floyd Cycle', 'Reverse Pointers', 'Dummy Head Technique'],
    featuredProblem: { id: 'p12', title: 'Merge Two Sorted Lists', difficulty: 'Easy' }
  },
  {
    id: 13,
    slug: 'stacks-queues',
    numberStr: '13',
    title: 'Stacks, Queues & Monotonic Stack',
    description: 'Next Greater Element, Largest Rectangle in Histogram, Daily Temperatures, Min Stack, sliding max queue.',
    status: 'locked',
    totalProblems: 22,
    solvedProblems: 0,
    keyConcepts: ['Monotonic Stack', 'Deque Window', 'Balanced Parentheses'],
    featuredProblem: { id: 'p13', title: 'Daily Temperatures', difficulty: 'Medium' }
  },
  {
    id: 14,
    slug: 'trees',
    numberStr: '14',
    title: 'Binary Trees & Traversals',
    description: 'DFS (Pre/In/Post order), BFS level-order, maximum depth, diameter of binary tree, LCA (Lowest Common Ancestor).',
    status: 'locked',
    totalProblems: 30,
    solvedProblems: 0,
    keyConcepts: ['Tree Recursion', 'LCA Invariant', 'Level Order BFS'],
    featuredProblem: { id: 'p14', title: 'Binary Tree Level Order Traversal', difficulty: 'Medium' }
  },
  {
    id: 15,
    slug: 'graphs',
    numberStr: '15',
    title: 'Graphs: BFS, DFS & Cycles',
    description: 'Adjacency list, connected components, cycle detection, topological sort (Kahn’s algo), bipartite check.',
    status: 'locked',
    totalProblems: 28,
    solvedProblems: 0,
    keyConcepts: ['Kahn’s Topological Sort', 'DFS Visited States', 'Bipartite Graphs'],
    featuredProblem: { id: 'p15', title: 'Course Schedule II', difficulty: 'Medium' }
  },
  {
    id: 16,
    slug: 'dynamic-programming-1d',
    numberStr: '16',
    title: 'Dynamic Programming: 1D',
    description: 'Climbing stairs, House Robber, Coin Change, Longest Increasing Subsequence (LIS O(n log n)).',
    status: 'locked',
    totalProblems: 32,
    solvedProblems: 0,
    keyConcepts: ['Memoization vs Tabulation', 'Optimal Substructure', 'LIS Patience Sort'],
    featuredProblem: { id: 'p16', title: 'Coin Change', difficulty: 'Medium' }
  }
];

interface RoadmapViewProps {
  onSelectProblem?: (problemId: string) => void;
}

export const RoadmapView: React.FC<RoadmapViewProps> = ({ onSelectProblem }) => {
  const [selectedTopic, setSelectedTopic] = useState<TopicNode>(TOPICS_DATA[9]); // Binary search default

  const totalCurriculumProblems = TOPICS_DATA.reduce((acc, t) => acc + t.totalProblems, 0);
  const totalCompletedProblems = TOPICS_DATA.reduce((acc, t) => acc + t.solvedProblems, 0);
  const completionPercentage = Math.round((totalCompletedProblems / totalCurriculumProblems) * 100);

  return (
    <div className="min-h-screen bg-[#07090e] text-zinc-100 py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Hero */}
        <div className="rounded-2xl bg-zinc-900/60 border border-zinc-800/80 p-6 md:p-8 relative overflow-hidden backdrop-blur-xl">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono mb-3">
                <Compass className="w-3.5 h-3.5" />
                <span>CodeHurdle Official 29-Topic DSA Syllabus</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                Structured Algorithmic Learning Path
              </h1>
              <p className="text-sm text-zinc-400 mt-2 max-w-2xl leading-relaxed">
                Master competitive programming and technical interviews through a disciplined progression from foundational complexity analysis to advanced graph invariants.
              </p>
            </div>

            {/* Global Progress Card */}
            <div className="p-4 rounded-xl bg-zinc-950/70 border border-zinc-800/80 min-w-[240px] space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-400">Curriculum Progress</span>
                <span className="text-emerald-400 font-mono font-bold">{completionPercentage}%</span>
              </div>
              <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-400 h-full rounded-full transition-all duration-500" style={{ width: `${completionPercentage}%` }}></div>
              </div>
              <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 pt-1">
                <span>{totalCompletedProblems} Problems Solved</span>
                <span>{totalCurriculumProblems} Total</span>
              </div>
            </div>
          </div>
        </div>

        {/* Two Column Layout: Topic List on Left, Active Topic Deep-Dive on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Topic Progression Stream (Col 1-7) */}
          <div className="lg:col-span-7 space-y-3">
            <div className="flex items-center justify-between pb-1">
              <h2 className="text-base font-semibold text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-emerald-400" />
                <span>Sequential Curriculum Milestones</span>
              </h2>
              <span className="text-xs text-zinc-500 font-mono">16 Tracks Displayed</span>
            </div>

            <div className="space-y-2.5">
              {TOPICS_DATA.map(topic => {
                const isSelected = selectedTopic.id === topic.id;
                return (
                  <div
                    key={topic.id}
                    onClick={() => setSelectedTopic(topic)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'bg-zinc-800/80 border-emerald-500/50 shadow-lg shadow-emerald-950/20'
                        : topic.status === 'locked'
                        ? 'bg-zinc-950/40 border-zinc-800/40 opacity-70 hover:opacity-100 hover:border-zinc-700'
                        : 'bg-zinc-900/50 border-zinc-800/80 hover:border-zinc-700'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      {/* Topic Number & Status Icon */}
                      <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-zinc-950 border border-zinc-800 shrink-0 font-mono font-bold text-xs">
                        {topic.status === 'completed' ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                        ) : topic.status === 'in-progress' ? (
                          <span className="text-amber-400">{topic.numberStr}</span>
                        ) : (
                          <Lock className="w-4 h-4 text-zinc-600" />
                        )}
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className={`text-sm font-semibold ${isSelected ? 'text-white' : 'text-zinc-200'}`}>
                            {topic.title}
                          </h3>
                          {topic.status === 'in-progress' && (
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30">
                              Active
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-zinc-400 line-clamp-1 mt-0.5">
                          {topic.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-right shrink-0">
                      <div className="hidden sm:block">
                        <div className="text-xs font-mono text-zinc-300">
                          {topic.solvedProblems} / {topic.totalProblems}
                        </div>
                        <div className="text-[10px] text-zinc-500">Solved</div>
                      </div>
                      <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? 'text-emerald-400 rotate-90 sm:rotate-0' : 'text-zinc-600'}`} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Active Topic Detail Inspector (Col 8-12) */}
          <div className="lg:col-span-5">
            <div className="sticky top-20 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 p-6 space-y-6 backdrop-blur-xl">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">
                    Track #{selectedTopic.numberStr}
                  </span>
                  <span className={`text-xs font-mono px-2 py-0.5 rounded capitalize ${
                    selectedTopic.status === 'completed' ? 'bg-emerald-500/10 text-emerald-400' :
                    selectedTopic.status === 'in-progress' ? 'bg-amber-500/10 text-amber-400' :
                    'bg-zinc-800 text-zinc-500'
                  }`}>
                    {selectedTopic.status.replace('-', ' ')}
                  </span>
                </div>
                <div className="text-xs font-mono text-zinc-400">
                  {selectedTopic.solvedProblems} / {selectedTopic.totalProblems} Completed
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white tracking-tight">{selectedTopic.title}</h3>
                <p className="text-xs text-zinc-300 mt-2 leading-relaxed">
                  {selectedTopic.description}
                </p>
              </div>

              {/* Key Concept Chips */}
              <div className="space-y-2">
                <div className="text-xs font-medium text-zinc-400 uppercase tracking-wider font-mono">
                  Core Invariants & Concepts
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedTopic.keyConcepts.map(c => (
                    <span key={c} className="text-xs px-2.5 py-1 rounded bg-zinc-950 text-zinc-300 border border-zinc-800">
                      • {c}
                    </span>
                  ))}
                </div>
              </div>

              {/* Featured Problem Card */}
              {selectedTopic.featuredProblem && (
                <div className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-500 uppercase font-mono tracking-wider">Featured Problem</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                      selectedTopic.featuredProblem.difficulty === 'Easy' ? 'bg-emerald-500/10 text-emerald-400' :
                      selectedTopic.featuredProblem.difficulty === 'Medium' ? 'bg-amber-500/10 text-amber-400' :
                      'bg-red-500/10 text-red-400'
                    }`}>
                      {selectedTopic.featuredProblem.difficulty}
                    </span>
                  </div>

                  <div className="text-sm font-semibold text-white">
                    {selectedTopic.featuredProblem.title}
                  </div>

                  <button
                    onClick={() => onSelectProblem && onSelectProblem(selectedTopic.featuredProblem!.id)}
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-emerald-400 hover:bg-emerald-300 text-black text-xs font-semibold shadow-sm transition-colors"
                  >
                    <Play className="w-3.5 h-3.5 fill-black" />
                    <span>Launch In-Browser Compiler</span>
                  </button>
                </div>
              )}

              {/* Progress Summary */}
              <div className="p-3.5 rounded-xl bg-zinc-950/40 border border-zinc-800/60 text-xs text-zinc-400 space-y-2">
                <div className="flex items-center justify-between">
                  <span>Track Mastery</span>
                  <span className="font-mono text-zinc-200">
                    {Math.round((selectedTopic.solvedProblems / selectedTopic.totalProblems) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-emerald-400 h-full rounded-full" 
                    style={{ width: `${(selectedTopic.solvedProblems / selectedTopic.totalProblems) * 100}%` }}
                  />
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
