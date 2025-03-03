import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { AuthProvider, useAuthContext } from './auth-provider.tsx';
import Cookies from 'js-cookie';

jest.mock('js-cookie');

const TestComponent = () => {
  const { isAuthenticated, login, logout, isLoading, error } = useAuthContext();

  return (
    <div>
      <div>{isAuthenticated ? 'Authenticated' : 'Not Authenticated'}</div>
      <div>{isLoading ? 'Loading...' : ''}</div>
      <div>{error}</div>
      <button onClick={() => login('user@example.com', 'password')}>Login</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

describe('AuthProvider', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should initialize with the correct auth state based on cookie', () => {
    Cookies.get.mockReturnValue('mockToken');

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByText('Authenticated')).toBeInTheDocument();
  });

  test('should login successfully and set isAuthenticated to true', async () => {
    globalThis.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(
          { success: true, data: { token: 'mockToken' } })
      })
    );

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await act(async () => {
      fireEvent.click(screen.getByText('Login'));
    });
    await waitFor(() => expect(screen.getByText('Authenticated')).toBeInTheDocument());
    expect(Cookies.set).toHaveBeenCalledWith('token', 'mockToken', { expires: 7 });
  });

  test('should handle login failure and set error', async () => {
    globalThis.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(
          { success: false, data: { message: 'Invalid email or password' } })
      })
    );

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await act(async () => {
      fireEvent.click(screen.getByText('Login'));
    });

    await waitFor(() => expect(screen.getByText('Invalid email or password')).toBeInTheDocument());
  });

  test('should logout successfully and remove token', async () => {
    Cookies.get.mockReturnValue('mockToken');
    globalThis.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ success: true, data: {} })
      })
    );

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await act(async () => {
      fireEvent.click(screen.getByText('Logout'));
    });

    expect(Cookies.remove).toHaveBeenCalledWith('token');
    expect(screen.getByText('Not Authenticated')).toBeInTheDocument();
  });
});