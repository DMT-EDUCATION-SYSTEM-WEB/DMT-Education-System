-- =================================================================
-- DMT EDUCATION SYSTEM - CAMPUSES TABLE
-- =================================================================
-- Bảng quản lý các cơ sở của trung tâm
-- =================================================================

USE DMT_EDUCATION_SYSTEM;
GO

-- Xóa bảng cũ nếu tồn tại
IF OBJECT_ID('CAMPUSES', 'U') IS NOT NULL DROP TABLE CAMPUSES;
GO

-- Tạo bảng CAMPUSES
CREATE TABLE CAMPUSES (
  ID INT IDENTITY(1,1) PRIMARY KEY,
  CODE VARCHAR(50) UNIQUE NOT NULL,
  NAME NVARCHAR(100) NOT NULL,
  FULL_NAME NVARCHAR(255) NOT NULL,
  ADDRESS NVARCHAR(500) NOT NULL,
  PHONE VARCHAR(20),
  EMAIL VARCHAR(255),
  COLOR VARCHAR(20) DEFAULT '#dc2626',
  GRADIENT VARCHAR(100),
  IMAGE_URL VARCHAR(500),
  FACILITIES NVARCHAR(MAX), -- JSON array
  OPENING_HOURS NVARCHAR(100),
  MAP_URL VARCHAR(500),
  IS_ACTIVE BIT DEFAULT 1,
  SORT_ORDER INT DEFAULT 0,
  CREATED_AT DATETIME2 DEFAULT GETDATE(),
  UPDATED_AT DATETIME2 DEFAULT GETDATE()
);
GO

-- Thêm cột CAMPUS_ID vào bảng CLASSES nếu chưa có
IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID('CLASSES') AND name = 'CAMPUS_ID')
BEGIN
  ALTER TABLE CLASSES ADD CAMPUS_ID INT NULL;
END
GO

-- Insert dữ liệu 3 cơ sở
INSERT INTO CAMPUSES (CODE, NAME, FULL_NAME, ADDRESS, PHONE, EMAIL, COLOR, GRADIENT, FACILITIES, OPENING_HOURS, SORT_ORDER)
VALUES 
(
  'govap',
  N'Gò Vấp',
  N'Cơ sở Gò Vấp',
  N'Chung cư K26, Dương Quảng Hàm, Phường 7, Quận Gò Vấp, TP.HCM',
  '077 230 5566',
  'govap@dmtedu.vn',
  '#dc2626',
  'from-red-500 to-rose-600',
  N'["10 phòng học", "Lab máy tính", "Thư viện", "Khu vui chơi"]',
  N'T2-CN: 08:00-21:00',
  1
),
(
  'quan12',
  N'Quận 12',
  N'Cơ sở Quận 12',
  N'71/31 Song Hành, Phường Tân Hưng Thuận, Quận 12, TP.HCM',
  '077 230 5566',
  'quan12@dmtedu.vn',
  '#3b82f6',
  'from-blue-500 to-cyan-600',
  N'["12 phòng học", "2 Lab máy tính", "Cafeteria", "Parking"]',
  N'T2-CN: 08:00-21:00',
  2
),
(
  'quan3',
  N'Quận 3',
  N'Cơ sở Quận 3',
  N'384/26 Nam Kỳ Khởi Nghĩa, Phường 8, Quận 3, TP.HCM',
  '077 230 5566',
  'quan3@dmtedu.vn',
  '#7c3aed',
  'from-purple-500 to-violet-600',
  N'["15 phòng học", "Lab khoa học", "Sân chơi", "Khu tự học"]',
  N'T2-CN: 08:00-21:00',
  3
);
GO

-- Xem kết quả
SELECT * FROM CAMPUSES;
GO

PRINT N'=== ĐÃ TẠO BẢNG CAMPUSES VÀ INSERT 3 CƠ SỞ ===';
GO
