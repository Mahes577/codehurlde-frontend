import React from 'react';
import { ArrowRight, Terminal, CheckCircle2 } from 'lucide-react';
import { GithubIcon } from './Icons';

export const CtaSection: React.FC = () => {
  return (
    <section className="relative py-20 bg-[#080c14] overflow-hidden border-t border-slate-800">
      
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-96 w-96 rounded-full bg-emerald-500/10 blur-[150px]" />
        <div className="h-96 w-96 rounded-full bg-indigo-500/10 blur-[150px] -translate-x-20" />
      </div>

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-slate-900 via-[#0c1424] to-[#0a101d] p-8 sm:p-14 text-center shadow-2xl shadow-emerald-950/20">
          
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/50 px-3.5 py-1 text-xs font-mono font-medium text-emerald-400 mb-6">
            <Terminal className="h-3.5 w-3.5" />
            <span>GET STARTED IN 30 SECONDS</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Stop Stalling. Start Clearing Your <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent">Coding Hurdles Today.</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Join 45,000+ software engineers mastering algorithms with AI adaptive problem matching. Free forever for core DSA practice.
          </p>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#register"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 px-7 py-4 text-sm font-bold text-slate-950 shadow-lg shadow-emerald-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <span>Create Free Account</span>
              <ArrowRight className="h-4 w-4" />
            </a>

            <button
              onClick={() => alert('GitHub OAuth login simulated!')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800/80 hover:bg-slate-700 hover:border-slate-600 px-6 py-4 text-sm font-medium text-white transition-all"
            >
              <GithubIcon className="h-4 w-4" />
              <span>Continue with GitHub</span>
            </button>
          </div>

          {/* Trust Guarantees */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-mono text-slate-400">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
              <span>Free Forever Tier</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
              <span>No Credit Card</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
              <span>Full In-Browser IDE</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
