import React from 'react';
import { NavLink } from 'react-router-dom';

const Section: React.FC<{ title: string }> = ({ title, children }) => (
  <div className="mt-6 first:mt-0">
    <p className="px-3 text-xs font-semibold uppercase tracking-wider text-gray-500">{title}</p>
    <ul className="mt-2 space-y-1">{children}</ul>
  </div>
);

const Item: React.FC<{ to: string; label: string }> = ({ to, label }) => (
  <li>
    <NavLink
      exact
      to={to}
      activeClassName="active"
      className="block rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-700"
    >
      {label}
    </NavLink>
  </li>
);

const Sidebar: React.FC = () => {
  return (
    <aside className="sidebar hidden md:block">
      <div className="mb-4">
        <h2 className="text-sm font-semibold text-gray-900">Danh mục</h2>
        <p className="text-xs text-gray-500">Điều hướng nhanh</p>
      </div>

      <Section title="Học sinh">
        <Item to="/students/dashboard" label="Dashboard" />
        <Item to="/students/schedule" label="Thời khóa biểu" />
        <Item to="/students/videos" label="Video bài học" />
        <Item to="/students/materials" label="Tài liệu" />
        <Item to="/students/transcript" label="Bảng điểm" />
      </Section>

      <Section title="Giáo viên">
        <Item to="/teachers/assignments" label="Bài tập/Đề" />
        <Item to="/teachers/grading" label="Chấm điểm" />
        <Item to="/teachers/surveys" label="Khảo sát" />
        <Item to="/teachers/timesheet" label="Chấm công" />
      </Section>

      <Section title="Quản trị">
        <Item to="/admin/dashboard" label="Tổng quan" />
        <Item to="/admin/users" label="Người dùng" />
        <Item to="/admin/roles" label="Phân quyền" />
        <Item to="/admin/analytics" label="Phân tích" />
        <Item to="/admin/notifications" label="Thông báo" />
        <Item to="/admin/settings" label="Cài đặt" />
      </Section>

      <Section title="Nhân viên">
        <Item to="/staff/tasks" label="Nhiệm vụ" />
        <Item to="/staff/support" label="Hỗ trợ" />
      </Section>

      <Section title="Khóa học & Lịch">
        <Item to="/courses/catalog" label="Danh mục khóa học" />
        <Item to="/courses/detail" label="Chi tiết khóa học" />
        <Item to="/schedule/calendar" label="Lịch học" />
      </Section>

      <Section title="Khảo sát & Báo cáo">
        <Item to="/surveys/list" label="Danh sách khảo sát" />
        <Item to="/analytics/reports" label="Báo cáo" />
      </Section>

      <Section title="Hỗ trợ">
        <Item to="/support/tickets" label="Ticket hỗ trợ" />
      </Section>
    </aside>
  );
};

export default Sidebar;