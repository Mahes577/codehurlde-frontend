import React, { useState, useEffect } from 'react';
import { Search, X, ArrowRight, Code2, LineChart, Trophy, Building2 } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const quickLinks = [
    { title: '1. Two Sum', subtitle: 'Arrays & Hashing · Easy', href: '#problems', icon: Code2, tag: 'Problem #1' },
    { title: '200. Number of Islands', subtitle: 'Graph Traversal · Medium', href: '#problems', icon: Code2, tag: 'Problem #200' },
    { title: 'Dynamic Calibration Engine', subtitle: 'Adaptive problem sequencing', href: '#dynamic-mode', icon: LineChart, tag: 'Calibration' },
    { title: 'Weekly Contest 42', subtitle: 'Rated competition in 2h 36m', href: '#contests', icon: Trophy, tag: 'Contest' },
    { title: 'Google Top 50 Vault', subtitle: 'Most frequent questions reported by candidates', href: '#companies', icon: Building2, tag: 'Sheet' },
  ];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/75 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-xl rounded-lg border border-white/[0.12] bg-[#0c0e16] shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-white/[0.08]">
          <Search className="h-4 w-4 text-zinc-500 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search problems, patterns, companies, or contests..."
            className="w-full bg-transparent text-xs sm:text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none font-mono"
          />
          <button 
            onClick={onClose}
            className="p-1 rounded text-zinc-500 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Quick Suggestions */}
        <div className="p-2">
          <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 px-3 py-1 font-medium">
            Jump To
          </div>
          <div className="mt-1 space-y-0.5">
            {quickLinks.map((item, idx) => {
              const Icon = item.icon;
              return (
                <a
                  key={idx}
                  href={item.href}
                  onClick={onClose}
                  className="flex items-center justify-between p-2 rounded hover:bg-white/[0.04] transition-colors group"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded bg-white/[0.03] border border-white/[0.06] text-zinc-300">
                      <Icon className="h-3.5 w-3.5" />
                    </div>
                    <div>
                      <div className="text-xs font-medium text-zinc-200 group-hover:text-white">
                        {item.title}
                      </div>
                      <div className="text-[11px] text-zinc-500 font-mono">
                        {item.subtitle}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-zinc-500 bg-white/[0.02] px-1.5 py-0.2 rounded border border-white/[0.06]">
                      {item.tag}
                    </span>
                    <ArrowRight className="h-3 w-3 text-zinc-600 group-hover:text-zinc-300 transition-colors" />
                  </div>
                </a>
              );
            })}
          </div>
        </div>

        {/* Footer info */}
        <div className="px-4 py-2 bg-[#090b12] border-t border-white/[0.06] flex items-center justify-between text-[10px] font-mono text-zinc-500">
          <span>Navigate with <kbd className="text-zinc-400">↑</kbd> <kbd className="text-zinc-400">↓</kbd></span>
          <span>Close with <kbd className="text-zinc-400">ESC</kbd></span>
        </div>

      </div>
    </div>
  );
};
