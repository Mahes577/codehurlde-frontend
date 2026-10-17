import React, { useState } from 'react';
import { 
  Search, 
  Menu, 
  X, 
  Flame, 
  Calendar, 
  Trophy, 
  BookOpen, 
  Building2, 
  Sparkles, 
  Bell, 
  ChevronDown, 
  CheckCircle2, 
  ShieldCheck,
  Zap,
  SlidersHorizontal,
  Code
} from 'lucide-react';

interface NavbarProps {
  onOpenSearch?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSearch }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.08] bg-[#07090e]/95 backdrop-blur-md">
      {/* Top micro-bar: Today's Daily Coding Challenge Announcement */}
      <div className="border-b border-white/[0.05] bg-gradient-to-r from-emerald-950/40 via-[#0a0f1d] to-[#07090e] px-4 py-1 text-[11px] font-mono text-zinc-400">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-zinc-500 uppercase">Oct 18 Challenge:</span>
            <a href="#problems" className="font-semibold text-zinc-200 hover:text-emerald-400 transition-colors flex items-center gap-1">
              <span>#200 Number of Islands (Medium)</span>
              <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-1 rounded border border-emerald-500/20">Reward +15 pts</span>
            </a>
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
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/30 group-hover:border-emerald-500/60 group-hover:bg-emerald-500/20 transition-all shadow-sm">
              <Code className="h-4.5 w-4.5 text-emerald-400 group-hover:scale-105 transition-transform" />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-black text-base tracking-tight text-white font-sans">
                Code<span className="text-emerald-400">Hurdle</span>
              </span>
              <span className="rounded bg-white/[0.06] px-1.5 py-0.2 text-[9px] font-mono text-zinc-400 border border-white/[0.08]">
                v2.1
              </span>
            </div>
          </a>

          {/* Primary Nav Links */}
          <nav className="hidden md:flex items-center gap-0.5">
            <a 
              href="#problems" 
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-zinc-200 hover:text-white rounded-md hover:bg-white/[0.04] transition-colors"
            >
              <BookOpen className="h-3.5 w-3.5 text-emerald-400" />
              <span>Problems</span>
            </a>

            <a 
              href="#dynamic-mode" 
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-zinc-200 hover:text-white rounded-md hover:bg-white/[0.04] transition-colors"
            >
              <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
              <span>Calibration</span>
            </a>

            <a 
              href="#contests" 
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-zinc-200 hover:text-white rounded-md hover:bg-white/[0.04] transition-colors"
            >
              <Trophy className="h-3.5 w-3.5 text-amber-400" />
              <span>Contests</span>
              <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
            </a>

            <a 
              href="#companies" 
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-zinc-200 hover:text-white rounded-md hover:bg-white/[0.04] transition-colors"
            >
              <Building2 className="h-3.5 w-3.5 text-blue-400" />
              <span>Company Sheets</span>
            </a>

            <a 
              href="#discuss" 
              className="px-3 py-1.5 text-xs font-medium text-zinc-300 hover:text-white rounded-md hover:bg-white/[0.04] transition-colors"
            >
              Discuss
            </a>
          </nav>
        </div>

        {/* Right Action Bar & Developer User Strip */}
        <div className="flex items-center gap-3">
          
          {/* Quick Search trigger */}
          <button 
            onClick={onOpenSearch}
            className="flex items-center gap-2 rounded-lg border border-white/[0.08] bg-[#0c101c] px-2.5 py-1 text-xs text-zinc-400 hover:border-white/[0.18] hover:text-zinc-200 transition-colors"
            title="Search (Cmd+K)"
          >
            <Search className="h-3.5 w-3.5 text-zinc-500" />
            <span className="hidden sm:inline font-sans text-xs">Search problem, pattern...</span>
            <kbd className="rounded bg-white/[0.06] px-1.5 py-0.2 text-[10px] font-mono text-zinc-400 border border-white/[0.08]">⌘K</kbd>
          </button>

          {/* Daily Streak Indicator */}
          <div className="hidden sm:flex items-center gap-1.5 rounded-lg border border-amber-500/25 bg-amber-950/20 px-2.5 py-1 text-xs font-mono text-amber-300">
            <Flame className="h-3.5 w-3.5 fill-amber-400 text-amber-500" />
            <span className="font-bold">14</span>
            <span className="text-[10px] text-amber-400/80 uppercase font-sans">Days</span>
          </div>

          {/* Notification bell */}
          <button 
            onClick={() => alert("No unread contest notifications.")}
            className="relative hidden sm:flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.02] text-zinc-400 hover:text-white hover:border-white/[0.16] transition-colors"
            title="Notifications"
          >
            <Bell className="h-3.5 w-3.5" />
            <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-emerald-400" />
          </button>

          {/* User Profile Pill / Menu */}
          <div className="relative">
            <button
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="flex items-center gap-2 rounded-lg border border-white/[0.1] bg-[#0c101c] hover:border-white/[0.2] p-1 pr-2.5 transition-colors"
            >
              {/* User Avatar Monogram */}
              <div className="h-6 w-6 rounded bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-[10px] font-mono font-bold text-zinc-950">
                JD
              </div>
              <div className="hidden md:flex flex-col text-left">
                <span className="text-[11px] font-semibold text-zinc-200 leading-tight">johndoe.dev</span>
                <span className="text-[9px] font-mono text-emerald-400 leading-tight">1,840 Elo · Div 1</span>
              </div>
              <ChevronDown className="h-3 w-3 text-zinc-400" />
            </button>

            {/* Profile Dropdown Menu */}
            {profileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 rounded-xl border border-white/[0.1] bg-[#0c101c] p-2 shadow-2xl z-50 font-mono text-xs text-zinc-300 backdrop-blur-xl">
                <div className="p-2 border-b border-white/[0.06] mb-1">
                  <div className="font-bold text-white font-sans text-xs">John Doe (@johndoe)</div>
                  <div className="text-[10px] text-zinc-500 font-mono">Rank: #242 Global · Season 2026</div>
                </div>
                <a href="#stats" onClick={() => setProfileDropdownOpen(false)} className="block rounded p-2 hover:bg-white/[0.04] text-zinc-300 hover:text-white">
                  Submission History & Stats
                </a>
                <a href="#contests" onClick={() => setProfileDropdownOpen(false)} className="block rounded p-2 hover:bg-white/[0.04] text-zinc-300 hover:text-white">
                  My Contests & Rating Curve
                </a>
                <a href="#problems" onClick={() => setProfileDropdownOpen(false)} className="block rounded p-2 hover:bg-white/[0.04] text-zinc-300 hover:text-white">
                  Favorite Starred Problems (18)
                </a>
                <div className="border-t border-white/[0.06] mt-1 pt-1">
                  <button onClick={() => setProfileDropdownOpen(false)} className="w-full text-left rounded p-2 hover:bg-rose-500/10 text-rose-400">
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-zinc-300"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-white/[0.08] bg-[#090b14] px-4 py-3 space-y-2 text-xs">
          <a 
            href="#problems" 
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between p-2 rounded-lg text-zinc-200 hover:bg-white/[0.04]"
          >
            <span>Problems Catalog</span>
            <span className="font-mono text-emerald-400">520 Curated</span>
          </a>
          <a 
            href="#dynamic-mode" 
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between p-2 rounded-lg text-zinc-200 hover:bg-white/[0.04]"
          >
            <span>Dynamic Calibration Engine</span>
            <span className="font-mono text-indigo-400">Adaptive</span>
          </a>
          <a 
            href="#contests" 
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between p-2 rounded-lg text-zinc-200 hover:bg-white/[0.04]"
          >
            <span>Weekly Rated Contests</span>
            <span className="font-mono text-amber-400">Div 1/2</span>
          </a>
          <a 
            href="#companies" 
            onClick={() => setMobileMenuOpen(false)}
            className="block p-2 rounded-lg text-zinc-200 hover:bg-white/[0.04]"
          >
            Company Question Sheets
          </a>
        </div>
      )}
    </header>
  );
};
