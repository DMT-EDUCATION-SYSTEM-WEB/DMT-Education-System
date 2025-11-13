-- Update existing courses with unique thumbnails
UPDATE courses SET thumbnail_url = 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&h=450&fit=crop' WHERE name LIKE '%Toán%' AND name LIKE '%THCS%';
UPDATE courses SET thumbnail_url = 'https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=800&h=450&fit=crop' WHERE name LIKE '%Toán%' AND name LIKE '%THPT%';
UPDATE courses SET thumbnail_url = 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=450&fit=crop' WHERE name LIKE '%Văn%' AND name LIKE '%THCS%';
UPDATE courses SET thumbnail_url = 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&h=450&fit=crop' WHERE name LIKE '%Văn%' AND name LIKE '%THPT%';
UPDATE courses SET thumbnail_url = 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800&h=450&fit=crop' WHERE name LIKE '%Anh%' AND name LIKE '%THCS%';
UPDATE courses SET thumbnail_url = 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=450&fit=crop' WHERE name LIKE '%Anh%' AND (name LIKE '%THPT%' OR name LIKE '%IELTS%');
UPDATE courses SET thumbnail_url = 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=800&h=450&fit=crop' WHERE name LIKE '%Lý%' AND name LIKE '%THCS%';
UPDATE courses SET thumbnail_url = 'https://images.unsplash.com/photo-1628595351029-c2bf17511435?w=800&h=450&fit=crop' WHERE name LIKE '%Lý%' AND name LIKE '%THPT%';
UPDATE courses SET thumbnail_url = 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&h=450&fit=crop' WHERE name LIKE '%Hóa%' AND name LIKE '%THCS%';
UPDATE courses SET thumbnail_url = 'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?w=800&h=450&fit=crop' WHERE name LIKE '%Hóa%' AND name LIKE '%THPT%';
UPDATE courses SET thumbnail_url = 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=800&h=450&fit=crop' WHERE name LIKE '%Sinh%' AND name LIKE '%THCS%';
UPDATE courses SET thumbnail_url = 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=800&h=450&fit=crop' WHERE name LIKE '%Sinh%' AND name LIKE '%THPT%';
UPDATE courses SET thumbnail_url = 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=800&h=450&fit=crop' WHERE name LIKE '%Sử%';
UPDATE courses SET thumbnail_url = 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=800&h=450&fit=crop' WHERE name LIKE '%Địa%';
UPDATE courses SET thumbnail_url = 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=450&fit=crop' WHERE name LIKE '%GDCD%';
UPDATE courses SET thumbnail_url = 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&h=450&fit=crop' WHERE name LIKE '%iSMART%';
UPDATE courses SET thumbnail_url = 'https://images.unsplash.com/photo-1596496050827-8299e0220de1?w=800&h=450&fit=crop' WHERE name LIKE '%Học sinh giỏi%';

-- Insert more courses
INSERT INTO courses (name, code, description, subject_id, level, duration_weeks, total_sessions, price, is_active, thumbnail_url, students_count, created_at, updated_at)
VALUES 
-- Khóa học Toán
('Toán Lớp 6 - Khởi đầu vững chắc', 'MATH-L6', 'Chương trình Toán lớp 6 cơ bản: Số học, hình học, giải toán tư duy', 
 (SELECT id FROM subjects WHERE code = 'MATH' LIMIT 1), 'beginner', 36, 108, 2200000, 1, 
 'https://images.unsplash.com/photo-1509869175650-a1d97972541a?w=800&h=450&fit=crop', 156, GETDATE(), GETDATE()),

('Toán Lớp 7 - Phát triển tư duy', 'MATH-L7', 'Toán lớp 7: Đại số cơ bản, tam giác, tỉ lệ thức, thống kê', 
 (SELECT id FROM subjects WHERE code = 'MATH' LIMIT 1), 'beginner', 36, 108, 2300000, 1,
 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=800&h=450&fit=crop', 142, GETDATE(), GETDATE()),

('Toán Lớp 8 - Nền tảng quan trọng', 'MATH-L8', 'Toán lớp 8: Phương trình bậc nhất, hình học tam giác, định lý Thales', 
 (SELECT id FROM subjects WHERE code = 'MATH' LIMIT 1), 'intermediate', 36, 108, 2400000, 1,
 'https://images.unsplash.com/photo-1635372722656-389f87a941b7?w=800&h=450&fit=crop', 168, GETDATE(), GETDATE()),

('Toán Lớp 9 - Ôn thi vào 10', 'MATH-L9', 'Toán lớp 9: Hàm số, phương trình bậc 2, đường tròn, luyện đề vào 10', 
 (SELECT id FROM subjects WHERE code = 'MATH' LIMIT 1), 'intermediate', 36, 108, 2600000, 1,
 'https://images.unsplash.com/photo-1632571401005-458e9d244591?w=800&h=450&fit=crop', 245, GETDATE(), GETDATE()),

('Toán Lớp 10 - Cơ sở THPT', 'MATH-L10', 'Toán 10: Đại số và giải tích, hình học phẳng, vectơ', 
 (SELECT id FROM subjects WHERE code = 'MATH' LIMIT 1), 'intermediate', 40, 120, 2800000, 1,
 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=450&fit=crop', 198, GETDATE(), GETDATE()),

('Toán Lớp 11 - Nâng cao', 'MATH-L11', 'Toán 11: Lượng giác, dãy số, giới hạn, đạo hàm', 
 (SELECT id FROM subjects WHERE code = 'MATH' LIMIT 1), 'advanced', 40, 120, 3000000, 1,
 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&h=450&fit=crop', 176, GETDATE(), GETDATE()),

('Toán Lớp 12 - Luyện thi THPT QG', 'MATH-L12', 'Toán 12: Tích phân, hình học không gian, luyện đề thi THPT Quốc gia', 
 (SELECT id FROM subjects WHERE code = 'MATH' LIMIT 1), 'advanced', 40, 120, 3200000, 1,
 'https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=800&h=450&fit=crop', 312, GETDATE(), GETDATE()),

-- Khóa học Tiếng Anh
('Tiếng Anh Lớp 6 - Cơ bản', 'ENG-L6', 'Tiếng Anh lớp 6: Ngữ pháp cơ bản, từ vựng, giao tiếp hàng ngày', 
 (SELECT id FROM subjects WHERE code = 'ENG' LIMIT 1), 'beginner', 36, 108, 2400000, 1,
 'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=800&h=450&fit=crop', 189, GETDATE(), GETDATE()),

('Tiếng Anh Lớp 7 - Phát triển', 'ENG-L7', 'Tiếng Anh lớp 7: Thì hiện tại, quá khứ, reading comprehension', 
 (SELECT id FROM subjects WHERE code = 'ENG' LIMIT 1), 'beginner', 36, 108, 2500000, 1,
 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=450&fit=crop', 167, GETDATE(), GETDATE()),

('Tiếng Anh Lớp 8 - Nâng cao', 'ENG-L8', 'Tiếng Anh lớp 8: Câu bị động, câu điều kiện, writing skills', 
 (SELECT id FROM subjects WHERE code = 'ENG' LIMIT 1), 'intermediate', 36, 108, 2600000, 1,
 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&h=450&fit=crop', 145, GETDATE(), GETDATE()),

('Tiếng Anh Lớp 9 - Luyện thi vào 10', 'ENG-L9', 'Tiếng Anh lớp 9: Tổng hợp ngữ pháp, luyện đề thi vào 10 chuyên', 
 (SELECT id FROM subjects WHERE code = 'ENG' LIMIT 1), 'intermediate', 36, 108, 2800000, 1,
 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800&h=450&fit=crop', 234, GETDATE(), GETDATE()),

('IELTS Foundation 4.0-5.0', 'IELTS-F', 'IELTS Nền tảng: 4 kỹ năng cơ bản, chiến thuật làm bài', 
 (SELECT id FROM subjects WHERE code = 'ENG' LIMIT 1), 'beginner', 24, 72, 4500000, 1,
 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=450&fit=crop', 98, GETDATE(), GETDATE()),

('IELTS Intermediate 5.5-6.5', 'IELTS-I', 'IELTS Trung cấp: Nâng cao 4 kỹ năng, band điểm 6.0-6.5', 
 (SELECT id FROM subjects WHERE code = 'ENG' LIMIT 1), 'intermediate', 32, 96, 5500000, 1,
 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=450&fit=crop', 156, GETDATE(), GETDATE()),

('IELTS Advanced 7.0+', 'IELTS-A', 'IELTS Nâng cao: Luyện chuyên sâu, đạt band 7.0-8.0', 
 (SELECT id FROM subjects WHERE code = 'ENG' LIMIT 1), 'advanced', 36, 108, 6500000, 1,
 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=450&fit=crop', 87, GETDATE(), GETDATE()),

-- Khóa học Lý
('Vật Lý Lớp 6 - Khám phá khoa học', 'PHY-L6', 'Vật lý lớp 6: Các hiện tượng tự nhiên, đo lường cơ bản', 
 (SELECT id FROM subjects WHERE code = 'PHY' LIMIT 1), 'beginner', 36, 108, 2100000, 1,
 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=800&h=450&fit=crop', 134, GETDATE(), GETDATE()),

('Vật Lý Lớp 8 - Cơ học và nhiệt học', 'PHY-L8', 'Vật lý lớp 8: Áp suất, lực đẩy Archimedes, nhiệt năng', 
 (SELECT id FROM subjects WHERE code = 'PHY' LIMIT 1), 'intermediate', 36, 108, 2300000, 1,
 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&h=450&fit=crop', 123, GETDATE(), GETDATE()),

('Vật Lý Lớp 9 - Điện học', 'PHY-L9', 'Vật lý lớp 9: Điện trở, định luật Ohm, công suất điện', 
 (SELECT id FROM subjects WHERE code = 'PHY' LIMIT 1), 'intermediate', 36, 108, 2400000, 1,
 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&h=450&fit=crop', 156, GETDATE(), GETDATE()),

-- Khóa học Hóa
('Hóa Học Lớp 8 - Khám phá hóa học', 'CHEM-L8', 'Hóa học lớp 8: Nguyên tử, phân tử, phản ứng hóa học cơ bản', 
 (SELECT id FROM subjects WHERE code = 'CHEM' LIMIT 1), 'beginner', 36, 108, 2300000, 1,
 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&h=450&fit=crop', 112, GETDATE(), GETDATE()),

('Hóa Học Lớp 9 - Hóa vô cơ', 'CHEM-L9', 'Hóa học lớp 9: Phi kim, kim loại, axit-bazơ-muối', 
 (SELECT id FROM subjects WHERE code = 'CHEM' LIMIT 1), 'intermediate', 36, 108, 2400000, 1,
 'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?w=800&h=450&fit=crop', 145, GETDATE(), GETDATE()),

('Hóa Học Lớp 10 - Hóa đại cương', 'CHEM-L10', 'Hóa học lớp 10: Cấu tạo nguyên tử, bảng tuần hoàn', 
 (SELECT id FROM subjects WHERE code = 'CHEM' LIMIT 1), 'intermediate', 40, 120, 2600000, 1,
 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&h=450&fit=crop', 134, GETDATE(), GETDATE()),

-- Khóa học Sinh học
('Sinh Học Lớp 6 - Thế giới sinh vật', 'BIO-L6', 'Sinh học lớp 6: Đa dạng sinh vật, cơ thể người', 
 (SELECT id FROM subjects WHERE code = 'BIO' LIMIT 1), 'beginner', 36, 108, 2000000, 1,
 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=800&h=450&fit=crop', 98, GETDATE(), GETDATE()),

('Sinh Học Lớp 9 - Di truyền', 'BIO-L9', 'Sinh học lớp 9: Di truyền học, tiến hóa, hệ sinh thái', 
 (SELECT id FROM subjects WHERE code = 'BIO' LIMIT 1), 'intermediate', 36, 108, 2200000, 1,
 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=800&h=450&fit=crop', 123, GETDATE(), GETDATE()),

('Sinh Học Lớp 12 - Luyện thi THPT', 'BIO-L12', 'Sinh học lớp 12: Di truyền phân tử, công nghệ sinh học, luyện đề', 
 (SELECT id FROM subjects WHERE code = 'BIO' LIMIT 1), 'advanced', 40, 120, 2800000, 1,
 'https://images.unsplash.com/photo-1576319155264-99536e0be1ee?w=800&h=450&fit=crop', 187, GETDATE(), GETDATE());

GO
