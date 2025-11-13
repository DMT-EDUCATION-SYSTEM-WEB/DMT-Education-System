# Nâng cấp Trang Giảng Viên - Teachers Module Upgrade

## 🎯 Tổng quan

Đã nâng cấp hoàn toàn module giảng viên với tích hợp database và giao diện hiện đại, bao gồm:

### ✨ Các tính năng mới

1. **Trang danh sách giảng viên nâng cao** (`/teachers/list`)
   - Hiển thị danh sách tất cả giảng viên với phân trang
   - Tìm kiếm theo tên, email, mã giảng viên
   - Lọc theo trạng thái (đang hoạt động/không hoạt động)
   - Lọc theo môn học chính
   - Grid layout responsive với card hiện đại

2. **Trang chi tiết giảng viên** (`/teachers/:id`)
   - Thông tin đầy đủ về giảng viên
   - 3 tabs chính:
     - **Tổng quan**: Thông tin liên hệ, học thuật
     - **Lớp học**: Danh sách các lớp đang/đã dạy
     - **Hiệu suất**: Thống kê tổng số lớp, học sinh, đánh giá, tỷ lệ tham dự
   - Avatar và profile header đẹp mắt

3. **Trang giảng viên homepage** (`/teachers`)
   - Giữ nguyên section review giảng viên
   - Tích hợp database để load giảng viên thực
   - Click vào card hoặc nút "Xem tất cả" để chuyển đến danh sách đầy đủ
   - Click vào ảnh giảng viên để xem chi tiết

## 🗄️ Tích hợp Database

### Backend API Routes
File: `Backend/src/routes/teachers.ts`

Các API endpoints đã được tạo sẵn:
- `GET /teachers` - Lấy danh sách giảng viên (có phân trang, filter)
- `GET /teachers/:id` - Lấy chi tiết giảng viên
- `POST /teachers` - Tạo giảng viên mới (Admin/Staff)
- `PUT /teachers/:id` - Cập nhật giảng viên (Admin/Staff)
- `DELETE /teachers/:id` - Xóa giảng viên (Admin)
- `GET /teachers/:id/classes` - Lấy danh sách lớp của giảng viên
- `GET /teachers/:id/performance` - Lấy thống kê hiệu suất

### Frontend Services
File: `src/services/academic.ts`

Các service methods:
```typescript
teachersApi.getAll(params)      // Lấy danh sách
teachersApi.getById(id)         // Lấy chi tiết
teachersApi.create(data)        // Tạo mới
teachersApi.update(id, data)    // Cập nhật
teachersApi.delete(id)          // Xóa
teachersApi.getClasses(id)      // Lấy lớp học
teachersApi.getPerformance(id)  // Lấy thống kê
```

## 📁 Cấu trúc Files

```
src/
├── pages/
│   ├── TeachersPage.tsx           # Trang chính (homepage section)
│   ├── TeachersListPage.tsx       # Trang danh sách đầy đủ
│   └── TeacherDetailPage.tsx      # Trang chi tiết giảng viên
├── components/
│   └── sections/
│       └── TeacherReviewsSection.tsx  # Component section (đã nâng cấp)
├── services/
│   └── academic.ts                # API services (Teacher interface)
└── routes/
    └── index.tsx                  # Routes configuration
```

## 🚀 Cách sử dụng

### 1. Khởi động Backend

Đảm bảo backend server đang chạy:

```bash
cd Backend
npm start
# hoặc
npm run dev
```

Backend sẽ chạy ở: `http://localhost:3001`

### 2. Khởi động Frontend

```bash
npm start
# hoặc
npm run dev
```

Frontend sẽ chạy ở: `http://localhost:5173`

### 3. Truy cập các trang

- **Homepage giảng viên**: http://localhost:5173/teachers
- **Danh sách đầy đủ**: http://localhost:5173/teachers/list
- **Chi tiết giảng viên**: http://localhost:5173/teachers/1 (thay 1 bằng ID giảng viên)

## 🎨 Tính năng UI/UX

### TeachersListPage
- ✅ Search box với icon
- ✅ Filter dropdown (trạng thái)
- ✅ Grid layout responsive
- ✅ Card hover effects
- ✅ Status badges (đang hoạt động/không hoạt động)
- ✅ Pagination với page numbers
- ✅ Loading states
- ✅ Error handling
- ✅ Empty states
- ✅ Teacher code badges
- ✅ Subject/specialization tags
- ✅ Years of experience display

### TeacherDetailPage
- ✅ Gradient header với avatar
- ✅ Tab navigation (Tổng quan, Lớp học, Hiệu suất)
- ✅ Contact information card
- ✅ Academic information card
- ✅ Classes grid với status badges
- ✅ Performance statistics cards với gradients
- ✅ Back button navigation
- ✅ Responsive design
- ✅ Loading states
- ✅ Error handling

### TeacherReviewsSection (Homepage)
- ✅ Horizontal scroll với shadow gradients
- ✅ Click to view detail
- ✅ Hover effects với info overlay
- ✅ "Xem tất cả" button navigation
- ✅ Fallback to mock data nếu API fail
- ✅ Loading spinner
- ✅ Real data from database

## 🔧 Customization

### Thay đổi số lượng items per page

```typescript
// Trong TeachersListPage.tsx
const limit = 12; // Thay đổi số này
```

### Thay đổi số giảng viên hiển thị ở homepage

```typescript
// Trong TeacherReviewsSection.tsx
const response = await teachersApi.getAll({ 
  status: true,
  page: 1,
  limit: 8  // Thay đổi số này
});
```

### Thêm filter môn học

Đã có sẵn trong backend API, chỉ cần uncomment trong TeachersListPage.tsx:

```typescript
// Trong filter section, thêm:
<select
  value={subjectFilter || ''}
  onChange={(e) => {
    setSubjectFilter(e.target.value ? Number(e.target.value) : undefined);
    setCurrentPage(1);
  }}
>
  <option value="">Tất cả môn học</option>
  {/* Map subjects here */}
</select>
```

## 🔐 Authentication & Authorization

- Xem danh sách giảng viên: **Cần đăng nhập** (Admin/Staff)
- Xem chi tiết: **Cần đăng nhập** (Tất cả roles)
- Tạo/Sửa giảng viên: **Admin/Staff only**
- Xóa giảng viên: **Admin only**

## 📊 Database Schema

### Teachers Table
```sql
CREATE TABLE teachers (
  id INT PRIMARY KEY IDENTITY(1,1),
  user_id INT NOT NULL,
  teacher_code NVARCHAR(20),
  main_subject_id INT,
  years_experience INT DEFAULT 0,
  degree NVARCHAR(100),
  specialization NVARCHAR(100),
  created_at DATETIME DEFAULT GETDATE(),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (main_subject_id) REFERENCES subjects(id)
);
```

### Stored Procedures
- `sp_RegisterTeacher` - Đăng ký giảng viên mới
- `sp_GetTeacherReport` - Báo cáo chi tiết giảng viên (nếu có)

## 🐛 Troubleshooting

### Không load được danh sách giảng viên
1. Kiểm tra backend server đang chạy
2. Kiểm tra API endpoint: `http://localhost:3001/teachers`
3. Xem console log để debug
4. Kiểm tra database có dữ liệu giảng viên không

### CORS errors
Đảm bảo backend có cấu hình CORS:
```typescript
// Trong server.ts
app.register(cors, {
  origin: 'http://localhost:5173',
  credentials: true
});
```

### Authentication errors
Đảm bảo đã login và có token hợp lệ trong localStorage:
```javascript
localStorage.getItem('token')
```

## 🎯 Next Steps

### Tính năng có thể mở rộng:
1. ⭐ Hệ thống đánh giá giảng viên (rating & reviews)
2. 📅 Lịch dạy interactive calendar
3. 📊 Biểu đồ thống kê chi tiết hơn
4. 💬 Chat/messaging với giảng viên
5. 📄 Download profile PDF
6. 🔍 Advanced search với nhiều criteria
7. 📸 Upload/change avatar
8. 🎓 Certificates & qualifications management
9. 📝 Teaching portfolio/CV
10. 🏆 Achievements & awards

## 📞 Support

Nếu có vấn đề, hãy kiểm tra:
1. Backend logs: `Backend/logs/`
2. Frontend console errors
3. Network tab trong DevTools
4. Database connection

## 🎉 Kết luận

Module giảng viên đã được nâng cấp hoàn toàn với:
- ✅ Tích hợp database thực
- ✅ Giao diện hiện đại, responsive
- ✅ Tính năng tìm kiếm, lọc, phân trang
- ✅ Trang chi tiết đầy đủ thông tin
- ✅ Thống kê hiệu suất
- ✅ Loading states & error handling
- ✅ Navigation flow hoàn chỉnh

Enjoy! 🚀
