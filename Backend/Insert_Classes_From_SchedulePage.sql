-- ===================================================================
-- Insert Classes from SchedulePage.tsx Mock Data
-- ===================================================================
-- Script này thêm 5 lớp học từ mock data trong SchedulePage.tsx
-- ===================================================================

USE DMT_EDUCATION_SYSTEM;
GO

PRINT '==============================================';
PRINT 'Bắt đầu thêm lớp học từ SchedulePage.tsx';
PRINT '==============================================';

-- Lấy hoặc tạo các Course cần thiết
DECLARE @IELTSCourseId INT, @MathCourseId INT, @ChemistryCourseId INT, @VietnameseCourseId INT, @ScienceCourseId INT;

-- Course 1: IELTS
IF NOT EXISTS (SELECT 1 FROM COURSES WHERE name LIKE N'%IELTS%')
BEGIN
    DECLARE @SubjectId INT = (SELECT TOP 1 ID FROM SUBJECTS WHERE name LIKE N'%Anh%');
    INSERT INTO COURSES (name, code, subject_id, description, duration_weeks, fee, status)
    VALUES (N'IELTS Intensive', 'IELTS-001', @SubjectId, N'Khóa học IELTS chuyên sâu', 12, 7800000, 'active');
    SET @IELTSCourseId = SCOPE_IDENTITY();
    PRINT '✓ Đã tạo khóa học: IELTS Intensive';
END
ELSE
    SET @IELTSCourseId = (SELECT TOP 1 ID FROM COURSES WHERE name LIKE N'%IELTS%');

-- Course 2: Toán Tư duy
IF NOT EXISTS (SELECT 1 FROM COURSES WHERE name LIKE N'%Toán%' AND name LIKE N'%Tư duy%')
BEGIN
    DECLARE @MathSubjectId INT = (SELECT TOP 1 ID FROM SUBJECTS WHERE name LIKE N'%Toán%');
    INSERT INTO COURSES (name, code, subject_id, description, duration_weeks, fee, status)
    VALUES (N'Toán Tư duy', 'MATH-001', @MathSubjectId, N'Khóa học Toán tư duy', 16, 4500000, 'active');
    SET @MathCourseId = SCOPE_IDENTITY();
    PRINT '✓ Đã tạo khóa học: Toán Tư duy';
END
ELSE
    SET @MathCourseId = (SELECT TOP 1 ID FROM COURSES WHERE name LIKE N'%Toán%' AND name LIKE N'%Tư duy%');

-- Course 3: Hóa học nâng cao
IF NOT EXISTS (SELECT 1 FROM COURSES WHERE name LIKE N'%Hóa%' AND name LIKE N'%nâng cao%')
BEGIN
    DECLARE @ChemistrySubjectId INT = (SELECT TOP 1 ID FROM SUBJECTS WHERE name LIKE N'%Hóa%');
    INSERT INTO COURSES (name, code, subject_id, description, duration_weeks, fee, status)
    VALUES (N'Hóa học nâng cao', 'CHEM-001', @ChemistrySubjectId, N'Khóa học Hóa học nâng cao', 20, 5200000, 'active');
    SET @ChemistryCourseId = SCOPE_IDENTITY();
    PRINT '✓ Đã tạo khóa học: Hóa học nâng cao';
END
ELSE
    SET @ChemistryCourseId = (SELECT TOP 1 ID FROM COURSES WHERE name LIKE N'%Hóa%' AND name LIKE N'%nâng cao%');

-- Course 4: Tiếng Việt nâng cao
IF NOT EXISTS (SELECT 1 FROM COURSES WHERE name LIKE N'%Tiếng Việt%' AND name LIKE N'%nâng cao%')
BEGIN
    DECLARE @VietnameseSubjectId INT = (SELECT TOP 1 ID FROM SUBJECTS WHERE name LIKE N'%Văn%');
    INSERT INTO COURSES (name, code, subject_id, description, duration_weeks, fee, status)
    VALUES (N'Tiếng Việt nâng cao', 'VIET-001', @VietnameseSubjectId, N'Khóa học Tiếng Việt nâng cao', 16, 3800000, 'active');
    SET @VietnameseCourseId = SCOPE_IDENTITY();
    PRINT '✓ Đã tạo khóa học: Tiếng Việt nâng cao';
END
ELSE
    SET @VietnameseCourseId = (SELECT TOP 1 ID FROM COURSES WHERE name LIKE N'%Tiếng Việt%' AND name LIKE N'%nâng cao%');

-- Course 5: Khoa học tự nhiên
IF NOT EXISTS (SELECT 1 FROM COURSES WHERE name LIKE N'%Khoa học%' AND name LIKE N'%tự nhiên%')
BEGIN
    DECLARE @ScienceSubjectId INT = (SELECT TOP 1 ID FROM SUBJECTS WHERE name LIKE N'%Sinh%');
    INSERT INTO COURSES (name, code, subject_id, description, duration_weeks, fee, status)
    VALUES (N'Khoa học tự nhiên', 'SCI-001', @ScienceSubjectId, N'Khóa học Khoa học tự nhiên', 18, 4200000, 'active');
    SET @ScienceCourseId = SCOPE_IDENTITY();
    PRINT '✓ Đã tạo khóa học: Khoa học tự nhiên';
END
ELSE
    SET @ScienceCourseId = (SELECT TOP 1 ID FROM COURSES WHERE name LIKE N'%Khoa học%' AND name LIKE N'%tự nhiên%');

-- Lấy Teacher IDs (sử dụng teachers từ script trước)
DECLARE @Teacher1Id INT = (SELECT TOP 1 ID FROM TEACHERS WHERE TEACHER_CODE = 'GV003'); -- Trần Anh Khoa
DECLARE @Teacher2Id INT = (SELECT TOP 1 ID FROM TEACHERS WHERE TEACHER_CODE = 'GV001'); -- Trần Giang Thanh
DECLARE @Teacher3Id INT = (SELECT TOP 1 ID FROM TEACHERS WHERE TEACHER_CODE = 'GV005'); -- Từ Kim Loan
DECLARE @Teacher4Id INT = (SELECT TOP 1 ID FROM TEACHERS WHERE TEACHER_CODE = 'GV002'); -- Hà Đăng Như Quỳnh
DECLARE @Teacher5Id INT = (SELECT TOP 1 ID FROM TEACHERS WHERE TEACHER_CODE = 'GV006'); -- Lê Văn Minh

-- Class 1: IELTS Intensive
IF NOT EXISTS (SELECT 1 FROM CLASSES WHERE CODE = 'IELTS-GV-01')
BEGIN
    INSERT INTO CLASSES (
        course_id, code, name, teacher_id, capacity, current_students, 
        start_date, end_date, schedule_days, schedule_time, classroom, status, created_at
    )
    VALUES (
        @IELTSCourseId,
        'IELTS-GV-01',
        N'IELTS Intensive',
        @Teacher1Id,
        15,
        12,
        '2025-01-15',
        '2025-04-15',
        N'Thứ 2, 4, 6',
        N'18:30-20:30',
        N'Gò Vấp',
        'active',
        '2025-01-01'
    );
    PRINT '✓ Đã thêm lớp: IELTS-GV-01';
END
ELSE
    PRINT '- Lớp IELTS-GV-01 đã tồn tại';

-- Class 2: Toán Tư duy
IF NOT EXISTS (SELECT 1 FROM CLASSES WHERE CODE = 'MATH-GV-01')
BEGIN
    INSERT INTO CLASSES (
        course_id, code, name, teacher_id, capacity, current_students,
        start_date, end_date, schedule_days, schedule_time, classroom, status, created_at
    )
    VALUES (
        @MathCourseId,
        'MATH-GV-01',
        N'Toán Tư duy',
        @Teacher2Id,
        20,
        18,
        '2025-01-15',
        '2025-05-15',
        N'Thứ 3, 5, 7',
        N'17:00-19:00',
        N'Gò Vấp',
        'active',
        '2025-01-01'
    );
    PRINT '✓ Đã thêm lớp: MATH-GV-01';
END
ELSE
    PRINT '- Lớp MATH-GV-01 đã tồn tại';

-- Class 3: Hóa học nâng cao
IF NOT EXISTS (SELECT 1 FROM CLASSES WHERE CODE = 'CODE-TB-01')
BEGIN
    INSERT INTO CLASSES (
        course_id, code, name, teacher_id, capacity, current_students,
        start_date, end_date, schedule_days, schedule_time, classroom, status, created_at
    )
    VALUES (
        @ChemistryCourseId,
        'CODE-TB-01',
        N'Hóa học nâng cao',
        @Teacher3Id,
        12,
        10,
        '2025-01-20',
        '2025-06-20',
        N'Thứ 3, 5',
        N'19:00-21:00',
        N'Tân Bình',
        'active',
        '2025-01-01'
    );
    PRINT '✓ Đã thêm lớp: CODE-TB-01';
END
ELSE
    PRINT '- Lớp CODE-TB-01 đã tồn tại';

-- Class 4: Tiếng Việt nâng cao
IF NOT EXISTS (SELECT 1 FROM CLASSES WHERE CODE = 'VIET-TB-01')
BEGIN
    INSERT INTO CLASSES (
        course_id, code, name, teacher_id, capacity, current_students,
        start_date, end_date, schedule_days, schedule_time, classroom, status, created_at
    )
    VALUES (
        @VietnameseCourseId,
        'VIET-TB-01',
        N'Tiếng Việt nâng cao',
        @Teacher4Id,
        18,
        15,
        '2025-01-20',
        '2025-05-20',
        N'Thứ 2, 4, 6',
        N'17:30-19:30',
        N'Tân Bình',
        'active',
        '2025-01-01'
    );
    PRINT '✓ Đã thêm lớp: VIET-TB-01';
END
ELSE
    PRINT '- Lớp VIET-TB-01 đã tồn tại';

-- Class 5: Khoa học tự nhiên
IF NOT EXISTS (SELECT 1 FROM CLASSES WHERE CODE = 'SCI-TD-01')
BEGIN
    INSERT INTO CLASSES (
        course_id, code, name, teacher_id, capacity, current_students,
        start_date, end_date, schedule_days, schedule_time, classroom, status, created_at
    )
    VALUES (
        @ScienceCourseId,
        'SCI-TD-01',
        N'Khoa học tự nhiên',
        @Teacher5Id,
        16,
        14,
        '2025-01-25',
        '2025-06-25',
        N'Thứ 2, 4',
        N'18:00-20:00',
        N'Thủ Đức',
        'active',
        '2025-01-01'
    );
    PRINT '✓ Đã thêm lớp: SCI-TD-01';
END
ELSE
    PRINT '- Lớp SCI-TD-01 đã tồn tại';

GO

-- Kiểm tra kết quả
PRINT '';
PRINT '==============================================';
PRINT 'Danh sách lớp học vừa thêm:';
PRINT '==============================================';

SELECT 
    c.ID,
    c.CODE,
    c.NAME,
    co.NAME as COURSE_NAME,
    CONCAT(u.FULL_NAME, ' (', t.TEACHER_CODE, ')') as TEACHER,
    c.CAPACITY,
    c.CURRENT_STUDENTS,
    c.SCHEDULE_DAYS,
    c.SCHEDULE_TIME,
    c.CLASSROOM,
    c.STATUS
FROM CLASSES c
INNER JOIN COURSES co ON c.COURSE_ID = co.ID
INNER JOIN TEACHERS t ON c.TEACHER_ID = t.ID
INNER JOIN USERS u ON t.USER_ID = u.ID
WHERE c.CODE IN ('IELTS-GV-01', 'MATH-GV-01', 'CODE-TB-01', 'VIET-TB-01', 'SCI-TD-01')
ORDER BY c.CODE;

PRINT '';
PRINT '==============================================';
PRINT 'Hoàn thành! Tổng số: 5 lớp học';
PRINT '==============================================';
