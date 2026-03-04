import type {
  BackupDayPoint,
  BackupExecution,
  DashboardMetrics,
  LogItem,
  M365Connection,
  Mailbox,
  Schedule,
  SchedulePayload,
  TreeNode
} from '../types';

export const dashboardMetricsSeed: DashboardMetrics = {
  lastBackupCompleted: '2026-03-03T22:14:00Z',
  activeScheduledJobs: 12,
  totalStorageTb: 18.4,
  protectedItems: 28492
};

export const backupByDaySeed: BackupDayPoint[] = Array.from({ length: 14 }).map((_, idx) => ({
  date: `D-${13 - idx}`,
  jobs: 18 + Math.floor(Math.random() * 14)
}));

export const recentExecutionsSeed: BackupExecution[] = [
  { id: 'run_001', startedAt: '2026-03-03T22:14:00Z', status: 'Success', duration: '11m 20s', origin: 'SPO' },
  { id: 'run_002', startedAt: '2026-03-03T21:50:00Z', status: 'Running', duration: '5m 10s', origin: 'OD' },
  { id: 'run_003', startedAt: '2026-03-03T20:00:00Z', status: 'Failed', duration: '2m 02s', origin: 'EXO' },
  { id: 'run_004', startedAt: '2026-03-03T19:10:00Z', status: 'Success', duration: '13m 44s', origin: 'OD' }
];

export let schedulesSeed: Schedule[] = [
  {
    id: 'sch_1', name: 'Backup SPO financeiro', type: 'SharePoint', frequency: 'daily', timezone: 'America/Sao_Paulo',
    retentionDays: 90, notifications: ['email'], enabled: true, targetCount: 18, updatedAt: '2026-03-03T22:20:00Z'
  },
  {
    id: 'sch_2', name: 'Executivos OneDrive', type: 'OneDrive', frequency: 'weekly', timezone: 'America/Sao_Paulo',
    retentionDays: 180, notifications: ['email', 'slack'], enabled: false, targetCount: 53, updatedAt: '2026-03-02T13:00:00Z'
  }
];

export const toScheduleFromPayload = (payload: SchedulePayload): Schedule => ({
  id: `sch_${Date.now()}`,
  name: payload.name,
  type: payload.type,
  frequency: payload.frequency,
  timezone: payload.timezone,
  retentionDays: payload.retentionDays,
  notifications: payload.notifications,
  enabled: true,
  targetCount: payload.type === 'Exchange' ? payload.mailboxIds.length : payload.selectedNodeIds.length,
  updatedAt: new Date().toISOString()
});

export const treeNodesSeed: TreeNode[] = [
  { id: 'tenant-1', parentId: null, label: 'Contoso Tenant', kind: 'tenant', hasChildren: true, type: 'SharePoint' },
  { id: 'site-1', parentId: 'tenant-1', label: 'Financeiro', kind: 'site', hasChildren: true, type: 'SharePoint' },
  { id: 'lib-1', parentId: 'site-1', label: 'Documents', kind: 'library', hasChildren: true, type: 'SharePoint' },
  { id: 'folder-1', parentId: 'lib-1', label: '2026', kind: 'folder', hasChildren: true, type: 'SharePoint' },
  { id: 'file-1', parentId: 'folder-1', label: 'budget.xlsx', kind: 'file', hasChildren: false, type: 'SharePoint' },
  { id: 'drive-root', parentId: null, label: 'OneDrive', kind: 'drive', hasChildren: true, type: 'OneDrive' },
  { id: 'user-1', parentId: 'drive-root', label: 'ana.silva', kind: 'user', hasChildren: true, type: 'OneDrive' },
  { id: 'root-1', parentId: 'user-1', label: 'Root', kind: 'root', hasChildren: true, type: 'OneDrive' },
  { id: 'od-folder-1', parentId: 'root-1', label: 'Projetos', kind: 'folder', hasChildren: true, type: 'OneDrive' },
  { id: 'od-file-1', parentId: 'od-folder-1', label: 'roadmap.docx', kind: 'file', hasChildren: false, type: 'OneDrive' }
];

export const mailboxesSeed: Mailbox[] = Array.from({ length: 58 }).map((_, i) => ({
  id: `mb_${i + 1}`,
  displayName: `Usuário ${i + 1}`,
  email: `usuario${i + 1}@contoso.com`
}));

export let connectionSeed: M365Connection = { status: 'disconnected' };

export const logsSeed: LogItem[] = [
  { id: 'log1', timestamp: '2026-03-03T22:14:00Z', level: 'info', message: 'Backup SharePoint concluído.' },
  { id: 'log2', timestamp: '2026-03-03T20:00:00Z', level: 'error', message: 'Falha no mailbox Exchange mb_12.' },
  { id: 'log3', timestamp: '2026-03-03T19:45:00Z', level: 'warn', message: 'Throttle detectado no Graph API.' }
];
