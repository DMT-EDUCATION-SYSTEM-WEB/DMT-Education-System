-- =================================================================
-- IMPORT TICKETS FROM MOCK DATA
-- =================================================================
-- Script này import dữ liệu hỗ trợ khách hàng từ mock data vào database
-- Nguồn: src/features/staff/pages/Tickets.tsx
-- Cần chạy sau khi đã có: USERS (students, staff), và bảng TICKETS
-- =================================================================

USE DMT_EDUCATION_SYSTEM;
GO

-- Kiểm tra bảng TICKETS có tồn tại không
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'TICKETS')
BEGIN
    PRINT 'ERROR: Table TICKETS does not exist. Please run create-missing-tables.sql first.';
    RETURN;
END

-- Lấy Student User IDs
DECLARE @Student1UserId INT = (
    SELECT u.ID FROM USERS u
    INNER JOIN STUDENTS s ON u.ID = s.USER_ID
    WHERE s.STUDENT_CODE = 'HS2025001'
);
DECLARE @Student2UserId INT = (
    SELECT u.ID FROM USERS u
    INNER JOIN STUDENTS s ON u.ID = s.USER_ID
    WHERE s.STUDENT_CODE = 'HS2025002'
);
DECLARE @Student3UserId INT = (
    SELECT u.ID FROM USERS u
    INNER JOIN STUDENTS s ON u.ID = s.USER_ID
    WHERE s.STUDENT_CODE = 'HS2025003'
);
DECLARE @Student4UserId INT = (
    SELECT u.ID FROM USERS u
    INNER JOIN STUDENTS s ON u.ID = s.USER_ID
    WHERE s.STUDENT_CODE = 'HS2025004'
);
DECLARE @Student5UserId INT = (
    SELECT u.ID FROM USERS u
    INNER JOIN STUDENTS s ON u.ID = s.USER_ID
    WHERE s.STUDENT_CODE = 'HS2025005'
);

-- Lấy Staff User IDs
DECLARE @ITStaffUserId INT = (
    SELECT TOP 1 ID FROM USERS WHERE email = 'it.staff@dmt.edu.vn'
);
IF @ITStaffUserId IS NULL
BEGIN
    DECLARE @StaffRoleId INT = (SELECT ID FROM ROLES WHERE CODE = 'STAFF');
    INSERT INTO USERS (email, password_hash, full_name, phone, role_id, status, created_at)
    VALUES ('it.staff@dmt.edu.vn', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYIxF6q5Owi', N'Nhân viên IT', '0900000200', @StaffRoleId, 1, GETDATE());
    SET @ITStaffUserId = SCOPE_IDENTITY();
END

DECLARE @AcademicStaffUserId INT = (
    SELECT TOP 1 ID FROM USERS WHERE email = 'academic.staff@dmt.edu.vn'
);
IF @AcademicStaffUserId IS NULL
BEGIN
    INSERT INTO USERS (email, password_hash, full_name, phone, role_id, status, created_at)
    VALUES ('academic.staff@dmt.edu.vn', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYIxF6q5Owi', N'Nhân viên học vụ', '0900000201', @StaffRoleId, 1, GETDATE());
    SET @AcademicStaffUserId = SCOPE_IDENTITY();
END

-- Ticket 1: Không thể đăng nhập
IF @Student1UserId IS NOT NULL AND @ITStaffUserId IS NOT NULL
BEGIN
    IF NOT EXISTS (SELECT 1 FROM TICKETS WHERE ticket_number = 'TK-001')
    BEGIN
        INSERT INTO TICKETS (ticket_number, title, description, category, priority, status, created_by, assigned_to, response_count, created_at, updated_at)
        VALUES (
            'TK-001',
            N'Không thể đăng nhập vào hệ thống',
            N'Em không thể đăng nhập vào hệ thống từ sáng nay',
            'technical',
            'high',
            'in_progress',
            @Student1UserId,
            @ITStaffUserId,
            3,
            '2025-10-01 08:30:00',
            '2025-10-01 09:15:00'
        );
        PRINT 'Created ticket: TK-001 - Không thể đăng nhập';
    END
END

-- Ticket 2: Thắc mắc về học phí
IF @Student2UserId IS NOT NULL
BEGIN
    IF NOT EXISTS (SELECT 1 FROM TICKETS WHERE ticket_number = 'TK-002')
    BEGIN
        INSERT INTO TICKETS (ticket_number, title, description, category, priority, status, created_by, response_count, created_at, updated_at)
        VALUES (
            'TK-002',
            N'Thắc mắc về học phí',
            N'Cho em hỏi về chính sách giảm giá học phí cho học sinh đăng ký nhiều khóa',
            'billing',
            'medium',
            'open',
            @Student2UserId,
            0,
            '2025-10-01 10:00:00',
            '2025-10-01 10:00:00'
        );
        PRINT 'Created ticket: TK-002 - Thắc mắc về học phí';
    END
END

-- Ticket 3: Yêu cầu thay đổi lịch học
IF @Student3UserId IS NOT NULL AND @AcademicStaffUserId IS NOT NULL
BEGIN
    IF NOT EXISTS (SELECT 1 FROM TICKETS WHERE ticket_number = 'TK-003')
    BEGIN
        INSERT INTO TICKETS (ticket_number, title, description, category, priority, status, created_by, assigned_to, response_count, created_at, updated_at)
        VALUES (
            'TK-003',
            N'Yêu cầu thay đổi lịch học',
            N'Em muốn chuyển từ lớp thứ 2-4-6 sang lớp thứ 3-5-7',
            'academic',
            'medium',
            'waiting',
            @Student3UserId,
            @AcademicStaffUserId,
            2,
            '2025-09-30 14:20:00',
            '2025-10-01 08:00:00'
        );
        PRINT 'Created ticket: TK-003 - Yêu cầu thay đổi lịch học';
    END
END

-- Ticket 4: Không tải được tài liệu PDF
IF @Student4UserId IS NOT NULL
BEGIN
    IF NOT EXISTS (SELECT 1 FROM TICKETS WHERE ticket_number = 'TK-004')
    BEGIN
        INSERT INTO TICKETS (ticket_number, title, description, category, priority, status, created_by, response_count, created_at, updated_at)
        VALUES (
            'TK-004',
            N'Không tải được tài liệu PDF',
            N'Tài liệu môn Toán không tải được, báo lỗi',
            'technical',
            'urgent',
            'open',
            @Student4UserId,
            0,
            '2025-10-01 11:30:00',
            '2025-10-01 11:30:00'
        );
        PRINT 'Created ticket: TK-004 - Không tải được tài liệu PDF';
    END
END

-- Ticket 5: Xác nhận hoàn thành khóa học
IF @Student5UserId IS NOT NULL AND @AcademicStaffUserId IS NOT NULL
BEGIN
    IF NOT EXISTS (SELECT 1 FROM TICKETS WHERE ticket_number = 'TK-005')
    BEGIN
        INSERT INTO TICKETS (ticket_number, title, description, category, priority, status, created_by, assigned_to, response_count, created_at, updated_at, resolved_at)
        VALUES (
            'TK-005',
            N'Xác nhận hoàn thành khóa học',
            N'Em đã hoàn thành khóa học Vật Lý, xin cấp chứng nhận',
            'general',
            'low',
            'resolved',
            @Student5UserId,
            @AcademicStaffUserId,
            5,
            '2025-09-28 09:00:00',
            '2025-09-30 16:00:00',
            '2025-09-30 16:00:00'
        );
        PRINT 'Created ticket: TK-005 - Xác nhận hoàn thành khóa học (resolved)';
    END
END

PRINT '========================================';
PRINT 'Import Tickets completed!';
PRINT '========================================';

