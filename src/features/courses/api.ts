import { Course } from '../../types';

// Course interface compatible with CourseCard component
export interface CourseCardData {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  price: number;
  thumbnail?: string;
  rating?: number;
  studentsCount?: number;
}

const API_BASE_URL = 'https://api.dmt-edu.com/courses';

export const fetchCourses = async (): Promise<CourseCardData[]> => {
  // Simulated API call with mock data for now
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: '1',
          title: 'Toán học cơ bản',
          description: 'Khóa học toán học dành cho học sinh cấp 1',
          instructor: 'Thầy Minh',
          duration: '3 tháng',
          level: 'beginner',
          price: 500000,
          thumbnail: '/images/math-basic.jpg',
          rating: 4.5,
          studentsCount: 120
        },
        {
          id: '2',
          title: 'Tiếng Anh giao tiếp',
          description: 'Khóa học tiếng Anh giao tiếp cơ bản',
          instructor: 'Cô Mai',
          duration: '4 tháng',
          level: 'intermediate',
          price: 700000,
          thumbnail: '/images/english-speaking.jpg',
          rating: 4.8,
          studentsCount: 95
        },
        {
          id: '3',
          title: 'Lập trình Python',
          description: 'Khóa học lập trình Python cho người mới bắt đầu',
          instructor: 'Thầy Hoàng',
          duration: '6 tháng',
          level: 'beginner',
          price: 1200000,
          thumbnail: '/images/python-programming.jpg',
          rating: 4.7,
          studentsCount: 200
        }
      ]);
    }, 1000);
  });
};

export const getCourseDetail = async (id: string): Promise<CourseCardData | null> => {
  const courses = await fetchCourses();
  return courses.find(course => course.id === id) || null;
};

export const createCourse = async (courseData: Course): Promise<Course> => {
    const response = await fetch(`${API_BASE_URL}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(courseData),
    });
    if (!response.ok) {
        throw new Error('Failed to create course');
    }
    return response.json();
};

export const updateCourse = async (courseId: string, courseData: Course): Promise<Course> => {
    const response = await fetch(`${API_BASE_URL}/${courseId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(courseData),
    });
    if (!response.ok) {
        throw new Error(`Failed to update course with id: ${courseId}`);
    }
    return response.json();
};

export const deleteCourse = async (courseId: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/${courseId}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error(`Failed to delete course with id: ${courseId}`);
    }
};