import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../providers';

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated } = useAuthContext();

  return isAuthenticated ? children : <Navigate to="/sign-in" />;
};