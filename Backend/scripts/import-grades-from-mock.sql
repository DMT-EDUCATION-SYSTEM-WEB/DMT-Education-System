-- =================================================================
-- IMPORT GRADES FROM MOCK DATA
-- =================================================================
-- Script này import dữ liệu điểm số từ mock data vào database
-- Nguồn: src/features/students/pages/Transcript.tsx
-- Cần chạy sau khi đã có: ENROLLMENTS, ASSIGNMENTS, USERS (teachers)
-- =================================================================

USE DMT_EDUCATION_SYSTEM;
GO

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

-- Lấy Assignment IDs
DECLARE @Assignment1Id INT = (
    SELECT TOP 1 ID FROM ASSIGNMENTS WHERE title = N'Phương trình bậc 2'
);
DECLARE @Assignment2Id INT = (
    SELECT TOP 1 ID FROM ASSIGNMENTS WHERE title = N'Kiểm tra định kỳ - Động học'
);
DECLARE @Assignment3Id INT = (
    SELECT TOP 1 ID FROM ASSIGNMENTS WHERE title = N'Bài tập Axit - Bazơ'
);

-- Lấy Teacher User IDs để làm graded_by
DECLARE @Teacher1UserId INT = (
    SELECT TOP 1 t.USER_ID FROM TEACHERS t
    INNER JOIN CLASSES c ON t.ID = c.TEACHER_ID
    WHERE c.CODE = 'TOAN10A-HK1'
);
DECLARE @Teacher2UserId INT = (
    SELECT TOP 1 t.USER_ID FROM TEACHERS t
    INNER JOIN CLASSES c ON t.ID = c.TEACHER_ID
    WHERE c.CODE = 'VATLY10B-HK1'
);
DECLARE @Teacher3UserId INT = (
    SELECT TOP 1 t.USER_ID FROM TEACHERS t
    INNER JOIN CLASSES c ON t.ID = c.TEACHER_ID
    WHERE c.CODE = 'HOAHOC11A-HK1'
);

-- Grade 1: Toán - Phương trình bậc 2 - 8.5/10
IF @Enrollment1Id IS NOT NULL AND @Teacher1UserId IS NOT NULL
BEGIN
    IF NOT EXISTS (SELECT 1 FROM GRADES WHERE enrollment_id = @Enrollment1Id AND grade_type = 'ASSIGNMENT' AND score = 8.5)
    BEGIN
        INSERT INTO GRADES (enrollment_id, grade_type, score, max_score, weight, notes, graded_by, graded_at, created_at)
        VALUES (
            @Enrollment1Id,
            'ASSIGNMENT',
            8.5,
            10.0,
            20.0, -- 20% trọng số
            N'Làm tốt, cần chú ý thêm về giải phương trình có nghiệm kép',
            @Teacher1UserId,
            '2025-11-15 10:00:00',
            '2025-11-15 10:00:00'
        );
        PRINT 'Created grade: HS2025001 - Toán - 8.5/10';
    END
END

-- Grade 2: Vật lý - Kiểm tra giữa kỳ - 9.0/10
IF @Enrollment2Id IS NOT NULL AND @Teacher2UserId IS NOT NULL
BEGIN
    IF NOT EXISTS (SELECT 1 FROM GRADES WHERE enrollment_id = @Enrollment2Id AND grade_type = 'MIDTERM' AND score = 9.0)
    BEGIN
        INSERT INTO GRADES (enrollment_id, grade_type, score, max_score, weight, notes, graded_by, graded_at, created_at)
        VALUES (
            @Enrollment2Id,
            'MIDTERM',
            9.0,
            10.0,
            30.0, -- 30% trọng số
            N'Rất tốt! Hiểu sâu về động học chất điểm',
            @Teacher2UserId,
            '2025-11-12 14:00:00',
            '2025-11-12 14:00:00'
        );
        PRINT 'Created grade: HS2025002 - Vật lý - 9.0/10';
    END
END

-- Grade 3: Hóa học - Bài tập Axit-Bazơ - 7.5/10
IF @Enrollment1Id IS NOT NULL AND @Teacher3UserId IS NOT NULL
BEGIN
    IF NOT EXISTS (SELECT 1 FROM GRADES WHERE enrollment_id = @Enrollment1Id AND grade_type = 'ASSIGNMENT' AND score = 7.5)
    BEGIN
        INSERT INTO GRADES (enrollment_id, grade_type, score, max_score, weight, notes, graded_by, graded_at, created_at)
        VALUES (
            @Enrollment1Id,
            'ASSIGNMENT',
            7.5,
            10.0,
            20.0,
            N'Cần ôn lại phần cân bằng phương trình hóa học',
            @Teacher3UserId,
            '2025-11-10 09:00:00',
            '2025-11-10 09:00:00'
        );
        PRINT 'Created grade: HS2025001 - Hóa học - 7.5/10';
    END
END

-- Grade 4: Toán - Kiểm tra 15 phút - 9.5/10
IF @Enrollment1Id IS NOT NULL AND @Teacher1UserId IS NOT NULL
BEGIN
    IF NOT EXISTS (SELECT 1 FROM GRADES WHERE enrollment_id = @Enrollment1Id AND grade_type = 'QUIZ' AND score = 9.5)
    BEGIN
        INSERT INTO GRADES (enrollment_id, grade_type, score, max_score, weight, notes, graded_by, graded_at, created_at)
        VALUES (
            @Enrollment1Id,
            'QUIZ',
            9.5,
            10.0,
            10.0,
            N'Xuất sắc! Nắm vững khái niệm hàm số bậc nhất',
            @Teacher1UserId,
            '2025-11-08 11:00:00',
            '2025-11-08 11:00:00'
        );
        PRINT 'Created grade: HS2025001 - Toán Quiz - 9.5/10';
    END
END

-- Grade 5: Vật lý - Bài tập Động lực học - 8.0/10
IF @Enrollment2Id IS NOT NULL AND @Teacher2UserId IS NOT NULL
BEGIN
    IF NOT EXISTS (SELECT 1 FROM GRADES WHERE enrollment_id = @Enrollment2Id AND grade_type = 'ASSIGNMENT' AND score = 8.0)
    BEGIN
        INSERT INTO GRADES (enrollment_id, grade_type, score, max_score, weight, notes, graded_by, graded_at, created_at)
        VALUES (
            @Enrollment2Id,
            'ASSIGNMENT',
            8.0,
            10.0,
            20.0,
            N'Tốt, cần luyện thêm bài tập về lực ma sát',
            @Teacher2UserId,
            '2025-11-05 15:00:00',
            '2025-11-05 15:00:00'
        );
        PRINT 'Created grade: HS2025002 - Vật lý - 8.0/10';
    END
END

-- Grade 6: Hóa học - Thí nghiệm - 6.5/10
IF @Enrollment1Id IS NOT NULL AND @Teacher3UserId IS NOT NULL
BEGIN
    IF NOT EXISTS (SELECT 1 FROM GRADES WHERE enrollment_id = @Enrollment1Id AND grade_type = 'QUIZ' AND score = 6.5)
    BEGIN
        INSERT INTO GRADES (enrollment_id, grade_type, score, max_score, weight, notes, graded_by, graded_at, created_at)
        VALUES (
            @Enrollment1Id,
            'QUIZ',
            6.5,
            10.0,
            10.0,
            N'Cần cẩn thận hơn trong thao tác thí nghiệm',
            @Teacher3UserId,
            '2025-11-03 10:00:00',
            '2025-11-03 10:00:00'
        );
        PRINT 'Created grade: HS2025001 - Hóa học Quiz - 6.5/10';
    END
END

PRINT '========================================';
PRINT 'Import Grades completed!';
PRINT '========================================';

