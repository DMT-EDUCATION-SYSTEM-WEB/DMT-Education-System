-- =================================================================
-- IMPORT VIDEOS FROM MOCK DATA
-- =================================================================
-- Script này import dữ liệu video bài giảng từ mock data vào database
-- Nguồn: src/features/students/pages/Videos.tsx
-- Cần chạy sau khi đã có: CLASSES, USERS (teachers), và bảng VIDEOS
-- =================================================================

USE DMT_EDUCATION_SYSTEM;
GO

-- Kiểm tra bảng VIDEOS có tồn tại không
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'VIDEOS')
BEGIN
    PRINT 'ERROR: Table VIDEOS does not exist. Please run create-missing-tables.sql first.';
    RETURN;
END

-- Lấy Class IDs
DECLARE @Class1Id INT = (SELECT ID FROM CLASSES WHERE CODE = 'TOAN10A-HK1');
DECLARE @Class2Id INT = (SELECT ID FROM CLASSES WHERE CODE = 'VATLY10B-HK1');
DECLARE @Class3Id INT = (SELECT ID FROM CLASSES WHERE CODE = 'HOAHOC11A-HK1');

-- Lấy Teacher User IDs để làm uploaded_by
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

-- Video 1: Toán 9 - Phương trình bậc 2
IF @Class1Id IS NOT NULL AND @Teacher1UserId IS NOT NULL
BEGIN
    IF NOT EXISTS (SELECT 1 FROM VIDEOS WHERE title = N'Toán 9 - Phương trình bậc 2')
    BEGIN
        INSERT INTO VIDEOS (class_id, title, description, video_url, thumbnail_url, duration_seconds, category, uploaded_by, is_public, view_count, created_at)
        VALUES (
            @Class1Id,
            N'Toán 9 - Phương trình bậc 2',
            N'Học cách giải phương trình bậc 2 với các ví dụ cụ thể',
            '/videos/math-quadratic-equation.mp4',
            '/thumbnails/math-quadratic-equation.jpg',
            2730, -- 45:30 = 2730 seconds
            N'Toán học',
            @Teacher1UserId,
            1,
            150,
            '2025-11-15'
        );
        PRINT 'Created video: Toán 9 - Phương trình bậc 2';
    END
END

-- Video 2: Lý 9 - Động học chất điểm
IF @Class2Id IS NOT NULL AND @Teacher2UserId IS NOT NULL
BEGIN
    IF NOT EXISTS (SELECT 1 FROM VIDEOS WHERE title = N'Lý 9 - Động học chất điểm')
    BEGIN
        INSERT INTO VIDEOS (class_id, title, description, video_url, thumbnail_url, duration_seconds, category, uploaded_by, is_public, view_count, created_at)
        VALUES (
            @Class2Id,
            N'Lý 9 - Động học chất điểm',
            N'Tìm hiểu về chuyển động thẳng đều và biến đổi đều',
            '/videos/physics-kinematics.mp4',
            '/thumbnails/physics-kinematics.jpg',
            2295, -- 38:15 = 2295 seconds
            N'Vật lý',
            @Teacher2UserId,
            1,
            200,
            '2025-11-12'
        );
        PRINT 'Created video: Lý 9 - Động học chất điểm';
    END
END

-- Video 3: Hóa 9 - Axit và bazơ
IF @Class3Id IS NOT NULL AND @Teacher3UserId IS NOT NULL
BEGIN
    IF NOT EXISTS (SELECT 1 FROM VIDEOS WHERE title = N'Hóa 9 - Axit và bazơ')
    BEGIN
        INSERT INTO VIDEOS (class_id, title, description, video_url, thumbnail_url, duration_seconds, category, uploaded_by, is_public, view_count, created_at)
        VALUES (
            @Class3Id,
            N'Hóa 9 - Axit và bazơ',
            N'Khái niệm và tính chất của axit, bazơ trong hóa học',
            '/videos/chemistry-acid-base.mp4',
            '/thumbnails/chemistry-acid-base.jpg',
            2540, -- 42:20 = 2540 seconds
            N'Hóa học',
            @Teacher3UserId,
            1,
            80,
            '2025-11-10'
        );
        PRINT 'Created video: Hóa 9 - Axit và bazơ';
    END
END

-- Video 4: Toán 9 - Hàm số bậc nhất
IF @Class1Id IS NOT NULL AND @Teacher1UserId IS NOT NULL
BEGIN
    IF NOT EXISTS (SELECT 1 FROM VIDEOS WHERE title = N'Toán 9 - Hàm số bậc nhất')
    BEGIN
        INSERT INTO VIDEOS (class_id, title, description, video_url, thumbnail_url, duration_seconds, category, uploaded_by, is_public, view_count, created_at)
        VALUES (
            @Class1Id,
            N'Toán 9 - Hàm số bậc nhất',
            N'Đồ thị và tính chất của hàm số bậc nhất',
            '/videos/math-linear-function.mp4',
            '/thumbnails/math-linear-function.jpg',
            3165, -- 52:45 = 3165 seconds
            N'Toán học',
            @Teacher1UserId,
            1,
            120,
            '2025-11-08'
        );
        PRINT 'Created video: Toán 9 - Hàm số bậc nhất';
    END
END

-- Video 5: Lý 9 - Định luật Ôm
IF @Class2Id IS NOT NULL AND @Teacher2UserId IS NOT NULL
BEGIN
    IF NOT EXISTS (SELECT 1 FROM VIDEOS WHERE title = N'Lý 9 - Định luật Ôm')
    BEGIN
        INSERT INTO VIDEOS (class_id, title, description, video_url, thumbnail_url, duration_seconds, category, uploaded_by, is_public, view_count, created_at)
        VALUES (
            @Class2Id,
            N'Lý 9 - Định luật Ôm',
            N'Định luật Ôm và ứng dụng trong mạch điện',
            '/videos/physics-ohm-law.mp4',
            '/thumbnails/physics-ohm-law.jpg',
            2120, -- 35:20 = 2120 seconds
            N'Vật lý',
            @Teacher2UserId,
            1,
            180,
            '2025-11-05'
        );
        PRINT 'Created video: Lý 9 - Định luật Ôm';
    END
END

-- Video 6: Hóa 9 - Muối và phản ứng trao đổi
IF @Class3Id IS NOT NULL AND @Teacher3UserId IS NOT NULL
BEGIN
    IF NOT EXISTS (SELECT 1 FROM VIDEOS WHERE title = N'Hóa 9 - Muối và phản ứng trao đổi')
    BEGIN
        INSERT INTO VIDEOS (class_id, title, description, video_url, thumbnail_url, duration_seconds, category, uploaded_by, is_public, view_count, created_at)
        VALUES (
            @Class3Id,
            N'Hóa 9 - Muối và phản ứng trao đổi',
            N'Tìm hiểu về muối và các phản ứng trao đổi ion',
            '/videos/chemistry-salt-exchange.mp4',
            '/thumbnails/chemistry-salt-exchange.jpg',
            2415, -- 40:15 = 2415 seconds
            N'Hóa học',
            @Teacher3UserId,
            1,
            90,
            '2025-11-03'
        );
        PRINT 'Created video: Hóa 9 - Muối và phản ứng trao đổi';
    END
END

PRINT '========================================';
PRINT 'Import Videos completed!';
PRINT '========================================';

