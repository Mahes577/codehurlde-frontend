import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: 'How does CodeHurdle differ from standard problem lists like LeetCode or NeetCode?',
    answer: 'Standard problem sheets treat every learner identically, which frequently leads to cognitive stalls when jumping from Easy to Hard questions. CodeHurdle incorporates an adaptive skill calibration engine that tracks your speed, memory efficiency, and bug patterns across 16 core patterns, serving problems at your exact learning boundary.'
  },
  {
    question: 'How is topic proficiency and Elo computed in Dynamic Mode?',
    answer: 'Each submission is analyzed against hidden test suites, memory allocation, and time complexity. Passing edge-case tests on first submission increases your topic Elo, while runtime errors or edge-case timeouts dynamically schedule a reinforcement problem that tests the same algorithmic invariant in a slightly different problem setting.'
  },
  {
    question: 'Which programming languages are supported in the in-browser runner?',
    answer: 'Python 3.12, C++20 (Clang), and JavaScript (Node.js v22). All code executes in isolated, low-latency micro-containers with execution times typically reported under 40 milliseconds.'
  },
  {
    question: 'Are weekly contests rated?',
    answer: 'Yes. Contests follow standard competitive programming rating brackets (Div 1 for >1900, Div 2 for 1400–1900, and Div 3 for <1400). Ratings update within 30 minutes of contest closure following automated plagiarism and anti-cheat screening.'
  },
  {
    question: 'Can I use CodeHurdle for free?',
    answer: 'Yes. All 520 curated problems, in-browser execution, Dynamic Calibration mode, community discussions, and weekly contests are free forever.'
  }
];

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-16 sm:py-20 bg-[#090a0f] border-b border-white/[0.08]">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-10">
          <div className="text-xs font-mono uppercase tracking-wider text-zinc-500 font-medium mb-1">
            Documentation & FAQ
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        {/* Accordion */}
        <div className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className="py-4">
                <button
                  onClick={() => toggle(idx)}
                  className="w-full flex items-center justify-between text-left text-sm font-medium text-zinc-200 hover:text-white transition-colors"
                >
                  <span>{faq.question}</span>
                  <ChevronDown className={`h-4 w-4 text-zinc-500 transition-transform duration-200 shrink-0 ml-4 ${isOpen ? 'rotate-180 text-white' : ''}`} />
                </button>

                {isOpen && (
                  <div className="pt-2 text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
