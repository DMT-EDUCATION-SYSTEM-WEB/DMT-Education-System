# DMT Education System — Backend TODOs

Tài liệu tổng hợp các hạng mục còn thiếu cần triển khai thêm cho Backend (Fastify + Supabase). Ưu tiên được sắp theo nhóm chức năng và bối cảnh hệ thống (không có tự đăng ký; email chỉ dành cho Giáo viên/Trợ giảng/Quản lý).

---

## 1) Authentication & Session

- [ ] Đăng xuất (/auth/logout), thu hồi phiên hiện tại
- [ ] Refresh token (gia hạn phiên an toàn, rotation, TTL rõ ràng)
- [ ] Đổi mật khẩu khi đã đăng nhập (/auth/change-password)
- [ ] Phương án reset mật khẩu:
  - [ ] Admin có quyền reset mật khẩu cho user (không cần email)
  - [ ] (Tuỳ chọn) Flow OTP/email nếu cần dùng ngoài giờ hành chính
- [ ] Rate limiting cho /auth/login, lock tạm thời khi sai quá số lần
- [ ] Chuẩn hoá lỗi/response cho toàn bộ /auth/\*

## 2) RBAC & Bảo mật

- [ ] Guard theo role_id/capabilities cho từng route nhóm:
  - [ ] Admin/Manager
  - [ ] Teacher/Teaching Assistant
  - [ ] Student
  - [ ] Parent
- [ ] Middleware kiểm tra quyền chi tiết (theo capability) trên từng endpoint nhạy cảm
- [ ] Ghi log/audit: login, đổi mật khẩu, thao tác quản trị (ai, lúc nào, IP, user-agent)
- [ ] Kiểm tra/validate ENV bắt buộc (SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, JWT_SECRET)
- [ ] CORS theo ENV (origin whitelist), headers bảo mật (helmet tương đương)

## 3) Quản trị Người dùng (Admin cấp tài khoản)

- [ ] API tạo user theo role (admin/teacher/ta/student/parent) — tự hash mật khẩu
- [ ] API cập nhật thông tin, đổi trạng thái kích hoạt/khóa
- [ ] API lấy chi tiết /users/:id
- [ ] API phân trang/tìm kiếm/sort cho /users (query params: q, role, status, page, pageSize, sort)
- [ ] API xoá/Deactivate tài khoản
- [ ] Bulk import (CSV/Excel) để cấp tài khoản hàng loạt, kèm báo cáo kết quả

## 4) Thông báo qua Email (chỉ Teacher/TA/Manager)

- [ ] Service email + provider (SMTP/transactional)
- [ ] Template cơ bản: thông báo lịch học, bài tập, điểm, nhắc nhở
- [ ] Endpoint gửi thông báo có RBAC: chỉ {teacher, ta, manager}
- [ ] Gửi theo: lớp/khóa học/nhóm user (filter theo role/class/course)
- [ ] Lưu nhật ký gửi: trạng thái, lỗi, người gửi, danh sách người nhận, thời gian

## 5) Nghiệp vụ học tập (mới có GET mẫu)

- [ ] CRUD đầy đủ cho:
  - [ ] subjects
  - [ ] courses
  - [ ] classes
  - [ ] materials (quyền truy cập theo lớp/role)
  - [ ] assignments
  - [ ] grades/grade items & aggregates
- [ ] Ràng buộc quyền truy cập tài nguyên theo role/lớp
- [ ] Upload/serve tài liệu an toàn (URL có TTL, phân quyền tải)

## 6) Hệ thống & Vận hành

- [ ] Healthcheck nâng cao: trạng thái Supabase, email service, phiên bản build
- [ ] Logging chuẩn và structured (level, correlation id)
- [ ] Error handler thống nhất (mã lỗi, message, traceId)
- [ ] Script seed dữ liệu demo: roles, admin, teacher, student, parent
- [ ] Tài liệu hoá Postman/Swagger cho API

---

### Ghi chú triển khai

- Supabase: dùng service role key ở backend; không persist session phía server.
- JWT: đọc `JWT_SECRET` từ ENV; khuyến nghị refresh token rotation + revoke list.
- Mọi thay đổi schema hoặc quyền truy cập nên có migration/script kèm theo.

### Ưu tiên đề xuất (next sprints)

1. Logout + Refresh token + RBAC guard theo route
2. Users admin: create/update/deactivate + search/pagination
3. Email module (teacher/ta/manager) + logging
4. CRUD courses/classes/materials với phân quyền truy cập
