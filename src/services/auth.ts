import authApi from '../features/auth/api';

export const authService = {
  login: (credentials: { email: string; password: string }) => authApi.login(credentials),
  logout: () => authApi.logout(),
  getCurrentUser: () => authApi.getCurrentUser(),
};

export default authService;