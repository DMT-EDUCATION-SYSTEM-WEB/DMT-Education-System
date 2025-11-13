# 🧪 Teachers Module - Quick Test Guide

## 🚀 Start Servers

```bash
# Terminal 1 - Backend
cd Backend
npm start

# Terminal 2 - Frontend
npm start
```

## 🔗 URLs to Test

### 1. Homepage Section
```
URL: http://localhost:5173/teachers
```
**Test:**
- [ ] Hiển thị 8 giảng viên đầu tiên
- [ ] Click vào ảnh giảng viên → chuyển sang detail page
- [ ] Click "Xem tất cả giáo viên" → chuyển sang list page
- [ ] Scroll ngang hoạt động smooth
- [ ] Hover effect trên card

### 2. Full List Page
```
URL: http://localhost:5173/teachers/list
```
**Test:**
- [ ] Hiển thị grid 12 giảng viên
- [ ] Search box hoạt động
- [ ] Filter theo trạng thái hoạt động
- [ ] Pagination hiển thị đúng
- [ ] Click card → chuyển sang detail
- [ ] "Xóa bộ lọc" button hoạt động
- [ ] Responsive trên mobile

**Search Test:**
```
Search: "Trần" → Tìm được "Trần Giang Thanh", "Trần Anh Khoa"
Search: "thanh@" → Tìm được "Trần Giang Thanh"
Search: "GV2024" → Tìm được tất cả teachers
```

**Filter Test:**
```
Status: Đang hoạt động → Chỉ show active teachers
Status: Không hoạt động → Chỉ show inactive teachers (nếu có)
Status: Tất cả → Show all
```

### 3. Teacher Detail Page
```
URL: http://localhost:5173/teachers/1
(Thay 1 bằng ID giảng viên thực từ database)
```
**Test:**
- [ ] Header hiển thị đầy đủ thông tin
- [ ] Avatar hiển thị đúng
- [ ] Status badge đúng màu
- [ ] Tab "Tổng quan" hiển thị contact & academic info
- [ ] Tab "Lớp học" hiển thị danh sách lớp
- [ ] Tab "Hiệu suất" hiển thị stats cards
- [ ] "Quay lại danh sách" button hoạt động
- [ ] Responsive trên mobile

## 🗄️ Database Requirements

### Check if data exists:
```sql
-- Should return at least some records
SELECT COUNT(*) FROM teachers;
SELECT COUNT(*) FROM users WHERE role_id = 3; -- TEACHER role
SELECT COUNT(*) FROM subjects;
```

### Load sample data if empty:
```bash
# Run this SQL script:
Backend/Db_DMT_Sample_Teachers.sql
```

## 🔐 Authentication Test

### Test without login:
```
1. Mở http://localhost:5173/teachers/list
2. Nếu backend yêu cầu auth → sẽ redirect hoặc error
3. Login với account:
   - Admin: admin@dmt.edu.vn / Admin123
   - Staff: staff@dmt.edu.vn / Staff123
```

### Test with login:
```
1. Login trước
2. Navigate to /teachers/list
3. Should load successfully
```

## 🐛 Common Issues & Fixes

### Issue 1: "Không thể tải danh sách"
**Fix:**
```bash
# Check backend is running
curl http://localhost:3001/teachers

# Expected: JSON response with teacher data
```

### Issue 2: Empty list
**Fix:**
```sql
-- Run sample data script
Backend/Db_DMT_Sample_Teachers.sql
```

### Issue 3: 401 Unauthorized
**Fix:**
```javascript
// Check token in console
console.log(localStorage.getItem('token'))

// If null → need to login first
```

### Issue 4: CORS error
**Fix:**
```typescript
// In Backend/src/server.ts
// Ensure CORS is configured:
app.register(cors, {
  origin: 'http://localhost:5173',
  credentials: true
});
```

### Issue 5: Images not loading
**Fix:**
- Check avatar URL in database
- Fallback should show initials
- Check network tab for 404s

## ✅ Success Criteria

All these should work:
- ✅ Homepage section loads 8 teachers
- ✅ Click to detail works
- ✅ List page shows all teachers with pagination
- ✅ Search finds correct teachers
- ✅ Filter works correctly
- ✅ Detail page shows complete info
- ✅ All 3 tabs work
- ✅ Performance stats display
- ✅ Navigation flows correctly
- ✅ Mobile responsive
- ✅ No console errors

## 📊 Performance Check

### Load Times (target):
- Homepage section: < 1s
- List page: < 1s  
- Detail page: < 500ms
- Search/filter: < 300ms

### Check in DevTools:
```
Network tab → check:
- /teachers API call time
- /teachers/:id API call time
- Image load times
```

## 🎨 Visual Check

### Desktop (1920x1080):
- [ ] Grid shows 3-4 columns
- [ ] Cards properly sized
- [ ] Text readable
- [ ] Spacing correct

### Tablet (768x1024):
- [ ] Grid shows 2 columns
- [ ] Cards adjust size
- [ ] Nav still accessible

### Mobile (375x667):
- [ ] Grid shows 1 column
- [ ] All text visible
- [ ] Buttons tappable
- [ ] Scroll works

## 🔍 Console Check

### Should see:
```
✅ API calls successful
✅ Data loaded properly
✅ No 404 errors
✅ No type errors
```

### Should NOT see:
```
❌ CORS errors
❌ 401/403 auth errors
❌ React key warnings
❌ Hook warnings
❌ Network timeouts
```

## 📱 Mobile Test Checklist

### iOS Safari:
- [ ] Smooth scrolling
- [ ] Touch events work
- [ ] Images load
- [ ] No layout issues

### Android Chrome:
- [ ] Smooth scrolling
- [ ] Touch events work
- [ ] Images load
- [ ] No layout issues

## 🎯 Quick API Test

### Terminal test:
```bash
# Test 1: List teachers
curl http://localhost:3001/teachers?page=1&limit=10

# Test 2: Get teacher detail
curl http://localhost:3001/teachers/1

# Test 3: Get teacher classes
curl http://localhost:3001/teachers/1/classes

# Test 4: Get teacher performance
curl http://localhost:3001/teachers/1/performance
```

### Expected responses:
```json
// Test 1
{
  "success": true,
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": X,
    "pages": Y
  }
}

// Test 2
{
  "success": true,
  "data": {
    "id": 1,
    "teacher_code": "GV20240001",
    "users": {...},
    "subjects": {...}
  }
}
```

## 🏁 Final Checklist

Before marking as complete:
- [ ] All pages load without errors
- [ ] Search works correctly
- [ ] Filters work correctly
- [ ] Pagination works
- [ ] Navigation flows properly
- [ ] Mobile responsive
- [ ] No console errors
- [ ] Images load properly
- [ ] Database has sample data
- [ ] Backend API works
- [ ] Authentication works (if required)
- [ ] All tabs in detail page work
- [ ] Performance acceptable

## 📝 Notes

Remember to test with:
1. **Different browsers**: Chrome, Firefox, Safari, Edge
2. **Different screen sizes**: Mobile, Tablet, Desktop
3. **Different data scenarios**: Empty, few items, many items
4. **Different network speeds**: Fast, Slow, Offline

---

**Happy Testing! 🎉**

If all checks pass → Module is ready for production! ✅
