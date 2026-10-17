import React, { useState } from 'react';
import { HelpCircle } from 'lucide-react';
import { SectionHeader } from './atoms/SectionHeader';
import { FaqAccordionItem } from './molecules/FaqAccordionItem';

interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

const FAQS: FaqItem[] = [
  {
    category: 'Architecture',
    question: 'How does CodeHurdle differ from standard problem lists like LeetCode or NeetCode?',
    answer: 'Standard problem sheets treat every learner identically, which frequently leads to cognitive stalls when jumping from Easy to Hard questions. CodeHurdle incorporates an adaptive skill calibration engine that tracks your speed, memory efficiency, and bug patterns across 16 core patterns, serving problems at your exact learning boundary.'
  },
  {
    category: 'Algorithm Calibration',
    question: 'How is topic proficiency and Elo computed in Dynamic Mode?',
    answer: 'Each submission is analyzed against hidden test suites, memory allocation, and time complexity. Passing edge-case tests on first submission increases your topic Elo, while runtime errors or edge-case timeouts dynamically schedule a reinforcement problem that tests the same algorithmic invariant in a slightly different problem setting.'
  },
  {
    category: 'Compiler & Runner',
    question: 'Which programming languages are supported in the in-browser runner?',
    answer: 'Python 3.12, C++20 (Clang), and JavaScript (Node.js v22). All code executes in isolated, low-latency micro-containers with execution times typically reported under 40 milliseconds.'
  },
  {
    category: 'Competitive Arena',
    question: 'Are weekly contests rated?',
    answer: 'Yes. Contests follow standard competitive programming rating brackets (Div 1 for >1900, Div 2 for 1400–1900, and Div 3 for <1400). Ratings update within 30 minutes of contest closure following automated plagiarism and anti-cheat screening.'
  },
  {
    category: 'Licensing',
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
    <section className="py-16 sm:py-20 bg-[#07090e] border-b border-white/[0.08]">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <SectionHeader
          eyebrow="Documentation & FAQ"
          eyebrowIcon={<HelpCircle className="w-3.5 h-3.5" />}
          eyebrowColor="cyan"
          title="Frequently Answered Inquiries"
          highlightText="For Engineers"
          subtitle="Everything you need to know about the CodeHurdle adaptive problem solver, competitive Elo system, and in-browser micro-containers."
          center
        />

        {/* Accordion Molecule List */}
        <div className="space-y-3">
          {FAQS.map((faq, idx) => (
            <FaqAccordionItem
              key={idx}
              question={faq.question}
              answer={faq.answer}
              category={faq.category}
              isOpen={openIndex === idx}
              onToggle={() => toggle(idx)}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
