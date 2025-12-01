-- =================================================================
-- IMPORT STUDENTS FROM MOCK DATA
-- =================================================================
-- Script này import dữ liệu học sinh từ mock data vào database
-- Chạy sau khi đã có ROLES và SUBJECTS trong database
-- =================================================================

USE DMT_EDUCATION_SYSTEM;
GO

-- Lấy Student Role ID
DECLARE @StudentRoleId INT;
SELECT @StudentRoleId = ID FROM ROLES WHERE CODE = 'STUDENT';
IF @StudentRoleId IS NULL
BEGIN
    PRINT 'ERROR: Student role not found. Please create ROLES first.';
    RETURN;
END

-- Import Students từ mock data
-- Student 1: Nguyễn Văn A
IF NOT EXISTS (SELECT 1 FROM USERS WHERE email = 'nguyenvana@example.com')
BEGIN
    INSERT INTO USERS (email, password_hash, full_name, phone, address, birth_date, role_id, status, created_at)
    VALUES (
        'nguyenvana@example.com',
        '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYIxF6q5Owi', -- Student@123
        N'Nguyễn Văn A',
        '0901234567',
        N'123 Đường ABC, Quận 1, TP.HCM',
        '2008-05-15',
        @StudentRoleId,
        1, -- active
        '2025-01-15'
    );
    
    DECLARE @UserId1 INT = SCOPE_IDENTITY();
    
    INSERT INTO STUDENTS (user_id, student_code, school_level, created_at)
    VALUES (
        @UserId1,
        'HS2025001',
        'THPT',
        '2025-01-15'
    );
    PRINT 'Created student: Nguyễn Văn A (HS2025001)';
END
ELSE
    PRINT 'Student Nguyễn Văn A already exists';

-- Student 2: Trần Thị B
IF NOT EXISTS (SELECT 1 FROM USERS WHERE email = 'tranthib@example.com')
BEGIN
    INSERT INTO USERS (email, password_hash, full_name, phone, address, birth_date, role_id, status, created_at)
    VALUES (
        'tranthib@example.com',
        '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYIxF6q5Owi', -- Student@123
        N'Trần Thị B',
        '0902345678',
        N'456 Đường XYZ, Quận 2, TP.HCM',
        '2009-08-20',
        @StudentRoleId,
        1, -- active
        '2025-01-16'
    );
    
    DECLARE @UserId2 INT = SCOPE_IDENTITY();
    
    INSERT INTO STUDENTS (user_id, student_code, school_level, created_at)
    VALUES (
        @UserId2,
        'HS2025002',
        'THCS',
        '2025-01-16'
    );
    PRINT 'Created student: Trần Thị B (HS2025002)';
END
ELSE
    PRINT 'Student Trần Thị B already exists';

-- Student 3: Lê Văn C
IF NOT EXISTS (SELECT 1 FROM USERS WHERE email = 'levanc@example.com')
BEGIN
    INSERT INTO USERS (email, password_hash, full_name, phone, address, birth_date, role_id, status, created_at)
    VALUES (
        'levanc@example.com',
        '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYIxF6q5Owi', -- Student@123
        N'Lê Văn C',
        '0903456789',
        N'789 Đường DEF, Quận 3, TP.HCM',
        '2007-03-10',
        @StudentRoleId,
        0, -- suspended
        '2025-01-17'
    );
    
    DECLARE @UserId3 INT = SCOPE_IDENTITY();
    
    INSERT INTO STUDENTS (user_id, student_code, school_level, created_at)
    VALUES (
        @UserId3,
        'HS2025003',
        'THPT',
        '2025-01-17'
    );
    PRINT 'Created student: Lê Văn C (HS2025003)';
END
ELSE
    PRINT 'Student Lê Văn C already exists';

-- Student 4: Phạm Thị D
IF NOT EXISTS (SELECT 1 FROM USERS WHERE email = 'phamthid@example.com')
BEGIN
    INSERT INTO USERS (email, password_hash, full_name, phone, address, birth_date, role_id, status, created_at)
    VALUES (
        'phamthid@example.com',
        '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYIxF6q5Owi', -- Student@123
        N'Phạm Thị D',
        '0904567890',
        N'321 Đường GHI, Quận 4, TP.HCM',
        '2003-11-25',
        @StudentRoleId,
        1, -- active
        '2025-01-18'
    );
    
    DECLARE @UserId4 INT = SCOPE_IDENTITY();
    
    INSERT INTO STUDENTS (user_id, student_code, school_level, created_at)
    VALUES (
        @UserId4,
        'HS2025004',
        N'Đại học',
        '2025-01-18'
    );
    PRINT 'Created student: Phạm Thị D (HS2025004)';
END
ELSE
    PRINT 'Student Phạm Thị D already exists';

-- Student 5: Hoàng Văn E
IF NOT EXISTS (SELECT 1 FROM USERS WHERE email = 'hoangvane@example.com')
BEGIN
    INSERT INTO USERS (email, password_hash, full_name, phone, address, birth_date, role_id, status, created_at)
    VALUES (
        'hoangvane@example.com',
        '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYIxF6q5Owi', -- Student@123
        N'Hoàng Văn E',
        '0905678901',
        N'654 Đường JKL, Quận 5, TP.HCM',
        '2008-07-12',
        @StudentRoleId,
        1, -- active
        '2025-01-19'
    );
    
    DECLARE @UserId5 INT = SCOPE_IDENTITY();
    
    INSERT INTO STUDENTS (user_id, student_code, school_level, created_at)
    VALUES (
        @UserId5,
        'HS2025005',
        'THPT',
        '2025-01-19'
    );
    PRINT 'Created student: Hoàng Văn E (HS2025005)';
END
ELSE
    PRINT 'Student Hoàng Văn E already exists';

-- Student 6: Vũ Thị F (từ Enrollment mock data) - Skip if already exists
IF NOT EXISTS (SELECT 1 FROM USERS WHERE email = 'vuthif@example.com') AND NOT EXISTS (SELECT 1 FROM STUDENTS WHERE student_code = 'HS2025006')
BEGIN
    INSERT INTO USERS (email, password_hash, full_name, phone, address, birth_date, role_id, status, created_at)
    VALUES (
        'vuthif@example.com',
        '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYIxF6q5Owi', -- Student@123
        N'Vũ Thị F',
        '0906789012',
        N'987 Đường MNO, Quận 6, TP.HCM',
        '2009-02-18',
        @StudentRoleId,
        1, -- active
        '2025-01-20'
    );
    
    DECLARE @UserId6 INT = SCOPE_IDENTITY();
    
    INSERT INTO STUDENTS (user_id, student_code, school_level, created_at)
    VALUES (
        @UserId6,
        'HS2025006',
        'THCS',
        '2025-01-20'
    );
    PRINT 'Created student: Vũ Thị F (HS2025006)';
END
ELSE
    PRINT 'Student Vũ Thị F already exists';

PRINT '========================================';
PRINT 'Import Students completed!';
PRINT '========================================';

