import { useNavigate } from 'react-router-dom';
import { createSchedule } from '../api/services';
import { ScheduleForm } from '../components/ScheduleForm';

export function ScheduleNewPage() {
  const navigate = useNavigate();
  return (
    <div className="space-y-3">
      <h2 className="text-xl font-semibold">Novo Job de Backup</h2>
      <ScheduleForm onSubmit={async (payload) => { await createSchedule(payload); navigate('/schedules'); }} />
    </div>
  );
}
