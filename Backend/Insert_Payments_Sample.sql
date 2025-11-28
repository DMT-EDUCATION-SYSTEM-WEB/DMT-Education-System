-- ===================================================================
-- Insert Sample Payments from paymentData.ts
-- ===================================================================
-- Script này thêm một số giao dịch thanh toán mẫu từ paymentData.ts
-- Lưu ý: Cần có Students và Courses trong database trước
-- ===================================================================

USE DMT_EDUCATION_SYSTEM;
GO

PRINT '==============================================';
PRINT 'Bắt đầu thêm thanh toán mẫu từ paymentData.ts';
PRINT '==============================================';

-- Kiểm tra xem có students và courses không
IF NOT EXISTS (SELECT 1 FROM STUDENTS)
BEGIN
    PRINT 'CẢNH BÁO: Không có học viên trong hệ thống. Vui lòng thêm học viên trước.';
    RETURN;
END

IF NOT EXISTS (SELECT 1 FROM COURSES)
BEGIN
    PRINT 'CẢNH BÁO: Không có khóa học trong hệ thống. Vui lòng thêm khóa học trước.';
    RETURN;
END

-- Lấy sample student và course IDs
DECLARE @Student1Id INT = (SELECT TOP 1 ID FROM STUDENTS ORDER BY ID);
DECLARE @Student2Id INT = (SELECT TOP 1 ID FROM STUDENTS ORDER BY ID OFFSET 1 ROWS);
DECLARE @Student3Id INT = (SELECT TOP 1 ID FROM STUDENTS ORDER BY ID OFFSET 2 ROWS);

DECLARE @Course1Id INT = (SELECT TOP 1 ID FROM COURSES WHERE name LIKE N'%IELTS%');
DECLARE @Course2Id INT = (SELECT TOP 1 ID FROM COURSES WHERE name LIKE N'%Toán%');
DECLARE @Course3Id INT = (SELECT TOP 1 ID FROM COURSES WHERE name LIKE N'%Hóa%');

-- Nếu không tìm thấy courses cụ thể, dùng bất kỳ course nào
IF @Course1Id IS NULL SET @Course1Id = (SELECT TOP 1 ID FROM COURSES ORDER BY ID);
IF @Course2Id IS NULL SET @Course2Id = (SELECT TOP 1 ID FROM COURSES ORDER BY ID OFFSET 1 ROWS);
IF @Course3Id IS NULL SET @Course3Id = (SELECT TOP 1 ID FROM COURSES ORDER BY ID OFFSET 2 ROWS);

DECLARE @AdminId INT = (SELECT TOP 1 ID FROM USERS WHERE ROLE_ID = 1);
DECLARE @StaffId INT = (SELECT TOP 1 ID FROM USERS WHERE ROLE_ID = 2);

IF @AdminId IS NULL
BEGIN
    PRINT 'CẢNH BÁO: Không tìm thấy Admin user.';
    SET @AdminId = 1; -- fallback
END

-- Payment 1: Completed - Bank Transfer
IF NOT EXISTS (SELECT 1 FROM PAYMENTS WHERE transaction_id = 'PMT-23001')
BEGIN
    INSERT INTO PAYMENTS (
        transaction_id, student_id, course_id, amount, payment_method, 
        payment_status, description, receipt_number, payment_date, created_by, created_at
    )
    VALUES (
        'PMT-23001',
        @Student1Id,
        @Course1Id,
        4500000,
        'bank_transfer',
        'completed',
        N'Thanh toán học phí kỳ 1',
        'R-2308-001',
        '2023-08-15',
        @AdminId,
        '2023-08-15 09:30:00'
    );
    PRINT '✓ Đã thêm: PMT-23001 - Bank Transfer (Completed)';
END
ELSE
    PRINT '- Payment PMT-23001 đã tồn tại';

-- Payment 2: Completed - Cash
IF NOT EXISTS (SELECT 1 FROM PAYMENTS WHERE transaction_id = 'PMT-23002')
BEGIN
    INSERT INTO PAYMENTS (
        transaction_id, student_id, course_id, amount, payment_method,
        payment_status, description, receipt_number, payment_date, created_by, created_at
    )
    VALUES (
        'PMT-23002',
        @Student2Id,
        @Course1Id,
        7800000,
        'cash',
        'completed',
        N'Thanh toán học phí đầy đủ khóa IELTS',
        'R-2308-002',
        '2023-08-17',
        @AdminId,
        '2023-08-17 14:20:00'
    );
    PRINT '✓ Đã thêm: PMT-23002 - Cash (Completed)';
END
ELSE
    PRINT '- Payment PMT-23002 đã tồn tại';

-- Payment 3: Completed - E-Wallet
IF NOT EXISTS (SELECT 1 FROM PAYMENTS WHERE transaction_id = 'PMT-23003')
BEGIN
    INSERT INTO PAYMENTS (
        transaction_id, student_id, course_id, amount, payment_method,
        payment_status, description, receipt_number, payment_date, created_by, created_at
    )
    VALUES (
        'PMT-23003',
        @Student3Id,
        @Course2Id,
        3200000,
        'e_wallet',
        'completed',
        N'Thanh toán học phí qua MoMo',
        'R-2308-003',
        '2023-08-20',
        @StaffId,
        '2023-08-20 10:15:00'
    );
    PRINT '✓ Đã thêm: PMT-23003 - E-Wallet (Completed)';
END
ELSE
    PRINT '- Payment PMT-23003 đã tồn tại';

-- Payment 4: Pending - Bank Transfer
IF NOT EXISTS (SELECT 1 FROM PAYMENTS WHERE transaction_id = 'PMT-23004')
BEGIN
    INSERT INTO PAYMENTS (
        transaction_id, student_id, course_id, amount, payment_method,
        payment_status, description, payment_date, created_by, created_at
    )
    VALUES (
        'PMT-23004',
        @Student1Id,
        @Course3Id,
        2500000,
        'bank_transfer',
        'pending',
        N'Đặt cọc học phí',
        '2023-09-05',
        @StaffId,
        '2023-09-05 16:30:00'
    );
    PRINT '✓ Đã thêm: PMT-23004 - Bank Transfer (Pending)';
END
ELSE
    PRINT '- Payment PMT-23004 đã tồn tại';

-- Payment 5: Failed - Credit Card
IF NOT EXISTS (SELECT 1 FROM PAYMENTS WHERE transaction_id = 'PMT-23005')
BEGIN
    INSERT INTO PAYMENTS (
        transaction_id, student_id, course_id, amount, payment_method,
        payment_status, description, payment_date, created_by, created_at
    )
    VALUES (
        'PMT-23005',
        @Student2Id,
        @Course1Id,
        4500000,
        'credit_card',
        'failed',
        N'Thanh toán học phí qua thẻ - Giao dịch thất bại',
        '2023-09-10',
        @AdminId,
        '2023-09-10 11:20:00'
    );
    PRINT '✓ Đã thêm: PMT-23005 - Credit Card (Failed)';
END
ELSE
    PRINT '- Payment PMT-23005 đã tồn tại';

-- Payment 6: Completed - Cash
IF NOT EXISTS (SELECT 1 FROM PAYMENTS WHERE transaction_id = 'PMT-23006')
BEGIN
    INSERT INTO PAYMENTS (
        transaction_id, student_id, course_id, amount, payment_method,
        payment_status, description, receipt_number, payment_date, created_by, created_at
    )
    VALUES (
        'PMT-23006',
        @Student3Id,
        @Course2Id,
        5200000,
        'cash',
        'completed',
        N'Thanh toán học phí đầy đủ',
        'R-2309-006',
        '2023-09-15',
        @StaffId,
        '2023-09-15 09:00:00'
    );
    PRINT '✓ Đã thêm: PMT-23006 - Cash (Completed)';
END
ELSE
    PRINT '- Payment PMT-23006 đã tồn tại';

-- Payment 7: Refunded
IF NOT EXISTS (SELECT 1 FROM PAYMENTS WHERE transaction_id = 'PMT-23008')
BEGIN
    INSERT INTO PAYMENTS (
        transaction_id, student_id, course_id, amount, payment_method,
        payment_status, description, payment_details, receipt_number, payment_date, created_by, created_at, updated_at
    )
    VALUES (
        'PMT-23008',
        @Student1Id,
        @Course3Id,
        4800000,
        'credit_card',
        'refunded',
        N'Hoàn học phí do hủy đăng ký khóa học',
        N'Refund to card ending 4321',
        'R-2310-008',
        '2023-10-01',
        @AdminId,
        '2023-10-01 15:30:00',
        '2023-10-05 10:15:00'
    );
    PRINT '✓ Đã thêm: PMT-23008 - Refunded';
END
ELSE
    PRINT '- Payment PMT-23008 đã tồn tại';

-- Payment 8: Completed - E-Wallet (Recent)
IF NOT EXISTS (SELECT 1 FROM PAYMENTS WHERE transaction_id = 'PMT-23009')
BEGIN
    INSERT INTO PAYMENTS (
        transaction_id, student_id, course_id, amount, payment_method,
        payment_status, description, receipt_number, payment_date, created_by, created_at
    )
    VALUES (
        'PMT-23009',
        @Student2Id,
        @Course1Id,
        7800000,
        'e_wallet',
        'completed',
        N'Thanh toán học phí qua ZaloPay',
        'R-2310-009',
        '2023-10-12',
        @StaffId,
        '2023-10-12 10:30:00'
    );
    PRINT '✓ Đã thêm: PMT-23009 - E-Wallet (Completed)';
END
ELSE
    PRINT '- Payment PMT-23009 đã tồn tại';

GO

-- Kiểm tra kết quả
PRINT '';
PRINT '==============================================';
PRINT 'Danh sách thanh toán vừa thêm:';
PRINT '==============================================';

SELECT 
    p.ID,
    p.TRANSACTION_ID,
    CONCAT(u.FULL_NAME, ' (', s.STUDENT_CODE, ')') as STUDENT,
    c.NAME as COURSE,
    p.AMOUNT,
    p.PAYMENT_METHOD,
    p.PAYMENT_STATUS,
    p.PAYMENT_DATE,
    p.RECEIPT_NUMBER
FROM PAYMENTS p
INNER JOIN STUDENTS s ON p.STUDENT_ID = s.ID
INNER JOIN USERS u ON s.USER_ID = u.ID
INNER JOIN COURSES c ON p.COURSE_ID = c.ID
WHERE p.TRANSACTION_ID LIKE 'PMT-230%'
ORDER BY p.PAYMENT_DATE DESC;

PRINT '';
PRINT '==============================================';
PRINT 'Hoàn thành! Tổng số: 8 giao dịch thanh toán';
PRINT 'Bao gồm: Completed, Pending, Failed, Refunded';
PRINT '==============================================';
