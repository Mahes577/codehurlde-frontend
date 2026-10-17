import React from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { GithubIcon } from './Icons';

export const CtaSection: React.FC = () => {
  return (
    <section className="py-20 bg-[#090a0f] border-b border-white/[0.08]">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        
        <div className="rounded-xl border border-white/[0.1] bg-[#0c0e16] p-8 sm:p-12">
          <div className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-medium mb-3">
            Start Practicing
          </div>

          <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
            Ready to solve your next coding hurdle?
          </h2>

          <p className="mt-3 text-xs sm:text-sm text-zinc-400 max-w-lg mx-auto leading-relaxed">
            Join engineers practicing Data Structures, Algorithms, and Competitive Programming with calibrated problem sequencing.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="#register"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-md bg-white hover:bg-zinc-200 px-5 py-2.5 text-xs font-medium text-zinc-950 transition-colors shadow-sm"
            >
              <span>Create Free Account</span>
              <ArrowRight className="h-3.5 w-3.5 text-zinc-700" />
            </a>

            <button
              onClick={() => alert('GitHub OAuth sign-in')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-md border border-white/[0.12] bg-white/[0.04] hover:bg-white/[0.08] px-5 py-2.5 text-xs font-medium text-zinc-200 transition-colors"
            >
              <GithubIcon className="h-4 w-4" />
              <span>Continue with GitHub</span>
            </button>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[11px] font-mono text-zinc-500">
            <div className="flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-emerald-400" />
              <span>100% Free Core Practice</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-emerald-400" />
              <span>In-Browser Compiler</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-emerald-400" />
              <span>Zero Configuration</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
