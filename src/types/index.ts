export type BackupOrigin = 'SPO' | 'OD' | 'EXO';
export type RunStatus = 'Success' | 'Running' | 'Failed';

export interface DashboardMetrics {
  lastBackupCompleted: string;
  activeScheduledJobs: number;
  totalStorageTb: number;
  protectedItems: number;
}

export interface BackupDayPoint {
  date: string;
  jobs: number;
}

export interface BackupExecution {
  id: string;
  startedAt: string;
  status: RunStatus;
  duration: string;
  origin: BackupOrigin;
}

export type ScheduleType = 'SharePoint' | 'OneDrive' | 'Exchange';
export type Frequency = 'daily' | 'weekly' | 'custom';

export interface Schedule {
  id: string;
  name: string;
  type: ScheduleType;
  frequency: Frequency;
  timezone: string;
  retentionDays: 30 | 60 | 90 | 180 | 365;
  notifications: Array<'email' | 'slack'>;
  enabled: boolean;
  targetCount: number;
  updatedAt: string;
}

export interface SchedulePayload {
  name: string;
  type: ScheduleType;
  frequency: Frequency;
  cronExpression?: string;
  timezone: string;
  retentionDays: 30 | 60 | 90 | 180 | 365;
  notifications: Array<'email' | 'slack'>;
  selectedNodeIds: string[];
  mailboxIds: string[];
}

export interface TreeNode {
  id: string;
  parentId: string | null;
  label: string;
  kind: 'tenant' | 'site' | 'library' | 'folder' | 'file' | 'drive' | 'user' | 'root';
  hasChildren: boolean;
  type: 'SharePoint' | 'OneDrive';
}

export interface Mailbox {
  id: string;
  displayName: string;
  email: string;
}

export interface M365Connection {
  status: 'disconnected' | 'connecting' | 'connected';
  tenantName?: string;
  tenantId?: string;
  connectedAt?: string;
}

export interface LogItem {
  id: string;
  timestamp: string;
  level: 'info' | 'warn' | 'error';
  message: string;
}
