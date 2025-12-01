-- =================================================================
-- STORED PROCEDURE: sp_GetDashboardStats
-- =================================================================
-- Lấy thống kê tổng quan cho Dashboard Admin
-- =================================================================

USE DMT_EDUCATION_SYSTEM;
GO

-- Drop existing procedure
IF OBJECT_ID('sp_GetDashboardStats', 'P') IS NOT NULL
  DROP PROCEDURE sp_GetDashboardStats;
GO

CREATE PROCEDURE sp_GetDashboardStats
AS
BEGIN
  SET NOCOUNT ON;
  
  -- Get current month revenue
  DECLARE @CurrentMonthRevenue DECIMAL(18,2);
  SELECT @CurrentMonthRevenue = ISNULL(SUM(AMOUNT), 0)
  FROM PAYMENTS
  WHERE STATUS = 'COMPLETED'
    AND MONTH(PAYMENT_DATE) = MONTH(GETDATE())
    AND YEAR(PAYMENT_DATE) = YEAR(GETDATE());
  
  -- Get attendance rate (mock - would need actual attendance data)
  DECLARE @AttendanceRate DECIMAL(5,2) = 87.5;
  
  -- Get new enrollments this month
  DECLARE @NewEnrollments INT;
  SELECT @NewEnrollments = COUNT(*)
  FROM ENROLLMENTS
  WHERE MONTH(ENROLLMENT_DATE) = MONTH(GETDATE())
    AND YEAR(ENROLLMENT_DATE) = YEAR(GETDATE());
  
  -- Return stats
  SELECT 
    (SELECT COUNT(*) FROM STUDENTS WHERE USER_ID IN (SELECT ID FROM USERS WHERE STATUS = 1)) as totalStudents,
    (SELECT COUNT(*) FROM TEACHERS WHERE USER_ID IN (SELECT ID FROM USERS WHERE STATUS = 1)) as totalTeachers,
    (SELECT COUNT(*) FROM COURSES WHERE IS_ACTIVE = 1) as totalCourses,
    (SELECT COUNT(*) FROM CLASSES) as totalClasses,
    @CurrentMonthRevenue as monthlyRevenue,
    @AttendanceRate as attendanceRate,
    @NewEnrollments as newEnrollments,
    (SELECT COUNT(*) FROM CLASSES WHERE STATUS = 'ACTIVE') as activeClasses;
END
GO

PRINT N'✅ Created sp_GetDashboardStats';
GO
