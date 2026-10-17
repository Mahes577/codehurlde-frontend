import React from 'react';

export const StatsBar: React.FC = () => {
  const stats = [
    {
      value: '520',
      label: 'Curated Problems',
      detail: '180 Easy · 240 Medium · 100 Hard'
    },
    {
      value: '16',
      label: 'Core Algorithm Tracks',
      detail: 'From Two Pointers to 2D DP & Graphs'
    },
    {
      value: '< 40ms',
      label: 'Evaluation Latency',
      detail: 'Direct in-memory compiler execution'
    },
    {
      value: '99.4%',
      label: 'Test Suite Coverage',
      detail: 'Extensive hidden edge-case test suites'
    }
  ];

  return (
    <section className="border-b border-white/[0.08] bg-[#090a0f] py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 divide-y lg:divide-y-0 lg:divide-x divide-white/[0.06]">
          {stats.map((stat, idx) => (
            <div key={idx} className={idx > 0 ? 'pt-4 lg:pt-0 lg:pl-6' : ''}>
              <div className="text-2xl font-bold font-mono tracking-tight text-white">
                {stat.value}
              </div>
              <div className="text-xs font-medium text-zinc-300 mt-0.5">
                {stat.label}
              </div>
              <div className="text-[11px] font-mono text-zinc-500 mt-1">
                {stat.detail}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
