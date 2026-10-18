import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  rightElement?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  icon,
  rightElement,
  className = '',
  ...props
}) => {
  return (
    <div className="relative flex items-center w-full">
      {icon && (
        <span className="absolute left-3 text-zinc-500 pointer-events-none flex items-center">
          {icon}
        </span>
      )}
      <input
        className={`w-full rounded-xl border border-white/[0.08] bg-[#111111] px-3.5 py-2 text-xs text-zinc-100 placeholder-zinc-500 transition-all focus:border-zinc-500/50 focus:outline-none focus:ring-1 focus:ring-zinc-500/20 disabled:opacity-50 font-sans ${
          icon ? 'pl-9' : ''
        } ${rightElement ? 'pr-9' : ''} ${className}`}
        {...props}
      />
      {rightElement && (
        <div className="absolute right-2.5 flex items-center">
          {rightElement}
        </div>
      )}
    </div>
  );
};

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const Textarea: React.FC<TextareaProps> = ({
  className = '',
  ...props
}) => {
  return (
    <textarea
      className={`w-full rounded-xl border border-white/[0.08] bg-[#111111] p-3 text-xs text-zinc-100 placeholder-zinc-500 transition-all focus:border-zinc-500/50 focus:outline-none focus:ring-1 focus:ring-zinc-500/20 disabled:opacity-50 font-mono resize-none leading-relaxed ${className}`}
      {...props}
    />
  );
};
