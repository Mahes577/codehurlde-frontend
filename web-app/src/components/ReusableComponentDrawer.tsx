import React, { useState } from 'react';
import { X, Code2, Copy, Check, Layers, Terminal, User, BookOpen, Compass, ExternalLink } from 'lucide-react';

interface ComponentDoc {
  id: string;
  name: string;
  category: string;
  icon: any;
  file: string;
  description: string;
  propsSnippet: string;
  usageSnippet: string;
}

const COMPONENTS: ComponentDoc[] = [
  {
    id: 'compiler',
    name: 'In-Browser Compiler & IDE',
    category: 'Core Problem Solver',
    icon: Terminal,
    file: 'src/components/CompilerView.tsx',
    description: 'Split-pane problem solver matching CodeHurdle /dsa/problems/:id/solve with multi-language code runner, custom testcases, AI mentor assistance, scratchpad notes, and submission verdict with runtime/memory percentiles.',
    propsSnippet: `interface CompilerViewProps {
  onBackToDirectory?: () => void;
  problemId?: string;
}`,
    usageSnippet: `<CompilerView 
  onBackToDirectory={() => navigate('/dsa')} 
/>`
  },
  {
    id: 'profile',
    name: 'Developer Profile & Analytics',
    category: 'User Dashboard',
    icon: User,
    file: 'src/components/UserProfileView.tsx',
    description: 'Full profile dashboard showcasing Elo rating (1,840 Div 1), 365-day submission heatmap, circular SVG difficulty breakdown (Easy/Med/Hard), topic mastery radar, and recent submissions table.',
    propsSnippet: `interface UserProfileViewProps {
  userId?: string;
  username?: string;
}`,
    usageSnippet: `<UserProfileView />`
  },
  {
    id: 'problems',
    name: 'Problem Directory & Catalog',
    category: 'Directory & Navigation',
    icon: BookOpen,
    file: 'src/components/ProblemExplorer.tsx',
    description: 'Filterable, searchable problem catalog with difficulty badges, company tags, completion statuses, acceptance percentages, starred bookmarks, and slide-over preview drawer with direct solve CTA.',
    propsSnippet: `interface ProblemExplorerProps {
  onSelectProblem?: (problemId: string) => void;
}`,
    usageSnippet: `<ProblemExplorer 
  onSelectProblem={(id) => navigate(\`/dsa/problems/\${id}/solve\`)} 
/>`
  },
  {
    id: 'roadmap',
    name: '29-Topic DSA Syllabus Roadmap',
    category: 'Curriculum & Tracks',
    icon: Compass,
    file: 'src/components/RoadmapView.tsx',
    description: 'Complete sequential curriculum matching CodeHurdle 29 topics (Basics, Number Theory, Arrays, Two Pointers, Binary Search, DP...). Features milestone indicators, progress bars, and topic inspection.',
    propsSnippet: `interface RoadmapViewProps {
  onSelectProblem?: (problemId: string) => void;
}`,
    usageSnippet: `<RoadmapView 
  onSelectProblem={(id) => openCompiler(id)} 
/>`
  },
  {
    id: 'heatmap',
    name: '365-Day Continuous Heatmap',
    category: 'Gamification & Retention',
    icon: Layers,
    file: 'src/components/ActivityHeatmap.tsx',
    description: 'GitHub and LeetCode-style activity grid across 52 weeks with multi-year toggles, streak metrics, and day-by-day submission inspector drawer.',
    propsSnippet: `interface ActivityHeatmapProps {
  year?: number;
  userId?: string;
}`,
    usageSnippet: `<ActivityHeatmap />`
  }
];

interface ReusableComponentDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToView: (view: 'home' | 'problems' | 'compiler' | 'profile' | 'roadmap') => void;
}

export const ReusableComponentDrawer: React.FC<ReusableComponentDrawerProps> = ({
  isOpen,
  onClose,
  onNavigateToView
}) => {
  const [selectedComp, setSelectedComp] = useState<ComponentDoc>(COMPONENTS[0]);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-2xl bg-[#0b0e14] border-l border-zinc-800 h-full flex flex-col font-sans shadow-2xl">
        {/* Header */}
        <div className="p-5 border-b border-zinc-800/80 flex items-center justify-between bg-zinc-950/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Reusable Component Reference</h2>
              <p className="text-xs text-zinc-400">Directly exportable modules designed for CodeHurdle</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Component Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {COMPONENTS.map(c => {
              const Icon = c.icon;
              const isSelected = selectedComp.id === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => setSelectedComp(c)}
                  className={`p-3 rounded-xl border text-left transition-all flex flex-col gap-1.5 ${
                    isSelected
                      ? 'bg-zinc-800/90 border-emerald-500/60 text-white shadow'
                      : 'bg-zinc-900/40 border-zinc-800/60 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isSelected ? 'text-emerald-400' : 'text-zinc-500'}`} />
                  <span className="text-xs font-semibold line-clamp-1">{c.name}</span>
                  <span className="text-[10px] text-zinc-500 font-mono">{c.category}</span>
                </button>
              );
            })}
          </div>

          {/* Selected Component Card */}
          <div className="rounded-xl bg-zinc-900/60 border border-zinc-800/80 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  {selectedComp.category}
                </span>
                <h3 className="text-lg font-bold text-white mt-1">{selectedComp.name}</h3>
                <span className="text-xs font-mono text-zinc-400">{selectedComp.file}</span>
              </div>

              <button
                onClick={() => {
                  if (selectedComp.id === 'compiler') onNavigateToView('compiler');
                  else if (selectedComp.id === 'profile') onNavigateToView('profile');
                  else if (selectedComp.id === 'roadmap') onNavigateToView('roadmap');
                  else if (selectedComp.id === 'problems') onNavigateToView('problems');
                  else onNavigateToView('home');
                  onClose();
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-400 text-black text-xs font-semibold hover:bg-emerald-300 transition-colors"
              >
                <span>Live Preview</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>

            <p className="text-xs text-zinc-300 leading-relaxed">
              {selectedComp.description}
            </p>

            {/* Props snippet */}
            <div>
              <div className="text-xs font-mono uppercase text-zinc-400 mb-1.5">Component Props Interface:</div>
              <div className="p-3 rounded-lg bg-zinc-950 border border-zinc-800 font-mono text-xs text-zinc-300">
                <pre>{selectedComp.propsSnippet}</pre>
              </div>
            </div>

            {/* Usage snippet */}
            <div>
              <div className="flex items-center justify-between text-xs font-mono uppercase text-zinc-400 mb-1.5">
                <span>Usage Example:</span>
                <button
                  onClick={() => handleCopy(selectedComp.usageSnippet)}
                  className="flex items-center gap-1 text-[11px] text-zinc-400 hover:text-white"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <div className="p-3 rounded-lg bg-zinc-950 border border-zinc-800 font-mono text-xs text-emerald-300">
                <pre>{selectedComp.usageSnippet}</pre>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-zinc-800/80 bg-zinc-950/60 flex items-center justify-between text-xs text-zinc-400">
          <span>All components are written in React 19 + TypeScript + Tailwind CSS</span>
          <button 
            onClick={onClose}
            className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
