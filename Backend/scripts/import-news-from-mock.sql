-- =================================================================
-- IMPORT NEWS/ANNOUNCEMENTS FROM MOCK DATA
-- =================================================================
-- Script này import dữ liệu tin tức/thông báo từ mock data vào database
-- Nguồn: src/pages/AnnouncementPage.tsx
-- Cần chạy sau khi đã có: USERS (admin/author)
-- =================================================================

USE DMT_EDUCATION_SYSTEM;
GO

-- Lấy Admin User ID để làm author_id
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

-- News 1: Thông báo khai giảng khóa học mới năm 2025
IF @AdminUserId IS NOT NULL
BEGIN
    IF NOT EXISTS (SELECT 1 FROM NEWS WHERE title = N'Thông báo khai giảng khóa học mới năm 2025')
    BEGIN
        INSERT INTO NEWS (title, excerpt, content, image_url, type, status, is_featured, author_id, published_at, created_at, updated_at)
        VALUES (
            N'Thông báo khai giảng khóa học mới năm 2025',
            N'DMT Education trân trọng thông báo lịch khai giảng các khóa học mới trong năm học 2024-2025. Đăng ký sớm để nhận ưu đãi đặc biệt.',
            N'DMT Education trân trọng thông báo lịch khai giảng các khóa học mới trong năm học 2024-2025. Các khóa học bao gồm: Toán, Lý, Hóa, Văn, Anh Văn, IELTS, TOEFL, VSAT.',
            '/images/all-image/event-1.jpg',
            'ANNOUNCEMENT',
            'PUBLISHED',
            1, -- featured
            @AdminUserId,
            '2024-11-20 10:00:00',
            '2024-11-20 10:00:00',
            '2024-11-20 10:00:00'
        );
        PRINT 'Created news: Thông báo khai giảng khóa học mới năm 2025';
    END
END

-- News 2: Chúc mừng học viên đạt IELTS 7.5+
IF @AdminUserId IS NOT NULL
BEGIN
    IF NOT EXISTS (SELECT 1 FROM NEWS WHERE title = N'Chúc mừng học viên đạt IELTS 7.5+')
    BEGIN
        INSERT INTO NEWS (title, excerpt, content, image_url, type, status, is_featured, author_id, published_at, created_at, updated_at)
        VALUES (
            N'Chúc mừng học viên đạt IELTS 7.5+',
            N'Xin chúc mừng các học viên DMT đạt điểm IELTS xuất sắc trong kỳ thi tháng 11/2024. Thành tích này là minh chứng cho sự nỗ lực của các em.',
            N'Chúc mừng các học viên đạt IELTS cao: Lê Thị Hải Yến (IELTS 7.5), cùng nhiều học viên khác đạt 6.5 - 7.0.',
            '/images/all-image/honor-7.5-ielts.jpg',
            'NEWS',
            'PUBLISHED',
            0,
            @AdminUserId,
            '2024-11-18 14:30:00',
            '2024-11-18 14:30:00',
            '2024-11-18 14:30:00'
        );
        PRINT 'Created news: Chúc mừng học viên đạt IELTS 7.5+';
    END
END

-- News 3: Vinh danh học sinh giữa kỳ 2
IF @AdminUserId IS NOT NULL
BEGIN
    IF NOT EXISTS (SELECT 1 FROM NEWS WHERE title = N'Vinh danh học sinh giữa kỳ 2 năm học 2024-2025')
    BEGIN
        INSERT INTO NEWS (title, excerpt, content, image_url, type, status, is_featured, author_id, published_at, created_at, updated_at)
        VALUES (
            N'Vinh danh học sinh giữa kỳ 2 năm học 2024-2025',
            N'Trung tâm DMT Education tổ chức lễ vinh danh học sinh có thành tích xuất sắc trong kỳ thi giữa kỳ 2. Chúc mừng các em!',
            N'Lễ vinh danh học sinh xuất sắc giữa kỳ 2 năm học 2024-2025. Có hơn 50 học sinh đạt danh hiệu học sinh giỏi và xuất sắc.',
            '/images/all-image/honor-mid-semester-2-2425-1.jpg',
            'EVENT',
            'PUBLISHED',
            0,
            @AdminUserId,
            '2024-11-15 09:00:00',
            '2024-11-15 09:00:00',
            '2024-11-15 09:00:00'
        );
        PRINT 'Created news: Vinh danh học sinh giữa kỳ 2';
    END
END

-- News 4: Thông báo lịch nghỉ Tết Nguyên Đán 2025
IF @AdminUserId IS NOT NULL
BEGIN
    IF NOT EXISTS (SELECT 1 FROM NEWS WHERE title = N'Thông báo lịch nghỉ Tết Nguyên Đán 2025')
    BEGIN
        INSERT INTO NEWS (title, excerpt, content, image_url, type, status, is_featured, author_id, published_at, created_at, updated_at)
        VALUES (
            N'Thông báo lịch nghỉ Tết Nguyên Đán 2025',
            N'Trung tâm DMT Education thông báo lịch nghỉ Tết Nguyên Đán Ất Tỵ 2025 và lịch học bù sau kỳ nghỉ.',
            N'Lịch nghỉ Tết Nguyên Đán 2025: Từ ngày 25/01 đến 05/02/2025. Lịch học bù sẽ được thông báo sau.',
            '/images/all-image/event-2.jpg',
            'ANNOUNCEMENT',
            'PUBLISHED',
            0,
            @AdminUserId,
            '2024-11-10 16:00:00',
            '2024-11-10 16:00:00',
            '2024-11-10 16:00:00'
        );
        PRINT 'Created news: Thông báo lịch nghỉ Tết Nguyên Đán 2025';
    END
END

-- News 5: Khai trương cơ sở mới tại Quận 3
IF @AdminUserId IS NOT NULL
BEGIN
    IF NOT EXISTS (SELECT 1 FROM NEWS WHERE title = N'Khai trương cơ sở mới tại Quận 3')
    BEGIN
        INSERT INTO NEWS (title, excerpt, content, image_url, type, status, is_featured, author_id, published_at, created_at, updated_at)
        VALUES (
            N'Khai trương cơ sở mới tại Quận 3',
            N'DMT Education hân hạnh thông báo khai trương cơ sở thứ 3 tại Quận 3, TP.HCM với cơ sở vật chất hiện đại.',
            N'Khai trương cơ sở mới tại 384/26 Nam Kỳ Khởi Nghĩa, phường 8, Quận 3 với đầy đủ tiện nghi học tập hiện đại.',
            '/images/all-image/event-3.jpg',
            'NEWS',
            'PUBLISHED',
            0,
            @AdminUserId,
            '2024-11-05 11:00:00',
            '2024-11-05 11:00:00',
            '2024-11-05 11:00:00'
        );
        PRINT 'Created news: Khai trương cơ sở mới tại Quận 3';
    END
END

-- News 6: Thành tích VSAT xuất sắc năm học 2024-2025
IF @AdminUserId IS NOT NULL
BEGIN
    IF NOT EXISTS (SELECT 1 FROM NEWS WHERE title = N'Thành tích VSAT xuất sắc năm học 2024-2025')
    BEGIN
        INSERT INTO NEWS (title, excerpt, content, image_url, type, status, is_featured, author_id, published_at, created_at, updated_at)
        VALUES (
            N'Thành tích VSAT xuất sắc năm học 2024-2025',
            N'Chúc mừng học sinh DMT đạt điểm VSAT cao trong kỳ thi năm học 2024-2025. Nhiều em đạt trên 300 điểm.',
            N'Thành tích VSAT năm học 2024-2025: Lê Thị Hải Yến 395đ, Lê Huỳnh Hoàng Hải 373đ, Nguyễn Huỳnh Bảo Trâm 373đ và nhiều học sinh khác.',
            '/images/all-image/honor-vsat.jpg',
            'NEWS',
            'PUBLISHED',
            0,
            @AdminUserId,
            '2024-11-01 13:30:00',
            '2024-11-01 13:30:00',
            '2024-11-01 13:30:00'
        );
        PRINT 'Created news: Thành tích VSAT xuất sắc năm học 2024-2025';
    END
END

PRINT '========================================';
PRINT 'Import News/Announcements completed!';
PRINT '========================================';

