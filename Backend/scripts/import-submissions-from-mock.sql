-- =================================================================
-- IMPORT SUBMISSIONS FROM MOCK DATA
-- =================================================================
-- Script này import dữ liệu bài nộp từ mock data vào database
-- Nguồn: src/features/teachers/pages/Grading.tsx
-- Cần chạy sau khi đã có: ASSIGNMENTS, STUDENTS, USERS (teachers)
-- =================================================================

USE DMT_EDUCATION_SYSTEM;
GO

-- Lấy Assignment IDs
DECLARE @Assignment1Id INT = (
    SELECT TOP 1 ID FROM ASSIGNMENTS WHERE title = N'Phương trình bậc 2'
);
DECLARE @Assignment2Id INT = (
    SELECT TOP 1 ID FROM ASSIGNMENTS WHERE title = N'Kiểm tra định kỳ - Động học'
);

-- Lấy Student IDs
DECLARE @Student1Id INT = (SELECT ID FROM STUDENTS WHERE student_code = 'HS2025001');
DECLARE @Student2Id INT = (SELECT ID FROM STUDENTS WHERE student_code = 'HS2025002');
DECLARE @Student3Id INT = (SELECT ID FROM STUDENTS WHERE student_code = 'HS2025003');
DECLARE @Student4Id INT = (SELECT ID FROM STUDENTS WHERE student_code = 'HS2025004');

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

-- Submission 1: Nguyễn Văn An - Phương trình bậc 2 (submitted)
IF @Assignment1Id IS NOT NULL AND @Student1Id IS NOT NULL
BEGIN
    IF NOT EXISTS (SELECT 1 FROM SUBMISSIONS WHERE assignment_id = @Assignment1Id AND student_id = @Student1Id)
    BEGIN
        INSERT INTO SUBMISSIONS (assignment_id, student_id, submission_date, content, attachment_url, status, created_at)
        VALUES (
            @Assignment1Id,
            @Student1Id,
            '2025-08-14 14:30:00',
            N'Em đã giải được 8/10 câu, câu 9 và 10 em chưa hiểu rõ cách làm.',
            '/submissions/baitap_toan.pdf',
            'SUBMITTED',
            '2025-08-14 14:30:00'
        );
        PRINT 'Created submission: HS2025001 - Phương trình bậc 2 (submitted)';
    END
END

-- Submission 2: Trần Thị Bình - Phương trình bậc 2 (graded - 8.5/10)
IF @Assignment1Id IS NOT NULL AND @Student2Id IS NOT NULL AND @Teacher1UserId IS NOT NULL
BEGIN
    IF NOT EXISTS (SELECT 1 FROM SUBMISSIONS WHERE assignment_id = @Assignment1Id AND student_id = @Student2Id)
    BEGIN
        INSERT INTO SUBMISSIONS (assignment_id, student_id, submission_date, content, attachment_url, score, feedback, graded_by, graded_at, status, created_at)
        VALUES (
            @Assignment1Id,
            @Student2Id,
            '2025-08-13 20:15:00',
            N'Em đã hoàn thành tất cả các câu hỏi theo yêu cầu.',
            '/submissions/math_homework.docx',
            8.5,
            N'Bài làm tốt! Cần chú ý thêm về cách trình bày lời giải câu 7.',
            @Teacher1UserId,
            '2025-08-14 09:00:00',
            'GRADED',
            '2025-08-13 20:15:00'
        );
        PRINT 'Created submission: HS2025002 - Phương trình bậc 2 (graded 8.5/10)';
    END
END

-- Submission 3: Lê Minh Cường - Kiểm tra Động học (graded - 9.0/10)
IF @Assignment2Id IS NOT NULL AND @Student3Id IS NOT NULL AND @Teacher2UserId IS NOT NULL
BEGIN
    IF NOT EXISTS (SELECT 1 FROM SUBMISSIONS WHERE assignment_id = @Assignment2Id AND student_id = @Student3Id)
    BEGIN
        INSERT INTO SUBMISSIONS (assignment_id, student_id, submission_date, content, attachment_url, score, feedback, graded_by, graded_at, status, created_at)
        VALUES (
            @Assignment2Id,
            @Student3Id,
            '2025-08-13 10:45:00',
            N'Bài kiểm tra về chuyển động thẳng đều và biến đổi đều.',
            '/submissions/physics_test.pdf',
            9.0,
            N'Xuất sắc! Hiểu rất rõ về các khái niệm động học.',
            @Teacher2UserId,
            '2025-08-13 16:30:00',
            'GRADED',
            '2025-08-13 10:45:00'
        );
        PRINT 'Created submission: HS2025003 - Kiểm tra Động học (graded 9.0/10)';
    END
END

-- Submission 4: Phạm Thu Dương - Phương trình bậc 2 (late)
IF @Assignment1Id IS NOT NULL AND @Student4Id IS NOT NULL
BEGIN
    IF NOT EXISTS (SELECT 1 FROM SUBMISSIONS WHERE assignment_id = @Assignment1Id AND student_id = @Student4Id)
    BEGIN
        INSERT INTO SUBMISSIONS (assignment_id, student_id, submission_date, content, attachment_url, status, created_at)
        VALUES (
            @Assignment1Id,
            @Student4Id,
            '2025-08-16 08:20:00',
            N'Em xin lỗi vì nộp muộn. Em bị ốm nên không kịp thời gian.',
            '/submissions/late_submission.pdf',
            'LATE',
            '2025-08-16 08:20:00'
        );
        PRINT 'Created submission: HS2025004 - Phương trình bậc 2 (late)';
    END
END

PRINT '========================================';
PRINT 'Import Submissions completed!';
PRINT '========================================';

