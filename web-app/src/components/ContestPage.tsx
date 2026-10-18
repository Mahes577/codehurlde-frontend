import React, { useState } from 'react';
import { ArrowRight, CalendarDays, ChevronRight, Play, Trophy } from 'lucide-react';

type StatusFilter = 'All' | 'Live' | 'Upcoming' | 'Completed';
type TypeFilter = 'All types' | 'DSA' | 'CP';

interface ContestPageProps {
  onOpenContest: () => void;
}

const statusFilters: StatusFilter[] = ['All', 'Live', 'Upcoming', 'Completed'];
const typeFilters: TypeFilter[] = ['All types', 'DSA', 'CP'];

export const ContestPage: React.FC<ContestPageProps> = ({ onOpenContest }) => {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('All');
  const [typeFilter, setTypeFilter] = useState<TypeFilter>('All types');

  const showUpcoming = statusFilter === 'All' || statusFilter === 'Upcoming';
  const showPast = statusFilter === 'All' || statusFilter === 'Completed';
  const showPastContest = typeFilter !== 'DSA';
  const showLiveEmpty = statusFilter === 'Live';

  return (
    <div className="min-h-screen bg-[#000000] px-4 py-8 text-zinc-100 sm:px-6 lg:py-10">
      <div className="mx-auto max-w-[980px]">
        <section className="grid gap-6 md:grid-cols-[1fr_300px] md:gap-8">
          <div className="pt-1">
            <div className="flex items-center gap-2 text-zinc-400">
              <Trophy className="h-4 w-4" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.12em]">CodeHurdle Arena</span>
            </div>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-white">Contests</h1>
            <p className="mt-2 max-w-lg text-sm leading-6 text-zinc-400">
              Timed rounds against everyone else on CodeHurdle. Register for what is coming up, jump into what is live, or replay a finished contest as a virtual one.
            </p>

            <div className="mt-6 grid max-w-[510px] grid-cols-4 divide-x divide-white/[0.08] border-y border-white/[0.08] py-3">
              {[
                ['Registered', '0'],
                ['Participated', '0'],
                ['Completed', '0'],
                ['Best result', '—']
              ].map(([label, value]) => (
                <div key={label} className="px-3 first:pl-0">
                  <div className="text-[10px] text-zinc-500">{label}</div>
                  <div className="mt-1 text-base font-semibold text-zinc-200">{value}</div>
                </div>
              ))}
            </div>

            <a href="#contest-history" className="mt-4 inline-flex items-center gap-1 text-xs text-zinc-400 transition-colors hover:text-zinc-300">
              Your contest history <ArrowRight className="h-3 w-3" />
            </a>
          </div>

          <aside className="self-start overflow-hidden rounded-xl border border-white/[0.09] bg-[#0d0d13]">
            <div className="min-h-[120px] p-4">
              <div className="flex items-center justify-between text-[10px] text-zinc-500">
                <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-zinc-600" />Nothing scheduled right now</span>
                <span className="rounded bg-white/[0.06] px-1.5 py-0.5 text-[9px] text-zinc-400">CP</span>
              </div>
              <div className="mt-4 text-[10px] text-zinc-500">Latest contest</div>
              <h2 className="mt-1 text-sm font-semibold text-zinc-200">Testing Contest</h2>
              <p className="mt-1 text-[10px] text-zinc-500">Completed Oct 17, 2026</p>
            </div>
            <div className="flex items-center justify-between gap-3 border-t border-white/[0.08] px-4 py-3">
              <p className="text-[10px] leading-4 text-zinc-500">Same problems, same clock, on your own time</p>
              <button onClick={onOpenContest} className="inline-flex shrink-0 items-center gap-1.5 rounded-md bg-zinc-100 px-3 py-1.5 text-[10px] font-semibold text-zinc-900 transition-colors hover:bg-white">
                Replay <ArrowRight className="h-3 w-3" />
              </button>
            </div>
          </aside>
        </section>

        <section className="mt-10" aria-label="Contest listings">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex rounded-md border border-white/[0.08] bg-[#111116] p-1" role="group" aria-label="Filter contests by status">
              {statusFilters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  aria-pressed={statusFilter === filter}
                  onClick={() => setStatusFilter(filter)}
                  className={`rounded px-2.5 py-1 text-[10px] transition-colors ${statusFilter === filter ? 'bg-[#29292f] text-white' : 'text-zinc-400 hover:text-zinc-200'}`}
                >
                  {filter}
                </button>
              ))}
            </div>

            <div className="inline-flex rounded-md border border-white/[0.08] bg-[#111116] p-1" role="group" aria-label="Filter contests by type">
              {typeFilters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  aria-pressed={typeFilter === filter}
                  onClick={() => setTypeFilter(filter)}
                  className={`rounded px-2.5 py-1 text-[10px] transition-colors ${typeFilter === filter ? 'bg-[#29292f] text-white' : 'text-zinc-400 hover:text-zinc-200'}`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {showUpcoming && (
            <section className="overflow-hidden rounded-xl border border-white/[0.09] bg-[#111116]">
              <div className="border-b border-white/[0.08] px-4 py-3">
                <h2 className="text-xs font-semibold text-zinc-200">Upcoming</h2>
                <p className="mt-1 text-[10px] text-zinc-500">Register ahead of time. You can withdraw until the contest starts.</p>
              </div>
              <div className="flex min-h-[122px] flex-col items-center justify-center px-4 py-6 text-center">
                <CalendarDays className="mb-2 h-4 w-4 text-zinc-600" />
                <p className="text-xs font-semibold text-zinc-300">Nothing scheduled yet</p>
                <p className="mt-1 text-[10px] text-zinc-500">New contests show up here as soon as they are announced.</p>
              </div>
            </section>
          )}

          {(showPast || showLiveEmpty) && (
            <section id="contest-history" className="mt-3 overflow-hidden rounded-xl border border-white/[0.09] bg-[#111116]">
              <div className="border-b border-white/[0.08] px-4 py-3">
                <h2 className="text-xs font-semibold text-zinc-200">{showLiveEmpty ? 'Live contests' : 'Past contests'}</h2>
                <p className="mt-1 text-[10px] text-zinc-500">{showLiveEmpty ? 'Join an active round and compete in real time.' : 'Review results, read solutions, or replay one as a virtual contest.'}</p>
              </div>
              {showLiveEmpty ? (
                <div className="flex min-h-[90px] items-center justify-center text-xs text-zinc-500">No live contests right now.</div>
              ) : showPastContest ? (
                <>
                  <div className="flex items-center justify-between gap-4 px-4 py-3">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-medium text-zinc-200">
                        Testing Contest <span className="rounded bg-white/[0.07] px-1.5 py-0.5 text-[9px] text-zinc-400">CP</span>
                      </div>
                      <p className="mt-1 text-[10px] text-zinc-500">Completed Oct 17, 2026</p>
                    </div>
                    <button onClick={onOpenContest} className="inline-flex items-center gap-1 text-xs text-zinc-400 transition-colors hover:text-zinc-300">
                      Practice <Play className="h-3 w-3" />
                    </button>
                  </div>
                  <div className="flex items-center gap-2 border-t border-white/[0.08] px-4 py-2.5 text-[10px] text-zinc-500">
                    <span>Showing 1 contest</span><span className="text-zinc-700">·</span>
                    <button type="button" className="inline-flex items-center gap-0.5 transition-colors hover:text-zinc-300">
                      Browse all rankings <ChevronRight className="h-3 w-3" />
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex min-h-[90px] items-center justify-center text-xs text-zinc-500">No past contests match this type.</div>
              )}
            </section>
          )}
        </section>
      </div>
    </div>
  );
};