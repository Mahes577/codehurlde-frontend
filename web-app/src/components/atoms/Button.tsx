import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'blue';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'secondary',
  size = 'sm',
  icon,
  iconPosition = 'left',
  isLoading = false,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 select-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] font-sans";

  const sizeStyles = {
    xs: "px-2.5 py-1 text-xs gap-1.5",
    sm: "px-3.5 py-1.5 text-xs gap-2",
    md: "px-4.5 py-2.5 text-sm gap-2",
    lg: "px-6 py-3.5 text-sm gap-2.5"
  };

  const variantStyles = {
    primary: "bg-gradient-to-r from-lime-400 to-green-400 hover:from-lime-300 hover:to-green-300 text-zinc-950 shadow-md shadow-lime-500/20 font-bold",
    secondary: "bg-zinc-900/90 hover:bg-zinc-800 text-zinc-200 hover:text-white border border-white/[0.08] hover:border-white/[0.16] shadow-sm",
    outline: "bg-transparent hover:bg-white/[0.05] text-zinc-300 hover:text-white border border-white/[0.12] hover:border-white/[0.24]",
    ghost: "bg-transparent hover:bg-white/[0.05] text-zinc-400 hover:text-zinc-200",
    danger: "bg-red-500/15 hover:bg-red-500/25 text-red-300 border border-red-500/30",
    blue: "bg-lime-500/15 hover:bg-lime-500/25 text-lime-300 border border-lime-500/30"
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        <>
          {icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>}
          <span>{children}</span>
          {icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
        </>
      )}
    </button>
  );
};
