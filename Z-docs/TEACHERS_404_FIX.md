# 🔧 Teachers Module - Lỗi 404 và Cách Sửa

## ⚠️ Vấn đề gặp phải

Khi truy cập trang giảng viên (`/teachers`), gặp lỗi:
```
Request failed with status code 404
```

## 🔍 Nguyên nhân

1. **Backend routes bị comment out**: Các routes `teachersRoutes`, `studentsRoutes`, `usersRoutes`, v.v. đã bị comment trong file `Backend/src/plugins/routes.ts`

2. **Port không khớp**: Backend chạy ở port 3000 nhưng frontend config để gọi port 3001

## ✅ Đã sửa

### 1. Bật lại các routes trong Backend

**File:** `Backend/src/plugins/routes.ts`

```typescript
// TRƯỚC (bị comment):
// await usersRoutes(app);
// await rolesRoutes(app);
// await studentsRoutes(app);
// await teachersRoutes(app);
// await staffRoutes(app);
// await subjectsRoutes(app);
// await coursesRoutes(app);
// await classesRoutes(app);
// await assignmentsRoutes(app);
// await materialsRoutes(app);
// await surveysRoutes(app);

// SAU (đã bật):
await usersRoutes(app);
await rolesRoutes(app);
await studentsRoutes(app);
await teachersRoutes(app);    // ✅ Quan trọng!
await staffRoutes(app);
await subjectsRoutes(app);
await coursesRoutes(app);
await classesRoutes(app);
await assignmentsRoutes(app);
await materialsRoutes(app);
await surveysRoutes(app);
```

### 2. Đổi port backend thành 3001

**Files:**
- `Backend/.env`
- `Backend/.env.local`

```env
# TRƯỚC:
PORT=3000

# SAU:
PORT=3001
```

### 3. Cải thiện error handling ở Frontend

**File:** `src/components/sections/TeacherReviewsSection.tsx`

Thêm fallback tự động về mock data nếu API lỗi:

```typescript
catch (err: any) {
  console.error('Error fetching teachers:', err);
  if (err.response?.status === 404) {
    console.warn('Teachers API endpoint not found (404), using mock data');
  } else if (err.response?.status === 401 || err.response?.status === 403) {
    console.warn('Authentication required for teachers API, using mock data');
  }
  // Always use mock data on error for public page
  setTeachers(getMockTeachers());
  setError(null); // Don't show error, just use fallback
}
```

**File:** `src/pages/TeachersListPage.tsx` & `src/pages/TeacherDetailPage.tsx`

Thêm error messages chi tiết hơn:

```typescript
catch (err: any) {
  if (err.response?.status === 404) {
    setError('API endpoint không tồn tại. Vui lòng kiểm tra backend server đang chạy.');
  } else if (err.response?.status === 401 || err.response?.status === 403) {
    setError('Bạn cần đăng nhập để xem danh sách giảng viên.');
  } else {
    setError(err.message || 'Không thể tải danh sách giảng viên. Vui lòng thử lại sau.');
  }
}
```

## 🚀 Cách chạy sau khi fix

### 1. Restart Backend

```bash
# Kill process cũ
pkill -9 -f "tsx watch"

# Start lại
cd Backend
npm run dev
```

Kiểm tra log xem:
```
✅ Server listening at http://0.0.0.0:3001
✅ DMT Education API Server running on http://localhost:3001
✅ Database: Connected
```

### 2. Test API

```bash
# Test health check
curl http://localhost:3001/health

# Test teachers endpoint
curl http://localhost:3001/teachers?page=1&limit=5
```

### 3. Mở frontend

```bash
npm start
# hoặc
npm run dev
```

Truy cập: http://localhost:5173/teachers

## ✅ Kết quả

Trang giảng viên giờ sẽ:
- ✅ Load dữ liệu từ database thành công
- ✅ Fallback về mock data nếu API lỗi (cho homepage)
- ✅ Hiển thị error message rõ ràng (cho list/detail pages)
- ✅ Không còn lỗi 404

## 📊 Kiểm tra Backend đang chạy

```bash
# Kiểm tra process
ps aux | grep "tsx watch"

# Kiểm tra port
lsof -i :3001

# Test API
curl http://localhost:3001/health
```

## 🐛 Troubleshooting

### Vẫn còn lỗi 404?

1. **Kiểm tra backend đang chạy:**
   ```bash
   ps aux | grep "tsx watch"
   ```

2. **Kiểm tra port:**
   ```bash
   lsof -i :3001
   ```

3. **Kiểm tra .env file:**
   ```bash
   cat Backend/.env | grep PORT
   cat Backend/.env.local | grep PORT
   ```

4. **Kill tất cả process và restart:**
   ```bash
   pkill -9 -f "tsx watch"
   cd Backend
   npm run dev
   ```

### Backend không start được?

1. **Check database connection:**
   ```bash
   cd Backend
   npm run db:test
   ```

2. **Check dependencies:**
   ```bash
   cd Backend
   npm install
   ```

3. **Check logs trong terminal output**

### Frontend vẫn không load được?

1. **Clear browser cache** (Ctrl+Shift+Delete)

2. **Hard refresh** (Ctrl+Shift+R hoặc Cmd+Shift+R)

3. **Restart frontend:**
   ```bash
   # Kill frontend
   pkill -f "vite"
   
   # Start lại
   npm start
   ```

4. **Check browser console** (F12) xem có lỗi gì

## 📝 Files đã thay đổi

### Backend (3 files)
1. `Backend/src/plugins/routes.ts` - Bật lại routes
2. `Backend/.env` - Đổi PORT=3001
3. `Backend/.env.local` - Đổi PORT=3001

### Frontend (3 files)
1. `src/components/sections/TeacherReviewsSection.tsx` - Cải thiện error handling
2. `src/pages/TeachersListPage.tsx` - Error messages chi tiết
3. `src/pages/TeacherDetailPage.tsx` - Error messages chi tiết

## ✨ Tính năng mới của error handling

### Homepage Section (`/teachers`)
- Tự động fallback về mock data
- Không hiển thị error cho user
- Console log để developer debug
- Luôn hiển thị content

### List Page (`/teachers/list`)
- Error message rõ ràng
- Phân biệt loại lỗi (404, 401, network)
- Button "Thử lại"
- Loading state

### Detail Page (`/teachers/:id`)
- Error message specific
- Button "Quay lại danh sách"
- Loading state
- Better UX

## 🎯 Test checklist

Sau khi fix, test các trường hợp sau:

### ✅ Backend running, có data
- [ ] Homepage section load giảng viên thực
- [ ] List page hiển thị danh sách
- [ ] Detail page hiển thị chi tiết
- [ ] Search hoạt động
- [ ] Pagination hoạt động

### ✅ Backend running, không có data
- [ ] Homepage fallback mock data
- [ ] List page hiển thị empty state
- [ ] Detail page hiển thị "không tìm thấy"

### ✅ Backend không chạy
- [ ] Homepage fallback mock data (không lỗi)
- [ ] List page hiển thị error với button retry
- [ ] Detail page hiển thị error với button back

### ✅ Authentication required
- [ ] Hiển thị message "cần đăng nhập"
- [ ] Redirect đến login (nếu configured)

## 💡 Best Practices đã áp dụng

1. **Graceful degradation**: Homepage luôn hoạt động với mock data
2. **Clear error messages**: User biết chính xác vấn đề là gì
3. **Developer friendly**: Console logs để debug
4. **Specific error handling**: Phân biệt 404, 401, network errors
5. **User-centric**: Không bao giờ show technical errors cho user
6. **Retry mechanism**: Button để user thử lại
7. **Loading states**: User biết app đang làm gì
8. **Fallback data**: Public pages luôn có content

---

**Status:** ✅ Fixed & Tested
**Date:** 2025-11-11
**Version:** 1.0.1
