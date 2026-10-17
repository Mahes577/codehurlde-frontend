import React, { useState } from 'react';
import { 
  Trophy, 
  Swords, 
  Flame, 
  Clock, 
  Filter, 
  Star, 
  ChevronRight, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  Play,
  TrendingUp,
  Target,
  Zap,
  Code2
} from 'lucide-react';

interface CpProblem {
  id: number;
  title: string;
  topic: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  acceptance: string;
  status: 'Attempted' | 'Not attempted' | 'Solved';
  starred?: boolean;
  timeLimit: string;
  memoryLimit: string;
}

const CP_PROBLEMS: CpProblem[] = [
  {
    id: 1,
    title: "The Chronomancer's Queue",
    topic: 'Fenwick Tree',
    difficulty: 'Medium',
    acceptance: '100%',
    status: 'Not attempted',
    timeLimit: '1.0s',
    memoryLimit: '256MB'
  },
  {
    id: 2,
    title: 'Prime Multiplicity',
    topic: 'Number Theory',
    difficulty: 'Medium',
    acceptance: '0%',
    status: 'Not attempted',
    timeLimit: '2.0s',
    memoryLimit: '512MB'
  },
  {
    id: 3,
    title: 'LLM Swarm Consensus',
    topic: 'DSU',
    difficulty: 'Medium',
    acceptance: '57%',
    status: 'Not attempted',
    timeLimit: '1.5s',
    memoryLimit: '256MB'
  },
  {
    id: 4,
    title: 'Laser Reflection Game',
    topic: 'Game Theory / Nim',
    difficulty: 'Medium',
    acceptance: '12%',
    status: 'Not attempted',
    timeLimit: '1.0s',
    memoryLimit: '128MB'
  },
  {
    id: 5,
    title: 'Divergence 3 - Windows',
    topic: 'Matrix Exponentiation',
    difficulty: 'Hard',
    acceptance: '8%',
    status: 'Not attempted',
    timeLimit: '3.0s',
    memoryLimit: '512MB'
  },
  {
    id: 6,
    title: 'Colorful Subarrays 2 (Easy Version)',
    topic: 'Dynamic Programming',
    difficulty: 'Easy',
    acceptance: '44%',
    status: 'Not attempted',
    timeLimit: '1.0s',
    memoryLimit: '256MB'
  },
  {
    id: 7,
    title: 'Colorful Subarrays 2 (Hard Version)',
    topic: 'Dynamic Programming',
    difficulty: 'Hard',
    acceptance: '15%',
    status: 'Not attempted',
    timeLimit: '2.5s',
    memoryLimit: '512MB'
  },
  {
    id: 8,
    title: 'Festival Giveaway Optimization',
    topic: 'Greedy',
    difficulty: 'Medium',
    acceptance: '38%',
    status: 'Not attempted',
    timeLimit: '1.0s',
    memoryLimit: '256MB'
  },
  {
    id: 9,
    title: 'Greedy Vault Code',
    topic: 'Binary Search on Answer',
    difficulty: 'Medium',
    acceptance: '29%',
    status: 'Not attempted',
    timeLimit: '1.0s',
    memoryLimit: '256MB'
  }
];

interface CpArenaViewProps {
  onSolveProblem?: (problemId: string | number) => void;
}

export const CpArenaView: React.FC<CpArenaViewProps> = ({ onSolveProblem }) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<'All' | 'Easy' | 'Medium' | 'Hard'>('All');
  const [selectedTopic, setSelectedTopic] = useState<string>('All');
  const [problems, setProblems] = useState<CpProblem[]>(CP_PROBLEMS);

  const topics = ['All', 'Fenwick Tree', 'Number Theory', 'DSU', 'Game Theory / Nim', 'Matrix Exponentiation', 'Dynamic Programming', 'Greedy', 'Binary Search on Answer'];

  const filteredProblems = problems.filter(p => {
    const diffMatch = selectedDifficulty === 'All' || p.difficulty === selectedDifficulty;
    const topicMatch = selectedTopic === 'All' || p.topic === selectedTopic;
    return diffMatch && topicMatch;
  });

  const toggleStar = (id: number) => {
    setProblems(prev => prev.map(p => p.id === id ? { ...p, starred: !p.starred } : p));
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-zinc-100 py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* CP Header */}
        <div className="rounded-2xl bg-zinc-900/60 border border-zinc-800/80 p-6 md:p-8 relative overflow-hidden backdrop-blur-xl">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-rose-500/10 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 -mb-20 w-80 h-80 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/25 text-rose-400 text-xs font-mono mb-3">
                <Swords className="w-3.5 h-3.5" />
                <span>CodeHurdle CP Arena</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                Competitive Programming Arena
              </h1>
              <p className="text-sm text-zinc-400 mt-2 max-w-2xl leading-relaxed">
                Contest-style problems with strict time limits (1.0s - 3.0s), tight memory constraints, and hidden stress-test suites. Pick from the curated catalog or let Dynamic Mode choose based on your Elo.
              </p>
            </div>

            {/* Division Card */}
            <div className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800/80 min-w-[240px] space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-400 font-mono">Current Division</span>
                <span className="text-amber-400 font-bold font-mono">Division 1 (1,840)</span>
              </div>
              <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                <div className="bg-amber-400 h-full rounded-full" style={{ width: '74%' }}></div>
              </div>
              <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 pt-1">
                <span>Next rank: Candidate Master</span>
                <span>+160 pts needed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Featured CP Track Banner */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-950/40 via-zinc-900/60 to-zinc-900/40 border border-purple-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 font-bold font-mono text-lg shrink-0">
              DP
            </div>
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-purple-400">Continue Learning Track</div>
              <div className="text-base font-bold text-white">Master Dynamic Programming Algorithms & Invariants</div>
              <div className="text-xs text-zinc-400 mt-0.5">0 of 5 solved · Beginner to Advanced state compression</div>
            </div>
          </div>

          <button 
            onClick={() => onSolveProblem && onSolveProblem(6)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-500 hover:bg-purple-400 text-white font-semibold text-xs shadow-md shadow-purple-950/50 transition-colors shrink-0"
          >
            <Play className="w-3.5 h-3.5 fill-white" />
            <span>Solve Colorful Subarrays</span>
          </button>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-400 font-mono">Difficulty:</span>
            <div className="flex items-center gap-1 bg-zinc-950 p-1 rounded-lg border border-zinc-800 text-xs">
              {(['All', 'Easy', 'Medium', 'Hard'] as const).map(d => (
                <button
                  key={d}
                  onClick={() => setSelectedDifficulty(d)}
                  className={`px-2.5 py-1 rounded transition-colors ${
                    selectedDifficulty === d
                      ? 'bg-zinc-800 text-white font-medium'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-400 font-mono">Topic:</span>
            <select
              value={selectedTopic}
              onChange={e => setSelectedTopic(e.target.value)}
              className="bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-zinc-200 focus:outline-none focus:border-rose-500/50 font-mono"
            >
              {topics.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
        </div>

        {/* CP Catalog Table */}
        <div className="rounded-2xl bg-zinc-900/60 border border-zinc-800/80 overflow-hidden">
          <table className="w-full text-left text-xs font-sans">
            <thead className="bg-zinc-950/80 text-zinc-400 uppercase tracking-wider font-mono text-[11px] border-b border-zinc-800">
              <tr>
                <th className="py-3 px-4 w-12 text-center">#</th>
                <th className="py-3 px-4">Problem Name</th>
                <th className="py-3 px-4">Algorithmic Domain</th>
                <th className="py-3 px-4">Difficulty</th>
                <th className="py-3 px-4">Acceptance</th>
                <th className="py-3 px-4">Limits</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60">
              {filteredProblems.map(p => (
                <tr key={p.id} className="hover:bg-zinc-800/30 transition-colors">
                  <td className="py-3.5 px-4 text-center font-mono text-zinc-500">
                    {p.id}
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-white">
                    <div className="flex items-center gap-2">
                      <span>{p.title}</span>
                      <button onClick={() => toggleStar(p.id)} className="text-zinc-600 hover:text-amber-400">
                        <Star className={`w-3.5 h-3.5 ${p.starred ? 'fill-amber-400 text-amber-400' : ''}`} />
                      </button>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-zinc-400">
                    <span className="px-2 py-0.5 rounded bg-zinc-950 border border-zinc-800 text-[11px]">
                      {p.topic}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                      p.difficulty === 'Easy' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                      p.difficulty === 'Medium' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                      'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                    }`}>
                      {p.difficulty}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-zinc-300">
                    {p.acceptance}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-[11px] text-zinc-500">
                    <span>{p.timeLimit} · {p.memoryLimit}</span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => onSolveProblem && onSolveProblem(p.id)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-emerald-500 hover:text-black text-zinc-200 text-xs font-medium transition-all"
                    >
                      <Play className="w-3 h-3 fill-current" />
                      <span>Solve</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};
