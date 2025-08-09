import { api } from '../../services/http';

export const fetchNotifications = async () => {
    try {
        const response = await api.get('/notifications');
        return response.data;
    } catch (error) {
        throw new Error('Error fetching notifications: ' + error.message);
    }
};

export const markNotificationAsRead = async (notificationId) => {
    try {
        const response = await api.put(`/notifications/${notificationId}/read`);
        return response.data;
    } catch (error) {
        throw new Error('Error marking notification as read: ' + error.message);
    }
};

export const deleteNotification = async (notificationId) => {
    try {
        const response = await api.delete(`/notifications/${notificationId}`);
        return response.data;
    } catch (error) {
        throw new Error('Error deleting notification: ' + error.message);
    }
};