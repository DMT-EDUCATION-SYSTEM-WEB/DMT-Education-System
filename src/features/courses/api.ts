import { Course } from '../../types';

const API_BASE_URL = 'https://api.dmt-edu.com/courses';

export const fetchCourses = async (): Promise<Course[]> => {
    const response = await fetch(`${API_BASE_URL}`);
    if (!response.ok) {
        throw new Error('Failed to fetch courses');
    }
    return response.json();
};

export const fetchCourseById = async (courseId: string): Promise<Course> => {
    const response = await fetch(`${API_BASE_URL}/${courseId}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch course with id: ${courseId}`);
    }
    return response.json();
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