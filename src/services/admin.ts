import http from './http';
import { Role } from '../types';

// Admin-related API stubs
export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: Role;
  status: 'active' | 'locked';
  lastLogin?: string;
  createdAt?: string;
}

export interface RolePermissionMatrix {
  role: Role;
  permissions: string[];
}

export const adminService = {
  // Users
  listUsers: (params?: { search?: string; role?: Role; status?: string }) => http.get('/admin/users', { params }),
  createUser: (payload: Partial<AdminUser>) => http.post('/admin/users', payload),
  updateUser: (id: string, payload: Partial<AdminUser>) => http.put(`/admin/users/${id}`, payload),
  lockUser: (id: string) => http.post(`/admin/users/${id}/lock`, {}),
  unlockUser: (id: string) => http.post(`/admin/users/${id}/unlock`, {}),
  resetPassword: (id: string) => http.post(`/admin/users/${id}/reset-password`, {}),

  // Roles & permissions
  getRoleMatrix: () => http.get('/admin/roles/matrix'),
  updateRolePermissions: (role: Role, permissions: string[]) => http.put(`/admin/roles/${role}`, { permissions }),

  // Analytics (dashboard)
  dashboardStats: () => http.get('/admin/analytics/dashboard'),
  trendUsers: (range: string) => http.get('/admin/analytics/users', { params: { range } }),
  trendRevenue: (range: string) => http.get('/admin/analytics/revenue', { params: { range } }),

  // Notifications templates
  listTemplates: () => http.get('/admin/notification-templates'),
  updateTemplate: (id: string, payload: { subject: string; body: string }) => http.put(`/admin/notification-templates/${id}`, payload),
  sendTestTemplate: (id: string, to: string) => http.post(`/admin/notification-templates/${id}/test`, { to }),

  // Settings / System
  getSettings: () => http.get('/admin/settings'),
  updateSettings: (payload: any) => http.put('/admin/settings', payload),
  toggleMaintenance: (enabled: boolean) => http.post('/admin/settings/maintenance', { enabled }),
  triggerBackup: () => http.post('/admin/system/backup', {}),
  getSecurityAlerts: () => http.get('/admin/security/alerts'),
};

export default adminService;