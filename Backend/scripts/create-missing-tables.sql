-- =================================================================
-- CREATE MISSING TABLES FOR MOCK DATA
-- =================================================================
-- Script này tạo các bảng còn thiếu trong schema để import mock data
-- Các bảng: VIDEOS, TASKS, TICKETS
-- =================================================================

USE DMT_EDUCATION_SYSTEM;
GO

-- =================================================================
-- BẢNG VIDEOS - Video bài giảng
-- =================================================================
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'VIDEOS')
BEGIN
    CREATE TABLE VIDEOS (
        ID INT IDENTITY(1,1) PRIMARY KEY,
        CLASS_ID INT NOT NULL,
        TITLE NVARCHAR(255) NOT NULL,
        DESCRIPTION NVARCHAR(MAX),
        VIDEO_URL VARCHAR(500) NOT NULL,
        THUMBNAIL_URL VARCHAR(500),
        DURATION_SECONDS INT,
        CATEGORY NVARCHAR(100),
        UPLOADED_BY INT NOT NULL,
        IS_PUBLIC BIT DEFAULT 1,
        VIEW_COUNT INT DEFAULT 0,
        CREATED_AT DATETIME2 DEFAULT GETDATE(),
        UPDATED_AT DATETIME2 DEFAULT GETDATE(),
        CONSTRAINT FK_VIDEOS_CLASSES FOREIGN KEY (CLASS_ID) REFERENCES CLASSES(ID),
        CONSTRAINT FK_VIDEOS_UPLOADED_BY FOREIGN KEY (UPLOADED_BY) REFERENCES USERS(ID)
    );
    PRINT 'Created table: VIDEOS';
END
ELSE
    PRINT 'Table VIDEOS already exists';

-- =================================================================
-- BẢNG TASKS - Nhiệm vụ của nhân viên
-- =================================================================
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'TASKS')
BEGIN
    CREATE TABLE TASKS (
        ID INT IDENTITY(1,1) PRIMARY KEY,
        TITLE NVARCHAR(255) NOT NULL,
        DESCRIPTION NVARCHAR(MAX),
        STATUS VARCHAR(20) DEFAULT 'TODO', -- TODO, IN_PROGRESS, REVIEW, DONE, CANCELLED
        PRIORITY VARCHAR(20) DEFAULT 'MEDIUM', -- LOW, MEDIUM, HIGH, URGENT
        ASSIGNED_TO INT, -- USER_ID của nhân viên được giao
        CREATED_BY INT NOT NULL,
        CATEGORY NVARCHAR(100),
        DUE_DATE DATE,
        COMPLETED_AT DATETIME2,
        NOTES NVARCHAR(MAX),
        CREATED_AT DATETIME2 DEFAULT GETDATE(),
        UPDATED_AT DATETIME2 DEFAULT GETDATE(),
        CONSTRAINT FK_TASKS_ASSIGNED_TO FOREIGN KEY (ASSIGNED_TO) REFERENCES USERS(ID),
        CONSTRAINT FK_TASKS_CREATED_BY FOREIGN KEY (CREATED_BY) REFERENCES USERS(ID)
    );
    PRINT 'Created table: TASKS';
END
ELSE
    PRINT 'Table TASKS already exists';

-- =================================================================
-- BẢNG TICKETS - Hỗ trợ khách hàng
-- =================================================================
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'TICKETS')
BEGIN
    CREATE TABLE TICKETS (
        ID INT IDENTITY(1,1) PRIMARY KEY,
        TICKET_NUMBER VARCHAR(50) UNIQUE NOT NULL,
        TITLE NVARCHAR(255) NOT NULL,
        DESCRIPTION NVARCHAR(MAX),
        CATEGORY VARCHAR(50), -- technical, billing, academic, general
        PRIORITY VARCHAR(20) DEFAULT 'MEDIUM', -- low, medium, high, urgent
        STATUS VARCHAR(20) DEFAULT 'OPEN', -- open, in_progress, waiting, resolved, closed
        CREATED_BY INT NOT NULL, -- USER_ID của người tạo ticket
        ASSIGNED_TO INT, -- USER_ID của nhân viên được gán
        RESPONSE_COUNT INT DEFAULT 0,
        CREATED_AT DATETIME2 DEFAULT GETDATE(),
        UPDATED_AT DATETIME2 DEFAULT GETDATE(),
        RESOLVED_AT DATETIME2,
        CONSTRAINT FK_TICKETS_CREATED_BY FOREIGN KEY (CREATED_BY) REFERENCES USERS(ID),
        CONSTRAINT FK_TICKETS_ASSIGNED_TO FOREIGN KEY (ASSIGNED_TO) REFERENCES USERS(ID)
    );
    PRINT 'Created table: TICKETS';
END
ELSE
    PRINT 'Table TICKETS already exists';

PRINT '========================================';
PRINT 'Missing tables creation completed!';
PRINT '========================================';

