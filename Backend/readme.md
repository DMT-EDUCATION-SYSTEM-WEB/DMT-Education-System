# 🎓 DMT EDUCATION SYSTEM - DATABASE DOCUMENTATION

## 📋 Mục lục

- [1. Tổng quan hệ thống](#1-tổng-quan-hệ-thống)
- [2. Entity Relationship Diagram (ERD)](#2-entity-relationship-diagram-erd)
- [3. Chi tiết các bảng](#3-chi-tiết-các-bảng)
- [4. Quan hệ giữa các bảng](#4-quan-hệ-giữa-các-bảng)
- [5. Indexes và Performance](#5-indexes-và-performance)
- [6. Quy tắc phân quyền](#6-quy-tắc-phân-quyền)

---

## 1. Tổng quan hệ thống

Hệ thống quản lý **trung tâm giáo dục DMT** bao gồm các module chính:

### 🔐 Quản lý người dùng & phân quyền
- Mỗi user có **1 role duy nhất** (Admin, Teacher, Student, Staff)
- Hồ sơ mở rộng 1-1: `STUDENTS`, `TEACHERS`, `STAFF`
- Xác thực JWT, quản lý session

### 📚 Quản lý học vụ
- Môn học (Subjects) → Khóa học (Courses) → Lớp học (Classes)
- Lịch học chi tiết theo buổi (Class Sessions)
- Đăng ký học (Enrollments) và điểm danh (Attendance)

### 📝 Bài tập & Chấm điểm
- Giao bài tập (Assignments)
- Nộp bài (Submissions)
- Chấm điểm chi tiết (Grades)

### 💰 Quản lý tài chính
- Thanh toán học phí (Payments)
- Quản lý chi phí (Expenses)
- Theo dõi công nợ

### 📊 Khảo sát & Đánh giá
- Tạo khảo sát (Surveys)
- Câu hỏi khảo sát (Survey Questions)
- Thu thập phản hồi (Survey Responses)

### 📰 Thông báo & Tin tức
- Tin tức & Thông báo (News)
- Thông báo cá nhân (Notifications)
- Quản lý sự kiện

### 📁 Tài liệu học tập
- Upload tài liệu (Materials)
- Quản lý file đa dạng

### 🔧 Hệ thống & Bảo mật
- Nhật ký hoạt động (Activity Logs)
- Cấu hình hệ thống (System Settings)
- Lịch sử backup (Backup History)

---

## 2. Entity Relationship Diagram (ERD)

### 📐 ERD Tổng quan

```mermaid
erDiagram
    %% === CORE USER MANAGEMENT ===
    ROLES ||--o{ USERS : "has"
    USERS ||--o| STUDENTS : "extends"
    USERS ||--o| TEACHERS : "extends"
    USERS ||--o| STAFF : "extends"
    
    %% === ACADEMIC STRUCTURE ===
    SUBJECTS ||--o{ COURSES : "contains"
    COURSES ||--o{ CLASSES : "has"
    CLASSES ||--o{ CLASS_SESSIONS : "schedules"
    TEACHERS ||--o{ CLASSES : "teaches"
    
    %% === ENROLLMENT & ATTENDANCE ===
    CLASSES ||--o{ ENROLLMENTS : "has"
    STUDENTS ||--o{ ENROLLMENTS : "enrolls"
    ENROLLMENTS ||--o{ ATTENDANCE : "tracks"
    CLASS_SESSIONS ||--o{ ATTENDANCE : "records"
    
    %% === ASSIGNMENTS & GRADING ===
    CLASSES ||--o{ ASSIGNMENTS : "assigns"
    ASSIGNMENTS ||--o{ SUBMISSIONS : "receives"
    STUDENTS ||--o{ SUBMISSIONS : "submits"
    SUBMISSIONS ||--o{ GRADES : "evaluated"
    ENROLLMENTS ||--o{ GRADES : "achieves"
    
    %% === PAYMENTS ===
    ENROLLMENTS ||--o{ PAYMENTS : "pays"
    
    %% === LEARNING MATERIALS ===
    CLASSES ||--o{ MATERIALS : "provides"
    
    %% === SURVEYS ===
    CLASSES ||--o{ SURVEYS : "evaluates"
    COURSES ||--o{ SURVEYS : "evaluates"
    SURVEYS ||--o{ SURVEY_QUESTIONS : "contains"
    SURVEY_QUESTIONS ||--o{ SURVEY_RESPONSES : "answered"
    USERS ||--o{ SURVEY_RESPONSES : "responds"
    
    %% === NEWS & NOTIFICATIONS ===
    USERS ||--o{ NEWS : "authors"
    USERS ||--o{ NOTIFICATIONS : "receives"
    
    %% === SYSTEM & AUDIT ===
    USERS ||--o{ ACTIVITY_LOGS : "performs"
    
    %% === EXPENSES ===
    EXPENSES
    
    %% ROLES DEFINITION
    ROLES {
        int ID PK
        varchar CODE UK
        varchar NAME
        nvarchar DESCRIPTION
        datetime2 CREATED_AT
    }
    
    %% USERS DEFINITION
    USERS {
        int ID PK
        int ROLE_ID FK
        varchar EMAIL UK
        varchar PASSWORD_HASH
        nvarchar FULL_NAME
        varchar PHONE
        nvarchar ADDRESS
        date BIRTH_DATE
        varchar AVATAR_URL
        bit STATUS
        datetime2 LAST_LOGIN_AT
        datetime2 CREATED_AT
        datetime2 UPDATED_AT
    }
    
    %% STUDENTS DEFINITION
    STUDENTS {
        int ID PK
        int USER_ID FK-UK
        varchar STUDENT_CODE UK
        varchar SCHOOL_LEVEL
        nvarchar PARENT_NAME
        varchar PARENT_PHONE
        varchar PARENT_EMAIL
        datetime2 CREATED_AT
    }
    
    %% TEACHERS DEFINITION
    TEACHERS {
        int ID PK
        int USER_ID FK-UK
        varchar TEACHER_CODE UK
        int MAIN_SUBJECT_ID FK
        int YEARS_EXPERIENCE
        nvarchar DEGREE
        nvarchar SPECIALIZATION
        datetime2 CREATED_AT
    }
    
    %% STAFF DEFINITION
    STAFF {
        int ID PK
        int USER_ID FK-UK
        varchar STAFF_CODE UK
        nvarchar DEPARTMENT
        nvarchar POSITION
        datetime2 CREATED_AT
    }
    
    %% SUBJECTS DEFINITION
    SUBJECTS {
        int ID PK
        nvarchar NAME
        varchar CODE UK
        nvarchar DESCRIPTION
        bit IS_ACTIVE
        datetime2 CREATED_AT
    }
    
    %% COURSES DEFINITION
    COURSES {
        int ID PK
        int SUBJECT_ID FK
        varchar CODE UK
        nvarchar NAME
        nvarchar DESCRIPTION
        int DURATION_WEEKS
        int TOTAL_SESSIONS
        decimal PRICE
        varchar LEVEL
        bit IS_ACTIVE
        datetime2 CREATED_AT
    }
    
    %% CLASSES DEFINITION
    CLASSES {
        int ID PK
        int COURSE_ID FK
        varchar CODE UK
        nvarchar NAME
        int TEACHER_ID FK
        int CAPACITY
        int CURRENT_STUDENTS
        date START_DATE
        date END_DATE
        varchar SCHEDULE_DAYS
        varchar SCHEDULE_TIME
        nvarchar CLASSROOM
        varchar STATUS
        datetime2 CREATED_AT
    }
    
    %% CLASS_SESSIONS DEFINITION
    CLASS_SESSIONS {
        int ID PK
        int CLASS_ID FK
        int SESSION_NUMBER
        nvarchar TITLE
        date SESSION_DATE
        time START_TIME
        time END_TIME
        nvarchar CONTENT
        nvarchar HOMEWORK
        varchar STATUS
        datetime2 CREATED_AT
    }
    
    %% ENROLLMENTS DEFINITION
    ENROLLMENTS {
        int ID PK
        int CLASS_ID FK
        int STUDENT_ID FK
        date ENROLLMENT_DATE
        varchar STATUS
        varchar PAYMENT_STATUS
        decimal TOTAL_FEE
        decimal PAID_AMOUNT
        decimal DISCOUNT_PERCENT
        nvarchar NOTES
        datetime2 CREATED_AT
    }
    
    %% ATTENDANCE DEFINITION
    ATTENDANCE {
        int ID PK
        int SESSION_ID FK
        int ENROLLMENT_ID FK
        varchar STATUS
        datetime2 CHECK_IN_TIME
        nvarchar NOTES
        int MARKED_BY FK
        datetime2 CREATED_AT
    }
    
    %% ASSIGNMENTS DEFINITION
    ASSIGNMENTS {
        int ID PK
        int CLASS_ID FK
        nvarchar TITLE
        nvarchar DESCRIPTION
        date DUE_DATE
        decimal MAX_SCORE
        varchar ASSIGNMENT_TYPE
        int CREATED_BY FK
        datetime2 CREATED_AT
    }
    
    %% SUBMISSIONS DEFINITION
    SUBMISSIONS {
        int ID PK
        int ASSIGNMENT_ID FK
        int STUDENT_ID FK
        datetime2 SUBMISSION_DATE
        nvarchar CONTENT
        varchar ATTACHMENT_URL
        decimal SCORE
        nvarchar FEEDBACK
        int GRADED_BY FK
        datetime2 GRADED_AT
        varchar STATUS
        datetime2 CREATED_AT
    }
    
    %% GRADES DEFINITION
    GRADES {
        int ID PK
        int ENROLLMENT_ID FK
        varchar GRADE_TYPE
        decimal SCORE
        decimal MAX_SCORE
        decimal WEIGHT
        nvarchar NOTES
        int GRADED_BY FK
        datetime2 GRADED_AT
        datetime2 CREATED_AT
    }
    
    %% MATERIALS DEFINITION
    MATERIALS {
        int ID PK
        int CLASS_ID FK
        nvarchar TITLE
        nvarchar DESCRIPTION
        varchar FILE_URL
        varchar FILE_TYPE
        bigint FILE_SIZE
        int UPLOADED_BY FK
        bit IS_PUBLIC
        datetime2 CREATED_AT
    }
    
    %% PAYMENTS DEFINITION
    PAYMENTS {
        int ID PK
        varchar PAYMENT_CODE UK
        int ENROLLMENT_ID FK
        decimal AMOUNT
        date PAYMENT_DATE
        varchar PAYMENT_METHOD
        varchar TRANSACTION_ID
        varchar STATUS
        varchar RECEIPT_NUMBER
        nvarchar DESCRIPTION
        nvarchar PAYMENT_DETAILS
        nvarchar NOTES
        int PROCESSED_BY FK
        varchar CREATED_BY
        datetime2 CREATED_AT
        datetime2 UPDATED_AT
    }
    
    %% SURVEYS DEFINITION
    SURVEYS {
        int ID PK
        nvarchar TITLE
        nvarchar DESCRIPTION
        varchar TARGET_TYPE
        int CLASS_ID FK
        int COURSE_ID FK
        date START_DATE
        date END_DATE
        bit IS_ACTIVE
        int CREATED_BY FK
        datetime2 CREATED_AT
    }
    
    %% SURVEY_QUESTIONS DEFINITION
    SURVEY_QUESTIONS {
        int ID PK
        int SURVEY_ID FK
        nvarchar QUESTION_TEXT
        varchar QUESTION_TYPE
        nvarchar OPTIONS
        bit IS_REQUIRED
        int QUESTION_ORDER
        datetime2 CREATED_AT
    }
    
    %% SURVEY_RESPONSES DEFINITION
    SURVEY_RESPONSES {
        int ID PK
        int SURVEY_ID FK
        int QUESTION_ID FK
        int RESPONDENT_ID FK
        nvarchar ANSWER_TEXT
        int ANSWER_RATING
        datetime2 SUBMITTED_AT
    }
    
    %% NEWS DEFINITION
    NEWS {
        int ID PK
        nvarchar TITLE
        nvarchar EXCERPT
        nvarchar CONTENT
        varchar IMAGE_URL
        varchar TYPE
        varchar STATUS
        bit IS_FEATURED
        int AUTHOR_ID FK
        datetime2 PUBLISHED_AT
        datetime2 CREATED_AT
        datetime2 UPDATED_AT
    }
    
    %% NOTIFICATIONS DEFINITION
    NOTIFICATIONS {
        int ID PK
        int USER_ID FK
        nvarchar TITLE
        nvarchar MESSAGE
        varchar TYPE
        bit IS_READ
        varchar ACTION_LINK
        datetime2 CREATED_AT
    }
    
    %% EXPENSES DEFINITION
    EXPENSES {
        int ID PK
        varchar EXPENSE_CODE UK
        datetime2 EXPENSE_DATE
        nvarchar CATEGORY
        decimal AMOUNT
        nvarchar DESCRIPTION
        varchar PAYMENT_METHOD
        varchar APPROVED_BY
        varchar RECEIPT_NUMBER
        nvarchar NOTES
        varchar CREATED_BY
        datetime2 CREATED_AT
        datetime2 UPDATED_AT
    }
    
    %% ACTIVITY_LOGS DEFINITION
    ACTIVITY_LOGS {
        int ID PK
        int USER_ID FK
        varchar ACTION
        varchar ENTITY_TYPE
        int ENTITY_ID
        nvarchar DETAILS
        varchar IP_ADDRESS
        nvarchar USER_AGENT
        datetime2 CREATED_AT
    }
    
    %% SYSTEM_SETTINGS DEFINITION
    SYSTEM_SETTINGS {
        int ID PK
        varchar SETTING_KEY UK
        nvarchar SETTING_VALUE
        nvarchar DESCRIPTION
        datetime2 UPDATED_AT
    }
    
    %% BACKUP_HISTORY DEFINITION
    BACKUP_HISTORY {
        int ID PK
        varchar BACKUP_NAME
        varchar BACKUP_PATH
        bigint BACKUP_SIZE
        varchar BACKUP_TYPE
        varchar STATUS
        datetime2 STARTED_AT
        datetime2 COMPLETED_AT
    }
```

---

## 3. Chi tiết các bảng

### 2.1 Nguyên tắc

- **Mỗi user chỉ có 1 role** (`users.role_id`), không có bảng `user_roles`.
- Hồ sơ mở rộng 1–1 cho từng loại người: `students`, `teachers`, `staffs`, `admins`.
- **Teacher/TA ↔ class**: lưu trực tiếp trong `classes.teacher_id` & `classes.ta_id`.
- **Thành phần khóa học** (`course_components`) tổng quát, dùng được cho mọi môn học.
- **Chỉ role hợp lệ mới được truy cập** chức năng tương ứng (app kiểm soát, có thể dùng `roles.capabilities_json`).

### 2.2 Ràng buộc chính

- `users.email` **unique**
- `students.user_id`, `teachers.user_id`, `staffs.user_id`, `admins.user_id` **unique**
- `courses.code`, `classes.code` **unique**
- `enrollments(class_id, student_id)` **unique**
- `submissions(assignment_id, enrollment_id)` **unique**
- `grades.submission_id` **unique**
- `grade_component_aggregates(enrollment_id, course_component_id)` **unique**

---

## 3. Chi tiết các bảng

### 3.1 👥 Quản lý người dùng & Phân quyền

#### 📌 ROLES - Vai trò hệ thống

Quản lý các vai trò trong hệ thống.

| Cột | Kiểu | Mô tả |
|-----|------|-------|
| `ID` | INT (PK) | ID vai trò |
| `CODE` | VARCHAR(50) (UK) | Mã vai trò (ADMIN, TEACHER, STUDENT, STAFF) |
| `NAME` | VARCHAR(100) | Tên vai trò |
| `DESCRIPTION` | NVARCHAR(MAX) | Mô tả vai trò |
| `CREATED_AT` | DATETIME2 | Thời gian tạo |

**Dữ liệu mặc định:**
- ID 1: ADMIN - Quản trị viên
- ID 2: STAFF - Nhân viên văn phòng
- ID 3: TEACHER - Giáo viên
- ID 4: STUDENT - Học sinh

---

#### 📌 USERS - Tài khoản người dùng

Bảng trung tâm chứa thông tin đăng nhập và thông tin chung của tất cả người dùng.

| Cột | Kiểu | Mô tả |
|-----|------|-------|
| `ID` | INT (PK) | ID người dùng |
| `ROLE_ID` | INT (FK) | ID vai trò → ROLES.ID |
| `EMAIL` | VARCHAR(255) (UK) | Email đăng nhập (unique) |
| `PASSWORD_HASH` | VARCHAR(255) | Mật khẩu đã hash (bcrypt) |
| `FULL_NAME` | NVARCHAR(255) | Họ và tên đầy đủ |
| `PHONE` | VARCHAR(20) | Số điện thoại |
| `ADDRESS` | NVARCHAR(MAX) | Địa chỉ |
| `BIRTH_DATE` | DATE | Ngày sinh |
| `AVATAR_URL` | VARCHAR(500) | URL ảnh đại diện |
| `STATUS` | BIT | Trạng thái (1=active, 0=inactive) |
| `LAST_LOGIN_AT` | DATETIME2 | Lần đăng nhập cuối |
| `CREATED_AT` | DATETIME2 | Thời gian tạo tài khoản |
| `UPDATED_AT` | DATETIME2 | Thời gian cập nhật |

**Ràng buộc:**
- Email phải unique
- Mỗi user chỉ có 1 role

---

#### 📌 STUDENTS - Hồ sơ học sinh

Mở rộng thông tin cho học sinh (quan hệ 1-1 với USERS).

| Cột | Kiểu | Mô tả |
|-----|------|-------|
| `ID` | INT (PK) | ID học sinh |
| `USER_ID` | INT (FK, UK) | ID người dùng → USERS.ID |
| `STUDENT_CODE` | VARCHAR(50) (UK) | Mã học sinh (HS001, HS002...) |
| `SCHOOL_LEVEL` | VARCHAR(50) | Cấp học (ELEMENTARY, MIDDLE_SCHOOL, HIGH_SCHOOL) |
| `PARENT_NAME` | NVARCHAR(255) | Tên phụ huynh |
| `PARENT_PHONE` | VARCHAR(20) | SĐT phụ huynh |
| `PARENT_EMAIL` | VARCHAR(255) | Email phụ huynh |
| `CREATED_AT` | DATETIME2 | Thời gian tạo |

**Xóa cascade:** Khi xóa USERS → xóa STUDENTS

---

#### 📌 TEACHERS - Hồ sơ giáo viên

Mở rộng thông tin cho giáo viên (quan hệ 1-1 với USERS).

| Cột | Kiểu | Mô tả |
|-----|------|-------|
| `ID` | INT (PK) | ID giáo viên |
| `USER_ID` | INT (FK, UK) | ID người dùng → USERS.ID |
| `TEACHER_CODE` | VARCHAR(50) (UK) | Mã giáo viên (GV001, GV002...) |
| `MAIN_SUBJECT_ID` | INT (FK) | Môn dạy chính → SUBJECTS.ID |
| `YEARS_EXPERIENCE` | INT | Số năm kinh nghiệm |
| `DEGREE` | NVARCHAR(255) | Bằng cấp (Thạc sĩ, Tiến sĩ...) |
| `SPECIALIZATION` | NVARCHAR(255) | Chuyên môn |
| `CREATED_AT` | DATETIME2 | Thời gian tạo |

**Xóa cascade:** Khi xóa USERS → xóa TEACHERS

---

#### 📌 STAFF - Hồ sơ nhân viên

Mở rộng thông tin cho nhân viên văn phòng (quan hệ 1-1 với USERS).

| Cột | Kiểu | Mô tả |
|-----|------|-------|
| `ID` | INT (PK) | ID nhân viên |
| `USER_ID` | INT (FK, UK) | ID người dùng → USERS.ID |
| `STAFF_CODE` | VARCHAR(50) (UK) | Mã nhân viên (NV001, NV002...) |
| `DEPARTMENT` | NVARCHAR(120) | Phòng ban |
| `POSITION` | NVARCHAR(120) | Chức vụ |
| `CREATED_AT` | DATETIME2 | Thời gian tạo |

**Xóa cascade:** Khi xóa USERS → xóa STAFF

---

### 3.2 📚 Quản lý học vụ

#### 📌 SUBJECTS - Môn học

Danh mục các môn học trong hệ thống.

| Cột | Kiểu | Mô tả |
|-----|------|-------|
| `ID` | INT (PK) | ID môn học |
| `NAME` | NVARCHAR(120) | Tên môn học |
| `CODE` | VARCHAR(50) (UK) | Mã môn học (MATH, ENG, PHY...) |
| `DESCRIPTION` | NVARCHAR(MAX) | Mô tả môn học |
| `IS_ACTIVE` | BIT | Trạng thái hoạt động |
| `CREATED_AT` | DATETIME2 | Thời gian tạo |

---

#### 📌 COURSES - Khóa học

Các khóa học được tổ chức theo môn học.

| Cột | Kiểu | Mô tả |
|-----|------|-------|
| `ID` | INT (PK) | ID khóa học |
| `SUBJECT_ID` | INT (FK) | ID môn học → SUBJECTS.ID |
| `CODE` | VARCHAR(50) (UK) | Mã khóa học (IELTS-2025, MATH-8A...) |
| `NAME` | NVARCHAR(255) | Tên khóa học |
| `DESCRIPTION` | NVARCHAR(MAX) | Mô tả khóa học |
| `DURATION_WEEKS` | INT | Thời lượng (tuần) |
| `TOTAL_SESSIONS` | INT | Tổng số buổi học |
| `PRICE` | DECIMAL(12,2) | Học phí |
| `LEVEL` | VARCHAR(20) | Cấp độ (BEGINNER, INTERMEDIATE, ADVANCED) |
| `IS_ACTIVE` | BIT | Trạng thái hoạt động |
| `CREATED_AT` | DATETIME2 | Thời gian tạo |

---

#### 📌 CLASSES - Lớp học

Lớp học cụ thể được mở từ khóa học.

| Cột | Kiểu | Mô tả |
|-----|------|-------|
| `ID` | INT (PK) | ID lớp học |
| `COURSE_ID` | INT (FK) | ID khóa học → COURSES.ID |
| `CODE` | VARCHAR(50) (UK) | Mã lớp (IELTS-GV-01, MATH-8A-01...) |
| `NAME` | NVARCHAR(255) | Tên lớp |
| `TEACHER_ID` | INT (FK) | ID giáo viên → TEACHERS.ID |
| `CAPACITY` | INT | Sĩ số tối đa |
| `CURRENT_STUDENTS` | INT | Số học sinh hiện tại |
| `START_DATE` | DATE | Ngày khai giảng |
| `END_DATE` | DATE | Ngày kết thúc |
| `SCHEDULE_DAYS` | VARCHAR(50) | Lịch học (Thứ 2, 4, 6) |
| `SCHEDULE_TIME` | VARCHAR(20) | Giờ học (18:00-20:00) |
| `CLASSROOM` | NVARCHAR(100) | Phòng học |
| `STATUS` | VARCHAR(20) | Trạng thái (PLANNING, ACTIVE, COMPLETED, CANCELLED) |
| `CREATED_AT` | DATETIME2 | Thời gian tạo |

---

#### 📌 CLASS_SESSIONS - Buổi học

Chi tiết các buổi học của lớp.

| Cột | Kiểu | Mô tả |
|-----|------|-------|
| `ID` | INT (PK) | ID buổi học |
| `CLASS_ID` | INT (FK) | ID lớp → CLASSES.ID |
| `SESSION_NUMBER` | INT | Số thứ tự buổi học |
| `TITLE` | NVARCHAR(255) | Tiêu đề buổi học |
| `SESSION_DATE` | DATE | Ngày học |
| `START_TIME` | TIME | Giờ bắt đầu |
| `END_TIME` | TIME | Giờ kết thúc |
| `CONTENT` | NVARCHAR(MAX) | Nội dung bài học |
| `HOMEWORK` | NVARCHAR(MAX) | Bài tập về nhà |
| `STATUS` | VARCHAR(20) | Trạng thái (SCHEDULED, COMPLETED, CANCELLED) |
| `CREATED_AT` | DATETIME2 | Thời gian tạo |

**Xóa cascade:** Khi xóa CLASSES → xóa CLASS_SESSIONS

---

#### 📌 ENROLLMENTS - Đăng ký học

Quản lý đăng ký của học sinh vào lớp học.

| Cột | Kiểu | Mô tả |
|-----|------|-------|
| `ID` | INT (PK) | ID đăng ký |
| `CLASS_ID` | INT (FK) | ID lớp → CLASSES.ID |
| `STUDENT_ID` | INT (FK) | ID học sinh → STUDENTS.ID |
| `ENROLLMENT_DATE` | DATE | Ngày đăng ký |
| `STATUS` | VARCHAR(20) | Trạng thái (ACTIVE, COMPLETED, DROPPED, SUSPENDED) |
| `PAYMENT_STATUS` | VARCHAR(20) | Trạng thái thanh toán (PENDING, PAID, PARTIAL, OVERDUE) |
| `TOTAL_FEE` | DECIMAL(12,2) | Tổng học phí |
| `PAID_AMOUNT` | DECIMAL(12,2) | Số tiền đã đóng |
| `DISCOUNT_PERCENT` | DECIMAL(5,2) | Phần trăm giảm giá |
| `NOTES` | NVARCHAR(MAX) | Ghi chú |
| `CREATED_AT` | DATETIME2 | Thời gian tạo |

**Ràng buộc:** Unique (CLASS_ID, STUDENT_ID) - học sinh không thể đăng ký trùng lớp

---

#### 📌 ATTENDANCE - Điểm danh

Theo dõi điểm danh của học sinh theo từng buổi học.

| Cột | Kiểu | Mô tả |
|-----|------|-------|
| `ID` | INT (PK) | ID điểm danh |
| `SESSION_ID` | INT (FK) | ID buổi học → CLASS_SESSIONS.ID |
| `ENROLLMENT_ID` | INT (FK) | ID đăng ký → ENROLLMENTS.ID |
| `STATUS` | VARCHAR(20) | Trạng thái (PRESENT, ABSENT, LATE, EXCUSED) |
| `CHECK_IN_TIME` | DATETIME2 | Thời gian check-in |
| `NOTES` | NVARCHAR(MAX) | Ghi chú |
| `MARKED_BY` | INT (FK) | Người điểm danh → USERS.ID |
| `CREATED_AT` | DATETIME2 | Thời gian tạo |

---

### 3.3 📝 Quản lý bài tập & Điểm số

#### 📌 ASSIGNMENTS - Bài tập

Bài tập được giao cho lớp học.

| Cột | Kiểu | Mô tả |
|-----|------|-------|
| `ID` | INT (PK) | ID bài tập |
| `CLASS_ID` | INT (FK) | ID lớp → CLASSES.ID |
| `TITLE` | NVARCHAR(255) | Tiêu đề bài tập |
| `DESCRIPTION` | NVARCHAR(MAX) | Mô tả chi tiết |
| `DUE_DATE` | DATE | Hạn nộp bài |
| `MAX_SCORE` | DECIMAL(6,2) | Điểm tối đa |
| `ASSIGNMENT_TYPE` | VARCHAR(30) | Loại (HOMEWORK, QUIZ, EXAM, PROJECT) |
| `CREATED_BY` | INT (FK) | Người tạo → USERS.ID |
| `CREATED_AT` | DATETIME2 | Thời gian tạo |

---

#### 📌 SUBMISSIONS - Bài nộp

Bài làm của học sinh.

| Cột | Kiểu | Mô tả |
|-----|------|-------|
| `ID` | INT (PK) | ID bài nộp |
| `ASSIGNMENT_ID` | INT (FK) | ID bài tập → ASSIGNMENTS.ID |
| `STUDENT_ID` | INT (FK) | ID học sinh → STUDENTS.ID |
| `SUBMISSION_DATE` | DATETIME2 | Thời gian nộp |
| `CONTENT` | NVARCHAR(MAX) | Nội dung bài làm |
| `ATTACHMENT_URL` | VARCHAR(500) | Link file đính kèm |
| `SCORE` | DECIMAL(6,2) | Điểm số |
| `FEEDBACK` | NVARCHAR(MAX) | Nhận xét của GV |
| `GRADED_BY` | INT (FK) | Người chấm → USERS.ID |
| `GRADED_AT` | DATETIME2 | Thời gian chấm |
| `STATUS` | VARCHAR(20) | Trạng thái (SUBMITTED, GRADED, LATE, MISSING) |
| `CREATED_AT` | DATETIME2 | Thời gian tạo |

---

#### 📌 GRADES - Điểm số

Điểm tổng hợp của học sinh trong lớp.

| Cột | Kiểu | Mô tả |
|-----|------|-------|
| `ID` | INT (PK) | ID điểm |
| `ENROLLMENT_ID` | INT (FK) | ID đăng ký → ENROLLMENTS.ID |
| `GRADE_TYPE` | VARCHAR(30) | Loại điểm (MIDTERM, FINAL, ASSIGNMENT, OVERALL) |
| `SCORE` | DECIMAL(6,2) | Điểm số |
| `MAX_SCORE` | DECIMAL(6,2) | Điểm tối đa |
| `WEIGHT` | DECIMAL(5,2) | Trọng số (%) |
| `NOTES` | NVARCHAR(MAX) | Ghi chú |
| `GRADED_BY` | INT (FK) | Người chấm → USERS.ID |
| `GRADED_AT` | DATETIME2 | Thời gian chấm |
| `CREATED_AT` | DATETIME2 | Thời gian tạo |

---

### 3.4 📁 Tài liệu học tập

#### 📌 MATERIALS - Tài liệu

Tài liệu học tập cho lớp học.

| Cột | Kiểu | Mô tả |
|-----|------|-------|
| `ID` | INT (PK) | ID tài liệu |
| `CLASS_ID` | INT (FK) | ID lớp → CLASSES.ID |
| `TITLE` | NVARCHAR(255) | Tiêu đề tài liệu |
| `DESCRIPTION` | NVARCHAR(MAX) | Mô tả |
| `FILE_URL` | VARCHAR(500) | Đường dẫn file |
| `FILE_TYPE` | VARCHAR(50) | Loại file (PDF, DOC, PPT...) |
| `FILE_SIZE` | BIGINT | Kích thước file (bytes) |
| `UPLOADED_BY` | INT (FK) | Người upload → USERS.ID |
| `IS_PUBLIC` | BIT | Public cho tất cả học sinh |
| `CREATED_AT` | DATETIME2 | Thời gian tạo |

---

### 3.5 💰 Quản lý tài chính

#### 📌 PAYMENTS - Thanh toán

Quản lý thanh toán học phí.

| Cột | Kiểu | Mô tả |
|-----|------|-------|
| `ID` | INT (PK) | ID thanh toán |
| `PAYMENT_CODE` | VARCHAR(50) (UK) | Mã thanh toán |
| `ENROLLMENT_ID` | INT (FK) | ID đăng ký → ENROLLMENTS.ID |
| `AMOUNT` | DECIMAL(12,2) | Số tiền |
| `PAYMENT_DATE` | DATE | Ngày thanh toán |
| `PAYMENT_METHOD` | VARCHAR(50) | Phương thức (CASH, BANK_TRANSFER, CREDIT_CARD, E_WALLET) |
| `TRANSACTION_ID` | VARCHAR(255) | Mã giao dịch |
| `STATUS` | VARCHAR(20) | Trạng thái (PENDING, COMPLETED, FAILED, REFUNDED) |
| `RECEIPT_NUMBER` | VARCHAR(50) | Số hóa đơn |
| `DESCRIPTION` | NVARCHAR(500) | Mô tả |
| `PAYMENT_DETAILS` | NVARCHAR(500) | Chi tiết thanh toán |
| `NOTES` | NVARCHAR(MAX) | Ghi chú |
| `PROCESSED_BY` | INT (FK) | Người xử lý → USERS.ID |
| `CREATED_BY` | VARCHAR(100) | Người tạo |
| `CREATED_AT` | DATETIME2 | Thời gian tạo |
| `UPDATED_AT` | DATETIME2 | Thời gian cập nhật |

---

#### 📌 EXPENSES - Chi phí

Quản lý các khoản chi phí của trung tâm.

| Cột | Kiểu | Mô tả |
|-----|------|-------|
| `ID` | INT (PK) | ID chi phí |
| `EXPENSE_CODE` | VARCHAR(50) (UK) | Mã chi phí |
| `EXPENSE_DATE` | DATETIME2 | Ngày chi |
| `CATEGORY` | NVARCHAR(100) | Danh mục (Lương, Thuê nhà, Điện nước, Marketing...) |
| `AMOUNT` | DECIMAL(18,2) | Số tiền |
| `DESCRIPTION` | NVARCHAR(500) | Mô tả |
| `PAYMENT_METHOD` | VARCHAR(50) | Phương thức thanh toán |
| `APPROVED_BY` | VARCHAR(100) | Người phê duyệt |
| `RECEIPT_NUMBER` | VARCHAR(50) | Số biên lai |
| `NOTES` | NVARCHAR(MAX) | Ghi chú |
| `CREATED_BY` | VARCHAR(100) | Người tạo |
| `CREATED_AT` | DATETIME2 | Thời gian tạo |
| `UPDATED_AT` | DATETIME2 | Thời gian cập nhật |

---

### 3.6 📊 Khảo sát & Đánh giá

#### 📌 SURVEYS - Khảo sát

Tạo các khảo sát đánh giá.

| Cột | Kiểu | Mô tả |
|-----|------|-------|
| `ID` | INT (PK) | ID khảo sát |
| `TITLE` | NVARCHAR(255) | Tiêu đề khảo sát |
| `DESCRIPTION` | NVARCHAR(MAX) | Mô tả |
| `TARGET_TYPE` | VARCHAR(30) | Đối tượng (STUDENT, TEACHER, PARENT, ALL) |
| `CLASS_ID` | INT (FK) | ID lớp → CLASSES.ID (optional) |
| `COURSE_ID` | INT (FK) | ID khóa học → COURSES.ID (optional) |
| `START_DATE` | DATE | Ngày bắt đầu |
| `END_DATE` | DATE | Ngày kết thúc |
| `IS_ACTIVE` | BIT | Trạng thái hoạt động |
| `CREATED_BY` | INT (FK) | Người tạo → USERS.ID |
| `CREATED_AT` | DATETIME2 | Thời gian tạo |

---

#### 📌 SURVEY_QUESTIONS - Câu hỏi khảo sát

Câu hỏi trong khảo sát.

| Cột | Kiểu | Mô tả |
|-----|------|-------|
| `ID` | INT (PK) | ID câu hỏi |
| `SURVEY_ID` | INT (FK) | ID khảo sát → SURVEYS.ID |
| `QUESTION_TEXT` | NVARCHAR(MAX) | Nội dung câu hỏi |
| `QUESTION_TYPE` | VARCHAR(30) | Loại (MULTIPLE_CHOICE, TEXT, RATING, YES_NO) |
| `OPTIONS` | NVARCHAR(MAX) | Các lựa chọn (JSON) |
| `IS_REQUIRED` | BIT | Bắt buộc trả lời |
| `QUESTION_ORDER` | INT | Thứ tự hiển thị |
| `CREATED_AT` | DATETIME2 | Thời gian tạo |

**Xóa cascade:** Khi xóa SURVEYS → xóa SURVEY_QUESTIONS

---

#### 📌 SURVEY_RESPONSES - Phản hồi khảo sát

Câu trả lời của người dùng.

| Cột | Kiểu | Mô tả |
|-----|------|-------|
| `ID` | INT (PK) | ID phản hồi |
| `SURVEY_ID` | INT (FK) | ID khảo sát → SURVEYS.ID |
| `QUESTION_ID` | INT (FK) | ID câu hỏi → SURVEY_QUESTIONS.ID |
| `RESPONDENT_ID` | INT (FK) | Người trả lời → USERS.ID |
| `ANSWER_TEXT` | NVARCHAR(MAX) | Câu trả lời dạng text |
| `ANSWER_RATING` | INT | Đánh giá dạng số |
| `SUBMITTED_AT` | DATETIME2 | Thời gian submit |

---

### 3.7 📰 Tin tức & Thông báo

#### 📌 NEWS - Tin tức

Tin tức, thông báo, sự kiện của trung tâm.

| Cột | Kiểu | Mô tả |
|-----|------|-------|
| `ID` | INT (PK) | ID tin tức |
| `TITLE` | NVARCHAR(255) | Tiêu đề |
| `EXCERPT` | NVARCHAR(500) | Tóm tắt ngắn |
| `CONTENT` | NVARCHAR(MAX) | Nội dung đầy đủ |
| `IMAGE_URL` | VARCHAR(500) | Ảnh đại diện |
| `TYPE` | VARCHAR(50) | Loại (NEWS, ANNOUNCEMENT, EVENT) |
| `STATUS` | VARCHAR(20) | Trạng thái (DRAFT, PUBLISHED, ARCHIVED) |
| `IS_FEATURED` | BIT | Tin nổi bật |
| `AUTHOR_ID` | INT (FK) | Tác giả → USERS.ID |
| `PUBLISHED_AT` | DATETIME2 | Thời gian xuất bản |
| `CREATED_AT` | DATETIME2 | Thời gian tạo |
| `UPDATED_AT` | DATETIME2 | Thời gian cập nhật |

---

#### 📌 NOTIFICATIONS - Thông báo cá nhân

Thông báo gửi đến từng người dùng.

| Cột | Kiểu | Mô tả |
|-----|------|-------|
| `ID` | INT (PK) | ID thông báo |
| `USER_ID` | INT (FK) | ID người nhận → USERS.ID |
| `TITLE` | NVARCHAR(255) | Tiêu đề |
| `MESSAGE` | NVARCHAR(MAX) | Nội dung thông báo |
| `TYPE` | VARCHAR(30) | Loại (INFO, SUCCESS, WARNING, ERROR) |
| `IS_READ` | BIT | Đã đọc chưa |
| `ACTION_LINK` | VARCHAR(500) | Link hành động |
| `CREATED_AT` | DATETIME2 | Thời gian tạo |

**Xóa cascade:** Khi xóa USERS → xóa NOTIFICATIONS

---

### 3.8 🔧 Hệ thống & Bảo mật

#### 📌 ACTIVITY_LOGS - Nhật ký hoạt động

Ghi lại mọi thao tác trong hệ thống.

| Cột | Kiểu | Mô tả |
|-----|------|-------|
| `ID` | INT (PK) | ID log |
| `USER_ID` | INT (FK) | ID người thực hiện → USERS.ID |
| `ACTION` | VARCHAR(100) | Hành động (LOGIN, CREATE, UPDATE, DELETE...) |
| `ENTITY_TYPE` | VARCHAR(50) | Loại đối tượng (USER, CLASS, PAYMENT...) |
| `ENTITY_ID` | INT | ID đối tượng |
| `DETAILS` | NVARCHAR(MAX) | Chi tiết thay đổi (JSON) |
| `IP_ADDRESS` | VARCHAR(45) | Địa chỉ IP |
| `USER_AGENT` | NVARCHAR(500) | Thông tin trình duyệt |
| `CREATED_AT` | DATETIME2 | Thời gian |

---

#### 📌 SYSTEM_SETTINGS - Cấu hình hệ thống

Lưu các cài đặt hệ thống dạng key-value.

| Cột | Kiểu | Mô tả |
|-----|------|-------|
| `ID` | INT (PK) | ID setting |
| `SETTING_KEY` | VARCHAR(100) (UK) | Khóa cài đặt |
| `SETTING_VALUE` | NVARCHAR(MAX) | Giá trị |
| `DESCRIPTION` | NVARCHAR(500) | Mô tả |
| `UPDATED_AT` | DATETIME2 | Thời gian cập nhật |

---

#### 📌 BACKUP_HISTORY - Lịch sử backup

Theo dõi các lần backup database.

| Cột | Kiểu | Mô tả |
|-----|------|-------|
| `ID` | INT (PK) | ID backup |
| `BACKUP_NAME` | VARCHAR(255) | Tên file backup |
| `BACKUP_PATH` | VARCHAR(500) | Đường dẫn lưu |
| `BACKUP_SIZE` | BIGINT | Kích thước (bytes) |
| `BACKUP_TYPE` | VARCHAR(20) | Loại (FULL, INCREMENTAL) |
| `STATUS` | VARCHAR(20) | Trạng thái (IN_PROGRESS, COMPLETED, FAILED) |
| `STARTED_AT` | DATETIME2 | Thời gian bắt đầu |
| `COMPLETED_AT` | DATETIME2 | Thời gian hoàn thành |

---

## 4. Quan hệ giữa các bảng

### 🔗 Quan hệ chính

#### Quản lý người dùng
```
ROLES (1) ──────→ (N) USERS
USERS (1) ──────→ (1) STUDENTS
USERS (1) ──────→ (1) TEACHERS  
USERS (1) ──────→ (1) STAFF
```

#### Cấu trúc học vụ
```
SUBJECTS (1) ───→ (N) COURSES
COURSES (1) ────→ (N) CLASSES
CLASSES (1) ────→ (N) CLASS_SESSIONS
TEACHERS (1) ───→ (N) CLASSES
```

#### Đăng ký & Điểm danh
```
CLASSES (1) ─────→ (N) ENROLLMENTS
STUDENTS (1) ────→ (N) ENROLLMENTS
ENROLLMENTS (1) ─→ (N) ATTENDANCE
CLASS_SESSIONS (1) → (N) ATTENDANCE
```

#### Bài tập & Điểm
```
CLASSES (1) ─────→ (N) ASSIGNMENTS
ASSIGNMENTS (1) ─→ (N) SUBMISSIONS
STUDENTS (1) ────→ (N) SUBMISSIONS
ENROLLMENTS (1) ─→ (N) GRADES
```

#### Tài chính
```
ENROLLMENTS (1) ─→ (N) PAYMENTS
```

#### Khảo sát
```
SURVEYS (1) ──────────→ (N) SURVEY_QUESTIONS
SURVEY_QUESTIONS (1) ─→ (N) SURVEY_RESPONSES
USERS (1) ────────────→ (N) SURVEY_RESPONSES
```

---

## 5. Indexes và Performance

### 📊 Indexes được tạo

**User & Auth:**
- `IX_USERS_EMAIL`, `IX_USERS_ROLE_ID`, `IX_USERS_STATUS`
- `IX_STUDENTS_USER_ID`, `IX_STUDENTS_STUDENT_CODE`
- `IX_TEACHERS_USER_ID`, `IX_TEACHERS_TEACHER_CODE`
- `IX_STAFF_USER_ID`

**Academic:**
- `IX_COURSES_SUBJECT_ID`, `IX_COURSES_IS_ACTIVE`
- `IX_CLASSES_COURSE_ID`, `IX_CLASSES_TEACHER_ID`, `IX_CLASSES_STATUS`
- `IX_CLASS_SESSIONS_CLASS_ID`

**Enrollments & Attendance:**
- `IX_ENROLLMENTS_CLASS_ID`, `IX_ENROLLMENTS_STUDENT_ID`, `IX_ENROLLMENTS_STATUS`
- `IX_ATTENDANCE_SESSION_ID`, `IX_ATTENDANCE_ENROLLMENT_ID`

**Assignments:**
- `IX_ASSIGNMENTS_CLASS_ID`
- `IX_SUBMISSIONS_ASSIGNMENT_ID`, `IX_SUBMISSIONS_STUDENT_ID`

**Payments:**
- `IX_PAYMENTS_ENROLLMENT_ID`, `IX_PAYMENTS_STATUS`

**News & Notifications:**
- `IX_NEWS_TYPE`, `IX_NEWS_STATUS`, `IX_NEWS_AUTHOR_ID`
- `IX_NEWS_IS_FEATURED`, `IX_NEWS_PUBLISHED_AT`
- `IX_NOTIFICATIONS_USER_ID`, `IX_NOTIFICATIONS_IS_READ`

---

## 6. Quy tắc phân quyền (RBAC)

### 🔐 Phân quyền theo Role

| Role | Quyền hạn |
|------|-----------|
| **ADMIN** | Full access - Quản lý toàn bộ hệ thống |
| **STAFF** | Quản lý học sinh, thanh toán, đăng ký học, tin tức |
| **TEACHER** | Xem lớp của mình, điểm danh, chấm bài, tải tài liệu |
| **STUDENT** | Xem lớp đã đăng ký, nộp bài, xem điểm, tải tài liệu |

### 📋 Chi tiết quyền

#### 👨‍💼 ADMIN
- ✅ Quản lý users (CRUD tất cả roles)
- ✅ Quản lý subjects, courses, classes
- ✅ Gán giáo viên cho lớp
- ✅ Xem tất cả báo cáo tài chính
- ✅ Quản lý system settings
- ✅ Xem activity logs
- ✅ Tạo và quản lý khảo sát
- ✅ Backup/restore database

#### 👥 STAFF
- ✅ Quản lý students (CRUD)
- ✅ Đăng ký học sinh vào lớp
- ✅ Quản lý payments và expenses
- ✅ Tạo và quản lý tin tức
- ✅ Xem báo cáo học vụ
- ❌ Không thể xóa users với role ADMIN/TEACHER
- ❌ Không thể thay đổi system settings

#### 👨‍🏫 TEACHER
- ✅ Xem thông tin lớp mình dạy
- ✅ Điểm danh học sinh
- ✅ Tạo assignments cho lớp
- ✅ Chấm bài và nhập điểm
- ✅ Upload tài liệu cho lớp
- ✅ Xem danh sách học sinh trong lớp
- ❌ Không xem được lớp của GV khác
- ❌ Không quản lý thanh toán

#### 🎓 STUDENT
- ✅ Xem lớp đã đăng ký
- ✅ Xem lịch học và attendance
- ✅ Nộp assignments
- ✅ Xem điểm của mình
- ✅ Tải tài liệu lớp học
- ✅ Đánh giá khảo sát
- ❌ Không xem được thông tin học sinh khác
- ❌ Không xem được điểm của người khác

---

## 7. API Endpoints chính

### 🔐 Authentication
```
POST   /auth/register          - Đăng ký tài khoản
POST   /auth/login             - Đăng nhập
POST   /auth/logout            - Đăng xuất
GET    /auth/me                - Thông tin user hiện tại
PUT    /auth/change-password   - Đổi mật khẩu
```

### 👥 Users
```
GET    /users                  - Danh sách users (Admin)
GET    /users/:id              - Chi tiết user
POST   /users                  - Tạo user mới (Admin)
PUT    /users/:id              - Cập nhật user
DELETE /users/:id              - Xóa user (Admin)
```

### 🎓 Students
```
GET    /students               - Danh sách học sinh
GET    /students/:id           - Chi tiết học sinh
POST   /students               - Thêm học sinh
PUT    /students/:id           - Cập nhật học sinh
DELETE /students/:id           - Xóa học sinh
```

### 👨‍🏫 Teachers
```
GET    /teachers               - Danh sách giáo viên
GET    /teachers/:id           - Chi tiết giáo viên
POST   /teachers               - Thêm giáo viên
PUT    /teachers/:id           - Cập nhật giáo viên
GET    /teachers/:id/classes   - Lớp của giáo viên
```

### 📚 Courses & Classes
```
GET    /courses                - Danh sách khóa học
GET    /courses/:id            - Chi tiết khóa học
POST   /courses                - Tạo khóa học (Admin)
PUT    /courses/:id            - Cập nhật khóa học
GET    /classes                - Danh sách lớp học
GET    /classes/:id            - Chi tiết lớp
POST   /classes                - Tạo lớp mới (Admin)
PUT    /classes/:id            - Cập nhật lớp
GET    /classes/:id/sessions   - Danh sách buổi học
```

### 📝 Enrollments
```
GET    /enrollments            - Danh sách đăng ký
POST   /enrollments            - Đăng ký học
PUT    /enrollments/:id        - Cập nhật đăng ký
DELETE /enrollments/:id        - Hủy đăng ký
GET    /enrollments/student/:studentId - Đăng ký của HS
```

### ✅ Attendance
```
POST   /attendance             - Điểm danh
GET    /attendance/session/:sessionId  - Điểm danh buổi học
GET    /attendance/student/:studentId  - Điểm danh của HS
PUT    /attendance/:id         - Cập nhật điểm danh
```

### 📝 Assignments
```
GET    /assignments/class/:classId     - Bài tập của lớp
POST   /assignments            - Tạo bài tập (Teacher)
GET    /assignments/:id        - Chi tiết bài tập
PUT    /assignments/:id        - Cập nhật bài tập
DELETE /assignments/:id        - Xóa bài tập
```

### 📤 Submissions
```
POST   /submissions            - Nộp bài (Student)
GET    /submissions/assignment/:id     - Bài nộp của assignment
GET    /submissions/student/:id        - Bài nộp của HS
PUT    /submissions/:id/grade  - Chấm điểm (Teacher)
```

### 💰 Payments
```
GET    /payments               - Danh sách thanh toán
GET    /payments/:id           - Chi tiết thanh toán
POST   /payments               - Tạo thanh toán (Staff)
PUT    /payments/:id           - Cập nhật thanh toán
GET    /payments/student/:studentId    - Thanh toán của HS
GET    /payments/reports/summary       - Báo cáo tài chính
```

### 📰 News
```
GET    /news                   - Danh sách tin tức
GET    /news/:id               - Chi tiết tin tức
POST   /news                   - Tạo tin (Admin/Staff)
PUT    /news/:id               - Cập nhật tin
DELETE /news/:id               - Xóa tin
GET    /news/featured          - Tin nổi bật
```

### 🔔 Notifications
```
GET    /notifications          - Thông báo của user
PUT    /notifications/:id/read - Đánh dấu đã đọc
DELETE /notifications/:id      - Xóa thông báo
```

---

## 8. Hướng dẫn Setup & Development

### 📦 Prerequisites
- Node.js >= 18.x
- SQL Server (Express/Developer Edition)
- npm hoặc yarn

### 🚀 Cài đặt

1. **Clone repository:**
```bash
git clone <repo-url>
cd dmt-edu-ui
```

2. **Cài đặt dependencies:**
```bash
# Frontend
npm install

# Backend
cd Backend/src
npm install
```

3. **Cấu hình database:**

Tạo file `.env` trong `Backend/src/`:
```env
DB_SERVER=localhost
DB_PORT=1433
DB_NAME=DMT_EDUCATION_SYSTEM
DB_USER=sa
DB_PASSWORD=yourPassword123
JWT_SECRET=your-jwt-secret-key
PORT=3001
```

4. **Tạo database:**
```bash
# Chạy script tạo database
cd Backend
sqlcmd -S localhost -U sa -P yourPassword -i Db_DMT_SQLServer.sql
```

5. **Import dữ liệu mẫu:**
```bash
# Import stored procedures
sqlcmd -S localhost -U sa -P yourPassword -d DMT_EDUCATION_SYSTEM -i Db_DMT_StoredProcedures.sql

# Import dữ liệu mẫu (optional)
sqlcmd -S localhost -U sa -P yourPassword -d DMT_EDUCATION_SYSTEM -i MASTER_Insert_All_Mock_Data.sql
```

6. **Chạy ứng dụng:**
```bash
# Terminal 1: Backend
cd Backend/src
npm run dev

# Terminal 2: Frontend
npm start
```

7. **Truy cập:**
- Frontend: http://localhost:5173
- Backend API: http://localhost:3001

### 🔑 Tài khoản mặc định

Sau khi chạy script `MASTER_Insert_All_Mock_Data.sql`:

**Admin:**
- Email: `admin@dmt.edu.vn`
- Password: `Admin@123`

**Giáo viên:**
- Email: `teacher1@dmt.edu.vn`
- Password: `Teacher@123`

**Học sinh:**
- Email: `student1@dmt.edu.vn`
- Password: `Student@123`

---

## 9. Stored Procedures

Xem chi tiết tại: [STORED_PROCEDURES_GUIDE.md](./STORED_PROCEDURES_GUIDE.md)

### Các procedures chính:

#### User Management
- `sp_CreateUser` - Tạo user mới
- `sp_UpdateUser` - Cập nhật thông tin user
- `sp_DeleteUser` - Xóa user
- `sp_GetUserByEmail` - Lấy user theo email
- `sp_VerifyUserLogin` - Xác thực đăng nhập

#### Student Management
- `sp_CreateStudent` - Tạo học sinh
- `sp_GetAllStudents` - Danh sách học sinh
- `sp_GetStudentById` - Chi tiết học sinh
- `sp_UpdateStudent` - Cập nhật học sinh
- `sp_DeleteStudent` - Xóa học sinh

#### Class & Enrollment
- `sp_CreateClass` - Tạo lớp học
- `sp_GetAllClasses` - Danh sách lớp
- `sp_EnrollStudent` - Đăng ký học
- `sp_GetStudentEnrollments` - Lớp của học sinh
- `sp_GetClassStudents` - Học sinh trong lớp

#### Attendance
- `sp_MarkAttendance` - Điểm danh
- `sp_GetSessionAttendance` - Điểm danh buổi học
- `sp_GetStudentAttendance` - Điểm danh của học sinh

#### Payments
- `sp_CreatePayment` - Tạo thanh toán
- `sp_UpdatePaymentStatus` - Cập nhật trạng thái
- `sp_GetStudentPayments` - Thanh toán của học sinh
- `sp_GetPaymentReport` - Báo cáo tài chính

---

## 10. Lưu ý quan trọng

### ⚠️ Security
- Mật khẩu được hash bằng bcrypt (cost factor 10)
- Sử dụng JWT cho authentication
- Validate input ở cả frontend và backend
- SQL injection prevention: sử dụng parameterized queries
- XSS prevention: sanitize user input

### 📊 Performance
- Indexes đã được tạo cho các foreign keys
- Sử dụng pagination cho danh sách lớn
- Cache thông tin user sau khi login
- Optimize query với stored procedures

### 🔄 Data Integrity
- Foreign key constraints đảm bảo tính toàn vẹn
- Cascade delete cho các bảng phụ thuộc
- Unique constraints cho email, code
- Check constraints cho status, payment_method

### 📝 Best Practices
- Luôn backup database trước khi chạy migration
- Test trên môi trường dev trước khi deploy
- Ghi log mọi thao tác quan trọng (ACTIVITY_LOGS)
- Sử dụng transactions cho các thao tác phức tạp

---

## 11. Troubleshooting

### Lỗi kết nối database
```
Error: Login failed for user 'sa'
```
**Giải pháp:** Kiểm tra lại password trong `.env`, đảm bảo SQL Server đã enable SQL Authentication

### Lỗi CORS
```
Access to XMLHttpRequest blocked by CORS policy
```
**Giải pháp:** Kiểm tra CORS config trong backend, đảm bảo frontend origin được allow

### Lỗi 404 Not Found
```
POST http://localhost:3001/api/auth/login 404
```
**Giải pháp:** Kiểm tra `VITE_API_BASE_URL` trong `.env` frontend, đảm bảo không có `/api` suffix

### Lỗi duplicate key
```
Cannot insert duplicate key in object 'dbo.USERS'
```
**Giải pháp:** Email hoặc code đã tồn tại, kiểm tra unique constraints

---

## 12. Roadmap & Future Features

### 🔮 Tính năng dự kiến

**Phase 1 (Đã hoàn thành):**
- ✅ User management với RBAC
- ✅ Course & Class management
- ✅ Enrollment & Attendance
- ✅ Assignment & Grading
- ✅ Payment tracking
- ✅ News & Notifications

**Phase 2 (Đang phát triển):**
- 🔄 Video learning platform
- 🔄 Real-time chat (Teacher-Student)
- 🔄 Mobile app (React Native)
- 🔄 Advanced analytics dashboard

**Phase 3 (Kế hoạch):**
- 📅 AI-powered recommendation system
- 📅 Online exam proctoring
- 📅 Certificate generation
- 📅 Integration with payment gateways
- 📅 Automated email/SMS notifications

---

## 📞 Contact & Support

- **Documentation:** [GitHub Wiki](#)
- **Issues:** [GitHub Issues](#)
- **Email:** support@dmt.edu.vn

---

**Last Updated:** 2025-01-XX  
**Version:** 1.0.0  
**Database Schema Version:** v1.0

---

## 4. Quy tắc phân quyền

| Role    | Chức năng chính                                    |
| ------- | -------------------------------------------------- |
| admin   | Toàn quyền quản lý hệ thống                        |
| teacher | Quản lý lớp dạy, tạo assignments/videos, chấm điểm |
| ta      | Hỗ trợ GV trong lớp, chấm điểm nếu được cấp quyền  |
| student | Xem học liệu, nộp bài, xem điểm cá nhân            |
| staff   | Hỗ trợ vận hành: enrollment, attendance…           |

---

## 5. Luồng dữ liệu tóm tắt

1. Tạo `users` với `role_id`, tạo profile mở rộng nếu cần (`students`/`teachers`/`staffs`/`admins`)
2. Tạo `subjects` → `courses` → `classes` → `class_meetings`
3. Tạo `skills` → `course_components`
4. Ghi danh học sinh (`enrollments`)
5. Thêm tài liệu (`materials`) và video (`videos`)
6. Tạo bài tập (`assignments`) → học sinh nộp (`submissions`) → chấm điểm (`grades`)
7. Tổng hợp điểm (`grade_aggregates`, `grade_component_aggregates`)
8. Theo dõi qua `attendance`, `video_access_logs`, `audit_logs`
