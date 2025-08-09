import axios from 'axios';

const API_BASE_URL = 'https://api.dmt-edu.com/admin'; // Replace with your actual API base URL

// Function to get all users
export const getUsers = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/users`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching users: ' + error.message);
    }
};

// Function to create a new user
export const createUser = async (userData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/users`, userData);
        return response.data;
    } catch (error) {
        throw new Error('Error creating user: ' + error.message);
    }
};

// Function to update a user
export const updateUser = async (userId, userData) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/users/${userId}`, userData);
        return response.data;
    } catch (error) {
        throw new Error('Error updating user: ' + error.message);
    }
};

// Function to delete a user
export const deleteUser = async (userId) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/users/${userId}`);
        return response.data;
    } catch (error) {
        throw new Error('Error deleting user: ' + error.message);
    }
};

// Function to get user roles
export const getRoles = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/roles`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching roles: ' + error.message);
    }
};

// Function to create a new role
export const createRole = async (roleData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/roles`, roleData);
        return response.data;
    } catch (error) {
        throw new Error('Error creating role: ' + error.message);
    }
};

// Function to update a role
export const updateRole = async (roleId, roleData) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/roles/${roleId}`, roleData);
        return response.data;
    } catch (error) {
        throw new Error('Error updating role: ' + error.message);
    }
};

// Function to delete a role
export const deleteRole = async (roleId) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/roles/${roleId}`);
        return response.data;
    } catch (error) {
        throw new Error('Error deleting role: ' + error.message);
    }
};

// Function to get analytics data
export const getAnalytics = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/analytics`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching analytics: ' + error.message);
    }
};

// Function to get notifications
export const getNotifications = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/notifications`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching notifications: ' + error.message);
    }
};