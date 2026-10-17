import React from 'react';

const COMPANIES = [
  { name: 'Google', count: 142, recent: 'Graph & DP' },
  { name: 'Meta', count: 185, recent: 'Sliding Window & Trees' },
  { name: 'Amazon', count: 210, recent: 'Arrays & Priority Queues' },
  { name: 'Microsoft', count: 130, recent: 'Linked Lists & Design' },
  { name: 'Apple', count: 95, recent: 'Bit Manipulation & Math' },
  { name: 'Netflix', count: 84, recent: 'Distributed & Concurrency' },
  { name: 'Uber', count: 112, recent: 'Shortest Path & Heaps' },
  { name: 'Stripe', count: 68, recent: 'State Machines & Parsing' },
];

export const CompanyTrustBar: React.FC = () => {
  return (
    <div id="companies" className="border-b border-white/[0.08] bg-[#08090d] py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          <div className="shrink-0">
            <div className="text-xs font-mono uppercase tracking-wider text-zinc-500 font-medium">
              Curated Company Question Vaults
            </div>
            <div className="text-xs text-zinc-400">
              Problems reported in actual technical interviews
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {COMPANIES.map((company) => (
              <a 
                key={company.name} 
                href="#problems"
                className="flex items-center gap-2 rounded border border-white/[0.08] bg-white/[0.02] px-2.5 py-1 hover:border-white/[0.18] hover:bg-white/[0.05] transition-colors group cursor-pointer"
              >
                <span className="text-xs font-medium text-zinc-200 group-hover:text-white font-sans">
                  {company.name}
                </span>
                <span className="text-[11px] font-mono text-zinc-500 group-hover:text-zinc-400">
                  {company.count}
                </span>
              </a>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};
