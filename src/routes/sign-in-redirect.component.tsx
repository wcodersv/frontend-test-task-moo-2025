import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../providers';
import { SignIn } from '../pages/sign-in';

export const SignInRedirect = () => {
  const { isAuthenticated } = useAuthContext();

  if (isAuthenticated) {
    return <Navigate to="/profile" />;
  }

  return <SignIn />;
};