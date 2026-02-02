import { useMemo, useState } from 'react';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Input } from '../components/Input';
import { Select } from '../components/Select';
import { Table } from '../components/Table';
import { tenants } from '../lib/mockData';

export function Tenants() {
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('Todos');

  const filtered = useMemo(() => {
    return tenants.filter((tenant) => {
      const matchesQuery = tenant.name.toLowerCase().includes(query.toLowerCase());
      const matchesStatus = statusFilter === 'Todos' || tenant.status === statusFilter;
      return matchesQuery && matchesStatus;
    });
  }, [query, statusFilter]);

  return (
    <div className="space-y-6">
      <Card className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold text-white">Tenants conectados</p>
          <p className="text-xs text-white/50">Gerencie acesso e autorizações ativas.</p>
        </div>
        <div className="flex flex-1 flex-col gap-3 md:flex-row md:items-center md:justify-end">
          <Input
            className="md:max-w-xs"
            placeholder="Buscar tenant"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <Select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
            <option value="Todos">Todos os status</option>
            <option value="Conectado">Conectado</option>
            <option value="Pendente">Pendente</option>
            <option value="Falha">Falha</option>
          </Select>
        </div>
      </Card>

      <Table headers={['Tenant', 'Domínio', 'Status', 'Último backup', 'Ações']}>
        {filtered.map((tenant) => (
          <tr key={tenant.id} className="text-white/70">
            <td className="px-4 py-3">
              <p className="font-semibold text-white">{tenant.name}</p>
            </td>
            <td className="px-4 py-3">{tenant.domain}</td>
            <td className="px-4 py-3">
              <Badge
                tone={tenant.status === 'Conectado' ? 'success' : tenant.status === 'Pendente' ? 'warning' : 'danger'}
              >
                {tenant.status}
              </Badge>
            </td>
            <td className="px-4 py-3">{tenant.lastBackup}</td>
            <td className="px-4 py-3">
              <div className="flex flex-wrap gap-2">
                <Button variant="secondary">Ver detalhes</Button>
                <Button variant="ghost">Desconectar</Button>
                <Button variant="ghost">Reautorizar</Button>
              </div>
            </td>
          </tr>
        ))}
      </Table>
    </div>
  );
}
