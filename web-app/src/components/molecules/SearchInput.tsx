import React from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '../atoms/Input';

export interface SearchInputProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  shortcut?: string;
  onShortcutClick?: () => void;
  className?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder = 'Search problems, patterns, companies...',
  shortcut = '⌘K',
  onShortcutClick,
  className = ''
}) => {
  return (
    <Input
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      icon={<Search className="w-3.5 h-3.5 text-zinc-500" />}
      rightElement={
        <div className="flex items-center gap-1.5">
          {value ? (
            <button
              onClick={() => onChange('')}
              className="p-1 rounded hover:bg-zinc-800 text-zinc-400 hover:text-white"
            >
              <X className="w-3 h-3" />
            </button>
          ) : shortcut ? (
            <kbd
              onClick={onShortcutClick}
              className="rounded bg-white/[0.06] px-1.5 py-0.2 text-[10px] font-mono text-zinc-400 border border-white/[0.08] cursor-pointer hover:bg-white/[0.1] hover:text-zinc-200 transition-colors select-none"
            >
              {shortcut}
            </kbd>
          ) : null}
        </div>
      }
      className={className}
    />
  );
};
