import { api } from '../../services/http';

export const fetchSurveys = async () => {
    try {
        const response = await api.get('/surveys');
        return response.data;
    } catch (error) {
        throw new Error('Error fetching surveys: ' + error.message);
    }
};

export const createSurvey = async (surveyData) => {
    try {
        const response = await api.post('/surveys', surveyData);
        return response.data;
    } catch (error) {
        throw new Error('Error creating survey: ' + error.message);
    }
};

export const updateSurvey = async (surveyId, surveyData) => {
    try {
        const response = await api.put(`/surveys/${surveyId}`, surveyData);
        return response.data;
    } catch (error) {
        throw new Error('Error updating survey: ' + error.message);
    }
};

export const deleteSurvey = async (surveyId) => {
    try {
        await api.delete(`/surveys/${surveyId}`);
    } catch (error) {
        throw new Error('Error deleting survey: ' + error.message);
    }
};