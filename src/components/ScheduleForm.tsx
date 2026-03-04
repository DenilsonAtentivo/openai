import { useEffect, useState } from 'react';
import { listMailboxes } from '../api/services';
import type { Mailbox, SchedulePayload, ScheduleType } from '../types';
import { TreePicker } from './TreePicker';
import { Button } from './ui/Button';
import { Card } from './ui/Card';

const initial: SchedulePayload = {
  name: '', type: 'SharePoint', frequency: 'daily', timezone: 'America/Sao_Paulo', retentionDays: 90,
  notifications: ['email'], selectedNodeIds: [], mailboxIds: []
};

export function ScheduleForm({ onSubmit }: { onSubmit: (payload: SchedulePayload) => Promise<void> }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<SchedulePayload>(initial);
  const [mailboxes, setMailboxes] = useState<Mailbox[]>([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (form.type === 'Exchange') {
      listMailboxes(page, search).then((r) => { setMailboxes(r.items); setTotal(r.total); });
    }
  }, [form.type, page, search]);

  const canGoNext = form.name.trim().length > 2;

  return (
    <Card className="space-y-4">
      <p className="text-sm text-slate-400">Etapa {step} de 4</p>
      {step === 1 && (
        <div className="grid gap-3 md:grid-cols-2">
          <input className="rounded bg-slate-800 px-3 py-2" placeholder="Nome do job" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <select className="rounded bg-slate-800 px-3 py-2" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value as ScheduleType })}>
            <option>SharePoint</option><option>OneDrive</option><option>Exchange</option>
          </select>
          <select className="rounded bg-slate-800 px-3 py-2" value={form.frequency} onChange={(e) => setForm({ ...form, frequency: e.target.value as any })}>
            <option value="daily">Daily</option><option value="weekly">Weekly</option><option value="custom">Custom cron</option>
          </select>
          <input className="rounded bg-slate-800 px-3 py-2" value={form.timezone} onChange={(e) => setForm({ ...form, timezone: e.target.value })} />
          {form.frequency === 'custom' && <input className="rounded bg-slate-800 px-3 py-2 md:col-span-2" placeholder="Cron expression" value={form.cronExpression || ''} onChange={(e) => setForm({ ...form, cronExpression: e.target.value })} />}
        </div>
      )}

      {step === 2 && form.type !== 'Exchange' && <TreePicker type={form.type} selected={form.selectedNodeIds} onChange={(ids) => setForm({ ...form, selectedNodeIds: ids })} />}

      {step === 2 && form.type === 'Exchange' && (
        <div>
          <input className="mb-2 w-full rounded bg-slate-800 px-3 py-2" placeholder="Buscar mailbox" value={search} onChange={(e) => setSearch(e.target.value)} />
          {mailboxes.map((mb) => (
            <label key={mb.id} className="flex items-center gap-2 py-1 text-sm">
              <input type="checkbox" checked={form.mailboxIds.includes(mb.id)} onChange={() => setForm((p) => ({ ...p, mailboxIds: p.mailboxIds.includes(mb.id) ? p.mailboxIds.filter((x) => x !== mb.id) : [...p.mailboxIds, mb.id] }))} />
              {mb.displayName} ({mb.email})
            </label>
          ))}
          <div className="mt-2 flex gap-2 text-xs"><Button variant="ghost" onClick={() => setPage((p) => Math.max(1, p - 1))}>Anterior</Button><Button variant="ghost" onClick={() => setPage((p) => p + 1)}>Próxima</Button><span className="self-center text-slate-400">total {total}</span></div>
        </div>
      )}

      {step === 3 && (
        <div className="grid gap-3 md:grid-cols-2">
          <select className="rounded bg-slate-800 px-3 py-2" value={form.retentionDays} onChange={(e) => setForm({ ...form, retentionDays: Number(e.target.value) as any })}>
            {[30, 60, 90, 180, 365].map((d) => <option key={d} value={d}>{d} dias</option>)}
          </select>
          <div className="flex items-center gap-3 text-sm">
            <label><input type="checkbox" checked={form.notifications.includes('email')} onChange={() => setForm((p) => ({ ...p, notifications: p.notifications.includes('email') ? p.notifications.filter((n) => n !== 'email') : [...p.notifications, 'email'] }))} /> Email</label>
            <label><input type="checkbox" checked={form.notifications.includes('slack')} onChange={() => setForm((p) => ({ ...p, notifications: p.notifications.includes('slack') ? p.notifications.filter((n) => n !== 'slack') : [...p.notifications, 'slack'] }))} /> Slack</label>
          </div>
        </div>
      )}

      {step === 4 && <pre className="rounded bg-slate-950 p-3 text-xs">{JSON.stringify(form, null, 2)}</pre>}

      <div className="flex justify-between">
        <Button variant="ghost" onClick={() => setStep((s) => Math.max(1, s - 1))}>Voltar</Button>
        {step < 4 ? <Button disabled={!canGoNext} onClick={() => setStep((s) => s + 1)}>Próxima</Button> : <Button onClick={() => onSubmit(form)}>Criar job</Button>}
      </div>
    </Card>
  );
}
