import { SelectHTMLAttributes } from 'react';
import { cn } from '../lib/utils';

export function Select({ className, children, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={cn(
        'w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:border-neon-green/60 focus:outline-none focus:ring-2 focus:ring-neon-green/20',
        className
      )}
      {...props}
    >
      {children}
    </select>
  );
}
