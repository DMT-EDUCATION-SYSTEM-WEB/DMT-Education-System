# 🎯 NHIỆM VỤ NÂNG CẤP GIAO DIỆN TEACHER & STAFF

**Ngày tạo:** 12/11/2025  
**Mục tiêu:** Nâng cấp giao diện Teacher và Staff với style hiện đại tương tự Admin, bổ sung các chức năng thiếu

---

## 📋 MỤC LỤC

1. [Tổng quan](#1-tổng-quan)
2. [Teacher Module Upgrade](#2-teacher-module-upgrade)
3. [Staff Module Upgrade](#3-staff-module-upgrade)
4. [Database Updates](#4-database-updates)
5. [Timeline](#5-timeline)

---

## 1. TỔNG QUAN

### 1.1. Hiện trạng

**Teacher Module:**
- ✅ Có Dashboard, Calendar, Assignments, Grading, Materials, Reports
- ⚠️ Đang dùng mock data
- ⚠️ Chưa có Attendance Marking UI
- ⚠️ UI chưa đồng nhất với Admin (thiếu modern styling)

**Staff Module:**
- ❌ Không có Dashboard
- ⚠️ Chỉ có Support, Tasks, Tickets pages
- ⚠️ Thiếu các chức năng quản lý học vụ, tài chính
- ⚠️ UI cơ bản, chưa có modern design

### 1.2. Mục tiêu nâng cấp

**Teacher:**
- Modernize UI với design system tương tự Admin
- Tích hợp real API thay mock data
- Thêm Attendance Marking interface
- Cải thiện Assignment & Grading workflow
- Thêm Class Management features

**Staff:**
- Tạo mới Dashboard với statistics
- Thêm Student Registration workflow
- Thêm Payment Processing interface
- Thêm Enrollment Management
- Thêm Class Schedule Management
- Modernize UI toàn bộ

---

## 2. TEACHER MODULE UPGRADE

### 📊 PHASE 1: MODERNIZE DASHBOARD (2 ngày)

#### **TASK T1.1: Redesign Dashboard Layout**
**File:** `/src/features/teachers/pages/Dashboard.tsx`

**Requirements:**
- Áp dụng AdminLayout style với gradient background
- Stats cards với glass-morphism effect
- Modern color scheme (red theme)
- Responsive grid layout

**Components cần tạo/sửa:**

```typescript
// /src/features/teachers/components/TeacherStatCard.tsx
interface TeacherStatCardProps {
  title: string;
  value: string | number;
  icon: React.ComponentType;
  color: string;
  trend?: number;
  subtitle?: string;
}

const TeacherStatCard: React.FC<TeacherStatCardProps> = ({ 
  title, value, icon: Icon, color, trend, subtitle 
}) => (
  <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-all">
    <div className="flex items-start justify-between">
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <h3 className="text-3xl font-bold text-gray-900 mt-2">{value}</h3>
        {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
      </div>
      <div className={`p-3 rounded-lg ${color}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
    </div>
    {trend && (
      <div className="mt-3 flex items-center text-sm">
        <span className={trend > 0 ? 'text-green-600' : 'text-red-600'}>
          {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
        </span>
        <span className="text-gray-500 ml-2">so với tháng trước</span>
      </div>
    )}
  </div>
);
```

**Dashboard Stats:**
```typescript
// Statistics to display
const stats = [
  {
    title: 'Tổng lớp đang dạy',
    value: classesData.length,
    icon: BookOpen,
    color: 'bg-blue-500',
  },
  {
    title: 'Tổng học viên',
    value: totalStudents,
    icon: Users,
    color: 'bg-green-500',
  },
  {
    title: 'Bài chưa chấm',
    value: pendingGradingCount,
    icon: ClipboardCheck,
    color: 'bg-red-500',
    trend: -15,
  },
  {
    title: 'Buổi học tuần này',
    value: upcomingSessions,
    icon: Calendar,
    color: 'bg-purple-500',
  },
];
```

**Dashboard Sections:**
1. **Quick Stats** - 4 stat cards (Classes, Students, Pending Grading, Sessions)
2. **My Classes** - List of active classes với quick actions
3. **Upcoming Sessions** - Calendar widget với sessions 7 ngày tới
4. **Recent Submissions** - Latest student submissions cần chấm
5. **Attendance Overview** - Chart hiển thị attendance rate per class

---

#### **TASK T1.2: Integrate Real APIs**
**Dependencies:** Backend APIs phải sẵn sàng

**API Endpoints cần:**
```typescript
// /src/services/teacherAPI.ts
export const teacherAPI = {
  // Classes
  getMyClasses: (teacherId: number) => 
    GET /classes/teacher/:teacherId,
  
  getClassDetails: (classId: number) => 
    GET /classes/:classId,
  
  getClassStudents: (classId: number) => 
    GET /classes/:classId/students,
  
  // Assignments
  getMyAssignments: (teacherId: number) => 
    GET /assignments/teacher/:teacherId,
  
  getPendingGrading: (teacherId: number) => 
    GET /submissions/pending?teacherId=:teacherId,
  
  // Sessions
  getUpcomingSessions: (teacherId: number, days: number) => 
    GET /sessions/teacher/:teacherId?days=:days,
  
  // Statistics
  getTeachingStats: (teacherId: number) => 
    GET /teachers/:teacherId/statistics,
};
```

**Implementation:**
```typescript
// Dashboard.tsx
const TeacherDashboard: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<TeacherStats | null>(null);
  const user = useSelector((state: RootState) => state.user);
  
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // Parallel fetch
        const [classes, statistics, upcomingSessions, pendingSubmissions] = 
          await Promise.all([
            teacherAPI.getMyClasses(user.teacherId),
            teacherAPI.getTeachingStats(user.teacherId),
            teacherAPI.getUpcomingSessions(user.teacherId, 7),
            teacherAPI.getPendingGrading(user.teacherId),
          ]);
        
        setStats({
          classes,
          totalStudents: statistics.totalStudents,
          pendingGrading: pendingSubmissions.length,
          upcomingSessions: upcomingSessions.length,
        });
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
        toast.error('Không thể tải dữ liệu dashboard');
      } finally {
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, [user.teacherId]);
  
  if (loading) {
    return <DashboardSkeleton />;
  }
  
  return (
    <div className="space-y-6">
      <DashboardHeader teacher={user} />
      <StatsGrid stats={stats} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MyClassesCard classes={stats.classes} />
        <UpcomingSessionsCard sessions={stats.upcomingSessions} />
      </div>
      <RecentSubmissionsTable submissions={stats.pendingSubmissions} />
    </div>
  );
};
```

---

### 📝 PHASE 2: ATTENDANCE MARKING (2 ngày)

#### **TASK T2.1: Create Attendance Marking Page**
**File:** `/src/features/teachers/pages/AttendanceMarking.tsx`

**Features:**
1. Class & Session selector
2. Student list with attendance checkboxes
3. Bulk actions (Mark All Present/Absent)
4. Individual notes for each student
5. Submit bulk attendance

**UI Design:**
```
┌─────────────────────────────────────────────────────────────┐
│ Điểm danh                                                    │
│                                                              │
│ ┌──────────────┐  ┌──────────────────────────┐             │
│ │ Chọn lớp ▼   │  │ Chọn buổi học ▼          │  [Lưu]      │
│ └──────────────┘  └──────────────────────────┘             │
│                                                              │
│ Lớp: Toán 10A | Buổi: 05/11/2025 - Chương 3               │
│ Thời gian: 18:00 - 20:00                                   │
│                                                              │
│ [✓ Tất cả có mặt] [✗ Tất cả vắng]                          │
│                                                              │
│ ┌─────────────────────────────────────────────────────┐    │
│ │ STT │ Mã HS      │ Họ và tên    │ Điểm danh        │    │
│ ├─────────────────────────────────────────────────────┤    │
│ │  1  │ HS2025001  │ Nguyễn Văn A │ ● Có ○ Vắng ○ Muộn │    │
│ │  2  │ HS2025002  │ Trần Thị B   │ ● Có ○ Vắng ○ Muộn │    │
│ │  3  │ HS2025003  │ Lê Văn C     │ ○ Có ● Vắng ○ Muộn │    │
│ │                  │ Ghi chú: [Ốm, có phép]              │    │
│ └─────────────────────────────────────────────────────┘    │
│                                                              │
│                [Hủy]  [Lưu điểm danh (24/25)]               │
└─────────────────────────────────────────────────────────────┘
```

**Component Structure:**
```typescript
// /src/features/teachers/components/AttendanceMarking/
├── AttendanceMarkingPage.tsx      // Main page
├── ClassSessionSelector.tsx       // Class & session dropdowns
├── StudentAttendanceList.tsx      // Student list with checkboxes
├── StudentAttendanceRow.tsx       // Individual student row
├── BulkActions.tsx                // Bulk mark buttons
└── AttendanceSummary.tsx          // Summary before submit
```

**Implementation:**
```typescript
// AttendanceMarkingPage.tsx
const AttendanceMarkingPage: React.FC = () => {
  const [selectedClass, setSelectedClass] = useState<number | null>(null);
  const [selectedSession, setSelectedSession] = useState<number | null>(null);
  const [students, setStudents] = useState<EnrollmentWithStudent[]>([]);
  const [attendanceData, setAttendanceData] = useState<Map<number, AttendanceRecord>>(
    new Map()
  );
  
  // Fetch enrollments when class selected
  useEffect(() => {
    if (selectedClass) {
      enrollmentAPI.getByClass(selectedClass)
        .then(data => setStudents(data))
        .catch(err => toast.error('Không thể tải danh sách học viên'));
    }
  }, [selectedClass]);
  
  const handleMarkAttendance = (enrollmentId: number, status: AttendanceStatus, notes?: string) => {
    setAttendanceData(prev => new Map(prev).set(enrollmentId, { status, notes }));
  };
  
  const handleBulkMark = (status: AttendanceStatus) => {
    const newData = new Map(attendanceData);
    students.forEach(student => {
      newData.set(student.enrollment_id, { status, notes: '' });
    });
    setAttendanceData(newData);
  };
  
  const handleSubmit = async () => {
    if (!selectedSession) {
      toast.error('Vui lòng chọn buổi học');
      return;
    }
    
    const attendanceList = Array.from(attendanceData.entries()).map(([enrollmentId, data]) => ({
      enrollment_id: enrollmentId,
      status: data.status,
      notes: data.notes || '',
    }));
    
    try {
      await attendanceAPI.bulkMark({
        session_id: selectedSession,
        marked_by: currentTeacher.id,
        attendance_data: attendanceList,
      });
      
      toast.success(`Đã điểm danh ${attendanceList.length}/${students.length} học viên`);
      
      // Reset
      setAttendanceData(new Map());
    } catch (error) {
      toast.error('Không thể lưu điểm danh');
    }
  };
  
  return (
    <div className="space-y-6">
      <PageHeader title="Điểm danh" />
      
      <ClassSessionSelector
        onClassChange={setSelectedClass}
        onSessionChange={setSelectedSession}
      />
      
      {selectedClass && selectedSession && (
        <>
          <BulkActions onMarkAll={handleBulkMark} />
          
          <StudentAttendanceList
            students={students}
            attendanceData={attendanceData}
            onMarkAttendance={handleMarkAttendance}
          />
          
          <AttendanceSummary
            total={students.length}
            marked={attendanceData.size}
            onSubmit={handleSubmit}
          />
        </>
      )}
    </div>
  );
};
```

---

#### **TASK T2.2: Attendance Statistics View**
**File:** `/src/features/teachers/pages/AttendanceStatistics.tsx`

**Features:**
- Xem attendance rate per class
- Filter by date range
- Export to Excel
- Highlight students với attendance thấp (<80%)

**Charts:**
- Line chart: Attendance rate over time
- Bar chart: Present/Absent/Late distribution
- Table: Student-wise attendance percentage

---

### 📚 PHASE 3: ASSIGNMENT & GRADING IMPROVEMENTS (3 ngày)

#### **TASK T3.1: Enhanced Assignment Creation**
**File:** `/src/features/teachers/pages/Assignments.tsx`

**New Features:**
1. Rich text editor cho assignment description (TipTap hoặc Quill)
2. File attachment support (PDF, DOCX, images)
3. Due date với time picker
4. Point value configuration
5. Rubric/criteria definition
6. Auto-notification to students

**Form Fields:**
```typescript
interface AssignmentFormData {
  class_id: number;
  title: string;
  description: string;          // Rich text
  instructions: string;          // Rich text
  attachments: File[];           // Multiple files
  due_date: Date;
  max_points: number;
  submission_type: 'FILE' | 'TEXT' | 'BOTH';
  allow_late: boolean;
  late_penalty_percent: number;
  rubric: {
    criteria: string;
    max_points: number;
  }[];
}
```

**UI Improvements:**
- Modal form thay vì full page
- Preview before submit
- Duplicate assignment feature
- Template library

---

#### **TASK T3.2: Grading Interface Redesign**
**File:** `/src/features/teachers/pages/Grading.tsx`

**Features:**
1. Side-by-side view: Submission + Grading form
2. PDF/Image viewer embedded
3. Rich text feedback editor
4. Quick grade buttons (A+, A, B+, etc.)
5. Rubric-based grading
6. Save draft grades
7. Batch grading for similar submissions

**UI Layout:**
```
┌─────────────────────────────────────────────────────────┐
│ Chấm bài - Bài tập Chương 3                             │
├───────────────────────┬─────────────────────────────────┤
│ Danh sách (12/25)     │ Bài nộp - Nguyễn Văn A         │
│                       │                                 │
│ ● Nguyễn Văn A        │ ┌─────────────────────────┐    │
│   HS2025001           │ │   PDF Viewer            │    │
│   85/100 ✓            │ │   [submission.pdf]      │    │
│                       │ │                         │    │
│ ● Trần Thị B          │ └─────────────────────────┘    │
│   HS2025002           │                                 │
│   Chưa chấm           │ Điểm: [85] / 100               │
│                       │                                 │
│ ● Lê Văn C            │ Nhận xét:                      │
│   HS2025003           │ ┌─────────────────────────┐    │
│   Chưa nộp            │ │ Bài làm tốt, logic đúng │    │
│                       │ │ Cần cải thiện phần...   │    │
│ ...                   │ └─────────────────────────┘    │
│                       │                                 │
│                       │ [Lưu nháp] [Lưu & Tiếp theo]   │
└───────────────────────┴─────────────────────────────────┘
```

**Keyboard Shortcuts:**
- `→` Next submission
- `←` Previous submission
- `Ctrl+S` Save draft
- `Ctrl+Enter` Save and next

---

### 📊 PHASE 4: REPORTS & ANALYTICS (2 ngày)

#### **TASK T4.1: Class Performance Reports**
**File:** `/src/features/teachers/pages/Reports.tsx`

**Reports:**
1. **Grade Distribution**
   - Histogram chart (Recharts)
   - Average, median, mode
   - Pass/fail rate

2. **Attendance Summary**
   - Per student attendance rate
   - Average attendance per session
   - Attendance trend over time

3. **Assignment Completion Rate**
   - On-time submission rate
   - Late submission rate
   - Missing assignments per student

4. **Student Progress Tracking**
   - Individual student report
   - Grade trend over time
   - Strengths & weaknesses

**Export Options:**
- PDF report
- Excel spreadsheet
- Print-friendly view

---

### 🎨 PHASE 5: UI/UX POLISH (2 ngày)

#### **TASK T5.1: Modernize Existing Pages**

**Pages to update:**
- **Calendar.tsx** - Apply modern event cards, better month/week/day view
- **Materials.tsx** - Card-based layout, better file icons, download tracking
- **Timesheet.tsx** - Modern time logging interface

**Design System:**
```typescript
// /src/features/teachers/styles/teacherTheme.ts
export const teacherTheme = {
  colors: {
    primary: '#dc2626',      // Red
    secondary: '#3b82f6',    // Blue
    success: '#10b981',      // Green
    warning: '#f59e0b',      // Orange
    danger: '#ef4444',       // Red
  },
  
  components: {
    card: 'bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all',
    button: {
      primary: 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700',
      secondary: 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50',
      success: 'bg-green-500 text-white hover:bg-green-600',
    },
    input: 'border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 focus:border-transparent',
  }
};
```

---

## 3. STAFF MODULE UPGRADE

### 📊 PHASE 1: CREATE STAFF DASHBOARD (2 ngày)

#### **TASK S1.1: Staff Dashboard Creation**
**File:** `/src/features/staff/pages/Dashboard.tsx` (NEW)

**Dashboard Sections:**
1. **Today's Overview**
   - Pending student registrations
   - Pending payment approvals
   - Support tickets assigned
   - Upcoming classes to manage

2. **Quick Actions**
   - Register new student
   - Process payment
   - Schedule class
   - Create announcement

3. **Statistics**
   - Students registered this month
   - Revenue collected this month
   - Active classes count
   - Resolved tickets count

4. **Recent Activities**
   - Latest student registrations
   - Recent payments
   - Class schedule changes
   - System notifications

**Stats Cards:**
```typescript
const staffStats = [
  {
    title: 'Học viên chờ duyệt',
    value: pendingRegistrations,
    icon: UserPlus,
    color: 'bg-blue-500',
    action: 'Xem danh sách',
  },
  {
    title: 'Thanh toán chờ xử lý',
    value: pendingPayments,
    icon: DollarSign,
    color: 'bg-green-500',
    action: 'Xử lý ngay',
  },
  {
    title: 'Tickets mới',
    value: newTickets,
    icon: MessageSquare,
    color: 'bg-red-500',
    action: 'Trả lời',
  },
  {
    title: 'Lớp học hôm nay',
    value: todayClasses,
    icon: Calendar,
    color: 'bg-purple-500',
    action: 'Xem lịch',
  },
];
```

---

### 👨‍🎓 PHASE 2: STUDENT MANAGEMENT (3 ngày)

#### **TASK S2.1: Student Registration Workflow**
**File:** `/src/features/staff/pages/StudentRegistration.tsx` (NEW)

**Features:**
1. **Multi-step Form**
   - Step 1: Personal info (Name, DOB, Phone, Address)
   - Step 2: Parent/Guardian info
   - Step 3: Academic info (School level, Subjects of interest)
   - Step 4: Account creation (Email, auto-generate password)
   - Step 5: Review & Submit

2. **Validation**
   - Email uniqueness check
   - Phone number format
   - Age validation based on school level
   - Required fields check

3. **Auto-generation**
   - Student code: `HS2025XXX`
   - Temporary password (email to parent)
   - Student card generation

**Form Component:**
```typescript
// /src/features/staff/components/StudentRegistrationForm.tsx
const StudentRegistrationForm: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<StudentRegistrationData>({
    // Personal info
    full_name: '',
    birth_date: '',
    gender: '',
    phone: '',
    address: '',
    
    // Parent info
    parent_name: '',
    parent_phone: '',
    parent_email: '',
    parent_relationship: '',
    
    // Academic info
    school_level: '',
    current_school: '',
    subjects_of_interest: [],
    
    // Account
    email: '',
    password: generateRandomPassword(),
  });
  
  const steps = [
    { title: 'Thông tin cá nhân', component: <PersonalInfoStep /> },
    { title: 'Thông tin phụ huynh', component: <ParentInfoStep /> },
    { title: 'Thông tin học vụ', component: <AcademicInfoStep /> },
    { title: 'Tạo tài khoản', component: <AccountCreationStep /> },
    { title: 'Xác nhận', component: <ReviewStep /> },
  ];
  
  const handleSubmit = async () => {
    try {
      const response = await authService.registerStudent(formData);
      
      toast.success(`Đăng ký thành công! Mã học viên: ${response.studentCode}`);
      
      // Print student card
      printStudentCard(response);
      
      // Navigate to student detail
      navigate(`/staff/students/${response.studentId}`);
    } catch (error) {
      toast.error('Đăng ký thất bại');
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <StepIndicator currentStep={step} totalSteps={5} />
      
      <div className="bg-white rounded-xl shadow-lg p-8 mt-6">
        {steps[step - 1].component}
      </div>
      
      <FormNavigation
        currentStep={step}
        totalSteps={5}
        onPrevious={() => setStep(s => s - 1)}
        onNext={() => setStep(s => s + 1)}
        onSubmit={handleSubmit}
      />
    </div>
  );
};
```

---

#### **TASK S2.2: Student List & Management**
**File:** `/src/features/staff/pages/StudentsManagement.tsx` (NEW)

**Features:**
1. **Student Table**
   - Columns: Code, Name, Phone, School Level, Status, Actions
   - Search by name, code, phone
   - Filter by school level, status
   - Sort by name, registration date
   - Pagination

2. **Actions**
   - View details
   - Edit info
   - Suspend/Activate account
   - View enrollments
   - View payment history
   - Print student card

3. **Bulk Operations**
   - Export to Excel
   - Send SMS/Email to selected students
   - Bulk status change

**Table Component:**
```typescript
// /src/features/staff/components/StudentsTable.tsx
const StudentsTable: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [filters, setFilters] = useState({
    search: '',
    school_level: '',
    status: '',
  });
  
  const columns = [
    { key: 'student_code', label: 'Mã HS', sortable: true },
    { key: 'full_name', label: 'Họ và tên', sortable: true },
    { key: 'phone', label: 'SĐT' },
    { key: 'school_level', label: 'Cấp học' },
    { 
      key: 'status', 
      label: 'Trạng thái',
      render: (row) => <StatusBadge status={row.status} />
    },
    {
      key: 'actions',
      label: 'Thao tác',
      render: (row) => <StudentActions student={row} />
    },
  ];
  
  return (
    <div className="space-y-4">
      <StudentsTableFilters filters={filters} onChange={setFilters} />
      
      <DataTable
        data={students}
        columns={columns}
        loading={loading}
        pagination={pagination}
        onPageChange={setPage}
      />
    </div>
  );
};
```

---

### 💰 PHASE 3: PAYMENT PROCESSING (2 ngày)

#### **TASK S3.1: Payment Recording Interface**
**File:** `/src/features/staff/pages/PaymentProcessing.tsx` (NEW)

**Features:**
1. **Payment Form**
   - Student search & select
   - Enrollment select (show fee details)
   - Amount input (validate <= remaining)
   - Payment method: CASH/BANK_TRANSFER/CREDIT_CARD/E_WALLET
   - Transaction reference
   - Receipt number (auto-generate)
   - Notes

2. **Fee Calculation**
   - Display: Total Fee, Paid Amount, Discount, Remaining
   - Auto-calculate remaining after payment
   - Support partial payments
   - Apply discounts

3. **Receipt Generation**
   - Print receipt after payment
   - PDF download
   - Email to parent (optional)

**Payment Form:**
```typescript
// /src/features/staff/components/PaymentForm.tsx
const PaymentForm: React.FC = () => {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [selectedEnrollment, setSelectedEnrollment] = useState<Enrollment | null>(null);
  const [paymentData, setPaymentData] = useState({
    amount: 0,
    method: 'CASH',
    transaction_reference: '',
    notes: '',
  });
  
  const feeDetails = {
    totalFee: selectedEnrollment?.total_fee || 0,
    paidAmount: selectedEnrollment?.paid_amount || 0,
    discount: selectedEnrollment?.discount_percent || 0,
    remaining: (selectedEnrollment?.total_fee || 0) - (selectedEnrollment?.paid_amount || 0),
  };
  
  const handleSubmit = async () => {
    try {
      const response = await paymentAPI.process({
        enrollment_id: selectedEnrollment!.id,
        amount: paymentData.amount,
        payment_method: paymentData.method,
        transaction_reference: paymentData.transaction_reference,
        notes: paymentData.notes,
        processed_by: currentUser.id,
      });
      
      toast.success('Đã ghi nhận thanh toán');
      
      // Print receipt
      printReceipt(response.receiptData);
      
      // Send email (optional)
      if (confirm('Gửi biên lai qua email?')) {
        await emailService.sendReceipt(response.receiptData);
      }
      
      // Reset form
      resetForm();
    } catch (error) {
      toast.error('Không thể ghi nhận thanh toán');
    }
  };
  
  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-2xl font-bold mb-6">Ghi nhận thanh toán</h2>
      
      <StudentSearchAutocomplete
        onSelect={setSelectedStudent}
        value={selectedStudent}
      />
      
      {selectedStudent && (
        <EnrollmentSelector
          studentId={selectedStudent.id}
          onSelect={setSelectedEnrollment}
          value={selectedEnrollment}
        />
      )}
      
      {selectedEnrollment && (
        <>
          <FeeDetailsCard details={feeDetails} />
          
          <PaymentMethodSelector
            value={paymentData.method}
            onChange={(method) => setPaymentData({...paymentData, method})}
          />
          
          <AmountInput
            value={paymentData.amount}
            max={feeDetails.remaining}
            onChange={(amount) => setPaymentData({...paymentData, amount})}
          />
          
          <NotesTextarea
            value={paymentData.notes}
            onChange={(notes) => setPaymentData({...paymentData, notes})}
          />
          
          <div className="flex justify-end gap-3 mt-6">
            <button onClick={resetForm} className="btn-secondary">
              Hủy
            </button>
            <button onClick={handleSubmit} className="btn-primary">
              Ghi nhận thanh toán
            </button>
          </div>
        </>
      )}
    </div>
  );
};
```

---

#### **TASK S3.2: Payment History & Reports**
**File:** `/src/features/staff/pages/PaymentHistory.tsx` (NEW)

**Features:**
1. **Payment List**
   - Table with columns: Date, Student, Class, Amount, Method, Status
   - Filter by: Date range, Payment method, Status, Student
   - Export to Excel
   - Total revenue summary

2. **Payment Details Modal**
   - Full payment info
   - Related enrollment details
   - Receipt preview
   - Actions: Reprint, Refund (if allowed)

3. **Revenue Analytics**
   - Chart: Daily/Weekly/Monthly revenue
   - Breakdown by payment method
   - Outstanding payments report
   - Refund history

---

### 📅 PHASE 4: ENROLLMENT MANAGEMENT (2 ngày)

#### **TASK S4.1: Enrollment Creation Workflow**
**File:** `/src/features/staff/pages/EnrollmentManagement.tsx` (NEW)

**Features:**
1. **Enroll Student to Class**
   - Student search & select
   - Available classes list (filter by subject, schedule)
   - Class details: Teacher, Schedule, Capacity, Price
   - Discount application
   - Payment plan (Full/Installments)
   - Auto-create invoice

2. **Validation**
   - Check class capacity
   - Check schedule conflicts
   - Prevent duplicate enrollment
   - Age/level compatibility check

3. **Batch Enrollment**
   - Enroll multiple students to same class
   - Upload Excel file with student list
   - Bulk discount application

**Enrollment Form:**
```typescript
// /src/features/staff/components/EnrollmentForm.tsx
const EnrollmentForm: React.FC = () => {
  const [student, setStudent] = useState<Student | null>(null);
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);
  const [discount, setDiscount] = useState(0);
  const [paymentPlan, setPaymentPlan] = useState<'FULL' | 'INSTALLMENTS'>('FULL');
  
  const totalFee = selectedClass ? 
    (selectedClass.price * (1 - discount / 100)) : 0;
  
  const handleEnroll = async () => {
    try {
      const response = await enrollmentAPI.create({
        class_id: selectedClass!.id,
        student_id: student!.id,
        total_fee: totalFee,
        discount_percent: discount,
        payment_plan: paymentPlan,
        notes: '',
      });
      
      toast.success('Đăng ký thành công!');
      
      // Print enrollment confirmation
      printEnrollmentConfirmation(response);
      
      // Navigate to payment if immediate payment
      if (confirm('Ghi nhận thanh toán ngay?')) {
        navigate(`/staff/payments/new?enrollmentId=${response.id}`);
      }
    } catch (error) {
      toast.error('Đăng ký thất bại');
    }
  };
  
  return (
    <div className="space-y-6">
      <StudentSearchCard onSelect={setStudent} />
      
      {student && (
        <AvailableClassesGrid
          onSelectClass={setSelectedClass}
          studentLevel={student.school_level}
        />
      )}
      
      {selectedClass && (
        <>
          <ClassDetailsCard classData={selectedClass} />
          
          <DiscountInput
            value={discount}
            onChange={setDiscount}
            maxDiscount={50}
          />
          
          <FeeCalculation
            originalPrice={selectedClass.price}
            discount={discount}
            totalFee={totalFee}
          />
          
          <PaymentPlanSelector
            value={paymentPlan}
            onChange={setPaymentPlan}
          />
          
          <FormActions onCancel={reset} onSubmit={handleEnroll} />
        </>
      )}
    </div>
  );
};
```

---

#### **TASK S4.2: Enrollment Status Management**
**File:** `/src/features/staff/pages/EnrollmentsManagement.tsx` (NEW)

**Features:**
1. **Enrollment List**
   - Filter by: Status, Class, Student, Date
   - Actions: View, Edit, Drop, Suspend, Reactivate
   - Status tracking: ACTIVE, COMPLETED, DROPPED, SUSPENDED

2. **Drop Enrollment**
   - Reason selection
   - Refund calculation (pro-rated based on sessions attended)
   - Confirmation dialog
   - Auto-update class capacity

3. **Transfer Student**
   - Transfer to different class
   - Same course, different schedule
   - Fee adjustment if applicable

---

### 🎨 PHASE 5: UI/UX MODERNIZATION (2 ngày)

#### **TASK S5.1: Redesign Existing Pages**

**Pages to update:**
- **Support.tsx** - Modern ticket management interface
- **Tasks.tsx** - Kanban board view
- **Tickets.tsx** - Enhanced ticket details, priority badges

**Design Updates:**
- Apply red theme consistently
- Glass-morphism cards
- Smooth animations
- Better typography
- Improved spacing & layout

---

## 4. DATABASE UPDATES

### 📊 TASK D1: Missing Tables & Fields

#### **TASK D1.1: Add Missing Fields**

**USERS table:**
```sql
-- Already has all needed fields
```

**TEACHERS table:**
```sql
-- Add bio field
ALTER TABLE TEACHERS ADD BIO NVARCHAR(MAX);

-- Add rating field
ALTER TABLE TEACHERS ADD RATING DECIMAL(3,2) DEFAULT 5.0;

-- Add total teaching hours
ALTER TABLE TEACHERS ADD TOTAL_TEACHING_HOURS INT DEFAULT 0;
```

**STAFF table:**
```sql
-- Add more fields
ALTER TABLE STAFF ADD HIRE_DATE DATE;
ALTER TABLE STAFF ADD SALARY DECIMAL(12,2);
ALTER TABLE STAFF ADD EMPLOYMENT_TYPE VARCHAR(20) DEFAULT 'FULL_TIME'; -- FULL_TIME, PART_TIME, CONTRACT
```

**ENROLLMENTS table:**
```sql
-- Add payment plan
ALTER TABLE ENROLLMENTS ADD PAYMENT_PLAN VARCHAR(20) DEFAULT 'FULL'; -- FULL, INSTALLMENTS

-- Add enrollment source
ALTER TABLE ENROLLMENTS ADD SOURCE VARCHAR(50); -- WALK_IN, ONLINE, REFERRAL, AGENT
```

---

#### **TASK D1.2: New Tables**

**PAYMENT_PLANS table:**
```sql
CREATE TABLE PAYMENT_PLANS (
  ID INT IDENTITY(1,1) PRIMARY KEY,
  ENROLLMENT_ID INT NOT NULL,
  PLAN_TYPE VARCHAR(20) NOT NULL, -- MONTHLY, QUARTERLY, CUSTOM
  TOTAL_INSTALLMENTS INT DEFAULT 1,
  INSTALLMENT_AMOUNT DECIMAL(12,2),
  DUE_DATE DATE,
  STATUS VARCHAR(20) DEFAULT 'ACTIVE', -- ACTIVE, COMPLETED, DEFAULTED
  CREATED_AT DATETIME2 DEFAULT GETDATE(),
  CONSTRAINT FK_PAYMENT_PLANS_ENROLLMENTS FOREIGN KEY (ENROLLMENT_ID) 
    REFERENCES ENROLLMENTS(ID) ON DELETE CASCADE
);
```

**RECEIPTS table:**
```sql
CREATE TABLE RECEIPTS (
  ID INT IDENTITY(1,1) PRIMARY KEY,
  PAYMENT_ID INT NOT NULL,
  RECEIPT_NUMBER VARCHAR(50) UNIQUE NOT NULL,
  ISSUED_DATE DATETIME2 DEFAULT GETDATE(),
  ISSUED_BY INT NOT NULL, -- user_id of staff
  PDF_URL VARCHAR(500),
  NOTES NVARCHAR(MAX),
  CREATED_AT DATETIME2 DEFAULT GETDATE(),
  CONSTRAINT FK_RECEIPTS_PAYMENTS FOREIGN KEY (PAYMENT_ID) 
    REFERENCES PAYMENTS(ID),
  CONSTRAINT FK_RECEIPTS_USERS FOREIGN KEY (ISSUED_BY) 
    REFERENCES USERS(ID)
);
```

**STUDENT_DOCUMENTS table:**
```sql
CREATE TABLE STUDENT_DOCUMENTS (
  ID INT IDENTITY(1,1) PRIMARY KEY,
  STUDENT_ID INT NOT NULL,
  DOCUMENT_TYPE VARCHAR(50) NOT NULL, -- BIRTH_CERTIFICATE, ID_CARD, TRANSCRIPT, etc.
  FILE_NAME NVARCHAR(255) NOT NULL,
  FILE_URL VARCHAR(500) NOT NULL,
  FILE_SIZE_KB INT,
  UPLOADED_BY INT NOT NULL,
  UPLOADED_AT DATETIME2 DEFAULT GETDATE(),
  CONSTRAINT FK_STUDENT_DOCUMENTS_STUDENTS FOREIGN KEY (STUDENT_ID) 
    REFERENCES STUDENTS(ID) ON DELETE CASCADE,
  CONSTRAINT FK_STUDENT_DOCUMENTS_USERS FOREIGN KEY (UPLOADED_BY) 
    REFERENCES USERS(ID)
);
```

**CLASS_SCHEDULES table (for recurring sessions):**
```sql
CREATE TABLE CLASS_SCHEDULES (
  ID INT IDENTITY(1,1) PRIMARY KEY,
  CLASS_ID INT NOT NULL,
  DAY_OF_WEEK VARCHAR(10) NOT NULL, -- MONDAY, TUESDAY, etc.
  START_TIME TIME NOT NULL,
  END_TIME TIME NOT NULL,
  ROOM NVARCHAR(100),
  IS_ACTIVE BIT DEFAULT 1,
  CREATED_AT DATETIME2 DEFAULT GETDATE(),
  CONSTRAINT FK_CLASS_SCHEDULES_CLASSES FOREIGN KEY (CLASS_ID) 
    REFERENCES CLASSES(ID) ON DELETE CASCADE
);
```

---

#### **TASK D1.3: Stored Procedures**

**sp_GetTeacherStatistics:**
```sql
CREATE PROCEDURE sp_GetTeacherStatistics
  @teacher_id INT
AS
BEGIN
  SELECT 
    -- Classes
    COUNT(DISTINCT c.ID) as total_classes,
    SUM(c.CURRENT_STUDENTS) as total_students,
    
    -- Assignments
    (SELECT COUNT(*) FROM ASSIGNMENTS WHERE CLASS_ID IN 
      (SELECT ID FROM CLASSES WHERE TEACHER_ID = @teacher_id)) as total_assignments,
    
    -- Pending grading
    (SELECT COUNT(*) FROM SUBMISSIONS s
     INNER JOIN ASSIGNMENTS a ON s.ASSIGNMENT_ID = a.ID
     INNER JOIN CLASSES c ON a.CLASS_ID = c.ID
     WHERE c.TEACHER_ID = @teacher_id AND s.GRADE IS NULL) as pending_grading,
    
    -- Average class rating
    AVG(CAST(c.CURRENT_STUDENTS AS FLOAT) / c.CAPACITY * 100) as avg_capacity_percent
  FROM CLASSES c
  WHERE c.TEACHER_ID = @teacher_id AND c.STATUS = 'ACTIVE';
END;
```

**sp_GetStaffWorkload:**
```sql
CREATE PROCEDURE sp_GetStaffWorkload
  @staff_id INT,
  @date_from DATE,
  @date_to DATE
AS
BEGIN
  SELECT 
    -- Registrations processed
    (SELECT COUNT(*) FROM STUDENTS 
     WHERE CREATED_AT BETWEEN @date_from AND @date_to) as registrations_processed,
    
    -- Payments recorded
    (SELECT COUNT(*) FROM PAYMENTS 
     WHERE CREATED_AT BETWEEN @date_from AND @date_to) as payments_recorded,
    
    -- Enrollments created
    (SELECT COUNT(*) FROM ENROLLMENTS 
     WHERE CREATED_AT BETWEEN @date_from AND @date_to) as enrollments_created,
    
    -- Support tickets resolved
    (SELECT COUNT(*) FROM (SELECT 1) as t) as tickets_resolved; -- Placeholder
END;
```

---

## 5. TIMELINE

### Week 1: Teacher Module Foundation (5 days)
- **Day 1-2:** T1.1 + T1.2 (Dashboard modernization + API integration)
- **Day 3-4:** T2.1 + T2.2 (Attendance marking + statistics)
- **Day 5:** T3.1 (Enhanced assignment creation)

### Week 2: Teacher Module Completion (5 days)
- **Day 6-7:** T3.2 (Grading interface redesign)
- **Day 8-9:** T4.1 (Class performance reports)
- **Day 10:** T5.1 (UI/UX polish)

### Week 3: Staff Module Core (5 days)
- **Day 11-12:** S1.1 + S2.1 (Dashboard + Student registration)
- **Day 13-14:** S2.2 + S3.1 (Student management + Payment processing)
- **Day 15:** S3.2 (Payment history & reports)

### Week 4: Staff Module Completion (5 days)
- **Day 16-17:** S4.1 + S4.2 (Enrollment management)
- **Day 18-19:** S5.1 (UI/UX modernization)
- **Day 20:** Testing & bug fixes

### Week 5: Database & Integration (3 days)
- **Day 21:** D1.1 + D1.2 (Database updates)
- **Day 22:** D1.3 (Stored procedures)
- **Day 23:** End-to-end testing

### Week 6: Polish & Documentation (2 days)
- **Day 24:** Final UI polish, performance optimization
- **Day 25:** Documentation, demo preparation

---

## 6. SUCCESS CRITERIA

### Teacher Module:
- [ ] Dashboard hiển thị real-time statistics
- [ ] Attendance marking hoạt động với bulk actions
- [ ] Assignment creation với rich text & file upload
- [ ] Grading interface smooth và efficient
- [ ] Reports export to PDF/Excel
- [ ] UI/UX consistent với Admin module

### Staff Module:
- [ ] Dashboard với quick actions
- [ ] Student registration workflow hoàn chỉnh
- [ ] Payment processing với receipt generation
- [ ] Enrollment management với validation
- [ ] All pages có modern UI
- [ ] Mobile responsive

### Database:
- [ ] All new tables created
- [ ] Stored procedures tested
- [ ] Data integrity maintained
- [ ] Performance acceptable (<500ms queries)

---

## 7. NOTES & TIPS

### Development Best Practices:
1. **Component Reusability** - Tạo shared components cho forms, tables, cards
2. **Type Safety** - Define TypeScript interfaces cho tất cả data structures
3. **Error Handling** - Consistent error messages, fallback UI
4. **Loading States** - Skeleton loaders, spinners
5. **Validation** - Frontend + Backend validation
6. **Responsive Design** - Test trên mobile, tablet, desktop

### Testing Checklist:
- [ ] All forms validate correctly
- [ ] API calls handle errors gracefully
- [ ] Loading states display properly
- [ ] Navigation works between pages
- [ ] File uploads succeed
- [ ] Exports generate correctly
- [ ] Permissions enforced properly

---

**🎉 Good luck with the upgrade!**
