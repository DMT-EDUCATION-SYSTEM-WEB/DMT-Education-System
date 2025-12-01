import { apiClient } from './auth';

// Types
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// ============ CAMPUS ============
export interface Campus {
  id: number;
  code: string;
  name: string;
  fullName: string;
  address: string;
  phone: string;
  email: string;
  color: string;
  gradient: string;
  image?: string;
  facilities: string[];
  openingHours: string;
  mapUrl?: string;
  isActive: boolean;
  sortOrder: number;
}

export interface ScheduleClassFromAPI {
  id: number;
  code: string;
  name: string;
  capacity: number;
  currentStudents: number;
  startDate: string;
  endDate: string;
  scheduleDays: string;
  scheduleTime: string;
  classroom: string;
  status: string;
  courseId: number;
  courseName: string;
  level: string;
  price: number;
  subjectId: number;
  subjectName: string;
  subjectCode: string;
  teacherName: string;
}

export const campusesApi = {
  getAll: async (isActive: boolean = true): Promise<ApiResponse<Campus[]>> => {
    const response = await apiClient.get('/campuses', { 
      params: { is_active: isActive ? 'true' : 'false' } 
    });
    return response.data;
  },

  getById: async (id: number): Promise<ApiResponse<Campus>> => {
    const response = await apiClient.get(`/campuses/${id}`);
    return response.data;
  },

  getClasses: async (campusId: number): Promise<ApiResponse<ScheduleClassFromAPI[]>> => {
    const response = await apiClient.get(`/campuses/${campusId}/classes`);
    return response.data;
  },
};

// Helper function to convert schedule days from DB format to display format
export const formatScheduleDays = (scheduleDays: string): string[] => {
  if (!scheduleDays) return [];
  
  const dayMap: Record<string, string> = {
    'THU2': 'Thứ 2',
    'THU3': 'Thứ 3',
    'THU4': 'Thứ 4',
    'THU5': 'Thứ 5',
    'THU6': 'Thứ 6',
    'THU7': 'Thứ 7',
    'CN': 'Chủ nhật',
  };

  return scheduleDays.split(',').map(day => dayMap[day.trim()] || day.trim());
};

// Helper function to get subject category from subject code
export const getSubjectCategory = (subjectCode: string): string => {
  const categoryMap: Record<string, string> = {
    'IELTS': 'english',
    'ENG': 'english',
    'MATH': 'math',
    'VAN': 'vietnamese',
    'PHY': 'science',
    'CHEM': 'science',
    'BIO': 'science',
    'CODE': 'programming',
  };

  return categoryMap[subjectCode] || 'other';
};

// Helper function to get color based on subject
export const getSubjectColor = (subjectCode: string): string => {
  const colorMap: Record<string, string> = {
    'IELTS': '#dc2626',
    'ENG': '#dc2626',
    'MATH': '#3b82f6',
    'VAN': '#a855f7',
    'PHY': '#f59e0b',
    'CHEM': '#f59e0b',
    'BIO': '#f59e0b',
    'CODE': '#22c55e',
  };

  return colorMap[subjectCode] || '#6b7280';
};

// Transform API data to ScheduleClass format used in UI
export const transformToScheduleClass = (apiClass: ScheduleClassFromAPI, campus: Campus) => {
  return {
    id: apiClass.code,
    name: apiClass.name,
    code: apiClass.code,
    campus: campus.code as 'govap' | 'quan12' | 'quan3',
    campusName: campus.fullName,
    subject: apiClass.subjectName,
    subjectCategory: getSubjectCategory(apiClass.subjectCode) as any,
    level: (apiClass.level?.toLowerCase() || 'beginner') as 'beginner' | 'intermediate' | 'advanced',
    teacher: apiClass.teacherName || 'Đang cập nhật',
    teacherAvatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(apiClass.teacherName || 'Teacher')}&size=128&background=${campus.color.replace('#', '')}&color=fff&rounded=true`,
    room: apiClass.classroom,
    schedule: {
      days: formatScheduleDays(apiClass.scheduleDays),
      time: apiClass.scheduleTime,
    },
    startDate: apiClass.startDate ? new Date(apiClass.startDate).toLocaleDateString('vi-VN') : '',
    endDate: apiClass.endDate ? new Date(apiClass.endDate).toLocaleDateString('vi-VN') : '',
    duration: '', // Will be calculated if needed
    capacity: apiClass.capacity,
    enrolled: apiClass.currentStudents,
    price: apiClass.price || 0,
    color: getSubjectColor(apiClass.subjectCode),
    features: [],
    description: apiClass.courseName,
  };
};
