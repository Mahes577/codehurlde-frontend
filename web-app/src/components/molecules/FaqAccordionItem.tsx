import React from 'react';
import { ChevronDown } from 'lucide-react';
import { Card } from '../atoms/Card';

export interface FaqAccordionItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  category?: string;
}

export const FaqAccordionItem: React.FC<FaqAccordionItemProps> = ({
  question,
  answer,
  isOpen,
  onToggle,
  category
}) => {
  return (
    <Card 
      variant={isOpen ? 'interactive' : 'default'} 
      className={`transition-all duration-200 overflow-hidden cursor-pointer ${
        isOpen ? 'border-emerald-500/40 shadow-lg shadow-emerald-950/20' : ''
      }`}
      onClick={onToggle}
    >
      <div className="p-4 sm:p-5 flex items-center justify-between gap-4 select-none">
        <div className="flex items-center gap-3">
          {category && (
            <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 hidden sm:inline">
              {category}
            </span>
          )}
          <h3 className={`text-sm sm:text-base font-semibold transition-colors ${isOpen ? 'text-emerald-300' : 'text-zinc-200'}`}>
            {question}
          </h3>
        </div>
        <div className={`p-1.5 rounded-lg bg-white/[0.04] text-zinc-400 transition-transform duration-200 ${isOpen ? 'rotate-180 text-emerald-400' : ''}`}>
          <ChevronDown className="w-4 h-4" />
        </div>
      </div>

      {isOpen && (
        <div className="px-4 pb-5 pt-0 sm:px-5 border-t border-white/[0.04] text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans animate-fade-in">
          {answer}
        </div>
      )}
    </Card>
  );
};
