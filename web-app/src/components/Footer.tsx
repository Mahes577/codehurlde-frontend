import React from 'react';
import { Code2 } from 'lucide-react';
import { GithubIcon, TwitterIcon, DiscordIcon } from './Icons';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#000000] text-zinc-400 text-xs">
      <div className="mx-auto max-w-[1720px] px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          
          {/* Brand Info */}
          <div className="col-span-2 space-y-3">
            <a href="#" className="flex items-center gap-2 group">
              <div className="flex h-6 w-6 items-center justify-center rounded bg-white/[0.06] border border-white/[0.1]">
                <Code2 className="h-3.5 w-3.5 text-zinc-400" />
              </div>
              <span className="font-semibold text-sm text-white">CodeHurdle</span>
            </a>
            
            <p className="text-xs text-zinc-400 max-w-sm leading-relaxed">
              Curated Data Structures & Algorithms, adaptive skill calibration, and competitive programming contests for engineers.
            </p>

            <div className="flex items-center gap-2 pt-1">
              <a href="#" className="h-7 w-7 rounded border border-white/[0.08] bg-white/[0.02] flex items-center justify-center text-zinc-400 hover:text-white hover:border-white/[0.16] transition-colors" title="GitHub">
                <GithubIcon className="h-3.5 w-3.5" />
              </a>
              <a href="#" className="h-7 w-7 rounded border border-white/[0.08] bg-white/[0.02] flex items-center justify-center text-zinc-400 hover:text-white hover:border-white/[0.16] transition-colors" title="Twitter / X">
                <TwitterIcon className="h-3.5 w-3.5" />
              </a>
              <a href="#" className="h-7 w-7 rounded border border-white/[0.08] bg-white/[0.02] flex items-center justify-center text-zinc-400 hover:text-white hover:border-white/[0.16] transition-colors" title="Discord">
                <DiscordIcon className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          {/* Practice Links */}
          <div>
            <h3 className="font-mono text-[11px] font-semibold uppercase tracking-wider text-zinc-300">
              Practice
            </h3>
            <ul className="mt-3 space-y-2 text-zinc-400">
              <li><a href="#problems" className="hover:text-white transition-colors">Problems Catalog</a></li>
              <li><a href="#dynamic-mode" className="hover:text-white transition-colors">Dynamic Calibration</a></li>
              <li><a href="#tracks" className="hover:text-white transition-colors">Pattern Roadmaps</a></li>
              <li><a href="#contests" className="hover:text-white transition-colors">Contest Archive</a></li>
            </ul>
          </div>

          {/* Editorial & Community */}
          <div>
            <h3 className="font-mono text-[11px] font-semibold uppercase tracking-wider text-zinc-300">
              Discussions
            </h3>
            <ul className="mt-3 space-y-2 text-zinc-400">
              <li><a href="#discuss" className="hover:text-white transition-colors">Solution Walkthroughs</a></li>
              <li><a href="#discuss" className="hover:text-white transition-colors">Interview Debriefs</a></li>
              <li><a href="#discuss" className="hover:text-white transition-colors">Algorithm Visualizations</a></li>
              <li><a href="#contests" className="hover:text-white transition-colors">Global Standings</a></li>
            </ul>
          </div>

          {/* Companies & System */}
          <div>
            <h3 className="font-mono text-[11px] font-semibold uppercase tracking-wider text-zinc-300">
              Company Sheets
            </h3>
            <ul className="mt-3 space-y-2 text-zinc-400">
              <li><a href="#companies" className="hover:text-white transition-colors">Google Top 50</a></li>
              <li><a href="#companies" className="hover:text-white transition-colors">Meta 75</a></li>
              <li><a href="#companies" className="hover:text-white transition-colors">Amazon Frequency</a></li>
              <li><a href="#companies" className="hover:text-white transition-colors">Uber & Bloomberg</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="mt-10 pt-4 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-mono text-zinc-500">
          <div>
            © 2026 CodeHurdle. All rights reserved.
          </div>
          <div className="flex gap-4">
            <a href="#terms" className="hover:text-zinc-400">Terms</a>
            <a href="#privacy" className="hover:text-zinc-400">Privacy</a>
            <a href="#guidelines" className="hover:text-zinc-400">Guidelines</a>
            <a href="#api" className="hover:text-zinc-400">API</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
