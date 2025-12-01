-- =================================================================
-- IMPORT SURVEYS FROM MOCK DATA
-- =================================================================
-- Script này import dữ liệu khảo sát từ mock data vào database
-- Nguồn: src/features/students/pages/Surveys.tsx
-- Cần chạy sau khi đã có: COURSES, CLASSES, USERS (admin/teachers)
-- =================================================================

USE DMT_EDUCATION_SYSTEM;
GO

-- Lấy Admin/Teacher User ID để làm created_by
DECLARE @AdminUserId INT = (
    SELECT TOP 1 u.ID FROM USERS u
    INNER JOIN ROLES r ON u.ROLE_ID = r.ID
    WHERE r.CODE = 'ADMIN'
);
IF @AdminUserId IS NULL
BEGIN
    -- Tạo admin user nếu chưa có
    DECLARE @AdminRoleId INT = (SELECT ID FROM ROLES WHERE CODE = 'ADMIN');
    INSERT INTO USERS (email, password_hash, full_name, phone, role_id, status, created_at)
    VALUES ('admin@dmt.edu.vn', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYIxF6q5Owi', N'Admin DMT', '0900000000', @AdminRoleId, 1, GETDATE());
    SET @AdminUserId = SCOPE_IDENTITY();
END

-- Lấy Course IDs
DECLARE @MathCourseId INT = (SELECT TOP 1 ID FROM COURSES WHERE CODE LIKE 'MATH%' OR NAME LIKE N'%Toán%');
DECLARE @PhysicsCourseId INT = (SELECT TOP 1 ID FROM COURSES WHERE CODE LIKE 'PHYSICS%' OR NAME LIKE N'%Vật lý%');
DECLARE @ChemistryCourseId INT = (SELECT TOP 1 ID FROM COURSES WHERE CODE LIKE 'CHEMISTRY%' OR NAME LIKE N'%Hóa%');

-- Survey 1: Khảo sát đánh giá khóa học Toán 10
IF @MathCourseId IS NOT NULL AND @AdminUserId IS NOT NULL
BEGIN
    IF NOT EXISTS (SELECT 1 FROM SURVEYS WHERE title = N'Khảo sát đánh giá khóa học Toán 10')
    BEGIN
        DECLARE @Survey1Id INT;
        INSERT INTO SURVEYS (title, description, target_type, course_id, start_date, end_date, is_active, created_by, created_at)
        VALUES (
            N'Khảo sát đánh giá khóa học Toán 10',
            N'Vui lòng đánh giá chất lượng giảng dạy và nội dung khóa học',
            'STUDENT',
            @MathCourseId,
            CAST(GETDATE() AS DATE),
            '2025-11-30',
            1,
            @AdminUserId,
            GETDATE()
        );
        SET @Survey1Id = SCOPE_IDENTITY();
        
        -- Thêm câu hỏi cho survey 1
        INSERT INTO SURVEY_QUESTIONS (survey_id, question_text, question_type, is_required, question_order, created_at)
        VALUES 
            (@Survey1Id, N'Bạn đánh giá như thế nào về chất lượng giảng dạy?', 'RATING', 1, 1, GETDATE()),
            (@Survey1Id, N'Nội dung khóa học có phù hợp với trình độ của bạn không?', 'RATING', 1, 2, GETDATE()),
            (@Survey1Id, N'Bạn có hài lòng với phương pháp giảng dạy không?', 'YES_NO', 1, 3, GETDATE()),
            (@Survey1Id, N'Ý kiến đóng góp của bạn:', 'TEXT', 0, 4, GETDATE());
        
        PRINT 'Created survey: Khảo sát đánh giá khóa học Toán 10';
    END
END

-- Survey 2: Khảo sát hài lòng về giáo viên
IF @PhysicsCourseId IS NOT NULL AND @AdminUserId IS NOT NULL
BEGIN
    IF NOT EXISTS (SELECT 1 FROM SURVEYS WHERE title = N'Khảo sát hài lòng về giáo viên')
    BEGIN
        DECLARE @Survey2Id INT;
        INSERT INTO SURVEYS (title, description, target_type, course_id, start_date, end_date, is_active, created_by, created_at)
        VALUES (
            N'Khảo sát hài lòng về giáo viên',
            N'Đánh giá về phương pháp giảng dạy của giáo viên',
            'STUDENT',
            @PhysicsCourseId,
            CAST(GETDATE() - 20 AS DATE),
            CAST(GETDATE() - 10 AS DATE),
            0, -- completed
            @AdminUserId,
            GETDATE() - 20
        );
        SET @Survey2Id = SCOPE_IDENTITY();
        
        -- Thêm câu hỏi cho survey 2
        INSERT INTO SURVEY_QUESTIONS (survey_id, question_text, question_type, is_required, question_order, created_at)
        VALUES 
            (@Survey2Id, N'Giáo viên có nhiệt tình trong giảng dạy không?', 'RATING', 1, 1, GETDATE()),
            (@Survey2Id, N'Giáo viên có giải đáp thắc mắc kịp thời không?', 'YES_NO', 1, 2, GETDATE()),
            (@Survey2Id, N'Bạn có muốn học tiếp với giáo viên này không?', 'YES_NO', 1, 3, GETDATE());
        
        PRINT 'Created survey: Khảo sát hài lòng về giáo viên';
    END
END

-- Survey 3: Khảo sát chất lượng dịch vụ
IF @AdminUserId IS NOT NULL
BEGIN
    IF NOT EXISTS (SELECT 1 FROM SURVEYS WHERE title = N'Khảo sát chất lượng dịch vụ')
    BEGIN
        DECLARE @Survey3Id INT;
        INSERT INTO SURVEYS (title, description, target_type, start_date, end_date, is_active, created_by, created_at)
        VALUES (
            N'Khảo sát chất lượng dịch vụ',
            N'Đánh giá về cơ sở vật chất và dịch vụ hỗ trợ',
            'ALL',
            CAST(GETDATE() AS DATE),
            '2025-12-05',
            1,
            @AdminUserId,
            GETDATE()
        );
        SET @Survey3Id = SCOPE_IDENTITY();
        
        -- Thêm câu hỏi cho survey 3
        INSERT INTO SURVEY_QUESTIONS (survey_id, question_text, question_type, is_required, question_order, created_at)
        VALUES 
            (@Survey3Id, N'Bạn đánh giá như thế nào về cơ sở vật chất?', 'RATING', 1, 1, GETDATE()),
            (@Survey3Id, N'Dịch vụ hỗ trợ có tốt không?', 'RATING', 1, 2, GETDATE()),
            (@Survey3Id, N'Bạn có đề xuất gì để cải thiện dịch vụ?', 'TEXT', 0, 3, GETDATE());
        
        PRINT 'Created survey: Khảo sát chất lượng dịch vụ';
    END
END

-- Survey 4: Đánh giá học kỳ 1
IF @AdminUserId IS NOT NULL
BEGIN
    IF NOT EXISTS (SELECT 1 FROM SURVEYS WHERE title = N'Đánh giá học kỳ 1')
    BEGIN
        DECLARE @Survey4Id INT;
        INSERT INTO SURVEYS (title, description, target_type, start_date, end_date, is_active, created_by, created_at)
        VALUES (
            N'Đánh giá học kỳ 1',
            N'Khảo sát tổng quan về học kỳ vừa qua',
            'ALL',
            CAST(GETDATE() - 30 AS DATE),
            CAST(GETDATE() - 15 AS DATE),
            0, -- completed
            @AdminUserId,
            GETDATE() - 30
        );
        SET @Survey4Id = SCOPE_IDENTITY();
        
        -- Thêm câu hỏi cho survey 4
        INSERT INTO SURVEY_QUESTIONS (survey_id, question_text, question_type, is_required, question_order, created_at)
        VALUES 
            (@Survey4Id, N'Bạn hài lòng với học kỳ 1 như thế nào?', 'RATING', 1, 1, GETDATE()),
            (@Survey4Id, N'Điểm mạnh của học kỳ này là gì?', 'TEXT', 0, 2, GETDATE()),
            (@Survey4Id, N'Điểm cần cải thiện?', 'TEXT', 0, 3, GETDATE());
        
        PRINT 'Created survey: Đánh giá học kỳ 1';
    END
END

-- Survey 5: Khảo sát chương trình học
IF @ChemistryCourseId IS NOT NULL AND @AdminUserId IS NOT NULL
BEGIN
    IF NOT EXISTS (SELECT 1 FROM SURVEYS WHERE title = N'Khảo sát chương trình học')
    BEGIN
        DECLARE @Survey5Id INT;
        INSERT INTO SURVEYS (title, description, target_type, course_id, start_date, end_date, is_active, created_by, created_at)
        VALUES (
            N'Khảo sát chương trình học',
            N'Ý kiến về nội dung và chương trình giảng dạy',
            'STUDENT',
            @ChemistryCourseId,
            CAST(GETDATE() AS DATE),
            '2025-11-25',
            1,
            @AdminUserId,
            GETDATE()
        );
        SET @Survey5Id = SCOPE_IDENTITY();
        
        -- Thêm câu hỏi cho survey 5
        INSERT INTO SURVEY_QUESTIONS (survey_id, question_text, question_type, is_required, question_order, created_at)
        VALUES 
            (@Survey5Id, N'Chương trình học có phù hợp không?', 'RATING', 1, 1, GETDATE()),
            (@Survey5Id, N'Nội dung có đầy đủ và dễ hiểu không?', 'YES_NO', 1, 2, GETDATE()),
            (@Survey5Id, N'Bạn muốn thêm nội dung gì?', 'TEXT', 0, 3, GETDATE());
        
        PRINT 'Created survey: Khảo sát chương trình học';
    END
END

PRINT '========================================';
PRINT 'Import Surveys completed!';
PRINT '========================================';

