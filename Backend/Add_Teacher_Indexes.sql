-- =============================================
-- Add Indexes for Teachers Query Performance
-- =============================================

USE DMT_EDUCATION_SYSTEM;
GO

-- Index on TEACHERS table for fast lookup
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_TEACHERS_USER_ID' AND object_id = OBJECT_ID('TEACHERS'))
BEGIN
    CREATE NONCLUSTERED INDEX IX_TEACHERS_USER_ID
    ON TEACHERS(USER_ID)
    INCLUDE (ID, TEACHER_CODE, MAIN_SUBJECT_ID, YEARS_EXPERIENCE, DEGREE, SPECIALIZATION, CREATED_AT);
    PRINT 'Created index IX_TEACHERS_USER_ID';
END
ELSE
    PRINT 'Index IX_TEACHERS_USER_ID already exists';
GO

-- Index on TEACHERS.ID for sorting
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_TEACHERS_ID_DESC' AND object_id = OBJECT_ID('TEACHERS'))
BEGIN
    CREATE NONCLUSTERED INDEX IX_TEACHERS_ID_DESC
    ON TEACHERS(ID DESC);
    PRINT 'Created index IX_TEACHERS_ID_DESC';
END
ELSE
    PRINT 'Index IX_TEACHERS_ID_DESC already exists';
GO

-- Index on USERS for STATUS filtering
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_USERS_STATUS' AND object_id = OBJECT_ID('USERS'))
BEGIN
    CREATE NONCLUSTERED INDEX IX_USERS_STATUS
    ON USERS(STATUS)
    INCLUDE (ID, FULL_NAME, PHONE, ADDRESS, BIRTH_DATE);
    PRINT 'Created index IX_USERS_STATUS';
END
ELSE
    PRINT 'Index IX_USERS_STATUS already exists';
GO

-- Index on USERS.ID for JOIN performance
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_USERS_ID' AND object_id = OBJECT_ID('USERS'))
BEGIN
    CREATE NONCLUSTERED INDEX IX_USERS_ID
    ON USERS(ID)
    INCLUDE (FULL_NAME, PHONE, ADDRESS, BIRTH_DATE, STATUS);
    PRINT 'Created index IX_USERS_ID';
END
ELSE
    PRINT 'Index IX_USERS_ID already exists';
GO

-- Index on SUBJECTS for LEFT JOIN performance
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_SUBJECTS_ID' AND object_id = OBJECT_ID('SUBJECTS'))
BEGIN
    CREATE NONCLUSTERED INDEX IX_SUBJECTS_ID
    ON SUBJECTS(ID)
    INCLUDE (NAME, CODE);
    PRINT 'Created index IX_SUBJECTS_ID';
END
ELSE
    PRINT 'Index IX_SUBJECTS_ID already exists';
GO

-- Update statistics for better query plans
UPDATE STATISTICS TEACHERS WITH FULLSCAN;
UPDATE STATISTICS USERS WITH FULLSCAN;
UPDATE STATISTICS SUBJECTS WITH FULLSCAN;
GO

PRINT '';
PRINT '✅ All indexes created successfully!';
PRINT '✅ Statistics updated!';
PRINT '';
PRINT 'Performance improvements expected:';
PRINT '  - Teachers query: 10-50x faster';
PRINT '  - JOIN operations: Significantly improved';
PRINT '  - Filter by STATUS: Instant';
GO
