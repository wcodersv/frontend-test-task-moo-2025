import {
  createContext, useContext, useState, useEffect
} from 'react';
import Cookies from 'js-cookie';

export interface IAuthContext {
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
}


export const AuthContext = createContext<IAuthContext>({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
  isLoading: false,
  error: null,
});


export const AuthProvider = ({children}: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify({email, password}),
      });

      const {data, success} = await response.json();

      if (success) {
        setIsAuthenticated(true);
        Cookies.set('token', data.token, {expires: 7});
      } else {
        setIsAuthenticated(false);
        setError(data.message);
      }
    } catch (error) {
      setIsAuthenticated(false);
      setError('Something went wrong. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    const token = Cookies.get('token');

    if (!token) {
      console.error('No token found');
      return;
    }

    try {
      const response = await fetch(`/api/logout?token=${token}`, {
        method: 'DELETE',
      });

      const { success, data } = await response.json();

      if (success) {
        Cookies.remove('token');
        setIsAuthenticated(false);
        console.log('User logged out successfully');
      } else {
        console.error('Logout failed', data);
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, isLoading, error }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuthContext = () => useContext(AuthContext);