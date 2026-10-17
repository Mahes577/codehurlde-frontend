import React, { useState } from 'react';
import { 
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
  LayoutGrid,
  Eye,
  SlidersHorizontal,
  Grid,
  FileCode2,
  Box,
  Component,
  ShieldCheck,
  CheckCircle,
  AlertCircle,
  Network,
  Coins
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
  AlgorithmStepController,
  GraphAlgorithmVisualizer,
  DpAlgorithmVisualizer
} from './atomic';

export type AtomicTier = 'all' | 'token' | 'atom' | 'molecule' | 'organism';

export interface ComponentDoc {
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

interface DesignSystemViewProps {
  onNavigateToView: (view: ActiveView) => void;
}

export const DesignSystemView: React.FC<DesignSystemViewProps> = ({ onNavigateToView }) => {
  const [selectedTier, setSelectedTier] = useState<AtomicTier>('all');
  const [viewMode, setViewMode] = useState<'workbench' | 'gallery'>('workbench');
  const [copied, setCopied] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
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
  const [avatarSize, setAvatarSize] = useState<'xs' | 'sm' | 'md' | 'lg' | 'xl'>('md');

  // ProgressBar Atom
  const [progressVal, setProgressVal] = useState(72);
  const [progressVariant, setProgressVariant] = useState<'emerald' | 'amber' | 'rose' | 'cyan' | 'purple'>('emerald');

  // TabGroup Atom
  const [tabVariant, setTabVariant] = useState<'pill' | 'underline'>('pill');
  const [activeTabDemo, setActiveTabDemo] = useState('dp');

  // SectionHeader Atom
  const [sectionEyebrow, setSectionEyebrow] = useState('Curated DSA Vault');
  const [sectionTitle, setSectionTitle] = useState('Master 520 Problems');
  const [sectionHighlight, setSectionHighlight] = useState('With Deep Analytics');

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

    // 2. ATOMS (8 ATOMS)
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

    // 4. ORGANISMS (7 ORGANISMS)
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
    },
    {
      id: 'org-graph-visualizer',
      name: 'GraphAlgorithmVisualizer',
      tier: 'organism',
      category: 'Organisms / Visualizers',
      icon: Network,
      file: 'src/components/interactive/GraphAlgorithmVisualizer.tsx',
      description: 'Interactive Dijkstra & BFS graph pathfinding visualizer with SVG nodes, directional arrows, real-time edge relaxation, distance array updates, and priority queue states.',
      navTarget: 'cp',
      propsSnippet: `interface GraphAlgorithmVisualizerProps {\n  onLaunchSolver?: () => void;\n}`,
      usageSnippet: `<GraphAlgorithmVisualizer onLaunchSolver={() => navigate('/cp')} />`
    },
    {
      id: 'org-dp-visualizer',
      name: 'DpAlgorithmVisualizer',
      tier: 'organism',
      category: 'Organisms / Visualizers',
      icon: Coins,
      file: 'src/components/interactive/DpAlgorithmVisualizer.tsx',
      description: 'Interactive dynamic programming memoization visualizer with 1D/2D table cells, subproblem recurrence calculation, and optimal coin backtracking path.',
      navTarget: 'problems',
      propsSnippet: `interface DpAlgorithmVisualizerProps {\n  onLaunchSolver?: () => void;\n}`,
      usageSnippet: `<DpAlgorithmVisualizer onLaunchSolver={() => navigate('/dsa')} />`
    }
  ];

  const filteredComponents = selectedTier === 'all' 
    ? COMPONENTS 
    : COMPONENTS.filter(c => c.tier === selectedTier);

  const [selectedComp, setSelectedComp] = useState<ComponentDoc>(COMPONENTS[0]);

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
          <div className="space-y-4 p-5 rounded-xl bg-zinc-950/80 border border-white/[0.08]">
            <div className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1.5 pb-2 border-b border-white/[0.06]">
              <Palette className="w-3.5 h-3.5" />
              Interactive Design Tokens Palette
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="text-[11px] font-mono text-zinc-400 mb-2">Base Canvas & Surface Architecture:</div>
                <div className="grid grid-cols-3 gap-2.5">
                  <div 
                    onClick={() => showToast("Base Canvas: #07090e")} 
                    className="p-3 rounded-xl border border-white/[0.1] bg-[#07090e] cursor-pointer hover:border-emerald-500/50 transition-all text-center"
                  >
                    <div className="text-xs font-bold text-white font-mono">Canvas</div>
                    <div className="text-[10px] text-zinc-400 font-mono">#07090e</div>
                  </div>
                  <div 
                    onClick={() => showToast("Surface Container: #0c101c")} 
                    className="p-3 rounded-xl border border-white/[0.1] bg-[#0c101c] cursor-pointer hover:border-emerald-500/50 transition-all text-center"
                  >
                    <div className="text-xs font-bold text-white font-mono">Surface</div>
                    <div className="text-[10px] text-zinc-400 font-mono">#0c101c</div>
                  </div>
                  <div 
                    onClick={() => showToast("Elevated Card: #111625")} 
                    className="p-3 rounded-xl border border-white/[0.1] bg-[#111625] cursor-pointer hover:border-emerald-500/50 transition-all text-center"
                  >
                    <div className="text-xs font-bold text-white font-mono">Elevated</div>
                    <div className="text-[10px] text-zinc-400 font-mono">#111625</div>
                  </div>
                </div>
              </div>

              <div>
                <div className="text-[11px] font-mono text-zinc-400 mb-2">Difficulty Hues (LeetCode & CodeHurdle Standard):</div>
                <div className="grid grid-cols-3 gap-2.5">
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
              </div>

              <div>
                <div className="text-[11px] font-mono text-zinc-400 mb-2">Contest Division Tiers:</div>
                <div className="grid grid-cols-3 gap-2.5 font-mono text-xs">
                  <div className="p-2.5 rounded-xl border border-cyan-500/25 bg-cyan-950/20 text-cyan-300 text-center font-semibold">
                    Div 1 (1900+)
                  </div>
                  <div className="p-2.5 rounded-xl border border-purple-500/25 bg-purple-950/20 text-purple-300 text-center font-semibold">
                    Div 2 (1400-1899)
                  </div>
                  <div className="p-2.5 rounded-xl border border-slate-500/25 bg-slate-900/40 text-slate-400 text-center font-semibold">
                    Div 3 (&lt;1400)
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      // 1b. TOKEN: TYPOGRAPHY
      case 'token-typography':
        return (
          <div className="space-y-4 p-5 rounded-xl bg-zinc-950/80 border border-white/[0.08]">
            <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold flex items-center gap-1.5 pb-2 border-b border-white/[0.06]">
              <Type className="w-3.5 h-3.5" />
              Typography Scale & Monospace Code Hierarchy
            </div>

            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-zinc-900/40 border border-white/[0.04] space-y-1">
                <span className="text-[10px] font-mono text-zinc-500 uppercase">Heading 1 / Display</span>
                <div className="text-2xl font-black tracking-tight text-white font-sans">
                  Crack LeetCode with <span className="text-emerald-400">Algorithmic Precision</span>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-zinc-900/40 border border-white/[0.04] space-y-1">
                <span className="text-[10px] font-mono text-zinc-500 uppercase">Monospace Code & Big-O Invariants</span>
                <div className="font-mono text-xs space-y-1 text-zinc-300">
                  <div className="text-emerald-400 font-bold">Time: O(N log K) | Space: O(K)</div>
                  <div className="text-zinc-400">priority_queue&lt;pair&lt;int, int&gt;, vector&lt;pair&lt;int, int&gt;&gt;, greater&lt;&gt;&gt; minHeap;</div>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-zinc-900/40 border border-white/[0.04] space-y-1">
                <span className="text-[10px] font-mono text-zinc-500 uppercase">Prose Body & Captions</span>
                <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                  Designed with crisp optical sizing for low-strain extended coding marathons and competitive contest pressure.
                </p>
              </div>
            </div>
          </div>
        );

      // 1c. TOKEN: RADII
      case 'token-radii':
        return (
          <div className="space-y-4 p-5 rounded-xl bg-zinc-950/80 border border-white/[0.08]">
            <div className="text-xs font-mono uppercase tracking-wider text-purple-400 font-bold flex items-center gap-1.5 pb-2 border-b border-white/[0.06]">
              <LayoutGrid className="w-3.5 h-3.5" />
              Surface Radii & Border Tokens
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center font-mono text-xs">
              <div className="p-3 rounded-md border border-white/[0.1] bg-[#0c101c]">
                <div className="text-zinc-200">rounded-md</div>
                <div className="text-[10px] text-zinc-500">6px</div>
              </div>
              <div className="p-3 rounded-lg border border-white/[0.1] bg-[#0c101c]">
                <div className="text-zinc-200">rounded-lg</div>
                <div className="text-[10px] text-zinc-500">8px</div>
              </div>
              <div className="p-3 rounded-xl border border-white/[0.1] bg-[#0c101c]">
                <div className="text-zinc-200">rounded-xl</div>
                <div className="text-[10px] text-zinc-500">12px</div>
              </div>
              <div className="p-3 rounded-2xl border border-white/[0.1] bg-[#0c101c]">
                <div className="text-zinc-200">rounded-2xl</div>
                <div className="text-[10px] text-zinc-500">16px</div>
              </div>
            </div>
          </div>
        );

      // 2. ATOM: BUTTON
      case 'atom-button':
        return (
          <div className="space-y-4 p-5 rounded-xl bg-zinc-950/80 border border-white/[0.08]">
            <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1.5">
                <MousePointerClick className="w-3.5 h-3.5" />
                Button Atom Workbench
              </span>
              <span className="text-xs font-mono text-zinc-400">Clicks: <strong className="text-emerald-400">{btnClicks}</strong></span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <label className="text-[10px] uppercase font-mono text-zinc-500 block mb-1">Variant</label>
                <select 
                  value={btnVariant} 
                  onChange={e => setBtnVariant(e.target.value as any)}
                  className="w-full bg-[#0c101c] border border-white/[0.08] rounded-lg px-2.5 py-1.5 text-xs text-zinc-200"
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
                  className="w-full bg-[#0c101c] border border-white/[0.08] rounded-lg px-2.5 py-1.5 text-xs text-zinc-200"
                >
                  <option value="xs">xs</option>
                  <option value="sm">sm</option>
                  <option value="md">md</option>
                  <option value="lg">lg</option>
                </select>
              </div>

              <div className="flex flex-col justify-end">
                <label className="flex items-center gap-2 cursor-pointer py-1.5 text-zinc-300">
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

      // 2b. ATOM: BADGE
      case 'atom-badge':
        return (
          <div className="space-y-4 p-5 rounded-xl bg-zinc-950/80 border border-white/[0.08]">
            <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold flex items-center gap-1.5 pb-2 border-b border-white/[0.06]">
              <Sparkles className="w-3.5 h-3.5" />
              Badge & DifficultyBadge Atom Workbench
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="text-[10px] uppercase font-mono text-zinc-500 block mb-1">Difficulty Pill</label>
                <div className="flex gap-2">
                  {(['Easy', 'Medium', 'Hard'] as DifficultyLevel[]).map(d => (
                    <button
                      key={d}
                      onClick={() => setBadgeDifficulty(d)}
                      className={`px-3 py-1.5 rounded-lg border text-xs font-mono cursor-pointer transition-all ${
                        badgeDifficulty === d ? 'border-emerald-500 bg-emerald-500/20 text-white' : 'border-white/[0.08] text-zinc-400'
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[10px] uppercase font-mono text-zinc-500 block mb-1">Custom Text</label>
                <input
                  type="text"
                  value={badgeCustomText}
                  onChange={e => setBadgeCustomText(e.target.value)}
                  className="w-full bg-[#0c101c] border border-white/[0.08] rounded-lg px-2.5 py-1.5 text-xs text-zinc-200"
                />
              </div>
            </div>

            <div className="p-6 rounded-xl bg-zinc-900/50 border border-white/[0.04] flex flex-wrap items-center justify-center gap-4">
              <DifficultyBadge difficulty={badgeDifficulty} size="sm" />
              <Badge variant={badgeVariant} size="sm">{badgeCustomText}</Badge>
              <Badge variant="emerald" size="xs">XP +100</Badge>
              <Badge variant="rose" size="xs">Live Round</Badge>
              <Badge variant="purple" size="xs">Div 2</Badge>
            </div>
          </div>
        );

      // 2c. ATOM: CARD
      case 'atom-card':
        return (
          <div className="space-y-4 p-5 rounded-xl bg-zinc-950/80 border border-white/[0.08]">
            <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
              <span className="text-xs font-mono uppercase tracking-wider text-purple-400 font-bold flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" />
                Card Surface Atom Workbench
              </span>
              <span className="text-xs font-mono text-zinc-400">Card Clicks: <strong className="text-purple-400">{cardClicks}</strong></span>
            </div>

            <div className="flex gap-2">
              {(['default', 'surface', 'interactive', 'sunken'] as const).map(v => (
                <button
                  key={v}
                  onClick={() => setCardVariant(v)}
                  className={`px-3 py-1.5 rounded-lg border text-xs font-mono cursor-pointer transition-all ${
                    cardVariant === v ? 'border-purple-500 bg-purple-500/20 text-white font-semibold' : 'border-white/[0.08] text-zinc-400'
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-zinc-900/40">
              <Card 
                variant={cardVariant} 
                className="p-5 cursor-pointer"
                onClick={() => {
                  setCardClicks(prev => prev + 1);
                  showToast(`Card clicked! (${cardClicks + 1})`);
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="purple" size="xs">Interactive Card</Badge>
                  <span className="text-[10px] font-mono text-zinc-500">Variant: {cardVariant}</span>
                </div>
                <CardTitle className="text-base font-bold text-white">Dynamic Programming Mastery</CardTitle>
                <CardDescription className="text-xs text-zinc-400 mt-1">
                  Click anywhere inside this card surface to test active elevation and hover physics.
                </CardDescription>
              </Card>
            </div>
          </div>
        );

      // 2d. ATOM: INPUT
      case 'atom-input':
        return (
          <div className="space-y-4 p-5 rounded-xl bg-zinc-950/80 border border-white/[0.08]">
            <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold flex items-center gap-1.5 pb-2 border-b border-white/[0.06]">
              <Sliders className="w-3.5 h-3.5" />
              Input & Form Atom Workbench
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs text-zinc-300 font-medium">Live Input Field:</label>
                <label className="flex items-center gap-2 text-xs text-zinc-400 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={inputHasError}
                    onChange={e => setInputHasError(e.target.checked)}
                    className="rounded accent-rose-500"
                  />
                  <span>Toggle Error State</span>
                </label>
              </div>

              <Input
                value={inputVal}
                onChange={e => setInputVal(e.target.value)}
                error={inputHasError}
                prefix={<Search className="w-4 h-4 text-zinc-500" />}
                placeholder="Type algorithmic query..."
              />

              <div className="text-[11px] font-mono text-zinc-400 flex items-center justify-between">
                <span>Value: <strong className="text-white font-mono">"{inputVal}"</strong></span>
                <span>Length: {inputVal.length} chars</span>
              </div>
            </div>
          </div>
        );

      // 2e. ATOM: AVATAR
      case 'atom-avatar':
        return (
          <div className="space-y-4 p-5 rounded-xl bg-zinc-950/80 border border-white/[0.08]">
            <div className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold flex items-center gap-1.5 pb-2 border-b border-white/[0.06]">
              <User className="w-3.5 h-3.5" />
              Avatar Atom Workbench
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <label className="text-[10px] uppercase font-mono text-zinc-500 block mb-1">Developer Name</label>
                <input
                  type="text"
                  value={avatarName}
                  onChange={e => setAvatarName(e.target.value)}
                  className="w-full bg-[#0c101c] border border-white/[0.08] rounded-lg px-2.5 py-1.5 text-xs text-zinc-200"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase font-mono text-zinc-500 block mb-1">Size</label>
                <select
                  value={avatarSize}
                  onChange={e => setAvatarSize(e.target.value as any)}
                  className="w-full bg-[#0c101c] border border-white/[0.08] rounded-lg px-2.5 py-1.5 text-xs text-zinc-200"
                >
                  <option value="xs">xs (24px)</option>
                  <option value="sm">sm (32px)</option>
                  <option value="md">md (40px)</option>
                  <option value="lg">lg (48px)</option>
                  <option value="xl">xl (64px)</option>
                </select>
              </div>

              <div className="flex items-center gap-4 pt-4">
                <label className="flex items-center gap-1.5 text-zinc-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={avatarPro}
                    onChange={e => setAvatarPro(e.target.checked)}
                    className="rounded accent-emerald-500"
                  />
                  <span>PRO Badge</span>
                </label>

                <label className="flex items-center gap-1.5 text-zinc-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={avatarOnline}
                    onChange={e => setAvatarOnline(e.target.checked)}
                    className="rounded accent-emerald-500"
                  />
                  <span>Online Dot</span>
                </label>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-zinc-900/50 border border-white/[0.04] flex items-center justify-center gap-6">
              <Avatar name={avatarName} size={avatarSize} isPro={avatarPro} isOnline={avatarOnline} />
              <div className="text-left font-sans">
                <div className="text-sm font-bold text-white">{avatarName}</div>
                <div className="text-xs font-mono text-emerald-400">1,940 Elo · Candidate Master</div>
              </div>
            </div>
          </div>
        );

      // 2f. ATOM: PROGRESS BAR
      case 'atom-progress':
        return (
          <div className="space-y-4 p-5 rounded-xl bg-zinc-950/80 border border-white/[0.08]">
            <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5" />
                ProgressBar Atom Workbench
              </span>
              <span className="text-xs font-mono text-emerald-400 font-bold">{progressVal}% Complete</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="text-[10px] uppercase font-mono text-zinc-500 block mb-1">Adjust Value: {progressVal}%</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={progressVal}
                  onChange={e => setProgressVal(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase font-mono text-zinc-500 block mb-1">Variant</label>
                <select
                  value={progressVariant}
                  onChange={e => setProgressVariant(e.target.value as any)}
                  className="w-full bg-[#0c101c] border border-white/[0.08] rounded-lg px-2.5 py-1.5 text-xs text-zinc-200"
                >
                  <option value="emerald">emerald (DSA Progress)</option>
                  <option value="amber">amber (Medium)</option>
                  <option value="rose">rose (Hard)</option>
                  <option value="cyan">cyan (Div 1)</option>
                  <option value="purple">purple (Roadmap)</option>
                </select>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-zinc-900/40 space-y-3">
              <ProgressBar value={progressVal} variant={progressVariant} size="md" />
              <div className="flex justify-between text-[11px] font-mono text-zinc-500">
                <span>0</span>
                <span>{progressVal} / 100</span>
                <span>100</span>
              </div>
            </div>
          </div>
        );

      // 2g. ATOM: TABS
      case 'atom-tabs':
        return (
          <div className="space-y-4 p-5 rounded-xl bg-zinc-950/80 border border-white/[0.08]">
            <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
              <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5" />
                TabGroup Atom Workbench
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => setTabVariant('pill')}
                  className={`px-2.5 py-1 text-xs rounded font-mono ${tabVariant === 'pill' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'text-zinc-500'}`}
                >
                  Pill
                </button>
                <button
                  onClick={() => setTabVariant('underline')}
                  className={`px-2.5 py-1 text-xs rounded font-mono ${tabVariant === 'underline' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'text-zinc-500'}`}
                >
                  Underline
                </button>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-zinc-900/40">
              <TabGroup
                tabs={[
                  { id: 'arrays', label: 'Arrays & Hashing', badge: 142 },
                  { id: 'dp', label: 'Dynamic Programming', badge: 84 },
                  { id: 'graphs', label: 'Graphs & BFS', badge: 56 },
                  { id: 'trees', label: 'Trees & Tries', badge: 49 }
                ]}
                activeTab={activeTabDemo}
                onChange={id => {
                  setActiveTabDemo(id);
                  showToast(`Selected tab: ${id}`);
                }}
                variant={tabVariant}
              />
            </div>
          </div>
        );

      // 2h. ATOM: SECTION HEADER
      case 'atom-section':
        return (
          <div className="space-y-4 p-5 rounded-xl bg-zinc-950/80 border border-white/[0.08]">
            <div className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1.5 pb-2 border-b border-white/[0.06]">
              <Type className="w-3.5 h-3.5" />
              SectionHeader Atom Workbench
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <label className="text-[10px] uppercase font-mono text-zinc-500 block mb-1">Eyebrow</label>
                <input
                  type="text"
                  value={sectionEyebrow}
                  onChange={e => setSectionEyebrow(e.target.value)}
                  className="w-full bg-[#0c101c] border border-white/[0.08] rounded-lg px-2.5 py-1.5 text-xs text-zinc-200"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase font-mono text-zinc-500 block mb-1">Title</label>
                <input
                  type="text"
                  value={sectionTitle}
                  onChange={e => setSectionTitle(e.target.value)}
                  className="w-full bg-[#0c101c] border border-white/[0.08] rounded-lg px-2.5 py-1.5 text-xs text-zinc-200"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase font-mono text-zinc-500 block mb-1">Highlight</label>
                <input
                  type="text"
                  value={sectionHighlight}
                  onChange={e => setSectionHighlight(e.target.value)}
                  className="w-full bg-[#0c101c] border border-white/[0.08] rounded-lg px-2.5 py-1.5 text-xs text-zinc-200"
                />
              </div>
            </div>

            <div className="p-6 rounded-xl bg-zinc-900/40 border border-white/[0.04]">
              <SectionHeader
                eyebrow={sectionEyebrow}
                title={sectionTitle}
                highlightText={sectionHighlight}
                subtitle="Curated interview questions mapped to Tier-1 tech company recruitment frequency."
                action={<Button size="sm" variant="primary">Explore Vault</Button>}
              />
            </div>
          </div>
        );

      // 3. MOLECULE: PROBLEM ROW (100% Interactive)
      case 'mol-prow':
        return (
          <div className="space-y-4 p-5 rounded-xl bg-zinc-950/80 border border-white/[0.08]">
            <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                ProblemRow Molecule Interactive Playground
              </span>
              <span className="text-xs font-mono text-zinc-400">Status: <strong className={rowSolved ? 'text-emerald-400' : 'text-zinc-400'}>{rowSolved ? 'Solved ✓' : 'Unsolved'}</strong></span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <div>
                <label className="text-[10px] uppercase font-mono text-zinc-500 block mb-1">Difficulty</label>
                <select 
                  value={rowDiff} 
                  onChange={e => setRowDiff(e.target.value as any)}
                  className="w-full bg-[#0c101c] border border-white/[0.08] rounded-lg px-2 py-1.5 text-xs text-zinc-200"
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] uppercase font-mono text-zinc-500 block mb-1">Frequency ({rowFreq}%)</label>
                <input 
                  type="range" 
                  min="10" 
                  max="100" 
                  value={rowFreq} 
                  onChange={e => setRowFreq(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>

              <div className="flex items-center gap-2 pt-4">
                <label className="flex items-center gap-2 cursor-pointer text-zinc-300">
                  <input 
                    type="checkbox" 
                    checked={rowSolved} 
                    onChange={e => setRowSolved(e.target.checked)}
                    className="rounded border-zinc-700 accent-emerald-500" 
                  />
                  <span>Solved</span>
                </label>
              </div>

              <div className="flex items-center gap-2 pt-4">
                <label className="flex items-center gap-2 cursor-pointer text-zinc-300">
                  <input 
                    type="checkbox" 
                    checked={rowStarred} 
                    onChange={e => setRowStarred(e.target.checked)}
                    className="rounded border-zinc-700 accent-amber-500" 
                  />
                  <span>Starred</span>
                </label>
              </div>
            </div>

            <div className="p-2 rounded-xl bg-zinc-900/60 border border-white/[0.06]">
              <ProblemRow
                problem={{
                  id: 15,
                  title: '3Sum — Triple Zero Target Pairs',
                  slug: '3sum',
                  difficulty: rowDiff,
                  acceptance: 34.2,
                  frequency: rowFreq,
                  category: 'Two Pointers',
                  tags: ['Two Pointers', 'Sorting', 'Array'],
                  isSolved: rowSolved,
                  isStarred: rowStarred,
                  companies: ['Google', 'Meta', 'Amazon']
                }}
                onToggleSolved={(e) => {
                  e?.stopPropagation();
                  setRowSolved(!rowSolved);
                  showToast(!rowSolved ? "Problem marked Solved! +100 XP" : "Problem reset to Unsolved");
                }}
                onToggleStarred={(e) => {
                  e?.stopPropagation();
                  setRowStarred(!rowStarred);
                  showToast(!rowStarred ? "Added to Starred Problem List" : "Removed from Starred");
                }}
                onSolve={() => {
                  showToast("Launching Problem 15 in Compiler IDE...");
                  onNavigateToView('compiler');
                }}
              />
            </div>
          </div>
        );

      // 4. MOLECULE: COMPANY PILL
      case 'mol-company':
        return (
          <div className="space-y-4 p-5 rounded-xl bg-zinc-950/80 border border-white/[0.08]">
            <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5" />
                CompanyPill Molecule Workbench
              </span>
              <span className="text-xs font-mono text-zinc-400">Active: <strong className="text-white">{activeCompanyDemo}</strong></span>
            </div>

            <div className="flex flex-wrap gap-2.5">
              {[
                { name: 'Google', count: 184 },
                { name: 'Meta', count: 156 },
                { name: 'Amazon', count: 212 },
                { name: 'Microsoft', count: 128 },
                { name: 'Uber', count: 94 },
                { name: 'Apple', count: 76 }
              ].map(c => (
                <CompanyPill
                  key={c.name}
                  name={c.name}
                  count={c.count}
                  isSelected={activeCompanyDemo === c.name}
                  onClick={() => {
                    setActiveCompanyDemo(c.name);
                    showToast(`Filtered problem catalog by ${c.name} (${c.count} questions)`);
                  }}
                />
              ))}
            </div>
          </div>
        );

      // 5. MOLECULE: FAQ ACCORDION ITEM
      case 'mol-faq':
        return (
          <div className="space-y-4 p-5 rounded-xl bg-zinc-950/80 border border-white/[0.08]">
            <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5" />
                FaqAccordionItem Molecule Workbench
              </span>
              <span className="text-xs font-mono text-zinc-400">State: <strong className={faqOpenDemo ? 'text-emerald-400' : 'text-zinc-500'}>{faqOpenDemo ? 'Expanded' : 'Collapsed'}</strong></span>
            </div>

            <div className="space-y-2">
              <FaqAccordionItem
                category="CodeHurdle Pro vs LeetCode"
                question="How does CodeHurdle compare with LeetCode Premium?"
                answer="CodeHurdle is 100% focused on algorithmic mastery without paywalls. You get full company tags (Google, Meta, Amazon), high-frequency interview vaults, in-browser step visualizers, and weekly rated Elo contests for free."
                isOpen={faqOpenDemo}
                onToggle={() => setFaqOpenDemo(!faqOpenDemo)}
              />
            </div>
          </div>
        );

      // 6. MOLECULE: CONTEST CARD
      case 'mol-contest':
        return (
          <div className="space-y-4 p-5 rounded-xl bg-zinc-950/80 border border-white/[0.08]">
            <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
              <span className="text-xs font-mono uppercase tracking-wider text-rose-400 font-bold flex items-center gap-1.5">
                <Swords className="w-3.5 h-3.5" />
                ContestCard Molecule Workbench
              </span>
              <span className="text-xs font-mono text-zinc-400">Registration: <strong className={contestRegistered ? 'text-emerald-400' : 'text-zinc-400'}>{contestRegistered ? 'Registered ✓' : 'Not Registered'}</strong></span>
            </div>

            <ContestCard
              title="CodeHurdle Weekly Contest 94"
              division="Div 1 + Div 2"
              startTime="Tomorrow @ 08:00 AM UTC"
              duration="90 Minutes · 4 Problems"
              participants={1842}
              isRegistered={contestRegistered}
              onRegisterToggle={() => {
                setContestRegistered(!contestRegistered);
                showToast(!contestRegistered ? "Registered for Weekly Contest 94! Calendar invite sent." : "Unregistered from contest.");
              }}
            />
          </div>
        );

      // 7. MOLECULE: DIFFICULTY BREAKDOWN BAR
      case 'mol-diffbar':
        return (
          <div className="space-y-4 p-5 rounded-xl bg-zinc-950/80 border border-white/[0.08]">
            <div className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1.5 pb-2 border-b border-white/[0.06]">
              <Sliders className="w-3.5 h-3.5" />
              DifficultyBreakdownBar Molecule Workbench
            </div>

            <div className="grid grid-cols-3 gap-3 text-xs">
              <div>
                <label className="text-[10px] uppercase font-mono text-emerald-400 block mb-1">Easy Solved: {breakdownEasy}</label>
                <input 
                  type="range" min="0" max="210" value={breakdownEasy} 
                  onChange={e => setBreakdownEasy(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>
              <div>
                <label className="text-[10px] uppercase font-mono text-amber-400 block mb-1">Medium Solved: {breakdownMed}</label>
                <input 
                  type="range" min="0" max="230" value={breakdownMed} 
                  onChange={e => setBreakdownMed(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>
              <div>
                <label className="text-[10px] uppercase font-mono text-rose-400 block mb-1">Hard Solved: {breakdownHard}</label>
                <input 
                  type="range" min="0" max="80" value={breakdownHard} 
                  onChange={e => setBreakdownHard(Number(e.target.value))}
                  className="w-full accent-rose-500 cursor-pointer"
                />
              </div>
            </div>

            <div className="p-4 rounded-xl bg-zinc-900/60 border border-white/[0.06]">
              <DifficultyBreakdownBar
                easy={{ solved: breakdownEasy, total: 210 }}
                medium={{ solved: breakdownMed, total: 230 }}
                hard={{ solved: breakdownHard, total: 80 }}
              />
            </div>
          </div>
        );

      // 8. MOLECULE: ALGORITHM STEP CONTROLLER
      case 'mol-stepctrl':
        return (
          <div className="space-y-4 p-5 rounded-xl bg-zinc-950/80 border border-white/[0.08]">
            <div className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1.5 pb-2 border-b border-white/[0.06]">
              <Play className="w-3.5 h-3.5" />
              AlgorithmStepController Molecule Workbench
            </div>

            <div className="p-4 rounded-xl bg-zinc-900/60 border border-white/[0.06]">
              <AlgorithmStepController
                currentStep={algoStep}
                totalSteps={algoTotal}
                stepTitle={
                  algoStep === 1 ? "Initialize Left=0 and Right=nums.length-1" :
                  algoStep === 2 ? "Compute Midpoint = (Left + Right) / 2" :
                  algoStep === 3 ? "Evaluate nums[mid] against Target Value" :
                  "Target located in Array index 4"
                }
                isComplete={algoStep === algoTotal}
                onNextStep={() => {
                  const next = Math.min(algoTotal, algoStep + 1);
                  setAlgoStep(next);
                  showToast(`Stepped to algorithmic stage ${next}/${algoTotal}`);
                }}
                onReset={() => {
                  setAlgoStep(1);
                  showToast("Visualizer state reset to step 1");
                }}
              />
            </div>
          </div>
        );

      // 9. MOLECULE: STREAK & ELO
      case 'mol-streak':
      case 'mol-elo':
        return (
          <div className="space-y-4 p-5 rounded-xl bg-zinc-950/80 border border-white/[0.08]">
            <div className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold flex items-center gap-1.5 pb-2 border-b border-white/[0.06]">
              <Award className="w-3.5 h-3.5" />
              StreakBadge & EloBadge Gamification Molecules
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-zinc-900/40 border border-white/[0.06] space-y-3">
                <label className="text-[10px] uppercase font-mono text-zinc-500 block">Streak Days: {streakDays}</label>
                <input 
                  type="range" min="1" max="100" value={streakDays} 
                  onChange={e => setStreakDays(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
                <div className="flex justify-center pt-2">
                  <StreakBadge days={streakDays} />
                </div>
              </div>

              <div className="p-4 rounded-xl bg-zinc-900/40 border border-white/[0.06] space-y-3">
                <label className="text-[10px] uppercase font-mono text-zinc-500 block">Elo Rating: {eloRating}</label>
                <input 
                  type="range" min="800" max="2600" value={eloRating} 
                  onChange={e => setEloRating(Number(e.target.value))}
                  className="w-full accent-cyan-500 cursor-pointer"
                />
                <div className="flex justify-center gap-2 pt-2">
                  <EloBadge 
                    rating={eloRating} 
                    division={eloRating >= 1900 ? 'Div 1' : eloRating >= 1400 ? 'Div 2' : 'Div 3'}
                    trend={eloTrend}
                  />
                </div>
              </div>
            </div>
          </div>
        );

      // 10. MOLECULE: STAT METRIC CARD
      case 'mol-stat':
        return (
          <div className="space-y-4 p-5 rounded-xl bg-zinc-950/80 border border-white/[0.08]">
            <div className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1.5 pb-2 border-b border-white/[0.06]">
              <Activity className="w-3.5 h-3.5" />
              StatMetricCard Molecule Workbench
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <StatMetricCard
                label="Problems Solved"
                value="382 / 520"
                subtext="Top 4.2% on CodeHurdle"
                icon={<BookOpen className="w-4 h-4 text-emerald-400" />}
                variant="emerald"
                trend={{ direction: 'up', text: '+18 this week' }}
              />
              <StatMetricCard
                label="Contest Rating"
                value="1,840 Elo"
                subtext="Division 1 Candidate"
                icon={<Swords className="w-4 h-4 text-cyan-400" />}
                variant="cyan"
                trend={{ direction: 'up', text: '+64 pts' }}
              />
              <StatMetricCard
                label="Current Streak"
                value="14 Days"
                subtext="Active streak multiplier"
                icon={<Flame className="w-4 h-4 text-amber-400" />}
                variant="amber"
                trend={{ direction: 'up', text: 'Personal best' }}
              />
            </div>
          </div>
        );

      // 11. MOLECULE: SEARCH INPUT
      case 'mol-search':
        return (
          <div className="space-y-4 p-5 rounded-xl bg-zinc-950/80 border border-white/[0.08]">
            <div className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1.5 pb-2 border-b border-white/[0.06]">
              <Search className="w-3.5 h-3.5" />
              SearchInput Molecule Workbench
            </div>

            <div className="p-4 rounded-xl bg-zinc-900/40">
              <SearchInput
                value={searchVal}
                onChange={val => setSearchVal(val)}
                placeholder="Search across 520 problems, topics, and companies..."
                onClear={() => setSearchVal('')}
              />
              <div className="mt-2 text-xs font-mono text-zinc-500">
                Searching for: <span className="text-emerald-400">"{searchVal}"</span>
              </div>
            </div>
          </div>
        );

      // 12. ORGANISMS & INTERACTIVE ALGORITHM VISUALIZERS
      case 'org-graph-visualizer':
        return (
          <div className="space-y-4">
            <GraphAlgorithmVisualizer onLaunchSolver={() => onNavigateToView('cp')} />
          </div>
        );

      case 'org-dp-visualizer':
        return (
          <div className="space-y-4">
            <DpAlgorithmVisualizer onLaunchSolver={() => onNavigateToView('problems')} />
          </div>
        );

      case 'org-compiler':
      case 'org-cp':
      case 'org-explorer':
      case 'org-roadmap':
      case 'org-community':
      case 'org-jobprep':
      case 'org-profile':
        return (
          <div className="p-6 rounded-xl bg-gradient-to-r from-zinc-950 to-zinc-900 border border-white/[0.08] space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-purple-400 font-bold flex items-center gap-2">
                <Layers className="w-4 h-4" />
                Live Page Organism Available
              </span>
              {selectedComp.navTarget && (
                <Button size="sm" variant="primary" onClick={() => onNavigateToView(selectedComp.navTarget!)}>
                  Launch Full Page View <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
                </Button>
              )}
            </div>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              {selectedComp.description}
            </p>
            <div className="p-4 rounded-lg bg-black/40 border border-white/[0.05] font-mono text-xs text-zinc-400">
              Target Route: <span className="text-emerald-400 font-semibold">{selectedComp.navTarget}</span> | File: <span className="text-zinc-200">{selectedComp.file}</span>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-zinc-100 font-sans pb-20">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-emerald-500 text-zinc-950 font-bold text-xs px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Hero Section of the Design System */}
      <section className="relative overflow-hidden border-b border-white/[0.08] bg-gradient-to-b from-[#0c101c] via-[#07090e] to-[#07090e] px-4 py-12 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b98108_1px,transparent_1px),linear-gradient(to_bottom,#10b98108_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
        
        <div className="relative mx-auto max-w-7xl">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-mono font-medium text-emerald-300">
                <Layers className="h-3.5 w-3.5 text-emerald-400" />
                <span>Atomic Design Architecture v2.4</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white font-sans">
                CodeHurdle <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">Design System</span>
              </h1>

              <p className="max-w-2xl text-sm sm:text-base text-zinc-400 leading-relaxed font-sans">
                The unified design language powering CodeHurdle. Structured into 4 distinct atomic tiers: 
                <strong className="text-zinc-200"> Tokens</strong>, <strong className="text-zinc-200">Atoms</strong>, <strong className="text-zinc-200">Molecules</strong>, and <strong className="text-zinc-200">Organisms</strong>. Fully interactive with live property workbenches and copyable TypeScript definitions.
              </p>
            </div>

            {/* Quick Metrics Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
              <div className="p-3.5 rounded-xl border border-white/[0.08] bg-zinc-950/80 text-center">
                <div className="text-2xl font-bold text-white font-mono">3</div>
                <div className="text-[10px] text-zinc-500 uppercase mt-0.5">Token Sets</div>
              </div>
              <div className="p-3.5 rounded-xl border border-white/[0.08] bg-zinc-950/80 text-center">
                <div className="text-2xl font-bold text-emerald-400 font-mono">8</div>
                <div className="text-[10px] text-zinc-500 uppercase mt-0.5">Atoms</div>
              </div>
              <div className="p-3.5 rounded-xl border border-white/[0.08] bg-zinc-950/80 text-center">
                <div className="text-2xl font-bold text-cyan-400 font-mono">10</div>
                <div className="text-[10px] text-zinc-500 uppercase mt-0.5">Molecules</div>
              </div>
              <div className="p-3.5 rounded-xl border border-white/[0.08] bg-zinc-950/80 text-center">
                <div className="text-2xl font-bold text-purple-400 font-mono">9</div>
                <div className="text-[10px] text-zinc-500 uppercase mt-0.5">Organisms</div>
              </div>
            </div>
          </div>

          {/* Quick Page Jump Bar */}
          <div className="mt-8 pt-6 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono text-zinc-500">Live CodeHurdle Pages:</span>
              <button
                onClick={() => onNavigateToView('home')}
                className="px-3 py-1 rounded-lg border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.08] text-xs font-medium text-zinc-300 transition-colors cursor-pointer"
              >
                Home Landing
              </button>
              <button
                onClick={() => onNavigateToView('problems')}
                className="px-3 py-1 rounded-lg border border-emerald-500/20 bg-emerald-500/10 hover:bg-emerald-500/20 text-xs font-medium text-emerald-300 transition-colors cursor-pointer"
              >
                DSA Hub (520 Problems)
              </button>
              <button
                onClick={() => onNavigateToView('cp')}
                className="px-3 py-1 rounded-lg border border-rose-500/20 bg-rose-500/10 hover:bg-rose-500/20 text-xs font-medium text-rose-300 transition-colors cursor-pointer"
              >
                CP Arena
              </button>
              <button
                onClick={() => onNavigateToView('compiler')}
                className="px-3 py-1 rounded-lg border border-cyan-500/20 bg-cyan-500/10 hover:bg-cyan-500/20 text-xs font-medium text-cyan-300 transition-colors cursor-pointer"
              >
                Compiler / IDE
              </button>
              <button
                onClick={() => onNavigateToView('roadmap')}
                className="px-3 py-1 rounded-lg border border-purple-500/20 bg-purple-500/10 hover:bg-purple-500/20 text-xs font-medium text-purple-300 transition-colors cursor-pointer"
              >
                29-Tracks Roadmap
              </button>
            </div>

            {/* View Mode Toggle: Interactive Workbench vs Gallery */}
            <div className="flex items-center gap-1 bg-zinc-950 p-1 rounded-xl border border-white/[0.08]">
              <button
                onClick={() => setViewMode('workbench')}
                className={`flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                  viewMode === 'workbench' ? 'bg-zinc-800 text-white font-semibold shadow-sm' : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-emerald-400" />
                <span>Workbench Mode</span>
              </button>
              <button
                onClick={() => setViewMode('gallery')}
                className={`flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                  viewMode === 'gallery' ? 'bg-zinc-800 text-white font-semibold shadow-sm' : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <Grid className="w-3.5 h-3.5 text-cyan-400" />
                <span>Gallery Mode</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-8">
        {/* Tier Filter Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
          <TabGroup
            tabs={[
              { id: 'all', label: 'All Library (30)' },
              { id: 'token', label: 'Tokens (3)' },
              { id: 'atom', label: 'Atoms (8)' },
              { id: 'molecule', label: 'Molecules (10)' },
              { id: 'organism', label: 'Organisms (9)' }
            ]}
            activeTab={selectedTier}
            onChange={id => {
              setSelectedTier(id as AtomicTier);
              const found = COMPONENTS.find(c => id === 'all' || c.tier === id);
              if (found) setSelectedComp(found);
            }}
            variant="pill"
          />

          <span className="text-xs font-mono text-zinc-500">
            Showing <strong className="text-white">{filteredComponents.length}</strong> components in view
          </span>
        </div>

        {/* WORKBENCH MODE: 2-Column Split View */}
        {viewMode === 'workbench' && (
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Component Directory / Selector */}
            <div className="lg:col-span-4 space-y-3">
              <div className="text-xs font-mono uppercase text-zinc-500 font-bold px-1">
                Select Component to Inspect:
              </div>

              <div className="space-y-1.5 max-h-[720px] overflow-y-auto pr-1 custom-scrollbar">
                {filteredComponents.map(c => {
                  const Icon = c.icon;
                  const isSelected = selectedComp.id === c.id;
                  return (
                    <button
                      key={c.id}
                      onClick={() => {
                        setSelectedComp(c);
                        window.scrollTo({ top: 400, behavior: 'smooth' });
                      }}
                      className={`w-full p-3 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? 'bg-zinc-800/90 border-emerald-500/60 text-white shadow-lg shadow-emerald-950/20 ring-1 ring-emerald-500/30'
                          : 'bg-zinc-950/60 border-white/[0.06] text-zinc-400 hover:text-zinc-200 hover:border-zinc-700 hover:bg-zinc-900/40'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className={`p-2 rounded-lg ${
                          isSelected ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/[0.03] text-zinc-500'
                        }`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs font-semibold text-white truncate">{c.name}</div>
                          <div className="text-[10px] text-zinc-500 font-mono truncate">{c.file}</div>
                        </div>
                      </div>

                      <span className={`text-[9px] font-mono uppercase px-2 py-0.5 rounded font-medium ${
                        c.tier === 'token' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                        c.tier === 'atom' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' :
                        c.tier === 'molecule' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                        'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                      }`}>
                        {c.tier}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Deep-Dive Component Workbench Canvas */}
            <div className="lg:col-span-8">
              <Card variant="surface" className="p-6 sm:p-8 space-y-6 border-white/[0.1] bg-[#0c101c]/90 shadow-2xl">
                {/* Component Title & Metadata */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
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
                    <h2 className="text-2xl font-black text-white mt-1.5 font-sans">{selectedComp.name}</h2>
                    <span className="text-xs font-mono text-emerald-400/90">{selectedComp.file}</span>
                  </div>

                  {selectedComp.navTarget && (
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => onNavigateToView(selectedComp.navTarget!)}
                      icon={<ExternalLink className="w-3.5 h-3.5" />}
                    >
                      Open Live Page View
                    </Button>
                  )}
                </div>

                {/* Description */}
                <p className="text-sm text-zinc-300 leading-relaxed font-sans">
                  {selectedComp.description}
                </p>

                {/* LIVE INTERACTIVE PLAYGROUND CANVAS */}
                <div>
                  <div className="text-xs font-mono uppercase text-zinc-400 font-bold mb-3 flex items-center gap-2">
                    <SlidersHorizontal className="w-4 h-4 text-emerald-400" />
                    <span>Interactive Test Playground & Live State:</span>
                  </div>
                  {renderInteractivePlayground()}
                </div>

                {/* Props & TypeScript Interface Definition */}
                <div>
                  <div className="flex items-center justify-between text-xs font-mono uppercase text-zinc-400 font-bold mb-2">
                    <span className="flex items-center gap-1.5">
                      <FileCode2 className="w-4 h-4 text-cyan-400" />
                      <span>TypeScript Props Specification:</span>
                    </span>
                  </div>
                  <div className="p-4 rounded-xl bg-zinc-950 border border-white/[0.08] font-mono text-xs text-zinc-300 overflow-x-auto">
                    <pre>{selectedComp.propsSnippet}</pre>
                  </div>
                </div>

                {/* Usage Code Snippet with 1-Click Copy */}
                <div>
                  <div className="flex items-center justify-between text-xs font-mono uppercase text-zinc-400 font-bold mb-2">
                    <span className="flex items-center gap-1.5">
                      <Code2 className="w-4 h-4 text-emerald-400" />
                      <span>Ready-to-Use Code Example:</span>
                    </span>
                    <button
                      onClick={() => handleCopy(selectedComp.usageSnippet)}
                      className="flex items-center gap-1 text-xs text-zinc-400 hover:text-white transition-colors cursor-pointer px-2.5 py-1 rounded-lg bg-zinc-900 border border-white/[0.08]"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? 'Copied to Clipboard' : 'Copy Snippet'}</span>
                    </button>
                  </div>
                  <div className="p-4 rounded-xl bg-zinc-950 border border-white/[0.08] font-mono text-xs text-emerald-300 overflow-x-auto">
                    <pre>{selectedComp.usageSnippet}</pre>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* GALLERY MODE: Side-by-Side Visual Inspection of All Components */}
        {viewMode === 'gallery' && (
          <div className="mt-8 space-y-12">
            {/* Tokens Section */}
            {(selectedTier === 'all' || selectedTier === 'token') && (
              <section className="space-y-4">
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                    <h3 className="text-lg font-bold text-white font-sans">Tier 1: Design Tokens</h3>
                  </div>
                  <span className="text-xs font-mono text-zinc-500">Master colors, fonts, and geometry</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {COMPONENTS.filter(c => c.tier === 'token').map(c => (
                    <Card key={c.id} variant="surface" className="p-5 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono text-emerald-400 font-bold">{c.name}</span>
                        <c.icon className="w-4 h-4 text-zinc-400" />
                      </div>
                      <p className="text-xs text-zinc-400">{c.description}</p>
                      <button
                        onClick={() => {
                          setSelectedComp(c);
                          setViewMode('workbench');
                        }}
                        className="text-xs font-mono text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        Inspect in Workbench →
                      </button>
                    </Card>
                  ))}
                </div>
              </section>
            )}

            {/* Atoms Section */}
            {(selectedTier === 'all' || selectedTier === 'atom') && (
              <section className="space-y-4">
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                    <h3 className="text-lg font-bold text-white font-sans">Tier 2: Atoms (8 Building Blocks)</h3>
                  </div>
                  <span className="text-xs font-mono text-zinc-500">Indivisible UI primitives</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {COMPONENTS.filter(c => c.tier === 'atom').map(c => (
                    <Card key={c.id} variant="interactive" className="p-5 space-y-3 cursor-pointer" onClick={() => {
                      setSelectedComp(c);
                      setViewMode('workbench');
                    }}>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white font-sans">{c.name}</span>
                        <c.icon className="w-4 h-4 text-cyan-400" />
                      </div>
                      <p className="text-xs text-zinc-400 line-clamp-2">{c.description}</p>
                      <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-zinc-500">
                        <span>{c.file.split('/').pop()}</span>
                        <span className="text-cyan-400">Test →</span>
                      </div>
                    </Card>
                  ))}
                </div>
              </section>
            )}

            {/* Molecules Section */}
            {(selectedTier === 'all' || selectedTier === 'molecule') && (
              <section className="space-y-4">
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                    <h3 className="text-lg font-bold text-white font-sans">Tier 3: Molecules (10 Algorithmic Components)</h3>
                  </div>
                  <span className="text-xs font-mono text-zinc-500">Problem rows, Elo badges, contest cards, telemetry</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {COMPONENTS.filter(c => c.tier === 'molecule').map(c => (
                    <Card key={c.id} variant="interactive" className="p-5 space-y-3 cursor-pointer" onClick={() => {
                      setSelectedComp(c);
                      setViewMode('workbench');
                    }}>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white font-sans">{c.name}</span>
                        <c.icon className="w-4 h-4 text-amber-400" />
                      </div>
                      <p className="text-xs text-zinc-400 line-clamp-2">{c.description}</p>
                      <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-zinc-500">
                        <span>{c.category}</span>
                        <span className="text-amber-400">Test →</span>
                      </div>
                    </Card>
                  ))}
                </div>
              </section>
            )}

            {/* Organisms Section */}
            {(selectedTier === 'all' || selectedTier === 'organism') && (
              <section className="space-y-4">
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-purple-400" />
                    <h3 className="text-lg font-bold text-white font-sans">Tier 4: Organisms (9 Templates & Interactive Visualizers)</h3>
                  </div>
                  <span className="text-xs font-mono text-zinc-500">Full-scale views, graph traversals, and DP table workspaces</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {COMPONENTS.filter(c => c.tier === 'organism').map(c => (
                    <Card key={c.id} variant="surface" className="p-5 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white font-sans">{c.name}</span>
                        <c.icon className="w-4 h-4 text-purple-400" />
                      </div>
                      <p className="text-xs text-zinc-400">{c.description}</p>
                      <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between">
                        <button
                          onClick={() => {
                            setSelectedComp(c);
                            setViewMode('workbench');
                          }}
                          className="text-xs font-mono text-purple-400 hover:underline cursor-pointer"
                        >
                          Specs & Snippets →
                        </button>
                        {c.navTarget && (
                          <Button size="xs" variant="primary" onClick={() => onNavigateToView(c.navTarget!)}>
                            Open Page
                          </Button>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
