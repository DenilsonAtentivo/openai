import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteSchedule, listSchedules, updateSchedule } from '../api/services';
import { DataTable } from '../components/DataTable';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import type { Schedule } from '../types';

export function SchedulesPage() {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const navigate = useNavigate();
  const load = () => listSchedules().then(setSchedules);
  useEffect(() => { load(); }, []);

  return (
    <div className="space-y-3">
      <div className="flex justify-between"><h2 className="text-xl font-semibold">Schedules</h2><Button onClick={() => navigate('/schedules/new')}>Novo Job</Button></div>
      {schedules.length === 0 ? <p className="text-slate-400">Nenhum job encontrado.</p> : (
        <DataTable
          data={schedules}
          columns={[
            { key: 'name', label: 'Nome' },
            { key: 'type', label: 'Tipo' },
            { key: 'frequency', label: 'Frequência' },
            { key: 'enabled', label: 'Status', render: (r) => <Badge tone={r.enabled ? 'success' : 'warn'}>{r.enabled ? 'Ativo' : 'Pausado'}</Badge> },
            { key: 'id', label: 'Ações', render: (r) => <div className="flex gap-2"><Button variant="ghost" onClick={() => updateSchedule(r.id, { enabled: !r.enabled }).then(load)}>{r.enabled ? 'Pausar' : 'Ativar'}</Button><Button variant="danger" onClick={() => deleteSchedule(r.id).then(load)}>Excluir</Button></div> }
          ]}
        />
      )}
    </div>
  );
}
