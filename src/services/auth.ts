import authApi from '../features/auth/api';

// Types
interface LoginResponse {
  token: string;
  user: {
    id: number;
    email: string;
    full_name: string;
    role_id: number;
  };
}

export const authService = {
  login: async (credentials: { email: string; password: string }): Promise<LoginResponse> => {
    const response = await authApi.login(credentials);
    return response as LoginResponse;
  },
  logout: () => authApi.logout(),
  getCurrentUser: () => authApi.getCurrentUser(),
};

export default authService;