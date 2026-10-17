import React, { useState } from 'react';
import { 
  Users, 
  MessageSquare, 
  Mic, 
  Hash, 
  Send, 
  Flame, 
  Sparkles, 
  Share2, 
  CheckCircle2, 
  ThumbsUp, 
  ChevronRight, 
  Code2, 
  Headphones, 
  Radio,
  BookOpen
} from 'lucide-react';

interface ChatMessage {
  id: string;
  author: string;
  initials: string;
  avatarColor: string;
  time: string;
  text: string;
  codeSnippet?: string;
  reactions?: number;
}

const CHANNELS = [
  { id: 'announcements', name: 'announcements', icon: Radio, unread: 0 },
  { id: 'general', name: 'general', icon: Hash, unread: 2 },
  { id: 'dsa-help', name: 'dsa-help', icon: Hash, unread: 5 },
  { id: 'weekly-contest', name: 'weekly-contest', icon: Flame, unread: 8 },
  { id: 'show-your-work', name: 'show-your-work', icon: Code2, unread: 3 },
  { id: 'interview-prep', name: 'interview-prep', icon: BookOpen, unread: 0 }
];

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'm1',
    author: 'Aarav',
    initials: 'A',
    avatarColor: 'from-blue-600 to-indigo-600',
    time: '10:42 AM',
    text: "Anyone solved today's DP problem with O(n) memory instead of O(n^2)?",
    reactions: 3
  },
  {
    id: 'm2',
    author: 'Mei',
    initials: 'M',
    avatarColor: 'from-emerald-600 to-teal-600',
    time: '10:44 AM',
    text: "Yes! Roll the array: only the last row matters. You can compress the dp table to 2 rows:",
    codeSnippet: 'dp[i % 2][j] = dp[(i - 1) % 2][j] + dp[i % 2][j - 1]',
    reactions: 9
  },
  {
    id: 'm3',
    author: 'Sam',
    initials: 'S',
    avatarColor: 'from-amber-600 to-orange-600',
    time: '10:45 AM',
    text: "That cut my runtime in half on CodeHurdle's runner, thanks Mei!",
    reactions: 4
  },
  {
    id: 'm4',
    author: 'Riya',
    initials: 'R',
    avatarColor: 'from-purple-600 to-pink-600',
    time: '10:51 AM',
    text: "Posted a complete walkthrough of the two-pointer invariant for 3Sum in #show-your-work.",
    reactions: 6
  },
  {
    id: 'm5',
    author: 'Kenji',
    initials: 'K',
    avatarColor: 'from-rose-600 to-red-600',
    time: '10:58 AM',
    text: "Weekly Contest #42 starts in 20 minutes! Who is in?",
    reactions: 12
  }
];

export const CommunityView: React.FC = () => {
  const [activeChannel, setActiveChannel] = useState('dsa-help');
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [inputVal, setInputVal] = useState('');
  const [voiceRoomJoined, setVoiceRoomJoined] = useState(false);

  const handleSendMessage = () => {
    if (!inputVal.trim()) return;
    const newMsg: ChatMessage = {
      id: `m-${Date.now()}`,
      author: 'You (@aarav_codes)',
      initials: 'CA',
      avatarColor: 'from-emerald-500 to-cyan-500',
      time: 'Just now',
      text: inputVal,
      reactions: 1
    };
    setMessages(prev => [...prev, newMsg]);
    setInputVal('');
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-zinc-100 py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="rounded-2xl bg-zinc-900/60 border border-zinc-800/80 p-6 md:p-8 relative overflow-hidden backdrop-blur-xl">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-indigo-400 text-xs font-mono mb-3">
                <Users className="w-3.5 h-3.5" />
                <span>CodeHurdle Developer Community</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                Peer Discussion Channels & Study Rooms
              </h1>
              <p className="text-sm text-zinc-400 mt-2 max-w-2xl leading-relaxed">
                Connect with engineers solving for technical interview mastery and rating climbs. Ask questions, share time/space optimizations, and review contest problem editorials.
              </p>
            </div>

            {/* Voice Study Room Widget */}
            <div className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800/80 min-w-[260px] space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                  <Radio className="w-3.5 h-3.5 animate-pulse" />
                  <span>Live Study Room #1</span>
                </span>
                <span className="text-[10px] font-mono text-zinc-500">4 Solving Now</span>
              </div>

              <div className="flex items-center gap-1.5">
                {['M', 'S', 'R', 'K'].map((init, i) => (
                  <div key={i} className="w-7 h-7 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-xs font-bold text-zinc-300">
                    {init}
                  </div>
                ))}
              </div>

              <button
                onClick={() => setVoiceRoomJoined(!voiceRoomJoined)}
                className={`w-full py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                  voiceRoomJoined
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                    : 'bg-emerald-400 text-black hover:bg-emerald-300'
                }`}
              >
                <Headphones className="w-3.5 h-3.5" />
                <span>{voiceRoomJoined ? 'Leave Voice Room' : 'Join Voice Room'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Discord / Slack-style Channel Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[620px] rounded-2xl bg-zinc-900/60 border border-zinc-800/80 overflow-hidden">
          
          {/* Sidebar Channels (Col 1-4) */}
          <div className="lg:col-span-4 border-r border-zinc-800/80 flex flex-col bg-zinc-950/50">
            <div className="p-4 border-b border-zinc-800/80 text-xs font-mono font-bold uppercase tracking-wider text-zinc-400">
              Community Channels
            </div>

            <div className="flex-1 overflow-y-auto p-3 space-y-1">
              {CHANNELS.map(ch => {
                const Icon = ch.icon;
                const isActive = activeChannel === ch.id;
                return (
                  <button
                    key={ch.id}
                    onClick={() => setActiveChannel(ch.id)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs transition-colors ${
                      isActive
                        ? 'bg-zinc-800 text-white font-semibold'
                        : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Icon className="w-3.5 h-3.5 text-zinc-500" />
                      <span>{ch.name}</span>
                    </div>
                    {ch.unread > 0 && (
                      <span className="px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold">
                        {ch.unread}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Peer matching card */}
            <div className="p-4 border-t border-zinc-800/80 bg-zinc-950/80 text-xs space-y-2">
              <div className="font-semibold text-white flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Find Mock Interview Partner</span>
              </div>
              <p className="text-[11px] text-zinc-400 leading-relaxed">
                Pair up for 45-minute Google/Meta style technical mock interviews.
              </p>
              <button 
                onClick={() => alert("Matching with available peers on CodeHurdle...")}
                className="w-full py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium transition-colors"
              >
                Queue for Mock Pair (Avg 2m)
              </button>
            </div>
          </div>

          {/* Chat Feed (Col 5-12) */}
          <div className="lg:col-span-8 flex flex-col justify-between bg-[#080b12]">
            {/* Channel Top Header */}
            <div className="p-4 border-b border-zinc-800/80 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 font-semibold text-white">
                <Hash className="w-4 h-4 text-zinc-500" />
                <span>{activeChannel}</span>
                <span className="text-zinc-500 font-normal">| DSA algorithmic solutions and peer debugging</span>
              </div>
              <span className="text-[11px] text-zinc-500 font-mono">148 online</span>
            </div>

            {/* Messages Scroll Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map(msg => (
                <div key={msg.id} className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-full bg-gradient-to-tr ${msg.avatarColor} flex items-center justify-center text-xs font-bold text-white shrink-0 shadow`}>
                    {msg.initials}
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white">{msg.author}</span>
                      <span className="text-[10px] text-zinc-500">{msg.time}</span>
                    </div>
                    <div className="text-xs text-zinc-300 leading-relaxed">
                      {msg.text}
                    </div>
                    {msg.codeSnippet && (
                      <div className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-800 font-mono text-xs text-emerald-300 my-1.5">
                        <code>{msg.codeSnippet}</code>
                      </div>
                    )}
                    {msg.reactions && (
                      <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-zinc-900 border border-zinc-800 text-[10px] text-zinc-400 cursor-pointer hover:border-zinc-700">
                        <ThumbsUp className="w-3 h-3 text-emerald-400" />
                        <span>{msg.reactions}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input Box */}
            <div className="p-4 border-t border-zinc-800/80 bg-zinc-950/60">
              <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2">
                <input
                  type="text"
                  value={inputVal}
                  onChange={e => setInputVal(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
                  placeholder={`Message #${activeChannel}...`}
                  className="flex-1 bg-transparent text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none"
                />
                <button
                  onClick={handleSendMessage}
                  className="p-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
