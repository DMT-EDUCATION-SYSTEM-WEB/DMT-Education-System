-- =============================================================================
-- DMT EDUCATION SYSTEM - EXTENDED DATABASE SCHEMA
-- File: Database-DMT-System-Extended-Final.sql
-- Description: Bổ sung các bảng còn thiếu cho hệ thống DMT Education
-- Database: SQL Server
-- Created: August 12, 2025
-- =============================================================================

-- Tạo database nếu chưa tồn tại
IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'DMT_Education_Extended')
BEGIN
    CREATE DATABASE [DMT_Education_Extended];
END;
GO

USE [DMT_Education_Extended];
GO

-- =============================================================================
-- 1. COMMUNICATION & NOTIFICATIONS SYSTEM
-- =============================================================================

-- Bảng thông báo cho người dùng
CREATE TABLE notifications (
    id INT IDENTITY(1,1) PRIMARY KEY,
    user_id INT NOT NULL,
    title NVARCHAR(255) NOT NULL,
    message NTEXT NOT NULL,
    type NVARCHAR(30) NOT NULL, -- info/warning/error/announcement/assignment/payment
    priority NVARCHAR(20) DEFAULT 'normal', -- low/normal/high/urgent
    is_read BIT DEFAULT 0,
    entity_type NVARCHAR(50), -- assignment/class/payment/course/meeting
    entity_id INT,
    action_url NVARCHAR(500), -- Deep link to relevant page
    expires_at DATETIME,
    created_at DATETIME DEFAULT GETDATE(),
    read_at DATETIME
);

-- Indexes cho performance
CREATE INDEX IX_notifications_user_read ON notifications(user_id, is_read);
CREATE INDEX IX_notifications_user_created ON notifications(user_id, created_at);
CREATE INDEX IX_notifications_type_created ON notifications(type, created_at);

-- Bảng thông báo chung cho hệ thống
CREATE TABLE announcements (
    id INT IDENTITY(1,1) PRIMARY KEY,
    created_by INT NOT NULL,
    title NVARCHAR(255) NOT NULL,
    content NTEXT NOT NULL,
    target_audience NVARCHAR(50) NOT NULL, -- all/students/teachers/staff/class_specific/course_specific
    class_id INT NULL,
    course_id INT NULL,
    is_active BIT DEFAULT 1,
    is_pinned BIT DEFAULT 0,
    view_count INT DEFAULT 0,
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME DEFAULT GETDATE(),
    expires_at DATETIME
);

-- Indexes
CREATE INDEX IX_announcements_target_active ON announcements(target_audience, is_active, created_at);
CREATE INDEX IX_announcements_class_active ON announcements(class_id, is_active);
CREATE INDEX IX_announcements_pinned_active ON announcements(is_pinned, is_active);

-- Bảng theo dõi ai đã đọc thông báo nào
CREATE TABLE announcement_reads (
    id INT IDENTITY(1,1) PRIMARY KEY,
    announcement_id INT NOT NULL,
    user_id INT NOT NULL,
    read_at DATETIME DEFAULT GETDATE(),
    
    CONSTRAINT UQ_announcement_reads_user UNIQUE (announcement_id, user_id)
);

CREATE INDEX IX_announcement_reads_user_date ON announcement_reads(user_id, read_at);

-- =============================================================================
-- 2. PAYMENT & FINANCIAL MANAGEMENT SYSTEM
-- =============================================================================

-- Bảng phương thức thanh toán
CREATE TABLE payment_methods (
    id INT IDENTITY(1,1) PRIMARY KEY,
    code NVARCHAR(50) NOT NULL UNIQUE, -- cash/bank_transfer/momo/zalopay/vnpay
    name NVARCHAR(100) NOT NULL,
    description NTEXT,
    is_active BIT DEFAULT 1,
    processing_fee_percent DECIMAL(5,4) DEFAULT 0, -- Transaction fee percentage
    config_json NTEXT, -- Payment gateway configuration
    sort_order INT DEFAULT 0
);

-- Bảng loại phí
CREATE TABLE fee_types (
    id INT IDENTITY(1,1) PRIMARY KEY,
    code NVARCHAR(50) NOT NULL UNIQUE, -- tuition/registration/material/exam
    name NVARCHAR(100) NOT NULL,
    description NTEXT,
    is_active BIT DEFAULT 1
);

-- Bảng hóa đơn
CREATE TABLE invoices (
    id INT IDENTITY(1,1) PRIMARY KEY,
    invoice_number NVARCHAR(50) NOT NULL UNIQUE,
    student_id INT NOT NULL,
    course_id INT NULL,
    class_id INT NULL,
    fee_type_id INT NOT NULL,
    description NTEXT,
    subtotal DECIMAL(12,2) NOT NULL,
    discount_amount DECIMAL(12,2) DEFAULT 0,
    tax_amount DECIMAL(12,2) DEFAULT 0,
    total_amount DECIMAL(12,2) NOT NULL,
    status NVARCHAR(20) NOT NULL DEFAULT 'pending', -- pending/paid/overdue/cancelled/refunded
    issue_date DATETIME DEFAULT GETDATE(),
    due_date DATETIME NOT NULL,
    paid_date DATETIME,
    notes NTEXT,
    created_by INT NOT NULL,
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME DEFAULT GETDATE()
);

-- Indexes cho invoices
CREATE INDEX IX_invoices_student_status ON invoices(student_id, status);
CREATE INDEX IX_invoices_status_due ON invoices(status, due_date);
CREATE INDEX IX_invoices_created ON invoices(created_at);

-- Bảng thanh toán
CREATE TABLE payments (
    id INT IDENTITY(1,1) PRIMARY KEY,
    payment_number NVARCHAR(50) NOT NULL UNIQUE,
    invoice_id INT NOT NULL,
    payment_method_id INT NOT NULL,
    amount DECIMAL(12,2) NOT NULL,
    processing_fee DECIMAL(12,2) DEFAULT 0,
    net_amount DECIMAL(12,2) NOT NULL, -- amount - processing_fee
    transaction_id NVARCHAR(100), -- External payment gateway transaction ID
    reference_number NVARCHAR(100), -- Bank reference or receipt number
    status NVARCHAR(20) NOT NULL DEFAULT 'pending', -- pending/completed/failed/refunded/cancelled
    payment_date DATETIME,
    notes NTEXT,
    receipt_url NVARCHAR(500), -- URL to receipt file
    processed_by INT NULL, -- Staff who processed the payment
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME DEFAULT GETDATE()
);

-- Indexes cho payments
CREATE INDEX IX_payments_invoice ON payments(invoice_id);
CREATE INDEX IX_payments_method ON payments(payment_method_id);
CREATE INDEX IX_payments_status_date ON payments(status, payment_date);
CREATE INDEX IX_payments_transaction ON payments(transaction_id);

-- Bảng kế hoạch trả góp
CREATE TABLE payment_plans (
    id INT IDENTITY(1,1) PRIMARY KEY,
    student_id INT NOT NULL,
    course_id INT NOT NULL,
    total_amount DECIMAL(12,2) NOT NULL,
    installment_count INT NOT NULL,
    installment_amount DECIMAL(12,2) NOT NULL,
    start_date DATETIME NOT NULL,
    status NVARCHAR(20) NOT NULL DEFAULT 'active', -- active/completed/cancelled/defaulted
    created_by INT NOT NULL,
    created_at DATETIME DEFAULT GETDATE()
);

-- Bảng các kỳ trả góp
CREATE TABLE payment_plan_installments (
    id INT IDENTITY(1,1) PRIMARY KEY,
    payment_plan_id INT NOT NULL,
    installment_number INT NOT NULL,
    amount DECIMAL(12,2) NOT NULL,
    due_date DATETIME NOT NULL,
    invoice_id INT NULL,
    status NVARCHAR(20) NOT NULL DEFAULT 'pending', -- pending/paid/overdue
    
    CONSTRAINT UQ_payment_plan_installments UNIQUE (payment_plan_id, installment_number)
);

CREATE INDEX IX_installments_due_status ON payment_plan_installments(due_date, status);

-- =============================================================================
-- 3. SCHEDULE & CALENDAR SYSTEM
-- =============================================================================

-- Bảng phòng học
CREATE TABLE rooms (
    id INT IDENTITY(1,1) PRIMARY KEY,
    code NVARCHAR(50) NOT NULL UNIQUE,
    name NVARCHAR(100) NOT NULL,
    capacity INT NOT NULL,
    equipment_json NTEXT, -- Available equipment (projector, whiteboard, etc.)
    location NVARCHAR(255),
    is_active BIT DEFAULT 1,
    notes NTEXT
);

-- Bảng khung giờ học
CREATE TABLE time_slots (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name NVARCHAR(100) NOT NULL, -- "Slot 1 (8:00-9:30)", "Slot 2 (10:00-11:30)"
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    is_active BIT DEFAULT 1,
    sort_order INT DEFAULT 0
);

-- Bảng lịch học
CREATE TABLE schedules (
    id INT IDENTITY(1,1) PRIMARY KEY,
    class_id INT NOT NULL,
    room_id INT NULL,
    time_slot_id INT NOT NULL,
    day_of_week INT NOT NULL, -- 1-7 (Monday-Sunday)
    effective_from DATE NOT NULL,
    effective_to DATE NULL, -- NULL means ongoing
    is_active BIT DEFAULT 1,
    notes NTEXT,
    created_at DATETIME DEFAULT GETDATE()
);

-- Indexes cho schedules
CREATE INDEX IX_schedules_class_day ON schedules(class_id, day_of_week, is_active);
CREATE INDEX IX_schedules_room_time ON schedules(room_id, day_of_week, time_slot_id);
CREATE INDEX IX_schedules_effective ON schedules(effective_from, effective_to);

-- Bảng ngày nghỉ lễ
CREATE TABLE holidays (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name NVARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    type NVARCHAR(50) NOT NULL, -- national/school/custom
    description NTEXT,
    affects_classes BIT DEFAULT 1,
    is_active BIT DEFAULT 1,
    created_by INT NOT NULL,
    created_at DATETIME DEFAULT GETDATE()
);

CREATE INDEX IX_holidays_date_active ON holidays(date, is_active);
CREATE INDEX IX_holidays_type_active ON holidays(type, is_active);

-- Bảng lớp học bù
CREATE TABLE makeup_classes (
    id INT IDENTITY(1,1) PRIMARY KEY,
    original_meeting_id INT NOT NULL,
    makeup_meeting_id INT NOT NULL,
    reason NVARCHAR(50) NOT NULL, -- holiday/teacher_sick/student_request/weather
    description NTEXT,
    approved_by INT NULL,
    status NVARCHAR(20) NOT NULL DEFAULT 'scheduled', -- scheduled/completed/cancelled
    created_by INT NOT NULL,
    created_at DATETIME DEFAULT GETDATE()
);

CREATE INDEX IX_makeup_original ON makeup_classes(original_meeting_id);
CREATE INDEX IX_makeup_status ON makeup_classes(status);

-- =============================================================================
-- 4. SUPPORT & TICKETING SYSTEM
-- =============================================================================

-- Bảng danh mục hỗ trợ
CREATE TABLE support_categories (
    id INT IDENTITY(1,1) PRIMARY KEY,
    code NVARCHAR(50) NOT NULL UNIQUE,
    name NVARCHAR(100) NOT NULL,
    description NTEXT,
    default_priority NVARCHAR(20) DEFAULT 'medium', -- low/medium/high/urgent
    auto_assign_to INT NULL, -- Default assignee
    is_active BIT DEFAULT 1,
    sort_order INT DEFAULT 0
);

-- Bảng ticket hỗ trợ
CREATE TABLE support_tickets (
    id INT IDENTITY(1,1) PRIMARY KEY,
    ticket_number NVARCHAR(50) NOT NULL UNIQUE,
    user_id INT NOT NULL, -- Requester
    category_id INT NOT NULL,
    title NVARCHAR(255) NOT NULL,
    description NTEXT NOT NULL,
    priority NVARCHAR(20) NOT NULL, -- low/medium/high/urgent
    status NVARCHAR(20) NOT NULL DEFAULT 'open', -- open/in_progress/waiting_customer/resolved/closed
    assigned_to INT NULL, -- Staff assigned
    resolution_notes NTEXT,
    satisfaction_rating INT, -- 1-5 rating from user
    satisfaction_feedback NTEXT,
    first_response_at DATETIME,
    resolved_at DATETIME,
    closed_at DATETIME,
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME DEFAULT GETDATE()
);

-- Indexes cho support_tickets
CREATE INDEX IX_tickets_user_status ON support_tickets(user_id, status);
CREATE INDEX IX_tickets_assigned_status ON support_tickets(assigned_to, status);
CREATE INDEX IX_tickets_category_status ON support_tickets(category_id, status);
CREATE INDEX IX_tickets_priority_status ON support_tickets(priority, status);
CREATE INDEX IX_tickets_created ON support_tickets(created_at);

-- Bảng phản hồi ticket
CREATE TABLE support_replies (
    id INT IDENTITY(1,1) PRIMARY KEY,
    ticket_id INT NOT NULL,
    user_id INT NOT NULL,
    message NTEXT NOT NULL,
    is_internal BIT DEFAULT 0, -- Internal notes vs customer-visible replies
    attachments_json NTEXT, -- File attachments
    created_at DATETIME DEFAULT GETDATE()
);

CREATE INDEX IX_replies_ticket_created ON support_replies(ticket_id, created_at);
CREATE INDEX IX_replies_user_created ON support_replies(user_id, created_at);

-- Bảng file đính kèm support
CREATE TABLE support_attachments (
    id INT IDENTITY(1,1) PRIMARY KEY,
    ticket_id INT NOT NULL,
    reply_id INT NULL,
    filename NVARCHAR(255) NOT NULL,
    original_filename NVARCHAR(255) NOT NULL,
    file_size INT NOT NULL,
    mime_type NVARCHAR(100),
    file_url NVARCHAR(500) NOT NULL,
    uploaded_by INT NOT NULL,
    created_at DATETIME DEFAULT GETDATE()
);

CREATE INDEX IX_attachments_ticket ON support_attachments(ticket_id);
CREATE INDEX IX_attachments_reply ON support_attachments(reply_id);

-- =============================================================================
-- 5. SURVEY & FEEDBACK SYSTEM
-- =============================================================================

-- Bảng khảo sát
CREATE TABLE surveys (
    id INT IDENTITY(1,1) PRIMARY KEY,
    title NVARCHAR(255) NOT NULL,
    description NTEXT,
    instructions NTEXT,
    target_audience NVARCHAR(50) NOT NULL, -- students/teachers/parents/staff/all
    target_class_id INT NULL, -- For class-specific surveys
    target_course_id INT NULL, -- For course-specific surveys
    survey_type NVARCHAR(50) NOT NULL, -- course_evaluation/satisfaction/feedback/assessment
    is_anonymous BIT DEFAULT 0,
    is_active BIT DEFAULT 1,
    is_required BIT DEFAULT 0,
    max_responses_per_user INT DEFAULT 1,
    start_date DATETIME NOT NULL,
    end_date DATETIME,
    created_by INT NOT NULL,
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME DEFAULT GETDATE()
);

-- Indexes cho surveys
CREATE INDEX IX_surveys_target_active ON surveys(target_audience, is_active);
CREATE INDEX IX_surveys_class_active ON surveys(target_class_id, is_active);
CREATE INDEX IX_surveys_type_active ON surveys(survey_type, is_active);
CREATE INDEX IX_surveys_dates ON surveys(start_date, end_date);

-- Bảng câu hỏi khảo sát
CREATE TABLE survey_questions (
    id INT IDENTITY(1,1) PRIMARY KEY,
    survey_id INT NOT NULL,
    question_text NTEXT NOT NULL,
    question_type NVARCHAR(20) NOT NULL, -- multiple_choice/single_choice/text/textarea/rating/yes_no/scale
    options_json NTEXT, -- For choice questions: ["Option 1", "Option 2", ...]
    validation_rules_json NTEXT, -- Min/max length, required, etc.
    is_required BIT DEFAULT 0,
    sort_order INT NOT NULL,
    section NVARCHAR(100) -- Group questions into sections
);

CREATE INDEX IX_questions_survey_order ON survey_questions(survey_id, sort_order);
CREATE INDEX IX_questions_survey_section ON survey_questions(survey_id, section);

-- Bảng phản hồi khảo sát
CREATE TABLE survey_responses (
    id INT IDENTITY(1,1) PRIMARY KEY,
    survey_id INT NOT NULL,
    user_id INT NULL, -- NULL for anonymous surveys
    response_token NVARCHAR(100), -- For anonymous tracking
    status NVARCHAR(20) NOT NULL DEFAULT 'in_progress', -- in_progress/completed/abandoned
    started_at DATETIME DEFAULT GETDATE(),
    completed_at DATETIME,
    ip_address NVARCHAR(45),
    user_agent NTEXT,
    
    CONSTRAINT UQ_survey_responses_user UNIQUE (survey_id, user_id)
);

CREATE INDEX IX_responses_survey_status ON survey_responses(survey_id, status);
CREATE INDEX IX_responses_token ON survey_responses(response_token);

-- Bảng câu trả lời
CREATE TABLE survey_answers (
    id INT IDENTITY(1,1) PRIMARY KEY,
    response_id INT NOT NULL,
    question_id INT NOT NULL,
    answer_text NTEXT,
    answer_number DECIMAL(10,2), -- For numeric/rating answers
    answer_json NTEXT, -- For complex answers (multiple selections, etc.)
    created_at DATETIME DEFAULT GETDATE(),
    
    CONSTRAINT UQ_survey_answers UNIQUE (response_id, question_id)
);

CREATE INDEX IX_answers_question ON survey_answers(question_id);

-- =============================================================================
-- 6. EXTENDED STUDENT PROFILES
-- =============================================================================

-- Bảng thông tin chi tiết học sinh
CREATE TABLE student_profiles (
    id INT IDENTITY(1,1) PRIMARY KEY,
    student_id INT NOT NULL UNIQUE,
    date_of_birth DATE,
    gender NVARCHAR(10), -- male/female/other
    nationality NVARCHAR(50),
    id_number NVARCHAR(50), -- Citizen ID or passport
    address NTEXT,
    district NVARCHAR(100),
    city NVARCHAR(100),
    postal_code NVARCHAR(20),
    
    -- Parent/Guardian Information
    parent_name NVARCHAR(255),
    parent_relationship NVARCHAR(50), -- father/mother/guardian
    parent_phone NVARCHAR(20),
    parent_email NVARCHAR(255),
    parent_occupation NVARCHAR(100),
    
    -- Emergency Contact
    emergency_contact_name NVARCHAR(255),
    emergency_contact_relationship NVARCHAR(50),
    emergency_contact_phone NVARCHAR(20),
    emergency_contact_address NTEXT,
    
    -- Medical & Special Needs
    medical_conditions NTEXT,
    allergies NTEXT,
    medications NTEXT,
    special_needs NTEXT,
    dietary_restrictions NTEXT,
    
    -- Academic Information
    previous_school NVARCHAR(255),
    enrollment_date DATE,
    expected_graduation_date DATE,
    academic_goals NTEXT,
    interests NTEXT,
    
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME DEFAULT GETDATE()
);

-- Bảng thông tin chi tiết giáo viên
CREATE TABLE teacher_profiles (
    id INT IDENTITY(1,1) PRIMARY KEY,
    teacher_id INT NOT NULL UNIQUE,
    employee_id NVARCHAR(50) UNIQUE,
    date_of_birth DATE,
    gender NVARCHAR(10),
    nationality NVARCHAR(50),
    id_number NVARCHAR(50),
    address NTEXT,
    phone NVARCHAR(20),
    emergency_contact_name NVARCHAR(255),
    emergency_contact_phone NVARCHAR(20),
    
    -- Professional Information
    hire_date DATE,
    employment_type NVARCHAR(50), -- full_time/part_time/contract
    salary_grade NVARCHAR(20),
    department NVARCHAR(100),
    office_location NVARCHAR(100),
    
    -- Qualifications
    education_background NTEXT,
    certifications_json NTEXT,
    languages_spoken NVARCHAR(255),
    specializations NVARCHAR(255),
    
    -- Performance
    performance_rating DECIMAL(3,2),
    last_review_date DATE,
    next_review_date DATE,
    
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME DEFAULT GETDATE()
);

-- =============================================================================
-- 7. ANALYTICS & REPORTING SYSTEM
-- =============================================================================

-- Bảng phân tích hiệu suất học sinh
CREATE TABLE student_performance_analytics (
    id INT IDENTITY(1,1) PRIMARY KEY,
    student_id INT NOT NULL,
    class_id INT NOT NULL,
    course_id INT NOT NULL,
    
    -- Academic Performance
    current_grade DECIMAL(5,2),
    avg_assignment_score DECIMAL(5,2),
    avg_quiz_score DECIMAL(5,2),
    avg_exam_score DECIMAL(5,2),
    assignments_completed INT DEFAULT 0,
    assignments_total INT DEFAULT 0,
    completion_rate DECIMAL(5,2) DEFAULT 0,
    
    -- Attendance
    classes_attended INT DEFAULT 0,
    classes_total INT DEFAULT 0,
    attendance_rate DECIMAL(5,2) DEFAULT 0,
    late_count INT DEFAULT 0,
    absent_count INT DEFAULT 0,
    
    -- Engagement
    video_watch_time_minutes INT DEFAULT 0,
    materials_downloaded INT DEFAULT 0,
    forum_posts INT DEFAULT 0,
    
    calculation_date DATETIME NOT NULL,
    last_updated DATETIME DEFAULT GETDATE(),
    
    CONSTRAINT UQ_student_analytics UNIQUE (student_id, class_id)
);

-- Indexes cho analytics
CREATE INDEX IX_analytics_class_grade ON student_performance_analytics(class_id, current_grade);
CREATE INDEX IX_analytics_course_completion ON student_performance_analytics(course_id, completion_rate);
CREATE INDEX IX_analytics_calculation ON student_performance_analytics(calculation_date);

-- Bảng phân tích lớp học
CREATE TABLE class_analytics (
    id INT IDENTITY(1,1) PRIMARY KEY,
    class_id INT NOT NULL,
    calculation_date DATETIME NOT NULL,
    
    -- Enrollment
    total_enrolled INT DEFAULT 0,
    active_students INT DEFAULT 0,
    dropped_students INT DEFAULT 0,
    
    -- Performance
    avg_class_grade DECIMAL(5,2) DEFAULT 0,
    pass_rate DECIMAL(5,2) DEFAULT 0,
    top_performer_id INT NULL,
    
    -- Attendance
    avg_attendance_rate DECIMAL(5,2) DEFAULT 0,
    total_meetings_held INT DEFAULT 0,
    
    -- Engagement
    avg_video_watch_time DECIMAL(8,2) DEFAULT 0,
    total_materials_shared INT DEFAULT 0,
    total_assignments_given INT DEFAULT 0,
    
    last_updated DATETIME DEFAULT GETDATE(),
    
    CONSTRAINT UQ_class_analytics UNIQUE (class_id, calculation_date)
);

-- Bảng phân tích giáo viên
CREATE TABLE teacher_analytics (
    id INT IDENTITY(1,1) PRIMARY KEY,
    teacher_id INT NOT NULL,
    calculation_date DATETIME NOT NULL,
    
    -- Teaching Load
    total_classes INT DEFAULT 0,
    total_students INT DEFAULT 0,
    avg_class_size DECIMAL(5,2) DEFAULT 0,
    
    -- Performance
    avg_student_satisfaction DECIMAL(3,2) DEFAULT 0,
    avg_class_performance DECIMAL(5,2) DEFAULT 0,
    on_time_rate DECIMAL(5,2) DEFAULT 100,
    
    -- Content Creation
    materials_created INT DEFAULT 0,
    videos_uploaded INT DEFAULT 0,
    assignments_created INT DEFAULT 0,
    
    last_updated DATETIME DEFAULT GETDATE(),
    
    CONSTRAINT UQ_teacher_analytics UNIQUE (teacher_id, calculation_date)
);

-- =============================================================================
-- 8. SYSTEM CONFIGURATION & SETTINGS
-- =============================================================================

-- Bảng cấu hình hệ thống
CREATE TABLE system_configurations (
    id INT IDENTITY(1,1) PRIMARY KEY,
    category NVARCHAR(100) NOT NULL, -- payment/notification/academic/security
    config_key NVARCHAR(200) NOT NULL,
    config_value NTEXT,
    data_type NVARCHAR(20) NOT NULL, -- string/number/boolean/json
    description NTEXT,
    is_system BIT DEFAULT 0, -- System configs that users can't modify
    is_encrypted BIT DEFAULT 0,
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME DEFAULT GETDATE(),
    updated_by INT NULL,
    
    CONSTRAINT UQ_system_config UNIQUE (category, config_key)
);

CREATE INDEX IX_config_category ON system_configurations(category);

-- Bảng audit logs mở rộng
CREATE TABLE audit_logs_extended (
    id INT IDENTITY(1,1) PRIMARY KEY,
    user_id INT NULL,
    action NVARCHAR(100) NOT NULL, -- create/update/delete/login/logout/view/export
    entity_type NVARCHAR(100) NOT NULL, -- user/student/course/payment/etc
    entity_id INT,
    old_values_json NTEXT, -- Before change
    new_values_json NTEXT, -- After change
    ip_address NVARCHAR(45),
    user_agent NTEXT,
    session_id NVARCHAR(100),
    additional_data_json NTEXT,
    created_at DATETIME DEFAULT GETDATE()
);

-- Indexes cho audit logs
CREATE INDEX IX_audit_user_date ON audit_logs_extended(user_id, created_at);
CREATE INDEX IX_audit_entity ON audit_logs_extended(entity_type, entity_id);
CREATE INDEX IX_audit_action_date ON audit_logs_extended(action, created_at);
CREATE INDEX IX_audit_created ON audit_logs_extended(created_at); -- For cleanup old logs

-- =============================================================================
-- 9. FILE & DOCUMENT MANAGEMENT
-- =============================================================================

-- Bảng danh mục tài liệu
CREATE TABLE document_categories (
    id INT IDENTITY(1,1) PRIMARY KEY,
    code NVARCHAR(50) NOT NULL UNIQUE,
    name NVARCHAR(100) NOT NULL,
    description NTEXT,
    parent_category_id INT NULL,
    sort_order INT DEFAULT 0,
    is_active BIT DEFAULT 1,
    
    CONSTRAINT FK_document_categories_parent FOREIGN KEY (parent_category_id) REFERENCES document_categories(id)
);

-- Bảng tài liệu
CREATE TABLE documents (
    id INT IDENTITY(1,1) PRIMARY KEY,
    title NVARCHAR(255) NOT NULL,
    description NTEXT,
    category_id INT NOT NULL,
    filename NVARCHAR(255) NOT NULL,
    original_filename NVARCHAR(255) NOT NULL,
    file_path NVARCHAR(500) NOT NULL,
    file_size INT NOT NULL,
    mime_type NVARCHAR(100),
    
    -- Access Control
    access_level NVARCHAR(20) NOT NULL, -- public/students/teachers/staff/admin/class_specific
    class_id INT NULL,
    course_id INT NULL,
    
    -- Metadata
    version NVARCHAR(20) DEFAULT '1.0',
    tags NVARCHAR(500),
    download_count INT DEFAULT 0,
    is_active BIT DEFAULT 1,
    
    uploaded_by INT NOT NULL,
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME DEFAULT GETDATE()
);

-- Indexes cho documents
CREATE INDEX IX_documents_category_active ON documents(category_id, is_active);
CREATE INDEX IX_documents_access_active ON documents(access_level, is_active);
CREATE INDEX IX_documents_class_access ON documents(class_id, access_level);
CREATE INDEX IX_documents_uploader ON documents(uploaded_by, created_at);

-- Bảng log truy cập tài liệu
CREATE TABLE document_access_logs (
    id INT IDENTITY(1,1) PRIMARY KEY,
    document_id INT NOT NULL,
    user_id INT NOT NULL,
    access_type NVARCHAR(20) NOT NULL, -- view/download/print
    ip_address NVARCHAR(45),
    user_agent NTEXT,
    accessed_at DATETIME DEFAULT GETDATE()
);

CREATE INDEX IX_doc_access_document ON document_access_logs(document_id, accessed_at);
CREATE INDEX IX_doc_access_user ON document_access_logs(user_id, accessed_at);

-- =============================================================================
-- SAMPLE DATA INSERTION
-- =============================================================================

-- Insert sample payment methods
INSERT INTO payment_methods (code, name, description, is_active, processing_fee_percent, sort_order) VALUES
('cash', N'Tiền mặt', N'Thanh toán bằng tiền mặt tại trung tâm', 1, 0, 1),
('bank_transfer', N'Chuyển khoản ngân hàng', N'Chuyển khoản qua ngân hàng', 1, 0, 2),
('momo', N'Ví MoMo', N'Thanh toán qua ví điện tử MoMo', 1, 0.5, 3),
('zalopay', N'ZaloPay', N'Thanh toán qua ví điện tử ZaloPay', 1, 0.5, 4),
('vnpay', N'VNPay', N'Thanh toán qua cổng VNPay', 1, 1.0, 5);

-- Insert sample fee types
INSERT INTO fee_types (code, name, description, is_active) VALUES
('tuition', N'Học phí', N'Phí học tập chính của khóa học', 1),
('registration', N'Phí đăng ký', N'Phí đăng ký nhập học', 1),
('material', N'Phí tài liệu', N'Phí sách và tài liệu học tập', 1),
('exam', N'Phí thi', N'Phí tham gia kỳ thi', 1),
('certificate', N'Phí chứng chỉ', N'Phí cấp chứng chỉ hoàn thành', 1);

-- Insert sample support categories
INSERT INTO support_categories (code, name, description, default_priority, is_active, sort_order) VALUES
('technical', N'Hỗ trợ kỹ thuật', N'Các vấn đề về hệ thống và công nghệ', 'medium', 1, 1),
('academic', N'Hỗ trợ học tập', N'Các vấn đề liên quan đến học tập', 'medium', 1, 2),
('payment', N'Hỗ trợ thanh toán', N'Các vấn đề về thanh toán và học phí', 'high', 1, 3),
('enrollment', N'Hỗ trợ đăng ký', N'Hỗ trợ đăng ký khóa học', 'medium', 1, 4),
('general', N'Hỗ trợ chung', N'Các câu hỏi và hỗ trợ khác', 'low', 1, 5);

-- Insert sample document categories
INSERT INTO document_categories (code, name, description, parent_category_id, sort_order, is_active) VALUES
('textbooks', N'Sách giáo khoa', N'Sách giáo khoa chính thức', NULL, 1, 1),
('worksheets', N'Bài tập', N'Bài tập và worksheet', NULL, 2, 1),
('references', N'Tài liệu tham khảo', N'Tài liệu tham khảo bổ sung', NULL, 3, 1),
('exams', N'Đề thi', N'Đề thi và bài kiểm tra', NULL, 4, 1),
('policies', N'Quy định', N'Quy định và chính sách', NULL, 5, 1);

-- Insert sample time slots
INSERT INTO time_slots (name, start_time, end_time, is_active, sort_order) VALUES
(N'Slot 1 (8:00-9:30)', '08:00:00', '09:30:00', 1, 1),
(N'Slot 2 (9:45-11:15)', '09:45:00', '11:15:00', 1, 2),
(N'Slot 3 (13:30-15:00)', '13:30:00', '15:00:00', 1, 3),
(N'Slot 4 (15:15-16:45)', '15:15:00', '16:45:00', 1, 4),
(N'Slot 5 (17:00-18:30)', '17:00:00', '18:30:00', 1, 5),
(N'Slot 6 (18:45-20:15)', '18:45:00', '20:15:00', 1, 6);

-- Insert sample system configurations
INSERT INTO system_configurations (category, config_key, config_value, data_type, description, is_system) VALUES
('payment', 'auto_generate_invoice', 'true', 'boolean', N'Tự động tạo hóa đơn khi đăng ký khóa học', 0),
('payment', 'payment_due_days', '7', 'number', N'Số ngày hạn thanh toán mặc định', 0),
('notification', 'email_notifications_enabled', 'true', 'boolean', N'Bật thông báo qua email', 0),
('notification', 'sms_notifications_enabled', 'false', 'boolean', N'Bật thông báo qua SMS', 0),
('academic', 'max_students_per_class', '25', 'number', N'Số học sinh tối đa trong một lớp', 0),
('academic', 'attendance_required_percentage', '80', 'number', N'Tỷ lệ điểm danh tối thiểu (%)', 0),
('security', 'password_min_length', '8', 'number', N'Độ dài mật khẩu tối thiểu', 1),
('security', 'session_timeout_minutes', '60', 'number', N'Thời gian timeout session (phút)', 1);

PRINT N'DMT Education System Extended Database Schema đã được tạo thành công!';
PRINT N'Hệ thống bao gồm:';
PRINT N'- 9 modules chính với 32+ bảng mới';
PRINT N'- Hệ thống thông báo và announcements';
PRINT N'- Quản lý thanh toán và hóa đơn';
PRINT N'- Lịch học và quản lý phòng học';
PRINT N'- Hệ thống support tickets';
PRINT N'- Khảo sát và feedback';
PRINT N'- Thông tin chi tiết học sinh/giáo viên';
PRINT N'- Analytics và báo cáo';
PRINT N'- Quản lý tài liệu và cấu hình hệ thống';
PRINT N'';
PRINT N'Lưu ý: Cần thêm Foreign Key constraints sau khi tích hợp với database chính.';
