-- =================================================================
-- DMT EDUCATION SYSTEM - INSERT MOCK DATA FOR DASHBOARD
-- =================================================================
-- File này insert dữ liệu mẫu để test Dashboard
-- =================================================================

USE DMT_EDUCATION_SYSTEM;
GO

-- =================================================================
-- 1. INSERT MOCK SUBJECTS (nếu chưa có)
-- =================================================================

IF NOT EXISTS (SELECT 1 FROM SUBJECTS WHERE CODE = 'IELTS')
BEGIN
  INSERT INTO SUBJECTS (NAME, CODE, DESCRIPTION, IS_ACTIVE)
  VALUES 
  (N'IELTS', 'IELTS', N'Khóa học luyện thi IELTS', 1),
  (N'TOEIC', 'TOEIC', N'Khóa học luyện thi TOEIC', 1),
  (N'Tiếng Anh Giao Tiếp', 'COMM_ENG', N'Khóa học tiếng Anh giao tiếp', 1),
  (N'Business English', 'BUS_ENG', N'Tiếng Anh thương mại', 1),
  (N'Toán Tư Duy', 'MATH', N'Khóa học Toán tư duy', 1),
  (N'Tiếng Anh Thiếu Nhi', 'KID_ENG', N'Tiếng Anh dành cho trẻ em', 1);
END
GO

-- =================================================================
-- 2. INSERT MOCK COURSES (30 courses)
-- =================================================================

DECLARE @SubjectIELTS INT = (SELECT ID FROM SUBJECTS WHERE CODE = 'IELTS');
DECLARE @SubjectTOEIC INT = (SELECT ID FROM SUBJECTS WHERE CODE = 'TOEIC');
DECLARE @SubjectCOMM INT = (SELECT ID FROM SUBJECTS WHERE CODE = 'COMM_ENG');
DECLARE @SubjectBUS INT = (SELECT ID FROM SUBJECTS WHERE CODE = 'BUS_ENG');
DECLARE @SubjectMATH INT = (SELECT ID FROM SUBJECTS WHERE CODE = 'MATH');
DECLARE @SubjectKID INT = (SELECT ID FROM SUBJECTS WHERE CODE = 'KID_ENG');

-- Insert IELTS courses
INSERT INTO COURSES (SUBJECT_ID, CODE, NAME, DESCRIPTION, DURATION_WEEKS, TOTAL_SESSIONS, PRICE, LEVEL, IS_ACTIVE)
VALUES
(@SubjectIELTS, 'IELTS-50', N'IELTS 5.0 Foundation', N'Khóa học IELTS nền tảng 5.0', 12, 36, 4500000, 'BEGINNER', 1),
(@SubjectIELTS, 'IELTS-55', N'IELTS 5.5 Pre-Intermediate', N'Khóa học IELTS 5.5', 12, 36, 5000000, 'BEGINNER', 1),
(@SubjectIELTS, 'IELTS-60', N'IELTS 6.0 Intermediate', N'Khóa học IELTS 6.0', 14, 42, 6000000, 'INTERMEDIATE', 1),
(@SubjectIELTS, 'IELTS-65', N'IELTS 6.5 Upper-Intermediate', N'Khóa học IELTS 6.5', 16, 48, 7000000, 'INTERMEDIATE', 1),
(@SubjectIELTS, 'IELTS-70', N'IELTS 7.0+ Advanced', N'Khóa học IELTS 7.0+', 18, 54, 8500000, 'ADVANCED', 1),
(@SubjectIELTS, 'IELTS-75', N'IELTS 7.5+ Expert', N'Khóa học IELTS 7.5+', 20, 60, 10000000, 'ADVANCED', 1);

-- Insert TOEIC courses
INSERT INTO COURSES (SUBJECT_ID, CODE, NAME, DESCRIPTION, DURATION_WEEKS, TOTAL_SESSIONS, PRICE, LEVEL, IS_ACTIVE)
VALUES
(@SubjectTOEIC, 'TOEIC-450', N'TOEIC 450+', N'Khóa học TOEIC mục tiêu 450+', 10, 30, 3500000, 'BEGINNER', 1),
(@SubjectTOEIC, 'TOEIC-550', N'TOEIC 550+', N'Khóa học TOEIC mục tiêu 550+', 12, 36, 4000000, 'BEGINNER', 1),
(@SubjectTOEIC, 'TOEIC-650', N'TOEIC 650+', N'Khóa học TOEIC mục tiêu 650+', 12, 36, 4500000, 'INTERMEDIATE', 1),
(@SubjectTOEIC, 'TOEIC-750', N'TOEIC 750+', N'Khóa học TOEIC mục tiêu 750+', 14, 42, 5500000, 'INTERMEDIATE', 1),
(@SubjectTOEIC, 'TOEIC-850', N'TOEIC 850+', N'Khóa học TOEIC mục tiêu 850+', 16, 48, 6500000, 'ADVANCED', 1);

-- Insert Communication courses
INSERT INTO COURSES (SUBJECT_ID, CODE, NAME, DESCRIPTION, DURATION_WEEKS, TOTAL_SESSIONS, PRICE, LEVEL, IS_ACTIVE)
VALUES
(@SubjectCOMM, 'COMM-A1', N'Giao tiếp A1', N'Tiếng Anh giao tiếp cơ bản A1', 10, 30, 3000000, 'BEGINNER', 1),
(@SubjectCOMM, 'COMM-A2', N'Giao tiếp A2', N'Tiếng Anh giao tiếp cơ bản A2', 10, 30, 3200000, 'BEGINNER', 1),
(@SubjectCOMM, 'COMM-B1', N'Giao tiếp B1', N'Tiếng Anh giao tiếp trung cấp B1', 12, 36, 3800000, 'INTERMEDIATE', 1),
(@SubjectCOMM, 'COMM-B2', N'Giao tiếp B2', N'Tiếng Anh giao tiếp trung cấp B2', 12, 36, 4200000, 'INTERMEDIATE', 1),
(@SubjectCOMM, 'COMM-C1', N'Giao tiếp C1', N'Tiếng Anh giao tiếp nâng cao C1', 14, 42, 5000000, 'ADVANCED', 1);

-- Insert Business English courses
INSERT INTO COURSES (SUBJECT_ID, CODE, NAME, DESCRIPTION, DURATION_WEEKS, TOTAL_SESSIONS, PRICE, LEVEL, IS_ACTIVE)
VALUES
(@SubjectBUS, 'BUS-BASIC', N'Business English Basic', N'Tiếng Anh thương mại cơ bản', 12, 36, 5000000, 'INTERMEDIATE', 1),
(@SubjectBUS, 'BUS-ADV', N'Business English Advanced', N'Tiếng Anh thương mại nâng cao', 14, 42, 6000000, 'ADVANCED', 1),
(@SubjectBUS, 'BUS-PRES', N'Business Presentation', N'Kỹ năng thuyết trình tiếng Anh', 8, 24, 4000000, 'INTERMEDIATE', 1),
(@SubjectBUS, 'BUS-NEG', N'Business Negotiation', N'Kỹ năng đàm phán tiếng Anh', 10, 30, 4500000, 'ADVANCED', 1);

-- Insert Math courses
INSERT INTO COURSES (SUBJECT_ID, CODE, NAME, DESCRIPTION, DURATION_WEEKS, TOTAL_SESSIONS, PRICE, LEVEL, IS_ACTIVE)
VALUES
(@SubjectMATH, 'MATH-G1', N'Toán Tư Duy Lớp 1', N'Toán tư duy dành cho học sinh lớp 1', 16, 48, 2500000, 'BEGINNER', 1),
(@SubjectMATH, 'MATH-G2', N'Toán Tư Duy Lớp 2', N'Toán tư duy dành cho học sinh lớp 2', 16, 48, 2500000, 'BEGINNER', 1),
(@SubjectMATH, 'MATH-G3', N'Toán Tư Duy Lớp 3', N'Toán tư duy dành cho học sinh lớp 3', 16, 48, 2800000, 'BEGINNER', 1),
(@SubjectMATH, 'MATH-G4', N'Toán Tư Duy Lớp 4', N'Toán tư duy dành cho học sinh lớp 4', 16, 48, 2800000, 'INTERMEDIATE', 1),
(@SubjectMATH, 'MATH-G5', N'Toán Tư Duy Lớp 5', N'Toán tư duy dành cho học sinh lớp 5', 16, 48, 3000000, 'INTERMEDIATE', 1);

-- Insert Kids English courses
INSERT INTO COURSES (SUBJECT_ID, CODE, NAME, DESCRIPTION, DURATION_WEEKS, TOTAL_SESSIONS, PRICE, LEVEL, IS_ACTIVE)
VALUES
(@SubjectKID, 'KID-STR', N'English Starters', N'Tiếng Anh cho trẻ mới bắt đầu', 12, 36, 3500000, 'BEGINNER', 1),
(@SubjectKID, 'KID-MOV', N'English Movers', N'Tiếng Anh thiếu nhi trung cấp', 14, 42, 3800000, 'BEGINNER', 1),
(@SubjectKID, 'KID-FLY', N'English Flyers', N'Tiếng Anh thiếu nhi nâng cao', 16, 48, 4200000, 'INTERMEDIATE', 1);

GO

PRINT N'✅ Đã insert 30 courses';
GO

-- =================================================================
-- 3. INSERT MOCK CLASSES (50 classes across 3 campuses)
-- =================================================================

DECLARE @TeacherID INT;
DECLARE @CourseID INT;
DECLARE @CampusGV INT = (SELECT ID FROM CAMPUSES WHERE CODE = 'govap');
DECLARE @CampusQ12 INT = (SELECT ID FROM CAMPUSES WHERE CODE = 'quan12');
DECLARE @CampusQ3 INT = (SELECT ID FROM CAMPUSES WHERE CODE = 'quan3');

-- Get a teacher ID (use first available teacher)
SELECT TOP 1 @TeacherID = ID FROM TEACHERS;

-- Insert classes for each course (2-3 classes per popular course)
DECLARE @CourseCode VARCHAR(50);
DECLARE @ClassName NVARCHAR(255);
DECLARE @ClassCounter INT = 0;

DECLARE course_cursor CURSOR FOR 
SELECT CODE FROM COURSES WHERE IS_ACTIVE = 1;

OPEN course_cursor;
FETCH NEXT FROM course_cursor INTO @CourseCode;

WHILE @@FETCH_STATUS = 0 AND @ClassCounter < 50
BEGIN
  SET @CourseID = (SELECT ID FROM COURSES WHERE CODE = @CourseCode);
  
  -- Class 1 - Gò Vấp
  SET @ClassName = (SELECT NAME FROM COURSES WHERE ID = @CourseID) + N' - Sáng T2,4,6';
  INSERT INTO CLASSES (COURSE_ID, CODE, NAME, TEACHER_ID, CAMPUS_ID, CAPACITY, CURRENT_STUDENTS, START_DATE, END_DATE, SCHEDULE_DAYS, SCHEDULE_TIME, CLASSROOM, STATUS)
  VALUES (
    @CourseID, 
    @CourseCode + '-GV-M1', 
    @ClassName, 
    @TeacherID, 
    @CampusGV,
    25, 
    CAST(RAND() * 25 AS INT), 
    DATEADD(DAY, CAST(RAND() * 30 AS INT), GETDATE()),
    DATEADD(DAY, CAST(RAND() * 30 AS INT) + 90, GETDATE()),
    'MONDAY,WEDNESDAY,FRIDAY',
    '08:00-10:00',
    N'Phòng A' + CAST((@ClassCounter % 10 + 1) AS NVARCHAR) + N' - Gò Vấp',
    'ACTIVE'
  );
  SET @ClassCounter = @ClassCounter + 1;
  
  -- Class 2 - Quận 12 (for popular courses)
  IF @ClassCounter < 50 AND @CourseCode IN ('IELTS-65', 'IELTS-70', 'TOEIC-750', 'COMM-B1', 'MATH-G3')
  BEGIN
    SET @ClassName = (SELECT NAME FROM COURSES WHERE ID = @CourseID) + N' - Chiều T3,5,7';
    INSERT INTO CLASSES (COURSE_ID, CODE, NAME, TEACHER_ID, CAMPUS_ID, CAPACITY, CURRENT_STUDENTS, START_DATE, END_DATE, SCHEDULE_DAYS, SCHEDULE_TIME, CLASSROOM, STATUS)
    VALUES (
      @CourseID, 
      @CourseCode + '-Q12-A1', 
      @ClassName, 
      @TeacherID, 
      @CampusQ12,
      20, 
      CAST(RAND() * 20 AS INT), 
      DATEADD(DAY, CAST(RAND() * 45 AS INT), GETDATE()),
      DATEADD(DAY, CAST(RAND() * 45 AS INT) + 90, GETDATE()),
      'TUESDAY,THURSDAY,SATURDAY',
      '14:00-16:00',
      N'Phòng B' + CAST((@ClassCounter % 8 + 1) AS NVARCHAR) + N' - Quận 12',
      'ACTIVE'
    );
    SET @ClassCounter = @ClassCounter + 1;
  END
  
  -- Class 3 - Quận 3
  IF @ClassCounter < 50 AND @CourseCode IN ('IELTS-65', 'TOEIC-850', 'BUS-ADV', 'COMM-B2')
  BEGIN
    SET @ClassName = (SELECT NAME FROM COURSES WHERE ID = @CourseID) + N' - Tối T2,4,6';
    INSERT INTO CLASSES (COURSE_ID, CODE, NAME, TEACHER_ID, CAMPUS_ID, CAPACITY, CURRENT_STUDENTS, START_DATE, END_DATE, SCHEDULE_DAYS, SCHEDULE_TIME, CLASSROOM, STATUS)
    VALUES (
      @CourseID, 
      @CourseCode + '-Q3-E1', 
      @ClassName, 
      @TeacherID, 
      @CampusQ3,
      22, 
      CAST(RAND() * 22 AS INT), 
      DATEADD(DAY, CAST(RAND() * 60 AS INT), GETDATE()),
      DATEADD(DAY, CAST(RAND() * 60 AS INT) + 90, GETDATE()),
      'MONDAY,WEDNESDAY,FRIDAY',
      '18:30-20:30',
      N'Phòng C' + CAST((@ClassCounter % 12 + 1) AS NVARCHAR) + N' - Quận 3',
      'ACTIVE'
    );
    SET @ClassCounter = @ClassCounter + 1;
  END
  
  FETCH NEXT FROM course_cursor INTO @CourseCode;
END

CLOSE course_cursor;
DEALLOCATE course_cursor;

GO

PRINT N'✅ Đã insert classes';
GO

-- =================================================================
-- 4. INSERT MOCK ENROLLMENTS (300+ enrollments)
-- =================================================================

DECLARE @StudentCount INT = (SELECT COUNT(*) FROM STUDENTS);
DECLARE @ClassCount INT = (SELECT COUNT(*) FROM CLASSES WHERE STATUS = 'ACTIVE');

IF @StudentCount > 0 AND @ClassCount > 0
BEGIN
  DECLARE @i INT = 0;
  DECLARE @StudentID INT;
  DECLARE @ClassID INT;
  DECLARE @TotalFee DECIMAL(12,2);
  DECLARE @PaidAmount DECIMAL(12,2);
  DECLARE @PaymentStatuses TABLE (Status VARCHAR(20));
  INSERT INTO @PaymentStatuses VALUES ('PAID'), ('PAID'), ('PAID'), ('PARTIAL'), ('PENDING');
  
  -- Each student enrolls in 1-3 classes
  DECLARE student_cursor CURSOR FOR SELECT ID FROM STUDENTS;
  OPEN student_cursor;
  FETCH NEXT FROM student_cursor INTO @StudentID;
  
  WHILE @@FETCH_STATUS = 0
  BEGIN
    DECLARE @NumEnrollments INT = CAST(RAND() * 3 AS INT) + 1; -- 1 to 3 enrollments
    DECLARE @j INT = 0;
    
    WHILE @j < @NumEnrollments
    BEGIN
      -- Get random active class
      SELECT TOP 1 @ClassID = c.ID, @TotalFee = co.PRICE
      FROM CLASSES c
      INNER JOIN COURSES co ON c.COURSE_ID = co.ID
      WHERE c.STATUS = 'ACTIVE' 
        AND c.CURRENT_STUDENTS < c.CAPACITY
        AND NOT EXISTS (
          SELECT 1 FROM ENROLLMENTS 
          WHERE CLASS_ID = c.ID AND STUDENT_ID = @StudentID
        )
      ORDER BY NEWID();
      
      IF @ClassID IS NOT NULL
      BEGIN
        -- Random payment status
        DECLARE @PayStatus VARCHAR(20);
        SELECT TOP 1 @PayStatus = Status FROM @PaymentStatuses ORDER BY NEWID();
        
        -- Calculate paid amount based on status
        IF @PayStatus = 'PAID'
          SET @PaidAmount = @TotalFee;
        ELSE IF @PayStatus = 'PARTIAL'
          SET @PaidAmount = @TotalFee * (CAST(RAND() * 50 AS INT) + 30) / 100; -- 30-80% paid
        ELSE
          SET @PaidAmount = 0;
        
        INSERT INTO ENROLLMENTS (CLASS_ID, STUDENT_ID, ENROLLMENT_DATE, STATUS, PAYMENT_STATUS, TOTAL_FEE, PAID_AMOUNT, DISCOUNT_PERCENT)
        VALUES (
          @ClassID,
          @StudentID,
          DATEADD(DAY, -CAST(RAND() * 90 AS INT), GETDATE()),
          'ACTIVE',
          @PayStatus,
          @TotalFee,
          @PaidAmount,
          CASE WHEN RAND() > 0.7 THEN CAST(RAND() * 20 AS INT) ELSE 0 END -- 30% chance of discount
        );
        
        -- Update class current students count
        UPDATE CLASSES SET CURRENT_STUDENTS = CURRENT_STUDENTS + 1 WHERE ID = @ClassID;
      END
      
      SET @j = @j + 1;
      SET @ClassID = NULL;
    END
    
    FETCH NEXT FROM student_cursor INTO @StudentID;
  END
  
  CLOSE student_cursor;
  DEALLOCATE student_cursor;
END

GO

PRINT N'✅ Đã insert enrollments';
GO

-- =================================================================
-- 5. INSERT MOCK PAYMENTS (500+ payment records)
-- =================================================================

DECLARE @EnrollmentID INT;
DECLARE @PaymentAmount DECIMAL(12,2);
DECLARE @PaymentMethods TABLE (Method VARCHAR(50));
INSERT INTO @PaymentMethods VALUES ('CASH'), ('BANK_TRANSFER'), ('CREDIT_CARD'), ('E_WALLET');

DECLARE enrollment_cursor CURSOR FOR 
SELECT ID, PAID_AMOUNT FROM ENROLLMENTS WHERE PAID_AMOUNT > 0;

OPEN enrollment_cursor;
FETCH NEXT FROM enrollment_cursor INTO @EnrollmentID, @PaymentAmount;

WHILE @@FETCH_STATUS = 0
BEGIN
  -- Create 1-3 payment records per enrollment
  DECLARE @NumPayments INT = CASE 
    WHEN @PaymentAmount > 5000000 THEN CAST(RAND() * 3 AS INT) + 1
    ELSE 1
  END;
  
  DECLARE @PaymentPerInstallment DECIMAL(12,2) = @PaymentAmount / @NumPayments;
  DECLARE @PaymentCounter INT = 0;
  
  WHILE @PaymentCounter < @NumPayments
  BEGIN
    DECLARE @PayMethod VARCHAR(50);
    SELECT TOP 1 @PayMethod = Method FROM @PaymentMethods ORDER BY NEWID();
    
    INSERT INTO PAYMENTS (
      PAYMENT_CODE, 
      ENROLLMENT_ID, 
      AMOUNT, 
      PAYMENT_DATE, 
      PAYMENT_METHOD, 
      STATUS, 
      RECEIPT_NUMBER,
      DESCRIPTION,
      CREATED_BY
    )
    VALUES (
      'PAY-' + FORMAT(GETDATE(), 'yyyyMMdd') + '-' + RIGHT('00000' + CAST(@EnrollmentID AS VARCHAR), 5) + '-' + CAST(@PaymentCounter + 1 AS VARCHAR),
      @EnrollmentID,
      @PaymentPerInstallment,
      DATEADD(DAY, -CAST(RAND() * 60 AS INT) - (@PaymentCounter * 30), GETDATE()),
      @PayMethod,
      'COMPLETED',
      'REC-' + FORMAT(GETDATE(), 'yyyyMMdd') + '-' + CAST(NEWID() AS VARCHAR(8)),
      N'Thanh toán học phí đợt ' + CAST(@PaymentCounter + 1 AS NVARCHAR),
      'system'
    );
    
    SET @PaymentCounter = @PaymentCounter + 1;
  END
  
  FETCH NEXT FROM enrollment_cursor INTO @EnrollmentID, @PaymentAmount;
END

CLOSE enrollment_cursor;
DEALLOCATE enrollment_cursor;

GO

PRINT N'✅ Đã insert payments';
GO

-- =================================================================
-- 6. SUMMARY - Show statistics
-- =================================================================

SELECT 
  'SUBJECTS' as TableName, 
  COUNT(*) as RecordCount,
  COUNT(CASE WHEN IS_ACTIVE = 1 THEN 1 END) as ActiveCount
FROM SUBJECTS

UNION ALL

SELECT 
  'COURSES' as TableName, 
  COUNT(*) as RecordCount,
  COUNT(CASE WHEN IS_ACTIVE = 1 THEN 1 END) as ActiveCount
FROM COURSES

UNION ALL

SELECT 
  'CAMPUSES' as TableName, 
  COUNT(*) as RecordCount,
  COUNT(CASE WHEN IS_ACTIVE = 1 THEN 1 END) as ActiveCount
FROM CAMPUSES

UNION ALL

SELECT 
  'CLASSES' as TableName, 
  COUNT(*) as RecordCount,
  COUNT(CASE WHEN STATUS = 'ACTIVE' THEN 1 END) as ActiveCount
FROM CLASSES

UNION ALL

SELECT 
  'ENROLLMENTS' as TableName, 
  COUNT(*) as RecordCount,
  COUNT(CASE WHEN STATUS = 'ACTIVE' THEN 1 END) as ActiveCount
FROM ENROLLMENTS

UNION ALL

SELECT 
  'PAYMENTS' as TableName, 
  COUNT(*) as RecordCount,
  COUNT(CASE WHEN STATUS = 'COMPLETED' THEN 1 END) as CompletedCount
FROM PAYMENTS;

GO

PRINT N'';
PRINT N'=================================================================';
PRINT N'✅ HOÀN TẤT INSERT MOCK DATA CHO DASHBOARD';
PRINT N'=================================================================';
GO
