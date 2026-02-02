import { Job, Tenant } from '../types';

export const tenants: Tenant[] = [
  {
    id: 't-001',
    name: 'Contoso Ltda',
    domain: 'contoso.onmicrosoft.com',
    status: 'Conectado',
    lastBackup: 'Hoje, 14:32'
  },
  {
    id: 't-002',
    name: 'Fabrikam Brasil',
    domain: 'fabrikam.onmicrosoft.com',
    status: 'Pendente',
    lastBackup: 'Ontem, 23:11'
  },
  {
    id: 't-003',
    name: 'Northwind Traders',
    domain: 'northwind.onmicrosoft.com',
    status: 'Conectado',
    lastBackup: 'Hoje, 09:04'
  },
  {
    id: 't-004',
    name: 'Adventure Works',
    domain: 'adventure.onmicrosoft.com',
    status: 'Falha',
    lastBackup: 'Há 2 dias'
  }
];

export const jobs: Job[] = [
  {
    id: 'job-1001',
    service: 'SharePoint',
    tenant: 'Contoso Ltda',
    status: 'Success',
    duration: '18m 12s',
    date: '2024-08-12 14:31'
  },
  {
    id: 'job-1002',
    service: 'OneDrive',
    tenant: 'Fabrikam Brasil',
    status: 'Warning',
    duration: '26m 03s',
    date: '2024-08-12 13:55'
  },
  {
    id: 'job-1003',
    service: 'Email',
    tenant: 'Northwind Traders',
    status: 'Success',
    duration: '12m 50s',
    date: '2024-08-12 12:40'
  },
  {
    id: 'job-1004',
    service: 'SharePoint',
    tenant: 'Adventure Works',
    status: 'Failed',
    duration: '9m 11s',
    date: '2024-08-12 12:10'
  }
];

export const backupByService = [
  { name: 'SharePoint', value: 42 },
  { name: 'OneDrive', value: 35 },
  { name: 'Email', value: 28 }
];

export const failuresByDay = [
  { day: 'Seg', value: 2 },
  { day: 'Ter', value: 1 },
  { day: 'Qua', value: 3 },
  { day: 'Qui', value: 0 },
  { day: 'Sex', value: 2 },
  { day: 'Sáb', value: 1 },
  { day: 'Dom', value: 0 }
];
