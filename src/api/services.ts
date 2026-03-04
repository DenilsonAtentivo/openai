import {
  backupByDaySeed,
  connectionSeed,
  dashboardMetricsSeed,
  logsSeed,
  mailboxesSeed,
  recentExecutionsSeed,
  schedulesSeed,
  toScheduleFromPayload,
  treeNodesSeed
} from '../data/mockData';
import type { M365Connection, Schedule, SchedulePayload, ScheduleType, TreeNode } from '../types';
import { mockRequest } from './client';

let schedulesState = [...schedulesSeed];

export const getDashboardMetrics = () => mockRequest(() => ({ metrics: dashboardMetricsSeed, backupsByDay: backupByDaySeed, recentExecutions: recentExecutionsSeed }));
export const listSchedules = () => mockRequest(() => schedulesState);
export const createSchedule = (payload: SchedulePayload) => mockRequest(() => {
  const newSchedule = toScheduleFromPayload(payload);
  schedulesState = [newSchedule, ...schedulesState];
  return newSchedule;
});
export const updateSchedule = (id: string, partial: Partial<Schedule>) => mockRequest(() => {
  schedulesState = schedulesState.map((schedule) => schedule.id === id ? { ...schedule, ...partial, updatedAt: new Date().toISOString() } : schedule);
  return schedulesState.find((s) => s.id === id)!;
});
export const deleteSchedule = (id: string) => mockRequest(() => { schedulesState = schedulesState.filter((s) => s.id !== id); return { ok: true }; });
export const getTreeNodes = (parentId: string | null, type: ScheduleType) => mockRequest<TreeNode[]>(() => treeNodesSeed.filter((node) => node.parentId === parentId && node.type === type));
export const listMailboxes = (page: number, search = '', pageSize = 10) => mockRequest(() => {
  const filtered = mailboxesSeed.filter((mailbox) => `${mailbox.displayName} ${mailbox.email}`.toLowerCase().includes(search.toLowerCase()));
  return { items: filtered.slice((page - 1) * pageSize, page * pageSize), total: filtered.length };
});
export const getConnectionStatus = () => mockRequest<M365Connection>(() => connectionSeed);
export const connectM365 = () => mockRequest<M365Connection>(() => {
  connectionSeed.status = 'connected'; connectionSeed.tenantName = 'Contoso LTDA'; connectionSeed.tenantId = 'f7f4fa6f-0f0e-47f7-94c3-a111e11b0112'; connectionSeed.connectedAt = new Date().toISOString(); return connectionSeed;
}, 900);
export const disconnectM365 = () => mockRequest<M365Connection>(() => { connectionSeed.status = 'disconnected'; connectionSeed.tenantName = undefined; connectionSeed.tenantId = undefined; connectionSeed.connectedAt = undefined; return connectionSeed; });
export const listLogs = () => mockRequest(() => logsSeed);
