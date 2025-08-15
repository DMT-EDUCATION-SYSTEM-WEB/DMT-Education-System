import { useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../store/slices/userSlice';
import { Role } from '../types';

const useAuthRedirect = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const user = useSelector(selectCurrentUser);

    // Hàm điều hướng dựa trên role
    const getRedirectPath = useCallback((role: Role): string => {
        switch (role) {
            case Role.ADMIN:
                return '/admin/dashboard';
            case Role.TEACHER:
                return '/teachers/assignments';
            case Role.STUDENT:
                return '/students/dashboard';
            case Role.STAFF:
                return '/staff/tasks';
            default:
                return '/students/dashboard';
        }
    }, []);

    // Hàm redirect với role cụ thể
    const redirectToRoleDashboard = useCallback((role: Role) => {
        const path = getRedirectPath(role);
        navigate(path, { replace: true });
    }, [navigate, getRedirectPath]);

    // Hàm kiểm tra quyền truy cập
    const hasPermission = useCallback((allowedRoles: Role[]) => {
        if (!user.isAuthenticated || !user.role) return false;
        return allowedRoles.includes(user.role);
    }, [user.isAuthenticated, user.role]);

    // Hàm redirect với thông báo
    const redirectWithMessage = useCallback((path: string, message?: string) => {
        navigate(path, { 
            replace: true, 
            state: { 
                from: location.pathname,
                message 
            } 
        });
    }, [navigate, location.pathname]);

    // Tự động redirect nếu user đã đăng nhập
    useEffect(() => {
        if (user.isAuthenticated && user.role) {
            const currentPath = location.pathname;
            const expectedPath = getRedirectPath(user.role);
            
            // Chỉ redirect nếu đang ở trang login hoặc trang chủ
            if (currentPath === '/login' || currentPath === '/') {
                redirectToRoleDashboard(user.role);
            }
        }
    }, [user.isAuthenticated, user.role, location.pathname, redirectToRoleDashboard, getRedirectPath]);

    // Hàm logout và redirect
    const logoutAndRedirect = useCallback(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login', { replace: true });
    }, [navigate]);

    return {
        redirectToRoleDashboard,
        getRedirectPath,
        hasPermission,
        redirectWithMessage,
        logoutAndRedirect,
        currentUser: user,
        isAuthenticated: user.isAuthenticated,
        userRole: user.role
    };
};

export default useAuthRedirect;
