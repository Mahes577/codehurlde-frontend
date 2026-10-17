import React, { useState } from 'react';
import { 
  Search, 
  Menu, 
  X, 
  Flame, 
  Trophy, 
  BookOpen, 
  Building2, 
  Sparkles, 
  Bell, 
  ChevronDown, 
  ShieldCheck,
  Code2,
  Terminal,
  User,
  Compass,
  Layers,
  Swords,
  Users,
  Briefcase
} from 'lucide-react';

export type ActiveView = 'home' | 'problems' | 'cp' | 'compiler' | 'roadmap' | 'community' | 'jobprep' | 'profile';

interface NavbarProps {
  currentView: ActiveView;
  onSelectView: (view: ActiveView) => void;
  onOpenSearch?: () => void;
  onOpenComponentDocs?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  currentView, 
  onSelectView, 
  onOpenSearch,
  onOpenComponentDocs
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/[0.08] bg-[#07090e]/95 backdrop-blur-md font-sans">
      {/* Top micro-bar: Today's Daily Coding Challenge Announcement */}
      <div className="border-b border-white/[0.05] bg-gradient-to-r from-emerald-950/40 via-[#0a0f1d] to-[#07090e] px-4 py-1 text-[11px] font-mono text-zinc-400">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-zinc-500 uppercase">Oct 18 Daily Challenge:</span>
            <button 
              onClick={() => onSelectView('compiler')}
              className="font-semibold text-zinc-200 hover:text-emerald-400 transition-colors flex items-center gap-1.5"
            >
              <span>Roll Number Lookup (Medium)</span>
              <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-1 rounded border border-emerald-500/20">Reward +100 XP</span>
              <span className="text-zinc-500 text-[10px]">Solve in IDE →</span>
            </button>
          </div>

          <div className="hidden md:flex items-center gap-4 text-zinc-400 text-[11px]">
            <span>Next Weekly Contest starts in: <strong className="text-amber-400 font-mono">2h 14m</strong></span>
            <span className="text-zinc-600">|</span>
            <span className="text-emerald-400 font-medium flex items-center gap-1">
              <ShieldCheck className="h-3 w-3" /> Anti-Cheat v2.4 Active
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand & Left Navigation */}
        <div className="flex items-center gap-6">
          <button 
            onClick={() => onSelectView('home')} 
            className="flex items-center gap-2.5 group text-left"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/30 group-hover:border-emerald-500/60 group-hover:bg-emerald-500/20 transition-all shadow-sm">
              <Code2 className="h-4.5 w-4.5 text-emerald-400 group-hover:scale-105 transition-transform" />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-black text-base tracking-tight text-white font-sans">
                Code<span className="text-emerald-400">Hurdle</span>
              </span>
              <span className="rounded bg-white/[0.06] px-1.5 py-0.2 text-[9px] font-mono text-zinc-400 border border-white/[0.08]">
                v2.1
              </span>
            </div>
          </button>

          {/* Primary View Switcher Navigation */}
          <nav className="hidden xl:flex items-center gap-0.5 bg-zinc-950/60 p-1 rounded-xl border border-zinc-800/80">
            <button 
              onClick={() => onSelectView('home')} 
              className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg transition-all ${
                currentView === 'home'
                  ? 'bg-zinc-800 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50'
              }`}
            >
              <span>Home</span>
            </button>

            <button 
              onClick={() => onSelectView('problems')} 
              className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg transition-all ${
                currentView === 'problems'
                  ? 'bg-zinc-800 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50'
              }`}
            >
              <BookOpen className="h-3.5 w-3.5 text-emerald-400" />
              <span>DSA Hub</span>
            </button>

            <button 
              onClick={() => onSelectView('cp')} 
              className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg transition-all ${
                currentView === 'cp'
                  ? 'bg-zinc-800 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50'
              }`}
            >
              <Swords className="h-3.5 w-3.5 text-rose-400" />
              <span>CP Arena</span>
            </button>

            <button 
              onClick={() => onSelectView('compiler')} 
              className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg transition-all ${
                currentView === 'compiler'
                  ? 'bg-zinc-800 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50'
              }`}
            >
              <Terminal className="h-3.5 w-3.5 text-cyan-400" />
              <span>Compiler / IDE</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            </button>

            <button 
              onClick={() => onSelectView('roadmap')} 
              className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg transition-all ${
                currentView === 'roadmap'
                  ? 'bg-zinc-800 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50'
              }`}
            >
              <Compass className="h-3.5 w-3.5 text-purple-400" />
              <span>29-Tracks</span>
            </button>

            <button 
              onClick={() => onSelectView('community')} 
              className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg transition-all ${
                currentView === 'community'
                  ? 'bg-zinc-800 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50'
              }`}
            >
              <Users className="h-3.5 w-3.5 text-indigo-400" />
              <span>Community</span>
            </button>

            <button 
              onClick={() => onSelectView('jobprep')} 
              className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg transition-all ${
                currentView === 'jobprep'
                  ? 'bg-zinc-800 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50'
              }`}
            >
              <Briefcase className="h-3.5 w-3.5 text-blue-400" />
              <span>Job Prep</span>
            </button>

            <button 
              onClick={() => onSelectView('profile')} 
              className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg transition-all ${
                currentView === 'profile'
                  ? 'bg-zinc-800 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50'
              }`}
            >
              <User className="h-3.5 w-3.5 text-amber-400" />
              <span>Profile</span>
            </button>
          </nav>
        </div>

        {/* Right Action Bar & Developer User Strip */}
        <div className="flex items-center gap-2.5">
          {/* Component Specs Drawer trigger */}
          {onOpenComponentDocs && (
            <button
              onClick={onOpenComponentDocs}
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 rounded-lg border border-emerald-500/25 transition-all shadow-sm"
            >
              <Layers className="w-3.5 h-3.5 text-emerald-400" />
              <span>Reusable Components</span>
            </button>
          )}

          {/* Quick Search trigger */}
          <button 
            onClick={onOpenSearch}
            className="flex items-center gap-2 rounded-lg border border-white/[0.08] bg-[#0c101c] px-2.5 py-1 text-xs text-zinc-400 hover:border-white/[0.18] hover:text-zinc-200 transition-colors"
            title="Search (Cmd+K)"
          >
            <Search className="h-3.5 w-3.5 text-zinc-500" />
            <span className="hidden sm:inline font-sans text-xs">Search...</span>
            <kbd className="rounded bg-white/[0.06] px-1.5 py-0.2 text-[10px] font-mono text-zinc-400 border border-white/[0.08]">⌘K</kbd>
          </button>

          {/* Daily Streak Indicator */}
          <div className="hidden sm:flex items-center gap-1.5 rounded-lg border border-amber-500/25 bg-amber-950/20 px-2.5 py-1 text-xs font-mono text-amber-300">
            <Flame className="h-3.5 w-3.5 fill-amber-400 text-amber-500" />
            <span className="font-bold">14</span>
            <span className="text-[10px] text-amber-400/80 uppercase font-sans">Days</span>
          </div>

          {/* User Profile Pill */}
          <div className="relative">
            <button
              onClick={() => onSelectView('profile')}
              className="flex items-center gap-2 rounded-lg border border-white/[0.1] bg-[#0c101c] hover:border-white/[0.2] p-1 pr-2.5 transition-colors"
              title="Open Developer Profile"
            >
              <div className="h-6 w-6 rounded bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-[10px] font-mono font-bold text-zinc-950">
                CA
              </div>
              <div className="hidden md:flex flex-col text-left">
                <span className="text-[11px] font-semibold text-zinc-200 leading-tight">aarav_codes</span>
                <span className="text-[9px] font-mono text-emerald-400 leading-tight">1,840 Elo · Div 1</span>
              </div>
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-zinc-300"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-b border-white/[0.08] bg-[#090b14] px-4 py-3 space-y-1.5 text-xs">
          <button 
            onClick={() => { onSelectView('home'); setMobileMenuOpen(false); }}
            className={`w-full flex items-center justify-between p-2 rounded-lg text-left ${currentView === 'home' ? 'bg-zinc-800 text-white font-medium' : 'text-zinc-300'}`}
          >
            <span>Home Platform</span>
          </button>
          <button 
            onClick={() => { onSelectView('problems'); setMobileMenuOpen(false); }}
            className={`w-full flex items-center justify-between p-2 rounded-lg text-left ${currentView === 'problems' ? 'bg-zinc-800 text-white font-medium' : 'text-zinc-300'}`}
          >
            <span>DSA Hub (520 Problems)</span>
            <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
          </button>
          <button 
            onClick={() => { onSelectView('cp'); setMobileMenuOpen(false); }}
            className={`w-full flex items-center justify-between p-2 rounded-lg text-left ${currentView === 'cp' ? 'bg-zinc-800 text-white font-medium' : 'text-zinc-300'}`}
          >
            <span>CP Arena (Contest Problems)</span>
            <Swords className="w-3.5 h-3.5 text-rose-400" />
          </button>
          <button 
            onClick={() => { onSelectView('compiler'); setMobileMenuOpen(false); }}
            className={`w-full flex items-center justify-between p-2 rounded-lg text-left ${currentView === 'compiler' ? 'bg-zinc-800 text-white font-medium' : 'text-zinc-300'}`}
          >
            <span>In-Browser IDE / Compiler</span>
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
          </button>
          <button 
            onClick={() => { onSelectView('roadmap'); setMobileMenuOpen(false); }}
            className={`w-full flex items-center justify-between p-2 rounded-lg text-left ${currentView === 'roadmap' ? 'bg-zinc-800 text-white font-medium' : 'text-zinc-300'}`}
          >
            <span>DSA 29-Tracks Curriculum</span>
            <Compass className="w-3.5 h-3.5 text-purple-400" />
          </button>
          <button 
            onClick={() => { onSelectView('community'); setMobileMenuOpen(false); }}
            className={`w-full flex items-center justify-between p-2 rounded-lg text-left ${currentView === 'community' ? 'bg-zinc-800 text-white font-medium' : 'text-zinc-300'}`}
          >
            <span>Community & Study Rooms</span>
            <Users className="w-3.5 h-3.5 text-indigo-400" />
          </button>
          <button 
            onClick={() => { onSelectView('jobprep'); setMobileMenuOpen(false); }}
            className={`w-full flex items-center justify-between p-2 rounded-lg text-left ${currentView === 'jobprep' ? 'bg-zinc-800 text-white font-medium' : 'text-zinc-300'}`}
          >
            <span>Job Prep & Companies</span>
            <Briefcase className="w-3.5 h-3.5 text-blue-400" />
          </button>
          <button 
            onClick={() => { onSelectView('profile'); setMobileMenuOpen(false); }}
            className={`w-full flex items-center justify-between p-2 rounded-lg text-left ${currentView === 'profile' ? 'bg-zinc-800 text-white font-medium' : 'text-zinc-300'}`}
          >
            <span>Developer Profile</span>
            <span className="font-mono text-amber-400">1,840 Elo</span>
          </button>
          {onOpenComponentDocs && (
            <button 
              onClick={() => { onOpenComponentDocs(); setMobileMenuOpen(false); }}
              className="w-full flex items-center justify-between p-2 rounded-lg text-emerald-400 bg-emerald-500/10 border border-emerald-500/20"
            >
              <span>Reusable Components Spec</span>
              <Layers className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      )}
    </header>
  );
};
