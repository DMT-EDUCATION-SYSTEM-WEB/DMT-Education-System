-- =================================================================
-- IMPORT PAYMENTS FROM MOCK DATA
-- =================================================================
-- Script này import dữ liệu thanh toán từ mock data vào database
-- Nguồn: src/features/staff/pages/PaymentHistory.tsx
-- Cần chạy sau khi đã có: ENROLLMENTS, USERS (staff)
-- =================================================================

USE DMT_EDUCATION_SYSTEM;
GO

-- Lấy Staff Role ID
DECLARE @StaffRoleId INT = (SELECT ID FROM ROLES WHERE CODE = 'STAFF');
DECLARE @AdminRoleId INT = (SELECT ID FROM ROLES WHERE CODE = 'ADMIN');

-- Tạo hoặc lấy Staff user để làm processed_by
DECLARE @StaffUserId INT;
IF NOT EXISTS (SELECT 1 FROM USERS WHERE email = 'staff.payment@dmt.edu.vn')
BEGIN
    INSERT INTO USERS (email, password_hash, full_name, phone, role_id, status, created_at)
    VALUES (
        'staff.payment@dmt.edu.vn',
        '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYIxF6q5Owi',
        N'Nguyễn Thị Staff',
        '0900000100',
        @StaffRoleId,
        1,
        GETDATE()
    );
    SET @StaffUserId = SCOPE_IDENTITY();
END
ELSE
    SELECT @StaffUserId = ID FROM USERS WHERE email = 'staff.payment@dmt.edu.vn';

-- Tạo hoặc lấy Admin user
DECLARE @AdminUserId INT;
IF NOT EXISTS (SELECT 1 FROM USERS WHERE email = 'admin.payment@dmt.edu.vn')
BEGIN
    INSERT INTO USERS (email, password_hash, full_name, phone, role_id, status, created_at)
    VALUES (
        'admin.payment@dmt.edu.vn',
        '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYIxF6q5Owi',
        N'Trần Văn Admin',
        '0900000101',
        @AdminRoleId,
        1,
        GETDATE()
    );
    SET @AdminUserId = SCOPE_IDENTITY();
END
ELSE
    SELECT @AdminUserId = ID FROM USERS WHERE email = 'admin.payment@dmt.edu.vn';

-- Lấy Enrollment IDs
DECLARE @Enrollment1Id INT = (
    SELECT TOP 1 e.ID FROM ENROLLMENTS e
    INNER JOIN STUDENTS s ON e.STUDENT_ID = s.ID
    WHERE s.STUDENT_CODE = 'HS2025001'
);
DECLARE @Enrollment2Id INT = (
    SELECT TOP 1 e.ID FROM ENROLLMENTS e
    INNER JOIN STUDENTS s ON e.STUDENT_ID = s.ID
    WHERE s.STUDENT_CODE = 'HS2025002'
);
DECLARE @Enrollment3Id INT = (
    SELECT TOP 1 e.ID FROM ENROLLMENTS e
    INNER JOIN STUDENTS s ON e.STUDENT_ID = s.ID
    WHERE s.STUDENT_CODE = 'HS2025003'
);
DECLARE @Enrollment4Id INT = (
    SELECT TOP 1 e.ID FROM ENROLLMENTS e
    INNER JOIN STUDENTS s ON e.STUDENT_ID = s.ID
    WHERE s.STUDENT_CODE = 'HS2025004'
);
DECLARE @Enrollment5Id INT = (
    SELECT TOP 1 e.ID FROM ENROLLMENTS e
    INNER JOIN STUDENTS s ON e.STUDENT_ID = s.ID
    WHERE s.STUDENT_CODE = 'HS2025005'
);

-- Payment 1: Nguyễn Văn A - BL2025001
IF @Enrollment1Id IS NOT NULL
BEGIN
    IF NOT EXISTS (SELECT 1 FROM PAYMENTS WHERE payment_code = 'BL2025001')
    BEGIN
        INSERT INTO PAYMENTS (payment_code, enrollment_id, amount, payment_date, payment_method, status, receipt_number, transaction_id, description, processed_by, created_at)
        VALUES (
            'BL2025001',
            @Enrollment1Id,
            2500000.00,
            '2025-01-15',
            'BANK_TRANSFER',
            'COMPLETED',
            'BL2025001',
            'TXN123456',
            N'Thanh toán đợt 1',
            @StaffUserId,
            '2025-01-15 10:30:00'
        );
        PRINT 'Created payment: BL2025001 - Nguyễn Văn A';
    END
    ELSE
        PRINT 'Payment BL2025001 already exists';
END

-- Payment 2: Trần Thị B - BL2025002
IF @Enrollment2Id IS NOT NULL
BEGIN
    IF NOT EXISTS (SELECT 1 FROM PAYMENTS WHERE payment_code = 'BL2025002')
    BEGIN
        INSERT INTO PAYMENTS (payment_code, enrollment_id, amount, payment_date, payment_method, status, receipt_number, transaction_id, description, processed_by, created_at)
        VALUES (
            'BL2025002',
            @Enrollment2Id,
            4000000.00,
            '2025-01-16',
            'CASH',
            'COMPLETED',
            'BL2025002',
            NULL,
            N'Thanh toán full học phí',
            @StaffUserId,
            '2025-01-16 14:20:00'
        );
        PRINT 'Created payment: BL2025002 - Trần Thị B';
    END
    ELSE
        PRINT 'Payment BL2025002 already exists';
END

-- Payment 3: Lê Văn C - BL2025003
IF @Enrollment3Id IS NOT NULL
BEGIN
    IF NOT EXISTS (SELECT 1 FROM PAYMENTS WHERE payment_code = 'BL2025003')
    BEGIN
        INSERT INTO PAYMENTS (payment_code, enrollment_id, amount, payment_date, payment_method, status, receipt_number, transaction_id, description, processed_by, created_at)
        VALUES (
            'BL2025003',
            @Enrollment3Id,
            1500000.00,
            '2025-01-17',
            'E_WALLET',
            'COMPLETED',
            'BL2025003',
            'MOMO789012',
            N'Thanh toán qua ví MoMo',
            @AdminUserId,
            '2025-01-17 09:15:00'
        );
        PRINT 'Created payment: BL2025003 - Lê Văn C';
    END
    ELSE
        PRINT 'Payment BL2025003 already exists';
END

-- Payment 4: Phạm Thị D - BL2025004 (PENDING)
IF @Enrollment4Id IS NOT NULL
BEGIN
    IF NOT EXISTS (SELECT 1 FROM PAYMENTS WHERE payment_code = 'BL2025004')
    BEGIN
        INSERT INTO PAYMENTS (payment_code, enrollment_id, amount, payment_date, payment_method, status, receipt_number, transaction_id, description, processed_by, created_at)
        VALUES (
            'BL2025004',
            @Enrollment4Id,
            3000000.00,
            '2025-01-18',
            'CREDIT_CARD',
            'PENDING',
            'BL2025004',
            'CARD345678',
            N'Đang chờ xác nhận ngân hàng',
            @StaffUserId,
            '2025-01-18 11:45:00'
        );
        PRINT 'Created payment: BL2025004 - Phạm Thị D (PENDING)';
    END
    ELSE
        PRINT 'Payment BL2025004 already exists';
END

-- Payment 5: Hoàng Văn E - BL2025005
IF @Enrollment5Id IS NOT NULL
BEGIN
    IF NOT EXISTS (SELECT 1 FROM PAYMENTS WHERE payment_code = 'BL2025005')
    BEGIN
        INSERT INTO PAYMENTS (payment_code, enrollment_id, amount, payment_date, payment_method, status, receipt_number, transaction_id, description, processed_by, created_at)
        VALUES (
            'BL2025005',
            @Enrollment5Id,
            2000000.00,
            '2025-01-19',
            'BANK_TRANSFER',
            'COMPLETED',
            'BL2025005',
            'TXN901234',
            N'Thanh toán đợt 2',
            @StaffUserId,
            '2025-01-19 16:00:00'
        );
        PRINT 'Created payment: BL2025005 - Hoàng Văn E';
    END
    ELSE
        PRINT 'Payment BL2025005 already exists';
END

PRINT '========================================';
PRINT 'Import Payments completed!';
PRINT '========================================';

