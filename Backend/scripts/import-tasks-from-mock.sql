-- =================================================================
-- IMPORT TASKS FROM MOCK DATA
-- =================================================================
-- Script này import dữ liệu nhiệm vụ từ mock data vào database
-- Nguồn: src/features/staff/pages/Tasks.tsx
-- Cần chạy sau khi đã có: USERS (staff), và bảng TASKS
-- =================================================================

USE DMT_EDUCATION_SYSTEM;
GO

-- Kiểm tra bảng TASKS có tồn tại không
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'TASKS')
BEGIN
    PRINT 'ERROR: Table TASKS does not exist. Please run create-missing-tables.sql first.';
    RETURN;
END

-- Lấy Staff Role ID trước
DECLARE @StaffRoleId INT = (SELECT ID FROM ROLES WHERE CODE = 'STAFF');
DECLARE @AdminRoleId INT = (SELECT ID FROM ROLES WHERE CODE = 'ADMIN');

-- Lấy Staff User IDs
DECLARE @StaffUserId INT = (
    SELECT TOP 1 ID FROM USERS WHERE email = 'staff.payment@dmt.edu.vn'
);
IF @StaffUserId IS NULL
BEGIN
    INSERT INTO USERS (email, password_hash, full_name, phone, role_id, status, created_at)
    VALUES ('staff.payment@dmt.edu.vn', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYIxF6q5Owi', N'Nguyễn Thị Staff', '0900000100', @StaffRoleId, 1, GETDATE());
    SET @StaffUserId = SCOPE_IDENTITY();
END

DECLARE @AdminUserId INT = (
    SELECT TOP 1 ID FROM USERS WHERE email = 'admin.payment@dmt.edu.vn'
);
IF @AdminUserId IS NULL
BEGIN
    INSERT INTO USERS (email, password_hash, full_name, phone, role_id, status, created_at)
    VALUES ('admin.payment@dmt.edu.vn', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYIxF6q5Owi', N'Trần Văn Admin', '0900000101', @AdminRoleId, 1, GETDATE());
    SET @AdminUserId = SCOPE_IDENTITY();
END

-- Tạo Manager user nếu chưa có
DECLARE @ManagerUserId INT = (
    SELECT TOP 1 ID FROM USERS WHERE email = 'manager@dmt.edu.vn'
);
IF @ManagerUserId IS NULL
BEGIN
    INSERT INTO USERS (email, password_hash, full_name, phone, role_id, status, created_at)
    VALUES ('manager@dmt.edu.vn', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYIxF6q5Owi', N'Lê Thị Manager', '0900000102', @StaffRoleId, 1, GETDATE());
    SET @ManagerUserId = SCOPE_IDENTITY();
END

-- Task 1: Xử lý yêu cầu hoàn tiền
IF @StaffUserId IS NOT NULL
BEGIN
    IF NOT EXISTS (SELECT 1 FROM TASKS WHERE title = N'Xử lý yêu cầu hoàn tiền học viên HS2025001')
    BEGIN
        INSERT INTO TASKS (title, description, status, priority, assigned_to, created_by, category, due_date, created_at)
        VALUES (
            N'Xử lý yêu cầu hoàn tiền học viên HS2025001',
            N'Kiểm tra điều kiện và gửi yêu cầu lên phòng Tài chính',
            'TODO',
            'HIGH',
            @StaffUserId,
            @StaffUserId,
            N'Tài chính',
            '2025-11-18',
            '2025-11-15 08:00:00'
        );
        PRINT 'Created task: Xử lý yêu cầu hoàn tiền';
    END
END

-- Task 2: Cập nhật thông tin lớp học
IF @StaffUserId IS NOT NULL
BEGIN
    IF NOT EXISTS (SELECT 1 FROM TASKS WHERE title = N'Cập nhật thông tin lớp học mới học kỳ 2')
    BEGIN
        INSERT INTO TASKS (title, description, status, priority, assigned_to, created_by, category, due_date, created_at)
        VALUES (
            N'Cập nhật thông tin lớp học mới học kỳ 2',
            N'Nhập thông tin 5 lớp học mới vào hệ thống',
            'IN_PROGRESS',
            'MEDIUM',
            @StaffUserId,
            @StaffUserId,
            N'Học vụ',
            '2025-11-20',
            '2025-11-14 10:30:00'
        );
        PRINT 'Created task: Cập nhật thông tin lớp học';
    END
END

-- Task 3: Gọi điện xác nhận đăng ký
IF @AdminUserId IS NOT NULL
BEGIN
    IF NOT EXISTS (SELECT 1 FROM TASKS WHERE title = N'Gọi điện xác nhận đăng ký lớp IELTS')
    BEGIN
        INSERT INTO TASKS (title, description, status, priority, assigned_to, created_by, category, due_date, created_at)
        VALUES (
            N'Gọi điện xác nhận đăng ký lớp IELTS',
            N'Xác nhận với 8 học viên đã đăng ký lớp IELTS Foundation',
            'REVIEW',
            'MEDIUM',
            @AdminUserId,
            @StaffUserId,
            N'Tuyển sinh',
            '2025-11-17',
            '2025-11-13 14:20:00'
        );
        PRINT 'Created task: Gọi điện xác nhận đăng ký';
    END
END

-- Task 4: Chuẩn bị tài liệu sự kiện
IF @StaffUserId IS NOT NULL
BEGIN
    IF NOT EXISTS (SELECT 1 FROM TASKS WHERE title = N'Chuẩn bị tài liệu cho sự kiện Tư vấn hướng nghiệp')
    BEGIN
        INSERT INTO TASKS (title, description, status, priority, assigned_to, created_by, category, due_date, created_at)
        VALUES (
            N'Chuẩn bị tài liệu cho sự kiện Tư vấn hướng nghiệp',
            N'In tài liệu, chuẩn bị booth, danh sách học viên tham gia',
            'TODO',
            'URGENT',
            @StaffUserId,
            @StaffUserId,
            N'Sự kiện',
            '2025-11-17',
            '2025-11-15 09:00:00'
        );
        PRINT 'Created task: Chuẩn bị tài liệu sự kiện';
    END
END

-- Task 5: Duyệt chứng chỉ
IF @ManagerUserId IS NOT NULL
BEGIN
    IF NOT EXISTS (SELECT 1 FROM TASKS WHERE title = N'Kiểm tra và duyệt chứng chỉ hoàn thành khóa học')
    BEGIN
        INSERT INTO TASKS (title, description, status, priority, assigned_to, created_by, category, due_date, completed_at, created_at)
        VALUES (
            N'Kiểm tra và duyệt chứng chỉ hoàn thành khóa học',
            N'Duyệt chứng chỉ cho 12 học viên hoàn thành khóa Vật Lý',
            'DONE',
            'LOW',
            @ManagerUserId,
            @StaffUserId,
            N'Học vụ',
            '2025-11-15',
            '2025-11-15 16:00:00',
            '2025-11-10 11:00:00'
        );
        PRINT 'Created task: Duyệt chứng chỉ (DONE)';
    END
END

-- Task 6: Tổng hợp báo cáo doanh thu
IF @StaffUserId IS NOT NULL
BEGIN
    IF NOT EXISTS (SELECT 1 FROM TASKS WHERE title = N'Tổng hợp báo cáo doanh thu tháng 10')
    BEGIN
        INSERT INTO TASKS (title, description, status, priority, assigned_to, created_by, category, due_date, completed_at, created_at)
        VALUES (
            N'Tổng hợp báo cáo doanh thu tháng 10',
            N'Lập báo cáo chi tiết doanh thu và gửi cho Ban Giám đốc',
            'DONE',
            'HIGH',
            @StaffUserId,
            @StaffUserId,
            N'Báo cáo',
            '2025-11-05',
            '2025-11-05 17:00:00',
            '2025-11-01 08:30:00'
        );
        PRINT 'Created task: Tổng hợp báo cáo doanh thu (DONE)';
    END
END

PRINT '========================================';
PRINT 'Import Tasks completed!';
PRINT '========================================';

