import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'surface' | 'interactive' | 'sunken' | 'glass';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  glow?: 'none' | 'blue' | 'blue' | 'blue' | 'blue';
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  padding = 'md',
  glow = 'none',
  className = '',
  ...props
}) => {
  const baseStyles = "relative rounded-2xl border transition-all duration-200 overflow-hidden";

  const variantStyles = {
    default: "bg-[#111111]/90 border-white/[0.08] shadow-xl backdrop-blur-md",
    surface: "bg-zinc-900/60 border-zinc-800/80 shadow-lg backdrop-blur-xl",
    interactive: "bg-[#111111]/90 border-white/[0.08] hover:border-zinc-500/40 hover:shadow-2xl hover:shadow-zinc-950/20 cursor-pointer",
    sunken: "bg-zinc-950/70 border-zinc-800/60",
    glass: "bg-white/[0.02] border-white/[0.06] backdrop-blur-lg"
  };

  const paddingStyles = {
    none: "p-0",
    sm: "p-3.5 sm:p-4",
    md: "p-5 sm:p-6",
    lg: "p-6 sm:p-8"
  };

  const glowStyles = {
    none: "",
    blue: "shadow-2xl shadow-zinc-950/30 border-zinc-500/20",
    blue: "shadow-2xl shadow-zinc-950/30 border-zinc-500/20",
    blue: "shadow-2xl shadow-zinc-950/30 border-zinc-500/20",
    blue: "shadow-2xl shadow-zinc-950/30 border-zinc-500/20"
  };

  return (
    <div className={`${baseStyles} ${variantStyles[variant]} ${paddingStyles[padding]} ${glowStyles[glow]} ${className}`} {...props}>
      {children}
    </div>
  );
};

export const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className = '', ...props }) => (
  <div className={`flex flex-col space-y-1.5 pb-4 border-b border-white/[0.06] ${className}`} {...props}>
    {children}
  </div>
);

export const CardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({ children, className = '', ...props }) => (
  <h3 className={`text-base font-bold text-white tracking-tight flex items-center gap-2 ${className}`} {...props}>
    {children}
  </h3>
);

export const CardDescription: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({ children, className = '', ...props }) => (
  <p className={`text-xs text-zinc-400 leading-relaxed ${className}`} {...props}>
    {children}
  </p>
);

export const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className = '', ...props }) => (
  <div className={`pt-4 ${className}`} {...props}>
    {children}
  </div>
);
