import React, { useState } from 'react';
import { Terminal, Search, ChevronRight, Menu, X, Code2, Trophy, Flame, Sparkles, Building2, BookOpen } from 'lucide-react';

interface NavbarProps {
  onOpenSearch?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSearch }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.08] bg-[#07090e]/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand */}
        <div className="flex items-center gap-8">
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-0.5 shadow-md shadow-emerald-500/25 group-hover:shadow-emerald-500/45 transition-shadow">
              <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-[#0c1220]">
                <Code2 className="h-4.5 w-4.5 text-emerald-400 group-hover:scale-105 transition-transform" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg tracking-tight text-white font-sans">
                Code<span className="text-emerald-400">Hurdle</span>
              </span>
              <span className="rounded bg-emerald-500/10 px-1.5 py-0.2 text-[10px] font-mono font-bold text-emerald-400 border border-emerald-500/25">
                PRO
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            <a 
              href="#problems" 
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-zinc-300 hover:text-white rounded-lg hover:bg-white/[0.05] transition-colors"
            >
              <BookOpen className="h-3.5 w-3.5 text-emerald-400" />
              <span>Problems</span>
            </a>

            <a 
              href="#dynamic-mode" 
              className="group flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-zinc-300 hover:text-white rounded-lg hover:bg-white/[0.05] transition-colors"
            >
              <Sparkles className="h-3.5 w-3.5 text-emerald-400 group-hover:animate-pulse" />
              <span>Dynamic Calibration</span>
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </a>

            <a 
              href="#contests" 
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-zinc-300 hover:text-white rounded-lg hover:bg-white/[0.05] transition-colors"
            >
              <Trophy className="h-3.5 w-3.5 text-amber-400" />
              <span>Contests</span>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
              </span>
            </a>

            <a 
              href="#companies" 
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-zinc-300 hover:text-white rounded-lg hover:bg-white/[0.05] transition-colors"
            >
              <Building2 className="h-3.5 w-3.5 text-blue-400" />
              <span>Companies</span>
            </a>

            <a 
              href="#discuss" 
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-zinc-300 hover:text-white rounded-lg hover:bg-white/[0.05] transition-colors"
            >
              <span>Editorials</span>
            </a>
          </nav>
        </div>

        {/* Right Action Bar */}
        <div className="flex items-center gap-3">
          {/* Search Trigger */}
          <button 
            onClick={onOpenSearch}
            className="flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-xs text-zinc-400 hover:border-white/[0.18] hover:text-zinc-200 transition-colors"
          >
            <Search className="h-3.5 w-3.5 text-zinc-400" />
            <span className="hidden sm:inline">Search problem, tag...</span>
            <kbd className="rounded bg-white/[0.06] px-1.5 py-0.2 text-[10px] font-mono text-zinc-300 border border-white/[0.1]">⌘K</kbd>
          </button>

          {/* Gamified Streak Pill */}
          <div className="hidden sm:flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-1 text-xs font-mono font-bold text-amber-400">
            <Flame className="h-3.5 w-3.5 fill-amber-400 text-amber-500" />
            <span>14 Days</span>
          </div>

          <a 
            href="#login" 
            className="text-xs font-semibold text-zinc-300 hover:text-white px-2 py-1 transition-colors"
          >
            Sign in
          </a>

          <a 
            href="#register" 
            className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 px-4 py-2 text-xs font-bold text-zinc-950 shadow-md shadow-emerald-500/25 transition-all hover:scale-[1.02]"
          >
            <span>Start Practice</span>
            <ChevronRight className="h-3.5 w-3.5 text-zinc-950" />
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.1] bg-white/[0.04] text-zinc-300"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-white/[0.08] bg-[#0c1220] px-4 pt-3 pb-6 space-y-2">
          <a 
            href="#problems" 
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between px-3 py-2 text-xs font-semibold text-zinc-200 hover:bg-white/[0.05] rounded-lg"
          >
            <span>Problems (520 Curated)</span>
            <span className="text-[10px] font-mono text-emerald-400">Easy / Med / Hard</span>
          </a>
          <a 
            href="#dynamic-mode" 
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between px-3 py-2 text-xs font-semibold text-zinc-200 hover:bg-white/[0.05] rounded-lg"
          >
            <span>Dynamic Calibration Engine</span>
            <span className="rounded bg-emerald-500/20 px-1.5 py-0.2 text-[9px] font-mono text-emerald-300">Active</span>
          </a>
          <a 
            href="#contests" 
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-xs font-semibold text-zinc-200 hover:bg-white/[0.05] rounded-lg"
          >
            Weekly Rated Contests
          </a>
          <a 
            href="#companies" 
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-xs font-semibold text-zinc-200 hover:bg-white/[0.05] rounded-lg"
          >
            Company Question Vaults
          </a>
          <a 
            href="#discuss" 
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-xs font-semibold text-zinc-200 hover:bg-white/[0.05] rounded-lg"
          >
            Editorial Walkthroughs
          </a>
        </div>
      )}
    </header>
  );
};
