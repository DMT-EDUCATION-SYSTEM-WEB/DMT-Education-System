-- =================================================================
-- IMPORT NOTIFICATIONS FROM MOCK DATA
-- =================================================================
-- Script này import dữ liệu thông báo từ mock data vào database
-- Nguồn: src/features/students/pages/Notifications.tsx
-- Cần chạy sau khi đã có: USERS (students)
-- =================================================================

USE DMT_EDUCATION_SYSTEM;
GO

-- Lấy Student User IDs
DECLARE @Student1UserId INT = (
    SELECT u.ID FROM USERS u
    INNER JOIN STUDENTS s ON u.ID = s.USER_ID
    WHERE s.STUDENT_CODE = 'HS2025001'
);
DECLARE @Student2UserId INT = (
    SELECT u.ID FROM USERS u
    INNER JOIN STUDENTS s ON u.ID = s.USER_ID
    WHERE s.STUDENT_CODE = 'HS2025002'
);

-- Notification 1: Bài tập mới đã được giao
IF @Student1UserId IS NOT NULL
BEGIN
    IF NOT EXISTS (SELECT 1 FROM NOTIFICATIONS WHERE user_id = @Student1UserId AND title = N'Bài tập mới đã được giao')
    BEGIN
        INSERT INTO NOTIFICATIONS (user_id, title, message, type, is_read, created_at)
        VALUES (
            @Student1UserId,
            N'Bài tập mới đã được giao',
            N'Giáo viên đã giao bài tập "Phương trình bậc 2" cho khóa Toán 10. Hạn nộp: 25/11/2025',
            'assignment',
            0,
            '2025-11-18 10:30:00'
        );
        PRINT 'Created notification 1 for HS2025001';
    END
END

-- Notification 2: Điểm kiểm tra đã được cập nhật
IF @Student1UserId IS NOT NULL
BEGIN
    IF NOT EXISTS (SELECT 1 FROM NOTIFICATIONS WHERE user_id = @Student1UserId AND title = N'Điểm kiểm tra đã được cập nhật')
    BEGIN
        INSERT INTO NOTIFICATIONS (user_id, title, message, type, is_read, created_at)
        VALUES (
            @Student1UserId,
            N'Điểm kiểm tra đã được cập nhật',
            N'Điểm kiểm tra môn Vật Lý đã được cập nhật. Xem chi tiết tại bảng điểm.',
            'grade',
            0,
            '2025-11-17 14:20:00'
        );
        PRINT 'Created notification 2 for HS2025001';
    END
END

-- Notification 3: Nhắc nhở thanh toán học phí
IF @Student1UserId IS NOT NULL
BEGIN
    IF NOT EXISTS (SELECT 1 FROM NOTIFICATIONS WHERE user_id = @Student1UserId AND title = N'Nhắc nhở thanh toán học phí')
    BEGIN
        INSERT INTO NOTIFICATIONS (user_id, title, message, type, is_read, created_at)
        VALUES (
            @Student1UserId,
            N'Nhắc nhở thanh toán học phí',
            N'Học phí tháng 12/2025 sắp đến hạn. Vui lòng thanh toán trước ngày 15/12/2025.',
            'payment',
            1,
            '2025-11-15 09:00:00'
        );
        PRINT 'Created notification 3 for HS2025001';
    END
END

-- Notification 4: Lịch học đã được cập nhật
IF @Student1UserId IS NOT NULL
BEGIN
    IF NOT EXISTS (SELECT 1 FROM NOTIFICATIONS WHERE user_id = @Student1UserId AND title = N'Lịch học đã được cập nhật')
    BEGIN
        INSERT INTO NOTIFICATIONS (user_id, title, message, type, is_read, created_at)
        VALUES (
            @Student1UserId,
            N'Lịch học đã được cập nhật',
            N'Lịch học môn Hóa học đã được thay đổi. Vui lòng kiểm tra lại thời khóa biểu.',
            'general',
            1,
            '2025-11-12 16:45:00'
        );
        PRINT 'Created notification 4 for HS2025001';
    END
END

-- Notification 5: Bảo trì hệ thống
IF @Student1UserId IS NOT NULL
BEGIN
    IF NOT EXISTS (SELECT 1 FROM NOTIFICATIONS WHERE user_id = @Student1UserId AND title = N'Bảo trì hệ thống')
    BEGIN
        INSERT INTO NOTIFICATIONS (user_id, title, message, type, is_read, created_at)
        VALUES (
            @Student1UserId,
            N'Bảo trì hệ thống',
            N'Hệ thống sẽ bảo trì từ 23:00 - 23:30 tối nay. Vui lòng không đăng nhập trong thời gian này.',
            'system',
            1,
            '2025-11-10 18:00:00'
        );
        PRINT 'Created notification 5 for HS2025001';
    END
END

-- Notification 6: Khảo sát mới
IF @Student1UserId IS NOT NULL
BEGIN
    IF NOT EXISTS (SELECT 1 FROM NOTIFICATIONS WHERE user_id = @Student1UserId AND title = N'Khảo sát mới')
    BEGIN
        INSERT INTO NOTIFICATIONS (user_id, title, message, type, is_read, created_at)
        VALUES (
            @Student1UserId,
            N'Khảo sát mới',
            N'Có khảo sát mới về chất lượng giảng dạy. Vui lòng hoàn thành trước ngày 20/11/2025.',
            'general',
            0,
            '2025-11-09 11:15:00'
        );
        PRINT 'Created notification 6 for HS2025001';
    END
END

-- Notification 7: Chúc mừng đạt điểm cao
IF @Student1UserId IS NOT NULL
BEGIN
    IF NOT EXISTS (SELECT 1 FROM NOTIFICATIONS WHERE user_id = @Student1UserId AND title = N'Chúc mừng đạt điểm cao')
    BEGIN
        INSERT INTO NOTIFICATIONS (user_id, title, message, type, is_read, created_at)
        VALUES (
            @Student1UserId,
            N'Chúc mừng đạt điểm cao',
            N'Chúc mừng bạn đã đạt 9.5 điểm kiểm tra Toán học! Tiếp tục phát huy nhé!',
            'grade',
            1,
            '2025-11-08 15:30:00'
        );
        PRINT 'Created notification 7 for HS2025001';
    END
END

-- Tạo thông báo cho student 2
IF @Student2UserId IS NOT NULL
BEGIN
    IF NOT EXISTS (SELECT 1 FROM NOTIFICATIONS WHERE user_id = @Student2UserId AND title = N'Bài tập mới đã được giao')
    BEGIN
        INSERT INTO NOTIFICATIONS (user_id, title, message, type, is_read, created_at)
        VALUES (
            @Student2UserId,
            N'Bài tập mới đã được giao',
            N'Giáo viên đã giao bài tập "Động học" cho khóa Vật lý 10. Hạn nộp: 20/11/2025',
            'assignment',
            0,
            '2025-11-17 10:30:00'
        );
        PRINT 'Created notification for HS2025002';
    END
END

PRINT '========================================';
PRINT 'Import Notifications completed!';
PRINT '========================================';

