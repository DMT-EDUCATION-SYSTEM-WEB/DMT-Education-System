import axios from 'axios';

const API_BASE_URL = 'https://api.dmt-edu.com/payments'; // Replace with your actual API base URL

// Function to initiate a payment
export const initiatePayment = async (paymentData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/initiate`, paymentData);
        return response.data;
    } catch (error) {
        throw new Error('Error initiating payment: ' + error.message);
    }
};

// Function to get payment status
export const getPaymentStatus = async (paymentId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/status/${paymentId}`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching payment status: ' + error.message);
    }
};

// Function to refund a payment
export const refundPayment = async (paymentId) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/refund`, { paymentId });
        return response.data;
    } catch (error) {
        throw new Error('Error processing refund: ' + error.message);
    }
};

// Function to get all payments for a user
export const getUserPayments = async (userId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/user/${userId}`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching user payments: ' + error.message);
    }
};