# Danh sách các file Frontend có Mock Data

## 📋 Tổng quan

File này liệt kê tất cả các file frontend có mock data đã được import vào database. Các file này cần được cập nhật để load từ API thay vì mock data.

## ✅ Đã có script import

### 1. **Students Management**
- **File**: `src/features/staff/pages/StudentsManagement.tsx`
- **Mock Data**: 6 học sinh
- **Script**: `import-students-from-mock.sql`
- **Status**: ✅ Đã import

### 2. **Enrollments Management**
- **File**: `src/features/staff/pages/EnrollmentsManagement.tsx`
- **Mock Data**: 6 đăng ký học
- **Script**: `import-enrollments-from-mock.sql`
- **Status**: ✅ Đã import

### 3. **Assignments**
- **File**: `src/features/teachers/pages/Assignments.tsx`
- **Mock Data**: 3 bài tập
- **Script**: `import-assignments-from-mock.sql`
- **Status**: ✅ Đã import

### 4. **Materials**
- **File**: `src/features/students/pages/Materials.tsx`
- **Mock Data**: 5 tài liệu
- **Script**: `import-materials-from-mock.sql`
- **Status**: ✅ Đã import

### 5. **Class Sessions (Schedule)**
- **File**: 
  - `src/features/staff/pages/Schedule.tsx`
  - `src/features/teachers/pages/Calendar.tsx`
  - `src/features/students/pages/Schedule.tsx`
- **Mock Data**: 8 buổi học
- **Script**: `import-class-sessions-from-mock.sql`
- **Status**: ✅ Đã import

### 6. **Payments**
- **File**: 
  - `src/features/staff/pages/PaymentHistory.tsx`
  - `src/features/students/pages/Payments.tsx`
- **Mock Data**: 5 giao dịch thanh toán
- **Script**: `import-payments-from-mock.sql`
- **Status**: ✅ Đã import

### 7. **Notifications**
- **File**: `src/features/students/pages/Notifications.tsx`
- **Mock Data**: 7 thông báo
- **Script**: `import-notifications-from-mock.sql`
- **Status**: ✅ Đã import

### 8. **Attendance**
- **File**: `src/features/teachers/pages/AttendanceMarking.tsx`
- **Mock Data**: 5 bản ghi điểm danh
- **Script**: `import-attendance-from-mock.sql`
- **Status**: ✅ Đã import

### 9. **Grades/Transcript**
- **File**: `src/features/students/pages/Transcript.tsx`
- **Mock Data**: 6 điểm số và 4 tổng kết môn học
- **Script**: `import-grades-from-mock.sql`
- **Status**: ✅ Đã import

### 10. **Submissions**
- **File**: `src/features/teachers/pages/Grading.tsx`
- **Mock Data**: 4 bài nộp
- **Script**: `import-submissions-from-mock.sql`
- **Status**: ✅ Đã import

### 11. **Surveys**
- **File**: `src/features/students/pages/Surveys.tsx`
- **Mock Data**: 5 khảo sát
- **Script**: `import-surveys-from-mock.sql`
- **Status**: ✅ Đã import

### 12. **News/Announcements**
- **File**: `src/pages/AnnouncementPage.tsx`
- **Mock Data**: 6 tin tức/thông báo
- **Script**: `import-news-from-mock.sql`
- **Status**: ✅ Đã import

### 13. **Videos**
- **File**: `src/features/students/pages/Videos.tsx`
- **Mock Data**: 6 video bài giảng
- **Script**: `create-missing-tables.sql` + `import-videos-from-mock.sql`
- **Status**: ✅ Đã import (cần tạo bảng trước)

### 14. **Tasks**
- **File**: `src/features/staff/pages/Tasks.tsx`
- **Mock Data**: 6 nhiệm vụ
- **Script**: `create-missing-tables.sql` + `import-tasks-from-mock.sql`
- **Status**: ✅ Đã import (cần tạo bảng trước)

### 15. **Tickets**
- **File**: `src/features/staff/pages/Tickets.tsx`
- **Mock Data**: 5 tickets hỗ trợ
- **Script**: `create-missing-tables.sql` + `import-tickets-from-mock.sql`
- **Status**: ✅ Đã import (cần tạo bảng trước)

## ⚠️ Chưa có script import (cần xem xét)

### 9. **Tasks** ✅
- **File**: `src/features/staff/pages/Tasks.tsx`
- **Mock Data**: 6 tasks
- **Script**: `create-missing-tables.sql` + `import-tasks-from-mock.sql`
- **Status**: ✅ Đã có script import

### 10. **Tickets** ✅
- **File**: `src/features/staff/pages/Tickets.tsx`
- **Mock Data**: 5 support tickets
- **Script**: `create-missing-tables.sql` + `import-tickets-from-mock.sql`
- **Status**: ✅ Đã có script import

### 11. **Surveys** ✅
- **File**: 
  - `src/features/students/pages/Surveys.tsx`
  - `src/features/teachers/pages/Surveys.tsx`
- **Mock Data**: 5 khảo sát
- **Script**: `import-surveys-from-mock.sql`
- **Status**: ✅ Đã có script import

### 12. **Grades/Transcript** ✅
- **File**: `src/features/students/pages/Transcript.tsx`
- **Mock Data**: 6 điểm số
- **Script**: `import-grades-from-mock.sql`
- **Status**: ✅ Đã có script import

### 13. **Videos** ✅
- **File**: `src/features/students/pages/Videos.tsx`
- **Mock Data**: 6 video bài giảng
- **Script**: `create-missing-tables.sql` + `import-videos-from-mock.sql`
- **Status**: ✅ Đã có script import

### 14. **News/Announcements** ✅
- **File**: 
  - `src/pages/AnnouncementPage.tsx`
  - `src/pages/AnnouncementDetailPage.tsx`
- **Mock Data**: 6 tin tức/thông báo
- **Script**: `import-news-from-mock.sql`
- **Status**: ✅ Đã có script import

### 15. **Classes Management**
- **File**: `src/features/staff/pages/Classes.tsx`
- **Mock Data**: Danh sách lớp học
- **Note**: Đã có bảng CLASSES, được tạo trong enrollments script
- **Status**: ✅ Đã có (từ enrollments)

### 16. **Payment Processing**
- **File**: `src/features/staff/pages/PaymentProcessing.tsx`
- **Mock Data**: Students và Enrollments để xử lý thanh toán
- **Note**: Dữ liệu này đã được import trong students và enrollments scripts
- **Status**: ✅ Đã có

### 17. **Enrollment Create**
- **File**: `src/features/staff/pages/EnrollmentCreate.tsx`
- **Mock Data**: Students và Classes để tạo enrollment
- **Note**: Dữ liệu này đã được import trong students và enrollments scripts
- **Status**: ✅ Đã có

### 18. **Grading** ✅
- **File**: `src/features/teachers/pages/Grading.tsx`
- **Mock Data**: Assignments và Submissions
- **Script**: `import-assignments-from-mock.sql` + `import-submissions-from-mock.sql`
- **Status**: ✅ Đã có script import

### 19. **Reports**
- **File**: `src/features/teachers/pages/Reports.tsx`
- **Mock Data**: Báo cáo giảng dạy
- **Note**: Có thể tính toán từ dữ liệu hiện có
- **Status**: ⚠️ Có thể tính toán từ data

### 20. **Performance Report**
- **File**: `src/features/admin/pages/PerformanceReport.tsx`
- **Mock Data**: Dữ liệu hiệu suất
- **Note**: Có thể tính toán từ dữ liệu hiện có
- **Status**: ⚠️ Có thể tính toán từ data

### 21. **Attendance Report**
- **File**: `src/features/admin/pages/AttendanceReport.tsx`
- **Mock Data**: Báo cáo điểm danh
- **Note**: Có thể tính toán từ bảng ATTENDANCE
- **Status**: ⚠️ Có thể tính toán từ data

### 22. **Admin Courses**
- **File**: `src/features/admin/pages/Courses.tsx`
- **Mock Data**: 30 khóa học
- **Note**: Đã có script import courses
- **Status**: ✅ Đã có

### 23. **Admin Notifications**
- **File**: `src/features/admin/pages/Notifications.tsx`
- **Mock Data**: Templates và notifications
- **Note**: Cần tạo bảng NOTIFICATION_TEMPLATES nếu chưa có
- **Status**: ⚠️ Cần kiểm tra schema

## 📝 Hướng dẫn cập nhật Frontend

Sau khi import data vào database, cần cập nhật các file frontend để:

1. **Thay thế mock data bằng API calls**
   ```typescript
   // Trước
   const [data, setData] = useState(mockData);
   
   // Sau
   const [data, setData] = useState([]);
   useEffect(() => {
     const fetchData = async () => {
       const response = await api.getAll();
       setData(response.data);
     };
     fetchData();
   }, []);
   ```

2. **Xử lý loading và error states**
   ```typescript
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);
   ```

3. **Fallback về mock data nếu API fail** (tùy chọn)
   ```typescript
   try {
     const response = await api.getAll();
     setData(response.data);
   } catch (err) {
     console.warn('API error, using mock data');
     setData(mockData); // Fallback
   }
   ```

## 🔗 Liên quan

- Schema: `Backend/Db_DMT_SQLServer.sql`
- Import Scripts: `Backend/scripts/`
- README: `Backend/scripts/README_IMPORT_MOCK_DATA.md`

