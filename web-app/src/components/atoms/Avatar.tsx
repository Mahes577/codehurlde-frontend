import React from 'react';

export interface AvatarProps {
  initials?: string;
  name?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  status?: 'online' | 'offline' | 'pro';
  gradient?: string;
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  initials = 'CA',
  name,
  size = 'md',
  status,
  gradient = 'from-zinc-500 to-zinc-500',
  className = ''
}) => {
  const sizeStyles = {
    xs: 'w-6 h-6 text-[10px]',
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-16 h-16 text-xl'
  };

  return (
    <div className={`relative inline-block ${className}`}>
      <div className={`${sizeStyles[size]} rounded-xl bg-gradient-to-tr ${gradient} p-0.5 shadow-md flex items-center justify-center font-mono font-bold text-zinc-950 select-none`}>
        <div className="w-full h-full bg-[#111111] rounded-[10px] flex items-center justify-center text-white">
          {initials}
        </div>
      </div>
      {status === 'pro' && (
        <span className="absolute -bottom-1 -right-1 px-1.5 py-0.2 rounded-full bg-zinc-500 text-black text-[9px] font-bold font-mono">
          PRO
        </span>
      )}
      {status === 'online' && (
        <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-zinc-400 border-2 border-[#000000]" />
      )}
    </div>
  );
};
