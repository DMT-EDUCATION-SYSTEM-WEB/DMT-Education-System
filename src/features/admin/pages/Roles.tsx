import React, { useEffect, useState } from 'react';
import { adminService } from '../../../services/admin';
import { Role, PermissionGroup } from '../../../types';
import Button from '../../../components/common/Button';

const defaultGroups: PermissionGroup[] = [
  {
    key: 'users',
    label: 'Người dùng',
    permissions: [
      { key: 'users.view', label: 'Xem' },
      { key: 'users.create', label: 'Tạo' },
      { key: 'users.update', label: 'Sửa' },
      { key: 'users.lock', label: 'Khóa/Mở' },
    ],
  },
  {
    key: 'courses',
    label: 'Khóa học',
    permissions: [
      { key: 'courses.view', label: 'Xem' },
      { key: 'courses.manage', label: 'Quản lý' },
    ],
  },
  {
    key: 'assignments',
    label: 'Bài tập',
    permissions: [
      { key: 'assignments.view', label: 'Xem' },
      { key: 'assignments.grade', label: 'Chấm' },
    ],
  },
  {
    key: 'reports',
    label: 'Báo cáo',
    permissions: [
      { key: 'reports.view', label: 'Xem' },
      { key: 'reports.export', label: 'Export' },
    ],
  },
  {
    key: 'system',
    label: 'Hệ thống',
    permissions: [
      { key: 'system.settings', label: 'Cài đặt' },
      { key: 'system.maintenance', label: 'Bảo trì' },
      { key: 'system.backup', label: 'Backup/Restore' },
    ],
  },
];

const rolesList: Role[] = [Role.ADMIN, Role.TEACHER, Role.STAFF];

interface MatrixState { [role: string]: Set<string>; }

const Roles: React.FC = () => {
  const [matrix, setMatrix] = useState<MatrixState>({});
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true); setError(null);
      try {
        const res: any = await adminService.getRoleMatrix();
        const rows = Array.isArray(res?.data) ? res.data : Array.isArray(res) ? res : [];
        const built: MatrixState = {};
        rolesList.forEach(r => { built[r] = new Set(); });
        rows.forEach((row: any) => { if (row?.role) built[row.role] = new Set(row.permissions || []); });
        setMatrix(built);
      } catch (e: any) {
        setError(e?.message || 'Không thể tải roles');
      } finally { setLoading(false); }
    };
    load();
  }, []);

  const toggle = (role: Role, perm: string) => {
    setMatrix(prev => {
      const copy: MatrixState = { ...prev };
      const set = new Set(copy[role] || []);
      set.has(perm) ? set.delete(perm) : set.add(perm);
      copy[role] = set;
      return copy;
    });
    setSaved(false);
  };

  const setAllGroup = (role: Role, group: PermissionGroup, value: boolean) => {
    setMatrix(prev => {
      const copy: MatrixState = { ...prev };
      const set = new Set(copy[role] || []);
      group.permissions.forEach(p => { value ? set.add(p.key) : set.delete(p.key); });
      copy[role] = set;
      return copy;
    });
    setSaved(false);
  };

  const save = async () => {
    setSaving(true); setError(null); setSaved(false);
    try {
      for (const role of rolesList) {
        await adminService.updateRolePermissions(role, Array.from(matrix[role] || []));
      }
      setSaved(true);
    } catch (e: any) {
      setError(e?.message || 'Lưu thất bại');
    } finally { setSaving(false); }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-gray-900">Phân quyền</h1>
        <p className="text-sm text-gray-600">Quản lý quyền chi tiết theo vai trò.</p>
      </div>

      {loading && <div className="text-sm text-gray-500">Đang tải...</div>}
      {error && <div className="text-sm text-red-600">{error}</div>}

      {!loading && (
        <div className="overflow-x-auto">
          <table className="table text-sm">
            <thead>
              <tr>
                <th className="min-w-[180px]">Nhóm quyền</th>
                {rolesList.map(r => <th key={r} className="text-center capitalize">{r}</th>)}
              </tr>
            </thead>
            <tbody>
              {defaultGroups.map(group => (
                <React.Fragment key={group.key}>
                  <tr className="bg-gray-50">
                    <td className="font-medium">{group.label}</td>
                    {rolesList.map(r => {
                      const allChecked = group.permissions.every(p => matrix[r]?.has(p.key));
                      return (
                        <td key={r} className="text-center">
                          <input
                            type="checkbox"
                            checked={allChecked}
                            onChange={(e) => setAllGroup(r, group, e.target.checked)}
                          />
                        </td>
                      );
                    })}
                  </tr>
                  {group.permissions.map(perm => (
                    <tr key={perm.key}>
                      <td className="pl-6 text-gray-700">{perm.label}</td>
                      {rolesList.map(r => (
                        <td key={r + perm.key} className="text-center">
                          <input
                            type="checkbox"
                            checked={matrix[r]?.has(perm.key) || false}
                            onChange={() => toggle(r, perm.key)}
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="flex items-center gap-4">
        <Button onClick={save} loading={saving} disabled={saving}>Lưu thay đổi</Button>
        {saved && <span className="text-sm text-green-600">Đã lưu</span>}
      </div>
    </div>
  );
};

export default Roles;