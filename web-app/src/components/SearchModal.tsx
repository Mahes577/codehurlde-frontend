import React, { useState, useEffect } from 'react';
import { Search, X, ArrowRight, BookOpen, Sparkles, Trophy, Building2 } from 'lucide-react';

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
        if (isOpen) onClose();
        else onClose(); // will be handled by parent
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
    { title: 'Two Sum', subtitle: 'Arrays & Hashing · Easy', href: '#dsa', icon: BookOpen, tag: 'Problem #1' },
    { title: 'Number of Islands', subtitle: 'Graphs / BFS · Medium', href: '#dsa', icon: BookOpen, tag: 'Problem #200' },
    { title: 'Dynamic Mode AI', subtitle: 'Launch adaptive sequencing session', href: '#dynamic-mode', icon: Sparkles, tag: 'AI' },
    { title: 'Weekly Contest 42', subtitle: 'Timed competitive round in 2h 40m', href: '#cp-arena', icon: Trophy, tag: 'Rated' },
    { title: 'Google Top 50', subtitle: 'Most frequent Google interview questions', href: '#companies', icon: Building2, tag: 'Vault' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-xl rounded-2xl border border-slate-700 bg-[#0c1220] shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-800">
          <Search className="h-5 w-5 text-slate-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search problems, topics, contests, or companies..."
            className="w-full bg-transparent text-sm text-slate-100 placeholder-slate-500 focus:outline-none font-mono"
          />
          <button 
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Quick Suggestions */}
        <div className="p-3">
          <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 px-3 py-1 font-semibold">
            Quick Navigation
          </div>
          <div className="mt-1 space-y-1">
            {quickLinks.map((item, idx) => {
              const Icon = item.icon;
              return (
                <a
                  key={idx}
                  href={item.href}
                  onClick={onClose}
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-800/80 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-emerald-400 group-hover:border-emerald-500/40">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-slate-200 group-hover:text-emerald-300">
                        {item.title}
                      </div>
                      <div className="text-[11px] text-slate-400 font-mono">
                        {item.subtitle}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                      {item.tag}
                    </span>
                    <ArrowRight className="h-3.5 w-3.5 text-slate-500 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                  </div>
                </a>
              );
            })}
          </div>
        </div>

        {/* Footer info */}
        <div className="px-4 py-2.5 bg-[#080d18] border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-500">
          <span>Navigate with <kbd className="text-slate-400">↑</kbd> <kbd className="text-slate-400">↓</kbd></span>
          <span>Close with <kbd className="text-slate-400">ESC</kbd></span>
        </div>

      </div>
    </div>
  );
};
