import { ReactNode } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Badge } from '../components/Badge';
import { cn } from '../lib/utils';
import {
  Boxes,
  ShieldCheck,
  LayoutDashboard,
  Users,
  Workflow,
  Settings
} from 'lucide-react';

const navItems = [
  { label: 'Dashboard', to: '/dashboard', icon: LayoutDashboard },
  { label: 'Conectar Microsoft 365', to: '/connect-microsoft', icon: ShieldCheck },
  { label: 'Tenants', to: '/tenants', icon: Users },
  { label: 'Jobs', to: '/jobs', icon: Workflow },
  { label: 'Settings', to: '/settings', icon: Settings }
];

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const location = useLocation();
  const pageTitle = navItems.find((item) => location.pathname.startsWith(item.to))?.label ?? 'Dashboard';

  return (
    <div className="app-shell flex min-h-screen">
      <aside className="hidden w-64 flex-col gap-8 border-r border-white/5 bg-night-900/80 p-6 md:flex">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neon-orange/90 text-black">
            <Boxes className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">M365 Backup</p>
            <p className="text-xs text-white/50">Admin Console</p>
          </div>
        </div>
        <nav className="flex flex-1 flex-col gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition',
                    isActive
                      ? 'bg-white/10 text-white shadow-glow'
                      : 'text-white/60 hover:bg-white/5 hover:text-white'
                  )
                }
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </NavLink>
            );
          })}
        </nav>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-xs text-white/60">
          <p className="font-semibold text-white">Status do sistema</p>
          <p className="mt-2">Última sincronização há 2m</p>
          <Badge className="mt-3" tone="success">
            Operacional
          </Badge>
        </div>
      </aside>
      <div className="flex min-h-screen flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-white/5 bg-night-900/70 px-6 py-4 backdrop-blur-xl">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-white/40">Admin</p>
            <h1 className="text-lg font-semibold text-white">{pageTitle}</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right text-sm">
              <p className="text-white">Equipe Contoso</p>
              <p className="text-xs text-white/50">admin@contoso.com</p>
            </div>
            <div className="h-10 w-10 rounded-full border border-white/10 bg-gradient-to-br from-neon-blue/30 to-neon-green/30" />
          </div>
        </header>
        <main className="flex-1 space-y-6 px-6 py-8">{children}</main>
      </div>
    </div>
  );
}
