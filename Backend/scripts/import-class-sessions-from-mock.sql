-- =================================================================
-- IMPORT CLASS SESSIONS FROM MOCK DATA
-- =================================================================
-- Script này import dữ liệu buổi học (Class Sessions) từ mock data vào database
-- Nguồn: src/features/staff/pages/Schedule.tsx, src/features/teachers/pages/Calendar.tsx
-- Cần chạy sau khi đã có: CLASSES
-- =================================================================

USE DMT_EDUCATION_SYSTEM;
GO

-- Lấy các lớp học
DECLARE @Class1Id INT = (SELECT ID FROM CLASSES WHERE CODE = 'TOAN10A-HK1');
DECLARE @Class2Id INT = (SELECT ID FROM CLASSES WHERE CODE = 'VATLY10B-HK1');
DECLARE @Class3Id INT = (SELECT ID FROM CLASSES WHERE CODE = 'HOAHOC11A-HK1');
DECLARE @Class4Id INT = (SELECT ID FROM CLASSES WHERE CODE = 'IELTS-FOUND-2024');
DECLARE @Class5Id INT = (SELECT ID FROM CLASSES WHERE CODE = 'SINHHOC12A-HK1');

-- Class Session 1: Toán 10A - Session 1
IF @Class1Id IS NOT NULL
BEGIN
    IF NOT EXISTS (SELECT 1 FROM CLASS_SESSIONS WHERE class_id = @Class1Id AND session_number = 1)
    BEGIN
        INSERT INTO CLASS_SESSIONS (class_id, session_number, title, session_date, start_time, end_time, content, status, created_at)
        VALUES (
            @Class1Id,
            1,
            N'Buổi 1: Ôn tập kiến thức cơ bản',
            '2025-11-18',
            '18:00:00',
            '20:00:00',
            N'Ôn tập các kiến thức cơ bản về đại số và hình học',
            'SCHEDULED',
            GETDATE()
        );
        PRINT 'Created class session: Toán 10A - Session 1';
    END
END

-- Class Session 2: Toán 10A - Session 2
IF @Class1Id IS NOT NULL
BEGIN
    IF NOT EXISTS (SELECT 1 FROM CLASS_SESSIONS WHERE class_id = @Class1Id AND session_number = 2)
    BEGIN
        INSERT INTO CLASS_SESSIONS (class_id, session_number, title, session_date, start_time, end_time, content, status, created_at)
        VALUES (
            @Class1Id,
            2,
            N'Buổi 2: Phương trình bậc nhất',
            '2025-11-20',
            '18:00:00',
            '20:00:00',
            N'Học về phương trình bậc nhất một ẩn',
            'SCHEDULED',
            GETDATE()
        );
        PRINT 'Created class session: Toán 10A - Session 2';
    END
END

-- Class Session 3: Toán 10A - Session 3 (Completed)
IF @Class1Id IS NOT NULL
BEGIN
    IF NOT EXISTS (SELECT 1 FROM CLASS_SESSIONS WHERE class_id = @Class1Id AND session_number = 3)
    BEGIN
        INSERT INTO CLASS_SESSIONS (class_id, session_number, title, session_date, start_time, end_time, content, homework, status, created_at)
        VALUES (
            @Class1Id,
            3,
            N'Buổi 3: Phương trình bậc hai',
            '2025-11-16',
            '18:00:00',
            '20:00:00',
            N'Học về phương trình bậc hai và cách giải',
            N'Bài tập: Giải các phương trình bậc hai trong sách bài tập trang 45-50',
            'COMPLETED',
            GETDATE()
        );
        PRINT 'Created class session: Toán 10A - Session 3 (Completed)';
    END
END

-- Class Session 4: Vật lý 10B - Session 1
IF @Class2Id IS NOT NULL
BEGIN
    IF NOT EXISTS (SELECT 1 FROM CLASS_SESSIONS WHERE class_id = @Class2Id AND session_number = 1)
    BEGIN
        INSERT INTO CLASS_SESSIONS (class_id, session_number, title, session_date, start_time, end_time, content, status, created_at)
        VALUES (
            @Class2Id,
            1,
            N'Buổi 1: Chuyển động thẳng đều',
            '2025-11-19',
            '18:00:00',
            '20:00:00',
            N'Học về chuyển động thẳng đều và các công thức liên quan',
            'SCHEDULED',
            GETDATE()
        );
        PRINT 'Created class session: Vật lý 10B - Session 1';
    END
END

-- Class Session 5: Vật lý 10B - Session 2 (In Progress)
IF @Class2Id IS NOT NULL
BEGIN
    IF NOT EXISTS (SELECT 1 FROM CLASS_SESSIONS WHERE class_id = @Class2Id AND session_number = 2)
    BEGIN
        INSERT INTO CLASS_SESSIONS (class_id, session_number, title, session_date, start_time, end_time, content, status, created_at)
        VALUES (
            @Class2Id,
            2,
            N'Buổi 2: Chuyển động thẳng biến đổi đều',
            CAST(GETDATE() AS DATE),
            '18:00:00',
            '20:00:00',
            N'Học về chuyển động thẳng biến đổi đều',
            'SCHEDULED',
            GETDATE()
        );
        PRINT 'Created class session: Vật lý 10B - Session 2';
    END
END

-- Class Session 6: Hóa học 11A - Session 1
IF @Class3Id IS NOT NULL
BEGIN
    IF NOT EXISTS (SELECT 1 FROM CLASS_SESSIONS WHERE class_id = @Class3Id AND session_number = 1)
    BEGIN
        INSERT INTO CLASS_SESSIONS (class_id, session_number, title, session_date, start_time, end_time, content, status, created_at)
        VALUES (
            @Class3Id,
            1,
            N'Buổi 1: Axit và Bazơ',
            '2025-11-20',
            '19:00:00',
            '21:00:00',
            N'Học về tính chất của axit và bazơ',
            'SCHEDULED',
            GETDATE()
        );
        PRINT 'Created class session: Hóa học 11A - Session 1';
    END
END

-- Class Session 7: IELTS Foundation - Session 1
IF @Class4Id IS NOT NULL
BEGIN
    IF NOT EXISTS (SELECT 1 FROM CLASS_SESSIONS WHERE class_id = @Class4Id AND session_number = 1)
    BEGIN
        INSERT INTO CLASS_SESSIONS (class_id, session_number, title, session_date, start_time, end_time, content, status, created_at)
        VALUES (
            @Class4Id,
            1,
            N'Buổi 1: Introduction to IELTS',
            '2024-09-03',
            '18:00:00',
            '20:00:00',
            N'Giới thiệu về kỳ thi IELTS và cấu trúc bài thi',
            'COMPLETED',
            GETDATE()
        );
        PRINT 'Created class session: IELTS Foundation - Session 1';
    END
END

-- Class Session 8: Sinh học 12A - Session 1
IF @Class5Id IS NOT NULL
BEGIN
    IF NOT EXISTS (SELECT 1 FROM CLASS_SESSIONS WHERE class_id = @Class5Id AND session_number = 1)
    BEGIN
        INSERT INTO CLASS_SESSIONS (class_id, session_number, title, session_date, start_time, end_time, content, status, created_at)
        VALUES (
            @Class5Id,
            1,
            N'Buổi 1: Di truyền học cơ bản',
            '2025-11-19',
            '18:00:00',
            '20:00:00',
            N'Học về các khái niệm cơ bản trong di truyền học',
            'SCHEDULED',
            GETDATE()
        );
        PRINT 'Created class session: Sinh học 12A - Session 1';
    END
END

PRINT '========================================';
PRINT 'Import Class Sessions completed!';
PRINT '========================================';

