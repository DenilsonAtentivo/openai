import { PlusCircle } from 'lucide-react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/appStore';
import { Button } from '../components/ui/Button';

const navItems = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/schedules', label: 'Schedules' },
  { to: '/settings', label: 'Settings' }
];

export function AppLayout() {
  const navigate = useNavigate();
  const { tenant, setTenant } = useAppStore();
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="grid min-h-screen grid-cols-[240px_1fr]">
        <aside className="border-r border-slate-800 p-4">
          <h1 className="mb-8 text-xl font-semibold text-emerald-300">M365 Backup SaaS</h1>
          <nav className="space-y-2">
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} className={({ isActive }) => `block rounded px-3 py-2 ${isActive ? 'bg-emerald-500/20 text-emerald-300' : 'text-slate-300 hover:bg-slate-800'}`}>
                {item.label}
              </NavLink>
            ))}
          </nav>
        </aside>
        <main>
          <header className="flex items-center justify-between border-b border-slate-800 p-4">
            <select className="rounded bg-slate-800 px-2 py-1" value={tenant} onChange={(e) => setTenant(e.target.value)}>
              <option>Contoso LTDA</option><option>Northwind</option>
            </select>
            <div className="flex items-center gap-2">
              <Button onClick={() => navigate('/schedules/new')}><PlusCircle size={16} className="inline" /> Create Job</Button>
              <div className="rounded-full bg-slate-700 px-3 py-1 text-sm">JD</div>
            </div>
          </header>
          <div className="p-6"><Outlet /></div>
        </main>
      </div>
    </div>
  );
}
