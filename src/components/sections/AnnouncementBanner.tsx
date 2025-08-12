import React from 'react';
import { Icons } from '../common/Icons';
import { COLORS, TYPOGRAPHY, SPACING } from '../../constants';

const AnnouncementBanner: React.FC = () => {
  return (
    <div className="fade-in-up" style={{
      background: COLORS.backgrounds.announcement,
      padding: SPACING.md + ' 0',
      textAlign: 'center',
      fontSize: TYPOGRAPHY.fontSize.base,
      fontWeight: TYPOGRAPHY.fontWeight.medium,
      color: '#92400e'
    }}>
      <div style={{
        maxWidth: SPACING.container.maxWidth,
        margin: SPACING.container.margin,
        padding: '0 1rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: SPACING.lg
      }}>
        <span style={{ fontSize: TYPOGRAPHY.fontSize.xl }}>
          <Icons.Celebration />
        </span>
        <span>
          <strong>KHUYẾN MÃI ĐẶC BIỆT:</strong> Giảm 30% học phí cho 50 học sinh đầu tiên đăng ký khóa học mới!
        </span>
        <button className="hover-scale" style={{
          background: COLORS.primary.main,
          color: COLORS.neutral.white,
          padding: `${SPACING.xs} ${SPACING.lg}`,
          borderRadius: SPACING.lg,
          border: 'none',
          fontSize: TYPOGRAPHY.fontSize.xs,
          fontWeight: TYPOGRAPHY.fontWeight.semibold,
          cursor: 'pointer'
        }}>
          Đăng ký ngay
        </button>
      </div>
    </div>
  );
};

export default AnnouncementBanner;
