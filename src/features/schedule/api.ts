import { api } from '../../services/http';

export const fetchSchedule = async (userId) => {
    try {
        const response = await api.get(`/schedule/${userId}`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching schedule: ' + error.message);
    }
};

export const createSchedule = async (scheduleData) => {
    try {
        const response = await api.post('/schedule', scheduleData);
        return response.data;
    } catch (error) {
        throw new Error('Error creating schedule: ' + error.message);
    }
};

export const updateSchedule = async (scheduleId, scheduleData) => {
    try {
        const response = await api.put(`/schedule/${scheduleId}`, scheduleData);
        return response.data;
    } catch (error) {
        throw new Error('Error updating schedule: ' + error.message);
    }
};

export const deleteSchedule = async (scheduleId) => {
    try {
        const response = await api.delete(`/schedule/${scheduleId}`);
        return response.data;
    } catch (error) {
        throw new Error('Error deleting schedule: ' + error.message);
    }
};