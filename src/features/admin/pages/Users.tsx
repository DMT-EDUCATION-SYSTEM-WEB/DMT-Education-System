import React, { useEffect, useState, useCallback } from 'react';
import { adminService, AdminUser } from '../../../services/admin';
import { Role } from '../../../types';

const roleOptions: { value: string; label: string }[] = [
  { value: '', label: 'Tất cả vai trò' },
  { value: Role.ADMIN, label: 'Admin' },
  { value: Role.TEACHER, label: 'Giáo viên' },
  { value: Role.STUDENT, label: 'Học sinh' },
  { value: Role.STAFF, label: 'Nhân viên' },
];

const statusOptions = [
  { value: '', label: 'Tất cả trạng thái' },
  { value: 'active', label: 'Hoạt động' },
  { value: 'locked', label: 'Khóa' },
];

const Users: React.FC = () => {
  const [data, setData] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [role, setRole] = useState('');
  const [status, setStatus] = useState('');
  const [debounced, setDebounced] = useState('');

  // Debounce search
  useEffect(() => {
    const t = setTimeout(() => setDebounced(search), 350);
    return () => clearTimeout(t);
  }, [search]);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await adminService.listUsers({ search: debounced || undefined, role: role as Role || undefined, status: status || undefined });
      setData(res.items || res || []);
    } catch (e: any) {
      setError(e?.message || 'Không thể tải danh sách');
    } finally {
      setLoading(false);
    }
  }, [debounced, role, status]);

  useEffect(() => { load(); }, [load]);

  const act = async (id: string, action: 'lock' | 'unlock' | 'reset') => {
    try {
      if (action === 'lock') await adminService.lockUser(id);
      if (action === 'unlock') await adminService.unlockUser(id);
      if (action === 'reset') await adminService.resetPassword(id);
      await load();
    } catch (e: any) {
      setError(e?.message || 'Thao tác thất bại');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="space-y-2 w-full md:w-auto">
          <h1 className="text-xl font-semibold text-gray-900">Quản lý người dùng</h1>
          <p className="text-sm text-gray-600">Tìm kiếm, lọc và thao tác nhanh trên tài khoản.</p>
        </div>
        <div className="flex flex-wrap gap-3 items-center">
          <input
            placeholder="Tìm tên hoặc email..."
            className="w-52"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select className="w-40" value={role} onChange={(e) => setRole(e.target.value)}>
            {roleOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
          <select className="w-40" value={status} onChange={(e) => setStatus(e.target.value)}>
            {statusOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
          <button className="btn btn-outline" onClick={load} disabled={loading}>Làm mới</button>
        </div>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Tên</th>
                <th>Email</th>
                <th>Vai trò</th>
                <th>Trạng thái</th>
                <th>Đăng nhập cuối</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr><td colSpan={6} className="py-6 text-center text-sm text-gray-500">Đang tải...</td></tr>
              )}
              {!loading && data.length === 0 && (
                <tr><td colSpan={6} className="py-6 text-center text-sm text-gray-500">Không có người dùng</td></tr>
              )}
              {data.map(u => (
                <tr key={u.id} className="text-sm">
                  <td className="font-medium text-gray-800">{u.name}</td>
                  <td className="text-gray-600">{u.email}</td>
                  <td className="capitalize">{u.role}</td>
                  <td>
                    <span className={"badge " + (u.status === 'active' ? 'bg-primary-50 text-primary-700' : 'bg-gray-200 text-gray-700')}>{u.status === 'active' ? 'Hoạt động' : 'Khóa'}</span>
                  </td>
                  <td className="text-gray-500 whitespace-nowrap">{u.lastLogin ? new Date(u.lastLogin).toLocaleString() : '-'}</td>
                  <td className="space-x-2 whitespace-nowrap">
                    {u.status === 'active' ? (
                      <button onClick={() => act(u.id, 'lock')} className="text-xs text-red-600 hover:underline">Khóa</button>
                    ) : (
                      <button onClick={() => act(u.id, 'unlock')} className="text-xs text-primary-700 hover:underline">Mở</button>
                    )}
                    <button onClick={() => act(u.id, 'reset')} className="text-xs text-gray-600 hover:underline">Reset mật khẩu</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {error && <div className="px-4 py-3 border-t text-sm text-red-600">{error}</div>}
      </div>
    </div>
  );
};

export default Users;