# 📋 HƯỚNG DẪN IMPORT MOCK DATA VÀO DATABASE

## 📁 Các Script SQL đã tạo

### 1. **Insert_Teachers_From_TeachersPage.sql**
- Import 6 giảng viên từ mock data trong TeachersPage.tsx
- Bao gồm: Trần Giang Thanh, Hà Đăng Như Quỳnh, Trần Anh Khoa, Nguyễn Bá Thọ, Từ Kim Loan, Lê Văn Minh
- Password mặc định: `Teacher@123`

### 2. **Insert_Classes_From_SchedulePage.sql**
- Import 5 lớp học từ mock data trong SchedulePage.tsx
- Bao gồm: IELTS Intensive, Toán Tư duy, Hóa học nâng cao, Tiếng Việt nâng cao, Khoa học tự nhiên
- Tự động tạo các khóa học (Courses) nếu chưa có

### 3. **Insert_News_From_AnnouncementPage.sql**
- Import 5 tin tức/thông báo từ mock data trong AnnouncementPage.tsx
- Bao gồm: Khai giảng IELTS, Học viên 8.5 IELTS, Workshop, Nghỉ Tết, Tuyển sinh

### 4. **Insert_Payments_Sample.sql**
- Import 8 giao dịch thanh toán mẫu
- Bao gồm các trạng thái: Completed, Pending, Failed, Refunded
- Các phương thức: Bank Transfer, Cash, E-Wallet, Credit Card

### 5. **MASTER_Insert_All_Mock_Data.sql** ⭐
- Script chính chạy tất cả các script trên theo đúng thứ tự
- **Sử dụng script này để import toàn bộ mock data**

---

## 🚀 CÁCH SỬ DỤNG

### Option 1: Chạy từng script riêng lẻ (Khuyến nghị khi debug)

```sql
-- 1. Chạy script teachers
:r Insert_Teachers_From_TeachersPage.sql

-- 2. Chạy script classes
:r Insert_Classes_From_SchedulePage.sql

-- 3. Chạy script news
:r Insert_News_From_AnnouncementPage.sql

-- 4. Chạy script payments (cần có students trước)
:r Insert_Payments_Sample.sql
```

### Option 2: Chạy MASTER script (Nhanh nhất) ⭐

```bash
# Trên Windows (SQL Server)
sqlcmd -S localhost -d DMT_EDUCATION_SYSTEM -i MASTER_Insert_All_Mock_Data.sql

# Hoặc từ SQL Server Management Studio (SSMS)
# 1. Mở file MASTER_Insert_All_Mock_Data.sql
# 2. Nhấn F5 hoặc Execute
```

---

## ⚠️ LƯU Ý QUAN TRỌNG

### Trước khi chạy scripts:

1. **Database đã được tạo**
   ```sql
   USE DMT_EDUCATION_SYSTEM;
   GO
   ```

2. **Đã có ROLES trong database**
   - Cần có Role ID 1 (Admin), 2 (Staff), 3 (Teacher)
   - Chạy file `Db_DMT_SQLServer.sql` trước nếu chưa có

3. **Đã có SUBJECTS (Môn học)**
   - Scripts sẽ tự động tạo subjects nếu chưa có
   - Nhưng nên có sẵn để đảm bảo consistency

4. **Đối với Payments**: Cần có Students trong database
   - Chạy `Db_DMT_Sample_Data.sql` để tạo sample students
   - Hoặc tạo students thủ công

### Scripts sẽ tự động:
- ✅ Kiểm tra dữ liệu đã tồn tại (không duplicate)
- ✅ Tạo SUBJECTS nếu chưa có
- ✅ Tạo COURSES nếu chưa có
- ✅ In log chi tiết quá trình import

---

## 📊 DỮ LIỆU SAU KHI IMPORT

| Bảng | Số lượng | Mô tả |
|------|----------|-------|
| **TEACHERS** | 6 | Giảng viên với đầy đủ thông tin |
| **CLASSES** | 5 | Lớp học với lịch học cụ thể |
| **NEWS** | 5 | Tin tức và thông báo |
| **PAYMENTS** | 8 | Giao dịch thanh toán mẫu |
| **COURSES** | 5 | Khóa học (tự động tạo) |
| **SUBJECTS** | 6+ | Môn học (tự động tạo) |

---

## ✅ KIỂM TRA SAU KHI IMPORT

```sql
-- Kiểm tra Teachers
SELECT t.TEACHER_CODE, u.FULL_NAME, u.EMAIL, s.NAME as SUBJECT
FROM TEACHERS t
JOIN USERS u ON t.USER_ID = u.ID
LEFT JOIN SUBJECTS s ON t.MAIN_SUBJECT_ID = s.ID;

-- Kiểm tra Classes
SELECT c.CODE, c.NAME, c.CLASSROOM, c.SCHEDULE_DAYS, c.STATUS
FROM CLASSES c;

-- Kiểm tra News
SELECT TITLE, TYPE, IS_FEATURED, PUBLISHED_AT
FROM NEWS
ORDER BY PUBLISHED_AT DESC;

-- Kiểm tra Payments
SELECT TRANSACTION_ID, AMOUNT, PAYMENT_METHOD, PAYMENT_STATUS, PAYMENT_DATE
FROM PAYMENTS;
```

---

## 🔧 XỬ LÝ LỖI

### Lỗi: "Cannot insert duplicate key"
➡️ **Nguyên nhân**: Dữ liệu đã tồn tại  
➡️ **Giải pháp**: Scripts đã xử lý, bỏ qua và tiếp tục

### Lỗi: "Foreign key constraint"
➡️ **Nguyên nhân**: Thiếu ROLES hoặc SUBJECTS  
➡️ **Giải pháp**: 
```sql
-- Chạy script tạo roles và subjects trước
:r Db_DMT_SQLServer.sql
```

### Lỗi: "Cannot find file"
➡️ **Nguyên nhân**: Đường dẫn file không đúng  
➡️ **Giải pháp**: 
```bash
# Đảm bảo bạn đang ở đúng thư mục Backend
cd /path/to/dmt-edu-ui/Backend
```

---

## 🗑️ XÓA DỮ LIỆU ĐÃ IMPORT (Nếu cần)

```sql
-- Xóa payments
DELETE FROM PAYMENTS WHERE TRANSACTION_ID LIKE 'PMT-230%';

-- Xóa classes
DELETE FROM CLASSES WHERE CODE IN ('IELTS-GV-01', 'MATH-GV-01', 'CODE-TB-01', 'VIET-TB-01', 'SCI-TD-01');

-- Xóa news
DELETE FROM NEWS WHERE AUTHOR_ID = (SELECT TOP 1 ID FROM USERS WHERE ROLE_ID = 1);

-- Xóa teachers (cẩn thận với foreign keys)
DELETE FROM TEACHERS WHERE TEACHER_CODE IN ('GV001', 'GV002', 'GV003', 'GV004', 'GV005', 'GV006');
DELETE FROM USERS WHERE EMAIL IN ('thanh@dmt.edu.vn', 'quynh@dmt.edu.vn', 'khoa@dmt.edu.vn', 'tho@dmt.edu.vn', 'loan@dmt.edu.vn', 'minh@dmt.edu.vn');
```

---

## 🎯 FRONTEND ĐÃ ĐƯỢC CẬP NHẬT

Mock data đã được xóa khỏi các file sau:
- ✅ `src/pages/TeachersPage.tsx`
- ✅ `src/pages/SchedulePage.tsx`
- ✅ `src/pages/AnnouncementPage.tsx`

Frontend giờ sẽ:
- Gọi API thực từ backend
- Hiển thị empty state nếu không có data
- Không sử dụng mock data fallback

---

## 📞 HỖ TRỢ

Nếu gặp vấn đề khi import:
1. Kiểm tra log output của script
2. Verify database connection
3. Kiểm tra permissions của user SQL Server
4. Đọc thông báo lỗi cụ thể

---

## 📝 CHANGELOG

### Version 1.0 (2025-11-26)
- ✅ Tạo scripts import cho Teachers, Classes, News, Payments
- ✅ Tạo MASTER script chạy tất cả
- ✅ Xóa mock data khỏi frontend
- ✅ Thêm validation và error handling
- ✅ Tự động tạo dependencies (Subjects, Courses)

---

**Chúc bạn import thành công! 🎉**
