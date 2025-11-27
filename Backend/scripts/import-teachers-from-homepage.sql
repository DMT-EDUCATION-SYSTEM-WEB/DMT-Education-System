-- Import Teachers from Homepage Mock Data
-- This script adds 8 teachers matching the TeachersShowcase component data

USE DMT_EDUCATION_SYSTEM;
GO

DECLARE @TeacherRoleId INT = 3; -- TEACHER role

-- Check and get/create subject IDs
DECLARE @MathSubjectId INT = (SELECT TOP 1 ID FROM SUBJECTS WHERE CODE LIKE '%MATH%' OR NAME LIKE N'%Toán%');
DECLARE @EnglishSubjectId INT = (SELECT TOP 1 ID FROM SUBJECTS WHERE CODE LIKE '%ENG%' OR NAME LIKE N'%Anh%');
DECLARE @LiteratureSubjectId INT = (SELECT TOP 1 ID FROM SUBJECTS WHERE CODE LIKE '%LIT%' OR NAME LIKE N'%Văn%');
DECLARE @iSmartSubjectId INT = (SELECT TOP 1 ID FROM SUBJECTS WHERE CODE LIKE '%ISMART%');

-- Create subjects if they don't exist
IF @MathSubjectId IS NULL
BEGIN
    INSERT INTO SUBJECTS (CODE, NAME, DESCRIPTION, IS_ACTIVE) 
    VALUES ('MATH', N'Toán học', N'Môn Toán học', 1);
    SET @MathSubjectId = SCOPE_IDENTITY();
END

IF @EnglishSubjectId IS NULL
BEGIN
    INSERT INTO SUBJECTS (CODE, NAME, DESCRIPTION, IS_ACTIVE) 
    VALUES ('ENG', N'Tiếng Anh', N'Môn Tiếng Anh', 1);
    SET @EnglishSubjectId = SCOPE_IDENTITY();
END

IF @LiteratureSubjectId IS NULL
BEGIN
    INSERT INTO SUBJECTS (CODE, NAME, DESCRIPTION, IS_ACTIVE) 
    VALUES ('LIT', N'Ngữ Văn', N'Môn Ngữ Văn', 1);
    SET @LiteratureSubjectId = SCOPE_IDENTITY();
END

IF @iSmartSubjectId IS NULL
BEGIN
    INSERT INTO SUBJECTS (CODE, NAME, DESCRIPTION, IS_ACTIVE) 
    VALUES ('ISMART', N'iSmart', N'Toán tư duy iSmart', 1);
    SET @iSmartSubjectId = SCOPE_IDENTITY();
END

PRINT 'Subjects verified/created';
PRINT '';

-- Teacher 1: Nguyễn Văn Hùng - Toán THCS
IF NOT EXISTS (SELECT 1 FROM USERS WHERE EMAIL = 'hung.nguyen@dmt.edu.vn')
BEGIN
    INSERT INTO USERS (ROLE_ID, EMAIL, PASSWORD_HASH, FULL_NAME, PHONE, ADDRESS, BIRTH_DATE, STATUS)
    VALUES (
        @TeacherRoleId,
        'hung.nguyen@dmt.edu.vn',
        '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYIxF6q5Owi', -- Teacher@123
        N'Nguyễn Văn Hùng',
        '0123 456 789',
        N'TP. Hồ Chí Minh',
        '1978-01-15',
        1
    );
    
    DECLARE @UserId1 INT = SCOPE_IDENTITY();
    
    INSERT INTO TEACHERS (USER_ID, TEACHER_CODE, MAIN_SUBJECT_ID, YEARS_EXPERIENCE, DEGREE, SPECIALIZATION)
    VALUES (
        @UserId1,
        'DMT-GV-001',
        @MathSubjectId,
        15,
        N'Thạc sĩ Toán học',
        N'Đại số, Hình học, Số học, Ôn thi chuyển cấp'
    );
    
    PRINT 'Created teacher: Nguyễn Văn Hùng';
END
ELSE
    PRINT 'Teacher Nguyễn Văn Hùng already exists';

-- Teacher 2: Phạm Thị Lan - Toán THPT
IF NOT EXISTS (SELECT 1 FROM USERS WHERE EMAIL = 'lan.pham@dmt.edu.vn')
BEGIN
    INSERT INTO USERS (ROLE_ID, EMAIL, PASSWORD_HASH, FULL_NAME, PHONE, ADDRESS, BIRTH_DATE, STATUS)
    VALUES (
        @TeacherRoleId,
        'lan.pham@dmt.edu.vn',
        '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYIxF6q5Owi',
        N'Phạm Thị Lan',
        '0123 456 790',
        N'TP. Hồ Chí Minh',
        '1982-03-20',
        1
    );
    
    DECLARE @UserId2 INT = SCOPE_IDENTITY();
    
    INSERT INTO TEACHERS (USER_ID, TEACHER_CODE, MAIN_SUBJECT_ID, YEARS_EXPERIENCE, DEGREE, SPECIALIZATION)
    VALUES (
        @UserId2,
        'DMT-GV-002',
        @MathSubjectId,
        12,
        N'Thạc sĩ Toán học',
        N'Giải tích, Hình học không gian, Luyện đề THPT, Đại số'
    );
    
    PRINT 'Created teacher: Phạm Thị Lan';
END
ELSE
    PRINT 'Teacher Phạm Thị Lan already exists';

-- Teacher 3: Trần Thị Mai - Ngữ Văn THCS
IF NOT EXISTS (SELECT 1 FROM USERS WHERE EMAIL = 'mai.tran@dmt.edu.vn')
BEGIN
    INSERT INTO USERS (ROLE_ID, EMAIL, PASSWORD_HASH, FULL_NAME, PHONE, ADDRESS, BIRTH_DATE, STATUS)
    VALUES (
        @TeacherRoleId,
        'mai.tran@dmt.edu.vn',
        '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYIxF6q5Owi',
        N'Trần Thị Mai',
        '0123 456 791',
        N'TP. Hồ Chí Minh',
        '1985-07-10',
        1
    );
    
    DECLARE @UserId3 INT = SCOPE_IDENTITY();
    
    INSERT INTO TEACHERS (USER_ID, TEACHER_CODE, MAIN_SUBJECT_ID, YEARS_EXPERIENCE, DEGREE, SPECIALIZATION)
    VALUES (
        @UserId3,
        'DMT-GV-003',
        @LiteratureSubjectId,
        10,
        N'Cử nhân Ngữ văn',
        N'Văn nghị luận, Văn tả, Đọc hiểu, Làm văn'
    );
    
    PRINT 'Created teacher: Trần Thị Mai';
END
ELSE
    PRINT 'Teacher Trần Thị Mai already exists';

-- Teacher 4: Lê Minh Tuấn - Ngữ Văn THPT
IF NOT EXISTS (SELECT 1 FROM USERS WHERE EMAIL = 'tuan.le@dmt.edu.vn')
BEGIN
    INSERT INTO USERS (ROLE_ID, EMAIL, PASSWORD_HASH, FULL_NAME, PHONE, ADDRESS, BIRTH_DATE, STATUS)
    VALUES (
        @TeacherRoleId,
        'tuan.le@dmt.edu.vn',
        '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYIxF6q5Owi',
        N'Lê Minh Tuấn',
        '0123 456 792',
        N'TP. Hồ Chí Minh',
        '1980-05-25',
        1
    );
    
    DECLARE @UserId4 INT = SCOPE_IDENTITY();
    
    INSERT INTO TEACHERS (USER_ID, TEACHER_CODE, MAIN_SUBJECT_ID, YEARS_EXPERIENCE, DEGREE, SPECIALIZATION)
    VALUES (
        @UserId4,
        'DMT-GV-004',
        @LiteratureSubjectId,
        14,
        N'Thạc sĩ Văn học',
        N'Phân tích tác phẩm, Nghị luận xã hội, Luyện đề THPT, Văn học'
    );
    
    PRINT 'Created teacher: Lê Minh Tuấn';
END
ELSE
    PRINT 'Teacher Lê Minh Tuấn already exists';

-- Teacher 5: Nguyễn Hải Yến - Tiếng Anh THCS
IF NOT EXISTS (SELECT 1 FROM USERS WHERE EMAIL = 'yen.nguyen@dmt.edu.vn')
BEGIN
    INSERT INTO USERS (ROLE_ID, EMAIL, PASSWORD_HASH, FULL_NAME, PHONE, ADDRESS, BIRTH_DATE, STATUS)
    VALUES (
        @TeacherRoleId,
        'yen.nguyen@dmt.edu.vn',
        '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYIxF6q5Owi',
        N'Nguyễn Hải Yến',
        '0123 456 793',
        N'TP. Hồ Chí Minh',
        '1988-09-15',
        1
    );
    
    DECLARE @UserId5 INT = SCOPE_IDENTITY();
    
    INSERT INTO TEACHERS (USER_ID, TEACHER_CODE, MAIN_SUBJECT_ID, YEARS_EXPERIENCE, DEGREE, SPECIALIZATION)
    VALUES (
        @UserId5,
        'DMT-GV-005',
        @EnglishSubjectId,
        9,
        N'Cử nhân Ngôn ngữ Anh',
        N'Giao tiếp, Ngữ pháp, Từ vựng, Luyện nghe nói'
    );
    
    PRINT 'Created teacher: Nguyễn Hải Yến';
END
ELSE
    PRINT 'Teacher Nguyễn Hải Yến already exists';

-- Teacher 6: David Smith - Tiếng Anh THPT
IF NOT EXISTS (SELECT 1 FROM USERS WHERE EMAIL = 'david.smith@dmt.edu.vn')
BEGIN
    INSERT INTO USERS (ROLE_ID, EMAIL, PASSWORD_HASH, FULL_NAME, PHONE, ADDRESS, BIRTH_DATE, STATUS)
    VALUES (
        @TeacherRoleId,
        'david.smith@dmt.edu.vn',
        '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYIxF6q5Owi',
        N'David Smith',
        '0123 456 794',
        N'TP. Hồ Chí Minh',
        '1985-12-10',
        1
    );
    
    DECLARE @UserId6 INT = SCOPE_IDENTITY();
    
    INSERT INTO TEACHERS (USER_ID, TEACHER_CODE, MAIN_SUBJECT_ID, YEARS_EXPERIENCE, DEGREE, SPECIALIZATION)
    VALUES (
        @UserId6,
        'DMT-GV-006',
        @EnglishSubjectId,
        8,
        N'TESOL Certificate, Bachelor of Education',
        N'IELTS, THPT Quốc gia, Reading, Writing'
    );
    
    PRINT 'Created teacher: David Smith';
END
ELSE
    PRINT 'Teacher David Smith already exists';

-- Teacher 7: Hoàng Đức Minh - iSmart
IF NOT EXISTS (SELECT 1 FROM USERS WHERE EMAIL = 'minh.hoang@dmt.edu.vn')
BEGIN
    INSERT INTO USERS (ROLE_ID, EMAIL, PASSWORD_HASH, FULL_NAME, PHONE, ADDRESS, BIRTH_DATE, STATUS)
    VALUES (
        @TeacherRoleId,
        'minh.hoang@dmt.edu.vn',
        '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYIxF6q5Owi',
        N'Hoàng Đức Minh',
        '0123 456 795',
        N'TP. Hồ Chí Minh',
        '1990-02-28',
        1
    );
    
    DECLARE @UserId7 INT = SCOPE_IDENTITY();
    
    INSERT INTO TEACHERS (USER_ID, TEACHER_CODE, MAIN_SUBJECT_ID, YEARS_EXPERIENCE, DEGREE, SPECIALIZATION)
    VALUES (
        @UserId7,
        'DMT-GV-007',
        @iSmartSubjectId,
        6,
        N'Cử nhân Sư phạm Toán',
        N'Tư duy logic, Toán nâng cao, iSmart, Giải toán sáng tạo'
    );
    
    PRINT 'Created teacher: Hoàng Đức Minh';
END
ELSE
    PRINT 'Teacher Hoàng Đức Minh already exists';

-- Teacher 8: Phan Văn Thành - Toán HSG
IF NOT EXISTS (SELECT 1 FROM USERS WHERE EMAIL = 'thanh.phan@dmt.edu.vn')
BEGIN
    INSERT INTO USERS (ROLE_ID, EMAIL, PASSWORD_HASH, FULL_NAME, PHONE, ADDRESS, BIRTH_DATE, STATUS)
    VALUES (
        @TeacherRoleId,
        'thanh.phan@dmt.edu.vn',
        '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYIxF6q5Owi',
        N'Phan Văn Thành',
        '0123 456 796',
        N'TP. Hồ Chí Minh',
        '1975-11-05',
        1
    );
    
    DECLARE @UserId8 INT = SCOPE_IDENTITY();
    
    INSERT INTO TEACHERS (USER_ID, TEACHER_CODE, MAIN_SUBJECT_ID, YEARS_EXPERIENCE, DEGREE, SPECIALIZATION)
    VALUES (
        @UserId8,
        'DMT-GV-008',
        @MathSubjectId,
        18,
        N'Tiến sĩ Toán học',
        N'Toán HSG, Olimpic, Chuyên đề nâng cao, Bồi dưỡng tỉnh'
    );
    
    PRINT 'Created teacher: Phan Văn Thành';
END
ELSE
    PRINT 'Teacher Phan Văn Thành already exists';

GO

-- Verify the imported data
PRINT '';
PRINT '==============================================';
PRINT 'Verification - All Teachers:';
PRINT '==============================================';

SELECT 
    t.ID as teacher_id,
    t.TEACHER_CODE,
    u.FULL_NAME as teacher_name,
    u.EMAIL,
    u.PHONE,
    s.NAME as main_subject,
    t.YEARS_EXPERIENCE,
    t.DEGREE,
    t.SPECIALIZATION,
    CASE WHEN u.STATUS = 1 THEN 'Active' ELSE 'Inactive' END as status
FROM TEACHERS t
INNER JOIN USERS u ON t.USER_ID = u.ID
LEFT JOIN SUBJECTS s ON t.MAIN_SUBJECT_ID = s.ID
WHERE u.EMAIL IN (
    'hung.nguyen@dmt.edu.vn',
    'lan.pham@dmt.edu.vn',
    'mai.tran@dmt.edu.vn',
    'tuan.le@dmt.edu.vn',
    'yen.nguyen@dmt.edu.vn',
    'david.smith@dmt.edu.vn',
    'minh.hoang@dmt.edu.vn',
    'thanh.phan@dmt.edu.vn'
)
ORDER BY t.ID;

PRINT '';
PRINT '==============================================';
PRINT 'Teachers imported successfully!';
PRINT 'Total teachers: 8';
PRINT 'Default password for all: Teacher@123';
PRINT '==============================================';






