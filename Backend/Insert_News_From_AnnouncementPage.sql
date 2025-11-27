-- ===================================================================
-- Insert News/Announcements from AnnouncementPage.tsx Mock Data
-- ===================================================================
-- Script này thêm tin tức và thông báo từ mock data trong AnnouncementPage.tsx
-- ===================================================================

USE DMT_EDUCATION_SYSTEM;
GO

PRINT '==============================================';
PRINT 'Bắt đầu thêm tin tức từ AnnouncementPage.tsx';
PRINT '==============================================';

-- Lấy hoặc sử dụng Admin user làm author
DECLARE @AuthorId INT = (SELECT TOP 1 ID FROM USERS WHERE ROLE_ID = 1 AND EMAIL LIKE '%admin%');

IF @AuthorId IS NULL
BEGIN
    PRINT 'CẢNH BÁO: Không tìm thấy Admin user. Vui lòng tạo Admin user trước.';
    RETURN;
END

-- News 1: Khai giảng khóa IELTS (Featured)
IF NOT EXISTS (SELECT 1 FROM NEWS WHERE TITLE LIKE N'%Khai giảng khóa học IELTS%')
BEGIN
    INSERT INTO NEWS (
        title,
        excerpt,
        content,
        type,
        status,
        is_featured,
        image_url,
        published_at,
        author_id,
        created_at,
        updated_at
    )
    VALUES (
        N'Khai giảng khóa học IELTS Intensive - Tháng 1/2025',
        N'DMT Education chính thức khai giảng khóa học IELTS Intensive với đội ngũ giảng viên 8.0+ IELTS',
        N'<p>Chúng tôi vui mừng thông báo về việc khai giảng khóa học IELTS Intensive vào tháng 1/2025. Khóa học được thiết kế đặc biệt dành cho học viên muốn đạt điểm cao trong kỳ thi IELTS.</p>
<h3>Thông tin khóa học:</h3>
<ul>
<li>Thời lượng: 12 tuần</li>
<li>Lịch học: Thứ 2, 4, 6 (18:30-20:30)</li>
<li>Giảng viên: 8.0+ IELTS</li>
<li>Sĩ số: 15 học viên/lớp</li>
</ul>
<p>Đăng ký ngay để nhận ưu đãi học phí!</p>',
        'announcement',
        'published',
        1,
        'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=600&fit=crop',
        '2025-01-10',
        @AuthorId,
        '2025-01-10',
        '2025-01-10'
    );
    PRINT '✓ Đã thêm: Khai giảng khóa học IELTS Intensive';
END
ELSE
    PRINT '- Tin tức IELTS đã tồn tại';

-- News 2: Học viên đạt 8.5 IELTS
IF NOT EXISTS (SELECT 1 FROM NEWS WHERE TITLE LIKE N'%Học viên DMT đạt 8.5 IELTS%')
BEGIN
    INSERT INTO NEWS (
        title,
        excerpt,
        content,
        type,
        status,
        is_featured,
        image_url,
        published_at,
        author_id,
        created_at,
        updated_at
    )
    VALUES (
        N'Học viên DMT đạt 8.5 IELTS sau 3 tháng học',
        N'Chúc mừng em Nguyễn Minh Anh đã đạt 8.5 IELTS Overall chỉ sau 3 tháng học tại DMT Education',
        N'<p>DMT Education tự hào thông báo về thành tích xuất sắc của học viên Nguyễn Minh Anh - đạt 8.5 IELTS Overall chỉ sau 3 tháng theo học tại trung tâm.</p>
<h3>Chi tiết điểm số:</h3>
<ul>
<li>Listening: 8.5</li>
<li>Reading: 9.0</li>
<li>Writing: 7.5</li>
<li>Speaking: 8.5</li>
<li>Overall: 8.5</li>
</ul>
<p>Chúc mừng em Minh Anh và hy vọng các học viên khác cũng sẽ đạt được kết quả tốt như vậy!</p>',
        'news',
        'published',
        0,
        'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=600&fit=crop',
        '2025-01-08',
        @AuthorId,
        '2025-01-08',
        '2025-01-08'
    );
    PRINT '✓ Đã thêm: Học viên đạt 8.5 IELTS';
END
ELSE
    PRINT '- Tin tức học viên 8.5 đã tồn tại';

-- News 3: Workshop Kỹ năng học tập
IF NOT EXISTS (SELECT 1 FROM NEWS WHERE TITLE LIKE N'%Workshop: Kỹ năng học tập%')
BEGIN
    INSERT INTO NEWS (
        title,
        excerpt,
        content,
        type,
        status,
        is_featured,
        image_url,
        published_at,
        author_id,
        created_at,
        updated_at
    )
    VALUES (
        N'Workshop: Kỹ năng học tập hiệu quả',
        N'Tham gia workshop miễn phí về kỹ năng học tập và quản lý thời gian hiệu quả cùng chuyên gia',
        N'<p>DMT Education tổ chức workshop miễn phí về kỹ năng học tập và quản lý thời gian hiệu quả dành cho học sinh, sinh viên.</p>
<h3>Thông tin sự kiện:</h3>
<ul>
<li>Thời gian: 14:00 - 17:00, Chủ nhật, 28/01/2025</li>
<li>Địa điểm: DMT Education - Cơ sở Gò Vấp</li>
<li>Diễn giả: Th.S Nguyễn Văn A - Chuyên gia Giáo dục</li>
<li>Phí tham gia: MIỄN PHÍ</li>
</ul>
<p>Đăng ký ngay để nhận suất tham dự (giới hạn 50 người)!</p>',
        'event',
        'published',
        0,
        'https://images.unsplash.com/photo-1559223607-a43c990af5d1?w=800&h=600&fit=crop',
        '2025-01-05',
        @AuthorId,
        '2025-01-05',
        '2025-01-05'
    );
    PRINT '✓ Đã thêm: Workshop Kỹ năng học tập';
END
ELSE
    PRINT '- Tin tức Workshop đã tồn tại';

-- Additional News: Thông báo nghỉ Tết
IF NOT EXISTS (SELECT 1 FROM NEWS WHERE TITLE LIKE N'%Lịch nghỉ Tết%')
BEGIN
    INSERT INTO NEWS (
        title,
        excerpt,
        content,
        type,
        status,
        is_featured,
        image_url,
        published_at,
        author_id,
        created_at,
        updated_at
    )
    VALUES (
        N'Thông báo lịch nghỉ Tết Nguyên đán 2025',
        N'DMT Education thông báo lịch nghỉ Tết Nguyên đán Ất Tỵ 2025 từ ngày 26/01 đến 02/02/2025',
        N'<p>Kính gửi Quý phụ huynh và các em học viên!</p>
<p>DMT Education xin thông báo lịch nghỉ Tết Nguyên đán Ất Tỵ 2025 như sau:</p>
<h3>Thời gian nghỉ:</h3>
<ul>
<li>Từ Chủ nhật, 26/01/2025</li>
<li>Đến Chủ nhật, 02/02/2025</li>
</ul>
<p><strong>Ngày khai giảng trở lại:</strong> Thứ Hai, 03/02/2025</p>
<p>Chúc Quý phụ huynh và các em có một kỳ nghỉ Tết vui vẻ, an lành và hạnh phúc!</p>',
        'announcement',
        'published',
        1,
        'https://images.unsplash.com/photo-1467810563316-b5476525c0f9?w=800&h=600&fit=crop',
        '2025-01-15',
        @AuthorId,
        '2025-01-15',
        '2025-01-15'
    );
    PRINT '✓ Đã thêm: Thông báo nghỉ Tết';
END
ELSE
    PRINT '- Thông báo nghỉ Tết đã tồn tại';

-- Additional News: Tuyển sinh học kỳ mới
IF NOT EXISTS (SELECT 1 FROM NEWS WHERE TITLE LIKE N'%Tuyển sinh học kỳ mới%')
BEGIN
    INSERT INTO NEWS (
        title,
        excerpt,
        content,
        type,
        status,
        is_featured,
        image_url,
        published_at,
        author_id,
        created_at,
        updated_at
    )
    VALUES (
        N'Tuyển sinh học kỳ mới - Xuân 2025',
        N'DMT Education chính thức mở đăng ký học kỳ Xuân 2025 với nhiều ưu đãi hấp dẫn',
        N'<p>DMT Education chính thức mở đăng ký cho học kỳ Xuân 2025 với các khóa học đa dạng từ cơ bản đến nâng cao.</p>
<h3>Ưu đãi đặc biệt:</h3>
<ul>
<li>Giảm 15% học phí cho đăng ký trước 31/01/2025</li>
<li>Tặng bộ tài liệu học tập trị giá 500.000đ</li>
<li>Miễn phí test đầu vào</li>
<li>Ưu đãi giới thiệu bạn bè</li>
</ul>
<p>Liên hệ ngay để được tư vấn và đăng ký!</p>',
        'announcement',
        'published',
        0,
        'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&h=600&fit=crop',
        '2025-01-12',
        @AuthorId,
        '2025-01-12',
        '2025-01-12'
    );
    PRINT '✓ Đã thêm: Tuyển sinh học kỳ mới';
END
ELSE
    PRINT '- Tin tức tuyển sinh đã tồn tại';

GO

-- Kiểm tra kết quả
PRINT '';
PRINT '==============================================';
PRINT 'Danh sách tin tức vừa thêm:';
PRINT '==============================================';

SELECT 
    n.ID,
    n.TITLE,
    n.TYPE,
    n.STATUS,
    n.IS_FEATURED as FEATURED,
    n.PUBLISHED_AT,
    u.FULL_NAME as AUTHOR
FROM NEWS n
INNER JOIN USERS u ON n.AUTHOR_ID = u.ID
ORDER BY n.PUBLISHED_AT DESC;

PRINT '';
PRINT '==============================================';
PRINT 'Hoàn thành! Tổng số: 5 tin tức/thông báo';
PRINT '==============================================';
