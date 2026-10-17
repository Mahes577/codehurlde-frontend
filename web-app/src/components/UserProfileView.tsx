import React, { useState } from 'react';
import { 
  Trophy, 
  Flame, 
  Award, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  Target, 
  Zap, 
  BarChart3, 
  ChevronRight, 
  Code2
} from 'lucide-react';
import { Card } from './atoms/Card';
import { Avatar } from './atoms/Avatar';
import { ProgressBar } from './atoms/ProgressBar';
import { DifficultyBadge, DifficultyLevel, Badge } from './atoms/Badge';
import { TabGroup } from './atoms/TabGroup';
import { EloBadge } from './molecules/EloBadge';
import { StreakBadge } from './molecules/StreakBadge';

interface SubmissionRecord {
  id: string;
  problemTitle: string;
  difficulty: DifficultyLevel;
  status: 'Accepted' | 'Wrong Answer' | 'Time Limit Exceeded';
  language: string;
  runtime: string;
  memory: string;
  timeAgo: string;
}

const RECENT_SUBMISSIONS: SubmissionRecord[] = [
  {
    id: 'sub-1',
    problemTitle: 'Roll Number Lookup',
    difficulty: 'Medium',
    status: 'Accepted',
    language: 'Python 3',
    runtime: '32 ms',
    memory: '18.1 MB',
    timeAgo: '12 minutes ago'
  },
  {
    id: 'sub-2',
    problemTitle: 'Divergence 3 - Windows',
    difficulty: 'Hard',
    status: 'Accepted',
    language: 'C++ 20',
    runtime: '64 ms',
    memory: '24.2 MB',
    timeAgo: '3 hours ago'
  },
  {
    id: 'sub-3',
    problemTitle: 'Two Sum II - Input Array Is Sorted',
    difficulty: 'Medium',
    status: 'Accepted',
    language: 'Python 3',
    runtime: '45 ms',
    memory: '17.8 MB',
    timeAgo: 'Yesterday'
  },
  {
    id: 'sub-4',
    problemTitle: 'Prime Multiplicity',
    difficulty: 'Medium',
    status: 'Time Limit Exceeded',
    language: 'Python 3',
    runtime: '2000 ms',
    memory: '32.4 MB',
    timeAgo: '2 days ago'
  },
  {
    id: 'sub-5',
    problemTitle: 'Sweets Eating Speed',
    difficulty: 'Easy',
    status: 'Accepted',
    language: 'JavaScript',
    runtime: '58 ms',
    memory: '44.1 MB',
    timeAgo: '3 days ago'
  },
  {
    id: 'sub-6',
    problemTitle: 'Colorful Subarrays 2',
    difficulty: 'Hard',
    status: 'Wrong Answer',
    language: 'C++ 20',
    runtime: '18 ms',
    memory: '12.0 MB',
    timeAgo: '4 days ago'
  }
];

const SKILL_TOPICS = [
  { name: 'Binary Search', solved: 42, total: 45, percentage: 93 },
  { name: 'Arrays & Hashing', solved: 110, total: 120, percentage: 91 },
  { name: 'Two Pointers', solved: 38, total: 45, percentage: 84 },
  { name: 'Dynamic Programming', solved: 54, total: 80, percentage: 67 },
  { name: 'Trees & Graphs', solved: 62, total: 95, percentage: 65 },
  { name: 'Bit Manipulation', solved: 28, total: 35, percentage: 80 },
  { name: 'Sliding Window', solved: 26, total: 30, percentage: 86 }
];

const BADGES = [
  {
    id: 'b-1',
    title: 'Binary Search Ace',
    description: 'Solved 40+ Binary Search problems with O(log n) efficiency',
    icon: '🎯',
    rarity: 'Legendary',
    color: 'from-amber-500/20 to-amber-600/5 text-amber-300 border-amber-500/30'
  },
  {
    id: 'b-2',
    title: 'Top 5% Contender',
    description: 'Achieved 1,840+ Elo in CodeHurdle Weekly Rated Contests',
    icon: '🏆',
    rarity: 'Master',
    color: 'from-purple-500/20 to-purple-600/5 text-purple-300 border-purple-500/30'
  },
  {
    id: 'b-3',
    title: '50-Day Habit Streak',
    description: 'Submitted at least one accepted solution every day for 50 days',
    icon: '🔥',
    rarity: 'Epic',
    color: 'from-orange-500/20 to-orange-600/5 text-orange-300 border-orange-500/30'
  },
  {
    id: 'b-4',
    title: 'Speed Demon',
    description: 'Ranked in the 99th runtime percentile on 25 problems',
    icon: '⚡',
    rarity: 'Rare',
    color: 'from-cyan-500/20 to-cyan-600/5 text-cyan-300 border-cyan-500/30'
  }
];

export const UserProfileView: React.FC = () => {
  const [filterDifficulty, setFilterDifficulty] = useState<'All' | 'Easy' | 'Medium' | 'Hard'>('All');

  const filteredSubmissions = filterDifficulty === 'All'
    ? RECENT_SUBMISSIONS
    : RECENT_SUBMISSIONS.filter(s => s.difficulty === filterDifficulty);

  const easySolved = 142;
  const easyTotal = 180;
  const medSolved = 188;
  const medTotal = 240;
  const hardSolved = 30;
  const hardTotal = 100;
  const totalSolved = easySolved + medSolved + hardSolved;
  const grandTotal = easyTotal + medTotal + hardTotal;

  return (
    <div className="min-h-screen bg-[#07090e] text-zinc-100 py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Profile Card Header */}
        <Card variant="default" padding="lg">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 -mb-20 w-80 h-80 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />

          <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <Avatar initials="CA" size="lg" status="pro" />

              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-bold text-white tracking-tight">CodeHurdle Architect</h1>
                  <Badge variant="neutral" size="sm">@aarav_codes</Badge>
                </div>
                <p className="text-sm text-zinc-400 mt-1 max-w-lg">
                  Competitive Programmer & Systems Engineer. Aiming for CodeHurdle 2000+ rating and Guardian status.
                </p>

                <div className="flex items-center gap-4 mt-3 text-xs text-zinc-400 font-mono">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-zinc-500" /> Jan 2025
                  </span>
                  <span className="flex items-center gap-1">
                    <Target className="w-3.5 h-3.5 text-emerald-400" /> 500 Goal
                  </span>
                  <div className="flex items-center gap-2 text-zinc-500 ml-2">
                    <a href="https://github.com" target="_blank" rel="noreferrer" title="GitHub" className="hover:text-zinc-300 transition-colors">
                      <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noreferrer" title="LinkedIn" className="hover:text-zinc-300 transition-colors">
                      <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Metrics Badges */}
            <div className="grid grid-cols-3 gap-3 w-full md:w-auto">
              <div className="p-3.5 rounded-xl bg-zinc-950/80 border border-white/[0.08] text-center min-w-[100px]">
                <div className="text-[11px] uppercase tracking-wider text-zinc-500 font-mono">Global Rank</div>
                <div className="text-xl font-bold text-white font-mono mt-0.5">#242</div>
                <div className="text-[10px] text-emerald-400 font-mono">Top 0.8%</div>
              </div>

              <div className="p-3.5 rounded-xl bg-zinc-950/80 border border-white/[0.08] text-center min-w-[100px]">
                <div className="text-[11px] uppercase tracking-wider text-zinc-500 font-mono">Rating</div>
                <div className="text-xl font-bold text-purple-400 font-mono mt-0.5">1,840</div>
                <div className="text-[10px] text-purple-300/80 font-mono">Division 1</div>
              </div>

              <div className="p-3.5 rounded-xl bg-zinc-950/80 border border-white/[0.08] text-center min-w-[100px]">
                <div className="text-[11px] uppercase tracking-wider text-zinc-500 font-mono">Streak</div>
                <div className="text-xl font-bold text-amber-400 font-mono mt-0.5 flex items-center justify-center gap-1">
                  <Flame className="w-4 h-4 fill-amber-400" />
                  <span>14</span>
                </div>
                <div className="text-[10px] text-zinc-500 font-mono">Days Active</div>
              </div>
            </div>
          </div>
        </Card>

        {/* Second Row: Solved Breakdown Circular Chart & Topic Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Solved Problems Ring Card (Col 1-5) */}
          <Card variant="surface" padding="md" className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-semibold text-white flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-emerald-400" />
                  <span>Solved Problems Breakdown</span>
                </h2>
                <span className="text-xs font-mono text-zinc-500">
                  {totalSolved} / {grandTotal} ({Math.round((totalSolved / grandTotal) * 100)}%)
                </span>
              </div>

              {/* Visual Ring Representation */}
              <div className="flex items-center gap-6 my-6">
                <div className="relative w-36 h-36 shrink-0 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" stroke="#1f2937" strokeWidth="8" fill="transparent" />
                    <circle 
                      cx="50" cy="50" r="40" 
                      stroke="#10b981" strokeWidth="8" fill="transparent" 
                      strokeDasharray="251.2" 
                      strokeDashoffset={251.2 - (251.2 * (easySolved / grandTotal))} 
                      strokeLinecap="round" 
                    />
                    <circle 
                      cx="50" cy="50" r="32" 
                      stroke="#f59e0b" strokeWidth="6" fill="transparent" 
                      strokeDasharray="201" 
                      strokeDashoffset={201 - (201 * (medSolved / grandTotal))} 
                      strokeLinecap="round" 
                    />
                    <circle 
                      cx="50" cy="50" r="24" 
                      stroke="#ef4444" strokeWidth="5" fill="transparent" 
                      strokeDasharray="150.7" 
                      strokeDashoffset={150.7 - (150.7 * (hardSolved / grandTotal))} 
                      strokeLinecap="round" 
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center text-center">
                    <span className="text-2xl font-bold font-mono text-white leading-none">{totalSolved}</span>
                    <span className="text-[10px] text-zinc-500 uppercase tracking-widest mt-1">Solved</span>
                  </div>
                </div>

                {/* Difficulty Bars */}
                <div className="flex-1 space-y-3 font-sans">
                  <div className="p-2.5 rounded-xl bg-zinc-950/40 border border-white/[0.06]">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-emerald-400 font-medium">Easy</span>
                      <span className="font-mono text-zinc-300 font-semibold">{easySolved} <span className="text-zinc-600">/ {easyTotal}</span></span>
                    </div>
                    <ProgressBar value={(easySolved / easyTotal) * 100} color="emerald" size="xs" />
                  </div>

                  <div className="p-2.5 rounded-xl bg-zinc-950/40 border border-white/[0.06]">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-amber-400 font-medium">Medium</span>
                      <span className="font-mono text-zinc-300 font-semibold">{medSolved} <span className="text-zinc-600">/ {medTotal}</span></span>
                    </div>
                    <ProgressBar value={(medSolved / medTotal) * 100} color="amber" size="xs" />
                  </div>

                  <div className="p-2.5 rounded-xl bg-zinc-950/40 border border-white/[0.06]">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-rose-400 font-medium">Hard</span>
                      <span className="font-mono text-zinc-300 font-semibold">{hardSolved} <span className="text-zinc-600">/ {hardTotal}</span></span>
                    </div>
                    <ProgressBar value={(hardSolved / hardTotal) * 100} color="rose" size="xs" />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs text-zinc-400">
              <span>Overall Acceptance Rate:</span>
              <span className="text-emerald-400 font-mono font-semibold">68.4%</span>
            </div>
          </Card>

          {/* Skill Radar / Topic Competency Card (Col 6-12) */}
          <Card variant="surface" padding="md" className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-semibold text-white flex items-center gap-2">
                  <Zap className="w-4 h-4 text-purple-400" />
                  <span>Topic Mastery & Skill Index</span>
                </h2>
                <span className="text-xs text-zinc-500 font-mono">Calculated over 360 submissions</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-4">
                {SKILL_TOPICS.map(topic => (
                  <div key={topic.name} className="p-3 rounded-xl bg-zinc-950/40 border border-white/[0.06] space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-zinc-200">{topic.name}</span>
                      <span className="font-mono text-emerald-400 font-semibold">{topic.percentage}%</span>
                    </div>
                    <ProgressBar value={topic.percentage} color={topic.percentage >= 85 ? 'emerald' : topic.percentage >= 70 ? 'cyan' : 'amber'} size="xs" />
                    <div className="text-[10px] text-zinc-500 font-mono flex justify-between">
                      <span>{topic.solved} solved</span>
                      <span>Target: {topic.total}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-white/[0.06] flex items-center justify-between text-xs text-zinc-400">
              <span>Strongest Domain: <strong className="text-emerald-400">Binary Search & Invariants</strong></span>
              <span className="text-zinc-500 font-mono">Updated today</span>
            </div>
          </Card>
        </div>

        {/* Badges Showcase Card */}
        <Card variant="surface" padding="md">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-semibold text-white flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Earned Badges & Distinctions (4)</span>
            </h2>
            <button className="text-xs text-zinc-400 hover:text-white transition-colors flex items-center gap-1 cursor-pointer">
              <span>View all badges</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {BADGES.map(badge => (
              <div 
                key={badge.id}
                className={`p-4 rounded-xl bg-gradient-to-br ${badge.color} border transition-all hover:scale-[1.02] flex flex-col justify-between`}
              >
                <div>
                  <div className="text-3xl mb-3">{badge.icon}</div>
                  <h3 className="text-sm font-bold text-white tracking-tight">{badge.title}</h3>
                  <p className="text-xs text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
                    {badge.description}
                  </p>
                </div>
                <div className="mt-4 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-zinc-400">
                  <span>{badge.rarity}</span>
                  <span className="text-white font-semibold">Unlocked</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Submissions Table Card */}
        <Card variant="surface" padding="md" className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h2 className="text-base font-semibold text-white flex items-center gap-2">
              <Code2 className="w-4 h-4 text-emerald-400" />
              <span>Recent Submissions Log</span>
            </h2>

            <TabGroup
              tabs={[
                { id: 'All', label: 'All' },
                { id: 'Easy', label: 'Easy' },
                { id: 'Medium', label: 'Medium' },
                { id: 'Hard', label: 'Hard' }
              ]}
              activeTab={filterDifficulty}
              onChange={(val) => setFilterDifficulty(val as any)}
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans">
              <thead className="bg-[#0c101c]/90 text-zinc-400 uppercase tracking-wider font-mono text-[11px] border-b border-white/[0.08]">
                <tr>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Problem</th>
                  <th className="py-3 px-4">Difficulty</th>
                  <th className="py-3 px-4">Language</th>
                  <th className="py-3 px-4">Runtime</th>
                  <th className="py-3 px-4">Memory</th>
                  <th className="py-3 px-4 text-right">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.03]">
                {filteredSubmissions.map(sub => (
                  <tr key={sub.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3.5 px-4">
                      {sub.status === 'Accepted' ? (
                        <span className="inline-flex items-center gap-1.5 font-semibold text-emerald-400">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Accepted</span>
                        </span>
                      ) : sub.status === 'Time Limit Exceeded' ? (
                        <span className="inline-flex items-center gap-1.5 font-semibold text-amber-400">
                          <Clock className="w-3.5 h-3.5" />
                          <span>Time Limit</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 font-semibold text-rose-400">
                          <Target className="w-3.5 h-3.5" />
                          <span>Wrong Answer</span>
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 font-medium text-white">
                      {sub.problemTitle}
                    </td>
                    <td className="py-3.5 px-4">
                      <DifficultyBadge difficulty={sub.difficulty} size="sm" />
                    </td>
                    <td className="py-3.5 px-4 font-mono text-zinc-400">
                      {sub.language}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-zinc-300">
                      {sub.runtime}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-zinc-300">
                      {sub.memory}
                    </td>
                    <td className="py-3.5 px-4 text-right text-zinc-500 font-mono">
                      {sub.timeAgo}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

      </div>
    </div>
  );
};
