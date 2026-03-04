import type { ButtonHTMLAttributes } from 'react';

type Variant = 'primary' | 'ghost' | 'danger';
interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

const base = 'rounded-lg px-3 py-2 text-sm font-medium transition border';
const variants: Record<Variant, string> = {
  primary: 'bg-emerald-500 border-emerald-400 text-black hover:bg-emerald-400',
  ghost: 'bg-transparent border-slate-700 text-slate-200 hover:bg-slate-800',
  danger: 'bg-rose-500/90 border-rose-400 text-white hover:bg-rose-500'
};

export function Button({ className = '', children, variant = 'primary', ...props }: Props) {
  return (
    <button className={`${base} ${variants[variant]} disabled:opacity-60 ${className}`} {...props}>
      {children}
    </button>
  );
}
