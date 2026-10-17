import React from 'react';
import { Code, Users, Award, Zap } from 'lucide-react';

export const StatsBar: React.FC = () => {
  const stats = [
    {
      icon: Code,
      value: '500+',
      label: 'Curated Problems',
      subtext: 'Across 16 algorithmic patterns',
      color: 'text-emerald-400',
      border: 'border-emerald-500/20'
    },
    {
      icon: Users,
      value: '45,000+',
      label: 'Active Coders',
      subtext: 'Practicing & competing daily',
      color: 'text-indigo-400',
      border: 'border-indigo-500/20'
    },
    {
      icon: Award,
      value: '98.2%',
      label: 'Offer Success Rate',
      subtext: 'Reported by Dynamic Mode users',
      color: 'text-amber-400',
      border: 'border-amber-500/20'
    },
    {
      icon: Zap,
      value: '< 50ms',
      label: 'Execution Latency',
      subtext: 'Instant Python, C++, JS test runs',
      color: 'text-cyan-400',
      border: 'border-cyan-500/20'
    }
  ];

  return (
    <section className="py-12 bg-[#080c14]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div 
                key={idx}
                className={`relative rounded-xl border ${stat.border} bg-[#0c1220]/60 p-5 backdrop-blur-sm transition-all hover:bg-[#10172a] hover:scale-[1.01]`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg bg-slate-900 border border-slate-800 ${stat.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-extrabold font-mono text-white tracking-tight">
                      {stat.value}
                    </div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                      {stat.label}
                    </div>
                  </div>
                </div>
                <div className="mt-2 text-xs text-slate-400">
                  {stat.subtext}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
