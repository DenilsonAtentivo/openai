import { useEffect, useState } from 'react';
import { connectM365, disconnectM365, getConnectionStatus, listLogs } from '../api/services';
import { ConnectionCard } from '../components/ConnectionCard';
import { Card } from '../components/ui/Card';
import type { LogItem, M365Connection } from '../types';

export function SettingsPage() {
  const [connection, setConnection] = useState<M365Connection>({ status: 'disconnected' });
  const [logs, setLogs] = useState<LogItem[]>([]);
  useEffect(() => { getConnectionStatus().then(setConnection); listLogs().then(setLogs); }, []);

  return (
    <div className="space-y-4">
      <ConnectionCard status={connection} onConnect={async () => {
        setConnection({ ...connection, status: 'connecting' });
        const next = await connectM365();
        setConnection(next);
      }} onDisconnect={() => disconnectM365().then(setConnection)} />

      <Card className="space-y-3">
        <h3 className="text-lg font-semibold">Armazenamento</h3>
        <div className="grid gap-3 md:grid-cols-2">
          <select className="rounded bg-slate-800 px-3 py-2"><option>S3</option><option>Azure Blob</option></select>
          <input className="rounded bg-slate-800 px-3 py-2" placeholder="bucket/container" />
        </div>
      </Card>

      <Card className="space-y-3">
        <h3 className="text-lg font-semibold">Segurança</h3>
        <label className="flex items-center gap-2"><input type="checkbox" defaultChecked /> MFA obrigatório</label>
        <button className="rounded border border-slate-700 px-3 py-2">Rotação de token (mock)</button>
      </Card>

      <Card>
        <h3 className="mb-2 text-lg font-semibold">Logs recentes</h3>
        {logs.map((log) => <p key={log.id} className="text-sm text-slate-300">[{new Date(log.timestamp).toLocaleString()}] {log.level.toUpperCase()} - {log.message}</p>)}
      </Card>
    </div>
  );
}
