-- =================================================================
-- TEST SCRIPTS CHO STORED PROCEDURES, FUNCTIONS & TRIGGERS
-- =================================================================
-- Mục đích: Kiểm tra toàn bộ stored procedures đã tạo
-- =================================================================

USE DMT_EDUCATION_SYSTEM;
GO

PRINT '================================================';
PRINT 'BẮT ĐẦU TEST STORED PROCEDURES';
PRINT '================================================';
PRINT '';

-- =================================================================
-- TEST 1: USER MANAGEMENT
-- =================================================================
PRINT '--- TEST 1: USER MANAGEMENT ---';
PRINT '';

-- Test 1.1: Tạo user thành công
DECLARE @user_id1 INT, @error1 NVARCHAR(500);
EXEC sp_CreateUser
    @role_id = 4,
    @email = 'testuser01@example.com',
    @password_hash = '$2b$10$abcdefghijklmnopqrstuvwxyz',
    @full_name = N'Nguyễn Test 01',
    @phone = '0912345678',
    @address = N'123 Test Street',
    @birth_date = '2005-01-15',
    @user_id = @user_id1 OUTPUT,
    @error_message = @error1 OUTPUT;

PRINT 'Test 1.1 - Create User:';
PRINT '  User ID: ' + CAST(@user_id1 AS VARCHAR);
PRINT '  Message: ' + @error1;
PRINT '';

-- Test 1.2: Email trùng (expect error)
DECLARE @user_id2 INT, @error2 NVARCHAR(500);
EXEC sp_CreateUser
    @role_id = 4,
    @email = 'testuser01@example.com', -- Same email
    @password_hash = '$2b$10$test',
    @full_name = N'Duplicate User',
    @user_id = @user_id2 OUTPUT,
    @error_message = @error2 OUTPUT;

PRINT 'Test 1.2 - Duplicate Email (Expected Error):';
PRINT '  Message: ' + @error2;
PRINT '';

-- Test 1.3: Đăng ký student
DECLARE @student_id1 INT, @student_code1 VARCHAR(50), @error3 NVARCHAR(500);
EXEC sp_RegisterStudent
    @email = 'student01@example.com',
    @password_hash = '$2b$10$studentpassword',
    @full_name = N'Trần Văn Student',
    @phone = '0987654321',
    @address = N'456 Student Road',
    @birth_date = '2006-05-20',
    @school_level = 'HIGH_SCHOOL',
    @parent_name = N'Trần Văn Parent',
    @parent_phone = '0909123456',
    @parent_email = 'parent01@example.com',
    @student_id = @student_id1 OUTPUT,
    @student_code = @student_code1 OUTPUT,
    @error_message = @error3 OUTPUT;

PRINT 'Test 1.3 - Register Student:';
PRINT '  Student ID: ' + CAST(@student_id1 AS VARCHAR);
PRINT '  Student Code: ' + @student_code1;
PRINT '  Message: ' + @error3;
PRINT '';

-- Test 1.4: Đăng ký teacher
DECLARE @teacher_id1 INT, @teacher_code1 VARCHAR(50), @error4 NVARCHAR(500);
EXEC sp_RegisterTeacher
    @email = 'teacher01@example.com',
    @password_hash = '$2b$10$teacherpassword',
    @full_name = N'Nguyễn Văn Teacher',
    @phone = '0901234567',
    @address = N'789 Teacher Avenue',
    @birth_date = '1985-08-10',
    @main_subject_id = 1,
    @years_experience = 10,
    @degree = N'Thạc sĩ Toán học',
    @specialization = N'Toán THPT',
    @teacher_id = @teacher_id1 OUTPUT,
    @teacher_code = @teacher_code1 OUTPUT,
    @error_message = @error4 OUTPUT;

PRINT 'Test 1.4 - Register Teacher:';
PRINT '  Teacher ID: ' + CAST(@teacher_id1 AS VARCHAR);
PRINT '  Teacher Code: ' + @teacher_code1;
PRINT '  Message: ' + @error4;
PRINT '';

-- =================================================================
-- TEST 2: ENROLLMENT MANAGEMENT
-- =================================================================
PRINT '--- TEST 2: ENROLLMENT MANAGEMENT ---';
PRINT '';

-- Setup: Tạo subject, course, class trước
INSERT INTO SUBJECTS (CODE, NAME, IS_ACTIVE) 
VALUES ('TEST_MATH', N'Test Math Subject', 1);

DECLARE @subject_id INT = SCOPE_IDENTITY();

INSERT INTO COURSES (SUBJECT_ID, CODE, NAME, PRICE, LEVEL, IS_ACTIVE)
VALUES (@subject_id, 'TEST_COURSE_01', N'Test Course Math', 3000000, 'BEGINNER', 1);

DECLARE @course_id INT = SCOPE_IDENTITY();

INSERT INTO CLASSES (COURSE_ID, CODE, NAME, TEACHER_ID, CAPACITY, START_DATE, END_DATE, STATUS)
VALUES (@course_id, 'TEST_CLASS_01', N'Test Class A1', @teacher_id1, 25, '2025-11-10', '2026-02-10', 'ACTIVE');

DECLARE @class_id1 INT = SCOPE_IDENTITY();

PRINT 'Setup: Created Subject=' + CAST(@subject_id AS VARCHAR) + 
      ', Course=' + CAST(@course_id AS VARCHAR) + 
      ', Class=' + CAST(@class_id1 AS VARCHAR);
PRINT '';

-- Test 2.1: Enroll student thành công
DECLARE @enrollment_id1 INT, @error5 NVARCHAR(500);
EXEC sp_EnrollStudent
    @class_id = @class_id1,
    @student_id = @student_id1,
    @total_fee = 3000000,
    @discount_percent = 10,
    @notes = N'Test enrollment với giảm giá 10%',
    @enrollment_id = @enrollment_id1 OUTPUT,
    @error_message = @error5 OUTPUT;

PRINT 'Test 2.1 - Enroll Student:';
PRINT '  Enrollment ID: ' + CAST(@enrollment_id1 AS VARCHAR);
PRINT '  Message: ' + @error5;
PRINT '';

-- Verify: Check CURRENT_STUDENTS đã tăng
SELECT @class_id1 AS class_id, CURRENT_STUDENTS 
FROM CLASSES WHERE ID = @class_id1;

-- Test 2.2: Enroll lại (expect error - duplicate)
DECLARE @enrollment_id2 INT, @error6 NVARCHAR(500);
EXEC sp_EnrollStudent
    @class_id = @class_id1,
    @student_id = @student_id1, -- Same student
    @total_fee = 3000000,
    @enrollment_id = @enrollment_id2 OUTPUT,
    @error_message = @error6 OUTPUT;

PRINT 'Test 2.2 - Duplicate Enrollment (Expected Error):';
PRINT '  Message: ' + @error6;
PRINT '';

-- =================================================================
-- TEST 3: PAYMENT PROCESSING
-- =================================================================
PRINT '--- TEST 3: PAYMENT PROCESSING ---';
PRINT '';

-- Test 3.1: Thanh toán đợt 1
DECLARE @payment_id1 INT, @error7 NVARCHAR(500);
EXEC sp_ProcessPayment
    @enrollment_id = @enrollment_id1,
    @amount = 1500000,
    @payment_method = 'BANK_TRANSFER',
    @transaction_id = 'TXN_TEST_001',
    @notes = N'Thanh toán đợt 1/2',
    @processed_by = 1,
    @payment_id = @payment_id1 OUTPUT,
    @error_message = @error7 OUTPUT;

PRINT 'Test 3.1 - Process Payment 1:';
PRINT '  Payment ID: ' + CAST(@payment_id1 AS VARCHAR);
PRINT '  Message: ' + @error7;

-- Check payment status
SELECT 
    ID,
    TOTAL_FEE,
    PAID_AMOUNT,
    PAYMENT_STATUS
FROM ENROLLMENTS 
WHERE ID = @enrollment_id1;
PRINT '';

-- Test 3.2: Thanh toán đợt 2 (hoàn tất)
DECLARE @payment_id2 INT, @error8 NVARCHAR(500);
EXEC sp_ProcessPayment
    @enrollment_id = @enrollment_id1,
    @amount = 1200000, -- Total: 1500000 + 1200000 = 2700000 = TOTAL_FEE
    @payment_method = 'CASH',
    @transaction_id = 'TXN_TEST_002',
    @notes = N'Thanh toán đợt 2/2 - Hoàn tất',
    @processed_by = 1,
    @payment_id = @payment_id2 OUTPUT,
    @error_message = @error8 OUTPUT;

PRINT 'Test 3.2 - Process Payment 2 (Complete):';
PRINT '  Payment ID: ' + CAST(@payment_id2 AS VARCHAR);
PRINT '  Message: ' + @error8;

-- Verify: Payment status should be PAID
SELECT 
    ID,
    TOTAL_FEE,
    PAID_AMOUNT,
    PAYMENT_STATUS
FROM ENROLLMENTS 
WHERE ID = @enrollment_id1;
PRINT '';

-- Test 3.3: Thanh toán vượt quá (expect error)
DECLARE @payment_id3 INT, @error9 NVARCHAR(500);
EXEC sp_ProcessPayment
    @enrollment_id = @enrollment_id1,
    @amount = 1000000, -- Already paid full
    @payment_method = 'CASH',
    @processed_by = 1,
    @payment_id = @payment_id3 OUTPUT,
    @error_message = @error9 OUTPUT;

PRINT 'Test 3.3 - Overpayment (Expected Error):';
PRINT '  Message: ' + @error9;
PRINT '';

-- =================================================================
-- TEST 4: ATTENDANCE SYSTEM
-- =================================================================
PRINT '--- TEST 4: ATTENDANCE SYSTEM ---';
PRINT '';

-- Setup: Tạo class session
INSERT INTO CLASS_SESSIONS (CLASS_ID, SESSION_NUMBER, TITLE, SESSION_DATE, START_TIME, END_TIME, STATUS)
VALUES (@class_id1, 1, N'Buổi 1: Giới thiệu', '2025-11-10', '18:00', '20:00', 'SCHEDULED');

DECLARE @session_id1 INT = SCOPE_IDENTITY();

PRINT 'Setup: Created Session ID=' + CAST(@session_id1 AS VARCHAR);
PRINT '';

-- Test 4.1: Bulk mark attendance
DECLARE @error10 NVARCHAR(500);
DECLARE @attendance_json NVARCHAR(MAX) = N'
[
  {"enrollment_id": ' + CAST(@enrollment_id1 AS VARCHAR) + ', "status": "PRESENT", "notes": "Đúng giờ"}
]';

EXEC sp_BulkMarkAttendance
    @session_id = @session_id1,
    @attendance_data = @attendance_json,
    @marked_by = @teacher_id1,
    @error_message = @error10 OUTPUT;

PRINT 'Test 4.1 - Bulk Mark Attendance:';
PRINT '  Message: ' + @error10;

-- Verify
SELECT * FROM ATTENDANCE WHERE SESSION_ID = @session_id1;
PRINT '';

-- =================================================================
-- TEST 5: FUNCTIONS
-- =================================================================
PRINT '--- TEST 5: FUNCTIONS ---';
PRINT '';

-- Test 5.1: Get attendance rate
DECLARE @attendance_rate DECIMAL(5,2);
SET @attendance_rate = dbo.fn_GetAttendanceRate(@student_id1, NULL);

PRINT 'Test 5.1 - Attendance Rate:';
PRINT '  Student ' + CAST(@student_id1 AS VARCHAR) + ' attendance rate: ' + CAST(@attendance_rate AS VARCHAR) + '%';
PRINT '';

-- Test 5.2: Get revenue
DECLARE @revenue DECIMAL(15,2);
SET @revenue = dbo.fn_GetRevenue(2025, 11);

PRINT 'Test 5.2 - Revenue:';
PRINT '  November 2025 revenue: ' + CAST(@revenue AS VARCHAR) + ' VND';
PRINT '';

-- Test 5.3: Can submit assignment
-- Setup assignment
INSERT INTO ASSIGNMENTS (CLASS_ID, TITLE, DUE_DATE, MAX_SCORE, ASSIGNMENT_TYPE, CREATED_BY)
VALUES (@class_id1, N'Test Assignment 1', '2025-12-01', 100, 'HOMEWORK', @teacher_id1);

DECLARE @assignment_id1 INT = SCOPE_IDENTITY();

DECLARE @can_submit BIT;
SET @can_submit = dbo.fn_CanSubmitAssignment(@assignment_id1, @student_id1);

PRINT 'Test 5.3 - Can Submit Assignment:';
PRINT '  Student ' + CAST(@student_id1 AS VARCHAR) + 
      ' can submit assignment ' + CAST(@assignment_id1 AS VARCHAR) + ': ' + 
      CASE WHEN @can_submit = 1 THEN 'YES' ELSE 'NO' END;
PRINT '';

-- =================================================================
-- TEST 6: TRIGGERS
-- =================================================================
PRINT '--- TEST 6: TRIGGERS ---';
PRINT '';

-- Test 6.1: Auto notification khi tạo assignment
PRINT 'Test 6.1 - Auto Notification (Assignment Created):';
PRINT '  Trigger should have created notification for student ' + CAST(@student_id1 AS VARCHAR);

-- Verify notification
SELECT TOP 1
    N.ID,
    N.TITLE,
    N.MESSAGE,
    N.TYPE,
    N.IS_READ
FROM NOTIFICATIONS N
JOIN STUDENTS S ON S.USER_ID = N.USER_ID
WHERE S.ID = @student_id1
ORDER BY N.CREATED_AT DESC;
PRINT '';

-- Test 6.2: Auto calculate overall grade
PRINT 'Test 6.2 - Auto Calculate Overall Grade:';

-- Insert grades
INSERT INTO GRADES (ENROLLMENT_ID, GRADE_TYPE, SCORE, MAX_SCORE, WEIGHT, GRADED_BY)
VALUES (@enrollment_id1, 'MIDTERM', 80, 100, 30, @teacher_id1);

INSERT INTO GRADES (ENROLLMENT_ID, GRADE_TYPE, SCORE, MAX_SCORE, WEIGHT, GRADED_BY)
VALUES (@enrollment_id1, 'FINAL', 90, 100, 50, @teacher_id1);

INSERT INTO GRADES (ENROLLMENT_ID, GRADE_TYPE, SCORE, MAX_SCORE, WEIGHT, GRADED_BY)
VALUES (@enrollment_id1, 'ASSIGNMENT', 85, 100, 20, @teacher_id1);

-- Trigger should auto calculate OVERALL
PRINT '  Inserted: MIDTERM(80,30%), FINAL(90,50%), ASSIGNMENT(85,20%)';
PRINT '  Expected Overall: 80*0.3 + 90*0.5 + 85*0.2 = 86';

SELECT 
    GRADE_TYPE,
    SCORE,
    WEIGHT
FROM GRADES
WHERE ENROLLMENT_ID = @enrollment_id1
ORDER BY 
    CASE GRADE_TYPE
        WHEN 'MIDTERM' THEN 1
        WHEN 'FINAL' THEN 2
        WHEN 'ASSIGNMENT' THEN 3
        WHEN 'OVERALL' THEN 4
    END;
PRINT '';

-- Test 6.3: Soft delete user
PRINT 'Test 6.3 - Soft Delete User:';
PRINT '  Deleting user ID=' + CAST(@user_id1 AS VARCHAR);

-- Before delete
SELECT ID, EMAIL, STATUS FROM USERS WHERE ID = @user_id1;

-- Delete (trigger converts to UPDATE STATUS=0)
DELETE FROM USERS WHERE ID = @user_id1;

-- After delete
SELECT ID, EMAIL, STATUS FROM USERS WHERE ID = @user_id1;
PRINT '  User should have STATUS=0 (soft deleted)';
PRINT '';

-- =================================================================
-- TEST 7: REPORTS
-- =================================================================
PRINT '--- TEST 7: REPORTS ---';
PRINT '';

-- Test 7.1: System overview
PRINT 'Test 7.1 - System Overview:';
EXEC sp_GetSystemOverview;
PRINT '';

-- Test 7.2: Student report
PRINT 'Test 7.2 - Student Report:';
EXEC sp_GetStudentReport @student_id = @student_id1;
PRINT '';

-- Test 7.3: Class report
PRINT 'Test 7.3 - Class Report:';
EXEC sp_GetClassReport @class_id = @class_id1;
PRINT '';

-- =================================================================
-- TEST 8: DROP ENROLLMENT
-- =================================================================
PRINT '--- TEST 8: DROP ENROLLMENT ---';
PRINT '';

-- Create another student to drop
DECLARE @student_id2 INT, @student_code2 VARCHAR(50), @error11 NVARCHAR(500);
EXEC sp_RegisterStudent
    @email = 'student02@example.com',
    @password_hash = '$2b$10$test',
    @full_name = N'Student To Drop',
    @phone = '0999999999',
    @address = N'Test',
    @birth_date = '2005-01-01',
    @school_level = 'HIGH_SCHOOL',
    @parent_name = N'Parent',
    @parent_phone = '0888888888',
    @student_id = @student_id2 OUTPUT,
    @student_code = @student_code2 OUTPUT,
    @error_message = @error11 OUTPUT;

-- Enroll
DECLARE @enrollment_id2 INT, @error12 NVARCHAR(500);
EXEC sp_EnrollStudent
    @class_id = @class_id1,
    @student_id = @student_id2,
    @total_fee = 3000000,
    @enrollment_id = @enrollment_id2 OUTPUT,
    @error_message = @error12 OUTPUT;

PRINT 'Setup: Enrolled student ' + CAST(@student_id2 AS VARCHAR);

-- Check current students
SELECT CURRENT_STUDENTS FROM CLASSES WHERE ID = @class_id1;

-- Drop enrollment
DECLARE @error13 NVARCHAR(500);
EXEC sp_DropEnrollment
    @enrollment_id = @enrollment_id2,
    @reason = N'Test drop enrollment',
    @error_message = @error13 OUTPUT;

PRINT 'Test 8.1 - Drop Enrollment:';
PRINT '  Message: ' + @error13;

-- Verify: CURRENT_STUDENTS should decrease
SELECT CURRENT_STUDENTS FROM CLASSES WHERE ID = @class_id1;

-- Verify: Status should be DROPPED
SELECT STATUS FROM ENROLLMENTS WHERE ID = @enrollment_id2;
PRINT '';

-- =================================================================
-- CLEANUP (OPTIONAL)
-- =================================================================
PRINT '--- CLEANUP ---';
PRINT 'Bạn có muốn xóa test data không?';
PRINT 'Nếu muốn, uncomment các dòng sau:';
PRINT '';

/*
-- Delete test data
DELETE FROM GRADES WHERE ENROLLMENT_ID IN (@enrollment_id1, @enrollment_id2);
DELETE FROM ATTENDANCE WHERE SESSION_ID = @session_id1;
DELETE FROM CLASS_SESSIONS WHERE ID = @session_id1;
DELETE FROM SUBMISSIONS WHERE ASSIGNMENT_ID = @assignment_id1;
DELETE FROM ASSIGNMENTS WHERE ID = @assignment_id1;
DELETE FROM PAYMENTS WHERE ENROLLMENT_ID IN (@enrollment_id1, @enrollment_id2);
DELETE FROM ENROLLMENTS WHERE ID IN (@enrollment_id1, @enrollment_id2);
DELETE FROM CLASSES WHERE ID = @class_id1;
DELETE FROM COURSES WHERE ID = @course_id;
DELETE FROM SUBJECTS WHERE ID = @subject_id;
DELETE FROM STUDENTS WHERE ID IN (@student_id1, @student_id2);
DELETE FROM TEACHERS WHERE ID = @teacher_id1;
DELETE FROM USERS WHERE ID IN (@user_id1, 
    (SELECT USER_ID FROM STUDENTS WHERE ID = @student_id1),
    (SELECT USER_ID FROM STUDENTS WHERE ID = @student_id2),
    (SELECT USER_ID FROM TEACHERS WHERE ID = @teacher_id1)
);
DELETE FROM NOTIFICATIONS WHERE USER_ID IN (
    SELECT USER_ID FROM STUDENTS WHERE ID IN (@student_id1, @student_id2)
);

PRINT 'Test data cleaned up!';
*/

PRINT '';
PRINT '================================================';
PRINT 'KẾT THÚC TEST';
PRINT '================================================';
PRINT '';
PRINT 'Tất cả tests đã chạy xong!';
PRINT 'Kiểm tra kết quả ở trên để verify.';

GO
