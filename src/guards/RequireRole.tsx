import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Role } from '../types';

interface RequireRoleProps {
  children: React.ReactNode;
  allowed: Role[];
  fallbackPath?: string;
}

const RequireRole: React.FC<RequireRoleProps> = ({ children, allowed, fallbackPath = '/login' }) => {
  const user = useSelector((state: RootState) => state.user);

  if (!user || !user.isAuthenticated) {
    return <Navigate to={fallbackPath} replace />;
  }
  if (user.role && allowed.includes(user.role)) {
    return <>{children}</>;
  }
  return <Navigate to="/unauthorized" replace />;
};

export default RequireRole;