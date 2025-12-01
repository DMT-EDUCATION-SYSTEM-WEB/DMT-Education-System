-- =================================================================
-- IMPORT ASSIGNMENTS FROM MOCK DATA
-- =================================================================
-- Script này import dữ liệu bài tập từ mock data vào database
-- Cần chạy sau khi đã có: CLASSES, USERS (teachers)
-- =================================================================

USE DMT_EDUCATION_SYSTEM;
GO

-- Lấy các lớp học
DECLARE @Class1Id INT = (SELECT ID FROM CLASSES WHERE CODE = 'TOAN10A-HK1');
DECLARE @Class2Id INT = (SELECT ID FROM CLASSES WHERE CODE = 'VATLY10B-HK1');
DECLARE @Class3Id INT = (SELECT ID FROM CLASSES WHERE CODE = 'HOAHOC11A-HK1');

-- Lấy teacher IDs từ các lớp
DECLARE @Teacher1Id INT;
DECLARE @Teacher2Id INT;
DECLARE @Teacher3Id INT;

SELECT @Teacher1Id = teacher_id FROM CLASSES WHERE ID = @Class1Id;
SELECT @Teacher2Id = teacher_id FROM CLASSES WHERE ID = @Class2Id;
SELECT @Teacher3Id = teacher_id FROM CLASSES WHERE ID = @Class3Id;

-- Lấy user_id từ teachers
DECLARE @Teacher1UserId INT;
DECLARE @Teacher2UserId INT;
DECLARE @Teacher3UserId INT;

SELECT @Teacher1UserId = user_id FROM TEACHERS WHERE ID = @Teacher1Id;
SELECT @Teacher2UserId = user_id FROM TEACHERS WHERE ID = @Teacher2Id;
SELECT @Teacher3UserId = user_id FROM TEACHERS WHERE ID = @Teacher3Id;

-- Assignment 1: Phương trình bậc 2 (Toán 9 - nhưng dùng lớp Toán 10A)
IF @Class1Id IS NOT NULL AND @Teacher1UserId IS NOT NULL
BEGIN
    IF NOT EXISTS (SELECT 1 FROM ASSIGNMENTS WHERE title = N'Phương trình bậc 2' AND class_id = @Class1Id)
    BEGIN
        INSERT INTO ASSIGNMENTS (class_id, title, description, due_date, max_score, assignment_type, created_by, created_at)
        VALUES (
            @Class1Id,
            N'Phương trình bậc 2',
            N'Giải các dạng phương trình bậc 2 cơ bản và nâng cao',
            '2025-08-15',
            10.00,
            'HOMEWORK',
            @Teacher1UserId,
            '2025-08-05'
        );
        PRINT 'Created assignment: Phương trình bậc 2';
    END
    ELSE
        PRINT 'Assignment "Phương trình bậc 2" already exists';
END

-- Assignment 2: Kiểm tra định kỳ - Động học (Vật lý 9 - dùng lớp Vật lý 10B)
IF @Class2Id IS NOT NULL AND @Teacher2UserId IS NOT NULL
BEGIN
    IF NOT EXISTS (SELECT 1 FROM ASSIGNMENTS WHERE title = N'Kiểm tra định kỳ - Động học' AND class_id = @Class2Id)
    BEGIN
        INSERT INTO ASSIGNMENTS (class_id, title, description, due_date, max_score, assignment_type, created_by, created_at)
        VALUES (
            @Class2Id,
            N'Kiểm tra định kỳ - Động học',
            N'Kiểm tra 45 phút về chuyển động thẳng đều và biến đổi đều',
            '2025-08-12',
            10.00,
            'QUIZ',
            @Teacher2UserId,
            '2025-08-01'
        );
        PRINT 'Created assignment: Kiểm tra định kỳ - Động học';
    END
    ELSE
        PRINT 'Assignment "Kiểm tra định kỳ - Động học" already exists';
END

-- Assignment 3: Bài tập Axit - Bazơ (Hóa học 9 - dùng lớp Hóa học 11A)
IF @Class3Id IS NOT NULL AND @Teacher3UserId IS NOT NULL
BEGIN
    IF NOT EXISTS (SELECT 1 FROM ASSIGNMENTS WHERE title = N'Bài tập Axit - Bazơ' AND class_id = @Class3Id)
    BEGIN
        INSERT INTO ASSIGNMENTS (class_id, title, description, due_date, max_score, assignment_type, created_by, created_at)
        VALUES (
            @Class3Id,
            N'Bài tập Axit - Bazơ',
            N'Các phản ứng hóa học giữa axit và bazơ',
            '2025-08-20',
            10.00,
            'HOMEWORK',
            @Teacher3UserId,
            '2025-08-08'
        );
        PRINT 'Created assignment: Bài tập Axit - Bazơ';
    END
    ELSE
        PRINT 'Assignment "Bài tập Axit - Bazơ" already exists';
END

PRINT '========================================';
PRINT 'Import Assignments completed!';
PRINT '========================================';

