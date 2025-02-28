import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../providers';

interface ProtectedRouteProps {
  element: ReactNode;
}

export const ProtectedRoute= ({ element }: ProtectedRouteProps) => {
  const { isAuthenticated } = useAuthContext();

  return isAuthenticated ? element : <Navigate to="/sign-in"/>;
};