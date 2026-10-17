import React, { useState } from 'react';
import { Users, Hash, Volume2, MessageSquare, Sparkles, Send, Mic, Radio } from 'lucide-react';

interface Channel {
  name: string;
  unread?: number;
  isVoice?: boolean;
}

export const CommunityShowcase: React.FC = () => {
  const [activeChannel, setActiveChannel] = useState('dsa-help');

  const channels: Channel[] = [
    { name: 'announcements' },
    { name: 'general', unread: 3 },
    { name: 'dsa-help', unread: 5 },
    { name: 'weekly-contest' },
    { name: 'show-your-work' },
    { name: 'interview-prep', unread: 2 },
    { name: 'Study Room Alpha (Voice)', isVoice: true },
  ];

  const messages = [
    {
      user: 'Aarav',
      avatar: '👨‍💻',
      color: 'bg-emerald-500/20 text-emerald-300',
      time: '10:42 AM',
      text: 'Anyone solved today’s DP problem with O(n) memory?',
    },
    {
      user: 'Mei',
      avatar: '👩‍💻',
      color: 'bg-indigo-500/20 text-indigo-300',
      time: '10:44 AM',
      text: 'Yes, roll the array! Only the last row matters:',
      code: 'dp[i % 2][j] = dp[(i - 1) % 2][j] + ...'
    },
    {
      user: 'Sam',
      avatar: '⚡',
      color: 'bg-amber-500/20 text-amber-300',
      time: '10:45 AM',
      text: 'That cut my memory usage down to 14MB and runtime in half. Thanks Mei!',
    },
    {
      user: 'Riya',
      avatar: '🎯',
      color: 'bg-purple-500/20 text-purple-300',
      time: '10:51 AM',
      text: 'Just posted a full walkthrough of the two-pointer dedupe trick for 3Sum in #show-your-work.',
      code: 'while l < r and nums[l] == nums[l + 1]: l += 1'
    },
    {
      user: 'Kenji',
      avatar: '🚀',
      color: 'bg-rose-500/20 text-rose-300',
      time: '10:58 AM',
      text: 'Weekly contest starts in 20 minutes! Who is in?',
    },
    {
      user: 'Mei',
      avatar: '👩‍💻',
      color: 'bg-indigo-500/20 text-indigo-300',
      time: '11:00 AM',
      text: 'Count me in! Warming up with a quick 3-problem Dynamic Mode set.',
    }
  ];

  return (
    <section id="community" className="py-20 bg-[#080c14] border-t border-slate-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-indigo-500/30 bg-indigo-950/40 px-3 py-1 text-xs font-mono font-medium text-indigo-400 mb-3">
            <Users className="h-3.5 w-3.5" />
            <span>SOLVE ALONGSIDE PEERS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            A Living Developer Community
          </h2>
          <p className="mt-3 text-base text-slate-300">
            Never get stuck on an algorithm edge-case alone. Share runtime breakthroughs, join live voice study rooms, and pair-program.
          </p>
        </div>

        {/* Discord/Slack-style Developer Workspace Card */}
        <div className="mt-12 max-w-5xl mx-auto rounded-2xl border border-slate-800 bg-[#0c1220]/90 shadow-2xl overflow-hidden backdrop-blur-xl">
          
          {/* Top Window Bar */}
          <div className="flex items-center justify-between border-b border-slate-800 bg-[#080d18] px-4 py-3">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-slate-700" />
              <div className="h-3 w-3 rounded-full bg-slate-700" />
              <div className="h-3 w-3 rounded-full bg-slate-700" />
              <span className="ml-2 text-xs font-mono font-semibold text-slate-300">CodeHurdle Official Discord & Practice Hub</span>
            </div>
            
            {/* Live voice indicator */}
            <div className="flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 text-xs font-mono text-emerald-400">
              <Radio className="h-3 w-3 animate-pulse" />
              <span>38 coders in Voice Study Rooms</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 min-h-[420px]">
            
            {/* Sidebar Channels (4 cols) */}
            <div className="md:col-span-4 border-b md:border-b-0 md:border-r border-slate-800 bg-[#090d19] p-4">
              <div className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold mb-3">
                CHANNELS
              </div>
              
              <div className="space-y-1">
                {channels.map((chan) => (
                  <button
                    key={chan.name}
                    onClick={() => !chan.isVoice && setActiveChannel(chan.name)}
                    className={`w-full flex items-center justify-between rounded-lg px-2.5 py-1.5 text-xs font-mono transition-colors text-left ${
                      activeChannel === chan.name 
                        ? 'bg-indigo-600/20 text-indigo-300 font-semibold border border-indigo-500/30'
                        : chan.isVoice 
                        ? 'text-emerald-400 hover:bg-slate-800/40' 
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {chan.isVoice ? (
                        <Volume2 className="h-3.5 w-3.5 text-emerald-400" />
                      ) : (
                        <Hash className="h-3.5 w-3.5 text-slate-500" />
                      )}
                      <span>{chan.name}</span>
                    </div>

                    {chan.unread && (
                      <span className="rounded-full bg-indigo-500 px-1.5 py-0.2 text-[10px] font-bold text-white">
                        {chan.unread}
                      </span>
                    )}

                    {chan.isVoice && (
                      <span className="flex h-2 w-2 rounded-full bg-emerald-400" />
                    )}
                  </button>
                ))}
              </div>

              {/* Voice Room Card */}
              <div className="mt-8 rounded-xl bg-slate-900/80 p-3 border border-slate-800">
                <div className="flex items-center justify-between text-xs font-mono text-emerald-400 mb-2">
                  <span className="flex items-center gap-1.5"><Mic className="h-3.5 w-3.5" /> Voice Connected</span>
                  <span className="text-[10px] text-slate-500">Live</span>
                </div>
                <div className="text-xs text-slate-300 font-medium">Study Room Alpha: Graph Theory</div>
                <div className="mt-2 flex -space-x-1.5 overflow-hidden">
                  <div className="inline-block h-6 w-6 rounded-full bg-emerald-500 text-[10px] font-bold text-slate-950 flex items-center justify-center ring-2 ring-slate-900">A</div>
                  <div className="inline-block h-6 w-6 rounded-full bg-indigo-500 text-[10px] font-bold text-white flex items-center justify-center ring-2 ring-slate-900">M</div>
                  <div className="inline-block h-6 w-6 rounded-full bg-amber-500 text-[10px] font-bold text-slate-950 flex items-center justify-center ring-2 ring-slate-900">S</div>
                  <div className="inline-block h-6 w-6 rounded-full bg-rose-500 text-[10px] font-bold text-white flex items-center justify-center ring-2 ring-slate-900">R</div>
                  <div className="inline-block h-6 w-6 rounded-full bg-slate-800 text-[10px] font-medium text-slate-400 flex items-center justify-center ring-2 ring-slate-900">+10</div>
                </div>
              </div>

            </div>

            {/* Chat Messages Feed (8 cols) */}
            <div className="md:col-span-8 bg-[#0a0f1d] p-4 flex flex-col justify-between">
              
              <div className="space-y-4 overflow-y-auto max-h-[350px] pr-2">
                {messages.map((msg, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-sm">
                    <span className="text-xl select-none">{msg.avatar}</span>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white">{msg.user}</span>
                        <span className="text-[10px] font-mono text-slate-500">{msg.time}</span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                        {msg.text}
                      </p>
                      {msg.code && (
                        <div className="mt-1.5 rounded-lg bg-slate-950 px-3 py-2 font-mono text-xs text-emerald-400 border border-slate-800 overflow-x-auto">
                          <code>{msg.code}</code>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Chat Input Bar */}
              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center gap-2">
                <input 
                  type="text" 
                  readOnly 
                  value="Message #dsa-help... (Join community to chat)" 
                  className="flex-1 rounded-xl border border-slate-800 bg-slate-900/60 px-3.5 py-2 text-xs text-slate-500 font-mono focus:outline-none cursor-not-allowed"
                />
                <a
                  href="#community-join"
                  className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 px-4 py-2 text-xs font-semibold text-white transition-all shadow-md shadow-indigo-600/30"
                >
                  <Send className="h-3 w-3" />
                  <span>Join Server</span>
                </a>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
