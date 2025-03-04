import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { SignInRedirect } from './sign-in-redirect.component.tsx';
import { useAuthContext } from '../providers';
import { Profile } from '../pages/profile';

jest.mock('../providers', () => ({
  useAuthContext: jest.fn(),
}));

describe('SignInRedirect component', () => {
  test('should redirect to /profile when user is authenticated', () => {
    useAuthContext.mockReturnValue({ isAuthenticated: true });

    render(
      <MemoryRouter initialEntries={['/sign-in']}>
        <Routes>
          <Route path="/sign-in" element={<SignInRedirect />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/Welcome/i)).toBeInTheDocument();
    expect(screen.queryByText('Sign In')).not.toBeInTheDocument();
  });

  test('should render SignIn page when user is not authenticated', () => {
    useAuthContext.mockReturnValue({ isAuthenticated: false });

    render(
      <MemoryRouter initialEntries={['/sign-in']}>
        <Routes>
          <Route path="/sign-in" element={<SignInRedirect />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Sign In')).toBeInTheDocument();
  });
});