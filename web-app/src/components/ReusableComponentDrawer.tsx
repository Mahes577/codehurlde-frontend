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
  Activity,
  Building2,
  HelpCircle,
  Clock,
  Palette,
  Type,
  Maximize2,
  ChevronRight,
  TrendingUp,
  LayoutGrid
} from 'lucide-react';
import { ActiveView } from './Navbar';
import { tokens } from '../tokens';
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
  ProblemRow,
  CompanyPill,
  FaqAccordionItem,
  DifficultyBreakdownBar,
  ContestCard,
  AlgorithmStepController
} from './atomic';

export type AtomicTier = 'all' | 'token' | 'atom' | 'molecule' | 'organism';

interface ComponentDoc {
  id: string;
  name: string;
  tier: 'token' | 'atom' | 'molecule' | 'organism';
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
    setTimeout(() => setToastMessage(null), 2400);
  };

  // -------------------------------------------------------------
  // INTERACTIVE WORKBENCH STATES
  // -------------------------------------------------------------
  // Button Atom
  const [btnVariant, setBtnVariant] = useState<'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'amber'>('primary');
  const [btnSize, setBtnSize] = useState<'xs' | 'sm' | 'md' | 'lg'>('sm');
  const [btnLoading, setBtnLoading] = useState(false);
  const [btnClicks, setBtnClicks] = useState(0);

  // Badge Atom
  const [badgeDifficulty, setBadgeDifficulty] = useState<DifficultyLevel>('Medium');
  const [badgeVariant, setBadgeVariant] = useState<'emerald' | 'amber' | 'rose' | 'cyan' | 'purple' | 'neutral'>('cyan');
  const [badgeCustomText, setBadgeCustomText] = useState('O(log N)');

  // Card Atom
  const [cardVariant, setCardVariant] = useState<'default' | 'surface' | 'interactive' | 'sunken'>('interactive');
  const [cardClicks, setCardClicks] = useState(0);

  // Input Atom
  const [inputVal, setInputVal] = useState('Binary Search on Range');
  const [inputHasError, setInputHasError] = useState(false);

  // Avatar Atom
  const [avatarName, setAvatarName] = useState('Aarav Sharma');
  const [avatarPro, setAvatarPro] = useState(true);
  const [avatarOnline, setAvatarOnline] = useState(true);

  // ProgressBar Atom
  const [progressVal, setProgressVal] = useState(72);
  const [progressVariant, setProgressVariant] = useState<'emerald' | 'amber' | 'rose' | 'cyan' | 'purple'>('emerald');

  // TabGroup Atom
  const [tabVariant, setTabVariant] = useState<'pill' | 'underline'>('pill');
  const [activeTabDemo, setActiveTabDemo] = useState('dp');

  // -------------------------------------------------------------
  // MOLECULES WORKBENCH STATES
  // -------------------------------------------------------------
  // ProblemRow Molecule
  const [rowSolved, setRowSolved] = useState(false);
  const [rowStarred, setRowStarred] = useState(true);
  const [rowDiff, setRowDiff] = useState<DifficultyLevel>('Medium');
  const [rowFreq, setRowFreq] = useState(88);

  // Streak Molecule
  const [streakDays, setStreakDays] = useState(14);

  // Elo Molecule
  const [eloRating, setEloRating] = useState(1840);
  const [eloTrend, setEloTrend] = useState<'up' | 'down' | 'flat'>('up');

  // StatMetricCard Molecule
  const [statVal, setStatVal] = useState('382 / 520');
  const [statVariant, setStatVariant] = useState<'emerald' | 'cyan' | 'amber' | 'purple' | 'neutral'>('emerald');

  // SearchInput Molecule
  const [searchVal, setSearchVal] = useState('Dynamic Programming');

  // CompanyPill Molecule
  const [activeCompanyDemo, setActiveCompanyDemo] = useState('Google');

  // FaqAccordionItem Molecule
  const [faqOpenDemo, setFaqOpenDemo] = useState(true);

  // DifficultyBreakdownBar Molecule
  const [breakdownEasy, setBreakdownEasy] = useState(184);
  const [breakdownMed, setBreakdownMed] = useState(142);
  const [breakdownHard, setBreakdownHard] = useState(34);

  // ContestCard Molecule
  const [contestRegistered, setContestRegistered] = useState(false);

  // AlgorithmStepController Molecule
  const [algoStep, setAlgoStep] = useState(2);
  const [algoTotal] = useState(4);

  // -------------------------------------------------------------
  // COMPONENT DIRECTORY
  // -------------------------------------------------------------
  const COMPONENTS: ComponentDoc[] = [
    // 1. DESIGN TOKENS
    {
      id: 'token-colors',
      name: 'Color & Difficulty Tokens',
      tier: 'token',
      category: 'Tokens / Palette',
      icon: Palette,
      file: 'src/tokens/index.ts',
      description: 'Master color tokens: Obsidian base canvas (#07090e, #0c101c), Difficulty emerald/amber/rose hues, Division cyan/purple tiers, and flame accents.',
      propsSnippet: `export const tokens = {\n  colors: {\n    base: { canvas: '#07090e', surface: '#0c101c', elevated: '#111625' },\n    difficulty: {\n      easy: '#10b981',\n      medium: '#f59e0b',\n      hard: '#f43f5e'\n    },\n    divisions: { div1: '#22d3ee', div2: '#c084fc', div3: '#94a3b8' }\n  }\n};`,
      usageSnippet: `import { tokens } from '../tokens';\nconst easyColor = tokens.colors.difficulty.easy;`
    },
    {
      id: 'token-typography',
      name: 'Typography Tokens',
      tier: 'token',
      category: 'Tokens / Typography',
      icon: Type,
      file: 'src/tokens/index.ts',
      description: 'Standardized typography rules: Inter for UI prose, JetBrains/Consolas monospace for code, metrics, Big-O invariants, and tabular data.',
      propsSnippet: `export const tokens = {\n  typography: {\n    fontSans: 'ui-sans-serif, system-ui, -apple-system, sans-serif',\n    fontMono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',\n    sizes: { xs: '0.75rem', sm: '0.875rem', base: '1rem', lg: '1.125rem' }\n  }\n};`,
      usageSnippet: `<span className="font-mono text-emerald-400 font-bold">O(N log N)</span>`
    },
    {
      id: 'token-radii',
      name: 'Radii & Border Tokens',
      tier: 'token',
      category: 'Tokens / Geometry',
      icon: LayoutGrid,
      file: 'src/tokens/index.ts',
      description: 'Unified geometry: rounded-xl for interactive inputs and pills, rounded-2xl for surface cards, and subtle border-white/[0.08] for clean separation.',
      propsSnippet: `export const tokens = {\n  radii: { sm: '6px', md: '8px', lg: '12px', xl: '16px', '2xl': '20px', full: '9999px' },\n  borders: { standard: 'border-white/[0.08]', active: 'border-emerald-500/50' }\n};`,
      usageSnippet: `<div className="rounded-2xl border border-white/[0.08] bg-[#0c101c]" />`
    },

    // 2. ATOMS
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
    {
      id: 'atom-section',
      name: 'SectionHeader',
      tier: 'atom',
      category: 'Atoms / Typography',
      icon: Type,
      file: 'src/components/atoms/SectionHeader.tsx',
      description: 'Standardized section title banner with eyebrow tag, highlight gradient phrase, subtitle, and action button slot.',
      propsSnippet: `interface SectionHeaderProps {\n  eyebrow: string;\n  title: string;\n  highlightText?: string;\n  subtitle?: string;\n  action?: React.ReactNode;\n}`,
      usageSnippet: `<SectionHeader eyebrow="Curated DSA Hub" title="Master 520 Problems" />`
    },

    // 3. MOLECULES (10 REUSABLE MOLECULES)
    {
      id: 'mol-prow',
      name: 'ProblemRow',
      tier: 'molecule',
      category: 'Molecules / Problem Catalog',
      icon: BookOpen,
      file: 'src/components/molecules/ProblemRow.tsx',
      description: 'Interactive problem table row combining solved checkbox, star bookmark, title, difficulty badge, acceptance %, frequency bar, and solve CTA.',
      propsSnippet: `interface ProblemRowProps {\n  problem: ProblemRowData;\n  isSelected?: boolean;\n  onSelect?: () => void;\n  onSolve?: () => void;\n  onToggleSolved?: (e: React.MouseEvent) => void;\n  onToggleStarred?: (e: React.MouseEvent) => void;\n}`,
      usageSnippet: `<ProblemRow \n  problem={problem} \n  onToggleSolved={() => toggle(problem.id)} \n  onSolve={() => openCompiler(problem.id)}\n/>`
    },
    {
      id: 'mol-streak',
      name: 'StreakBadge',
      tier: 'molecule',
      category: 'Molecules / Gamification',
      icon: Flame,
      file: 'src/components/molecules/StreakBadge.tsx',
      description: 'Interactive coding habit streak pill with pulsating flame icon and day counter used in Navbar and profile stats.',
      propsSnippet: `interface StreakBadgeProps {\n  days: number;\n  label?: string;\n  className?: string;\n}`,
      usageSnippet: `<StreakBadge days={14} label="Days" />`
    },
    {
      id: 'mol-elo',
      name: 'EloBadge',
      tier: 'molecule',
      category: 'Molecules / Contests',
      icon: Award,
      file: 'src/components/molecules/EloBadge.tsx',
      description: 'Competitive programming Elo pill that dynamically maps rating to Division 1, Division 2, or Division 3 with trend arrow.',
      propsSnippet: `interface EloBadgeProps {\n  rating: number;\n  division?: string;\n  trend?: 'up' | 'down' | 'flat';\n}`,
      usageSnippet: `<EloBadge rating={1840} division="Div 1" trend="up" />`
    },
    {
      id: 'mol-stat',
      name: 'StatMetricCard',
      tier: 'molecule',
      category: 'Molecules / Telemetry',
      icon: Activity,
      file: 'src/components/molecules/StatMetricCard.tsx',
      description: 'Standardized scorecard displaying icon container, primary metric number, sublabel, and trend percentage badge.',
      propsSnippet: `interface StatMetricCardProps {\n  label: string;\n  value: string | number;\n  subtext?: string;\n  icon: React.ReactNode;\n  trend?: { direction: 'up' | 'down' | 'neutral'; text: string };\n  variant?: 'emerald' | 'cyan' | 'amber' | 'purple' | 'neutral';\n}`,
      usageSnippet: `<StatMetricCard label="Solved" value="382 / 520" icon={<BookOpen />} variant="emerald" />`
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
    {
      id: 'mol-company',
      name: 'CompanyPill',
      tier: 'molecule',
      category: 'Molecules / Company Vaults',
      icon: Building2,
      file: 'src/components/molecules/CompanyPill.tsx',
      description: 'Interactive company question filter pill with logo, company name, question count, and active selection state.',
      propsSnippet: `interface CompanyPillProps {\n  name: string;\n  count: number;\n  isSelected?: boolean;\n  onClick?: () => void;\n}`,
      usageSnippet: `<CompanyPill name="Google" count={142} isSelected={active === 'Google'} onClick={select} />`
    },
    {
      id: 'mol-faq',
      name: 'FaqAccordionItem',
      tier: 'molecule',
      category: 'Molecules / FAQ',
      icon: HelpCircle,
      file: 'src/components/molecules/FaqAccordionItem.tsx',
      description: 'Expandable question accordion item with smooth chevron rotation, category tag, and readable body container.',
      propsSnippet: `interface FaqAccordionItemProps {\n  question: string;\n  answer: string;\n  isOpen: boolean;\n  onToggle: () => void;\n  category?: string;\n}`,
      usageSnippet: `<FaqAccordionItem question="Are contests rated?" answer="..." isOpen={open} onToggle={toggle} />`
    },
    {
      id: 'mol-diffbar',
      name: 'DifficultyBreakdownBar',
      tier: 'molecule',
      category: 'Molecules / Metrics',
      icon: Sliders,
      file: 'src/components/molecules/DifficultyBreakdownBar.tsx',
      description: 'Segmented multi-color progress track showing proportional Easy, Medium, and Hard solved counts with percentage chips.',
      propsSnippet: `interface DifficultyBreakdownProps {\n  easy: { solved: number; total: number };\n  medium: { solved: number; total: number };\n  hard: { solved: number; total: number };\n}`,
      usageSnippet: `<DifficultyBreakdownBar easy={{ solved: 184, total: 210 }} medium={{ solved: 142, total: 230 }} hard={{ solved: 34, total: 80 }} />`
    },
    {
      id: 'mol-contest',
      name: 'ContestCard',
      tier: 'molecule',
      category: 'Molecules / Contests',
      icon: Swords,
      file: 'src/components/molecules/ContestCard.tsx',
      description: 'Interactive weekly contest scorecard with live start time countdown, division badge, participant counter, and register toggle.',
      propsSnippet: `interface ContestCardProps {\n  title: string;\n  division: string;\n  startTime: string;\n  duration: string;\n  participants: number;\n  isRegistered?: boolean;\n  onRegisterToggle?: () => void;\n}`,
      usageSnippet: `<ContestCard title="Round #92" division="Div 1" startTime="Starts in 18h" duration="120 min" participants={1420} />`
    },
    {
      id: 'mol-stepctrl',
      name: 'AlgorithmStepController',
      tier: 'molecule',
      category: 'Molecules / Visualizer',
      icon: Play,
      file: 'src/components/molecules/AlgorithmStepController.tsx',
      description: 'Stepping controls for algorithm visualizer with Step indicator pills, Reset, and Next Step action buttons.',
      propsSnippet: `interface AlgorithmStepControllerProps {\n  currentStep: number;\n  totalSteps: number;\n  stepTitle: string;\n  isComplete: boolean;\n  onNextStep: () => void;\n  onReset: () => void;\n}`,
      usageSnippet: `<AlgorithmStepController currentStep={step} totalSteps={4} stepTitle="Check Hash Map" isComplete={step === 4} onNextStep={next} onReset={reset} />`
    },

    // 4. ORGANISMS
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
  // DYNAMIC LIVE WORKBENCH PLAYGROUND RENDERER
  // -------------------------------------------------------------
  const renderInteractivePlayground = () => {
    switch (selectedComp.id) {
      // 1. TOKEN: COLOR PALETTE
      case 'token-colors':
        return (
          <div className="space-y-4 p-4 rounded-xl bg-zinc-950/80 border border-white/[0.08]">
            <div className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1.5 pb-2 border-b border-white/[0.06]">
              <Palette className="w-3.5 h-3.5" />
              Interactive Design Tokens Palette
            </div>
            
            <div className="space-y-3">
              <div className="text-[11px] font-mono text-zinc-400">Difficulty Hues (LeetCode & CodeHurdle Standard):</div>
              <div className="grid grid-cols-3 gap-2">
                <div 
                  onClick={() => showToast("Easy Token: #10b981 (Emerald)")} 
                  className="p-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 cursor-pointer hover:scale-105 transition-all text-center"
                >
                  <div className="w-4 h-4 rounded-full bg-emerald-400 mx-auto mb-1 shadow-sm shadow-emerald-500/50" />
                  <div className="text-xs font-bold text-emerald-400 font-mono">Easy</div>
                  <div className="text-[10px] text-zinc-400 font-mono">#10b981</div>
                </div>

                <div 
                  onClick={() => showToast("Medium Token: #f59e0b (Amber)")} 
                  className="p-3 rounded-xl border border-amber-500/30 bg-amber-500/10 cursor-pointer hover:scale-105 transition-all text-center"
                >
                  <div className="w-4 h-4 rounded-full bg-amber-400 mx-auto mb-1 shadow-sm shadow-amber-500/50" />
                  <div className="text-xs font-bold text-amber-400 font-mono">Medium</div>
                  <div className="text-[10px] text-zinc-400 font-mono">#f59e0b</div>
                </div>

                <div 
                  onClick={() => showToast("Hard Token: #f43f5e (Rose)")} 
                  className="p-3 rounded-xl border border-rose-500/30 bg-rose-500/10 cursor-pointer hover:scale-105 transition-all text-center"
                >
                  <div className="w-4 h-4 rounded-full bg-rose-400 mx-auto mb-1 shadow-sm shadow-rose-500/50" />
                  <div className="text-xs font-bold text-rose-400 font-mono">Hard</div>
                  <div className="text-[10px] text-zinc-400 font-mono">#f43f5e</div>
                </div>
              </div>

              <div className="text-[11px] font-mono text-zinc-400 pt-2">Contest Division Tiers:</div>
              <div className="grid grid-cols-3 gap-2 font-mono text-xs">
                <div className="p-2.5 rounded-lg border border-cyan-500/25 bg-cyan-950/20 text-cyan-300 text-center">
                  Div 1 (1900+)
                </div>
                <div className="p-2.5 rounded-lg border border-purple-500/25 bg-purple-950/20 text-purple-300 text-center">
                  Div 2 (1400-1899)
                </div>
                <div className="p-2.5 rounded-lg border border-slate-500/25 bg-slate-900/40 text-slate-400 text-center">
                  Div 3 (&lt;1400)
                </div>
              </div>
            </div>
          </div>
        );

      // 2. ATOM: BUTTON
      case 'atom-button':
        return (
          <div className="space-y-4 p-4 rounded-xl bg-zinc-950/80 border border-white/[0.08]">
            <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1.5">
                <MousePointerClick className="w-3.5 h-3.5" />
                Button Atom Workbench
              </span>
              <span className="text-xs font-mono text-zinc-400">Clicks: <strong className="text-emerald-400">{btnClicks}</strong></span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
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
            </div>

            <div className="p-6 rounded-xl bg-zinc-900/50 border border-white/[0.04] flex items-center justify-center">
              <Button
                variant={btnVariant}
                size={btnSize}
                isLoading={btnLoading}
                icon={<Play className="w-3.5 h-3.5" />}
                onClick={() => {
                  setBtnClicks(prev => prev + 1);
                  showToast(`Button clicked! (Total: ${btnClicks + 1})`);
                }}
              >
                Click Me To Test
              </Button>
            </div>
          </div>
        );

      // 3. MOLECULE: PROBLEM ROW (100% Interactive)
      case 'mol-prow':
        return (
          <div className="space-y-4 p-4 rounded-xl bg-zinc-950/80 border border-white/[0.08]">
            <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                ProblemRow Molecule (Live Interactive Item)
              </span>
              <span className="text-xs font-mono">
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
                  className="w-20 accent-amber-500 cursor-pointer" 
                />
                <span className="font-mono text-zinc-300">{rowFreq}%</span>
              </div>
            </div>

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
                    onSelect={() => showToast("Problem row selected! Drawer preview opened.")}
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
              <span>💡 Click the checkmark to toggle solved. Click star to favorite. Click play to solve.</span>
            </div>
          </div>
        );

      // 4. MOLECULE: COMPANY PILL
      case 'mol-company':
        return (
          <div className="space-y-4 p-4 rounded-xl bg-zinc-950/80 border border-white/[0.08]">
            <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5" />
                CompanyPill Molecule (Live Selection Filter)
              </span>
              <span className="text-xs font-mono text-zinc-400">Selected: <strong className="text-emerald-400">{activeCompanyDemo}</strong></span>
            </div>

            <div className="flex flex-wrap gap-2.5">
              {[
                { name: 'Google', count: 142 },
                { name: 'Meta', count: 185 },
                { name: 'Amazon', count: 210 },
                { name: 'Microsoft', count: 130 },
                { name: 'Apple', count: 95 }
              ].map(c => (
                <CompanyPill
                  key={c.name}
                  name={c.name}
                  count={c.count}
                  isSelected={activeCompanyDemo === c.name}
                  onClick={() => {
                    setActiveCompanyDemo(c.name);
                    showToast(`Filtered by ${c.name} Question Bank (${c.count} problems)`);
                  }}
                />
              ))}
            </div>
          </div>
        );

      // 5. MOLECULE: FAQ ACCORDION ITEM
      case 'mol-faq':
        return (
          <div className="space-y-4 p-4 rounded-xl bg-zinc-950/80 border border-white/[0.08]">
            <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5" />
                FaqAccordionItem Molecule
              </span>
              <span className="text-xs font-mono text-zinc-400">{faqOpenDemo ? 'Expanded' : 'Collapsed'}</span>
            </div>

            <FaqAccordionItem
              category="Architecture"
              question="How does CodeHurdle differ from standard problem lists like LeetCode or NeetCode?"
              answer="Standard problem sheets treat every learner identically. CodeHurdle incorporates an adaptive skill calibration engine that tracks your speed, memory efficiency, and bug patterns across 16 core patterns, serving problems at your exact learning boundary."
              isOpen={faqOpenDemo}
              onToggle={() => {
                setFaqOpenDemo(!faqOpenDemo);
                showToast(faqOpenDemo ? "Collapsed FAQ item" : "Expanded FAQ item");
              }}
            />
          </div>
        );

      // 6. MOLECULE: CONTEST CARD
      case 'mol-contest':
        return (
          <div className="space-y-4 p-4 rounded-xl bg-zinc-950/80 border border-white/[0.08]">
            <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1.5">
                <Swords className="w-3.5 h-3.5" />
                ContestCard Molecule (Live Countdown & Registration)
              </span>
            </div>

            <ContestCard
              id="w92"
              title="CodeHurdle Weekly Round #92"
              division="Div 1 + Div 2"
              startTime="Starts in 18h 42m"
              duration="120 min"
              participants={1429}
              isRegistered={contestRegistered}
              onRegisterToggle={() => {
                setContestRegistered(!contestRegistered);
                showToast(contestRegistered ? "Cancelled contest registration" : "Registered for Weekly Round #92!");
              }}
              onOpenDetails={() => showToast("Opening contest problem rules & rating brackets")}
            />
          </div>
        );

      // 7. MOLECULE: DIFFICULTY BREAKDOWN BAR
      case 'mol-diffbar':
        return (
          <div className="space-y-4 p-4 rounded-xl bg-zinc-950/80 border border-white/[0.08]">
            <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5" />
                DifficultyBreakdownBar Molecule
              </span>
              <Button size="xs" variant="outline" onClick={() => {
                setBreakdownEasy(190);
                setBreakdownMed(170);
                setBreakdownHard(50);
                showToast("Simulated Mastery Boost!");
              }}>
                Simulate Solve (+34)
              </Button>
            </div>

            <DifficultyBreakdownBar
              easy={{ solved: breakdownEasy, total: 210 }}
              medium={{ solved: breakdownMed, total: 230 }}
              hard={{ solved: breakdownHard, total: 80 }}
            />
          </div>
        );

      // 8. MOLECULE: ALGORITHM STEP CONTROLLER
      case 'mol-stepctrl':
        return (
          <div className="space-y-4 p-4 rounded-xl bg-zinc-950/80 border border-white/[0.08]">
            <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1.5">
                <Play className="w-3.5 h-3.5" />
                AlgorithmStepController Molecule
              </span>
            </div>

            <AlgorithmStepController
              currentStep={algoStep}
              totalSteps={algoTotal}
              stepTitle={algoStep === 1 ? 'Compute Complement (9 - 2 = 7)' : algoStep === 2 ? 'Lookup in Hash Map' : algoStep === 3 ? 'Match Found at index 1' : 'Return Indices [0, 1]'}
              isComplete={algoStep === algoTotal}
              onNextStep={() => {
                const next = algoStep < algoTotal ? algoStep + 1 : 1;
                setAlgoStep(next);
                showToast(`Stepped to Step ${next} of ${algoTotal}`);
              }}
              onReset={() => {
                setAlgoStep(1);
                showToast("Reset visualizer step to 1");
              }}
            />
          </div>
        );

      // 9. MOLECULE: STREAK & ELO
      case 'mol-streak':
      case 'mol-elo':
        return (
          <div className="space-y-4 p-4 rounded-xl bg-zinc-950/80 border border-white/[0.08]">
            <div className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold pb-2 border-b border-white/[0.06]">
              Gamification Badges (Streak & Elo)
            </div>

            <div className="flex items-center justify-between p-4 bg-zinc-900/50 rounded-xl">
              <div>
                <div className="text-xs font-bold text-white mb-1">Daily Habit Streak</div>
                <StreakBadge days={streakDays} />
              </div>
              <Button size="xs" variant="amber" onClick={() => {
                setStreakDays(s => s + 1);
                showToast(`Streak Increased to ${streakDays + 1} Days! 🔥`);
              }}>
                +1 Day
              </Button>
            </div>

            <div className="space-y-2 p-4 bg-zinc-900/50 rounded-xl">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-white">Contest Elo Rating</span>
                <EloBadge rating={eloRating} division={eloRating >= 1900 ? 'Div 1' : eloRating >= 1400 ? 'Div 2' : 'Div 3'} trend={eloTrend} />
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
          </div>
        );

      // 10. MOLECULE: STAT METRIC CARD
      case 'mol-stat':
        return (
          <div className="space-y-4 p-4 rounded-xl bg-zinc-950/80 border border-white/[0.08]">
            <div className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold pb-2 border-b border-white/[0.06]">
              StatMetricCard Telemetry Molecule
            </div>
            <div className="grid grid-cols-2 gap-3">
              <StatMetricCard
                label="Mastery Index"
                value={statVal}
                subtext="Top 4.8% worldwide"
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
            <div className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold pb-2 border-b border-white/[0.06]">
              SearchInput Molecule with ⌘K Badge
            </div>
            <SearchInput
              value={searchVal}
              onChange={setSearchVal}
              onClear={() => {
                setSearchVal('');
                showToast("Search cleared!");
              }}
              placeholder="Search problems by keyword, company tag, or pattern..."
            />
            <div className="text-xs font-mono text-zinc-500">
              Query: <strong className="text-emerald-400">"{searchVal}"</strong>
            </div>
          </div>
        );

      // ORGANISMS
      case 'org-compiler':
      case 'org-cp':
      case 'org-explorer':
      case 'org-roadmap':
      case 'org-community':
      case 'org-jobprep':
      case 'org-profile':
        return (
          <div className="space-y-4 p-4 rounded-xl bg-zinc-950/80 border border-white/[0.08]">
            <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5" />
                {selectedComp.name} (Organism)
              </span>
              {selectedComp.navTarget && (
                <Button size="xs" variant="primary" onClick={() => onNavigateToView(selectedComp.navTarget!)}>
                  Launch Page View <ExternalLink className="w-3 h-3 ml-1" />
                </Button>
              )}
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              {selectedComp.description}
            </p>
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
                <h2 className="text-base font-bold text-white">CodeHurdle Atomic Architecture</h2>
                <Badge variant="emerald" size="xs">4 Tiers Active</Badge>
              </div>
              <p className="text-xs text-zinc-400 mt-0.5">Tokens · Atoms · Molecules · Organisms</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 4-Tier Switcher Bar */}
        <div className="px-6 py-3 border-b border-white/[0.08] bg-zinc-950/40 flex items-center justify-between">
          <TabGroup
            tabs={[
              { id: 'all', label: 'All' },
              { id: 'token', label: 'Tokens (3)' },
              { id: 'atom', label: 'Atoms (8)' },
              { id: 'molecule', label: 'Molecules (10)' },
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
            {filteredComponents.length} items
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
                      c.tier === 'token' ? 'bg-emerald-500/10 text-emerald-400' :
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
                      selectedComp.tier === 'token' ? 'emerald' :
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
              <div className="text-xs font-mono uppercase text-zinc-400 mb-1.5">Component Definition / Props:</div>
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
            <span>4-Tier Atomic Structure: Tokens → Atoms → Molecules → Organisms</span>
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
