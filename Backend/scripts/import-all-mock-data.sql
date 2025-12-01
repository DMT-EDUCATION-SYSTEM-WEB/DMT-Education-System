-- =================================================================
-- IMPORT ALL MOCK DATA FROM FRONTEND
-- =================================================================
-- Script này chạy tất cả các script import mock data vào database
-- Thứ tự chạy:
-- 1. ROLES (nếu chưa có)
-- 2. SUBJECTS (nếu chưa có)
-- 3. TEACHERS (đã có script riêng)
-- 4. COURSES (đã có script riêng)
-- 5. STUDENTS
-- 6. CLASSES (tạo trong enrollments script)
-- 7. ENROLLMENTS
-- 8. ASSIGNMENTS
-- 9. MATERIALS
-- =================================================================

USE DMT_EDUCATION_SYSTEM;
GO

PRINT '========================================';
PRINT 'Starting import of all mock data...';
PRINT '========================================';
PRINT '';

-- Kiểm tra ROLES
IF NOT EXISTS (SELECT 1 FROM ROLES WHERE CODE = 'STUDENT')
BEGIN
    PRINT 'Creating ROLES...';
    INSERT INTO ROLES (code, name, description, created_at)
    VALUES 
        ('ADMIN', N'Quản trị viên', N'Quản trị hệ thống', GETDATE()),
        ('STAFF', N'Nhân viên', N'Nhân viên trung tâm', GETDATE()),
        ('TEACHER', N'Giáo viên', N'Giáo viên giảng dạy', GETDATE()),
        ('STUDENT', N'Học sinh', N'Học sinh', GETDATE());
    PRINT 'Roles created successfully!';
END
ELSE
    PRINT 'Roles already exist.';

PRINT '';
PRINT '========================================';
PRINT 'Step 1: Import Students';
PRINT '========================================';
:r import-students-from-mock.sql

PRINT '';
PRINT '========================================';
PRINT 'Step 2: Import Enrollments (includes Classes)';
PRINT '========================================';
:r import-enrollments-from-mock.sql

PRINT '';
PRINT '========================================';
PRINT 'Step 3: Import Assignments';
PRINT '========================================';
:r import-assignments-from-mock.sql

PRINT '';
PRINT '========================================';
PRINT 'Step 4: Import Materials';
PRINT '========================================';
:r import-materials-from-mock.sql

PRINT '';
PRINT '========================================';
PRINT 'All mock data imported successfully!';
PRINT '========================================';
PRINT '';
PRINT 'Note: Make sure you have already run:';
PRINT '  - import-teachers-from-homepage.sql';
PRINT '  - import-courses-from-mock.sql';
PRINT '';

