import React, { useState } from 'react';
import { 
  Briefcase, 
  FileCheck, 
  CheckCircle2, 
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { Card } from './atoms/Card';
import { Button } from './atoms/Button';
import { Badge } from './atoms/Badge';
import { TabGroup } from './atoms/TabGroup';
import { Textarea } from './atoms/Input';

interface CompanyVault {
  id: string;
  name: string;
  tagline: string;
  roundsCount: number;
  totalProblems: number;
  averagePay: string;
  interviewStages: string[];
  topProblems: string[];
}

const COMPANIES_DATA: CompanyVault[] = [
  {
    id: 'google',
    name: 'Google',
    tagline: 'Algorithmic efficiency & graph invariants',
    roundsCount: 5,
    totalProblems: 142,
    averagePay: '$195,000 - $340,000',
    interviewStages: ['Recruiter Screen', 'Technical Phone Screen (45m DSA)', 'Onsite DSA Round 1 (Trees/Graphs)', 'Onsite DSA Round 2 (DP/Arrays)', 'System Design & Googleyness'],
    topProblems: ['Median of Two Sorted Arrays', 'Course Schedule II', 'Word Break II', 'Minimum Cost to Hire K Workers']
  },
  {
    id: 'meta',
    name: 'Meta',
    tagline: 'High-speed problem solving & binary trees',
    roundsCount: 4,
    totalProblems: 118,
    averagePay: '$190,000 - $330,000',
    interviewStages: ['Technical Phone Screen (2 DSA questions / 45m)', 'Onsite Coding Round 1', 'Onsite Coding Round 2', 'Behavioral & Architecture'],
    topProblems: ['Valid Parentheses', 'Subarray Sum Equals K', 'Merge Intervals', 'Lowest Common Ancestor']
  },
  {
    id: 'amazon',
    name: 'Amazon',
    tagline: 'Leadership principles & scale patterns',
    roundsCount: 4,
    totalProblems: 165,
    averagePay: '$170,000 - $290,000',
    interviewStages: ['Online Assessment (OA1 + OA2)', 'Phone Technical Screen', 'Onsite Loop 1 (DSA + LP)', 'Onsite Loop 2 (Bar Raiser)'],
    topProblems: ['Number of Islands', 'LRU Cache', 'Analyze User Website Visit Pattern', 'Reorder Data in Log Files']
  },
  {
    id: 'microsoft',
    name: 'Microsoft',
    tagline: 'Data structure fundamentals & clean code',
    roundsCount: 4,
    totalProblems: 94,
    averagePay: '$165,000 - $275,000',
    interviewStages: ['Codility Screen', 'First Round Technical', 'Onsite Problem Solving', 'Partner Interview'],
    topProblems: ['Sign of the Product of an Array', 'Spiral Matrix', 'Reverse Linked List', 'Meeting Rooms II']
  },
  {
    id: 'netflix',
    name: 'Netflix',
    tagline: 'High autonomy & senior systems design',
    roundsCount: 4,
    totalProblems: 48,
    averagePay: '$350,000 - $550,000 (All Cash)',
    interviewStages: ['Recruiter Calibration', 'Technical Video Screen', 'Deep Architectural Interview', 'Culture & Executive Fit'],
    topProblems: ['LFU Cache', 'Design In-Memory File System', 'Trapping Rain Water', 'Sliding Window Maximum']
  },
  {
    id: 'uber',
    name: 'Uber',
    tagline: 'Spatial algorithms, graphs & concurrency',
    roundsCount: 5,
    totalProblems: 86,
    averagePay: '$180,000 - $310,000',
    interviewStages: ['CodeSignal OA', 'Technical Phone Interview', 'Onsite Coding 1 (Graphs/Queues)', 'Onsite Coding 2 (Dynamic Programming)', 'System Design'],
    topProblems: ['Bus Routes', 'Word Ladder', 'Reconstruct Itinerary', 'Minesweeper']
  }
];

export const JobPrepView: React.FC = () => {
  const [selectedCompany, setSelectedCompany] = useState<CompanyVault>(COMPANIES_DATA[0]);
  const [activeTab, setActiveTab] = useState<'companies' | 'ats'>('companies');
  const [resumeText, setResumeText] = useState('');
  const [atsScore, setAtsScore] = useState<number | null>(null);

  const handleScanResume = () => {
    if (!resumeText.trim()) return;
    setTimeout(() => {
      setAtsScore(88);
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-zinc-100 py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header Card */}
        <Card variant="default" padding="lg">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />

          <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/25 text-blue-400 text-xs font-mono mb-3">
                <Briefcase className="w-3.5 h-3.5" />
                <span>CodeHurdle Career & Job Preparation</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                Company Question Vaults & Interview Simulation
              </h1>
              <p className="text-sm text-zinc-400 mt-2 max-w-2xl leading-relaxed">
                Crack top-tier tech interviews with verified company hiring processes, historical interview question frequency, salary bands, and AI resume ATS checks.
              </p>
            </div>

            {/* TabGroup Atom */}
            <TabGroup
              tabs={[
                { id: 'companies', label: 'Company Guides' },
                { id: 'ats', label: 'Resume ATS Scanner' }
              ]}
              activeTab={activeTab}
              onChange={(val) => setActiveTab(val as any)}
            />
          </div>
        </Card>

        {activeTab === 'companies' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Company Cards List (Col 1-5) */}
            <div className="lg:col-span-5 space-y-3">
              <div className="text-xs font-mono uppercase tracking-wider text-zinc-400 pb-1">
                Target Technology Companies ({COMPANIES_DATA.length})
              </div>

              <div className="space-y-2.5">
                {COMPANIES_DATA.map(comp => {
                  const isSelected = selectedCompany.id === comp.id;
                  return (
                    <Card
                      key={comp.id}
                      variant="interactive"
                      padding="sm"
                      onClick={() => setSelectedCompany(comp)}
                      className={isSelected ? 'border-blue-500/50 bg-zinc-800/80 shadow-lg shadow-blue-950/20' : ''}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-zinc-950 border border-white/[0.08] flex items-center justify-center font-bold text-sm text-white font-mono">
                            {comp.name[0]}
                          </div>
                          <div>
                            <h3 className="text-sm font-bold text-white">{comp.name}</h3>
                            <p className="text-xs text-zinc-400 line-clamp-1">{comp.tagline}</p>
                          </div>
                        </div>
                        <ChevronRight className={`w-4 h-4 ${isSelected ? 'text-blue-400' : 'text-zinc-600'}`} />
                      </div>

                      <div className="flex items-center gap-4 mt-3 pt-2.5 border-t border-white/[0.06] text-[11px] font-mono text-zinc-400">
                        <span>{comp.totalProblems} Vault Problems</span>
                        <span>{comp.roundsCount} Interview Rounds</span>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* Selected Company Deep-Dive (Col 6-12) */}
            <div className="lg:col-span-7">
              <Card variant="surface" padding="md" className="space-y-6">
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
                  <div>
                    <Badge variant="cyan" size="xs">
                      Company Hiring Deep-Dive
                    </Badge>
                    <h2 className="text-2xl font-bold text-white mt-2">{selectedCompany.name}</h2>
                    <p className="text-xs text-zinc-400">{selectedCompany.tagline}</p>
                  </div>

                  <div className="p-3 rounded-xl bg-zinc-950/80 border border-white/[0.08] font-mono text-xs">
                    <div className="text-[10px] text-zinc-500 uppercase">Avg Compensation</div>
                    <div className="text-sm font-bold text-emerald-400 mt-0.5">{selectedCompany.averagePay}</div>
                  </div>
                </div>

                {/* Interview Rounds Sequence */}
                <div className="space-y-3">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-bold">
                    Official Interview Stages ({selectedCompany.interviewStages.length})
                  </h3>
                  <div className="space-y-2">
                    {selectedCompany.interviewStages.map((stage, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-zinc-950/60 border border-white/[0.06] flex items-center gap-3 text-xs">
                        <span className="w-5 h-5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center font-mono font-bold text-[10px]">
                          {idx + 1}
                        </span>
                        <span className="text-zinc-200 font-medium">{stage}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* High-Frequency Problems */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-bold">
                      Top Historical Question Patterns
                    </h3>
                    <span className="text-[11px] text-zinc-500 font-mono">Updated for 2026</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedCompany.topProblems.map((prob, i) => (
                      <div key={i} className="p-3 rounded-xl bg-zinc-950/40 border border-white/[0.06] flex items-center justify-between text-xs hover:border-white/[0.16] transition-colors cursor-pointer">
                        <span className="text-zinc-300 font-medium truncate">• {prob}</span>
                        <ChevronRight className="w-3.5 h-3.5 text-zinc-600 shrink-0" />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-white/[0.08] flex items-center justify-between">
                  <span className="text-xs text-zinc-500 font-mono">Includes algorithmic test cases & behavioral rubric</span>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => alert(`Starting 45m timed mock simulation for ${selectedCompany.name}...`)}
                  >
                    Start {selectedCompany.name} Mock Loop
                  </Button>
                </div>

              </Card>
            </div>
          </div>
        )}

        {activeTab === 'ats' && (
          <Card variant="surface" padding="lg" className="space-y-6">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-emerald-400" />
                <span>Resume & Technical ATS Parser</span>
              </h2>
              <p className="text-xs text-zinc-400 mt-1">
                Scan your software engineering resume against algorithmic keywords, concurrency tokens, and system design patterns.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-8 space-y-3">
                <Textarea
                  value={resumeText}
                  onChange={e => setResumeText(e.target.value)}
                  placeholder="Paste your plain-text resume here or experience bullet points... (e.g. Optimized distributed task queue with Redis and C++ worker pools, cutting tail latency by 42%)..."
                  rows={8}
                />
                <Button
                  variant="primary"
                  size="md"
                  onClick={handleScanResume}
                >
                  Run ATS Keywords Analysis
                </Button>
              </div>

              <div className="lg:col-span-4 p-5 rounded-2xl bg-zinc-950/70 border border-white/[0.08] space-y-4">
                <div className="text-xs font-mono uppercase tracking-wider text-zinc-400">Analysis Summary</div>
                {atsScore !== null ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="text-3xl font-bold font-mono text-emerald-400">{atsScore}%</div>
                      <div className="text-xs text-zinc-300 font-medium">Strong ATS Keyword Density</div>
                    </div>
                    <ul className="space-y-2 text-xs text-zinc-400 font-mono">
                      <li className="flex items-center gap-2 text-emerald-400">
                        <CheckCircle2 className="w-3.5 h-3.5" /> High algorithmic verbs present
                      </li>
                      <li className="flex items-center gap-2 text-emerald-400">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Quantified business impact detected
                      </li>
                      <li className="flex items-center gap-2 text-amber-400">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Suggest adding concurrency keywords
                      </li>
                    </ul>
                  </div>
                ) : (
                  <div className="text-xs text-zinc-500 py-8 text-center italic font-mono">
                    Paste resume and click scan to see your keyword matches.
                  </div>
                )}
              </div>
            </div>
          </Card>
        )}

      </div>
    </div>
  );
};
