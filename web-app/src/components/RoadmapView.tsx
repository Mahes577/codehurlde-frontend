import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Lock, 
  Play, 
  ChevronRight, 
  Compass, 
  Layers
} from 'lucide-react';
import { 
  Button, 
  Badge, 
  DifficultyBadge, 
  Card, 
  ProgressBar, 
  SectionHeader 
} from './atomic';

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
    description: 'Hash tables, rolling maps, frequency counting, collision resolution, and hash sets.',
    status: 'completed',
    totalProblems: 24,
    solvedProblems: 24,
    keyConcepts: ['Two Sum Pattern', 'Subarray Sum K', 'Frequency Buckets'],
    featuredProblem: { id: 'p6', title: 'Two Sum', difficulty: 'Easy' }
  },
  {
    id: 7,
    slug: 'two-pointers',
    numberStr: '07',
    title: 'Two Pointers Technique',
    description: 'Opposite direction, same direction, fast and slow pointers, 3Sum, container with most water.',
    status: 'completed',
    totalProblems: 22,
    solvedProblems: 22,
    keyConcepts: ['Opposite Ends', 'Sorted Invariant', 'Triplets Pruning'],
    featuredProblem: { id: 'p7', title: 'Container With Most Water', difficulty: 'Medium' }
  },
  {
    id: 8,
    slug: 'sliding-window',
    numberStr: '08',
    title: 'Sliding Window',
    description: 'Fixed and variable size windows, longest substring without repeating characters, minimum window substring.',
    status: 'completed',
    totalProblems: 20,
    solvedProblems: 20,
    keyConcepts: ['Window Expansion', 'Window Shrink Condition', 'Character Frequency'],
    featuredProblem: { id: 'p8', title: 'Longest Substring Without Repeating Characters', difficulty: 'Medium' }
  },
  {
    id: 9,
    slug: 'sorting',
    numberStr: '09',
    title: 'Sorting & Custom Comparators',
    description: 'Merge Sort, Quick Sort, Quickselect, counting sort, comparator lambdas, and stability.',
    status: 'completed',
    totalProblems: 15,
    solvedProblems: 15,
    keyConcepts: ['Merge Inversion Count', 'Quickselect O(N)', 'Custom Comparators'],
    featuredProblem: { id: 'p9', title: 'Kth Largest Element in an Array', difficulty: 'Medium' }
  },
  {
    id: 10,
    slug: 'binary-search',
    numberStr: '10',
    title: 'Binary Search & Monotonic Predicates',
    description: 'Lower/upper bound, binary search on answer spaces, rotated sorted arrays, and peak finding.',
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
      <div className="max-w-[1720px] mx-auto space-y-8">
        
        {/* Header Hero */}
        <Card variant="surface" className="p-6 md:p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
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
            <Card variant="default" className="p-4 min-w-[260px] space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-400">Curriculum Progress</span>
                <span className="text-emerald-400 font-mono font-bold">{completionPercentage}%</span>
              </div>
              <ProgressBar value={completionPercentage} variant="emerald" size="md" />
              <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 pt-1">
                <span>{totalCompletedProblems} Problems Solved</span>
                <span>{totalCurriculumProblems} Total</span>
              </div>
            </Card>
          </div>
        </Card>

        {/* Two Column Layout: Topic List on Left, Active Topic Deep-Dive on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Topic Progression Stream (Col 1-7) */}
          <div className="lg:col-span-7 space-y-3">
            <div className="flex items-center justify-between pb-1">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-emerald-400" />
                <h2 className="text-base font-semibold text-white">Sequential Curriculum Milestones</h2>
              </div>
              <span className="text-xs text-zinc-500 font-mono">16 Tracks Displayed</span>
            </div>

            <div className="space-y-2.5">
              {TOPICS_DATA.map(topic => {
                const isSelected = selectedTopic.id === topic.id;
                return (
                  <Card
                    key={topic.id}
                    variant={isSelected ? 'interactive' : 'default'}
                    onClick={() => setSelectedTopic(topic)}
                    className={`p-4 transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'border-emerald-500/50 shadow-lg shadow-emerald-950/20 bg-zinc-900/90'
                        : topic.status === 'locked'
                        ? 'opacity-65 hover:opacity-100'
                        : ''
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      {/* Topic Number & Status Icon */}
                      <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-zinc-950 border border-white/[0.08] shrink-0 font-mono font-bold text-xs">
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
                            <Badge variant="amber" size="xs">
                              Active
                            </Badge>
                          )}
                          {topic.status === 'completed' && (
                            <Badge variant="emerald" size="xs">
                              Mastered
                            </Badge>
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
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Active Topic Detail Inspector (Col 8-12) */}
          <div className="lg:col-span-5">
            <Card variant="surface" className="sticky top-20 p-6 space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                <div className="flex items-center gap-2">
                  <Badge variant="neutral" size="sm">
                    Track #{selectedTopic.numberStr}
                  </Badge>
                  <Badge 
                    variant={
                      selectedTopic.status === 'completed' ? 'emerald' :
                      selectedTopic.status === 'in-progress' ? 'amber' :
                      'neutral'
                    }
                    size="sm"
                  >
                    {selectedTopic.status.replace('-', ' ')}
                  </Badge>
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
                    <Badge key={c} variant="neutral" size="sm">
                      • {c}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Featured Problem Card */}
              {selectedTopic.featuredProblem && (
                <Card variant="default" className="p-4 space-y-3 border-white/[0.1]">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-500 uppercase font-mono tracking-wider">Featured Problem</span>
                    <DifficultyBadge difficulty={selectedTopic.featuredProblem.difficulty} size="xs" />
                  </div>

                  <div className="text-sm font-semibold text-white">
                    {selectedTopic.featuredProblem.title}
                  </div>

                  <Button
                    variant="primary"
                    size="md"
                    className="w-full"
                    onClick={() => onSelectProblem && onSelectProblem(selectedTopic.featuredProblem!.id)}
                    icon={<Play className="w-3.5 h-3.5 fill-black" />}
                  >
                    Launch In-Browser Compiler
                  </Button>
                </Card>
              )}

              {/* Progress Summary */}
              <div className="p-3.5 rounded-xl bg-zinc-950/60 border border-white/[0.06] text-xs text-zinc-400 space-y-2">
                <div className="flex items-center justify-between">
                  <span>Track Mastery</span>
                  <span className="font-mono text-zinc-200">
                    {Math.round((selectedTopic.solvedProblems / selectedTopic.totalProblems) * 100)}%
                  </span>
                </div>
                <ProgressBar 
                  value={(selectedTopic.solvedProblems / selectedTopic.totalProblems) * 100}
                  variant="emerald"
                  size="sm"
                />
              </div>

            </Card>
          </div>
        </div>

      </div>
    </div>
  );
};
