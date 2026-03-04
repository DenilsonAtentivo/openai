export function Badge({ children, tone = 'default' }: { children: React.ReactNode; tone?: 'default' | 'success' | 'warn' | 'error' }) {
  const map = {
    default: 'bg-slate-800 text-slate-200',
    success: 'bg-emerald-500/20 text-emerald-300',
    warn: 'bg-amber-400/20 text-amber-300',
    error: 'bg-rose-400/20 text-rose-300'
  } as const;

  return <span className={`rounded-full px-2 py-1 text-xs ${map[tone]}`}>{children}</span>;
}
