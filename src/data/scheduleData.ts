// Mock data for schedule page - 3 campuses with realistic class schedules

export interface ScheduleClass {
  id: string;
  name: string;
  code: string;
  campus: 'govap' | 'tanbinh' | 'thuduc';
  campusName: string;
  subject: string;
  subjectCategory: 'english' | 'math' | 'vietnamese' | 'science' | 'programming';
  level: 'beginner' | 'intermediate' | 'advanced';
  teacher: string;
  teacherAvatar: string;
  room: string;
  schedule: {
    days: string[]; // ['Thứ 2', 'Thứ 4', 'Thứ 6']
    time: string; // '18:30-20:30'
  };
  startDate: string;
  endDate: string;
  duration: string; // '9 tuần - 27 buổi'
  capacity: number;
  enrolled: number;
  price: number;
  color: string;
  features: string[];
  description: string;
}

export const scheduleData: ScheduleClass[] = [
  // ============ GÒ VẤP CAMPUS ============
  {
    id: 'gv-001',
    name: 'IELTS Intensive - Foundation',
    code: 'IELTS-GV-01',
    campus: 'govap',
    campusName: 'Cơ sở Gò Vấp',
    subject: 'IELTS',
    subjectCategory: 'english',
    level: 'beginner',
    teacher: 'Ms. Nguyễn Hải Yến',
    teacherAvatar: 'https://ui-avatars.com/api/?name=Nguyen+Hai+Yen&size=128&background=dc2626&color=fff&rounded=true',
    room: 'P.201 - Tầng 2',
    schedule: {
      days: ['Thứ 2', 'Thứ 4', 'Thứ 6'],
      time: '18:30-20:30'
    },
    startDate: '15/01/2025',
    endDate: '15/03/2025',
    duration: '9 tuần - 27 buổi',
    capacity: 20,
    enrolled: 17,
    price: 3500000,
    color: '#dc2626',
    features: ['Giáo trình Cambridge', 'Luyện đề thực chiến', 'Mock test hàng tuần', 'Hỗ trợ 24/7'],
    description: 'Khóa học IELTS nền tảng cho người mới bắt đầu, tập trung xây dựng kỹ năng 4 kỹ năng cơ bản'
  },
  {
    id: 'gv-002',
    name: 'IELTS Target 7.0+',
    code: 'IELTS-GV-02',
    campus: 'govap',
    campusName: 'Cơ sở Gò Vấp',
    subject: 'IELTS',
    subjectCategory: 'english',
    level: 'advanced',
    teacher: 'Mr. David Smith',
    teacherAvatar: 'https://ui-avatars.com/api/?name=David+Smith&size=128&background=dc2626&color=fff&rounded=true',
    room: 'P.305 - Tầng 3',
    schedule: {
      days: ['Thứ 3', 'Thứ 5', 'Thứ 7'],
      time: '19:00-21:00'
    },
    startDate: '20/01/2025',
    endDate: '20/03/2025',
    duration: '9 tuần - 27 buổi',
    capacity: 15,
    enrolled: 12,
    price: 4500000,
    color: '#dc2626',
    features: ['Luyện Academic Writing', 'Speaking 1-1', 'Đảm bảo 7.0+', 'Học lại miễn phí'],
    description: 'Khóa học cao cấp cho học viên mục tiêu 7.0-8.0, tập trung chiến lược làm bài và kỹ thuật nâng cao'
  },
  {
    id: 'gv-003',
    name: 'Toán Tư duy THCS',
    code: 'MATH-GV-01',
    campus: 'govap',
    campusName: 'Cơ sở Gò Vấp',
    subject: 'Toán học',
    subjectCategory: 'math',
    level: 'intermediate',
    teacher: 'Thầy Nguyễn Văn Hùng',
    teacherAvatar: 'https://ui-avatars.com/api/?name=Nguyen+Van+Hung&size=128&background=3b82f6&color=fff&rounded=true',
    room: 'P.102 - Tầng 1',
    schedule: {
      days: ['Thứ 3', 'Thứ 5', 'Thứ 7'],
      time: '17:00-19:00'
    },
    startDate: '18/01/2025',
    endDate: '18/03/2025',
    duration: '9 tuần - 27 buổi',
    capacity: 25,
    enrolled: 22,
    price: 3000000,
    color: '#3b82f6',
    features: ['Tư duy logic', 'Giải toán nâng cao', 'Luyện thi HSG', 'Bài tập về nhà'],
    description: 'Phát triển tư duy toán học, rèn luyện kỹ năng giải quyết vấn đề cho học sinh THCS'
  },
  {
    id: 'gv-004',
    name: 'Toán THPT - Luyện thi THPT QG',
    code: 'MATH-GV-02',
    campus: 'govap',
    campusName: 'Cơ sở Gò Vấp',
    subject: 'Toán học',
    subjectCategory: 'math',
    level: 'advanced',
    teacher: 'Cô Phạm Thị Lan',
    teacherAvatar: 'https://ui-avatars.com/api/?name=Pham+Thi+Lan&size=128&background=3b82f6&color=fff&rounded=true',
    room: 'P.401 - Tầng 4',
    schedule: {
      days: ['Thứ 2', 'Thứ 4', 'Chủ nhật'],
      time: '19:30-21:30'
    },
    startDate: '15/01/2025',
    endDate: '15/04/2025',
    duration: '12 tuần - 36 buổi',
    capacity: 20,
    enrolled: 18,
    price: 4200000,
    color: '#3b82f6',
    features: ['Luyện đề THPT QG', 'Chuyên đề nâng cao', 'Giải đáp 1-1', 'Tài liệu độc quyền'],
    description: 'Ôn thi THPT Quốc gia môn Toán, bám sát cấu trúc đề thi và chiến lược làm bài hiệu quả'
  },
  {
    id: 'gv-005',
    name: 'Văn THCS - Nâng cao kỹ năng viết',
    code: 'VAN-GV-01',
    campus: 'govap',
    campusName: 'Cơ sở Gò Vấp',
    subject: 'Ngữ văn',
    subjectCategory: 'vietnamese',
    level: 'intermediate',
    teacher: 'Cô Trần Thị Mai',
    teacherAvatar: 'https://ui-avatars.com/api/?name=Tran+Thi+Mai&size=128&background=a855f7&color=fff&rounded=true',
    room: 'P.203 - Tầng 2',
    schedule: {
      days: ['Thứ 2', 'Thứ 4'],
      time: '18:00-20:00'
    },
    startDate: '22/01/2025',
    endDate: '22/03/2025',
    duration: '9 tuần - 18 buổi',
    capacity: 18,
    enrolled: 14,
    price: 2800000,
    color: '#a855f7',
    features: ['Kỹ năng viết luận', 'Phân tích tác phẩm', 'Văn mẫu chọn lọc', 'Chữa bài 1-1'],
    description: 'Nâng cao kỹ năng viết văn nghị luận, văn miêu tả và phân tích tác phẩm văn học'
  },

  // ============ TÂN BÌNH CAMPUS ============
  {
    id: 'tb-001',
    name: 'Lập trình Junior - Python Foundation',
    code: 'CODE-TB-01',
    campus: 'tanbinh',
    campusName: 'Cơ sở Tân Bình',
    subject: 'Lập trình',
    subjectCategory: 'programming',
    level: 'beginner',
    teacher: 'Thầy Lê Minh Tuấn',
    teacherAvatar: 'https://ui-avatars.com/api/?name=Le+Minh+Tuan&size=128&background=22c55e&color=fff&rounded=true',
    room: 'Lab 1 - Tầng 3',
    schedule: {
      days: ['Thứ 3', 'Thứ 5'],
      time: '19:00-21:00'
    },
    startDate: '20/01/2025',
    endDate: '20/04/2025',
    duration: '12 tuần - 24 buổi',
    capacity: 15,
    enrolled: 13,
    price: 4800000,
    color: '#22c55e',
    features: ['Python từ cơ bản', 'Thực hành dự án', 'Code review', 'Certificate'],
    description: 'Khóa học lập trình Python cho thiếu niên, xây dựng nền tảng tư duy lập trình từ đầu'
  },
  {
    id: 'tb-002',
    name: 'Lập trình Web - HTML/CSS/JavaScript',
    code: 'CODE-TB-02',
    campus: 'tanbinh',
    campusName: 'Cơ sở Tân Bình',
    subject: 'Lập trình',
    subjectCategory: 'programming',
    level: 'intermediate',
    teacher: 'Thầy Phạm Quốc Huy',
    teacherAvatar: 'https://ui-avatars.com/api/?name=Pham+Quoc+Huy&size=128&background=22c55e&color=fff&rounded=true',
    room: 'Lab 2 - Tầng 3',
    schedule: {
      days: ['Thứ 2', 'Thứ 4', 'Thứ 6'],
      time: '18:30-20:30'
    },
    startDate: '15/01/2025',
    endDate: '15/04/2025',
    duration: '12 tuần - 36 buổi',
    capacity: 18,
    enrolled: 16,
    price: 5500000,
    color: '#22c55e',
    features: ['Responsive design', 'Build real projects', 'Git & GitHub', 'Portfolio setup'],
    description: 'Học xây dựng website từ A-Z với HTML, CSS, JavaScript hiện đại và responsive'
  },
  {
    id: 'tb-003',
    name: 'Tiếng Việt nâng cao THPT',
    code: 'VAN-TB-01',
    campus: 'tanbinh',
    campusName: 'Cơ sở Tân Bình',
    subject: 'Ngữ văn',
    subjectCategory: 'vietnamese',
    level: 'advanced',
    teacher: 'Cô Đỗ Thị Lan',
    teacherAvatar: 'https://ui-avatars.com/api/?name=Do+Thi+Lan&size=128&background=a855f7&color=fff&rounded=true',
    room: 'P.205 - Tầng 2',
    schedule: {
      days: ['Thứ 2', 'Thứ 4', 'Thứ 6'],
      time: '17:30-19:30'
    },
    startDate: '20/01/2025',
    endDate: '20/04/2025',
    duration: '12 tuần - 36 buổi',
    capacity: 20,
    enrolled: 15,
    price: 3600000,
    color: '#a855f7',
    features: ['Luyện thi THPT QG', 'Văn nghị luận xã hội', 'Phân tích tác phẩm', 'Chữa bài chi tiết'],
    description: 'Ôn luyện Ngữ văn THPT, tập trung văn nghị luận và phân tích tác phẩm văn học theo chuẩn đề thi'
  },
  {
    id: 'tb-004',
    name: 'English Communication - Business',
    code: 'ENG-TB-01',
    campus: 'tanbinh',
    campusName: 'Cơ sở Tân Bình',
    subject: 'English Communication',
    subjectCategory: 'english',
    level: 'intermediate',
    teacher: 'Ms. Sarah Johnson',
    teacherAvatar: 'https://ui-avatars.com/api/?name=Sarah+Johnson&size=128&background=dc2626&color=fff&rounded=true',
    room: 'P.302 - Tầng 3',
    schedule: {
      days: ['Thứ 3', 'Thứ 5', 'Thứ 7'],
      time: '18:00-20:00'
    },
    startDate: '18/01/2025',
    endDate: '18/03/2025',
    duration: '9 tuần - 27 buổi',
    capacity: 15,
    enrolled: 11,
    price: 4200000,
    color: '#dc2626',
    features: ['Business English', 'Presentation skills', 'Email writing', 'Meeting conversations'],
    description: 'Tiếng Anh giao tiếp thương mại cho người đi làm, tập trung tình huống thực tế công sở'
  },
  {
    id: 'tb-005',
    name: 'Toán tư duy sáng tạo Tiểu học',
    code: 'MATH-TB-01',
    campus: 'tanbinh',
    campusName: 'Cơ sở Tân Bình',
    subject: 'Toán học',
    subjectCategory: 'math',
    level: 'beginner',
    teacher: 'Cô Lê Thu Hà',
    teacherAvatar: 'https://ui-avatars.com/api/?name=Le+Thu+Ha&size=128&background=3b82f6&color=fff&rounded=true',
    room: 'P.101 - Tầng 1',
    schedule: {
      days: ['Thứ 7', 'Chủ nhật'],
      time: '08:30-10:30'
    },
    startDate: '25/01/2025',
    endDate: '25/03/2025',
    duration: '9 tuần - 18 buổi',
    capacity: 20,
    enrolled: 18,
    price: 2600000,
    color: '#3b82f6',
    features: ['Toán tư duy', 'Game học tập', 'Động não', 'Phát triển IQ'],
    description: 'Phát triển tư duy toán học qua trò chơi và hoạt động sáng tạo cho học sinh tiểu học'
  },

  // ============ THỦ ĐỨC CAMPUS ============
  {
    id: 'td-001',
    name: 'Khoa học tự nhiên - Vật lý THPT',
    code: 'PHY-TD-01',
    campus: 'thuduc',
    campusName: 'Cơ sở Thủ Đức',
    subject: 'Vật lý',
    subjectCategory: 'science',
    level: 'intermediate',
    teacher: 'Thầy Vũ Quang Minh',
    teacherAvatar: 'https://ui-avatars.com/api/?name=Vu+Quang+Minh&size=128&background=f59e0b&color=fff&rounded=true',
    room: 'Lab Vật lý - Tầng 2',
    schedule: {
      days: ['Thứ 2', 'Thứ 4'],
      time: '18:00-20:00'
    },
    startDate: '25/01/2025',
    endDate: '25/04/2025',
    duration: '12 tuần - 24 buổi',
    capacity: 18,
    enrolled: 14,
    price: 3800000,
    color: '#f59e0b',
    features: ['Thí nghiệm thực hành', 'Luyện đề THPT QG', 'Giải bài tập khó', 'Video bài giảng'],
    description: 'Vật lý THPT với phương pháp học thực hành kết hợp lý thuyết, tập trung ôn thi THPT Quốc gia'
  },
  {
    id: 'td-002',
    name: 'Hóa học THPT - Nâng cao',
    code: 'CHEM-TD-01',
    campus: 'thuduc',
    campusName: 'Cơ sở Thủ Đức',
    subject: 'Hóa học',
    subjectCategory: 'science',
    level: 'advanced',
    teacher: 'Thầy Nguyễn Đức Anh',
    teacherAvatar: 'https://ui-avatars.com/api/?name=Nguyen+Duc+Anh&size=128&background=f59e0b&color=fff&rounded=true',
    room: 'Lab Hóa - Tầng 3',
    schedule: {
      days: ['Thứ 3', 'Thứ 5', 'Thứ 7'],
      time: '19:00-21:00'
    },
    startDate: '22/01/2025',
    endDate: '22/04/2025',
    duration: '12 tuần - 36 buổi',
    capacity: 16,
    enrolled: 13,
    price: 4000000,
    color: '#f59e0b',
    features: ['Thực hành lab', 'Bài tập nâng cao', 'Luyện thi đại học', 'An toàn hóa chất'],
    description: 'Hóa học nâng cao THPT, tập trung vô cơ - hữu cơ, luyện thi THPT QG và các kỳ thi khó'
  },
  {
    id: 'td-003',
    name: 'IELTS Junior - Khởi đầu tự tin',
    code: 'IELTS-TD-01',
    campus: 'thuduc',
    campusName: 'Cơ sở Thủ Đức',
    subject: 'IELTS',
    subjectCategory: 'english',
    level: 'beginner',
    teacher: 'Ms. Phạm Thu Hương',
    teacherAvatar: 'https://ui-avatars.com/api/?name=Pham+Thu+Huong&size=128&background=dc2626&color=fff&rounded=true',
    room: 'P.401 - Tầng 4',
    schedule: {
      days: ['Thứ 3', 'Thứ 5', 'Thứ 7'],
      time: '16:00-18:00'
    },
    startDate: '25/01/2025',
    endDate: '25/04/2025',
    duration: '12 tuần - 36 buổi',
    capacity: 20,
    enrolled: 16,
    price: 3800000,
    color: '#dc2626',
    features: ['IELTS cho teen', 'Vocabulary building', 'Grammar focus', 'Fun activities'],
    description: 'IELTS dành cho học sinh THCS-THPT, xây dựng nền tảng tiếng Anh học thuật vững chắc'
  },
  {
    id: 'td-004',
    name: 'Sinh học THPT - Ôn thi THPT QG',
    code: 'BIO-TD-01',
    campus: 'thuduc',
    campusName: 'Cơ sở Thủ Đức',
    subject: 'Sinh học',
    subjectCategory: 'science',
    level: 'intermediate',
    teacher: 'Cô Trương Thị Hương',
    teacherAvatar: 'https://ui-avatars.com/api/?name=Truong+Thi+Huong&size=128&background=f59e0b&color=fff&rounded=true',
    room: 'P.205 - Tầng 2',
    schedule: {
      days: ['Thứ 2', 'Thứ 4', 'Chủ nhật'],
      time: '18:30-20:30'
    },
    startDate: '20/01/2025',
    endDate: '20/04/2025',
    duration: '12 tuần - 36 buổi',
    capacity: 18,
    enrolled: 15,
    price: 3600000,
    color: '#f59e0b',
    features: ['Sinh học tế bào', 'Di truyền học', 'Sinh thái học', 'Luyện đề minh họa'],
    description: 'Sinh học THPT toàn diện, bám sát đề thi THPT Quốc gia với phương pháp học hiệu quả'
  },
  {
    id: 'td-005',
    name: 'English for Kids - Tiền tiểu học',
    code: 'ENG-TD-01',
    campus: 'thuduc',
    campusName: 'Cơ sở Thủ Đức',
    subject: 'English for Kids',
    subjectCategory: 'english',
    level: 'beginner',
    teacher: 'Ms. Emily Chen',
    teacherAvatar: 'https://ui-avatars.com/api/?name=Emily+Chen&size=128&background=dc2626&color=fff&rounded=true',
    room: 'P.102 - Tầng 1',
    schedule: {
      days: ['Thứ 7', 'Chủ nhật'],
      time: '09:00-11:00'
    },
    startDate: '25/01/2025',
    endDate: '25/03/2025',
    duration: '9 tuần - 18 buổi',
    capacity: 12,
    enrolled: 10,
    price: 3200000,
    color: '#dc2626',
    features: ['TPR Method', 'Songs & Games', 'Storytelling', 'Arts & Crafts'],
    description: 'Tiếng Anh cho trẻ 5-7 tuổi, học qua vui chơi và hoạt động sáng tạo phù hợp lứa tuổi'
  }
];

// Campus information
export const campusInfo = [
  {
    id: 'govap',
    name: 'Gò Vấp',
    fullName: 'Cơ sở Gò Vấp',
    address: 'Chung cư K26, Dương Quảng Hàm, Q. Gò Vấp, TP.HCM',
    phone: '028 3123 4567',
    email: 'govap@dmtedu.vn',
    color: '#dc2626',
    gradient: 'from-red-500 to-rose-600',
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=800&h=400&fit=crop',
    facilities: ['10 phòng học', 'Lab máy tính', 'Thư viện', 'Khu vui chơi'],
    openingHours: 'T2-CN: 08:00-21:00'
  },
  {
    id: 'tanbinh',
    name: 'Tân Bình',
    fullName: 'Cơ sở Tân Bình',
    address: '230 Hoàng Văn Thụ, P.8, Q. Tân Bình, TP.HCM',
    phone: '028 3456 7890',
    email: 'tanbinh@dmtedu.vn',
    color: '#3b82f6',
    gradient: 'from-blue-500 to-cyan-600',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=400&fit=crop',
    facilities: ['12 phòng học', '2 Lab máy tính', 'Cafeteria', 'Parking'],
    openingHours: 'T2-CN: 08:00-21:00'
  },
  {
    id: 'thuduc',
    name: 'Thủ Đức',
    fullName: 'Cơ sở Thủ Đức',
    address: '152 Võ Văn Ngân, P. Bình Thọ, TP. Thủ Đức, TP.HCM',
    phone: '028 3789 0123',
    email: 'thuduc@dmtedu.vn',
    color: '#10b981',
    gradient: 'from-green-500 to-emerald-600',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=400&fit=crop',
    facilities: ['15 phòng học', 'Lab khoa học', 'Sân chơi', 'Khu tự học'],
    openingHours: 'T2-CN: 08:00-21:00'
  }
];

// Subject categories
export const subjectCategories = [
  { id: 'all', name: 'Tất cả môn', icon: '📚', color: '#6b7280' },
  { id: 'english', name: 'Tiếng Anh', icon: '🇬🇧', color: '#dc2626' },
  { id: 'math', name: 'Toán học', icon: '🔢', color: '#3b82f6' },
  { id: 'vietnamese', name: 'Ngữ văn', icon: '📖', color: '#a855f7' },
  { id: 'science', name: 'Khoa học', icon: '🔬', color: '#f59e0b' },
  { id: 'programming', name: 'Lập trình', icon: '💻', color: '#22c55e' }
];

// Helper functions
export const getClassesByCampus = (campus: string): ScheduleClass[] => {
  if (campus === 'all') return scheduleData;
  return scheduleData.filter(cls => cls.campus === campus);
};

export const getClassesBySubject = (subject: string): ScheduleClass[] => {
  if (subject === 'all') return scheduleData;
  return scheduleData.filter(cls => cls.subjectCategory === subject);
};

export const getClassesByCampusAndSubject = (campus: string, subject: string): ScheduleClass[] => {
  let filtered = scheduleData;
  if (campus !== 'all') {
    filtered = filtered.filter(cls => cls.campus === campus);
  }
  if (subject !== 'all') {
    filtered = filtered.filter(cls => cls.subjectCategory === subject);
  }
  return filtered;
};

export const getCampusById = (id: string) => {
  return campusInfo.find(c => c.id === id);
};

export const getEnrollmentPercentage = (enrolled: number, capacity: number): number => {
  return Math.round((enrolled / capacity) * 100);
};

export const getEnrollmentStatus = (enrolled: number, capacity: number): {
  status: 'available' | 'filling' | 'almost-full' | 'full';
  label: string;
  color: string;
} => {
  const percentage = getEnrollmentPercentage(enrolled, capacity);
  
  if (percentage >= 100) {
    return { status: 'full', label: 'Đã đầy', color: '#dc2626' };
  } else if (percentage >= 80) {
    return { status: 'almost-full', label: 'Sắp đầy', color: '#f59e0b' };
  } else if (percentage >= 50) {
    return { status: 'filling', label: 'Còn chỗ', color: '#3b82f6' };
  } else {
    return { status: 'available', label: 'Còn nhiều chỗ', color: '#10b981' };
  }
};
