import React, { useState } from 'react';
import { 
  X, 
  Code2, 
  Copy, 
  Check, 
  Terminal, 
  User, 
  BookOpen, 
  Compass, 
  ExternalLink,
  Swords,
  Users,
  Briefcase,
  Flame,
  Award,
  Layers,
  Sparkles,
  MousePointerClick,
  Sliders,
  Search,
  Play,
  RotateCcw,
  CheckCircle2,
  Send,
  Star,
  Eye,
  Zap,
  Tag,
  Shield,
  Activity,
  Calendar,
  Building2,
  FileCheck2,
  ArrowRight
} from 'lucide-react';
import { ActiveView } from './Navbar';
import { 
  Button, 
  Badge, 
  DifficultyBadge, 
  DifficultyLevel,
  Card, 
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Input, 
  Textarea,
  Avatar, 
  ProgressBar, 
  TabGroup, 
  SectionHeader,
  StreakBadge, 
  EloBadge, 
  StatMetricCard, 
  SearchInput,
  ProblemRow 
} from './atomic';

export type AtomicTier = 'all' | 'atom' | 'molecule' | 'organism';

interface ComponentDoc {
  id: string;
  name: string;
  tier: 'atom' | 'molecule' | 'organism';
  category: string;
  icon: any;
  file: string;
  description: string;
  navTarget?: ActiveView;
  propsSnippet: string;
  usageSnippet: string;
}

export const ReusableComponentDrawer: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onNavigateToView: (view: ActiveView) => void;
}> = ({ isOpen, onClose, onNavigateToView }) => {
  const [selectedTier, setSelectedTier] = useState<AtomicTier>('all');
  const [copied, setCopied] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // -------------------------------------------------------------
  // INTERACTIVE WORKBENCH STATES FOR ATOMS
  // -------------------------------------------------------------
  // Button Atom Workbench
  const [btnVariant, setBtnVariant] = useState<'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'amber'>('primary');
  const [btnSize, setBtnSize] = useState<'xs' | 'sm' | 'md' | 'lg'>('sm');
  const [btnLoading, setBtnLoading] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [btnClicks, setBtnClicks] = useState(0);

  // Badge Atom Workbench
  const [badgeDifficulty, setBadgeDifficulty] = useState<DifficultyLevel>('Medium');
  const [badgeVariant, setBadgeVariant] = useState<'emerald' | 'amber' | 'rose' | 'cyan' | 'purple' | 'neutral'>('cyan');
  const [badgeCustomText, setBadgeCustomText] = useState('O(log N)');
  const [badgeClicks, setBadgeClicks] = useState(0);

  // Card Atom Workbench
  const [cardVariant, setCardVariant] = useState<'default' | 'surface' | 'interactive' | 'sunken'>('interactive');
  const [cardGlow, setCardGlow] = useState(true);
  const [cardClickCount, setCardClickCount] = useState(0);

  // Input Atom Workbench
  const [inputVal, setInputVal] = useState('Binary Search on Answer Space');
  const [inputHasError, setInputHasError] = useState(false);
  const [inputPrefix, setInputPrefix] = useState(true);

  // Avatar Atom Workbench
  const [avatarName, setAvatarName] = useState('Aarav Sharma');
  const [avatarSize, setAvatarSize] = useState<'xs' | 'sm' | 'md' | 'lg' | 'xl'>('md');
  const [avatarPro, setAvatarPro] = useState(true);
  const [avatarOnline, setAvatarOnline] = useState(true);

  // ProgressBar Atom Workbench
  const [progressVal, setProgressVal] = useState(72);
  const [progressVariant, setProgressVariant] = useState<'emerald' | 'amber' | 'rose' | 'cyan' | 'purple'>('emerald');
  const [progressSize, setProgressSize] = useState<'xs' | 'sm' | 'md' | 'lg'>('md');

  // TabGroup Atom Workbench
  const [tabVariant, setTabVariant] = useState<'pill' | 'underline'>('pill');
  const [activeTestTab, setActiveTestTab] = useState('two_pointers');

  // -------------------------------------------------------------
  // INTERACTIVE WORKBENCH STATES FOR MOLECULES
  // -------------------------------------------------------------
  // ProblemRow Molecule Workbench
  const [rowSolved, setRowSolved] = useState(false);
  const [rowStarred, setRowStarred] = useState(true);
  const [rowDiff, setRowDiff] = useState<DifficultyLevel>('Medium');
  const [rowFreq, setRowFreq] = useState(88);

  // StreakBadge Molecule Workbench
  const [streakDays, setStreakDays] = useState(14);
  const [streakActive, setStreakActive] = useState(true);

  // EloBadge Molecule Workbench
  const [eloRating, setEloRating] = useState(1840);
  const [eloTrend, setEloTrend] = useState<'up' | 'down' | 'flat'>('up');

  // StatMetricCard Molecule Workbench
  const [statVal, setStatVal] = useState('382 / 520');
  const [statVariant, setStatVariant] = useState<'emerald' | 'cyan' | 'amber' | 'purple' | 'neutral'>('emerald');

  // SearchInput Molecule Workbench
  const [liveSearchQuery, setLiveSearchQuery] = useState('Dynamic Programming');

  // -------------------------------------------------------------
  // INTERACTIVE WORKBENCH STATES FOR ORGANISMS
  // -------------------------------------------------------------
  // Compiler Sandbox
  const [compilerLang, setCompilerLang] = useState<'python' | 'cpp' | 'js'>('python');
  const [compilerCode, setCompilerCode] = useState(`def solve(nums, target):\n    left, right = 0, len(nums) - 1\n    while left <= right:\n        mid = (left + right) // 2\n        if nums[mid] == target: return mid\n        elif nums[mid] < target: left = mid + 1\n        else: right = mid - 1\n    return -1`);
  const [compilerOutput, setCompilerOutput] = useState<string | null>(null);
  const [compilerRunning, setCompilerRunning] = useState(false);

  // CP Arena Sandbox
  const [cpRegistered, setCpRegistered] = useState(false);
  const [cpSelectedFilter, setCpSelectedFilter] = useState<'All' | '1600-1900' | '1900-2400'>('All');

  // Community Sandbox
  const [commMessages, setCommMessages] = useState<Array<{ user: string; text: string; time: string }>>([
    { user: 'Vikram R.', text: 'Notice how state compression reduces Space from O(N*W) to O(W) in 0/1 Knapsack.', time: '10:14 AM' },
    { user: 'Priya P.', text: 'Rolling hashes with polynomial base 31 avoids collisions in Rabin-Karp!', time: '10:28 AM' }
  ]);
  const [commDraft, setCommDraft] = useState('');

  // Job Prep Sandbox
  const [resumeText, setResumeText] = useState('Experienced in C++, Python, LeetCode 400+, Graphs, Tree Traversals, System Design.');
  const [atsScore, setAtsScore] = useState<number | null>(null);

  // -------------------------------------------------------------
  // COMPONENT DIRECTORY DEFINITIONS
  // -------------------------------------------------------------
  const COMPONENTS: ComponentDoc[] = [
    // ATOMS
    {
      id: 'atom-button',
      name: 'Button',
      tier: 'atom',
      category: 'Atoms / Interactive',
      icon: MousePointerClick,
      file: 'src/components/atoms/Button.tsx',
      description: 'Tactile action button supporting 6 color variants, 4 sizes, loading spinner state, and tactile scale feedback.',
      propsSnippet: `interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {\n  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'amber';\n  size?: 'xs' | 'sm' | 'md' | 'lg';\n  isLoading?: boolean;\n  icon?: React.ReactNode;\n}`,
      usageSnippet: `<Button variant="primary" size="sm" icon={<Play className="w-3.5 h-3.5" />}>\n  Run Code\n</Button>`
    },
    {
      id: 'atom-badge',
      name: 'Badge & DifficultyBadge',
      tier: 'atom',
      category: 'Atoms / Status & Indicators',
      icon: Sparkles,
      file: 'src/components/atoms/Badge.tsx',
      description: 'Semantic pills for system states and problem difficulty (Easy/Medium/Hard). Enforces standardized LeetCode hues.',
      propsSnippet: `interface BadgeProps {\n  variant?: 'emerald' | 'amber' | 'rose' | 'cyan' | 'purple' | 'neutral';\n  size?: 'xs' | 'sm' | 'md';\n  children: React.ReactNode;\n}\n\ninterface DifficultyBadgeProps {\n  difficulty: 'Easy' | 'Medium' | 'Hard';\n  size?: 'xs' | 'sm' | 'md';\n}`,
      usageSnippet: `<DifficultyBadge difficulty="Medium" size="sm" />\n<Badge variant="cyan" size="xs">Div 1</Badge>`
    },
    {
      id: 'atom-card',
      name: 'Card & CardHeader',
      tier: 'atom',
      category: 'Atoms / Containers',
      icon: Layers,
      file: 'src/components/atoms/Card.tsx',
      description: 'Standardized card surfaces matching obsidian design tokens (#0c101c base, border-white/[0.08], subtle elevation).',
      propsSnippet: `interface CardProps extends React.HTMLAttributes<HTMLDivElement> {\n  variant?: 'default' | 'surface' | 'interactive' | 'sunken';\n  glow?: boolean;\n}`,
      usageSnippet: `<Card variant="surface" className="p-4">\n  <CardTitle>Two Pointers Track</CardTitle>\n  <CardDescription>Master inward and outward search intervals.</CardDescription>\n</Card>`
    },
    {
      id: 'atom-input',
      name: 'Input & Textarea',
      tier: 'atom',
      category: 'Atoms / Form Elements',
      icon: Sliders,
      file: 'src/components/atoms/Input.tsx',
      description: 'Standard form inputs with prefix and suffix slots, focused emerald outline, monospace typography, and subtle error states.',
      propsSnippet: `interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {\n  prefix?: React.ReactNode;\n  suffix?: React.ReactNode;\n  error?: boolean;\n}`,
      usageSnippet: `<Input \n  prefix={<Search className="w-4 h-4 text-zinc-500" />} \n  placeholder="Filter by keyword..." \n/>`
    },
    {
      id: 'atom-avatar',
      name: 'Avatar',
      tier: 'atom',
      category: 'Atoms / Identity',
      icon: User,
      file: 'src/components/atoms/Avatar.tsx',
      description: 'Developer monogram avatar with gradient border rings, PRO badges, and live online/active indicator dots.',
      propsSnippet: `interface AvatarProps {\n  name?: string;\n  src?: string;\n  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';\n  isOnline?: boolean;\n  isPro?: boolean;\n}`,
      usageSnippet: `<Avatar name="Alex Chen" size="md" isPro isOnline />`
    },
    {
      id: 'atom-progress',
      name: 'ProgressBar',
      tier: 'atom',
      category: 'Atoms / Telemetry',
      icon: Sliders,
      file: 'src/components/atoms/ProgressBar.tsx',
      description: 'Multi-variant progress track with smooth CSS transitions, glowing accent heads, and size tiers.',
      propsSnippet: `interface ProgressBarProps {\n  value: number;\n  max?: number;\n  variant?: 'emerald' | 'amber' | 'rose' | 'cyan' | 'purple';\n  size?: 'xs' | 'sm' | 'md' | 'lg';\n}`,
      usageSnippet: `<ProgressBar value={82} variant="emerald" size="md" />`
    },
    {
      id: 'atom-tabs',
      name: 'TabGroup',
      tier: 'atom',
      category: 'Atoms / Navigation',
      icon: Sliders,
      file: 'src/components/atoms/TabGroup.tsx',
      description: 'Cohesive navigation switcher supporting underline and pill variants with badge counters.',
      propsSnippet: `interface TabItem {\n  id: string;\n  label: string;\n  icon?: React.ReactNode;\n  badge?: string | number | React.ReactNode;\n}\n\ninterface TabGroupProps {\n  tabs: TabItem[];\n  activeTab: string;\n  onChange: (id: string) => void;\n  variant?: 'underline' | 'pill';\n}`,
      usageSnippet: `<TabGroup tabs={tabs} activeTab={active} onChange={setActive} variant="pill" />`
    },

    // MOLECULES
    {
      id: 'mol-prow',
      name: 'ProblemRow',
      tier: 'molecule',
      category: 'Molecules / Data Presentation',
      icon: BookOpen,
      file: 'src/components/molecules/ProblemRow.tsx',
      description: 'Tabular problem item combining solved checkbox, star bookmark, title, difficulty pill, acceptance %, and solve CTA.',
      propsSnippet: `interface ProblemRowProps {\n  problem: ProblemRowData;\n  isSelected?: boolean;\n  onSelect?: () => void;\n  onSolve?: () => void;\n  onToggleSolved?: (e: React.MouseEvent) => void;\n  onToggleStarred?: (e: React.MouseEvent) => void;\n}`,
      usageSnippet: `<ProblemRow \n  problem={problem} \n  onSolve={() => openCompiler(problem.id)}\n/>`
    },
    {
      id: 'mol-streak',
      name: 'StreakBadge & EloBadge',
      tier: 'molecule',
      category: 'Molecules / Gamification',
      icon: Flame,
      file: 'src/components/molecules/StreakBadge.tsx',
      description: 'Interactive gamification badges for daily practice streak with flame icon and competitive programming Elo rating.',
      propsSnippet: `interface StreakBadgeProps {\n  days: number;\n  active?: boolean;\n}\n\ninterface EloBadgeProps {\n  rating: number;\n  division?: string;\n  trend?: 'up' | 'down' | 'flat';\n}`,
      usageSnippet: `<StreakBadge days={24} active={true} />\n<EloBadge rating={1840} division="Div 1" />`
    },
    {
      id: 'mol-stat',
      name: 'StatMetricCard',
      tier: 'molecule',
      category: 'Molecules / Metrics',
      icon: Award,
      file: 'src/components/molecules/StatMetricCard.tsx',
      description: 'Standardized scorecard displaying icon container, primary metric number, sublabel, and trend percentage.',
      propsSnippet: `interface StatMetricCardProps {\n  label: string;\n  value: string | number;\n  subtext?: string;\n  icon: React.ReactNode;\n  trend?: { direction: 'up' | 'down' | 'neutral'; text: string };\n  variant?: 'emerald' | 'cyan' | 'amber' | 'purple' | 'neutral';\n}`,
      usageSnippet: `<StatMetricCard label="Solved" value="382" icon={<Check />} variant="emerald" />`
    },
    {
      id: 'mol-search',
      name: 'SearchInput',
      tier: 'molecule',
      category: 'Molecules / Filtering',
      icon: Search,
      file: 'src/components/molecules/SearchInput.tsx',
      description: 'Dedicated search input with prefix icon, clear trigger, and ⌘K keyboard shortcut indicator.',
      propsSnippet: `interface SearchInputProps {\n  value: string;\n  onChange: (val: string) => void;\n  placeholder?: string;\n  onClear?: () => void;\n}`,
      usageSnippet: `<SearchInput value={query} onChange={setQuery} placeholder="Search topics..." />`
    },

    // ORGANISMS
    {
      id: 'org-compiler',
      name: 'CompilerView',
      tier: 'organism',
      category: 'Organisms / Problem Solving',
      icon: Terminal,
      file: 'src/components/CompilerView.tsx',
      description: 'Split-pane problem solver matching CodeHurdle /dsa/problems/:id/solve with code execution and AI mentor hints.',
      navTarget: 'compiler',
      propsSnippet: `interface CompilerViewProps {\n  onBackToDirectory?: () => void;\n  problemId?: string | number;\n}`,
      usageSnippet: `<CompilerView onBackToDirectory={() => navigate('/dsa')} />`
    },
    {
      id: 'org-cp',
      name: 'CpArenaView',
      tier: 'organism',
      category: 'Organisms / Contests',
      icon: Swords,
      file: 'src/components/CpArenaView.tsx',
      description: 'Contest problem catalog matching CodeHurdle /cp with strict limits, rating curves, and Div 1 standings.',
      navTarget: 'cp',
      propsSnippet: `interface CpArenaViewProps {\n  onSolveProblem?: (problemId: string | number) => void;\n}`,
      usageSnippet: `<CpArenaView onSolveProblem={id => openSolver(id)} />`
    },
    {
      id: 'org-explorer',
      name: 'ProblemExplorer',
      tier: 'organism',
      category: 'Organisms / Catalog',
      icon: BookOpen,
      file: 'src/components/ProblemExplorer.tsx',
      description: 'Filterable, searchable problem catalog matching CodeHurdle /dsa with difficulty badges and drawer inspection.',
      navTarget: 'problems',
      propsSnippet: `interface ProblemExplorerProps {\n  onSolveProblem?: (problemId: string | number) => void;\n}`,
      usageSnippet: `<ProblemExplorer onSolveProblem={id => openSolver(id)} />`
    },
    {
      id: 'org-roadmap',
      name: 'RoadmapView',
      tier: 'organism',
      category: 'Organisms / Curriculum',
      icon: Compass,
      file: 'src/components/RoadmapView.tsx',
      description: 'Structured 29-topic curriculum roadmap with sequential milestone progression and track completion metrics.',
      navTarget: 'roadmap',
      propsSnippet: `interface RoadmapViewProps {\n  onSelectProblem?: (problemId: string | number) => void;\n}`,
      usageSnippet: `<RoadmapView onSelectProblem={id => openSolver(id)} />`
    },
    {
      id: 'org-community',
      name: 'CommunityView',
      tier: 'organism',
      category: 'Organisms / Social',
      icon: Users,
      file: 'src/components/CommunityView.tsx',
      description: 'Interactive discussion channels (#dsa-help, #weekly-contest), mock interview pairing, and study rooms.',
      navTarget: 'community',
      propsSnippet: `interface CommunityViewProps {\n  channelId?: string;\n}`,
      usageSnippet: `<CommunityView />`
    },
    {
      id: 'org-jobprep',
      name: 'JobPrepView',
      tier: 'organism',
      category: 'Organisms / Careers',
      icon: Briefcase,
      file: 'src/components/JobPrepView.tsx',
      description: 'Interview guides and company vaults (Google, Meta, Amazon) with an AI resume ATS keyword scanner.',
      navTarget: 'jobprep',
      propsSnippet: `interface JobPrepViewProps {\n  companyId?: string;\n}`,
      usageSnippet: `<JobPrepView />`
    },
    {
      id: 'org-profile',
      name: 'UserProfileView',
      tier: 'organism',
      category: 'Organisms / Profile',
      icon: User,
      file: 'src/components/UserProfileView.tsx',
      description: 'Full profile dashboard showcasing Elo rating, 365-day submission heatmap, and difficulty breakdown.',
      navTarget: 'profile',
      propsSnippet: `interface UserProfileViewProps {\n  userId?: string;\n}`,
      usageSnippet: `<UserProfileView />`
    }
  ];

  const filteredComponents = selectedTier === 'all' 
    ? COMPONENTS 
    : COMPONENTS.filter(c => c.tier === selectedTier);

  const [selectedComp, setSelectedComp] = useState<ComponentDoc>(COMPONENTS[0]);

  if (!isOpen) return null;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    showToast("Code snippet copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  // -------------------------------------------------------------
  // RENDER DYNAMIC INTERACTIVE PLAYGROUND
  // -------------------------------------------------------------
  const renderInteractivePlayground = () => {
    switch (selectedComp.id) {
      // 1. BUTTON ATOM PLAYGROUND
      case 'atom-button':
        return (
          <div className="space-y-4 p-4 rounded-xl bg-zinc-950/80 border border-white/[0.08]">
            <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1.5">
                <MousePointerClick className="w-3.5 h-3.5" />
                Live Interactive Button Playground
              </span>
              <span className="text-xs font-mono text-zinc-400">Clicks: <strong className="text-emerald-400">{btnClicks}</strong></span>
            </div>

            {/* Interactive Controls */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <div>
                <label className="text-[10px] uppercase font-mono text-zinc-500 block mb-1">Variant</label>
                <select 
                  value={btnVariant} 
                  onChange={e => setBtnVariant(e.target.value as any)}
                  className="w-full bg-[#0c101c] border border-white/[0.08] rounded-lg px-2 py-1.5 text-xs text-zinc-200"
                >
                  <option value="primary">primary</option>
                  <option value="secondary">secondary</option>
                  <option value="outline">outline</option>
                  <option value="ghost">ghost</option>
                  <option value="danger">danger</option>
                  <option value="amber">amber</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] uppercase font-mono text-zinc-500 block mb-1">Size</label>
                <select 
                  value={btnSize} 
                  onChange={e => setBtnSize(e.target.value as any)}
                  className="w-full bg-[#0c101c] border border-white/[0.08] rounded-lg px-2 py-1.5 text-xs text-zinc-200"
                >
                  <option value="xs">xs</option>
                  <option value="sm">sm</option>
                  <option value="md">md</option>
                  <option value="lg">lg</option>
                </select>
              </div>

              <div className="flex flex-col justify-end">
                <label className="flex items-center gap-2 cursor-pointer py-1 text-zinc-300">
                  <input 
                    type="checkbox" 
                    checked={btnLoading} 
                    onChange={e => setBtnLoading(e.target.checked)}
                    className="rounded border-zinc-700 accent-emerald-500" 
                  />
                  <span>Loading</span>
                </label>
              </div>

              <div className="flex flex-col justify-end">
                <label className="flex items-center gap-2 cursor-pointer py-1 text-zinc-300">
                  <input 
                    type="checkbox" 
                    checked={btnDisabled} 
                    onChange={e => setBtnDisabled(e.target.checked)}
                    className="rounded border-zinc-700 accent-emerald-500" 
                  />
                  <span>Disabled</span>
                </label>
              </div>
            </div>

            {/* Live Interactive Target */}
            <div className="p-6 rounded-xl bg-zinc-900/50 border border-white/[0.04] flex flex-col items-center justify-center gap-3">
              <Button
                variant={btnVariant}
                size={btnSize}
                isLoading={btnLoading}
                disabled={btnDisabled}
                icon={<Play className="w-3.5 h-3.5" />}
                onClick={() => {
                  setBtnClicks(prev => prev + 1);
                  showToast(`Button clicked! (Total: ${btnClicks + 1})`);
                }}
              >
                Click Me To Test Feedback
              </Button>
              <span className="text-[11px] text-zinc-500 font-mono">
                Supports tactile active:scale, focus ring, and ARIA disabled states.
              </span>
            </div>
          </div>
        );

      // 2. BADGE ATOM PLAYGROUND
      case 'atom-badge':
        return (
          <div className="space-y-4 p-4 rounded-xl bg-zinc-950/80 border border-white/[0.08]">
            <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Live Interactive Badge & Difficulty Playground
              </span>
              <span className="text-xs font-mono text-zinc-400">Clicks: <strong className="text-emerald-400">{badgeClicks}</strong></span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <label className="text-[10px] uppercase font-mono text-zinc-500 block mb-1">Difficulty Pill</label>
                <div className="flex gap-1.5">
                  {(['Easy', 'Medium', 'Hard'] as const).map(d => (
                    <button
                      key={d}
                      onClick={() => setBadgeDifficulty(d)}
                      className={`px-2.5 py-1 rounded text-xs font-mono cursor-pointer transition-colors ${
                        badgeDifficulty === d ? 'bg-zinc-800 text-white border border-zinc-600' : 'text-zinc-500 hover:text-zinc-300'
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[10px] uppercase font-mono text-zinc-500 block mb-1">Badge Hue</label>
                <select 
                  value={badgeVariant} 
                  onChange={e => setBadgeVariant(e.target.value as any)}
                  className="w-full bg-[#0c101c] border border-white/[0.08] rounded-lg px-2 py-1.5 text-xs text-zinc-200"
                >
                  <option value="emerald">emerald</option>
                  <option value="amber">amber</option>
                  <option value="rose">rose</option>
                  <option value="cyan">cyan</option>
                  <option value="purple">purple</option>
                  <option value="neutral">neutral</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] uppercase font-mono text-zinc-500 block mb-1">Custom Label</label>
                <input 
                  type="text" 
                  value={badgeCustomText}
                  onChange={e => setBadgeCustomText(e.target.value)}
                  className="w-full bg-[#0c101c] border border-white/[0.08] rounded-lg px-2 py-1 text-xs text-zinc-200 font-mono"
                />
              </div>
            </div>

            {/* Live Interactive Badges */}
            <div className="p-6 rounded-xl bg-zinc-900/50 border border-white/[0.04] flex flex-wrap items-center justify-center gap-3">
              <div 
                onClick={() => {
                  setBadgeClicks(c => c + 1);
                  showToast(`Selected Difficulty: ${badgeDifficulty}`);
                }}
                className="cursor-pointer transition-transform hover:scale-105 active:scale-95"
              >
                <DifficultyBadge difficulty={badgeDifficulty} size="md" />
              </div>

              <div 
                onClick={() => {
                  setBadgeClicks(c => c + 1);
                  showToast(`Clicked Badge: ${badgeCustomText}`);
                }}
                className="cursor-pointer transition-transform hover:scale-105 active:scale-95"
              >
                <Badge variant={badgeVariant} size="md">
                  {badgeCustomText}
                </Badge>
              </div>

              <Badge variant="emerald" size="sm">Active Contest</Badge>
              <Badge variant="purple" size="sm">AI Mentor Active</Badge>
              <Badge variant="amber" size="sm">Top 5%</Badge>
            </div>
          </div>
        );

      // 3. CARD ATOM PLAYGROUND
      case 'atom-card':
        return (
          <div className="space-y-4 p-4 rounded-xl bg-zinc-950/80 border border-white/[0.08]">
            <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" />
                Live Interactive Card Surface Playground
              </span>
              <span className="text-xs font-mono text-zinc-400">Card Clicks: <strong className="text-emerald-400">{cardClickCount}</strong></span>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-zinc-500 font-mono">Surface Variant:</span>
                {(['default', 'surface', 'interactive', 'sunken'] as const).map(v => (
                  <button
                    key={v}
                    onClick={() => setCardVariant(v)}
                    className={`px-2.5 py-1 rounded text-xs font-mono cursor-pointer ${
                      cardVariant === v ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-zinc-900 text-zinc-400 border border-white/[0.06]'
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>

              <label className="flex items-center gap-2 cursor-pointer text-zinc-300">
                <input 
                  type="checkbox" 
                  checked={cardGlow} 
                  onChange={e => setCardGlow(e.target.checked)}
                  className="rounded border-zinc-700 accent-emerald-500" 
                />
                <span>Backdrop Radial Glow</span>
              </label>
            </div>

            {/* Clickable Card Instance */}
            <Card 
              variant={cardVariant} 
              glow={cardGlow}
              className="p-5 cursor-pointer transition-all hover:scale-[1.01]"
              onClick={() => {
                setCardClickCount(c => c + 1);
                showToast(`Interactive Card clicked! (Count: ${cardClickCount + 1})`);
              }}
            >
              <div className="flex items-start justify-between">
                <div>
                  <Badge variant="emerald" size="xs">Live Interactive Card</Badge>
                  <h4 className="text-base font-bold text-white mt-2">Dynamic Programming Track</h4>
                  <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                    Click this card surface to test active states, borders, and rounded-2xl obsidian tokens.
                  </p>
                </div>
                <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-mono text-xs font-bold">
                  #{cardClickCount}
                </div>
              </div>
            </Card>
          </div>
        );

      // 4. INPUT & TEXTAREA PLAYGROUND
      case 'atom-input':
        return (
          <div className="space-y-4 p-4 rounded-xl bg-zinc-950/80 border border-white/[0.08]">
            <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5" />
                Live Interactive Input & Form Workbench
              </span>
              <span className="text-xs font-mono text-zinc-400">Chars: <strong className="text-emerald-400">{inputVal.length}</strong></span>
            </div>

            <div className="flex gap-4 text-xs">
              <label className="flex items-center gap-2 cursor-pointer text-zinc-300">
                <input 
                  type="checkbox" 
                  checked={inputHasError} 
                  onChange={e => setInputHasError(e.target.checked)}
                  className="rounded border-zinc-700 accent-rose-500" 
                />
                <span className={inputHasError ? 'text-rose-400 font-bold' : ''}>Simulate Validation Error</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-zinc-300">
                <input 
                  type="checkbox" 
                  checked={inputPrefix} 
                  onChange={e => setInputPrefix(e.target.checked)}
                  className="rounded border-zinc-700 accent-emerald-500" 
                />
                <span>Search Prefix Icon</span>
              </label>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-[10px] uppercase font-mono text-zinc-500 block mb-1">Standard Text Input</label>
                <Input
                  value={inputVal}
                  onChange={e => setInputVal(e.target.value)}
                  placeholder="Type anything to test real-time validation..."
                  error={inputHasError}
                  prefix={inputPrefix ? <Search className="w-3.5 h-3.5 text-zinc-500" /> : undefined}
                />
              </div>

              <div>
                <label className="text-[10px] uppercase font-mono text-zinc-500 block mb-1">Monospace Scratchpad Textarea</label>
                <Textarea
                  value={inputVal}
                  onChange={e => setInputVal(e.target.value)}
                  placeholder="Write algorithm invariant notes..."
                  className="h-20 font-mono text-xs"
                />
              </div>
            </div>
          </div>
        );

      // 5. AVATAR PLAYGROUND
      case 'atom-avatar':
        return (
          <div className="space-y-4 p-4 rounded-xl bg-zinc-950/80 border border-white/[0.08]">
            <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" />
                Live Interactive Developer Avatar Workbench
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <label className="text-[10px] uppercase font-mono text-zinc-500 block mb-1">Name / Monogram</label>
                <input 
                  type="text" 
                  value={avatarName}
                  onChange={e => setAvatarName(e.target.value)}
                  className="w-full bg-[#0c101c] border border-white/[0.08] rounded-lg px-2 py-1 text-xs text-zinc-200 font-mono"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase font-mono text-zinc-500 block mb-1">Size</label>
                <select 
                  value={avatarSize} 
                  onChange={e => setAvatarSize(e.target.value as any)}
                  className="w-full bg-[#0c101c] border border-white/[0.08] rounded-lg px-2 py-1.5 text-xs text-zinc-200"
                >
                  <option value="xs">xs</option>
                  <option value="sm">sm</option>
                  <option value="md">md</option>
                  <option value="lg">lg</option>
                  <option value="xl">xl</option>
                </select>
              </div>

              <div className="flex flex-col justify-end gap-1">
                <label className="flex items-center gap-2 cursor-pointer text-zinc-300">
                  <input 
                    type="checkbox" 
                    checked={avatarPro} 
                    onChange={e => setAvatarPro(e.target.checked)}
                    className="rounded border-zinc-700 accent-amber-500" 
                  />
                  <span>PRO Badge</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-zinc-300">
                  <input 
                    type="checkbox" 
                    checked={avatarOnline} 
                    onChange={e => setAvatarOnline(e.target.checked)}
                    className="rounded border-zinc-700 accent-emerald-500" 
                  />
                  <span>Online Status Dot</span>
                </label>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-zinc-900/50 border border-white/[0.04] flex items-center justify-center gap-6">
              <Avatar 
                name={avatarName} 
                size={avatarSize} 
                isPro={avatarPro} 
                isOnline={avatarOnline} 
              />
              <div className="text-left font-mono text-xs">
                <div className="text-white font-semibold">{avatarName}</div>
                <div className="text-zinc-500 text-[11px]">{avatarPro ? 'CodeHurdle Pro Member' : 'Standard Member'}</div>
                <div className="text-emerald-400 text-[10px]">{avatarOnline ? '● Active in #dsa-help' : '○ Offline'}</div>
              </div>
            </div>
          </div>
        );

      // 6. PROGRESS BAR PLAYGROUND
      case 'atom-progress':
        return (
          <div className="space-y-4 p-4 rounded-xl bg-zinc-950/80 border border-white/[0.08]">
            <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5" />
                Live Interactive Telemetry Progress Bar
              </span>
              <span className="text-xs font-mono text-emerald-400 font-bold">{progressVal}%</span>
            </div>

            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between text-xs text-zinc-400 font-mono mb-1">
                  <span>Drag value slider:</span>
                  <span>{progressVal} / 100</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={progressVal}
                  onChange={e => setProgressVal(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="text-zinc-500 font-mono">Hues:</span>
                  {(['emerald', 'amber', 'rose', 'cyan', 'purple'] as const).map(h => (
                    <button
                      key={h}
                      onClick={() => setProgressVariant(h)}
                      className={`px-2 py-0.5 rounded text-[11px] font-mono capitalize cursor-pointer ${
                        progressVariant === h ? 'bg-zinc-800 text-white font-bold border border-zinc-600' : 'text-zinc-500 hover:text-zinc-300'
                      }`}
                    >
                      {h}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-1.5">
                  <Button size="xs" variant="outline" onClick={() => setProgressVal(Math.max(0, progressVal - 15))}>-15%</Button>
                  <Button size="xs" variant="outline" onClick={() => setProgressVal(Math.min(100, progressVal + 15))}>+15%</Button>
                  <Button size="xs" variant="primary" onClick={() => setProgressVal(100)}>Complete (100%)</Button>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-zinc-900/60 border border-white/[0.04] space-y-2">
                <div className="flex justify-between text-xs font-mono text-zinc-300">
                  <span>Binary Search Track Mastery</span>
                  <span className="font-bold">{progressVal}% Completed</span>
                </div>
                <ProgressBar value={progressVal} variant={progressVariant} size={progressSize} />
              </div>
            </div>
          </div>
        );

      // 7. TABGROUP PLAYGROUND
      case 'atom-tabs':
        return (
          <div className="space-y-4 p-4 rounded-xl bg-zinc-950/80 border border-white/[0.08]">
            <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5" />
                Live Interactive TabGroup Navigation
              </span>
              <span className="text-xs font-mono text-zinc-400">Active Tab: <strong className="text-emerald-400">{activeTestTab}</strong></span>
            </div>

            <div className="flex items-center gap-3 text-xs">
              <span className="text-zinc-500 font-mono">Variant:</span>
              <button
                onClick={() => setTabVariant('pill')}
                className={`px-3 py-1 rounded-lg text-xs font-mono cursor-pointer ${
                  tabVariant === 'pill' ? 'bg-zinc-800 text-white border border-zinc-700' : 'text-zinc-400'
                }`}
              >
                Pill Style
              </button>
              <button
                onClick={() => setTabVariant('underline')}
                className={`px-3 py-1 rounded-lg text-xs font-mono cursor-pointer ${
                  tabVariant === 'underline' ? 'bg-zinc-800 text-white border border-zinc-700' : 'text-zinc-400'
                }`}
              >
                Underline Style
              </button>
            </div>

            <div className="p-4 rounded-xl bg-zinc-900/60 border border-white/[0.04] space-y-4">
              <TabGroup
                tabs={[
                  { id: 'arrays', label: 'Arrays & Hashing (120)' },
                  { id: 'two_pointers', label: 'Two Pointers (45)', badge: '45' },
                  { id: 'trees', label: 'Binary Trees (80)' },
                  { id: 'dp', label: 'Dynamic Programming (110)' }
                ]}
                activeTab={activeTestTab}
                onChange={id => {
                  setActiveTestTab(id);
                  showToast(`Switched active tab to: ${id}`);
                }}
                variant={tabVariant}
              />

              <div className="p-3 rounded-lg bg-zinc-950 text-xs font-mono text-zinc-400">
                Displaying content pane for: <span className="text-emerald-400 font-bold">{activeTestTab}</span>
              </div>
            </div>
          </div>
        );

      // 8. MOLECULE: PROBLEM ROW
      case 'mol-prow':
        return (
          <div className="space-y-4 p-4 rounded-xl bg-zinc-950/80 border border-white/[0.08]">
            <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                Live Interactive ProblemRow Molecule
              </span>
              <span className="text-xs font-mono text-zinc-400">
                Status: <strong className={rowSolved ? 'text-emerald-400' : 'text-zinc-500'}>{rowSolved ? 'SOLVED' : 'UNSOLVED'}</strong>
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="text-zinc-500 font-mono">Difficulty:</span>
                {(['Easy', 'Medium', 'Hard'] as const).map(d => (
                  <button
                    key={d}
                    onClick={() => setRowDiff(d)}
                    className={`px-2 py-0.5 rounded text-[11px] font-mono cursor-pointer ${
                      rowDiff === d ? 'bg-zinc-800 text-white font-bold border border-zinc-600' : 'text-zinc-500'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <span className="text-zinc-500 font-mono">Frequency:</span>
                <input 
                  type="range" 
                  min="20" 
                  max="100" 
                  value={rowFreq} 
                  onChange={e => setRowFreq(Number(e.target.value))}
                  className="w-20 accent-amber-500" 
                />
                <span className="font-mono text-zinc-300">{rowFreq}%</span>
              </div>
            </div>

            {/* Clickable ProblemRow Table wrapper */}
            <div className="overflow-x-auto rounded-xl border border-white/[0.08] bg-[#0c101c]">
              <table className="w-full text-left border-collapse text-xs">
                <tbody>
                  <ProblemRow
                    problem={{
                      id: 33,
                      title: 'Search in Rotated Sorted Array',
                      difficulty: rowDiff,
                      category: 'Binary Search',
                      acceptance: '39.8%',
                      companies: ['Google', 'Meta', 'Amazon'],
                      solved: rowSolved,
                      starred: rowStarred,
                      frequency: rowFreq
                    }}
                    onSelect={() => showToast("Problem row selected! Drawer preview updated.")}
                    onSolve={() => showToast("Launch in-browser compiler IDE for Problem #33")}
                    onToggleSolved={(e) => {
                      e.stopPropagation();
                      setRowSolved(!rowSolved);
                      showToast(rowSolved ? "Marked Problem as Unsolved" : "Marked Problem as SOLVED! (+100 XP)");
                    }}
                    onToggleStarred={(e) => {
                      e.stopPropagation();
                      setRowStarred(!rowStarred);
                      showToast(rowStarred ? "Removed from Favorites" : "Added to Starred Favorites!");
                    }}
                  />
                </tbody>
              </table>
            </div>

            <div className="text-[11px] text-zinc-500 font-mono flex items-center justify-between">
              <span>💡 Click the circle/check to toggle solved. Click the star to bookmark.</span>
              <Button size="xs" variant="primary" onClick={() => onNavigateToView('compiler')}>
                Open in Full IDE
              </Button>
            </div>
          </div>
        );

      // 9. MOLECULE: STREAK & ELO BADGE
      case 'mol-streak':
        return (
          <div className="space-y-4 p-4 rounded-xl bg-zinc-950/80 border border-white/[0.08]">
            <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5" />
                Live Interactive Streak & Elo Gamification Badges
              </span>
            </div>

            {/* Streak Controls */}
            <div className="p-4 rounded-xl bg-zinc-900/60 border border-white/[0.04] space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-white">Daily Coding Streak Molecule</div>
                  <div className="text-[11px] text-zinc-400">Current habit persistence: {streakDays} days</div>
                </div>
                <StreakBadge days={streakDays} />
              </div>

              <div className="flex items-center gap-2">
                <Button 
                  size="xs" 
                  variant="amber" 
                  icon={<Flame className="w-3.5 h-3.5" />}
                  onClick={() => {
                    setStreakDays(s => s + 1);
                    showToast(`Streak Increased! 🔥 ${streakDays + 1} Days`);
                  }}
                >
                  Solve Today (+1 Day)
                </Button>
                <Button size="xs" variant="outline" onClick={() => setStreakDays(0)}>Reset Streak</Button>
              </div>
            </div>

            {/* Elo Controls */}
            <div className="p-4 rounded-xl bg-zinc-900/60 border border-white/[0.04] space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-white">Competitive Programming Elo Molecule</div>
                  <div className="text-[11px] text-zinc-400">Dynamically maps Elo to Codeforces/CodeHurdle Division</div>
                </div>
                <EloBadge 
                  rating={eloRating} 
                  division={eloRating >= 1900 ? 'Div 1' : eloRating >= 1400 ? 'Div 2' : 'Div 3'} 
                  trend={eloTrend}
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono text-zinc-400 mb-1">
                  <span>Simulate Rating Change:</span>
                  <span className="font-bold text-cyan-400">{eloRating} Elo</span>
                </div>
                <input 
                  type="range" 
                  min="1100" 
                  max="2400" 
                  step="25"
                  value={eloRating} 
                  onChange={e => setEloRating(Number(e.target.value))}
                  className="w-full accent-cyan-500 cursor-pointer" 
                />
              </div>

              <div className="flex items-center gap-2 text-xs">
                <span className="text-zinc-500 font-mono">Trend:</span>
                {(['up', 'down', 'flat'] as const).map(t => (
                  <button
                    key={t}
                    onClick={() => setEloTrend(t)}
                    className={`px-2 py-0.5 rounded text-[11px] font-mono capitalize cursor-pointer ${
                      eloTrend === t ? 'bg-zinc-800 text-white font-bold border border-zinc-600' : 'text-zinc-500'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      // 10. MOLECULE: STAT METRIC CARD
      case 'mol-stat':
        return (
          <div className="space-y-4 p-4 rounded-xl bg-zinc-950/80 border border-white/[0.08]">
            <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5" />
                Live Interactive StatMetricCard Molecule
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-zinc-500 font-mono">Accent Hue:</span>
                {(['emerald', 'cyan', 'amber', 'purple'] as const).map(v => (
                  <button
                    key={v}
                    onClick={() => setStatVariant(v)}
                    className={`px-2.5 py-1 rounded text-xs font-mono capitalize cursor-pointer ${
                      statVariant === v ? 'bg-zinc-800 text-white font-bold border border-zinc-600' : 'text-zinc-500'
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <span className="text-zinc-500 font-mono">Value:</span>
                <input 
                  type="text" 
                  value={statVal} 
                  onChange={e => setStatVal(e.target.value)}
                  className="w-28 bg-[#0c101c] border border-white/[0.08] rounded px-2 py-0.5 text-xs font-mono text-zinc-200"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <StatMetricCard
                label="Mastery Index"
                value={statVal}
                subtext="Global percentile: Top 4.8%"
                icon={<BookOpen className="w-4 h-4 text-emerald-400" />}
                trend={{ direction: 'up', text: '+12 this week' }}
                variant={statVariant}
              />
              <StatMetricCard
                label="Contest Rating"
                value="1,840 Elo"
                subtext="Division 1 Candidate Master"
                icon={<Award className="w-4 h-4 text-cyan-400" />}
                trend={{ direction: 'up', text: '+64 pts in round #89' }}
                variant="cyan"
              />
            </div>
          </div>
        );

      // 11. MOLECULE: SEARCH INPUT
      case 'mol-search':
        return (
          <div className="space-y-4 p-4 rounded-xl bg-zinc-950/80 border border-white/[0.08]">
            <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1.5">
                <Search className="w-3.5 h-3.5" />
                Live Interactive SearchInput Molecule
              </span>
            </div>

            <SearchInput
              value={liveSearchQuery}
              onChange={setLiveSearchQuery}
              onClear={() => {
                setLiveSearchQuery('');
                showToast("Search cleared!");
              }}
              placeholder="Search problems by keyword, company tag, or pattern..."
            />

            <div className="p-3 rounded-lg bg-zinc-900/60 border border-white/[0.04] text-xs font-mono text-zinc-400 space-y-1">
              <div>Simulated Query Result for: <strong className="text-emerald-400">"{liveSearchQuery}"</strong></div>
              <div className="text-[11px] text-zinc-500">
                {liveSearchQuery.trim() ? `Found 14 matching algorithmic problems matching '${liveSearchQuery}'` : 'Showing all 520 curated problems.'}
              </div>
            </div>
          </div>
        );

      // 12. ORGANISM: COMPILER VIEW SANDBOX
      case 'org-compiler':
        return (
          <div className="space-y-4 p-4 rounded-xl bg-zinc-950/80 border border-white/[0.08]">
            <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5" />
                Live Interactive In-Drawer Compiler IDE Sandbox
              </span>
              <Button size="xs" variant="primary" onClick={() => onNavigateToView('compiler')}>
                Full Split-Pane View <ExternalLink className="w-3 h-3 ml-1" />
              </Button>
            </div>

            <div className="flex items-center justify-between text-xs">
              <div className="flex gap-1 font-mono">
                {(['python', 'cpp', 'js'] as const).map(l => (
                  <button
                    key={l}
                    onClick={() => {
                      setCompilerLang(l);
                      if (l === 'cpp') setCompilerCode(`#include <vector>\nusing namespace std;\n\nint search(vector<int>& nums, int target) {\n    int l = 0, r = nums.size() - 1;\n    while(l <= r) {\n        int m = l + (r-l)/2;\n        if(nums[m] == target) return m;\n        if(nums[m] < target) l = m + 1;\n        else r = m - 1;\n    }\n    return -1;\n}`);
                      else if (l === 'js') setCompilerCode(`function search(nums, target) {\n  let left = 0, right = nums.length - 1;\n  while (left <= right) {\n    const mid = Math.floor((left + right) / 2);\n    if (nums[mid] === target) return mid;\n    if (nums[mid] < target) left = mid + 1;\n    else right = mid - 1;\n  }\n  return -1;\n}`);
                      else setCompilerCode(`def solve(nums, target):\n    left, right = 0, len(nums) - 1\n    while left <= right:\n        mid = (left + right) // 2\n        if nums[mid] == target: return mid\n        elif nums[mid] < target: left = mid + 1\n        else: right = mid - 1\n    return -1`);
                    }}
                    className={`px-2.5 py-1 rounded text-xs cursor-pointer ${
                      compilerLang === l ? 'bg-zinc-800 text-white border border-zinc-700' : 'text-zinc-500 hover:text-zinc-300'
                    }`}
                  >
                    {l === 'python' ? 'Python 3' : l === 'cpp' ? 'C++ 17' : 'JavaScript'}
                  </button>
                ))}
              </div>

              <Button
                variant="primary"
                size="xs"
                isLoading={compilerRunning}
                icon={<Play className="w-3 h-3 fill-black" />}
                onClick={() => {
                  setCompilerRunning(true);
                  setTimeout(() => {
                    setCompilerRunning(false);
                    setCompilerOutput(`Compilation: OK\nExecuting 48 official testcases...\n[TestCase 1]: target=9 -> 4 (PASS 18ms)\n[TestCase 2]: target=2 -> -1 (PASS 16ms)\n[TestCase 3]: target=5 -> 0 (PASS 19ms)\n----------------------------------------\nVERDICT: ACCEPTED (Runtime: 24ms | Beats 98.2%)\nMemory Footprint: 16.8 MB (Beats 91.4%)\n+100 XP awarded.`);
                    showToast("Code Executed! Status: ACCEPTED");
                  }, 600);
                }}
              >
                Run In-Sandbox
              </Button>
            </div>

            {/* Code Textarea */}
            <Textarea
              value={compilerCode}
              onChange={e => setCompilerCode(e.target.value)}
              className="h-36 font-mono text-xs text-emerald-300 bg-zinc-950"
              spellCheck={false}
            />

            {/* Simulated Console Output */}
            {compilerOutput && (
              <div className="p-3 rounded-lg bg-zinc-950 border border-emerald-500/30 font-mono text-xs text-zinc-300 whitespace-pre-wrap leading-relaxed animate-fade-in">
                <div className="flex items-center gap-1.5 text-emerald-400 font-bold mb-1 text-[11px]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Execution Output
                </div>
                {compilerOutput}
              </div>
            )}
          </div>
        );

      // 13. ORGANISM: CP ARENA SANDBOX
      case 'org-cp':
        return (
          <div className="space-y-4 p-4 rounded-xl bg-zinc-950/80 border border-white/[0.08]">
            <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
              <span className="text-xs font-mono uppercase tracking-wider text-rose-400 font-bold flex items-center gap-1.5">
                <Swords className="w-3.5 h-3.5" />
                Live Interactive CP Arena Sandbox
              </span>
              <Button size="xs" variant="primary" onClick={() => onNavigateToView('cp')}>
                Full CP Arena View <ExternalLink className="w-3 h-3 ml-1" />
              </Button>
            </div>

            <Card variant="surface" className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <Badge variant="rose" size="xs">Div 1 & Div 2 Contest</Badge>
                  <h4 className="text-sm font-bold text-white mt-1">CodeHurdle Weekly Round #92</h4>
                  <p className="text-xs text-zinc-400">4 problems · 120 minutes · Dynamic rating recalculation</p>
                </div>
                <div className="text-right">
                  <div className="text-xs font-mono font-bold text-amber-400">Starts in 18h 42m</div>
                  <div className="text-[11px] text-zinc-500 font-mono">1,429 Registrations</div>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-white/[0.06]">
                <span className="text-xs font-mono text-zinc-400">Status: {cpRegistered ? <strong className="text-emerald-400 font-bold">Registered ✓</strong> : 'Not Registered'}</span>
                <Button 
                  size="xs" 
                  variant={cpRegistered ? 'outline' : 'primary'}
                  onClick={() => {
                    setCpRegistered(!cpRegistered);
                    showToast(cpRegistered ? "Registration cancelled" : "Registered for Weekly Round #92!");
                  }}
                >
                  {cpRegistered ? 'Cancel Registration' : 'Register for Contest'}
                </Button>
              </div>
            </Card>
          </div>
        );

      // 14. ORGANISM: PROBLEM EXPLORER SANDBOX
      case 'org-explorer':
        return (
          <div className="space-y-4 p-4 rounded-xl bg-zinc-950/80 border border-white/[0.08]">
            <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                Live Interactive Problem Explorer Sandbox
              </span>
              <Button size="xs" variant="primary" onClick={() => onNavigateToView('problems')}>
                Open Full Catalog <ExternalLink className="w-3 h-3 ml-1" />
              </Button>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-mono text-zinc-400">Select problem to test live preview drawer:</div>
              <div className="grid grid-cols-1 gap-2">
                {[
                  { id: 1, title: 'Two Sum', diff: 'Easy' as DifficultyLevel, acc: '49.2%', tags: ['Arrays', 'Hash Map'] },
                  { id: 146, title: 'LRU Cache', diff: 'Medium' as DifficultyLevel, acc: '43.1%', tags: ['Doubly Linked List', 'Hash Map'] },
                  { id: 23, title: 'Merge k Sorted Lists', diff: 'Hard' as DifficultyLevel, acc: '52.0%', tags: ['Heap', 'Divide & Conquer'] }
                ].map(p => (
                  <div 
                    key={p.id}
                    onClick={() => showToast(`Selected Problem #${p.id}: ${p.title}`)}
                    className="p-3 rounded-lg bg-zinc-900/60 border border-white/[0.06] hover:border-emerald-500/40 flex items-center justify-between cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-bold text-zinc-500">#{p.id}</span>
                      <span className="text-xs font-semibold text-zinc-200">{p.title}</span>
                      <DifficultyBadge difficulty={p.diff} size="xs" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono text-zinc-500">{p.acc}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-zinc-600" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      // 15. ORGANISM: ROADMAP SANDBOX
      case 'org-roadmap':
        return (
          <div className="space-y-4 p-4 rounded-xl bg-zinc-950/80 border border-white/[0.08]">
            <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
              <span className="text-xs font-mono uppercase tracking-wider text-purple-400 font-bold flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5" />
                Live Interactive 29-Tracks Roadmap Sandbox
              </span>
              <Button size="xs" variant="primary" onClick={() => onNavigateToView('roadmap')}>
                Full Roadmap View <ExternalLink className="w-3 h-3 ml-1" />
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {[
                { track: '01. Complexity Analysis', count: '12/12', status: 'Completed' },
                { track: '04. Arrays & Prefix Sums', count: '28/28', status: 'Completed' },
                { track: '10. Binary Search', count: '18/26', status: 'In Progress' },
                { track: '16. Dynamic Programming', count: '0/32', status: 'Locked' }
              ].map(t => (
                <div 
                  key={t.track}
                  onClick={() => showToast(`Inspecting Track: ${t.track}`)}
                  className="p-3 rounded-lg bg-zinc-900/60 border border-white/[0.06] hover:border-purple-500/40 cursor-pointer transition-colors"
                >
                  <div className="text-xs font-bold text-zinc-200">{t.track}</div>
                  <div className="flex items-center justify-between mt-1 text-[11px] font-mono">
                    <span className="text-zinc-500">{t.count}</span>
                    <span className={t.status === 'Completed' ? 'text-emerald-400' : t.status === 'In Progress' ? 'text-amber-400' : 'text-zinc-600'}>
                      {t.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      // 16. ORGANISM: COMMUNITY SANDBOX
      case 'org-community':
        return (
          <div className="space-y-4 p-4 rounded-xl bg-zinc-950/80 border border-white/[0.08]">
            <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
              <span className="text-xs font-mono uppercase tracking-wider text-indigo-400 font-bold flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5" />
                Live Interactive Community Chat Sandbox (#dsa-help)
              </span>
              <Button size="xs" variant="primary" onClick={() => onNavigateToView('community')}>
                Full Community View <ExternalLink className="w-3 h-3 ml-1" />
              </Button>
            </div>

            {/* Message Thread */}
            <div className="space-y-2 max-h-36 overflow-y-auto p-2 bg-zinc-950 rounded-lg border border-white/[0.06]">
              {commMessages.map((m, idx) => (
                <div key={idx} className="text-xs font-sans">
                  <span className="font-bold text-emerald-400">{m.user}: </span>
                  <span className="text-zinc-300">{m.text}</span>
                  <span className="text-[10px] text-zinc-600 ml-2 font-mono">{m.time}</span>
                </div>
              ))}
            </div>

            {/* Input to send chat message */}
            <div className="flex items-center gap-2">
              <Input
                value={commDraft}
                onChange={e => setCommDraft(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter' && commDraft.trim()) {
                    setCommMessages(prev => [...prev, { user: 'You', text: commDraft, time: 'Just now' }]);
                    setCommDraft('');
                    showToast("Message posted to #dsa-help!");
                  }
                }}
                placeholder="Type question in #dsa-help and press Enter..."
                className="text-xs"
              />
              <Button
                size="sm"
                variant="primary"
                icon={<Send className="w-3.5 h-3.5" />}
                onClick={() => {
                  if (commDraft.trim()) {
                    setCommMessages(prev => [...prev, { user: 'You', text: commDraft, time: 'Just now' }]);
                    setCommDraft('');
                    showToast("Message posted to #dsa-help!");
                  }
                }}
              />
            </div>
          </div>
        );

      // 17. ORGANISM: JOB PREP SANDBOX
      case 'org-jobprep':
        return (
          <div className="space-y-4 p-4 rounded-xl bg-zinc-950/80 border border-white/[0.08]">
            <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
              <span className="text-xs font-mono uppercase tracking-wider text-blue-400 font-bold flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5" />
                Live Interactive Job Prep ATS Scanner Sandbox
              </span>
              <Button size="xs" variant="primary" onClick={() => onNavigateToView('jobprep')}>
                Full Job Prep View <ExternalLink className="w-3 h-3 ml-1" />
              </Button>
            </div>

            <Textarea
              value={resumeText}
              onChange={e => setResumeText(e.target.value)}
              placeholder="Paste tech stack or resume highlights..."
              className="h-20 text-xs font-mono"
            />

            <div className="flex items-center justify-between">
              <Button 
                size="xs" 
                variant="primary"
                onClick={() => {
                  const score = Math.floor(Math.random() * 15) + 84;
                  setAtsScore(score);
                  showToast(`Resume Analyzed! Target FAANG Match: ${score}%`);
                }}
              >
                Scan Against Google / Meta Bar
              </Button>

              {atsScore !== null && (
                <div className="text-xs font-mono text-emerald-400 font-bold animate-fade-in">
                  Match Score: {atsScore}% Match ✓
                </div>
              )}
            </div>
          </div>
        );

      // 18. ORGANISM: USER PROFILE SANDBOX
      case 'org-profile':
        return (
          <div className="space-y-4 p-4 rounded-xl bg-zinc-950/80 border border-white/[0.08]">
            <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
              <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" />
                Live Interactive User Profile Analytics Sandbox
              </span>
              <Button size="xs" variant="primary" onClick={() => onNavigateToView('profile')}>
                Full Profile View <ExternalLink className="w-3 h-3 ml-1" />
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center">
              <div 
                onClick={() => showToast("Easy Solved: 142 / 160")} 
                className="p-3 rounded-lg bg-zinc-900/60 border border-emerald-500/20 cursor-pointer hover:bg-emerald-500/10 transition-colors"
              >
                <div className="text-[10px] font-mono uppercase text-emerald-400">Easy</div>
                <div className="text-lg font-bold text-white font-mono">142</div>
              </div>
              <div 
                onClick={() => showToast("Medium Solved: 188 / 260")} 
                className="p-3 rounded-lg bg-zinc-900/60 border border-amber-500/20 cursor-pointer hover:bg-amber-500/10 transition-colors"
              >
                <div className="text-[10px] font-mono uppercase text-amber-400">Medium</div>
                <div className="text-lg font-bold text-white font-mono">188</div>
              </div>
              <div 
                onClick={() => showToast("Hard Solved: 52 / 100")} 
                className="p-3 rounded-lg bg-zinc-900/60 border border-rose-500/20 cursor-pointer hover:bg-rose-500/10 transition-colors"
              >
                <div className="text-[10px] font-mono uppercase text-rose-400">Hard</div>
                <div className="text-lg font-bold text-white font-mono">52</div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-sm font-sans animate-fade-in">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-[60] bg-emerald-500 text-zinc-950 font-bold text-xs px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="w-full max-w-3xl bg-[#0b0e14] border-l border-white/[0.08] h-full flex flex-col shadow-2xl">
        {/* Header */}
        <div className="p-5 border-b border-white/[0.08] flex items-center justify-between bg-zinc-950/80">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white">CodeHurdle Atomic Design System</h2>
                <Badge variant="emerald" size="xs">100% Interactive Workbench</Badge>
              </div>
              <p className="text-xs text-zinc-400 mt-0.5">Live sandbox controls for every Atom, Molecule, and Organism</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tier Switcher Bar */}
        <div className="px-6 py-3 border-b border-white/[0.08] bg-zinc-950/40 flex items-center justify-between">
          <TabGroup
            tabs={[
              { id: 'all', label: 'All Components' },
              { id: 'atom', label: 'Atoms (7)' },
              { id: 'molecule', label: 'Molecules (4)' },
              { id: 'organism', label: 'Organisms (7)' }
            ]}
            activeTab={selectedTier}
            onChange={id => {
              setSelectedTier(id as AtomicTier);
              const found = COMPONENTS.find(c => id === 'all' || c.tier === id);
              if (found) setSelectedComp(found);
            }}
            variant="pill"
          />
          <span className="text-xs font-mono text-zinc-500 hidden sm:inline">
            {filteredComponents.length} components
          </span>
        </div>

        {/* Content body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
          {/* Component Tabs Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {filteredComponents.map(c => {
              const Icon = c.icon;
              const isSelected = selectedComp.id === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => setSelectedComp(c)}
                  className={`p-3 rounded-xl border text-left transition-all flex flex-col gap-1.5 cursor-pointer ${
                    isSelected
                      ? 'bg-zinc-800/90 border-emerald-500/60 text-white shadow-lg shadow-emerald-950/20'
                      : 'bg-zinc-900/40 border-white/[0.06] text-zinc-400 hover:text-zinc-200 hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <Icon className={`w-4 h-4 ${isSelected ? 'text-emerald-400' : 'text-zinc-500'}`} />
                    <span className={`text-[9px] font-mono uppercase px-1.5 py-0.5 rounded ${
                      c.tier === 'atom' ? 'bg-cyan-500/10 text-cyan-400' :
                      c.tier === 'molecule' ? 'bg-amber-500/10 text-amber-400' :
                      'bg-purple-500/10 text-purple-400'
                    }`}>
                      {c.tier}
                    </span>
                  </div>
                  <span className="text-xs font-semibold line-clamp-1">{c.name}</span>
                  <span className="text-[10px] text-zinc-500 font-mono truncate">{c.category.split('/')[1]?.trim() || c.category}</span>
                </button>
              );
            })}
          </div>

          {/* Selected Component Card */}
          <Card variant="surface" className="p-6 space-y-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <Badge 
                    variant={
                      selectedComp.tier === 'atom' ? 'cyan' :
                      selectedComp.tier === 'molecule' ? 'amber' : 'purple'
                    }
                    size="xs"
                  >
                    {selectedComp.tier.toUpperCase()}
                  </Badge>
                  <span className="text-xs font-mono text-zinc-500">{selectedComp.category}</span>
                </div>
                <h3 className="text-xl font-bold text-white mt-1.5">{selectedComp.name}</h3>
                <span className="text-xs font-mono text-zinc-400">{selectedComp.file}</span>
              </div>

              {selectedComp.navTarget && (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    onNavigateToView(selectedComp.navTarget!);
                    onClose();
                  }}
                  icon={<ExternalLink className="w-3.5 h-3.5" />}
                >
                  Full Page View
                </Button>
              )}
            </div>

            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              {selectedComp.description}
            </p>

            {/* LIVE INTERACTIVE PLAYGROUND FOR THIS COMPONENT */}
            {renderInteractivePlayground()}

            {/* Props snippet */}
            <div>
              <div className="text-xs font-mono uppercase text-zinc-400 mb-1.5">Component Props Interface:</div>
              <div className="p-3.5 rounded-xl bg-zinc-950 border border-white/[0.08] font-mono text-xs text-zinc-300 overflow-x-auto">
                <pre>{selectedComp.propsSnippet}</pre>
              </div>
            </div>

            {/* Usage snippet */}
            <div>
              <div className="flex items-center justify-between text-xs font-mono uppercase text-zinc-400 mb-1.5">
                <span>Usage Example:</span>
                <button
                  onClick={() => handleCopy(selectedComp.usageSnippet)}
                  className="flex items-center gap-1 text-[11px] text-zinc-400 hover:text-white cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy Code'}</span>
                </button>
              </div>
              <div className="p-3.5 rounded-xl bg-zinc-950 border border-white/[0.08] font-mono text-xs text-emerald-300 overflow-x-auto">
                <pre>{selectedComp.usageSnippet}</pre>
              </div>
            </div>
          </Card>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/[0.08] bg-zinc-950/70 flex items-center justify-between text-xs text-zinc-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>All atoms, molecules, and organisms now feature live stateful sandboxes</span>
          </div>
          <Button 
            variant="secondary"
            size="sm"
            onClick={onClose}
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};
