import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: 'What is CodeHurdle and how is it different from LeetCode?',
    answer: 'CodeHurdle combines a 500+ curated DSA problem library with an adaptive AI "Dynamic Mode", timed competitive programming arena, and live study voice rooms. Instead of forcing you to guess which of 3,000 random questions to practice next, CodeHurdle diagnoses your algorithmic weak points and serves problems at your optimal growth frontier.'
  },
  {
    question: 'How does Dynamic Mode work?',
    answer: 'Dynamic Mode monitors your submission history, execution runtimes, test case failures, and memory efficiency across 16 algorithmic patterns. When you request the next problem, our model computes a difficulty match score and selects the challenge that will stretch your mental model without pushing you into cognitive stall.'
  },
  {
    question: 'What is the difference between DSA Hub and CP Arena?',
    answer: 'DSA Hub is built for mastery of fundamentals: categorized roadmaps (Two Pointers, Graphs, DP), step-by-step editorial solutions, and company interview vaults. CP Arena is built for speed and competition: timed contests, Div 1/2/3 rating ladders, anti-cheat detection, and live global leaderboards.'
  },
  {
    question: 'Which programming languages are supported in the runner?',
    answer: 'Python 3, C++20, and JavaScript (Node.js). You can switch languages per problem directly in the editor, run custom test cases instantly, and compare your runtime percentile against thousands of real submissions.'
  },
  {
    question: 'Is my progress and code automatically saved?',
    answer: 'Yes! Every character you type and all your passing solutions are automatically saved to your cloud profile. You can start a problem on your desktop, leave halfway, and resume on any device right where you stopped.'
  },
  {
    question: 'What can I do in the Community channels and Voice Study Rooms?',
    answer: 'You can discuss optimal solution tricks (like rolling arrays for O(1) DP space), pair program on tricky graph problems, share interview experiences from top tech companies, and join live study rooms with other engineers.'
  }
];

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-20 bg-[#080c14] border-t border-slate-800">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-xs font-mono font-medium text-slate-300 mb-3">
            <HelpCircle className="h-3.5 w-3.5 text-emerald-400" />
            <span>FREQUENTLY ASKED QUESTIONS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Everything You Need to Know
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-400">
            Have questions about Dynamic Mode, contests, or supported languages? We've got answers.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={idx}
                className="rounded-xl border border-slate-800 bg-[#0c1220]/70 overflow-hidden transition-colors hover:border-slate-700"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full flex items-center justify-between p-5 text-left text-sm sm:text-base font-semibold text-slate-200 hover:text-white"
                >
                  <span>{faq.question}</span>
                  <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform duration-200 shrink-0 ml-4 ${isOpen ? 'rotate-180 text-emerald-400' : ''}`} />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-400 leading-relaxed border-t border-slate-800/60 font-sans">
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
