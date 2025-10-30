-- =================================================================
-- DMT EDUCATION SYSTEM DATABASE - SQL SERVER SCHEMA
-- =================================================================
--
-- File này tạo cấu trúc database cho SQL Server
-- Chuyển đổi từ PostgreSQL sang T-SQL
--
-- =================================================================
-- HƯỚNG DẪN CÀI ĐẶT:
-- 1. Tạo database: CREATE DATABASE dmt_education_system
-- 2. Chạy file này trong database đã tạo
-- =================================================================

USE dmt_education_system;
GO

-- =================================================================
-- BẢNG CORE - QUẢN LÝ NGƯỜI DÙNG
-- =================================================================

CREATE TABLE roles (
  id INT IDENTITY(1,1) PRIMARY KEY,
  code VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  description NVARCHAR(MAX),
  created_at DATETIME2 DEFAULT GETDATE()
);

CREATE TABLE users (
  id INT IDENTITY(1,1) PRIMARY KEY,
  role_id INT NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  full_name NVARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  address NVARCHAR(MAX),
  birth_date DATE,
  avatar_url VARCHAR(500),
  status BIT DEFAULT 1,
  last_login_at DATETIME2,
  created_at DATETIME2 DEFAULT GETDATE(),
  updated_at DATETIME2 DEFAULT GETDATE(),
  CONSTRAINT FK_users_roles FOREIGN KEY (role_id) REFERENCES roles(id)
);

CREATE TABLE students (
  id INT IDENTITY(1,1) PRIMARY KEY,
  user_id INT UNIQUE NOT NULL,
  student_code VARCHAR(50) UNIQUE,
  school_level VARCHAR(50), -- elementary, middle_school, high_school
  parent_name NVARCHAR(255),
  parent_phone VARCHAR(20),
  parent_email VARCHAR(255),
  created_at DATETIME2 DEFAULT GETDATE(),
  CONSTRAINT FK_students_users FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE teachers (
  id INT IDENTITY(1,1) PRIMARY KEY,
  user_id INT UNIQUE NOT NULL,
  teacher_code VARCHAR(50) UNIQUE,
  main_subject_id INT,
  years_experience INT DEFAULT 0,
  degree NVARCHAR(255),
  specialization NVARCHAR(255),
  created_at DATETIME2 DEFAULT GETDATE(),
  CONSTRAINT FK_teachers_users FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE staff (
  id INT IDENTITY(1,1) PRIMARY KEY,
  user_id INT UNIQUE NOT NULL,
  staff_code VARCHAR(50) UNIQUE,
  department NVARCHAR(120),
  position NVARCHAR(120),
  created_at DATETIME2 DEFAULT GETDATE(),
  CONSTRAINT FK_staff_users FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- =================================================================
-- BẢNG QUẢN LÝ HỌC VỤ
-- =================================================================

CREATE TABLE subjects (
  id INT IDENTITY(1,1) PRIMARY KEY,
  name NVARCHAR(120) NOT NULL,
  code VARCHAR(50) UNIQUE NOT NULL,
  description NVARCHAR(MAX),
  is_active BIT DEFAULT 1,
  created_at DATETIME2 DEFAULT GETDATE()
);

CREATE TABLE courses (
  id INT IDENTITY(1,1) PRIMARY KEY,
  subject_id INT NOT NULL,
  code VARCHAR(50) UNIQUE NOT NULL,
  name NVARCHAR(255) NOT NULL,
  description NVARCHAR(MAX),
  duration_weeks INT DEFAULT 12,
  total_sessions INT DEFAULT 24,
  price DECIMAL(12,2),
  level VARCHAR(20) DEFAULT 'beginner', -- beginner, intermediate, advanced
  is_active BIT DEFAULT 1,
  created_at DATETIME2 DEFAULT GETDATE(),
  CONSTRAINT FK_courses_subjects FOREIGN KEY (subject_id) REFERENCES subjects(id)
);

CREATE TABLE classes (
  id INT IDENTITY(1,1) PRIMARY KEY,
  course_id INT NOT NULL,
  code VARCHAR(50) UNIQUE NOT NULL,
  name NVARCHAR(255) NOT NULL,
  teacher_id INT NOT NULL,
  capacity INT DEFAULT 25,
  current_students INT DEFAULT 0,
  start_date DATE,
  end_date DATE,
  schedule_days VARCHAR(50), -- "Monday,Wednesday,Friday"
  schedule_time VARCHAR(20), -- "18:00-20:00"
  classroom NVARCHAR(100),
  status VARCHAR(20) DEFAULT 'planning', -- planning, active, completed, cancelled
  created_at DATETIME2 DEFAULT GETDATE(),
  CONSTRAINT FK_classes_courses FOREIGN KEY (course_id) REFERENCES courses(id),
  CONSTRAINT FK_classes_teachers FOREIGN KEY (teacher_id) REFERENCES teachers(id)
);

CREATE TABLE class_sessions (
  id INT IDENTITY(1,1) PRIMARY KEY,
  class_id INT NOT NULL,
  session_number INT NOT NULL,
  title NVARCHAR(255),
  session_date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  content NVARCHAR(MAX),
  homework NVARCHAR(MAX),
  status VARCHAR(20) DEFAULT 'scheduled', -- scheduled, completed, cancelled
  created_at DATETIME2 DEFAULT GETDATE(),
  CONSTRAINT FK_class_sessions_classes FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE CASCADE
);

-- =================================================================
-- BẢNG QUẢN LÝ ĐĂNG KÝ & ĐIỂM DANH
-- =================================================================

CREATE TABLE enrollments (
  id INT IDENTITY(1,1) PRIMARY KEY,
  class_id INT NOT NULL,
  student_id INT NOT NULL,
  enrollment_date DATE DEFAULT CAST(GETDATE() AS DATE),
  status VARCHAR(20) DEFAULT 'active', -- active, completed, dropped, suspended
  payment_status VARCHAR(20) DEFAULT 'pending', -- pending, paid, partial, overdue
  total_fee DECIMAL(12,2),
  paid_amount DECIMAL(12,2) DEFAULT 0,
  discount_percent DECIMAL(5,2) DEFAULT 0,
  notes NVARCHAR(MAX),
  created_at DATETIME2 DEFAULT GETDATE(),
  CONSTRAINT FK_enrollments_classes FOREIGN KEY (class_id) REFERENCES classes(id),
  CONSTRAINT FK_enrollments_students FOREIGN KEY (student_id) REFERENCES students(id)
);

CREATE TABLE attendance (
  id INT IDENTITY(1,1) PRIMARY KEY,
  session_id INT NOT NULL,
  enrollment_id INT NOT NULL,
  status VARCHAR(20) DEFAULT 'absent', -- present, absent, late, excused
  check_in_time DATETIME2,
  notes NVARCHAR(MAX),
  marked_by INT, -- teacher/staff who marked
  created_at DATETIME2 DEFAULT GETDATE(),
  CONSTRAINT FK_attendance_sessions FOREIGN KEY (session_id) REFERENCES class_sessions(id),
  CONSTRAINT FK_attendance_enrollments FOREIGN KEY (enrollment_id) REFERENCES enrollments(id),
  CONSTRAINT FK_attendance_marked_by FOREIGN KEY (marked_by) REFERENCES users(id)
);

-- =================================================================
-- BẢNG QUẢN LÝ BÀI TẬP & ĐIỂM SỐ
-- =================================================================

CREATE TABLE assignments (
  id INT IDENTITY(1,1) PRIMARY KEY,
  class_id INT NOT NULL,
  title NVARCHAR(255) NOT NULL,
  description NVARCHAR(MAX),
  due_date DATE,
  max_score DECIMAL(6,2) DEFAULT 100,
  assignment_type VARCHAR(30) DEFAULT 'homework', -- homework, quiz, exam, project
  created_by INT NOT NULL,
  created_at DATETIME2 DEFAULT GETDATE(),
  CONSTRAINT FK_assignments_classes FOREIGN KEY (class_id) REFERENCES classes(id),
  CONSTRAINT FK_assignments_created_by FOREIGN KEY (created_by) REFERENCES users(id)
);

CREATE TABLE submissions (
  id INT IDENTITY(1,1) PRIMARY KEY,
  assignment_id INT NOT NULL,
  student_id INT NOT NULL,
  submission_date DATETIME2 DEFAULT GETDATE(),
  content NVARCHAR(MAX),
  attachment_url VARCHAR(500),
  score DECIMAL(6,2),
  feedback NVARCHAR(MAX),
  graded_by INT,
  graded_at DATETIME2,
  status VARCHAR(20) DEFAULT 'submitted', -- submitted, graded, late, missing
  created_at DATETIME2 DEFAULT GETDATE(),
  CONSTRAINT FK_submissions_assignments FOREIGN KEY (assignment_id) REFERENCES assignments(id),
  CONSTRAINT FK_submissions_students FOREIGN KEY (student_id) REFERENCES students(id),
  CONSTRAINT FK_submissions_graded_by FOREIGN KEY (graded_by) REFERENCES users(id)
);

CREATE TABLE grades (
  id INT IDENTITY(1,1) PRIMARY KEY,
  enrollment_id INT NOT NULL,
  grade_type VARCHAR(30) DEFAULT 'midterm', -- midterm, final, assignment, overall
  score DECIMAL(6,2),
  max_score DECIMAL(6,2) DEFAULT 100,
  weight DECIMAL(5,2), -- phần trăm trọng số
  notes NVARCHAR(MAX),
  graded_by INT NOT NULL,
  graded_at DATETIME2 DEFAULT GETDATE(),
  created_at DATETIME2 DEFAULT GETDATE(),
  CONSTRAINT FK_grades_enrollments FOREIGN KEY (enrollment_id) REFERENCES enrollments(id),
  CONSTRAINT FK_grades_graded_by FOREIGN KEY (graded_by) REFERENCES users(id)
);

-- =================================================================
-- BẢNG QUẢN LÝ TÀI LIỆU HỌC TẬP
-- =================================================================

CREATE TABLE materials (
  id INT IDENTITY(1,1) PRIMARY KEY,
  class_id INT NOT NULL,
  title NVARCHAR(255) NOT NULL,
  description NVARCHAR(MAX),
  file_url VARCHAR(500),
  file_type VARCHAR(50),
  file_size BIGINT,
  uploaded_by INT NOT NULL,
  is_public BIT DEFAULT 0,
  created_at DATETIME2 DEFAULT GETDATE(),
  CONSTRAINT FK_materials_classes FOREIGN KEY (class_id) REFERENCES classes(id),
  CONSTRAINT FK_materials_uploaded_by FOREIGN KEY (uploaded_by) REFERENCES users(id)
);

-- =================================================================
-- BẢNG QUẢN LÝ THANH TOÁN
-- =================================================================

CREATE TABLE payments (
  id INT IDENTITY(1,1) PRIMARY KEY,
  enrollment_id INT NOT NULL,
  amount DECIMAL(12,2) NOT NULL,
  payment_date DATE DEFAULT CAST(GETDATE() AS DATE),
  payment_method VARCHAR(50), -- cash, bank_transfer, card, momo, vnpay
  transaction_id VARCHAR(255),
  status VARCHAR(20) DEFAULT 'completed', -- pending, completed, failed, refunded
  notes NVARCHAR(MAX),
  processed_by INT,
  created_at DATETIME2 DEFAULT GETDATE(),
  CONSTRAINT FK_payments_enrollments FOREIGN KEY (enrollment_id) REFERENCES enrollments(id),
  CONSTRAINT FK_payments_processed_by FOREIGN KEY (processed_by) REFERENCES users(id)
);

-- =================================================================
-- BẢNG KHẢO SÁT & ĐÁNH GIÁ
-- =================================================================

CREATE TABLE surveys (
  id INT IDENTITY(1,1) PRIMARY KEY,
  title NVARCHAR(255) NOT NULL,
  description NVARCHAR(MAX),
  target_type VARCHAR(30), -- student, teacher, parent, all
  class_id INT,
  course_id INT,
  start_date DATE,
  end_date DATE,
  is_active BIT DEFAULT 1,
  created_by INT NOT NULL,
  created_at DATETIME2 DEFAULT GETDATE(),
  CONSTRAINT FK_surveys_classes FOREIGN KEY (class_id) REFERENCES classes(id),
  CONSTRAINT FK_surveys_courses FOREIGN KEY (course_id) REFERENCES courses(id),
  CONSTRAINT FK_surveys_created_by FOREIGN KEY (created_by) REFERENCES users(id)
);

CREATE TABLE survey_questions (
  id INT IDENTITY(1,1) PRIMARY KEY,
  survey_id INT NOT NULL,
  question_text NVARCHAR(MAX) NOT NULL,
  question_type VARCHAR(30) DEFAULT 'multiple_choice', -- multiple_choice, text, rating, yes_no
  options NVARCHAR(MAX), -- JSON string for multiple choice options
  is_required BIT DEFAULT 0,
  question_order INT,
  created_at DATETIME2 DEFAULT GETDATE(),
  CONSTRAINT FK_survey_questions_surveys FOREIGN KEY (survey_id) REFERENCES surveys(id) ON DELETE CASCADE
);

CREATE TABLE survey_responses (
  id INT IDENTITY(1,1) PRIMARY KEY,
  survey_id INT NOT NULL,
  question_id INT NOT NULL,
  respondent_id INT NOT NULL,
  answer_text NVARCHAR(MAX),
  answer_rating INT,
  submitted_at DATETIME2 DEFAULT GETDATE(),
  CONSTRAINT FK_survey_responses_surveys FOREIGN KEY (survey_id) REFERENCES surveys(id),
  CONSTRAINT FK_survey_responses_questions FOREIGN KEY (question_id) REFERENCES survey_questions(id),
  CONSTRAINT FK_survey_responses_users FOREIGN KEY (respondent_id) REFERENCES users(id)
);

-- =================================================================
-- BẢNG THÔNG BÁO & HỆ THỐNG
-- =================================================================

CREATE TABLE news (
  id INT IDENTITY(1,1) PRIMARY KEY,
  title NVARCHAR(255) NOT NULL,
  excerpt NVARCHAR(500),
  content NVARCHAR(MAX),
  image_url VARCHAR(500),
  type VARCHAR(50) DEFAULT 'news', -- news, announcement, event
  status VARCHAR(20) DEFAULT 'draft', -- draft, published, archived
  is_featured BIT DEFAULT 0,
  author_id INT NOT NULL,
  published_at DATETIME2,
  created_at DATETIME2 DEFAULT GETDATE(),
  updated_at DATETIME2 DEFAULT GETDATE(),
  CONSTRAINT FK_news_author FOREIGN KEY (author_id) REFERENCES users(id)
);

CREATE TABLE notifications (
  id INT IDENTITY(1,1) PRIMARY KEY,
  user_id INT NOT NULL,
  title NVARCHAR(255) NOT NULL,
  message NVARCHAR(MAX),
  type VARCHAR(50) DEFAULT 'info', -- info, warning, success, error
  is_read BIT DEFAULT 0,
  link_url VARCHAR(500),
  created_at DATETIME2 DEFAULT GETDATE(),
  CONSTRAINT FK_notifications_users FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE activity_logs (
  id INT IDENTITY(1,1) PRIMARY KEY,
  user_id INT,
  action VARCHAR(100) NOT NULL,
  entity_type VARCHAR(50),
  entity_id INT,
  details NVARCHAR(MAX),
  ip_address VARCHAR(45),
  user_agent NVARCHAR(500),
  created_at DATETIME2 DEFAULT GETDATE(),
  CONSTRAINT FK_activity_logs_users FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE system_settings (
  id INT IDENTITY(1,1) PRIMARY KEY,
  setting_key VARCHAR(100) UNIQUE NOT NULL,
  setting_value NVARCHAR(MAX),
  description NVARCHAR(500),
  updated_at DATETIME2 DEFAULT GETDATE()
);

CREATE TABLE backup_history (
  id INT IDENTITY(1,1) PRIMARY KEY,
  backup_name VARCHAR(255) NOT NULL,
  backup_path VARCHAR(500),
  backup_size BIGINT,
  backup_type VARCHAR(20) DEFAULT 'full', -- full, incremental
  status VARCHAR(20) DEFAULT 'completed', -- in_progress, completed, failed
  started_at DATETIME2 DEFAULT GETDATE(),
  completed_at DATETIME2
);

-- =================================================================
-- INDEXES FOR PERFORMANCE
-- =================================================================

-- Users and Authentication
CREATE INDEX IX_users_email ON users(email);
CREATE INDEX IX_users_role_id ON users(role_id);
CREATE INDEX IX_users_status ON users(status);

-- Students, Teachers, Staff
CREATE INDEX IX_students_user_id ON students(user_id);
CREATE INDEX IX_students_student_code ON students(student_code);
CREATE INDEX IX_teachers_user_id ON teachers(user_id);
CREATE INDEX IX_teachers_teacher_code ON teachers(teacher_code);
CREATE INDEX IX_staff_user_id ON staff(user_id);

-- Academic
CREATE INDEX IX_courses_subject_id ON courses(subject_id);
CREATE INDEX IX_courses_is_active ON courses(is_active);
CREATE INDEX IX_classes_course_id ON classes(course_id);
CREATE INDEX IX_classes_teacher_id ON classes(teacher_id);
CREATE INDEX IX_classes_status ON classes(status);
CREATE INDEX IX_class_sessions_class_id ON class_sessions(class_id);

-- Enrollments and Attendance
CREATE INDEX IX_enrollments_class_id ON enrollments(class_id);
CREATE INDEX IX_enrollments_student_id ON enrollments(student_id);
CREATE INDEX IX_enrollments_status ON enrollments(status);
CREATE INDEX IX_attendance_session_id ON attendance(session_id);
CREATE INDEX IX_attendance_enrollment_id ON attendance(enrollment_id);

-- Assignments and Submissions
CREATE INDEX IX_assignments_class_id ON assignments(class_id);
CREATE INDEX IX_submissions_assignment_id ON submissions(assignment_id);
CREATE INDEX IX_submissions_student_id ON submissions(student_id);

-- Payments
CREATE INDEX IX_payments_enrollment_id ON payments(enrollment_id);
CREATE INDEX IX_payments_status ON payments(status);

-- News
CREATE INDEX IX_news_type ON news(type);
CREATE INDEX IX_news_status ON news(status);
CREATE INDEX IX_news_author_id ON news(author_id);
CREATE INDEX IX_news_is_featured ON news(is_featured);
CREATE INDEX IX_news_published_at ON news(published_at);

-- Notifications
CREATE INDEX IX_notifications_user_id ON notifications(user_id);
CREATE INDEX IX_notifications_is_read ON notifications(is_read);

GO

-- =================================================================
-- INSERT SAMPLE DATA - ROLES
-- =================================================================

SET IDENTITY_INSERT roles ON;

INSERT INTO roles (id, code, name, description) VALUES
(1, 'ADMIN', N'Quản trị viên', N'Quản trị hệ thống, có toàn quyền'),
(2, 'STAFF', N'Nhân viên', N'Nhân viên văn phòng, quản lý học vụ'),
(3, 'TEACHER', N'Giáo viên', N'Giảng dạy và quản lý lớp học'),
(4, 'STUDENT', N'Học sinh', N'Học viên tham gia khóa học');

SET IDENTITY_INSERT roles OFF;

GO
