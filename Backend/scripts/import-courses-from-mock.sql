-- Import Courses from Mock Data (ModernCoursesPage.tsx)
-- This script imports 18 courses from the frontend mock data

USE DMT_EDUCATION_SYSTEM;
GO

PRINT '==============================================';
PRINT 'Importing Courses from Mock Data';
PRINT '==============================================';
PRINT '';

-- Ensure all subjects exist
DECLARE @MathSubjectId INT = (SELECT TOP 1 ID FROM SUBJECTS WHERE CODE = 'MATH' OR NAME LIKE N'%Toán%');
DECLARE @LitSubjectId INT = (SELECT TOP 1 ID FROM SUBJECTS WHERE CODE = 'LIT' OR NAME LIKE N'%Văn%');
DECLARE @EngSubjectId INT = (SELECT TOP 1 ID FROM SUBJECTS WHERE CODE = 'ENG' OR NAME LIKE N'%Anh%');
DECLARE @iSmartSubjectId INT = (SELECT TOP 1 ID FROM SUBJECTS WHERE CODE = 'ISMART');
DECLARE @PhySubjectId INT = (SELECT TOP 1 ID FROM SUBJECTS WHERE CODE = 'PHY' OR NAME LIKE N'%Vật%' OR NAME LIKE N'%Lý%');
DECLARE @ChemSubjectId INT = (SELECT TOP 1 ID FROM SUBJECTS WHERE CODE = 'CHEM' OR NAME LIKE N'%Hóa%');
DECLARE @BioSubjectId INT = (SELECT TOP 1 ID FROM SUBJECTS WHERE CODE = 'BIO' OR NAME LIKE N'%Sinh%');
DECLARE @HistSubjectId INT = (SELECT TOP 1 ID FROM SUBJECTS WHERE CODE = 'HIST' OR NAME LIKE N'%Sử%');
DECLARE @GeoSubjectId INT = (SELECT TOP 1 ID FROM SUBJECTS WHERE CODE = 'GEO' OR NAME LIKE N'%Địa%');
DECLARE @CivicSubjectId INT = (SELECT TOP 1 ID FROM SUBJECTS WHERE CODE = 'CIVIC' OR NAME LIKE N'%GDCD%');
DECLARE @ExamSubjectId INT = (SELECT TOP 1 ID FROM SUBJECTS WHERE CODE = 'EXAM' OR NAME LIKE N'%Luyện thi%');

-- Create subjects if they don't exist
IF @MathSubjectId IS NULL
BEGIN
    INSERT INTO SUBJECTS (CODE, NAME, DESCRIPTION, IS_ACTIVE) 
    VALUES ('MATH', N'Toán học', N'Môn Toán học', 1);
    SET @MathSubjectId = SCOPE_IDENTITY();
    PRINT 'Created subject: Toán học';
END

IF @LitSubjectId IS NULL
BEGIN
    INSERT INTO SUBJECTS (CODE, NAME, DESCRIPTION, IS_ACTIVE) 
    VALUES ('LIT', N'Ngữ Văn', N'Môn Ngữ Văn', 1);
    SET @LitSubjectId = SCOPE_IDENTITY();
    PRINT 'Created subject: Ngữ Văn';
END

IF @EngSubjectId IS NULL
BEGIN
    INSERT INTO SUBJECTS (CODE, NAME, DESCRIPTION, IS_ACTIVE) 
    VALUES ('ENG', N'Tiếng Anh', N'Môn Tiếng Anh', 1);
    SET @EngSubjectId = SCOPE_IDENTITY();
    PRINT 'Created subject: Tiếng Anh';
END

IF @iSmartSubjectId IS NULL
BEGIN
    INSERT INTO SUBJECTS (CODE, NAME, DESCRIPTION, IS_ACTIVE) 
    VALUES ('ISMART', N'iSmart', N'Toán tư duy iSmart', 1);
    SET @iSmartSubjectId = SCOPE_IDENTITY();
    PRINT 'Created subject: iSmart';
END

IF @PhySubjectId IS NULL
BEGIN
    INSERT INTO SUBJECTS (CODE, NAME, DESCRIPTION, IS_ACTIVE) 
    VALUES ('PHY', N'Vật Lý', N'Môn Vật Lý', 1);
    SET @PhySubjectId = SCOPE_IDENTITY();
    PRINT 'Created subject: Vật Lý';
END

IF @ChemSubjectId IS NULL
BEGIN
    INSERT INTO SUBJECTS (CODE, NAME, DESCRIPTION, IS_ACTIVE) 
    VALUES ('CHEM', N'Hóa Học', N'Môn Hóa Học', 1);
    SET @ChemSubjectId = SCOPE_IDENTITY();
    PRINT 'Created subject: Hóa Học';
END

IF @BioSubjectId IS NULL
BEGIN
    INSERT INTO SUBJECTS (CODE, NAME, DESCRIPTION, IS_ACTIVE) 
    VALUES ('BIO', N'Sinh Học', N'Môn Sinh Học', 1);
    SET @BioSubjectId = SCOPE_IDENTITY();
    PRINT 'Created subject: Sinh Học';
END

IF @HistSubjectId IS NULL
BEGIN
    INSERT INTO SUBJECTS (CODE, NAME, DESCRIPTION, IS_ACTIVE) 
    VALUES ('HIST', N'Lịch Sử', N'Môn Lịch Sử', 1);
    SET @HistSubjectId = SCOPE_IDENTITY();
    PRINT 'Created subject: Lịch Sử';
END

IF @GeoSubjectId IS NULL
BEGIN
    INSERT INTO SUBJECTS (CODE, NAME, DESCRIPTION, IS_ACTIVE) 
    VALUES ('GEO', N'Địa Lý', N'Môn Địa Lý', 1);
    SET @GeoSubjectId = SCOPE_IDENTITY();
    PRINT 'Created subject: Địa Lý';
END

IF @CivicSubjectId IS NULL
BEGIN
    INSERT INTO SUBJECTS (CODE, NAME, DESCRIPTION, IS_ACTIVE) 
    VALUES ('CIVIC', N'GDCD', N'Giáo dục công dân', 1);
    SET @CivicSubjectId = SCOPE_IDENTITY();
    PRINT 'Created subject: GDCD';
END

IF @ExamSubjectId IS NULL
BEGIN
    INSERT INTO SUBJECTS (CODE, NAME, DESCRIPTION, IS_ACTIVE) 
    VALUES ('EXAM', N'Luyện thi', N'Luyện thi các môn', 1);
    SET @ExamSubjectId = SCOPE_IDENTITY();
    PRINT 'Created subject: Luyện thi';
END

PRINT '';
PRINT 'Subjects verified/created';
PRINT '';

-- Course 1: Toán THCS - Nền tảng vững chắc
IF NOT EXISTS (SELECT 1 FROM COURSES WHERE CODE = 'MATH-THCS')
BEGIN
    INSERT INTO COURSES (SUBJECT_ID, CODE, NAME, DESCRIPTION, DURATION_WEEKS, TOTAL_SESSIONS, PRICE, LEVEL, IS_ACTIVE)
    VALUES (
        @MathSubjectId,
        'MATH-THCS',
        N'Toán THCS - Nền tảng vững chắc',
        N'Chương trình Toán cấp 2 toàn diện: Đại số, Hình học, ôn thi chuyển cấp',
        36,
        108,
        2400000,
        'INTERMEDIATE',
        1
    );
    PRINT 'Created course: Toán THCS - Nền tảng vững chắc';
END

-- Course 2: Toán THPT - Luyện thi đại học
IF NOT EXISTS (SELECT 1 FROM COURSES WHERE CODE = 'MATH-THPT')
BEGIN
    INSERT INTO COURSES (SUBJECT_ID, CODE, NAME, DESCRIPTION, DURATION_WEEKS, TOTAL_SESSIONS, PRICE, LEVEL, IS_ACTIVE)
    VALUES (
        @MathSubjectId,
        'MATH-THPT',
        N'Toán THPT - Luyện thi đại học',
        N'Toán nâng cao cấp 3: Giải tích, Hình học không gian, luyện đề thi THPT',
        40,
        120,
        3200000,
        'ADVANCED',
        1
    );
    PRINT 'Created course: Toán THPT - Luyện thi đại học';
END

-- Course 3: Ngữ Văn THCS - Kỹ năng đọc hiểu
IF NOT EXISTS (SELECT 1 FROM COURSES WHERE CODE = 'LIT-THCS')
BEGIN
    INSERT INTO COURSES (SUBJECT_ID, CODE, NAME, DESCRIPTION, DURATION_WEEKS, TOTAL_SESSIONS, PRICE, LEVEL, IS_ACTIVE)
    VALUES (
        @LitSubjectId,
        'LIT-THCS',
        N'Ngữ Văn THCS - Kỹ năng đọc hiểu',
        N'Phát triển tư duy văn học, kỹ năng làm bài văn nghị luận và tả',
        36,
        108,
        2200000,
        'INTERMEDIATE',
        1
    );
    PRINT 'Created course: Ngữ Văn THCS - Kỹ năng đọc hiểu';
END

-- Course 4: Ngữ Văn THPT - Luyện thi chuyên sâu
IF NOT EXISTS (SELECT 1 FROM COURSES WHERE CODE = 'LIT-THPT')
BEGIN
    INSERT INTO COURSES (SUBJECT_ID, CODE, NAME, DESCRIPTION, DURATION_WEEKS, TOTAL_SESSIONS, PRICE, LEVEL, IS_ACTIVE)
    VALUES (
        @LitSubjectId,
        'LIT-THPT',
        N'Ngữ Văn THPT - Luyện thi chuyên sâu',
        N'Phân tích tác phẩm văn học, kỹ năng làm bài luận, nghị luận xã hội',
        40,
        120,
        2800000,
        'ADVANCED',
        1
    );
    PRINT 'Created course: Ngữ Văn THPT - Luyện thi chuyên sâu';
END

-- Course 5: Tiếng Anh THCS - Giao tiếp cơ bản
IF NOT EXISTS (SELECT 1 FROM COURSES WHERE CODE = 'ENG-THCS')
BEGIN
    INSERT INTO COURSES (SUBJECT_ID, CODE, NAME, DESCRIPTION, DURATION_WEEKS, TOTAL_SESSIONS, PRICE, LEVEL, IS_ACTIVE)
    VALUES (
        @EngSubjectId,
        'ENG-THCS',
        N'Tiếng Anh THCS - Giao tiếp cơ bản',
        N'Tiếng Anh giao tiếp, ngữ pháp, từ vựng theo chương trình cấp 2',
        36,
        108,
        2600000,
        'BEGINNER',
        1
    );
    PRINT 'Created course: Tiếng Anh THCS - Giao tiếp cơ bản';
END

-- Course 6: Tiếng Anh THPT - Luyện thi THPT & IELTS
IF NOT EXISTS (SELECT 1 FROM COURSES WHERE CODE = 'ENG-THPT')
BEGIN
    INSERT INTO COURSES (SUBJECT_ID, CODE, NAME, DESCRIPTION, DURATION_WEEKS, TOTAL_SESSIONS, PRICE, LEVEL, IS_ACTIVE)
    VALUES (
        @EngSubjectId,
        'ENG-THPT',
        N'Tiếng Anh THPT - Luyện thi THPT & IELTS',
        N'Tiếng Anh nâng cao: Reading, Writing, Listening, Speaking, luyện đề',
        40,
        120,
        3400000,
        'ADVANCED',
        1
    );
    PRINT 'Created course: Tiếng Anh THPT - Luyện thi THPT & IELTS';
END

-- Course 7: iSmart - Toán tư duy sáng tạo
IF NOT EXISTS (SELECT 1 FROM COURSES WHERE CODE = 'ISMART-101')
BEGIN
    INSERT INTO COURSES (SUBJECT_ID, CODE, NAME, DESCRIPTION, DURATION_WEEKS, TOTAL_SESSIONS, PRICE, LEVEL, IS_ACTIVE)
    VALUES (
        @iSmartSubjectId,
        'ISMART-101',
        N'iSmart - Toán tư duy sáng tạo',
        N'Phát triển tư duy logic, giải toán nâng cao qua phần mềm iSmart',
        24,
        72,
        1800000,
        'INTERMEDIATE',
        1
    );
    PRINT 'Created course: iSmart - Toán tư duy sáng tạo';
END

-- Course 8: Luyện thi học sinh giỏi Toán
IF NOT EXISTS (SELECT 1 FROM COURSES WHERE CODE = 'MATH-HSG')
BEGIN
    INSERT INTO COURSES (SUBJECT_ID, CODE, NAME, DESCRIPTION, DURATION_WEEKS, TOTAL_SESSIONS, PRICE, LEVEL, IS_ACTIVE)
    VALUES (
        @MathSubjectId,
        'MATH-HSG',
        N'Luyện thi học sinh giỏi Toán',
        N'Chuyên đề nâng cao, bồi dưỡng học sinh giỏi cấp tỉnh, quốc gia',
        32,
        96,
        4200000,
        'ADVANCED',
        1
    );
    PRINT 'Created course: Luyện thi học sinh giỏi Toán';
END

-- Course 9: Luyện thi vào lớp 10 chuyên
IF NOT EXISTS (SELECT 1 FROM COURSES WHERE CODE = 'EXAM-L10')
BEGIN
    INSERT INTO COURSES (SUBJECT_ID, CODE, NAME, DESCRIPTION, DURATION_WEEKS, TOTAL_SESSIONS, PRICE, LEVEL, IS_ACTIVE)
    VALUES (
        @ExamSubjectId,
        'EXAM-L10',
        N'Luyện thi vào lớp 10 chuyên',
        N'Ôn luyện chuyên sâu Toán, Văn, Anh để vào các trường chuyên',
        28,
        84,
        3800000,
        'ADVANCED',
        1
    );
    PRINT 'Created course: Luyện thi vào lớp 10 chuyên';
END

-- Course 10: Vật Lý THCS - Khám phá thế giới tự nhiên
IF NOT EXISTS (SELECT 1 FROM COURSES WHERE CODE = 'PHY-THCS')
BEGIN
    INSERT INTO COURSES (SUBJECT_ID, CODE, NAME, DESCRIPTION, DURATION_WEEKS, TOTAL_SESSIONS, PRICE, LEVEL, IS_ACTIVE)
    VALUES (
        @PhySubjectId,
        'PHY-THCS',
        N'Vật Lý THCS - Khám phá thế giới tự nhiên',
        N'Vật lý cơ bản: Cơ học, Nhiệt học, Điện học, thí nghiệm thực hành',
        36,
        108,
        2300000,
        'BEGINNER',
        1
    );
    PRINT 'Created course: Vật Lý THCS - Khám phá thế giới tự nhiên';
END

-- Course 11: Vật Lý THPT - Luyện thi đại học
IF NOT EXISTS (SELECT 1 FROM COURSES WHERE CODE = 'PHY-THPT')
BEGIN
    INSERT INTO COURSES (SUBJECT_ID, CODE, NAME, DESCRIPTION, DURATION_WEEKS, TOTAL_SESSIONS, PRICE, LEVEL, IS_ACTIVE)
    VALUES (
        @PhySubjectId,
        'PHY-THPT',
        N'Vật Lý THPT - Luyện thi đại học',
        N'Vật lý nâng cao: Điện từ học, Dao động sóng, Quang học, Hạt nhân',
        40,
        120,
        3100000,
        'ADVANCED',
        1
    );
    PRINT 'Created course: Vật Lý THPT - Luyện thi đại học';
END

-- Course 12: Hóa Học THCS - Nền tảng cơ bản
IF NOT EXISTS (SELECT 1 FROM COURSES WHERE CODE = 'CHEM-THCS')
BEGIN
    INSERT INTO COURSES (SUBJECT_ID, CODE, NAME, DESCRIPTION, DURATION_WEEKS, TOTAL_SESSIONS, PRICE, LEVEL, IS_ACTIVE)
    VALUES (
        @ChemSubjectId,
        'CHEM-THCS',
        N'Hóa Học THCS - Nền tảng cơ bản',
        N'Hóa học cấp 2: Nguyên tử, phân tử, phản ứng hóa học, thí nghiệm',
        36,
        108,
        2400000,
        'BEGINNER',
        1
    );
    PRINT 'Created course: Hóa Học THCS - Nền tảng cơ bản';
END

-- Course 13: Hóa Học THPT - Luyện thi chuyên sâu
IF NOT EXISTS (SELECT 1 FROM COURSES WHERE CODE = 'CHEM-THPT')
BEGIN
    INSERT INTO COURSES (SUBJECT_ID, CODE, NAME, DESCRIPTION, DURATION_WEEKS, TOTAL_SESSIONS, PRICE, LEVEL, IS_ACTIVE)
    VALUES (
        @ChemSubjectId,
        'CHEM-THPT',
        N'Hóa Học THPT - Luyện thi chuyên sâu',
        N'Hóa học hữu cơ, vô cơ, phân tích, giải bài tập nâng cao',
        40,
        120,
        3300000,
        'ADVANCED',
        1
    );
    PRINT 'Created course: Hóa Học THPT - Luyện thi chuyên sâu';
END

-- Course 14: Sinh Học THCS - Khám phá sự sống
IF NOT EXISTS (SELECT 1 FROM COURSES WHERE CODE = 'BIO-THCS')
BEGIN
    INSERT INTO COURSES (SUBJECT_ID, CODE, NAME, DESCRIPTION, DURATION_WEEKS, TOTAL_SESSIONS, PRICE, LEVEL, IS_ACTIVE)
    VALUES (
        @BioSubjectId,
        'BIO-THCS',
        N'Sinh Học THCS - Khám phá sự sống',
        N'Sinh học cơ bản: Tế bào, cơ thể người, thực vật, động vật',
        36,
        108,
        2100000,
        'BEGINNER',
        1
    );
    PRINT 'Created course: Sinh Học THCS - Khám phá sự sống';
END

-- Course 15: Sinh Học THPT - Di truyền & Tiến hóa
IF NOT EXISTS (SELECT 1 FROM COURSES WHERE CODE = 'BIO-THPT')
BEGIN
    INSERT INTO COURSES (SUBJECT_ID, CODE, NAME, DESCRIPTION, DURATION_WEEKS, TOTAL_SESSIONS, PRICE, LEVEL, IS_ACTIVE)
    VALUES (
        @BioSubjectId,
        'BIO-THPT',
        N'Sinh Học THPT - Di truyền & Tiến hóa',
        N'Sinh học phân tử, di truyền học, tiến hóa, sinh thái học',
        40,
        120,
        2900000,
        'ADVANCED',
        1
    );
    PRINT 'Created course: Sinh Học THPT - Di truyền & Tiến hóa';
END

-- Course 16: Lịch Sử Việt Nam - Truyền thống dân tộc
IF NOT EXISTS (SELECT 1 FROM COURSES WHERE CODE = 'HIST-VN')
BEGIN
    INSERT INTO COURSES (SUBJECT_ID, CODE, NAME, DESCRIPTION, DURATION_WEEKS, TOTAL_SESSIONS, PRICE, LEVEL, IS_ACTIVE)
    VALUES (
        @HistSubjectId,
        'HIST-VN',
        N'Lịch Sử Việt Nam - Truyền thống dân tộc',
        N'Lịch sử Việt Nam từ xa xưa đến hiện đại, các mốc lịch sử quan trọng',
        36,
        108,
        2000000,
        'INTERMEDIATE',
        1
    );
    PRINT 'Created course: Lịch Sử Việt Nam - Truyền thống dân tộc';
END

-- Course 17: Địa Lý Việt Nam & Thế Giới
IF NOT EXISTS (SELECT 1 FROM COURSES WHERE CODE = 'GEO-101')
BEGIN
    INSERT INTO COURSES (SUBJECT_ID, CODE, NAME, DESCRIPTION, DURATION_WEEKS, TOTAL_SESSIONS, PRICE, LEVEL, IS_ACTIVE)
    VALUES (
        @GeoSubjectId,
        'GEO-101',
        N'Địa Lý Việt Nam & Thế Giới',
        N'Địa lý tự nhiên, kinh tế, xã hội Việt Nam và các châu lục',
        36,
        108,
        2200000,
        'INTERMEDIATE',
        1
    );
    PRINT 'Created course: Địa Lý Việt Nam & Thế Giới';
END

-- Course 18: GDCD - Kỹ năng sống
IF NOT EXISTS (SELECT 1 FROM COURSES WHERE CODE = 'CIVIC-101')
BEGIN
    INSERT INTO COURSES (SUBJECT_ID, CODE, NAME, DESCRIPTION, DURATION_WEEKS, TOTAL_SESSIONS, PRICE, LEVEL, IS_ACTIVE)
    VALUES (
        @CivicSubjectId,
        'CIVIC-101',
        N'GDCD - Kỹ năng sống',
        N'Giáo dục công dân, kỹ năng sống, tư duy phản biện, đạo đức',
        24,
        72,
        1500000,
        'BEGINNER',
        1
    );
    PRINT 'Created course: GDCD - Kỹ năng sống';
END

GO

-- Verify imported courses
PRINT '';
PRINT '==============================================';
PRINT 'Verification - All Courses:';
PRINT '==============================================';

SELECT 
    c.ID as course_id,
    c.CODE as course_code,
    c.NAME as course_name,
    s.NAME as subject_name,
    c.DURATION_WEEKS,
    c.TOTAL_SESSIONS,
    c.PRICE,
    c.LEVEL,
    CASE WHEN c.IS_ACTIVE = 1 THEN 'Active' ELSE 'Inactive' END as status
FROM COURSES c
INNER JOIN SUBJECTS s ON c.SUBJECT_ID = s.ID
WHERE c.CODE IN (
    'MATH-THCS', 'MATH-THPT', 'LIT-THCS', 'LIT-THPT',
    'ENG-THCS', 'ENG-THPT', 'ISMART-101', 'MATH-HSG',
    'EXAM-L10', 'PHY-THCS', 'PHY-THPT', 'CHEM-THCS',
    'CHEM-THPT', 'BIO-THCS', 'BIO-THPT', 'HIST-VN',
    'GEO-101', 'CIVIC-101'
)
ORDER BY c.ID;

PRINT '';
PRINT '==============================================';
PRINT 'Courses imported successfully!';
PRINT 'Total courses: 18';
PRINT '==============================================';






