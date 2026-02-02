import {
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';
import { Badge } from '../components/Badge';
import { Card } from '../components/Card';
import { Table } from '../components/Table';
import { backupByService, failuresByDay, jobs } from '../lib/mockData';

const pieColors = ['#5aa7ff', '#5ee6a8', '#ff7a00'];

export function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          { label: 'Tenants conectados', value: '128', tone: 'info' },
          { label: 'Jobs nas últimas 24h', value: '1.248', tone: 'success' },
          { label: 'Falhas', value: '12', tone: 'danger' },
          { label: 'Storage usado', value: '48.2 TB', tone: 'warning' }
        ].map((item) => (
          <Card key={item.label}>
            <p className="text-xs uppercase tracking-widest text-white/40">{item.label}</p>
            <div className="mt-4 flex items-center justify-between">
              <p className="text-2xl font-semibold text-white">{item.value}</p>
              <Badge tone={item.tone as 'info' | 'success' | 'danger' | 'warning'}>Hoje</Badge>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <Card className="h-full">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-white">Backups por serviço</p>
              <p className="text-xs text-white/50">Últimas 24 horas</p>
            </div>
            <Badge tone="info">Realtime</Badge>
          </div>
          <div className="mt-6 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={backupByService} dataKey="value" nameKey="name" innerRadius={60} outerRadius={90}>
                  {backupByService.map((entry, index) => (
                    <Cell key={entry.name} fill={pieColors[index % pieColors.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: '#0b0f17',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    color: '#fff'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="h-full">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-white">Falhas por dia</p>
              <p className="text-xs text-white/50">Semana atual</p>
            </div>
            <Badge tone="warning">Atenção</Badge>
          </div>
          <div className="mt-6 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={failuresByDay}>
                <XAxis dataKey="day" stroke="#7f8ea3" />
                <YAxis stroke="#7f8ea3" />
                <Tooltip
                  contentStyle={{
                    background: '#0b0f17',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    color: '#fff'
                  }}
                />
                <Bar dataKey="value" fill="#ff5f6d" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <Card>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-white">Últimos Jobs</p>
            <p className="text-xs text-white/50">Histórico recente</p>
          </div>
          <Badge tone="info">Atualizado agora</Badge>
        </div>
        <div className="mt-4">
          <Table headers={['Status', 'Serviço', 'Tenant', 'Duração', 'Data']}>
            {jobs.map((job) => (
              <tr key={job.id} className="text-white/70">
                <td className="px-4 py-3">
                  <Badge
                    tone={
                      job.status === 'Success' ? 'success' : job.status === 'Warning' ? 'warning' : 'danger'
                    }
                  >
                    {job.status}
                  </Badge>
                </td>
                <td className="px-4 py-3">{job.service}</td>
                <td className="px-4 py-3">{job.tenant}</td>
                <td className="px-4 py-3">{job.duration}</td>
                <td className="px-4 py-3">{job.date}</td>
              </tr>
            ))}
          </Table>
        </div>
      </Card>
    </div>
  );
}
