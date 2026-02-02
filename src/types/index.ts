export type StatusTone = 'success' | 'warning' | 'danger' | 'info';

export interface Tenant {
  id: string;
  name: string;
  domain: string;
  status: 'Conectado' | 'Pendente' | 'Falha';
  lastBackup: string;
}

export interface Job {
  id: string;
  service: 'SharePoint' | 'OneDrive' | 'Email';
  tenant: string;
  status: 'Success' | 'Warning' | 'Failed';
  duration: string;
  date: string;
}
