import { ReactNode } from 'react';
import { cn } from '../lib/utils';

interface BadgeProps {
  children: ReactNode;
  tone?: 'success' | 'warning' | 'danger' | 'info';
  className?: string;
}

export function Badge({ children, tone = 'info', className }: BadgeProps) {
  const tones = {
    success: 'bg-neon-green/20 text-neon-green border-neon-green/40',
    warning: 'bg-neon-yellow/20 text-neon-yellow border-neon-yellow/40',
    danger: 'bg-neon-red/20 text-neon-red border-neon-red/40',
    info: 'bg-neon-blue/20 text-neon-blue border-neon-blue/40'
  };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold uppercase tracking-wide',
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
