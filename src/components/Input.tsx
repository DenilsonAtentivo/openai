import { InputHTMLAttributes } from 'react';
import { cn } from '../lib/utils';

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        'w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/40 focus:border-neon-blue/60 focus:outline-none focus:ring-2 focus:ring-neon-blue/20',
        className
      )}
      {...props}
    />
  );
}
