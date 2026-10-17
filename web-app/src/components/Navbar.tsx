import React, { useState } from 'react';
import { Terminal, Flame, Search, ChevronRight, Menu, X, Sparkles, Trophy, BookOpen, Users, Building2, Cpu } from 'lucide-react';

interface NavbarProps {
  onOpenSearch?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSearch }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-[#080c14]/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo */}
        <div className="flex items-center gap-8">
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-tr from-emerald-500 to-indigo-600 p-0.5 shadow-md shadow-emerald-500/20 group-hover:shadow-emerald-500/40 transition-shadow">
              <div className="flex h-full w-full items-center justify-center rounded-[7px] bg-[#0c1220]">
                <Terminal className="h-5 w-5 text-emerald-400 group-hover:scale-105 transition-transform" />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-lg tracking-tight text-white">Code<span className="text-emerald-400">Hurdle</span></span>
                <span className="rounded bg-emerald-950/80 px-1.5 py-0.5 text-[10px] font-mono font-semibold text-emerald-400 border border-emerald-500/30">v2.0</span>
              </div>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <a 
              href="#dsa" 
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-md transition-colors"
            >
              <BookOpen className="h-4 w-4 text-emerald-400" />
              DSA Hub
            </a>

            <a 
              href="#dynamic-mode" 
              className="group flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-md transition-colors"
            >
              <Sparkles className="h-4 w-4 text-violet-400 group-hover:animate-pulse" />
              <span>Dynamic Mode</span>
              <span className="rounded-full bg-violet-500/20 px-1.5 py-0.2 text-[10px] font-mono text-violet-300 border border-violet-500/30">AI</span>
            </a>

            <a 
              href="#cp-arena" 
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-md transition-colors"
            >
              <Trophy className="h-4 w-4 text-amber-400" />
              CP Arena
            </a>

            <a 
              href="#contests" 
              className="relative flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-md transition-colors"
            >
              <span>Contests</span>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
              </span>
            </a>

            <a 
              href="#companies" 
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-md transition-colors"
            >
              <Building2 className="h-4 w-4 text-blue-400" />
              Companies
            </a>

            <a 
              href="#community" 
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-md transition-colors"
            >
              <Users className="h-4 w-4 text-indigo-400" />
              Community
            </a>
          </nav>
        </div>

        {/* Right Action Bar */}
        <div className="flex items-center gap-3">
          {/* Search Trigger */}
          <button 
            onClick={onOpenSearch}
            className="hidden sm:flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900/80 px-2.5 py-1.5 text-xs text-slate-400 hover:border-slate-700 hover:text-slate-200 transition-colors"
          >
            <Search className="h-3.5 w-3.5 text-slate-400" />
            <span>Search problems...</span>
            <kbd className="rounded bg-slate-800 px-1.5 py-0.5 text-[10px] font-mono text-slate-400 border border-slate-700">⌘K</kbd>
          </button>

          {/* Gamification Streak Demo */}
          <div className="hidden lg:flex items-center gap-1.5 rounded-full border border-amber-500/20 bg-amber-500/10 px-2.5 py-1 text-xs font-medium text-amber-400">
            <Flame className="h-3.5 w-3.5 fill-amber-400 text-amber-500 animate-bounce" />
            <span className="font-mono font-semibold">14-Day Streak</span>
          </div>

          <a 
            href="#login" 
            className="text-sm font-medium text-slate-300 hover:text-white px-2 py-1.5 transition-colors"
          >
            Sign in
          </a>

          <a 
            href="#register" 
            className="group relative inline-flex items-center gap-1.5 overflow-hidden rounded-lg bg-gradient-to-r from-emerald-500 to-indigo-600 px-4 py-2 text-xs sm:text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition-all duration-200 hover:shadow-emerald-500/35 hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Start Free</span>
            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800 bg-slate-900 text-slate-300"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-[#0c1220] px-4 pt-2 pb-6 space-y-3">
          <div className="flex flex-col space-y-1">
            <a 
              href="#dsa" 
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2 text-sm font-medium text-slate-200 hover:bg-slate-800/60 rounded-md"
            >
              <span className="flex items-center gap-2"><BookOpen className="h-4 w-4 text-emerald-400" /> DSA Hub</span>
              <span className="text-xs font-mono text-slate-400">500+ problems</span>
            </a>
            <a 
              href="#dynamic-mode" 
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2 text-sm font-medium text-slate-200 hover:bg-slate-800/60 rounded-md"
            >
              <span className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-violet-400" /> Dynamic Mode</span>
              <span className="rounded bg-violet-900/60 px-1.5 py-0.5 text-[10px] font-mono text-violet-300">AI Adaptive</span>
            </a>
            <a 
              href="#cp-arena" 
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2 text-sm font-medium text-slate-200 hover:bg-slate-800/60 rounded-md"
            >
              <span className="flex items-center gap-2"><Trophy className="h-4 w-4 text-amber-400" /> CP Arena</span>
              <span className="text-xs font-mono text-slate-400">Contests</span>
            </a>
            <a 
              href="#companies" 
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-200 hover:bg-slate-800/60 rounded-md"
            >
              <Building2 className="h-4 w-4 text-blue-400" /> Top Companies
            </a>
            <a 
              href="#community" 
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-200 hover:bg-slate-800/60 rounded-md"
            >
              <Users className="h-4 w-4 text-indigo-400" /> Community & Study Rooms
            </a>
          </div>

          <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
            <span className="text-xs text-slate-400 font-mono">Streak: 14 days</span>
            <a 
              href="#register" 
              className="block text-center rounded-lg bg-emerald-500 px-4 py-2 text-xs font-semibold text-slate-950"
            >
              Create Free Account
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
