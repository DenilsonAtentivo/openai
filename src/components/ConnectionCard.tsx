import type { M365Connection } from '../types';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';
import { Card } from './ui/Card';

export function ConnectionCard({
  status,
  onConnect,
  onDisconnect
}: {
  status: M365Connection;
  onConnect: () => void;
  onDisconnect: () => void;
}) {
  return (
    <Card className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Conexão Microsoft 365</h3>
        <Badge tone={status.status === 'connected' ? 'success' : status.status === 'connecting' ? 'warn' : 'error'}>
          {status.status}
        </Badge>
      </div>
      {status.status === 'connected' && (
        <div className="text-sm text-slate-300">
          <p>Tenant Name: {status.tenantName}</p>
          <p>Tenant ID: {status.tenantId}</p>
          <p>Connected at: {new Date(status.connectedAt || '').toLocaleString()}</p>
        </div>
      )}
      <div className="flex gap-2">
        <Button onClick={onConnect}>{status.status === 'connected' ? 'Reconectar' : 'Conectar ao Microsoft 365'}</Button>
        <Button variant="ghost" onClick={onDisconnect}>Desconectar</Button>
      </div>
    </Card>
  );
}
