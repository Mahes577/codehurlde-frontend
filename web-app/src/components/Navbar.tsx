import React, { useState } from 'react';
import { Terminal, Search, ChevronRight, Menu, X, Code2, Trophy, LineChart, Building2, MessageSquare } from 'lucide-react';

interface NavbarProps {
  onOpenSearch?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSearch }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.08] bg-[#090a0f]/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand */}
        <div className="flex items-center gap-7">
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-white/[0.06] border border-white/[0.12] group-hover:border-white/25 transition-colors">
              <Code2 className="h-4 w-4 text-emerald-400" />
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-[15px] tracking-tight text-white font-sans">
                CodeHurdle
              </span>
              <span className="rounded bg-white/[0.06] px-1.5 py-0.2 text-[10px] font-mono text-zinc-400 border border-white/[0.06]">
                platform
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            <a 
              href="#problems" 
              className="px-3 py-1.5 text-xs font-medium text-zinc-300 hover:text-white rounded-md hover:bg-white/[0.04] transition-colors"
            >
              Problems
            </a>

            <a 
              href="#dynamic-mode" 
              className="px-3 py-1.5 text-xs font-medium text-zinc-300 hover:text-white rounded-md hover:bg-white/[0.04] transition-colors flex items-center gap-1.5"
            >
              <span>Dynamic Calibration</span>
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </a>

            <a 
              href="#contests" 
              className="px-3 py-1.5 text-xs font-medium text-zinc-300 hover:text-white rounded-md hover:bg-white/[0.04] transition-colors"
            >
              Contests
            </a>

            <a 
              href="#companies" 
              className="px-3 py-1.5 text-xs font-medium text-zinc-300 hover:text-white rounded-md hover:bg-white/[0.04] transition-colors"
            >
              Companies
            </a>

            <a 
              href="#discuss" 
              className="px-3 py-1.5 text-xs font-medium text-zinc-300 hover:text-white rounded-md hover:bg-white/[0.04] transition-colors"
            >
              Editorial & Discuss
            </a>
          </nav>
        </div>

        {/* Right Action Bar */}
        <div className="flex items-center gap-2.5">
          {/* Search Trigger */}
          <button 
            onClick={onOpenSearch}
            className="flex items-center gap-2 rounded-md border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 text-xs text-zinc-400 hover:border-white/[0.16] hover:text-zinc-200 transition-colors"
          >
            <Search className="h-3.5 w-3.5 text-zinc-500" />
            <span className="hidden sm:inline">Search problem or tag...</span>
            <kbd className="rounded bg-white/[0.06] px-1.5 py-0.2 text-[10px] font-mono text-zinc-400 border border-white/[0.08]">⌘K</kbd>
          </button>

          <a 
            href="#login" 
            className="text-xs font-medium text-zinc-300 hover:text-white px-2.5 py-1 transition-colors"
          >
            Sign in
          </a>

          <a 
            href="#register" 
            className="inline-flex items-center gap-1.5 rounded-md bg-white hover:bg-zinc-100 px-3.5 py-1.5 text-xs font-medium text-zinc-950 transition-colors shadow-sm"
          >
            <span>Start Practice</span>
            <ChevronRight className="h-3.5 w-3.5 text-zinc-700" />
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex h-8 w-8 items-center justify-center rounded-md border border-white/[0.08] bg-white/[0.03] text-zinc-300"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-white/[0.08] bg-[#0c0d13] px-4 py-3 space-y-1">
          <a 
            href="#problems" 
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-xs font-medium text-zinc-200 hover:bg-white/[0.04] rounded-md"
          >
            Problems (500+ Curated)
          </a>
          <a 
            href="#dynamic-mode" 
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-xs font-medium text-zinc-200 hover:bg-white/[0.04] rounded-md"
          >
            Dynamic Calibration Engine
          </a>
          <a 
            href="#contests" 
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-xs font-medium text-zinc-200 hover:bg-white/[0.04] rounded-md"
          >
            Weekly Rated Contests
          </a>
          <a 
            href="#companies" 
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-xs font-medium text-zinc-200 hover:bg-white/[0.04] rounded-md"
          >
            Company Question Vaults
          </a>
          <a 
            href="#discuss" 
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-xs font-medium text-zinc-200 hover:bg-white/[0.04] rounded-md"
          >
            Editorial & Discuss
          </a>
        </div>
      )}
    </header>
  );
};
