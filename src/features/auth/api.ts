import http from '../../services/http';

const authApi = {
  login: async (credentials: { email: string; password: string }) => {
    return await http.post('/auth/login', credentials);
  },

  logout: async () => {
    return await http.post('/auth/logout');
  },

  twoFactorAuth: async (code: string) => {
    return await http.post('/auth/two-factor', { code });
  },

  getCurrentUser: async () => {
    return await http.get('/auth/me');
  },
};

export default authApi;