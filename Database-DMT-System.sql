Project "Education Center - Lean (with profiles)" {
  database_type: "SqlServer"
}

// ===== RBAC & Profiles =====
Table roles {
  id int [pk, increment]
  code varchar(50) [not null, unique] // admin, teacher, ta, student, staff
  name varchar(100)
  capabilities_json text
}

Table users {
  id int [pk, increment]
  role_id int [not null, ref: > roles.id]
  email varchar(255) [not null, unique]
  password_hash varchar(255) [not null]
  full_name varchar(255)
  status boolean
  created_at datetime
  updated_at datetime
}

Table students {
  id int [pk, increment]
  user_id int [not null, unique, ref: > users.id] // 1-1 with users
  student_code varchar(50)
  school_level varchar(50)
}

Table teachers {
  id int [pk, increment]
  user_id int [not null, unique, ref: > users.id] // 1-1 with users
  main_subject_id int [ref: > subjects.id]
  years_experience int
  degree varchar(255)
}

Table staffs {
  id int [pk, increment]
  user_id int [not null, unique, ref: > users.id] // 1-1 with users
  department varchar(120)
  position varchar(120)
}

Table admins {
  id int [pk, increment]
  user_id int [not null, unique, ref: > users.id] // 1-1 with users
  super_admin boolean
}

// ===== Academics =====
Table subjects {
  id int [pk, increment]
  name varchar(120) [not null]
  slug varchar(120) [not null, unique]
}

Table courses {
  id int [pk, increment]
  subject_id int [not null, ref: > subjects.id]
  code varchar(50) [not null, unique]
  name varchar(255) [not null]
  description text
  duration_weeks int
  price decimal(12,2)
  is_online boolean
}

Table classes {
  id int [pk, increment]
  course_id int [not null, ref: > courses.id]
  code varchar(50) [not null, unique]
  name varchar(255)
  teacher_id int [ref: > users.id] // must be role=teacher
  ta_id int [ref: > users.id]      // must be role=ta
  modality varchar(20)             // online/offline/hybrid
  capacity int
  visibility varchar(20)           // public/private
  created_at datetime
}

Table class_meetings {
  id int [pk, increment]
  class_id int [not null, ref: > classes.id]
  meeting_no int
  start_at datetime
  end_at datetime
  online_link varchar(500)
}

Table enrollments {
  id int [pk, increment]
  class_id int [not null, ref: > classes.id]
  student_id int [not null, ref: > students.id]
  enrolled_at datetime
  status varchar(20) // active/completed/dropped
  Indexes {
    (class_id, student_id) [unique]
  }
}

Table attendance {
  id int [pk, increment]
  meeting_id int [not null, ref: > class_meetings.id]
  enrollment_id int [not null, ref: > enrollments.id]
  status varchar(20) // present/late/absent/excused
  checkin_at datetime
  note varchar(255)
  Indexes {
    (meeting_id, enrollment_id) [unique]
  }
}

// ===== Course Components (generalized) =====
Table skills {
  id int [pk, increment]
  code varchar(40) [not null, unique] // e.g. READING, ALGEBRA_8
  name varchar(120) [not null]
}

Table course_components {
  id int [pk, increment]
  course_id int [not null, ref: > courses.id]
  skill_id int [ref: > skills.id]
  name varchar(120)
  sort_order int
  weight_percent decimal(5,2) // 0..100
}

Table grade_component_aggregates {
  id int [pk, increment]
  enrollment_id int [not null, ref: > enrollments.id]
  course_component_id int [not null, ref: > course_components.id]
  total_score decimal(8,2)
  last_calculated_at datetime
  Indexes {
    (enrollment_id, course_component_id) [unique]
  }
}

// ===== Learning Assets =====
Table materials {
  id int [pk, increment]
  title varchar(255) [not null]
  type varchar(30) // pdf/doc/link
  file_url varchar(500)
  can_download boolean
  tags varchar(255)
  created_at datetime
  class_id int [ref: > classes.id]
  course_id int [ref: > courses.id]
  course_component_id int [ref: > course_components.id]
}

Table videos {
  id int [pk, increment]
  title varchar(255) [not null]
  provider varchar(50) // vimeo/youtube/private
  video_url varchar(500) [not null]
  duration_sec int
  created_at datetime
  class_id int [ref: > classes.id]
  meeting_id int [ref: > class_meetings.id]
  course_component_id int [ref: > course_components.id]
}

Table video_access_logs {
  id int [pk, increment]
  video_id int [not null, ref: > videos.id]
  user_id int [not null, ref: > users.id]
  played_at datetime
  seconds_watched int
  device_fingerprint varchar(120)
  ip varchar(64)
}

// ===== Assignments & Grading =====
Table assignments {
  id int [pk, increment]
  class_id int [not null, ref: > classes.id]
  created_by int [not null, ref: > users.id] // teacher/ta
  course_component_id int [ref: > course_components.id]
  title varchar(255) [not null]
  type varchar(20)  // homework/quiz/exam
  open_at datetime
  due_at datetime
  max_score decimal(8,2)
  attachments_json text
  created_at datetime
}

Table submissions {
  id int [pk, increment]
  assignment_id int [not null, ref: > assignments.id]
  enrollment_id int [not null, ref: > enrollments.id]
  submitted_at datetime
  text_answer text
  file_url varchar(500)
  status varchar(20) // draft/submitted
  late_seconds int
  Indexes {
    (assignment_id, enrollment_id) [unique]
  }
}

Table grades {
  id int [pk, increment]
  submission_id int [not null, unique, ref: > submissions.id] // 1-1
  grader_id int [not null, ref: > users.id]
  score decimal(8,2)
  feedback text
  graded_at datetime
}

Table grade_items {
  id int [pk, increment]
  class_id int [not null, ref: > classes.id]
  name varchar(120) [not null] // Quiz, Final...
  weight decimal(6,3)          // 0..1 or %
  drop_lowest boolean
}

Table grade_aggregates {
  id int [pk, increment]
  enrollment_id int [not null, unique, ref: > enrollments.id]
  total_score decimal(8,2)
  last_calculated_at datetime
}

// ===== Ops =====
Table audit_logs {
  id int [pk, increment]
  user_id int [ref: > users.id]
  action varchar(100) [not null]
  entity varchar(100)
  entity_id int
  meta_json text
  created_at datetime
}

Table site_settings {
  key varchar(120) [pk]
  value text
  description varchar(255)
}

// ===== Table Groups (hiển thị cho đẹp) =====
TableGroup "RBAC & Profiles" {
  roles
  users
  students
  teachers
  staffs
  admins
}

TableGroup "Academics" {
  subjects
  courses
  classes
  class_meetings
  enrollments
  attendance
}

TableGroup "Course Components" {
  skills
  course_components
  grade_component_aggregates
}

TableGroup "Learning Assets" {
  materials
  videos
  video_access_logs
}

TableGroup "Assignments & Grades" {
  assignments
  submissions
  grades
  grade_items
  grade_aggregates
}

TableGroup "Ops" {
  audit_logs
  site_settings
}

