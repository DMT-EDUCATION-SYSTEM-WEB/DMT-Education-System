Project "Education Center Platform" {
  database_type: "SqlServer"
  Note: 'Schema tổng quát cho trung tâm giáo dục: tài khoản & RBAC, chương trình học, học liệu, bài tập/điểm, khảo sát, tài chính, truyền thông & vận hành.'
}

CREATE DATABASE dmt_edu;
USE dmt_edu;
/* =========================
   1) USERS & RBAC
   ========================= */

Table users {
  id               bigint [pk, increment]
  email            varchar(255) [unique, not null]
  phone            varchar(30)
  password_hash    varchar(255) [not null]
  full_name        varchar(255)
  dob              date
  gender           varchar(20)
  avatar_url       varchar(500)
  status           boolean [default: true] // active/inactive
  locale           varchar(10)
  created_at       datetime [default: `GETUTCDATE()`]
  updated_at       datetime
  Note: 'Tài khoản đăng nhập chung cho HS, PH, GV, TG, Staff'
}

Table roles {
  id     bigint [pk, increment]
  code   varchar(50) [unique, not null] // admin, teacher, ta, student, guardian, staff
  name   varchar(100) [not null]
}

Table permissions {
  id     bigint [pk, increment]
  code   varchar(100) [unique, not null]
  description varchar(255)
}

Table user_roles {
  user_id bigint [not null]
  role_id bigint [not null]
  created_at datetime [default: `GETUTCDATE()`]

  Indexes {
    (user_id, role_id) [unique]
  }
}

Table role_permissions {
  role_id bigint [not null]
  permission_id bigint [not null]

  Indexes {
    (role_id, permission_id) [unique]
  }
}

Table students {
  id           bigint [pk, increment]
  user_id      bigint [not null, unique]
  student_code varchar(50)
  school_level varchar(50)
  Note: 'Hồ sơ học sinh gắn 1-1 với users'
}

Table guardians {
  id      bigint [pk, increment]
  user_id bigint [not null, unique]
  Note: 'Hồ sơ phụ huynh gắn 1-1 với users'
}

Table guardian_students {
  guardian_id bigint [not null]
  student_id  bigint [not null]
  relationship varchar(50)

  Indexes {
    (guardian_id, student_id) [unique]
  }
}

Table staff {
  id       bigint [pk, increment]
  user_id  bigint [not null, unique]
  position varchar(100)
  status   boolean [default: true]
  hire_date date
}

Table sessions {
  id                bigint [pk, increment]
  user_id           bigint [not null]
  device_fingerprint varchar(120)
  ip                varchar(64)
  user_agent        varchar(255)
  is_active         boolean [default: true]
  last_seen_at      datetime
  created_at        datetime [default: `GETUTCDATE()`]
}

Table devices {
  id            bigint [pk, increment]
  user_id       bigint [not null]
  registered_at datetime [default: `GETUTCDATE()`]
  last_used_at  datetime
  fingerprint   varchar(120)
}

Table audit_logs {
  id         bigint [pk, increment]
  user_id    bigint
  action     varchar(100) [not null]
  entity     varchar(100)
  entity_id  bigint
  meta_json  text
  created_at datetime [default: `GETUTCDATE()`]
}

/* =========================
   2) ORGANIZATION (Cơ sở)
   ========================= */

Table campuses {
  id       bigint [pk, increment]
  name     varchar(120) [not null]
  city     varchar(120)
  address  varchar(255)
  timezone varchar(50)
}

Table rooms {
  id         bigint [pk, increment]
  campus_id  bigint
  name       varchar(50) [not null]
  capacity   int
}

/* =========================
   3) ACADEMIC CORE
   ========================= */

Table subjects {
  id    bigint [pk, increment]
  name  varchar(120) [not null]
  slug  varchar(120) [unique]
}

Table courses {
  id             bigint [pk, increment]
  subject_id     bigint
  title          varchar(255) [not null]
  code           varchar(50) [unique, not null]
  description    text
  target_level   varchar(80)
  duration_weeks int
  price          decimal(12,2)
  is_online      boolean [default: false]
}

Table course_runs {
  id          bigint [pk, increment]
  course_id   bigint [not null]
  name        varchar(120) // term/đợt
  start_date  date
  end_date    date
  status      varchar(30) // planned/active/completed
}

Table classes {
  id             bigint [pk, increment]
  course_run_id  bigint [not null]
  room_id        bigint
  code           varchar(50) [unique, not null]
  modality       varchar(20) // online/offline/hybrid
  capacity       int
  visibility     varchar(20) // public/private
  created_at     datetime [default: `GETUTCDATE()`]
}

Table class_teachers {
  class_id      bigint [not null]
  user_id       bigint [not null] // teacher/ta
  role_in_class varchar(20) // teacher | ta

  Indexes {
    (class_id, user_id) [unique]
  }
}

Table class_meetings {
  id         bigint [pk, increment]
  class_id   bigint [not null]
  meeting_no int
  start_at   datetime
  end_at     datetime
  online_link varchar(500)
  record_policy varchar(50)
}

Table timetables {
  id        bigint [pk, increment]
  class_id  bigint [not null]
  weekday   int // 1-7
  start_time time
  end_time   time
  repeat_rule varchar(100)
}

Table enrollments {
  id          bigint [pk, increment]
  class_id    bigint [not null]
  student_id  bigint [not null]
  enrolled_at datetime [default: `GETUTCDATE()`]
  status      varchar(20) // active/completed/dropped
  expired_at  datetime

  Indexes {
    (class_id, student_id) [unique]
  }
}

Table attendance {
  id             bigint [pk, increment]
  meeting_id     bigint [not null]
  enrollment_id  bigint [not null]
  status         varchar(20) // present/late/absent/excused
  checkin_at     datetime
  note           varchar(255)

  Indexes {
    (meeting_id, enrollment_id) [unique]
  }
}

/* =========================
   4) MATERIALS & VIDEOS
   ========================= */

Table folders {
  id        bigint [pk, increment]
  parent_id bigint
  name      varchar(120)
  scope     varchar(20) // course/class/global
}

Table materials {
  id         bigint [pk, increment]
  class_id   bigint
  course_id  bigint
  folder_id  bigint
  title      varchar(255) [not null]
  type       varchar(30) // pdf/doc/link
  file_url   varchar(500)
  can_download boolean [default: false]
  created_at datetime [default: `GETUTCDATE()`]
}

Table videos {
  id           bigint [pk, increment]
  class_id     bigint
  meeting_id   bigint
  title        varchar(255) [not null]
  provider     varchar(50) // youtube/vimeo/cloud
  video_url    varchar(500) [not null]
  duration_sec int
  downloadable boolean [default: false]
  created_at   datetime [default: `GETUTCDATE()`]
}

Table video_access_logs {
  id                 bigint [pk, increment]
  video_id           bigint [not null]
  user_id            bigint [not null]
  played_at          datetime [default: `GETUTCDATE()`]
  seconds_watched    int
  device_fingerprint varchar(120)
  ip                 varchar(64)
}

/* =========================
   5) ASSIGNMENTS & GRADING
   ========================= */

Table assignments {
  id          bigint [pk, increment]
  class_id    bigint [not null]
  created_by  bigint [not null] // users.id
  title       varchar(255) [not null]
  type        varchar(20) // homework/quiz/exam
  open_at     datetime
  due_at      datetime
  max_score   decimal(8,2)
  attachments_json text
  created_at  datetime [default: `GETUTCDATE()`]
}

Table submissions {
  id            bigint [pk, increment]
  assignment_id bigint [not null]
  enrollment_id bigint [not null]
  submitted_at  datetime
  text_answer   text
  file_url      varchar(500)
  status        varchar(20) // draft/submitted
  late_seconds  int

  Indexes {
    (assignment_id, enrollment_id) [unique]
  }
}

Table grades {
  id            bigint [pk, increment]
  submission_id bigint [not null]
  grader_id     bigint [not null] // users.id
  score         decimal(8,2)
  feedback      text
  graded_at     datetime
  visible_to_guardian boolean [default: true]
}

Table grade_items {
  id        bigint [pk, increment]
  class_id  bigint [not null]
  name      varchar(120) [not null]
  weight    decimal(6,3)
  drop_lowest boolean [default: false]
}

Table grade_aggregates {
  id               bigint [pk, increment]
  enrollment_id    bigint [not null]
  total_score      decimal(8,2)
  letter_grade     varchar(5)
  last_calculated_at datetime
}

Table comments {
  id                 bigint [pk, increment]
  enrollment_id      bigint [not null]
  author_id          bigint [not null] // users.id
  category           varchar(30) // progress/behavior
  content            text
  visible_to_guardian boolean [default: true]
  created_at         datetime [default: `GETUTCDATE()`]
}

/* =========================
   6) SURVEYS
   ========================= */

Table surveys {
  id          bigint [pk, increment]
  scope       varchar(20) // class/course/global
  title       varchar(255) [not null]
  open_at     datetime
  close_at    datetime
  visible_to_roles varchar(100)
}

Table survey_questions {
  id         bigint [pk, increment]
  survey_id  bigint [not null]
  type       varchar(20) // likert/text/mcq
  question   varchar(500) [not null]
  options_json text
}

Table survey_responses {
  id         bigint [pk, increment]
  survey_id  bigint [not null]
  user_id    bigint [not null]
  submitted_at datetime
}

Table survey_answers {
  id           bigint [pk, increment]
  response_id  bigint [not null]
  question_id  bigint [not null]
  answer_text  text
  answer_value decimal(8,2)
}

/* =========================
   7) FINANCE
   ========================= */

Table invoices {
  id          bigint [pk, increment]
  student_id  bigint [not null]
  class_id    bigint
  issue_date  date
  due_date    date
  status      varchar(20) // draft/unpaid/paid/void
  total_amount decimal(12,2) [not null, default: 0]
  currency    varchar(10) [default: 'VND']
}

Table invoice_items {
  id           bigint [pk, increment]
  invoice_id   bigint [not null]
  description  varchar(255)
  qty          int [default: 1]
  unit_price   decimal(12,2) [not null, default: 0]
  discount_amount decimal(12,2) [default: 0]
}

Table payments {
  id         bigint [pk, increment]
  invoice_id bigint [not null]
  method     varchar(30) // cash/bank/online
  paid_at    datetime
  amount     decimal(12,2) [not null, default: 0]
  txn_ref    varchar(120)
  recorded_by bigint // users.id
}

Table promotions {
  id           bigint [pk, increment]
  code         varchar(40) [unique, not null]
  type         varchar(20) // percent/fixed
  value        decimal(12,2)
  start_at     datetime
  end_at       datetime
  usage_limit  int
}

Table invoice_promotions {
  invoice_id   bigint [not null]
  promotion_id bigint [not null]

  Indexes {
    (invoice_id, promotion_id) [unique]
  }
}

Table scholarships {
  id         bigint [pk, increment]
  student_id bigint [not null]
  name       varchar(120)
  percent    decimal(5,2)
  start_at   datetime
  end_at     datetime
  note       varchar(255)
}

/* =========================
   8) COMMS & OPERATIONS
   ========================= */

Table announcements {
  id         bigint [pk, increment]
  title      varchar(255) [not null]
  body       text
  audience   varchar(30) // all/students/parents/teachers
  publish_at datetime
  expires_at datetime
  pinned     boolean [default: false]
}

Table blog_posts {
  id          bigint [pk, increment]
  author_id   bigint [not null] // users.id
  title       varchar(255) [not null]
  slug        varchar(255) [unique]
  body        text
  cover_url   varchar(500)
  published_at datetime
  status      varchar(20) // draft/published
}

Table events {
  id          bigint [pk, increment]
  campus_id   bigint
  title       varchar(255) [not null]
  start_at    datetime
  end_at      datetime
  description text
  registration_url varchar(500)
}

Table testimonials {
  id         bigint [pk, increment]
  user_id    bigint
  quote      text
  rating     int
  show_on_home boolean [default: false]
}

Table reviews {
  id          bigint [pk, increment]
  class_id    bigint
  user_id     bigint [not null]
  rating      int
  comment     text
  published_at datetime
  approved    boolean [default: false]
}

Table notifications {
  id          bigint [pk, increment]
  user_id     bigint [not null]
  channel     varchar(20) // email/sms/push
  template    varchar(120)
  payload_json text
  sent_at     datetime
  status      varchar(20)
}

Table message_threads {
  id        bigint [pk, increment]
  subject   varchar(255)
  scope     varchar(30) // class/enrollment
}

Table messages {
  id         bigint [pk, increment]
  thread_id  bigint [not null]
  sender_id  bigint [not null] // users.id
  body       text
  attachments_json text
  sent_at    datetime
}

Table support_tickets {
  id          bigint [pk, increment]
  user_id     bigint [not null]
  category    varchar(50)
  subject     varchar(255)
  status      varchar(20) // open/pending/closed
  created_at  datetime [default: `GETUTCDATE()`]
  closed_at   datetime
}

Table ticket_comments {
  id          bigint [pk, increment]
  ticket_id   bigint [not null]
  author_id   bigint [not null] // users.id
  body        text
  created_at  datetime [default: `GETUTCDATE()`]
}

/* =========================
   9) POLICIES & STORAGE
   ========================= */

Table account_policies {
  id                     bigint [pk, increment]
  name                   varchar(120)
  enroll_grace_days      int [default: 0]
  post_course_access_days int [default: 0] // thời gian xem video sau khóa
  auto_deactivate        boolean [default: true]
}

Table user_account_states {
  user_id            bigint [pk] // 1-1
  policy_id          bigint
  state              varchar(20) // active/expired/suspended
  expires_at         datetime
  last_state_change_at datetime
}

Table deactivation_logs {
  id        bigint [pk, increment]
  user_id   bigint [not null]
  reason    varchar(255)
  at        datetime [default: `GETUTCDATE()`]
}

Table storage_files {
  id           bigint [pk, increment]
  owner_user_id bigint
  path         varchar(500)
  mime         varchar(120)
  size         bigint
  checksum     varchar(120)
  created_at   datetime [default: `GETUTCDATE()`]
}

Table site_settings {
  key         varchar(120) [pk]
  value       text
  description varchar(255)
}

/* =========================
   RELATIONSHIPS
   ========================= */

Ref: user_roles.user_id > users.id
Ref: user_roles.role_id > roles.id
Ref: role_permissions.role_id > roles.id
Ref: role_permissions.permission_id > permissions.id
Ref: students.user_id > users.id
Ref: guardians.user_id > users.id
Ref: guardian_students.guardian_id > guardians.id
Ref: guardian_students.student_id > students.id
Ref: staff.user_id > users.id
Ref: sessions.user_id > users.id
Ref: devices.user_id > users.id
Ref: audit_logs.user_id > users.id

Ref: rooms.campus_id > campuses.id

Ref: courses.subject_id > subjects.id
Ref: course_runs.course_id > courses.id
Ref: classes.course_run_id > course_runs.id
Ref: classes.room_id > rooms.id
Ref: class_teachers.class_id > classes.id
Ref: class_teachers.user_id > users.id
Ref: class_meetings.class_id > classes.id
Ref: timetables.class_id > classes.id
Ref: enrollments.class_id > classes.id
Ref: enrollments.student_id > students.id
Ref: attendance.meeting_id > class_meetings.id
Ref: attendance.enrollment_id > enrollments.id

Ref: folders.parent_id > folders.id
Ref: materials.class_id > classes.id
Ref: materials.course_id > courses.id
Ref: materials.folder_id > folders.id
Ref: videos.class_id > classes.id
Ref: videos.meeting_id > class_meetings.id
Ref: video_access_logs.video_id > videos.id
Ref: video_access_logs.user_id > users.id

Ref: assignments.class_id > classes.id
Ref: assignments.created_by > users.id
Ref: submissions.assignment_id > assignments.id
Ref: submissions.enrollment_id > enrollments.id
Ref: grades.submission_id > submissions.id
Ref: grades.grader_id > users.id
Ref: grade_items.class_id > classes.id
Ref: grade_aggregates.enrollment_id > enrollments.id
Ref: comments.enrollment_id > enrollments.id
Ref: comments.author_id > users.id

Ref: survey_questions.survey_id > surveys.id
Ref: survey_responses.survey_id > surveys.id
Ref: survey_responses.user_id > users.id
Ref: survey_answers.response_id > survey_responses.id
Ref: survey_answers.question_id > survey_questions.id

Ref: invoices.student_id > students.id
Ref: invoices.class_id > classes.id
Ref: invoice_items.invoice_id > invoices.id
Ref: payments.invoice_id > invoices.id
Ref: promotions.id < invoice_promotions.promotion_id
Ref: invoices.id < invoice_promotions.invoice_id
Ref: scholarships.student_id > students.id

Ref: blog_posts.author_id > users.id
Ref: events.campus_id > campuses.id
Ref: testimonials.user_id > users.id
Ref: reviews.class_id > classes.id
Ref: reviews.user_id > users.id
Ref: notifications.user_id > users.id
Ref: messages.thread_id > message_threads.id
Ref: messages.sender_id > users.id
Ref: support_tickets.user_id > users.id
Ref: ticket_comments.ticket_id > support_tickets.id
Ref: ticket_comments.author_id > users.id

Ref: user_account_states.policy_id > account_policies.id
Ref: user_account_states.user_id > users.id
Ref: deactivation_logs.user_id > users.id
Ref: storage_files.owner_user_id > users.id

/* =========================
   TABLE GROUPS (no trailing commas)
   ========================= */

TableGroup "Organization" {
  campuses
  rooms
}

TableGroup "Academic Core" {
  subjects
  courses
  course_runs
  classes
  class_teachers
  class_meetings
  timetables
  enrollments
  attendance
}

TableGroup "Materials & Videos" {
  folders
  materials
  videos
  video_access_logs
}

TableGroup "Assignments & Grading" {
  assignments
  submissions
  grades
  grade_items
  grade_aggregates
  comments
}

TableGroup "Surveys" {
  surveys
  survey_questions
  survey_responses
  survey_answers
}

TableGroup "Finance" {
  invoices
  invoice_items
  payments
  promotions
  invoice_promotions
  scholarships
}

TableGroup "Comms & Ops" {
  announcements
  blog_posts
  events
  testimonials
  reviews
  notifications
  message_threads
  messages
  support_tickets
  ticket_comments
}

TableGroup "Policies & Storage" {
  account_policies
  user_account_states
  deactivation_logs
  storage_files
  site_settings
}

TableGroup "Users & RBAC" {
  users
  roles
  permissions
  user_roles
  role_permissions
  students
  guardians
  guardian_students
  staff
  sessions
  devices
  audit_logs
}
