import React, { useEffect } from 'react';
import HomePage from '../../../pages/HomePage';
import {
  COLORS,
  TYPOGRAPHY,
  SPACING,
  BORDERS,
  SHADOWS,
} from '../../../constants';
import http from '../../../services/http';

const AdminProfile: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  const user = (() => {
    try {
      return JSON.parse(localStorage.getItem('user') || '{}');
    } catch {
      return {};
    }
  })();

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: SPACING.md }}>
      <div
        style={{
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          background: COLORS.primary.gradient,
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: SHADOWS.primary,
          fontWeight: 700,
        }}
        title={user?.email || 'Admin'}
      >
        {(user?.full_name || 'AD').toString().slice(0, 2).toUpperCase()}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span style={{ fontSize: TYPOGRAPHY.fontSize.md, fontWeight: 600 }}>
          {user?.full_name || 'Quản trị viên'}
        </span>
        <span
          style={{
            fontSize: TYPOGRAPHY.fontSize.xs,
            color: COLORS.neutral.gray500,
          }}
        >
          {user?.email || ''}
        </span>
      </div>
      <button
        onClick={onLogout}
        style={{
          marginLeft: SPACING.md,
          border: `1px solid ${COLORS.primary.main}`,
          color: COLORS.primary.main,
          padding: `${SPACING.xs} ${SPACING.md}`,
          borderRadius: BORDERS.radius.pill,
          background: COLORS.neutral.white,
          cursor: 'pointer',
        }}
      >
        Đăng xuất
      </button>
    </div>
  );
};

const AdminDashboard: React.FC = () => {
  // Đảm bảo vào dashboard luôn ở đầu trang để tránh cảm giác "cắt" gradient/màu
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);
  const handleLogout = async () => {
    try {
      // best-effort server logout if available
      await http.post('/auth/logout');
    } catch {}
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  return (
    <div style={{ minHeight: '100vh', background: COLORS.backgrounds.main }}>
      {/* Nội dung: tái sử dụng các phần của trang chủ */}
      <div
        style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px 16px' }}
      >
        <HomePage />
      </div>
    </div>
  );
};

export default AdminDashboard;
