import { ButtonHTMLAttributes } from 'react';
import { cn } from '../lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
}

export function Button({ className, variant = 'primary', ...props }: ButtonProps) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-blue/60 disabled:cursor-not-allowed disabled:opacity-60';
  const variants = {
    primary: 'bg-neon-orange text-black shadow-glow hover:brightness-110',
    secondary: 'bg-white/10 text-white border border-white/15 hover:bg-white/20',
    ghost: 'bg-transparent text-white/70 hover:text-white hover:bg-white/5'
  };

  return <button className={cn(base, variants[variant], className)} {...props} />;
}
