import { useEffect, useMemo, useState } from 'react';
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { getDashboardMetrics } from '../api/services';
import { DataTable } from '../components/DataTable';
import { StatCard } from '../components/StatCard';
import { Badge } from '../components/ui/Badge';
import type { BackupExecution, RunStatus } from '../types';

export function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<RunStatus | 'all'>('all');
  const [period, setPeriod] = useState('14d');
  const [data, setData] = useState<any>(null);

  useEffect(() => { getDashboardMetrics().then((r) => { setData(r); setLoading(false); }); }, []);

  const rows: BackupExecution[] = useMemo(() => data?.recentExecutions?.filter((x: BackupExecution) => statusFilter === 'all' || x.status === statusFilter) || [], [data, statusFilter]);
  if (loading) return <p>Carregando dashboard...</p>;

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard title="Último backup concluído" value={new Date(data.metrics.lastBackupCompleted).toLocaleString()} />
        <StatCard title="Jobs agendados ativos" value={String(data.metrics.activeScheduledJobs)} />
        <StatCard title="Tamanho total armazenado" value={`${data.metrics.totalStorageTb} TB`} />
        <StatCard title="Itens protegidos" value={data.metrics.protectedItems.toLocaleString()} />
      </div>
      <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">
        <h3 className="mb-3 font-semibold">Backups por dia</h3>
        <ResponsiveContainer width="100%" height={250}><BarChart data={data.backupsByDay}><XAxis dataKey="date" /><YAxis /><Tooltip /><Bar dataKey="jobs" fill="#34d399" radius={[4,4,0,0]} /></BarChart></ResponsiveContainer>
      </div>
      <div className="space-y-2">
        <div className="flex gap-2">
          <select className="rounded bg-slate-800 px-2 py-1" value={period} onChange={(e) => setPeriod(e.target.value)}><option value="7d">7 dias</option><option value="14d">14 dias</option></select>
          <select className="rounded bg-slate-800 px-2 py-1" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as any)}><option value="all">Todos status</option><option value="Success">Success</option><option value="Running">Running</option><option value="Failed">Failed</option></select>
        </div>
        <DataTable
          data={rows}
          columns={[
            { key: 'startedAt', label: 'Início', render: (r) => new Date(r.startedAt).toLocaleString() },
            { key: 'status', label: 'Status', render: (r) => <Badge tone={r.status === 'Success' ? 'success' : r.status === 'Running' ? 'warn' : 'error'}>{r.status}</Badge> },
            { key: 'duration', label: 'Duração' },
            { key: 'origin', label: 'Origem' }
          ]}
        />
      </div>
    </div>
  );
}
