import { useMemo, useState } from 'react';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Select } from '../components/Select';
import { Table } from '../components/Table';
import { jobs } from '../lib/mockData';

const PAGE_SIZE = 3;

export function Jobs() {
  const [serviceFilter, setServiceFilter] = useState('Todos');
  const [statusFilter, setStatusFilter] = useState('Todos');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return jobs.filter((job) => {
      const matchesService = serviceFilter === 'Todos' || job.service === serviceFilter;
      const matchesStatus = statusFilter === 'Todos' || job.status === statusFilter;
      return matchesService && matchesStatus;
    });
  }, [serviceFilter, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageData = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="space-y-6">
      <Card className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold text-white">Jobs de backup</p>
          <p className="text-xs text-white/50">Paginação e filtros simulados.</p>
        </div>
        <div className="flex flex-1 flex-col gap-3 md:flex-row md:items-center md:justify-end">
          <Select value={serviceFilter} onChange={(event) => setServiceFilter(event.target.value)}>
            <option value="Todos">Todos os serviços</option>
            <option value="SharePoint">SharePoint</option>
            <option value="OneDrive">OneDrive</option>
            <option value="Email">Email</option>
          </Select>
          <Select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
            <option value="Todos">Todos os status</option>
            <option value="Success">Success</option>
            <option value="Warning">Warning</option>
            <option value="Failed">Failed</option>
          </Select>
        </div>
      </Card>

      <Table headers={['Status', 'Serviço', 'Tenant', 'Duração', 'Data']}>
        {pageData.map((job) => (
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

      <div className="flex items-center justify-between text-sm text-white/60">
        <p>
          Página {page} de {totalPages}
        </p>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={() => setPage((prev) => Math.max(1, prev - 1))}>
            Anterior
          </Button>
          <Button variant="secondary" onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}>
            Próxima
          </Button>
        </div>
      </div>
    </div>
  );
}
