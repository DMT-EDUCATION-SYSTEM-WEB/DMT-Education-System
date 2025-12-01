-- =================================================================
-- IMPORT ENROLLMENTS FROM MOCK DATA
-- =================================================================
-- Script này import dữ liệu đăng ký học từ mock data vào database
-- Cần chạy sau khi đã có: ROLES, USERS, STUDENTS, SUBJECTS, COURSES, CLASSES, TEACHERS
-- =================================================================

USE DMT_EDUCATION_SYSTEM;
GO

-- Kiểm tra và tạo các lớp học cần thiết nếu chưa có
-- Lớp 1: Toán 10A - Học kỳ 1
DECLARE @MathSubjectId INT;
SELECT @MathSubjectId = ID FROM SUBJECTS WHERE CODE = 'MATH' OR NAME LIKE N'%Toán%';
IF @MathSubjectId IS NULL
BEGIN
    INSERT INTO SUBJECTS (name, code, description, is_active, created_at)
    VALUES (N'Toán học', 'MATH', N'Môn Toán học', 1, GETDATE());
    SET @MathSubjectId = SCOPE_IDENTITY();
END

DECLARE @MathCourseId INT;
SELECT @MathCourseId = ID FROM COURSES WHERE CODE = 'MATH-10A' OR NAME LIKE N'%Toán 10%';
IF @MathCourseId IS NULL
BEGIN
    INSERT INTO COURSES (subject_id, code, name, description, duration_weeks, total_sessions, price, level, is_active, created_at)
    VALUES (
        @MathSubjectId,
        'MATH-10A',
        N'Toán 10A - Học kỳ 1',
        N'Khóa học Toán lớp 10 học kỳ 1',
        20,
        40,
        5000000.00,
        'INTERMEDIATE',
        1,
        GETDATE()
    );
    SET @MathCourseId = SCOPE_IDENTITY();
END

DECLARE @MathTeacherId INT;
SELECT TOP 1 @MathTeacherId = t.ID FROM TEACHERS t
INNER JOIN USERS u ON t.USER_ID = u.ID
WHERE t.MAIN_SUBJECT_ID = @MathSubjectId OR u.FULL_NAME LIKE N'%Nguyễn%';
IF @MathTeacherId IS NULL
BEGIN
    -- Tạo teacher tạm nếu chưa có
    DECLARE @TeacherRoleId INT = (SELECT ID FROM ROLES WHERE CODE = 'TEACHER');
    DECLARE @TeacherUserId INT;
    INSERT INTO USERS (email, password_hash, full_name, phone, role_id, status, created_at)
    VALUES ('teacher.math@dmt.edu.vn', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYIxF6q5Owi', N'Thầy Nguyễn Văn B', '0900000001', @TeacherRoleId, 1, GETDATE());
    SET @TeacherUserId = SCOPE_IDENTITY();
    INSERT INTO TEACHERS (user_id, teacher_code, main_subject_id, years_experience, created_at)
    VALUES (@TeacherUserId, 'DMT-GV-TEMP-001', @MathSubjectId, 10, GETDATE());
    SET @MathTeacherId = SCOPE_IDENTITY();
END

DECLARE @Class1Id INT;
SELECT @Class1Id = ID FROM CLASSES WHERE CODE = 'TOAN10A-HK1';
IF @Class1Id IS NULL
BEGIN
    INSERT INTO CLASSES (course_id, code, name, teacher_id, capacity, current_students, start_date, end_date, schedule_days, schedule_time, classroom, status, created_at)
    VALUES (
        @MathCourseId,
        'TOAN10A-HK1',
        N'Toán 10A - Học kỳ 1',
        @MathTeacherId,
        30,
        0,
        '2025-01-15',
        '2025-05-31',
        'MONDAY,WEDNESDAY,FRIDAY',
        '18:00-20:00',
        N'Phòng 101',
        'ACTIVE',
        GETDATE()
    );
    SET @Class1Id = SCOPE_IDENTITY();
END

-- Lớp 2: Vật lý 10B - Học kỳ 1
DECLARE @PhysicsSubjectId INT;
SELECT @PhysicsSubjectId = ID FROM SUBJECTS WHERE CODE = 'PHYSICS' OR NAME LIKE N'%Vật lý%';
IF @PhysicsSubjectId IS NULL
BEGIN
    INSERT INTO SUBJECTS (name, code, description, is_active, created_at)
    VALUES (N'Vật lý', 'PHYSICS', N'Môn Vật lý', 1, GETDATE());
    SET @PhysicsSubjectId = SCOPE_IDENTITY();
END

DECLARE @PhysicsCourseId INT;
SELECT @PhysicsCourseId = ID FROM COURSES WHERE CODE = 'PHYSICS-10B' OR NAME LIKE N'%Vật lý 10%';
IF @PhysicsCourseId IS NULL
BEGIN
    INSERT INTO COURSES (subject_id, code, name, description, duration_weeks, total_sessions, price, level, is_active, created_at)
    VALUES (
        @PhysicsSubjectId,
        'PHYSICS-10B',
        N'Vật lý 10B - Học kỳ 1',
        N'Khóa học Vật lý lớp 10 học kỳ 1',
        20,
        40,
        4000000.00,
        'INTERMEDIATE',
        1,
        GETDATE()
    );
    SET @PhysicsCourseId = SCOPE_IDENTITY();
END

DECLARE @PhysicsTeacherId INT;
SELECT TOP 1 @PhysicsTeacherId = t.ID FROM TEACHERS t
INNER JOIN USERS u ON t.USER_ID = u.ID
WHERE t.MAIN_SUBJECT_ID = @PhysicsSubjectId OR u.FULL_NAME LIKE N'%Phạm%';
IF @PhysicsTeacherId IS NULL
BEGIN
    DECLARE @TeacherRoleId2 INT = (SELECT ID FROM ROLES WHERE CODE = 'TEACHER');
    DECLARE @TeacherUserId2 INT;
    INSERT INTO USERS (email, password_hash, full_name, phone, role_id, status, created_at)
    VALUES ('teacher.physics@dmt.edu.vn', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYIxF6q5Owi', N'Cô Phạm Thị C', '0900000002', @TeacherRoleId2, 1, GETDATE());
    SET @TeacherUserId2 = SCOPE_IDENTITY();
    INSERT INTO TEACHERS (user_id, teacher_code, main_subject_id, years_experience, created_at)
    VALUES (@TeacherUserId2, 'DMT-GV-TEMP-002', @PhysicsSubjectId, 8, GETDATE());
    SET @PhysicsTeacherId = SCOPE_IDENTITY();
END

DECLARE @Class2Id INT;
SELECT @Class2Id = ID FROM CLASSES WHERE CODE = 'VATLY10B-HK1';
IF @Class2Id IS NULL
BEGIN
    INSERT INTO CLASSES (course_id, code, name, teacher_id, capacity, current_students, start_date, end_date, schedule_days, schedule_time, classroom, status, created_at)
    VALUES (
        @PhysicsCourseId,
        'VATLY10B-HK1',
        N'Vật lý 10B - Học kỳ 1',
        @PhysicsTeacherId,
        30,
        0,
        '2025-01-20',
        '2025-05-31',
        'TUESDAY,THURSDAY',
        '18:00-20:00',
        N'Phòng 102',
        'ACTIVE',
        GETDATE()
    );
    SET @Class2Id = SCOPE_IDENTITY();
END

-- Lấy Student IDs
DECLARE @Student1Id INT = (SELECT ID FROM STUDENTS WHERE student_code = 'HS2025001');
DECLARE @Student2Id INT = (SELECT ID FROM STUDENTS WHERE student_code = 'HS2025002');
DECLARE @Student3Id INT = (SELECT ID FROM STUDENTS WHERE student_code = 'HS2025003');
DECLARE @Student4Id INT = (SELECT ID FROM STUDENTS WHERE student_code = 'HS2025004');
DECLARE @Student5Id INT = (SELECT ID FROM STUDENTS WHERE student_code = 'HS2025005');
DECLARE @Student6Id INT = (SELECT ID FROM STUDENTS WHERE student_code = 'HS2025006');

-- Enrollment 1: Nguyễn Văn A - Toán 10A
IF @Student1Id IS NOT NULL AND @Class1Id IS NOT NULL
BEGIN
    IF NOT EXISTS (SELECT 1 FROM ENROLLMENTS WHERE student_id = @Student1Id AND class_id = @Class1Id)
    BEGIN
        INSERT INTO ENROLLMENTS (class_id, student_id, enrollment_date, status, payment_status, total_fee, paid_amount, discount_percent, created_at)
        VALUES (
            @Class1Id,
            @Student1Id,
            '2025-01-10',
            'ACTIVE',
            'PARTIAL',
            5000000.00,
            2500000.00,
            0,
            '2025-01-10 09:00:00'
        );
        PRINT 'Created enrollment: HS2025001 - Toán 10A';
    END
    ELSE
        PRINT 'Enrollment HS2025001 - Toán 10A already exists';
END

-- Enrollment 2: Trần Thị B - Vật lý 10B
IF @Student2Id IS NOT NULL AND @Class2Id IS NOT NULL
BEGIN
    IF NOT EXISTS (SELECT 1 FROM ENROLLMENTS WHERE student_id = @Student2Id AND class_id = @Class2Id)
    BEGIN
        INSERT INTO ENROLLMENTS (class_id, student_id, enrollment_date, status, payment_status, total_fee, paid_amount, discount_percent, created_at)
        VALUES (
            @Class2Id,
            @Student2Id,
            '2025-01-12',
            'ACTIVE',
            'PAID',
            4000000.00,
            4000000.00,
            10,
            '2025-01-12 10:30:00'
        );
        PRINT 'Created enrollment: HS2025002 - Vật lý 10B';
    END
    ELSE
        PRINT 'Enrollment HS2025002 - Vật lý 10B already exists';
END

-- Enrollment 3: Lê Văn C - Hóa học 11A (cần tạo lớp)
DECLARE @ChemistrySubjectId INT;
SELECT @ChemistrySubjectId = ID FROM SUBJECTS WHERE CODE = 'CHEMISTRY' OR NAME LIKE N'%Hóa%';
IF @ChemistrySubjectId IS NULL
BEGIN
    INSERT INTO SUBJECTS (name, code, description, is_active, created_at)
    VALUES (N'Hóa học', 'CHEMISTRY', N'Môn Hóa học', 1, GETDATE());
    SET @ChemistrySubjectId = SCOPE_IDENTITY();
END

DECLARE @ChemistryCourseId INT;
SELECT @ChemistryCourseId = ID FROM COURSES WHERE CODE = 'CHEMISTRY-11A';
IF @ChemistryCourseId IS NULL
BEGIN
    INSERT INTO COURSES (subject_id, code, name, description, duration_weeks, total_sessions, price, level, is_active, created_at)
    VALUES (
        @ChemistrySubjectId,
        'CHEMISTRY-11A',
        N'Hóa học 11A - Học kỳ 1',
        N'Khóa học Hóa học lớp 11 học kỳ 1',
        20,
        40,
        3500000.00,
        'ADVANCED',
        1,
        GETDATE()
    );
    SET @ChemistryCourseId = SCOPE_IDENTITY();
END

DECLARE @ChemistryTeacherId INT;
SELECT TOP 1 @ChemistryTeacherId = t.ID FROM TEACHERS t
INNER JOIN USERS u ON t.USER_ID = u.ID
WHERE t.MAIN_SUBJECT_ID = @ChemistrySubjectId OR u.FULL_NAME LIKE N'%Trần%';
IF @ChemistryTeacherId IS NULL
BEGIN
    DECLARE @TeacherRoleId3 INT = (SELECT ID FROM ROLES WHERE CODE = 'TEACHER');
    DECLARE @TeacherUserId3 INT;
    INSERT INTO USERS (email, password_hash, full_name, phone, role_id, status, created_at)
    VALUES ('teacher.chemistry@dmt.edu.vn', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYIxF6q5Owi', N'Thầy Trần Văn D', '0900000003', @TeacherRoleId3, 1, GETDATE());
    SET @TeacherUserId3 = SCOPE_IDENTITY();
    INSERT INTO TEACHERS (user_id, teacher_code, main_subject_id, years_experience, created_at)
    VALUES (@TeacherUserId3, 'DMT-GV-TEMP-003', @ChemistrySubjectId, 12, GETDATE());
    SET @ChemistryTeacherId = SCOPE_IDENTITY();
END

DECLARE @Class3Id INT;
SELECT @Class3Id = ID FROM CLASSES WHERE CODE = 'HOAHOC11A-HK1';
IF @Class3Id IS NULL
BEGIN
    INSERT INTO CLASSES (course_id, code, name, teacher_id, capacity, current_students, start_date, end_date, schedule_days, schedule_time, classroom, status, created_at)
    VALUES (
        @ChemistryCourseId,
        'HOAHOC11A-HK1',
        N'Hóa học 11A - Học kỳ 1',
        @ChemistryTeacherId,
        30,
        0,
        '2025-02-01',
        '2025-06-15',
        'MONDAY,WEDNESDAY',
        '19:00-21:00',
        N'Phòng 103',
        'ACTIVE',
        GETDATE()
    );
    SET @Class3Id = SCOPE_IDENTITY();
END

IF @Student3Id IS NOT NULL AND @Class3Id IS NOT NULL
BEGIN
    IF NOT EXISTS (SELECT 1 FROM ENROLLMENTS WHERE student_id = @Student3Id AND class_id = @Class3Id)
    BEGIN
        INSERT INTO ENROLLMENTS (class_id, student_id, enrollment_date, status, payment_status, total_fee, paid_amount, discount_percent, created_at)
        VALUES (
            @Class3Id,
            @Student3Id,
            '2025-01-25',
            'PENDING',
            'PENDING',
            3500000.00,
            0,
            0,
            '2025-01-25 14:15:00'
        );
        PRINT 'Created enrollment: HS2025003 - Hóa học 11A';
    END
    ELSE
        PRINT 'Enrollment HS2025003 - Hóa học 11A already exists';
END

-- Enrollment 4: Phạm Thị D - IELTS Foundation (cần tạo lớp)
DECLARE @EnglishSubjectId INT;
SELECT @EnglishSubjectId = ID FROM SUBJECTS WHERE CODE = 'ENGLISH' OR NAME LIKE N'%Anh%';
IF @EnglishSubjectId IS NULL
BEGIN
    INSERT INTO SUBJECTS (name, code, description, is_active, created_at)
    VALUES (N'Tiếng Anh', 'ENGLISH', N'Môn Tiếng Anh', 1, GETDATE());
    SET @EnglishSubjectId = SCOPE_IDENTITY();
END

DECLARE @IELTSCourseId INT;
SELECT @IELTSCourseId = ID FROM COURSES WHERE CODE = 'IELTS-FOUND-2024' OR NAME LIKE N'%IELTS%';
IF @IELTSCourseId IS NULL
BEGIN
    INSERT INTO COURSES (subject_id, code, name, description, duration_weeks, total_sessions, price, level, is_active, created_at)
    VALUES (
        @EnglishSubjectId,
        'IELTS-FOUND-2024',
        N'IELTS Foundation',
        N'Khóa học IELTS Foundation',
        16,
        32,
        6000000.00,
        'BEGINNER',
        1,
        GETDATE()
    );
    SET @IELTSCourseId = SCOPE_IDENTITY();
END

DECLARE @IELTSTeacherId INT;
SELECT TOP 1 @IELTSTeacherId = t.ID FROM TEACHERS t
INNER JOIN USERS u ON t.USER_ID = u.ID
WHERE t.MAIN_SUBJECT_ID = @EnglishSubjectId;
IF @IELTSTeacherId IS NULL
BEGIN
    DECLARE @TeacherRoleId4 INT = (SELECT ID FROM ROLES WHERE CODE = 'TEACHER');
    DECLARE @TeacherUserId4 INT;
    INSERT INTO USERS (email, password_hash, full_name, phone, role_id, status, created_at)
    VALUES ('teacher.english@dmt.edu.vn', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYIxF6q5Owi', N'Ms. Sarah Johnson', '0900000004', @TeacherRoleId4, 1, GETDATE());
    SET @TeacherUserId4 = SCOPE_IDENTITY();
    INSERT INTO TEACHERS (user_id, teacher_code, main_subject_id, years_experience, created_at)
    VALUES (@TeacherUserId4, 'DMT-GV-TEMP-004', @EnglishSubjectId, 15, GETDATE());
    SET @IELTSTeacherId = SCOPE_IDENTITY();
END

DECLARE @Class4Id INT;
SELECT @Class4Id = ID FROM CLASSES WHERE CODE = 'IELTS-FOUND-2024';
IF @Class4Id IS NULL
BEGIN
    INSERT INTO CLASSES (course_id, code, name, teacher_id, capacity, current_students, start_date, end_date, schedule_days, schedule_time, classroom, status, created_at)
    VALUES (
        @IELTSCourseId,
        'IELTS-FOUND-2024',
        N'IELTS Foundation',
        @IELTSTeacherId,
        25,
        0,
        '2024-09-01',
        '2024-12-31',
        'TUESDAY,THURSDAY,SATURDAY',
        '18:00-20:00',
        N'Phòng 201',
        'COMPLETED',
        GETDATE()
    );
    SET @Class4Id = SCOPE_IDENTITY();
END

IF @Student4Id IS NOT NULL AND @Class4Id IS NOT NULL
BEGIN
    IF NOT EXISTS (SELECT 1 FROM ENROLLMENTS WHERE student_id = @Student4Id AND class_id = @Class4Id)
    BEGIN
        INSERT INTO ENROLLMENTS (class_id, student_id, enrollment_date, status, payment_status, total_fee, paid_amount, discount_percent, created_at)
        VALUES (
            @Class4Id,
            @Student4Id,
            '2024-08-20',
            'COMPLETED',
            'PAID',
            6000000.00,
            6000000.00,
            15,
            '2024-08-20 11:00:00'
        );
        PRINT 'Created enrollment: HS2025004 - IELTS Foundation';
    END
    ELSE
        PRINT 'Enrollment HS2025004 - IELTS Foundation already exists';
END

-- Enrollment 5: Hoàng Văn E - Sinh học 12A
DECLARE @BiologySubjectId INT;
SELECT @BiologySubjectId = ID FROM SUBJECTS WHERE CODE = 'BIOLOGY' OR NAME LIKE N'%Sinh%';
IF @BiologySubjectId IS NULL
BEGIN
    INSERT INTO SUBJECTS (name, code, description, is_active, created_at)
    VALUES (N'Sinh học', 'BIOLOGY', N'Môn Sinh học', 1, GETDATE());
    SET @BiologySubjectId = SCOPE_IDENTITY();
END

DECLARE @BiologyCourseId INT;
SELECT @BiologyCourseId = ID FROM COURSES WHERE CODE = 'BIOLOGY-12A';
IF @BiologyCourseId IS NULL
BEGIN
    INSERT INTO COURSES (subject_id, code, name, description, duration_weeks, total_sessions, price, level, is_active, created_at)
    VALUES (
        @BiologySubjectId,
        'BIOLOGY-12A',
        N'Sinh học 12A - Học kỳ 1',
        N'Khóa học Sinh học lớp 12 học kỳ 1',
        20,
        40,
        4500000.00,
        'ADVANCED',
        1,
        GETDATE()
    );
    SET @BiologyCourseId = SCOPE_IDENTITY();
END

DECLARE @BiologyTeacherId INT;
SELECT TOP 1 @BiologyTeacherId = t.ID FROM TEACHERS t
INNER JOIN USERS u ON t.USER_ID = u.ID
WHERE t.MAIN_SUBJECT_ID = @BiologySubjectId OR u.FULL_NAME LIKE N'%Lê%';
IF @BiologyTeacherId IS NULL
BEGIN
    DECLARE @TeacherRoleId5 INT = (SELECT ID FROM ROLES WHERE CODE = 'TEACHER');
    DECLARE @TeacherUserId5 INT;
    INSERT INTO USERS (email, password_hash, full_name, phone, role_id, status, created_at)
    VALUES ('teacher.biology@dmt.edu.vn', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYIxF6q5Owi', N'Cô Lê Thị E', '0900000005', @TeacherRoleId5, 1, GETDATE());
    SET @TeacherUserId5 = SCOPE_IDENTITY();
    INSERT INTO TEACHERS (user_id, teacher_code, main_subject_id, years_experience, created_at)
    VALUES (@TeacherUserId5, 'DMT-GV-TEMP-005', @BiologySubjectId, 9, GETDATE());
    SET @BiologyTeacherId = SCOPE_IDENTITY();
END

DECLARE @Class5Id INT;
SELECT @Class5Id = ID FROM CLASSES WHERE CODE = 'SINHHOC12A-HK1';
IF @Class5Id IS NULL
BEGIN
    INSERT INTO CLASSES (course_id, code, name, teacher_id, capacity, current_students, start_date, end_date, schedule_days, schedule_time, classroom, status, created_at)
    VALUES (
        @BiologyCourseId,
        'SINHHOC12A-HK1',
        N'Sinh học 12A - Học kỳ 1',
        @BiologyTeacherId,
        30,
        0,
        '2025-01-18',
        '2025-05-30',
        'WEDNESDAY,FRIDAY',
        '18:00-20:00',
        N'Phòng 104',
        'ACTIVE',
        GETDATE()
    );
    SET @Class5Id = SCOPE_IDENTITY();
END

IF @Student5Id IS NOT NULL AND @Class5Id IS NOT NULL
BEGIN
    IF NOT EXISTS (SELECT 1 FROM ENROLLMENTS WHERE student_id = @Student5Id AND class_id = @Class5Id)
    BEGIN
        INSERT INTO ENROLLMENTS (class_id, student_id, enrollment_date, status, payment_status, total_fee, paid_amount, discount_percent, created_at)
        VALUES (
            @Class5Id,
            @Student5Id,
            '2025-01-15',
            'ACTIVE',
            'PARTIAL',
            4500000.00,
            1500000.00,
            5,
            '2025-01-15 16:20:00'
        );
        PRINT 'Created enrollment: HS2025005 - Sinh học 12A';
    END
    ELSE
        PRINT 'Enrollment HS2025005 - Sinh học 12A already exists';
END

-- Enrollment 6: Vũ Thị F - Tiếng Anh 9A (CANCELLED)
DECLARE @English9CourseId INT;
SELECT @English9CourseId = ID FROM COURSES WHERE CODE = 'ENG9A-2025';
IF @English9CourseId IS NULL
BEGIN
    INSERT INTO COURSES (subject_id, code, name, description, duration_weeks, total_sessions, price, level, is_active, created_at)
    VALUES (
        @EnglishSubjectId,
        'ENG9A-2025',
        N'Tiếng Anh 9A',
        N'Khóa học Tiếng Anh lớp 9',
        20,
        40,
        3000000.00,
        'INTERMEDIATE',
        1,
        GETDATE()
    );
    SET @English9CourseId = SCOPE_IDENTITY();
END

DECLARE @English9TeacherId INT;
SELECT TOP 1 @English9TeacherId = t.ID FROM TEACHERS t
INNER JOIN USERS u ON t.USER_ID = u.ID
WHERE t.MAIN_SUBJECT_ID = @EnglishSubjectId;
IF @English9TeacherId IS NULL
BEGIN
    SET @English9TeacherId = @IELTSTeacherId; -- Dùng chung teacher
END

DECLARE @Class6Id INT;
SELECT @Class6Id = ID FROM CLASSES WHERE CODE = 'ENG9A-2025';
IF @Class6Id IS NULL
BEGIN
    INSERT INTO CLASSES (course_id, code, name, teacher_id, capacity, current_students, start_date, end_date, schedule_days, schedule_time, classroom, status, created_at)
    VALUES (
        @English9CourseId,
        'ENG9A-2025',
        N'Tiếng Anh 9A',
        @English9TeacherId,
        25,
        0,
        '2025-02-05',
        '2025-06-20',
        'MONDAY,WEDNESDAY',
        '17:00-19:00',
        N'Phòng 202',
        'CANCELLED',
        GETDATE()
    );
    SET @Class6Id = SCOPE_IDENTITY();
END

IF @Student6Id IS NOT NULL AND @Class6Id IS NOT NULL
BEGIN
    IF NOT EXISTS (SELECT 1 FROM ENROLLMENTS WHERE student_id = @Student6Id AND class_id = @Class6Id)
    BEGIN
        INSERT INTO ENROLLMENTS (class_id, student_id, enrollment_date, status, payment_status, total_fee, paid_amount, discount_percent, created_at)
        VALUES (
            @Class6Id,
            @Student6Id,
            '2025-01-28',
            'CANCELLED',
            'PENDING',
            3000000.00,
            0,
            0,
            '2025-01-28 13:45:00'
        );
        PRINT 'Created enrollment: HS2025006 - Tiếng Anh 9A (CANCELLED)';
    END
    ELSE
        PRINT 'Enrollment HS2025006 - Tiếng Anh 9A already exists';
END

PRINT '========================================';
PRINT 'Import Enrollments completed!';
PRINT '========================================';

