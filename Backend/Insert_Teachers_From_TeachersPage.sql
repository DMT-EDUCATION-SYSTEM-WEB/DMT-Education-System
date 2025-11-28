-- ===================================================================
-- Insert Teachers from TeachersPage.tsx Mock Data
-- ===================================================================
-- Script này thêm 6 giảng viên từ mock data trong TeachersPage.tsx
-- Password mặc định: Teacher@123
-- ===================================================================

USE DMT_EDUCATION_SYSTEM;
GO

DECLARE @TeacherRoleId INT = 3; -- TEACHER role

-- Lấy hoặc tạo các Subject IDs
DECLARE @MathSubjectId INT = (SELECT TOP 1 ID FROM SUBJECTS WHERE name LIKE N'%Toán%');
DECLARE @LiteratureSubjectId INT = (SELECT TOP 1 ID FROM SUBJECTS WHERE name LIKE N'%Văn%');
DECLARE @EnglishSubjectId INT = (SELECT TOP 1 ID FROM SUBJECTS WHERE name LIKE N'%Anh%' OR name LIKE N'%English%');
DECLARE @PhysicsSubjectId INT = (SELECT TOP 1 ID FROM SUBJECTS WHERE name LIKE N'%Vật%' OR name LIKE N'%Lý%');
DECLARE @ChemistrySubjectId INT = (SELECT TOP 1 ID FROM SUBJECTS WHERE name LIKE N'%Hóa%');
DECLARE @BiologySubjectId INT = (SELECT TOP 1 ID FROM SUBJECTS WHERE name LIKE N'%Sinh%');

-- Tạo subjects nếu chưa tồn tại
IF @MathSubjectId IS NULL
BEGIN
    INSERT INTO SUBJECTS (name, description) VALUES (N'Toán học', N'Môn Toán học');
    SET @MathSubjectId = SCOPE_IDENTITY();
END

IF @LiteratureSubjectId IS NULL
BEGIN
    INSERT INTO SUBJECTS (name, description) VALUES (N'Ngữ văn', N'Môn Ngữ văn');
    SET @LiteratureSubjectId = SCOPE_IDENTITY();
END

IF @EnglishSubjectId IS NULL
BEGIN
    INSERT INTO SUBJECTS (name, description) VALUES (N'Tiếng Anh', N'Môn Tiếng Anh');
    SET @EnglishSubjectId = SCOPE_IDENTITY();
END

IF @PhysicsSubjectId IS NULL
BEGIN
    INSERT INTO SUBJECTS (name, description) VALUES (N'Vật lý', N'Môn Vật lý');
    SET @PhysicsSubjectId = SCOPE_IDENTITY();
END

IF @ChemistrySubjectId IS NULL
BEGIN
    INSERT INTO SUBJECTS (name, description) VALUES (N'Hóa học', N'Môn Hóa học');
    SET @ChemistrySubjectId = SCOPE_IDENTITY();
END

IF @BiologySubjectId IS NULL
BEGIN
    INSERT INTO SUBJECTS (name, description) VALUES (N'Sinh học', N'Môn Sinh học');
    SET @BiologySubjectId = SCOPE_IDENTITY();
END

PRINT '==============================================';
PRINT 'Bắt đầu thêm giảng viên từ TeachersPage.tsx';
PRINT '==============================================';

-- Teacher 1: Trần Giang Thanh (Toán học)
IF NOT EXISTS (SELECT 1 FROM USERS WHERE email = 'thanh@dmt.edu.vn')
BEGIN
    INSERT INTO USERS (email, password_hash, full_name, phone, role_id, status, created_at)
    VALUES (
        'thanh@dmt.edu.vn',
        '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYIxF6q5Owi', -- Teacher@123
        N'Trần Giang Thanh',
        '0901234567',
        @TeacherRoleId,
        1,
        '2015-09-01'
    );
    
    DECLARE @UserId1 INT = SCOPE_IDENTITY();
    
    INSERT INTO TEACHERS (user_id, teacher_code, main_subject_id, years_experience, degree, specialization, created_at)
    VALUES (
        @UserId1,
        'GV001',
        @MathSubjectId,
        10,
        N'Thạc sĩ Toán học',
        N'Toán học',
        '2015-09-01'
    );
    
    PRINT '✓ Đã thêm: Trần Giang Thanh (GV001)';
END
ELSE
    PRINT '- Trần Giang Thanh đã tồn tại';

-- Teacher 2: Hà Đăng Như Quỳnh (Ngữ văn)
IF NOT EXISTS (SELECT 1 FROM USERS WHERE email = 'quynh@dmt.edu.vn')
BEGIN
    INSERT INTO USERS (email, password_hash, full_name, phone, role_id, status, created_at)
    VALUES (
        'quynh@dmt.edu.vn',
        '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYIxF6q5Owi',
        N'Hà Đăng Như Quỳnh',
        '0902234567',
        @TeacherRoleId,
        1,
        '2017-08-15'
    );
    
    DECLARE @UserId2 INT = SCOPE_IDENTITY();
    
    INSERT INTO TEACHERS (user_id, teacher_code, main_subject_id, years_experience, degree, specialization, created_at)
    VALUES (
        @UserId2,
        'GV002',
        @LiteratureSubjectId,
        8,
        N'Thạc sĩ Ngữ văn',
        N'Ngữ văn',
        '2017-08-15'
    );
    
    PRINT '✓ Đã thêm: Hà Đăng Như Quỳnh (GV002)';
END
ELSE
    PRINT '- Hà Đăng Như Quỳnh đã tồn tại';

-- Teacher 3: Trần Anh Khoa (Tiếng Anh)
IF NOT EXISTS (SELECT 1 FROM USERS WHERE email = 'khoa@dmt.edu.vn')
BEGIN
    INSERT INTO USERS (email, password_hash, full_name, phone, role_id, status, created_at)
    VALUES (
        'khoa@dmt.edu.vn',
        '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYIxF6q5Owi',
        N'Trần Anh Khoa',
        '0903234567',
        @TeacherRoleId,
        1,
        '2013-09-01'
    );
    
    DECLARE @UserId3 INT = SCOPE_IDENTITY();
    
    INSERT INTO TEACHERS (user_id, teacher_code, main_subject_id, years_experience, degree, specialization, created_at)
    VALUES (
        @UserId3,
        'GV003',
        @EnglishSubjectId,
        12,
        N'Cử nhân Tiếng Anh',
        N'Tiếng Anh',
        '2013-09-01'
    );
    
    PRINT '✓ Đã thêm: Trần Anh Khoa (GV003)';
END
ELSE
    PRINT '- Trần Anh Khoa đã tồn tại';

-- Teacher 4: Nguyễn Bá Thọ (Vật lý)
IF NOT EXISTS (SELECT 1 FROM USERS WHERE email = 'tho@dmt.edu.vn')
BEGIN
    INSERT INTO USERS (email, password_hash, full_name, phone, role_id, status, created_at)
    VALUES (
        'tho@dmt.edu.vn',
        '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYIxF6q5Owi',
        N'Nguyễn Bá Thọ',
        '0904234567',
        @TeacherRoleId,
        1,
        '2010-09-01'
    );
    
    DECLARE @UserId4 INT = SCOPE_IDENTITY();
    
    INSERT INTO TEACHERS (user_id, teacher_code, main_subject_id, years_experience, degree, specialization, created_at)
    VALUES (
        @UserId4,
        'GV004',
        @PhysicsSubjectId,
        15,
        N'Tiến sĩ Vật lý',
        N'Vật lý',
        '2010-09-01'
    );
    
    PRINT '✓ Đã thêm: Nguyễn Bá Thọ (GV004)';
END
ELSE
    PRINT '- Nguyễn Bá Thọ đã tồn tại';

-- Teacher 5: Từ Kim Loan (Hóa học)
IF NOT EXISTS (SELECT 1 FROM USERS WHERE email = 'loan@dmt.edu.vn')
BEGIN
    INSERT INTO USERS (email, password_hash, full_name, phone, role_id, status, created_at)
    VALUES (
        'loan@dmt.edu.vn',
        '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYIxF6q5Owi',
        N'Từ Kim Loan',
        '0905234567',
        @TeacherRoleId,
        1,
        '2016-09-01'
    );
    
    DECLARE @UserId5 INT = SCOPE_IDENTITY();
    
    INSERT INTO TEACHERS (user_id, teacher_code, main_subject_id, years_experience, degree, specialization, created_at)
    VALUES (
        @UserId5,
        'GV005',
        @ChemistrySubjectId,
        9,
        N'Thạc sĩ Hóa học',
        N'Hóa học',
        '2016-09-01'
    );
    
    PRINT '✓ Đã thêm: Từ Kim Loan (GV005)';
END
ELSE
    PRINT '- Từ Kim Loan đã tồn tại';

-- Teacher 6: Lê Văn Minh (Sinh học)
IF NOT EXISTS (SELECT 1 FROM USERS WHERE email = 'minh@dmt.edu.vn')
BEGIN
    INSERT INTO USERS (email, password_hash, full_name, phone, role_id, status, created_at)
    VALUES (
        'minh@dmt.edu.vn',
        '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYIxF6q5Owi',
        N'Lê Văn Minh',
        '0906234567',
        @TeacherRoleId,
        1,
        '2018-09-01'
    );
    
    DECLARE @UserId6 INT = SCOPE_IDENTITY();
    
    INSERT INTO TEACHERS (user_id, teacher_code, main_subject_id, years_experience, degree, specialization, created_at)
    VALUES (
        @UserId6,
        'GV006',
        @BiologySubjectId,
        7,
        N'Thạc sĩ Sinh học',
        N'Sinh học',
        '2018-09-01'
    );
    
    PRINT '✓ Đã thêm: Lê Văn Minh (GV006)';
END
ELSE
    PRINT '- Lê Văn Minh đã tồn tại';

GO

-- Kiểm tra kết quả
PRINT '';
PRINT '==============================================';
PRINT 'Danh sách giảng viên vừa thêm:';
PRINT '==============================================';

SELECT 
    t.ID,
    t.TEACHER_CODE,
    u.FULL_NAME,
    u.EMAIL,
    u.PHONE,
    s.NAME as MAIN_SUBJECT,
    t.YEARS_EXPERIENCE,
    t.DEGREE,
    u.STATUS,
    t.CREATED_AT
FROM TEACHERS t
INNER JOIN USERS u ON t.USER_ID = u.ID
LEFT JOIN SUBJECTS s ON t.MAIN_SUBJECT_ID = s.ID
WHERE u.EMAIL IN (
    'thanh@dmt.edu.vn',
    'quynh@dmt.edu.vn',
    'khoa@dmt.edu.vn',
    'tho@dmt.edu.vn',
    'loan@dmt.edu.vn',
    'minh@dmt.edu.vn'
)
ORDER BY t.TEACHER_CODE;

PRINT '';
PRINT '==============================================';
PRINT 'Hoàn thành! Tổng số: 6 giảng viên';
PRINT 'Mật khẩu mặc định: Teacher@123';
PRINT '==============================================';
