import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from './protected-route.component.tsx';
import { SignIn } from '../pages/sign-in';
import { useAuthContext } from '../providers';

jest.mock('../providers', () => ({
  useAuthContext: jest.fn(),
}));

describe('ProtectedRoute component', () => {
  beforeEach(() => {
    useAuthContext.mockReturnValue({
      isAuthenticated: true,
    });
  });

  test('should render children when user is authenticated', () => {
    useAuthContext.mockReturnValue({ isAuthenticated: true });
    render(
      <MemoryRouter>
        <ProtectedRoute>
          <div>Protected Content</div>
        </ProtectedRoute>
      </MemoryRouter>
    );

    expect(screen.getByText('Protected Content')).toBeInTheDocument();
  });

  it('should redirect to /sign-in when user is not authenticated', () => {
    useAuthContext.mockReturnValue({ isAuthenticated: false });
    render(
      <MemoryRouter initialEntries={['/protected']}>
        <Routes>
          <Route path="/protected" element={<ProtectedRoute><div>Protected Content</div></ProtectedRoute>} />
          <Route path="/sign-in" element={<SignIn />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
    expect(screen.getByText('Sign In')).toBeInTheDocument();
  });
});