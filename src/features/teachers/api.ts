import http from '../../services/http';

export const getAssignments = async (teacherId: string) => {
    try {
        const response = await http.get(`/teachers/${teacherId}/assignments`);
        return response;
    } catch (error: any) {
        throw new Error('Error fetching assignments: ' + error.message);
    }
};

export const createAssignment = async (teacherId: string, assignmentData: any) => {
    try {
        const response = await http.post(`/teachers/${teacherId}/assignments`, assignmentData);
        return response;
    } catch (error: any) {
        throw new Error('Error creating assignment: ' + error.message);
    }
};

export const updateAssignment = async (teacherId: string, assignmentId: string, assignmentData: any) => {
    try {
        const response = await http.put(`/teachers/${teacherId}/assignments/${assignmentId}`, assignmentData);
        return response;
    } catch (error: any) {
        throw new Error('Error updating assignment: ' + error.message);
    }
};

export const deleteAssignment = async (teacherId: string, assignmentId: string) => {
    try {
        const response = await http.delete(`/teachers/${teacherId}/assignments/${assignmentId}`);
        return response;
    } catch (error: any) {
        throw new Error('Error deleting assignment: ' + error.message);
    }
};

export const getGradingData = async (teacherId: string) => {
    try {
        const response = await http.get(`/teachers/${teacherId}/grading`);
        return response;
    } catch (error: any) {
        throw new Error('Error fetching grading data: ' + error.message);
    }
};

export const fetchSurveys = async (teacherId: string) => {
    try {
        const response = await http.get(`/teachers/${teacherId}/surveys`);
        return response;
    } catch (error: any) {
        throw new Error('Error fetching surveys: ' + error.message);
    }
};

export const createSurvey = async (teacherId: string, surveyData: any) => {
    try {
        const response = await http.post(`/teachers/${teacherId}/surveys`, surveyData);
        return response;
    } catch (error: any) {
        throw new Error('Error creating survey: ' + error.message);
    }
};

export const updateSurvey = async (teacherId: string, surveyId: string, surveyData: any) => {
    try {
        const response = await http.put(`/teachers/${teacherId}/surveys/${surveyId}`, surveyData);
        return response;
    } catch (error: any) {
        throw new Error('Error updating survey: ' + error.message);
    }
};

export const deleteSurvey = async (teacherId: string, surveyId: string) => {
    try {
        const response = await http.delete(`/teachers/${teacherId}/surveys/${surveyId}`);
        return response;
    } catch (error: any) {
        throw new Error('Error deleting survey: ' + error.message);
    }
};

export const getTimesheet = async (teacherId: string) => {
    try {
        const response = await http.get(`/teachers/${teacherId}/timesheet`);
        return response;
    } catch (error: any) {
        throw new Error('Error fetching timesheet: ' + error.message);
    }
};