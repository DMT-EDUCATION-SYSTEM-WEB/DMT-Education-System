-- =================================================================
-- IMPORT MATERIALS FROM MOCK DATA
-- =================================================================
-- Script này import dữ liệu tài liệu học tập từ mock data vào database
-- Cần chạy sau khi đã có: CLASSES, USERS (teachers)
-- =================================================================

USE DMT_EDUCATION_SYSTEM;
GO

-- Lấy các lớp học
DECLARE @Class1Id INT = (SELECT ID FROM CLASSES WHERE CODE = 'TOAN10A-HK1');
DECLARE @Class2Id INT = (SELECT ID FROM CLASSES WHERE CODE = 'VATLY10B-HK1');
DECLARE @Class3Id INT = (SELECT ID FROM CLASSES WHERE CODE = 'HOAHOC11A-HK1');

-- Lấy teacher IDs từ các lớp để làm uploaded_by
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

-- Material 1: Bài tập Toán 9 - Chương 1
IF @Class1Id IS NOT NULL AND @Teacher1UserId IS NOT NULL
BEGIN
    IF NOT EXISTS (SELECT 1 FROM MATERIALS WHERE title = N'Bài tập Toán 9 - Chương 1' AND class_id = @Class1Id)
    BEGIN
        INSERT INTO MATERIALS (class_id, title, description, file_url, file_type, file_size, uploaded_by, is_public, created_at)
        VALUES (
            @Class1Id,
            N'Bài tập Toán 9 - Chương 1',
            N'Tập hợp các bài tập về phương trình và hệ phương trình',
            '/materials/math-chapter1.pdf',
            'pdf',
            2516582, -- 2.4 MB in bytes
            @Teacher1UserId,
            1, -- public
            '2025-11-05'
        );
        PRINT 'Created material: Bài tập Toán 9 - Chương 1';
    END
    ELSE
        PRINT 'Material "Bài tập Toán 9 - Chương 1" already exists';
END

-- Material 2: Lý thuyết Vật lý 9
IF @Class2Id IS NOT NULL AND @Teacher2UserId IS NOT NULL
BEGIN
    IF NOT EXISTS (SELECT 1 FROM MATERIALS WHERE title = N'Lý thuyết Vật lý 9' AND class_id = @Class2Id)
    BEGIN
        INSERT INTO MATERIALS (class_id, title, description, file_url, file_type, file_size, uploaded_by, is_public, created_at)
        VALUES (
            @Class2Id,
            N'Lý thuyết Vật lý 9',
            N'Tài liệu tổng hợp lý thuyết cơ bản về động học',
            '/materials/physics-theory.pdf',
            'pdf',
            1887436, -- 1.8 MB in bytes
            @Teacher2UserId,
            1, -- public
            '2025-11-03'
        );
        PRINT 'Created material: Lý thuyết Vật lý 9';
    END
    ELSE
        PRINT 'Material "Lý thuyết Vật lý 9" already exists';
END

-- Material 3: Slide bài giảng Hóa học
IF @Class3Id IS NOT NULL AND @Teacher3UserId IS NOT NULL
BEGIN
    IF NOT EXISTS (SELECT 1 FROM MATERIALS WHERE title = N'Slide bài giảng Hóa học' AND class_id = @Class3Id)
    BEGIN
        INSERT INTO MATERIALS (class_id, title, description, file_url, file_type, file_size, uploaded_by, is_public, created_at)
        VALUES (
            @Class3Id,
            N'Slide bài giảng Hóa học',
            N'Các khái niệm cơ bản về axit, bazơ và muối',
            '/materials/chemistry-slides.ppt',
            'ppt',
            5452595, -- 5.2 MB in bytes
            @Teacher3UserId,
            1, -- public
            '2025-11-01'
        );
        PRINT 'Created material: Slide bài giảng Hóa học';
    END
    ELSE
        PRINT 'Material "Slide bài giảng Hóa học" already exists';
END

-- Material 4: Đề cương ôn tập Toán 9
IF @Class1Id IS NOT NULL AND @Teacher1UserId IS NOT NULL
BEGIN
    IF NOT EXISTS (SELECT 1 FROM MATERIALS WHERE title = N'Đề cương ôn tập Toán 9' AND class_id = @Class1Id)
    BEGIN
        INSERT INTO MATERIALS (class_id, title, description, file_url, file_type, file_size, uploaded_by, is_public, created_at)
        VALUES (
            @Class1Id,
            N'Đề cương ôn tập Toán 9',
            N'Tổng hợp kiến thức và bài tập ôn tập học kỳ 1',
            '/materials/math-review.doc',
            'doc',
            1258291, -- 1.2 MB in bytes
            @Teacher1UserId,
            1, -- public
            '2025-10-28'
        );
        PRINT 'Created material: Đề cương ôn tập Toán 9';
    END
    ELSE
        PRINT 'Material "Đề cương ôn tập Toán 9" already exists';
END

-- Material 5: Hình ảnh minh họa Vật lý
IF @Class2Id IS NOT NULL AND @Teacher2UserId IS NOT NULL
BEGIN
    IF NOT EXISTS (SELECT 1 FROM MATERIALS WHERE title = N'Hình ảnh minh họa Vật lý' AND class_id = @Class2Id)
    BEGIN
        INSERT INTO MATERIALS (class_id, title, description, file_url, file_type, file_size, uploaded_by, is_public, created_at)
        VALUES (
            @Class2Id,
            N'Hình ảnh minh họa Vật lý',
            N'Các hình ảnh minh họa thí nghiệm vật lý',
            '/materials/physics-images.zip',
            'image',
            8912896, -- 8.5 MB in bytes
            @Teacher2UserId,
            0, -- not public
            '2025-10-25'
        );
        PRINT 'Created material: Hình ảnh minh họa Vật lý';
    END
    ELSE
        PRINT 'Material "Hình ảnh minh họa Vật lý" already exists';
END

PRINT '========================================';
PRINT 'Import Materials completed!';
PRINT '========================================';

