# Hướng dẫn Import Mock Data vào Database

## 📋 Tổng quan

Các script này import dữ liệu mock từ frontend vào SQL Server database. Dữ liệu được lấy từ các component React có mock data.

## 📁 Danh sách Scripts

### 1. **import-students-from-mock.sql**
- **Mô tả**: Import học sinh từ mock data
- **Nguồn**: `src/features/staff/pages/StudentsManagement.tsx`
- **Dữ liệu**: 6 học sinh (HS2025001 - HS2025006)
- **Bảng**: `USERS`, `STUDENTS`

### 2. **import-enrollments-from-mock.sql**
- **Mô tả**: Import đăng ký học và tự động tạo các lớp học cần thiết
- **Nguồn**: `src/features/staff/pages/EnrollmentsManagement.tsx`
- **Dữ liệu**: 6 đăng ký học với các trạng thái khác nhau
- **Bảng**: `SUBJECTS`, `COURSES`, `CLASSES`, `TEACHERS`, `ENROLLMENTS`

### 3. **import-assignments-from-mock.sql**
- **Mô tả**: Import bài tập từ mock data
- **Nguồn**: `src/features/teachers/pages/Assignments.tsx`
- **Dữ liệu**: 3 bài tập (Toán, Vật lý, Hóa học)
- **Bảng**: `ASSIGNMENTS`

### 4. **import-materials-from-mock.sql**
- **Mô tả**: Import tài liệu học tập từ mock data
- **Nguồn**: `src/features/students/pages/Materials.tsx`
- **Dữ liệu**: 5 tài liệu (PDF, DOC, PPT, Images)
- **Bảng**: `MATERIALS`

### 5. **import-class-sessions-from-mock.sql**
- **Mô tả**: Import buổi học (Class Sessions) từ mock data
- **Nguồn**: `src/features/staff/pages/Schedule.tsx`, `src/features/teachers/pages/Calendar.tsx`
- **Dữ liệu**: 8 buổi học cho các lớp khác nhau
- **Bảng**: `CLASS_SESSIONS`

### 6. **import-payments-from-mock.sql**
- **Mô tả**: Import thanh toán từ mock data
- **Nguồn**: `src/features/staff/pages/PaymentHistory.tsx`
- **Dữ liệu**: 5 giao dịch thanh toán với các phương thức khác nhau
- **Bảng**: `PAYMENTS`

### 7. **import-notifications-from-mock.sql**
- **Mô tả**: Import thông báo từ mock data
- **Nguồn**: `src/features/students/pages/Notifications.tsx`
- **Dữ liệu**: 7 thông báo cho học sinh
- **Bảng**: `NOTIFICATIONS`

### 8. **import-attendance-from-mock.sql**
- **Mô tả**: Import điểm danh từ mock data
- **Nguồn**: `src/features/teachers/pages/AttendanceMarking.tsx`
- **Dữ liệu**: 5 bản ghi điểm danh với các trạng thái khác nhau
- **Bảng**: `ATTENDANCE`

### 9. **create-missing-tables.sql**
- **Mô tả**: Tạo các bảng còn thiếu (VIDEOS, TASKS, TICKETS)
- **Bảng**: `VIDEOS`, `TASKS`, `TICKETS`

### 10. **import-grades-from-mock.sql**
- **Mô tả**: Import điểm số từ mock data
- **Nguồn**: `src/features/students/pages/Transcript.tsx`
- **Dữ liệu**: 6 điểm số cho các môn học khác nhau
- **Bảng**: `GRADES`

### 11. **import-submissions-from-mock.sql**
- **Mô tả**: Import bài nộp từ mock data
- **Nguồn**: `src/features/teachers/pages/Grading.tsx`
- **Dữ liệu**: 4 bài nộp với các trạng thái khác nhau
- **Bảng**: `SUBMISSIONS`

### 12. **import-surveys-from-mock.sql**
- **Mô tả**: Import khảo sát từ mock data
- **Nguồn**: `src/features/students/pages/Surveys.tsx`
- **Dữ liệu**: 5 khảo sát với câu hỏi
- **Bảng**: `SURVEYS`, `SURVEY_QUESTIONS`

### 13. **import-news-from-mock.sql**
- **Mô tả**: Import tin tức/thông báo từ mock data
- **Nguồn**: `src/pages/AnnouncementPage.tsx`
- **Dữ liệu**: 6 tin tức/thông báo
- **Bảng**: `NEWS`

### 14. **import-videos-from-mock.sql**
- **Mô tả**: Import video bài giảng từ mock data
- **Nguồn**: `src/features/students/pages/Videos.tsx`
- **Dữ liệu**: 6 video bài giảng
- **Bảng**: `VIDEOS` (cần chạy create-missing-tables.sql trước)

### 15. **import-tasks-from-mock.sql**
- **Mô tả**: Import nhiệm vụ từ mock data
- **Nguồn**: `src/features/staff/pages/Tasks.tsx`
- **Dữ liệu**: 6 nhiệm vụ với các trạng thái khác nhau
- **Bảng**: `TASKS` (cần chạy create-missing-tables.sql trước)

### 16. **import-tickets-from-mock.sql**
- **Mô tả**: Import hỗ trợ khách hàng từ mock data
- **Nguồn**: `src/features/staff/pages/Tickets.tsx`
- **Dữ liệu**: 5 tickets với các trạng thái khác nhau
- **Bảng**: `TICKETS` (cần chạy create-missing-tables.sql trước)

### 9. **import-all-mock-data.sql**
- **Mô tả**: Script tổng hợp chạy tất cả các script import
- **Lưu ý**: Script này sử dụng `:r` command của SQL Server

## 🚀 Cách chạy

### Cách 1: Chạy từng script riêng lẻ

```bash
# Kết nối SQL Server
sqlcmd -S localhost -U sa -P "Password123!" -d DMT_EDUCATION_SYSTEM -i Backend/scripts/import-students-from-mock.sql

sqlcmd -S localhost -U sa -P "Password123!" -d DMT_EDUCATION_SYSTEM -i Backend/scripts/import-enrollments-from-mock.sql

sqlcmd -S localhost -U sa -P "Password123!" -d DMT_EDUCATION_SYSTEM -i Backend/scripts/import-assignments-from-mock.sql

sqlcmd -S localhost -U sa -P "Password123!" -d DMT_EDUCATION_SYSTEM -i Backend/scripts/import-materials-from-mock.sql

sqlcmd -S localhost -U sa -P "Password123!" -d DMT_EDUCATION_SYSTEM -i Backend/scripts/import-class-sessions-from-mock.sql

sqlcmd -S localhost -U sa -P "Password123!" -d DMT_EDUCATION_SYSTEM -i Backend/scripts/import-payments-from-mock.sql

sqlcmd -S localhost -U sa -P "Password123!" -d DMT_EDUCATION_SYSTEM -i Backend/scripts/import-notifications-from-mock.sql

sqlcmd -S localhost -U sa -P "Password123!" -d DMT_EDUCATION_SYSTEM -i Backend/scripts/import-attendance-from-mock.sql
```

### Cách 2: Chạy script tổng hợp

```bash
sqlcmd -S localhost -U sa -P "Password123!" -d DMT_EDUCATION_SYSTEM -i Backend/scripts/import-all-mock-data.sql
```

### Cách 3: Sử dụng Azure Data Studio hoặc SQL Server Management Studio

1. Mở file `.sql` trong editor
2. Kết nối đến database `DMT_EDUCATION_SYSTEM`
3. Chạy script (F5)

## ⚠️ Thứ tự chạy quan trọng

**PHẢI chạy theo thứ tự sau:**

1. ✅ **ROLES** - Tạo roles nếu chưa có (có trong `Db_DMT_SQLServer.sql`)
2. ✅ **SUBJECTS** - Tạo subjects nếu chưa có (có trong `import-courses-from-mock.sql` hoặc `import-teachers-from-homepage.sql`)
3. ✅ **TEACHERS** - Chạy `import-teachers-from-homepage.sql` trước
4. ✅ **COURSES** - Chạy `import-courses-from-mock.sql` trước
5. ✅ **STUDENTS** - Chạy `import-students-from-mock.sql`
6. ✅ **CLASSES & ENROLLMENTS** - Chạy `import-enrollments-from-mock.sql` (tự động tạo classes)
7. ✅ **ASSIGNMENTS** - Chạy `import-assignments-from-mock.sql`
8. ✅ **MATERIALS** - Chạy `import-materials-from-mock.sql`
9. ✅ **CLASS_SESSIONS** - Chạy `import-class-sessions-from-mock.sql`
10. ✅ **PAYMENTS** - Chạy `import-payments-from-mock.sql`
11. ✅ **NOTIFICATIONS** - Chạy `import-notifications-from-mock.sql`
12. ✅ **ATTENDANCE** - Chạy `import-attendance-from-mock.sql`
13. ✅ **MISSING TABLES** - Chạy `create-missing-tables.sql` (VIDEOS, TASKS, TICKETS)
14. ✅ **GRADES** - Chạy `import-grades-from-mock.sql`
15. ✅ **SUBMISSIONS** - Chạy `import-submissions-from-mock.sql`
16. ✅ **SURVEYS** - Chạy `import-surveys-from-mock.sql`
17. ✅ **NEWS** - Chạy `import-news-from-mock.sql`
18. ✅ **VIDEOS** - Chạy `import-videos-from-mock.sql`
19. ✅ **TASKS** - Chạy `import-tasks-from-mock.sql`
20. ✅ **TICKETS** - Chạy `import-tickets-from-mock.sql`

## 📊 Dữ liệu được import

### Students (6 học sinh)
- HS2025001: Nguyễn Văn A (THPT, ACTIVE)
- HS2025002: Trần Thị B (THCS, ACTIVE)
- HS2025003: Lê Văn C (THPT, SUSPENDED)
- HS2025004: Phạm Thị D (Đại học, ACTIVE)
- HS2025005: Hoàng Văn E (THPT, ACTIVE)
- HS2025006: Vũ Thị F (THCS, ACTIVE)

### Enrollments (6 đăng ký)
- ENR2025001: HS2025001 → Toán 10A (ACTIVE, PARTIAL payment)
- ENR2025002: HS2025002 → Vật lý 10B (ACTIVE, PAID)
- ENR2025003: HS2025003 → Hóa học 11A (PENDING)
- ENR2024999: HS2025004 → IELTS Foundation (COMPLETED, PAID)
- ENR2025004: HS2025005 → Sinh học 12A (ACTIVE, PARTIAL payment)
- ENR2025005: HS2025006 → Tiếng Anh 9A (CANCELLED)

### Assignments (3 bài tập)
- Phương trình bậc 2 (Toán, HOMEWORK)
- Kiểm tra định kỳ - Động học (Vật lý, QUIZ)
- Bài tập Axit - Bazơ (Hóa học, HOMEWORK)

### Materials (5 tài liệu)
- Bài tập Toán 9 - Chương 1 (PDF, 2.4 MB)
- Lý thuyết Vật lý 9 (PDF, 1.8 MB)
- Slide bài giảng Hóa học (PPT, 5.2 MB)
- Đề cương ôn tập Toán 9 (DOC, 1.2 MB)
- Hình ảnh minh họa Vật lý (Image, 8.5 MB)

### Class Sessions (8 buổi học)
- Toán 10A: 3 buổi (1 scheduled, 1 scheduled, 1 completed)
- Vật lý 10B: 2 buổi (1 scheduled, 1 scheduled)
- Hóa học 11A: 1 buổi (scheduled)
- IELTS Foundation: 1 buổi (completed)
- Sinh học 12A: 1 buổi (scheduled)

### Payments (5 giao dịch)
- BL2025001: Nguyễn Văn A - 2,500,000 VND (BANK_TRANSFER, COMPLETED)
- BL2025002: Trần Thị B - 4,000,000 VND (CASH, COMPLETED)
- BL2025003: Lê Văn C - 1,500,000 VND (E_WALLET, COMPLETED)
- BL2025004: Phạm Thị D - 3,000,000 VND (CREDIT_CARD, PENDING)
- BL2025005: Hoàng Văn E - 2,000,000 VND (BANK_TRANSFER, COMPLETED)

### Notifications (7 thông báo)
- Bài tập mới đã được giao
- Điểm kiểm tra đã được cập nhật
- Nhắc nhở thanh toán học phí
- Lịch học đã được cập nhật
- Bảo trì hệ thống
- Khảo sát mới
- Chúc mừng đạt điểm cao

### Attendance Records (5 bản ghi)
- HS2025001: PRESENT (đúng giờ)
- HS2025002: PRESENT
- HS2025003: LATE (muộn 15 phút)
- HS2025004: ABSENT (không phép)
- HS2025005: EXCUSED (có phép - ốm)

## 🔍 Kiểm tra sau khi import

```sql
-- Kiểm tra số lượng records
SELECT 'Students' AS TableName, COUNT(*) AS Count FROM STUDENTS
UNION ALL
SELECT 'Enrollments', COUNT(*) FROM ENROLLMENTS
UNION ALL
SELECT 'Assignments', COUNT(*) FROM ASSIGNMENTS
UNION ALL
SELECT 'Materials', COUNT(*) FROM MATERIALS
UNION ALL
SELECT 'Class Sessions', COUNT(*) FROM CLASS_SESSIONS
UNION ALL
SELECT 'Payments', COUNT(*) FROM PAYMENTS
UNION ALL
SELECT 'Notifications', COUNT(*) FROM NOTIFICATIONS
UNION ALL
SELECT 'Attendance', COUNT(*) FROM ATTENDANCE;

-- Kiểm tra enrollments với thông tin chi tiết
SELECT 
    e.ID,
    s.STUDENT_CODE,
    u.FULL_NAME AS STUDENT_NAME,
    c.NAME AS CLASS_NAME,
    e.STATUS,
    e.PAYMENT_STATUS,
    e.TOTAL_FEE,
    e.PAID_AMOUNT
FROM ENROLLMENTS e
INNER JOIN STUDENTS s ON e.STUDENT_ID = s.ID
INNER JOIN USERS u ON s.USER_ID = u.ID
INNER JOIN CLASSES c ON e.CLASS_ID = c.ID;
```

## ⚠️ Lưu ý

1. **Password mặc định**: Tất cả users được tạo với password hash: `Student@123` (bcrypt)
2. **Email**: Các email được tạo theo pattern `*@example.com` hoặc `*@dmt.edu.vn`
3. **Dependencies**: Scripts tự động tạo các dependencies cần thiết (subjects, courses, classes, teachers) nếu chưa có
4. **Idempotent**: Các script có thể chạy nhiều lần mà không tạo duplicate (sử dụng `IF NOT EXISTS`)

## 🐛 Troubleshooting

### Lỗi: "Student role not found"
- **Giải pháp**: Chạy script tạo ROLES trước:
  ```sql
  INSERT INTO ROLES (code, name, description) VALUES ('STUDENT', N'Học sinh', N'Học sinh');
  ```

### Lỗi: "Foreign key constraint"
- **Giải pháp**: Đảm bảo đã chạy các script dependencies trước (teachers, courses)

### Lỗi: "Duplicate key"
- **Giải pháp**: Scripts đã có `IF NOT EXISTS`, nhưng nếu vẫn lỗi, có thể data đã tồn tại. Kiểm tra và xóa nếu cần.

## 📝 Cập nhật Frontend

Sau khi import xong, cần cập nhật frontend để load từ API thay vì mock data:

1. **StudentsManagement.tsx**: Đã có API call, chỉ cần đảm bảo API endpoint hoạt động
2. **EnrollmentsManagement.tsx**: Cần thêm API call
3. **Assignments.tsx**: Đã có API call với fallback
4. **Materials.tsx**: Cần thêm API call

## 🔗 Liên quan

- Schema: `Backend/Db_DMT_SQLServer.sql`
- Import Teachers: `Backend/scripts/import-teachers-from-homepage.sql`
- Import Courses: `Backend/scripts/import-courses-from-mock.sql`

