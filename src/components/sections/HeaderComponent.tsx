import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Icons } from '../common/Icons';
import {
  COLORS,
  TYPOGRAPHY,
  SPACING,
  BORDERS,
  SHADOWS,
  EFFECTS,
  CONTENT,
} from '../../constants';
import Modal from '../common/Modal';
import Input from '../common/Input';

const HeaderComponent: React.FC = () => {
  const location = useLocation();
  const [openLogin, setOpenLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header
      style={{
        backgroundColor: COLORS.backgrounds.header,
        backdropFilter: EFFECTS.blur.md,
        boxShadow: SHADOWS.md,
        position: 'sticky',
        top: 0,
        zIndex: EFFECTS.zIndex.sticky,
        padding: SPACING.header.padding,
      }}
    >
      <div
        style={{
          maxWidth: SPACING.container.maxWidth,
          margin: SPACING.container.margin,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: SPACING.header.height,
        }}
      >
        {/* Logo và tên công ty */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src="/logo-dmt.png"
            alt="DMT Education Logo"
            className="hover-scale"
            style={{
              height: SPACING['5xl'],
              width: 'auto',
              borderRadius: BORDERS.radius.sm,
              boxShadow: SHADOWS.sm,
            }}
          />
          <div style={{ marginLeft: SPACING.md }}>
            <div
              style={{
                fontSize: TYPOGRAPHY.fontSize['3xl'],
                fontWeight: TYPOGRAPHY.fontWeight.bold,
                color: COLORS.neutral.gray900,
                lineHeight: TYPOGRAPHY.lineHeight.normal,
              }}
            >
              {CONTENT.company.name}
            </div>
            <div
              style={{
                fontSize: TYPOGRAPHY.fontSize.xs,
                color: COLORS.neutral.gray500,
                fontWeight: TYPOGRAPHY.fontWeight.medium,
              }}
            >
              {CONTENT.company.tagline}
            </div>
          </div>
        </div>

        {/* Menu điều hướng */}
        <nav style={{ display: 'flex', gap: SPACING['3xl'] }}>
          <Link
            to="/home"
            className="fade-in-up stagger-1"
            style={{
              color:
                isActive('/home') || isActive('/')
                  ? COLORS.primary.main
                  : COLORS.neutral.gray700,
              textDecoration: 'none',
              fontWeight: TYPOGRAPHY.fontWeight.semibold,
              fontSize: TYPOGRAPHY.fontSize.md,
              padding: SPACING.sm + ' 0',
              borderBottom:
                isActive('/home') || isActive('/')
                  ? `${BORDERS.width.normal} solid ${COLORS.primary.main}`
                  : 'none',
              transition: EFFECTS.transition.normal,
              cursor: 'pointer',
            }}
          >
            Trang chủ
          </Link>
          <Link
            to="/courses"
            className="fade-in-up stagger-2"
            style={{
              color: isActive('/courses')
                ? COLORS.primary.main
                : COLORS.neutral.gray700,
              textDecoration: 'none',
              fontWeight: TYPOGRAPHY.fontWeight.medium,
              fontSize: TYPOGRAPHY.fontSize.md,
              padding: SPACING.sm + ' 0',
              borderBottom: isActive('/courses')
                ? `${BORDERS.width.normal} solid ${COLORS.primary.main}`
                : 'none',
              transition: EFFECTS.transition.normal,
              cursor: 'pointer',
            }}
          >
            Khóa học
          </Link>
          <Link
            to="/teachers"
            className="fade-in-up stagger-3"
            style={{
              color: isActive('/teachers')
                ? COLORS.primary.main
                : COLORS.neutral.gray700,
              textDecoration: 'none',
              fontWeight: TYPOGRAPHY.fontWeight.medium,
              fontSize: TYPOGRAPHY.fontSize.md,
              padding: SPACING.sm + ' 0',
              borderBottom: isActive('/teachers')
                ? `${BORDERS.width.normal} solid ${COLORS.primary.main}`
                : 'none',
              transition: EFFECTS.transition.normal,
              cursor: 'pointer',
            }}
          >
            Giảng viên
          </Link>
          <Link
            to="/schedule"
            className="fade-in-up stagger-4"
            style={{
              color: isActive('/schedule')
                ? COLORS.primary.main
                : COLORS.neutral.gray700,
              textDecoration: 'none',
              fontWeight: TYPOGRAPHY.fontWeight.medium,
              fontSize: TYPOGRAPHY.fontSize.md,
              padding: SPACING.sm + ' 0',
              borderBottom: isActive('/schedule')
                ? `${BORDERS.width.normal} solid ${COLORS.primary.main}`
                : 'none',
              transition: EFFECTS.transition.normal,
              cursor: 'pointer',
            }}
          >
            Lịch khai giảng
          </Link>
          <Link
            to="/announcement"
            className="fade-in-up stagger-5"
            style={{
              color: isActive('/announcement')
                ? COLORS.primary.main
                : COLORS.neutral.gray700,
              textDecoration: 'none',
              fontWeight: TYPOGRAPHY.fontWeight.medium,
              fontSize: TYPOGRAPHY.fontSize.md,
              padding: SPACING.sm + ' 0',
              borderBottom: isActive('/announcement')
                ? `${BORDERS.width.normal} solid ${COLORS.primary.main}`
                : 'none',
              transition: EFFECTS.transition.normal,
              cursor: 'pointer',
            }}
          >
            Thông báo
          </Link>
        </nav>

        {/* Các nút hành động */}
        <div style={{ display: 'flex', gap: SPACING.md }}>
          <Link
            className="hover-scale"
            to="/auth/login"
            style={{
              border: `${BORDERS.width.normal} solid ${COLORS.primary.main}`,
              color: COLORS.primary.main,
              padding: `${SPACING.sm} ${SPACING.lg}`,
              borderRadius: BORDERS.radius.pill,
              background: COLORS.neutral.white,
              fontSize: TYPOGRAPHY.fontSize.base,
              fontWeight: TYPOGRAPHY.fontWeight.semibold,
              cursor: 'pointer',
            }}
          >
            Đăng nhập
          </Link>
          <button
            className="hover-scale"
            style={{
              background: COLORS.primary.gradient,
              color: COLORS.neutral.white,
              padding: `${SPACING.sm} ${SPACING.xl}`,
              borderRadius: BORDERS.radius.pill,
              border: 'none',
              fontSize: TYPOGRAPHY.fontSize.base,
              fontWeight: TYPOGRAPHY.fontWeight.semibold,
              cursor: 'pointer',
              boxShadow: SHADOWS.primary,
            }}
          >
            Đăng ký học
          </button>
          <button
            className="hover-scale"
            style={{
              border: `${BORDERS.width.normal} solid ${COLORS.primary.main}`,
              color: COLORS.primary.main,
              padding: `${SPACING.sm} ${SPACING.lg}`,
              borderRadius: BORDERS.radius.pill,
              background: COLORS.neutral.white,
              fontSize: TYPOGRAPHY.fontSize.base,
              fontWeight: TYPOGRAPHY.fontWeight.semibold,
              cursor: 'pointer',
            }}
          >
            Tư vấn
          </button>
        </div>
      </div>

      {/* Login Modal removed: now using dedicated /auth/login page */}
    </header>
  );
};

export default HeaderComponent;
