-- =================================================================
-- IMPORT ATTENDANCE RECORDS FROM MOCK DATA
-- =================================================================
-- Script này import dữ liệu điểm danh từ mock data vào database
-- Nguồn: src/features/teachers/pages/AttendanceMarking.tsx
-- Cần chạy sau khi đã có: CLASS_SESSIONS, ENROLLMENTS, USERS (teachers)
-- =================================================================

USE DMT_EDUCATION_SYSTEM;
GO

-- Lấy Class Session (Session 3 - Completed của Toán 10A)
DECLARE @SessionId INT = (
    SELECT TOP 1 cs.ID FROM CLASS_SESSIONS cs
    INNER JOIN CLASSES c ON cs.CLASS_ID = c.ID
    WHERE c.CODE = 'TOAN10A-HK1' AND cs.SESSION_NUMBER = 3
);

-- Lấy Teacher ID để làm marked_by
DECLARE @TeacherUserId INT = (
    SELECT TOP 1 t.USER_ID FROM TEACHERS t
    INNER JOIN CLASSES c ON t.ID = c.TEACHER_ID
    WHERE c.CODE = 'TOAN10A-HK1'
);

-- Lấy Enrollment IDs cho các học sinh trong lớp Toán 10A
DECLARE @Enrollment1Id INT = (
    SELECT TOP 1 e.ID FROM ENROLLMENTS e
    INNER JOIN STUDENTS s ON e.STUDENT_ID = s.ID
    INNER JOIN CLASSES c ON e.CLASS_ID = c.ID
    WHERE s.STUDENT_CODE = 'HS2025001' AND c.CODE = 'TOAN10A-HK1'
);
DECLARE @Enrollment2Id INT = (
    SELECT TOP 1 e.ID FROM ENROLLMENTS e
    INNER JOIN STUDENTS s ON e.STUDENT_ID = s.ID
    INNER JOIN CLASSES c ON e.CLASS_ID = c.ID
    WHERE s.STUDENT_CODE = 'HS2025002' AND c.CODE = 'TOAN10A-HK1'
);
DECLARE @Enrollment3Id INT = (
    SELECT TOP 1 e.ID FROM ENROLLMENTS e
    INNER JOIN STUDENTS s ON e.STUDENT_ID = s.ID
    INNER JOIN CLASSES c ON e.CLASS_ID = c.ID
    WHERE s.STUDENT_CODE = 'HS2025003' AND c.CODE = 'TOAN10A-HK1'
);
DECLARE @Enrollment4Id INT = (
    SELECT TOP 1 e.ID FROM ENROLLMENTS e
    INNER JOIN STUDENTS s ON e.STUDENT_ID = s.ID
    INNER JOIN CLASSES c ON e.CLASS_ID = c.ID
    WHERE s.STUDENT_CODE = 'HS2025004' AND c.CODE = 'TOAN10A-HK1'
);
DECLARE @Enrollment5Id INT = (
    SELECT TOP 1 e.ID FROM ENROLLMENTS e
    INNER JOIN STUDENTS s ON e.STUDENT_ID = s.ID
    INNER JOIN CLASSES c ON e.CLASS_ID = c.ID
    WHERE s.STUDENT_CODE = 'HS2025005' AND c.CODE = 'TOAN10A-HK1'
);

-- Attendance Record 1: HS2025001 - PRESENT
IF @SessionId IS NOT NULL AND @Enrollment1Id IS NOT NULL AND @TeacherUserId IS NOT NULL
BEGIN
    IF NOT EXISTS (SELECT 1 FROM ATTENDANCE WHERE session_id = @SessionId AND enrollment_id = @Enrollment1Id)
    BEGIN
        INSERT INTO ATTENDANCE (session_id, enrollment_id, status, check_in_time, notes, marked_by, created_at)
        VALUES (
            @SessionId,
            @Enrollment1Id,
            'PRESENT',
            '2025-11-16 18:05:00',
            N'Điểm danh đúng giờ',
            @TeacherUserId,
            '2025-11-16 18:10:00'
        );
        PRINT 'Created attendance: HS2025001 - PRESENT';
    END
END

-- Attendance Record 2: HS2025002 - PRESENT
IF @SessionId IS NOT NULL AND @Enrollment2Id IS NOT NULL AND @TeacherUserId IS NOT NULL
BEGIN
    IF NOT EXISTS (SELECT 1 FROM ATTENDANCE WHERE session_id = @SessionId AND enrollment_id = @Enrollment2Id)
    BEGIN
        INSERT INTO ATTENDANCE (session_id, enrollment_id, status, check_in_time, notes, marked_by, created_at)
        VALUES (
            @SessionId,
            @Enrollment2Id,
            'PRESENT',
            '2025-11-16 18:02:00',
            NULL,
            @TeacherUserId,
            '2025-11-16 18:10:00'
        );
        PRINT 'Created attendance: HS2025002 - PRESENT';
    END
END

-- Attendance Record 3: HS2025003 - LATE
IF @SessionId IS NOT NULL AND @Enrollment3Id IS NOT NULL AND @TeacherUserId IS NOT NULL
BEGIN
    IF NOT EXISTS (SELECT 1 FROM ATTENDANCE WHERE session_id = @SessionId AND enrollment_id = @Enrollment3Id)
    BEGIN
        INSERT INTO ATTENDANCE (session_id, enrollment_id, status, check_in_time, notes, marked_by, created_at)
        VALUES (
            @SessionId,
            @Enrollment3Id,
            'LATE',
            '2025-11-16 18:15:00',
            N'Đến muộn 15 phút',
            @TeacherUserId,
            '2025-11-16 18:20:00'
        );
        PRINT 'Created attendance: HS2025003 - LATE';
    END
END

-- Attendance Record 4: HS2025004 - ABSENT
IF @SessionId IS NOT NULL AND @Enrollment4Id IS NOT NULL AND @TeacherUserId IS NOT NULL
BEGIN
    IF NOT EXISTS (SELECT 1 FROM ATTENDANCE WHERE session_id = @SessionId AND enrollment_id = @Enrollment4Id)
    BEGIN
        INSERT INTO ATTENDANCE (session_id, enrollment_id, status, check_in_time, notes, marked_by, created_at)
        VALUES (
            @SessionId,
            @Enrollment4Id,
            'ABSENT',
            NULL,
            N'Vắng mặt không phép',
            @TeacherUserId,
            '2025-11-16 18:10:00'
        );
        PRINT 'Created attendance: HS2025004 - ABSENT';
    END
END

-- Attendance Record 5: HS2025005 - EXCUSED
IF @SessionId IS NOT NULL AND @Enrollment5Id IS NOT NULL AND @TeacherUserId IS NOT NULL
BEGIN
    IF NOT EXISTS (SELECT 1 FROM ATTENDANCE WHERE session_id = @SessionId AND enrollment_id = @Enrollment5Id)
    BEGIN
        INSERT INTO ATTENDANCE (session_id, enrollment_id, status, check_in_time, notes, marked_by, created_at)
        VALUES (
            @SessionId,
            @Enrollment5Id,
            'EXCUSED',
            NULL,
            N'Có phép - ốm',
            @TeacherUserId,
            '2025-11-16 18:10:00'
        );
        PRINT 'Created attendance: HS2025005 - EXCUSED';
    END
END

PRINT '========================================';
PRINT 'Import Attendance Records completed!';
PRINT '========================================';

