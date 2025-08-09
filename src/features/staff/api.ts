import { http } from '../../services/http';

const API_BASE_URL = '/api/staff';

export const fetchTasks = async () => {
    try {
        const response = await http.get(`${API_BASE_URL}/tasks`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching tasks: ' + error.message);
    }
};

export const fetchSupportTickets = async () => {
    try {
        const response = await http.get(`${API_BASE_URL}/support-tickets`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching support tickets: ' + error.message);
    }
};

export const createTask = async (taskData) => {
    try {
        const response = await http.post(`${API_BASE_URL}/tasks`, taskData);
        return response.data;
    } catch (error) {
        throw new Error('Error creating task: ' + error.message);
    }
};

export const updateTask = async (taskId, taskData) => {
    try {
        const response = await http.put(`${API_BASE_URL}/tasks/${taskId}`, taskData);
        return response.data;
    } catch (error) {
        throw new Error('Error updating task: ' + error.message);
    }
};

export const deleteTask = async (taskId) => {
    try {
        const response = await http.delete(`${API_BASE_URL}/tasks/${taskId}`);
        return response.data;
    } catch (error) {
        throw new Error('Error deleting task: ' + error.message);
    }
};

export const fetchStaffSupport = async () => {
    try {
        const response = await http.get(`${API_BASE_URL}/support`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching staff support: ' + error.message);
    }
};