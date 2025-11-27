-- ===================================================================
-- MASTER SCRIPT: Run All Mock Data Inserts
-- ===================================================================
-- Script này chạy tất cả các script insert mock data theo đúng thứ tự
-- Chạy file này để import toàn bộ mock data vào database
-- ===================================================================

USE DMT_EDUCATION_SYSTEM;
GO

PRINT '';
PRINT '###############################################';
PRINT '#                                             #';
PRINT '#   DMT EDUCATION - IMPORT MOCK DATA          #';
PRINT '#                                             #';
PRINT '###############################################';
PRINT '';
PRINT 'Bắt đầu import mock data vào database...';
PRINT '';

-- ===================================================================
-- STEP 1: Insert Teachers
-- ===================================================================
PRINT '';
PRINT '>>> STEP 1: Insert Teachers...';
PRINT '';

:r Insert_Teachers_From_TeachersPage.sql

-- ===================================================================
-- STEP 2: Insert Classes
-- ===================================================================
PRINT '';
PRINT '>>> STEP 2: Insert Classes...';
PRINT '';

:r Insert_Classes_From_SchedulePage.sql

-- ===================================================================
-- STEP 3: Insert News/Announcements
-- ===================================================================
PRINT '';
PRINT '>>> STEP 3: Insert News/Announcements...';
PRINT '';

:r Insert_News_From_AnnouncementPage.sql

-- ===================================================================
-- STEP 4: Insert Sample Payments
-- ===================================================================
PRINT '';
PRINT '>>> STEP 4: Insert Sample Payments...';
PRINT '';

:r Insert_Payments_Sample.sql

-- ===================================================================
-- SUMMARY
-- ===================================================================
PRINT '';
PRINT '';
PRINT '###############################################';
PRINT '#                                             #';
PRINT '#         IMPORT HOÀN TẤT!                   #';
PRINT '#                                             #';
PRINT '###############################################';
PRINT '';
PRINT 'Tổng kết:';
PRINT '- Teachers: 6';
PRINT '- Classes: 5';
PRINT '- News/Announcements: 5';
PRINT '- Sample Payments: 8';
PRINT '';
PRINT 'Kiểm tra dữ liệu:';
PRINT '';

SELECT 'TEACHERS' as TABLE_NAME, COUNT(*) as TOTAL FROM TEACHERS
UNION ALL
SELECT 'CLASSES', COUNT(*) FROM CLASSES
UNION ALL
SELECT 'NEWS', COUNT(*) FROM NEWS
UNION ALL
SELECT 'PAYMENTS', COUNT(*) FROM PAYMENTS;

PRINT '';
PRINT '###############################################';
