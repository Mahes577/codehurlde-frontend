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
  Grid
} from 'lucide-react';
import { ActiveView } from './Navbar';
import { 
  Button, 
  Badge, 
  DifficultyBadge, 
  Card, 
  Input, 
  Avatar, 
  ProgressBar, 
  TabGroup, 
  StreakBadge, 
  EloBadge, 
  StatMetricCard, 
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
  previewNode?: React.ReactNode;
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

  // Live interactive state for demos
  const [demoInput, setDemoInput] = useState('');
  const [demoTab, setDemoTab] = useState('one');
  const [demoProgress, setDemoProgress] = useState(68);

  const COMPONENTS: ComponentDoc[] = [
    // ATOMS
    {
      id: 'atom-button',
      name: 'Button',
      tier: 'atom',
      category: 'Atoms / Interactive',
      icon: MousePointerClick,
      file: 'src/components/atoms/Button.tsx',
      description: 'Unified action button supporting 6 color variants (primary, secondary, outline, ghost, danger, amber), 4 responsive sizes (xs, sm, md, lg), loading spinner state, and tactile scale feedback.',
      previewNode: (
        <div className="flex flex-wrap gap-2.5 items-center p-4 bg-zinc-950/70 rounded-xl border border-white/[0.08]">
          <Button variant="primary" size="sm">Primary Action</Button>
          <Button variant="secondary" size="sm">Secondary</Button>
          <Button variant="outline" size="sm">Outline</Button>
          <Button variant="ghost" size="sm">Ghost</Button>
          <Button variant="amber" size="sm">Amber Accent</Button>
          <Button variant="primary" size="sm" isLoading>Loading</Button>
        </div>
      ),
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
      description: 'Semantic pills for system states and problem difficulty (Easy/Medium/Hard). Enforces standardized LeetCode hues: Emerald #10b981 for Easy, Amber #f59e0b for Medium, Rose #f43f5e for Hard.',
      previewNode: (
        <div className="flex flex-wrap gap-2 items-center p-4 bg-zinc-950/70 rounded-xl border border-white/[0.08]">
          <DifficultyBadge difficulty="Easy" size="sm" />
          <DifficultyBadge difficulty="Medium" size="sm" />
          <DifficultyBadge difficulty="Hard" size="sm" />
          <Badge variant="cyan" size="sm">Div 1</Badge>
          <Badge variant="purple" size="sm">AI Mentor</Badge>
          <Badge variant="amber" size="sm">Premium</Badge>
          <Badge variant="neutral" size="sm">O(N log N)</Badge>
        </div>
      ),
      propsSnippet: `interface BadgeProps {\n  variant?: 'emerald' | 'amber' | 'rose' | 'cyan' | 'purple' | 'neutral';\n  size?: 'xs' | 'sm' | 'md';\n  children: React.ReactNode;\n}\n\ninterface DifficultyBadgeProps {\n  difficulty: 'Easy' | 'Medium' | 'Hard';\n  size?: 'xs' | 'sm' | 'md';\n}`,
      usageSnippet: `<DifficultyBadge difficulty="Medium" size="sm" />\n<Badge variant="cyan" size="xs">Div 1</Badge>`
    },
    {
      id: 'atom-card',
      name: 'Card & CardHeader',
      tier: 'atom',
      category: 'Atoms / Layout & Containers',
      icon: Layers,
      file: 'src/components/atoms/Card.tsx',
      description: 'Standardized card surfaces matching obsidian design tokens (#0c101c base, border-white/[0.08], subtle glow and rounded-2xl corners).',
      previewNode: (
        <div className="grid grid-cols-2 gap-3 p-4 bg-zinc-950/70 rounded-xl border border-white/[0.08]">
          <Card variant="surface" className="p-3">
            <div className="text-xs font-semibold text-white">Surface Card</div>
            <div className="text-[11px] text-zinc-400 mt-0.5">Elevated obsidian bg with crisp border</div>
          </Card>
          <Card variant="interactive" className="p-3 cursor-pointer">
            <div className="text-xs font-semibold text-white">Interactive Card</div>
            <div className="text-[11px] text-zinc-400 mt-0.5">Hover glow with emerald border</div>
          </Card>
        </div>
      ),
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
      description: 'Standard form inputs with prefix and suffix slots, focused emerald outline, monospace typography options, and subtle error states.',
      previewNode: (
        <div className="p-4 bg-zinc-950/70 rounded-xl border border-white/[0.08] space-y-2">
          <Input 
            placeholder="Search problems, topics, tags..." 
            value={demoInput} 
            onChange={e => setDemoInput(e.target.value)}
            prefix={<Search className="w-3.5 h-3.5 text-zinc-500" />}
          />
        </div>
      ),
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
      previewNode: (
        <div className="flex items-center gap-4 p-4 bg-zinc-950/70 rounded-xl border border-white/[0.08]">
          <Avatar name="Alex Chen" size="sm" isPro isOnline />
          <Avatar name="Sarah Lin" size="md" isPro isOnline />
          <Avatar name="Vishesh K" size="lg" isOnline />
        </div>
      ),
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
      previewNode: (
        <div className="p-4 bg-zinc-950/70 rounded-xl border border-white/[0.08] space-y-3">
          <div>
            <div className="flex justify-between text-[11px] font-mono text-zinc-400 mb-1">
              <span>Overall Completion</span>
              <span className="text-emerald-400 font-bold">{demoProgress}%</span>
            </div>
            <ProgressBar value={demoProgress} variant="emerald" size="md" />
          </div>
          <div className="flex gap-2">
            <Button size="xs" variant="outline" onClick={() => setDemoProgress(Math.max(0, demoProgress - 10))}>-10%</Button>
            <Button size="xs" variant="outline" onClick={() => setDemoProgress(Math.min(100, demoProgress + 10))}>+10%</Button>
          </div>
        </div>
      ),
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
      description: 'Cohesive navigation switcher supporting underline and pill variants with subtle badge counters.',
      previewNode: (
        <div className="p-4 bg-zinc-950/70 rounded-xl border border-white/[0.08]">
          <TabGroup 
            tabs={[
              { id: 'one', label: 'All Problems (520)' },
              { id: 'two', label: 'Starred (14)', badge: '14' },
              { id: 'three', label: 'FAANG Curated' }
            ]}
            activeTab={demoTab}
            onChange={setDemoTab}
            variant="pill"
          />
        </div>
      ),
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
      description: 'Standardized problem list row combining solved checkbox, star bookmark, title, difficulty pill, acceptance percentage, frequency bar, company badges, and solve CTA.',
      previewNode: (
        <div className="p-2 bg-zinc-950/70 rounded-xl border border-white/[0.08]">
          <ProblemRow 
            id="4b936e2c"
            title="Roll Number Lookup"
            difficulty="Medium"
            category="Binary Search"
            acceptance="48.6%"
            solved={true}
            starred={false}
            companies={['Google', 'Uber']}
            frequency={88}
            onSolve={() => onNavigateToView('compiler')}
          />
        </div>
      ),
      propsSnippet: `interface ProblemRowProps {\n  id: string | number;\n  title: string;\n  difficulty: 'Easy' | 'Medium' | 'Hard';\n  category: string;\n  acceptance: string;\n  solved?: boolean;\n  starred?: boolean;\n  companies?: string[];\n  frequency?: number;\n  onSolve?: (id: string | number) => void;\n}`,
      usageSnippet: `<ProblemRow \n  id={problem.id} \n  title={problem.title} \n  difficulty={problem.difficulty} \n  acceptance={problem.acceptance} \n  onSolve={openSolver}\n/>`
    },
    {
      id: 'mol-streak',
      name: 'StreakBadge & EloBadge',
      tier: 'molecule',
      category: 'Molecules / Gamification',
      icon: Flame,
      file: 'src/components/molecules/StreakBadge.tsx',
      description: 'Interactive gamification badges for daily practice streak with flame icon and competitive programming Elo rating with division badge.',
      previewNode: (
        <div className="flex flex-wrap gap-3 items-center p-4 bg-zinc-950/70 rounded-xl border border-white/[0.08]">
          <StreakBadge streakCount={24} active={true} />
          <StreakBadge streakCount={0} active={false} />
          <EloBadge rating={1840} division="Div 1" />
          <EloBadge rating={1420} division="Div 2" />
        </div>
      ),
      propsSnippet: `// StreakBadgeProps\ninterface StreakBadgeProps {\n  streakCount: number;\n  active?: boolean;\n  size?: 'sm' | 'md' | 'lg';\n}\n\n// EloBadgeProps\ninterface EloBadgeProps {\n  rating: number;\n  division?: string;\n  trend?: 'up' | 'down' | 'flat';\n}`,
      usageSnippet: `<StreakBadge streakCount={24} active={true} />\n<EloBadge rating={1840} division="Div 1" />`
    },
    {
      id: 'mol-stat',
      name: 'StatMetricCard',
      tier: 'molecule',
      category: 'Molecules / Metrics',
      icon: Award,
      file: 'src/components/molecules/StatMetricCard.tsx',
      description: 'Standardized scorecard displaying icon container, primary metric number, sublabel, trend percentage, and background glow.',
      previewNode: (
        <div className="grid grid-cols-2 gap-3 p-4 bg-zinc-950/70 rounded-xl border border-white/[0.08]">
          <StatMetricCard 
            label="Daily Problem Streak"
            value="24 Days"
            subtext="Top 4% globally"
            icon={<Flame className="w-4 h-4 text-amber-400" />}
            trend={{ direction: 'up', text: '+3 this week' }}
            variant="amber"
          />
          <StatMetricCard 
            label="Curriculum Mastered"
            value="382 / 520"
            subtext="73.4% complete"
            icon={<BookOpen className="w-4 h-4 text-emerald-400" />}
            variant="emerald"
          />
        </div>
      ),
      propsSnippet: `interface StatMetricCardProps {\n  label: string;\n  value: string | number;\n  subtext?: string;\n  icon: React.ReactNode;\n  trend?: { direction: 'up' | 'down' | 'neutral'; text: string };\n  variant?: 'emerald' | 'cyan' | 'amber' | 'purple' | 'neutral';\n}`,
      usageSnippet: `<StatMetricCard label="Solved" value="382" icon={<Check />} variant="emerald" />`
    },

    // ORGANISMS
    {
      id: 'org-compiler',
      name: 'CompilerView',
      tier: 'organism',
      category: 'Organisms / Problem Solving',
      icon: Terminal,
      file: 'src/components/CompilerView.tsx',
      description: 'Full split-pane in-browser IDE with multi-language runner (Python 3, C++ 17, JS), AI Algorithmic Mentor, scratchpad notes, custom testcase runner, and submission evaluation percentiles.',
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
      description: 'Contest problem catalog matching CodeHurdle /cp with strict limits (1.0s-3.0s, 256MB), rating curves, Div 1 standing, and contest problemsets.',
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
      description: 'Filterable, searchable problem catalog matching CodeHurdle /dsa with difficulty badges, company tags, completion statuses, acceptance %, and slide-over preview drawer.',
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
      description: 'Structured 29-topic curriculum roadmap with sequential milestone progression, track completion metrics, and deep-dive inspection card.',
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
      description: 'Interactive discussion channels (#dsa-help, #weekly-contest), code snippet sharing, mock interview pairing requests, and live voice study rooms.',
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
      description: 'Interview guides and company vaults (Google, Meta, Amazon, Microsoft, Uber, Netflix) with hiring rounds, salary ranges, and an AI resume ATS keyword scanner.',
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
      description: 'Comprehensive profile dashboard showcasing Elo rating (1,840 Div 1), 365-day submission heatmap, circular SVG difficulty breakdown, and recent submissions table.',
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
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/65 backdrop-blur-sm font-sans animate-fade-in">
      <div className="w-full max-w-3xl bg-[#0b0e14] border-l border-white/[0.08] h-full flex flex-col shadow-2xl">
        {/* Header */}
        <div className="p-5 border-b border-white/[0.08] flex items-center justify-between bg-zinc-950/70">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white">CodeHurdle Atomic Design System</h2>
                <Badge variant="emerald" size="xs">Uniform UI</Badge>
              </div>
              <p className="text-xs text-zinc-400 mt-0.5">Atoms, Molecules, and Organisms sharing identical tokens</p>
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
              { id: 'all', label: 'All Primitives' },
              { id: 'atom', label: 'Atoms (7)' },
              { id: 'molecule', label: 'Molecules (3)' },
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
                  Live View
                </Button>
              )}
            </div>

            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              {selectedComp.description}
            </p>

            {/* Live Preview if available */}
            {selectedComp.previewNode && (
              <div className="space-y-2">
                <div className="text-xs font-mono uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Live Interactive Preview:</span>
                </div>
                {selectedComp.previewNode}
              </div>
            )}

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
            <span>Atomic Design tokens synchronized across all 9 views</span>
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
