import React, { useState } from 'react';
import { MessageSquare, ThumbsUp, MessageCircle, Code, Hash, ArrowUpRight } from 'lucide-react';

interface DiscussionThread {
  id: string;
  title: string;
  author: string;
  authorInitials: string;
  tag: string;
  timeAgo: string;
  upvotes: number;
  replies: number;
  snippet?: string;
  summary: string;
}

const DISCUSSIONS: DiscussionThread[] = [
  {
    id: '1',
    title: 'Rolling array space optimization for 0/1 Knapsack: reducing O(N×W) to O(W)',
    author: 'Mei Lin',
    authorInitials: 'ML',
    tag: 'Dynamic Programming',
    timeAgo: '2h ago',
    upvotes: 312,
    replies: 28,
    snippet: `// Iterate backwards to avoid reusing values from the current item
for (let w = W; w >= weight[i]; w--) {
  dp[w] = Math.max(dp[w], dp[w - weight[i]] + value[i]);
}`,
    summary: 'When calculating the current row in 0/1 knapsack, only the immediately preceding row is needed. Iterating in reverse allows using a single 1D array in-place without memory allocation overhead.'
  },
  {
    id: '2',
    title: 'Two-pointer deduplication trick for 3Sum without set-based hashing',
    author: 'Priya Sharma',
    authorInitials: 'PS',
    tag: 'Two Pointers',
    timeAgo: '4h ago',
    upvotes: 245,
    replies: 19,
    snippet: `while (left < right && nums[left] === nums[left + 1]) left++;
while (left < right && nums[right] === nums[right - 1]) right--;`,
    summary: 'Hashing triplets via Set adds substantial overhead and memory allocation in Python and JS. Sorting first and advancing pointers past duplicate elements guarantees uniqueness in O(1) auxiliary space.'
  },
  {
    id: '3',
    title: 'Why Monotonic Deque guarantees amortized O(N) for Sliding Window Maximum',
    author: 'Chen Wei',
    authorInitials: 'CW',
    tag: 'Queue / Deque',
    timeAgo: '6h ago',
    upvotes: 184,
    replies: 14,
    snippet: `while (!deque.isEmpty() && nums[deque.peekLast()] <= nums[i]) {
  deque.pollLast();
}`,
    summary: 'Each element enters and exits the deque at most once. Because elements are strictly decreasing in value, the window maximum is always accessible at the head in O(1).'
  }
];

export const CommunityShowcase: React.FC = () => {
  const [selectedTag, setSelectedTag] = useState('All');

  const tags = ['All', 'Dynamic Programming', 'Two Pointers', 'Queue / Deque', 'System Design'];

  const filtered = selectedTag === 'All' 
    ? DISCUSSIONS 
    : DISCUSSIONS.filter(d => d.tag === selectedTag);

  return (
    <section id="discuss" className="py-16 sm:py-20 bg-[#000000] border-b border-white/[0.08]">
      <div className="mx-auto max-w-[1720px] px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-white/[0.08]">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-zinc-500 font-medium mb-1">
              Peer Engineering & Solution Breakdowns
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Algorithm Discussions & Editorials
            </h2>
          </div>

          {/* Tag filters */}
          <div className="flex flex-wrap gap-1.5">
            {tags.map((t) => (
              <button
                key={t}
                onClick={() => setSelectedTag(t)}
                className={`px-2.5 py-1 rounded text-xs font-mono transition-colors border ${
                  selectedTag === t
                    ? 'bg-white/[0.1] text-white border-white/[0.15]'
                    : 'bg-white/[0.02] text-zinc-400 border-white/[0.06] hover:text-zinc-200'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Discussion Cards Feed */}
        <div className="mt-6 space-y-4">
          {filtered.map((item) => (
            <div 
              key={item.id}
              className="rounded-lg border border-white/[0.08] bg-[#111111] p-5 hover:border-white/[0.15] transition-colors"
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-white/[0.04] border border-white/[0.08] px-2 py-0.5 text-[10px] font-mono text-zinc-300">
                      {item.tag}
                    </span>
                    <span className="text-[11px] font-mono text-zinc-500">
                      Posted by {item.author} ({item.authorInitials}) · {item.timeAgo}
                    </span>
                  </div>

                  <h3 className="text-base font-semibold text-white hover:text-zinc-400 transition-colors cursor-pointer">
                    {item.title}
                  </h3>

                  <p className="text-xs text-zinc-300 leading-relaxed max-w-3xl">
                    {item.summary}
                  </p>

                  {item.snippet && (
                    <div className="mt-2 rounded border border-white/[0.06] bg-black/40 p-3 font-mono text-xs text-zinc-200 overflow-x-auto">
                      <pre><code>{item.snippet}</code></pre>
                    </div>
                  )}
                </div>

                {/* Right stats & action */}
                <div className="flex lg:flex-col items-center lg:items-end justify-between lg:justify-start gap-3 shrink-0 pt-2 lg:pt-0">
                  <div className="flex items-center gap-3 text-xs font-mono text-zinc-400">
                    <span className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer">
                      <ThumbsUp className="h-3.5 w-3.5 text-zinc-500" />
                      {item.upvotes}
                    </span>
                    <span className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer">
                      <MessageCircle className="h-3.5 w-3.5 text-zinc-500" />
                      {item.replies}
                    </span>
                  </div>

                  <a 
                    href="#discuss" 
                    className="inline-flex items-center gap-1 text-xs font-mono text-zinc-400 hover:text-white transition-colors"
                  >
                    <span>Read breakdown</span>
                    <ArrowUpRight className="h-3 w-3" />
                  </a>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
