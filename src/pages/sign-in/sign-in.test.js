import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { useAuthContext } from '../../providers';
import { SignIn } from './sign-in.component.tsx';

jest.mock('../../providers', () => ({
  useAuthContext: jest.fn()
}));

describe('SignIn Component', () => {
  let mockLogin;

  beforeEach(() => {
    mockLogin = jest.fn();
    useAuthContext.mockReturnValue({
      login: mockLogin,
      isLoading: false,
      error: ''
    });

    mockLogin.mockClear();
  });


  test('should render SignIn component correctly', () => {
    render(<SignIn />);

    expect(screen.getByText('Sign In')).toBeInTheDocument();

    expect(screen.getByPlaceholderText('Enter email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();

    expect(screen.getByRole('button', { name: /log in/i })).toBeInTheDocument();
  });

  test('should call login with correct credentials', async () => {
    const email = 'aleksei@example.com';
    const password = 'lkJlkn8hj';

    render(<SignIn />);

    fireEvent.change(screen.getByPlaceholderText(/Email/i), { target: { value: email } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: password } });

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /log in/i }));
    });

    expect(mockLogin).toHaveBeenCalledWith(email, password);
  });

  test('should display loading state when logging in', async () => {
    useAuthContext.mockReturnValue({
      login: mockLogin,
      isLoading: true,
      error: ''
    });

    render(<SignIn />);

    expect(screen.getByRole('button', { name: /logging in\.\.\./i })).toBeInTheDocument();
  });

  test('should display error message if authentication fails', async () => {
    useAuthContext.mockReturnValue({
      login: mockLogin,
      isLoading: false,
      error: 'Invalid email or password'
    });

    render(<SignIn />);

    fireEvent.change(screen.getByPlaceholderText(/Email/i), { target: { value: 'wrong@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'wrongpassword' } });

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /log in/i }));
    });

    await waitFor(() =>
      expect(screen.getByText('Invalid email or password')).toBeInTheDocument()
    );
  });
});