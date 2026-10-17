import React from 'react';
import { Terminal } from 'lucide-react';
import { GithubIcon, TwitterIcon, DiscordIcon } from './Icons';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-800 bg-[#060910] text-slate-400">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          
          {/* Brand Info (col-span-2) */}
          <div className="col-span-2 space-y-4">
            <a href="#" className="flex items-center gap-2 group">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/30 p-1">
                <Terminal className="h-4 w-4 text-emerald-400" />
              </div>
              <span className="font-bold text-lg text-white">Code<span className="text-emerald-400">Hurdle</span></span>
            </a>
            
            <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed">
              Practise DSA and competitive programming, get matched with the right problems through Dynamic Mode, and grow with a global community of engineers.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="h-8 w-8 rounded-lg border border-slate-800 bg-slate-900 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-700 transition-colors">
                <GithubIcon className="h-4 w-4" />
              </a>
              <a href="#" className="h-8 w-8 rounded-lg border border-slate-800 bg-slate-900 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-700 transition-colors">
                <TwitterIcon className="h-4 w-4" />
              </a>
              <a href="#" className="h-8 w-8 rounded-lg border border-slate-800 bg-slate-900 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-700 transition-colors">
                <DiscordIcon className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Practice Links */}
          <div>
            <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-slate-200">
              Practice
            </h3>
            <ul className="mt-4 space-y-2.5 text-xs sm:text-sm">
              <li><a href="#dsa" className="hover:text-emerald-400 transition-colors">DSA Hub</a></li>
              <li><a href="#dynamic-mode" className="hover:text-emerald-400 transition-colors">Dynamic Mode</a></li>
              <li><a href="#roadmap" className="hover:text-emerald-400 transition-colors">Roadmap</a></li>
              <li><a href="#cp-arena" className="hover:text-emerald-400 transition-colors">CP Arena</a></li>
              <li><a href="#leaderboard" className="hover:text-emerald-400 transition-colors">Leaderboard</a></li>
            </ul>
          </div>

          {/* Community Links */}
          <div>
            <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-slate-200">
              Community
            </h3>
            <ul className="mt-4 space-y-2.5 text-xs sm:text-sm">
              <li><a href="#community" className="hover:text-indigo-400 transition-colors">Explore Servers</a></li>
              <li><a href="#discussions" className="hover:text-indigo-400 transition-colors">Discussions</a></li>
              <li><a href="#events" className="hover:text-indigo-400 transition-colors">Weekly Events</a></li>
              <li><a href="#practice-rooms" className="hover:text-indigo-400 transition-colors">Practice Voice Rooms</a></li>
              <li><a href="#hall-of-fame" className="hover:text-indigo-400 transition-colors">Hall of Fame</a></li>
            </ul>
          </div>

          {/* Prepare Links */}
          <div>
            <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-slate-200">
              Prepare
            </h3>
            <ul className="mt-4 space-y-2.5 text-xs sm:text-sm">
              <li><a href="#job-prep" className="hover:text-amber-400 transition-colors">Interview Prep</a></li>
              <li><a href="#mock" className="hover:text-amber-400 transition-colors">Mock Interviews</a></li>
              <li><a href="#resume" className="hover:text-amber-400 transition-colors">Resume & ATS</a></li>
              <li><a href="#companies" className="hover:text-amber-400 transition-colors">Company Sheets</a></li>
              <li><a href="#contests" className="hover:text-amber-400 transition-colors">Contests</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright and legal */}
        <div className="mt-12 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div>
            © 2026 CodeHurdle. All rights reserved.
          </div>
          <div className="flex flex-wrap gap-6">
            <a href="#terms" className="hover:text-slate-300 transition-colors">Terms</a>
            <a href="#privacy" className="hover:text-slate-300 transition-colors">Privacy</a>
            <a href="#guidelines" className="hover:text-slate-300 transition-colors">Guidelines</a>
            <a href="#api" className="hover:text-slate-300 transition-colors">API Docs</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
