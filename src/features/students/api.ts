import { apiClient } from '../../services/http';

export const getStudentDashboard = async (studentId) => {
    try {
        const response = await apiClient.get(`/students/${studentId}/dashboard`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching student dashboard data');
    }
};

export const getStudentSchedule = async (studentId) => {
    try {
        const response = await apiClient.get(`/students/${studentId}/schedule`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching student schedule');
    }
};

export const getStudentVideos = async (studentId) => {
    try {
        const response = await apiClient.get(`/students/${studentId}/videos`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching student videos');
    }
};

export const getStudentMaterials = async (studentId) => {
    try {
        const response = await apiClient.get(`/students/${studentId}/materials`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching student materials');
    }
};

export const getStudentTranscript = async (studentId) => {
    try {
        const response = await apiClient.get(`/students/${studentId}/transcript`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching student transcript');
    }
};