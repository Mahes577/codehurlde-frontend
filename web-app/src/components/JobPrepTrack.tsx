import React from 'react';
import { Briefcase, CheckCircle2, ChevronRight, FileText, Video, Sparkles, Building, Layers } from 'lucide-react';

export const JobPrepTrack: React.FC = () => {
  const tracks = [
    {
      icon: Layers,
      title: 'Top 75 & Blind 150 Sheets',
      badge: 'Core Patterns',
      description: 'The highest-yield algorithmic patterns distilled into a structured 6-week curriculum with zero filler.',
      stats: '75 Essential Problems',
      color: 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10'
    },
    {
      icon: Building,
      title: 'Company-Specific Question Vaults',
      badge: 'FAANG / Tier-1',
      description: 'Recent interview questions reported by real candidates at Google, Meta, Amazon, Microsoft, and Uber.',
      stats: '120+ Verified Companies',
      color: 'border-indigo-500/30 text-indigo-400 bg-indigo-500/10'
    },
    {
      icon: Video,
      title: 'AI & Peer Mock Interviews',
      badge: 'Real-Time Simulation',
      description: 'Simulate high-pressure 45-minute live technical interviews with an AI interviewer giving feedback on code and communication.',
      stats: 'Instant Feedback & Score',
      color: 'border-violet-500/30 text-violet-400 bg-violet-500/10'
    },
    {
      icon: FileText,
      title: 'Tech Resume & ATS Optimizer',
      badge: 'Screening Pass',
      description: 'Analyze your engineering resume against automated ATS filters and recruiter keywords for Software Engineering roles.',
      stats: '95%+ ATS Pass Rate',
      color: 'border-amber-500/30 text-amber-400 bg-amber-500/10'
    }
  ];

  return (
    <section id="job-prep" className="py-20 bg-[#090d18] border-t border-slate-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-500/30 bg-blue-950/40 px-3 py-1 text-xs font-mono font-medium text-blue-400 mb-3">
            <Briefcase className="h-3.5 w-3.5" />
            <span>INTERVIEW READINESS SYSTEM</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Built to Clear the Tech Interview Bar
          </h2>
          <p className="mt-3 text-base text-slate-300">
            From algorithmic fundamentals to company-specific sprints, mock interviews, and resume optimization.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tracks.map((track, idx) => {
            const Icon = track.icon;
            return (
              <div 
                key={idx}
                className="group rounded-2xl border border-slate-800 bg-[#0c1220]/80 p-6 backdrop-blur-xl transition-all duration-300 hover:border-slate-700 hover:bg-[#101728] hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-2.5 rounded-xl border ${track.color}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-[10px] font-mono uppercase font-semibold text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                      {track.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
                    {track.title}
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {track.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-xs font-mono font-medium text-slate-300">
                    {track.stats}
                  </span>
                  <ChevronRight className="h-4 w-4 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
