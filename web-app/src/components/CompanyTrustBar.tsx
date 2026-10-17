import React from 'react';

const COMPANIES = [
  { name: 'Google', problems: '142 problems', tag: 'Top Tier' },
  { name: 'Meta', problems: '185 problems', tag: 'Fast-Track' },
  { name: 'Amazon', problems: '210 problems', tag: 'High Frequency' },
  { name: 'Microsoft', problems: '130 problems', tag: 'Curated' },
  { name: 'Apple', problems: '95 problems', tag: 'Core Systems' },
  { name: 'Netflix', problems: '84 problems', tag: 'L6+ Track' },
  { name: 'Uber', problems: '112 problems', tag: 'Algorithms' },
];

export const CompanyTrustBar: React.FC = () => {
  return (
    <div id="companies" className="border-y border-slate-800/80 bg-[#090d18]/60 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="text-center md:text-left">
            <p className="text-xs font-mono uppercase tracking-widest text-slate-400 font-semibold">
              Curated Company Question Vaults
            </p>
            <p className="text-sm text-slate-300 font-medium">
              Targeted DSA questions asked in recent technical rounds
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            {COMPANIES.map((company) => (
              <div 
                key={company.name} 
                className="group flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900/60 px-3 py-1.5 transition-all duration-200 hover:border-emerald-500/40 hover:bg-slate-800/80 cursor-pointer"
              >
                <div className="h-2 w-2 rounded-full bg-emerald-400/80 group-hover:scale-125 transition-transform" />
                <span className="text-sm font-semibold text-slate-200 group-hover:text-white font-sans">{company.name}</span>
                <span className="text-[11px] font-mono text-slate-500 group-hover:text-emerald-400/80 transition-colors">{company.problems}</span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};
