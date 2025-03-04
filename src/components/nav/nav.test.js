import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { Nav } from './nav.component.tsx';
import { useAuthContext } from '../../providers';

jest.mock('../../providers', () => ({
  useAuthContext: jest.fn()
}));

describe('Nav component', () => {
  let mockLogout;

  beforeEach(() => {
    mockLogout = jest.fn();
    useAuthContext.mockReturnValue({
      isAuthenticated: false,
      logout: mockLogout
    });
  });

  test('should render "Sign in" link when user is not authenticated', () => {
    render(<MemoryRouter><Nav /></MemoryRouter>);

    expect(screen.getByText('Sign in')).toBeInTheDocument();
    expect(screen.queryByText('Profile')).not.toBeInTheDocument();
    expect(screen.queryByText('Sign out')).not.toBeInTheDocument();
  });

  test('should render "Profile" and "Sign out" links when user is authenticated', () => {
    useAuthContext.mockReturnValue({
      isAuthenticated: true,
      logout: mockLogout
    });

    render(<MemoryRouter><Nav /></MemoryRouter>);

    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByText('Sign out')).toBeInTheDocument();
    expect(screen.queryByText('Sign in')).not.toBeInTheDocument();
  });

  test('should call logout when "Sign out" is clicked', () => {
    useAuthContext.mockReturnValue({
      isAuthenticated: true,
      logout: mockLogout
    });

    render(<MemoryRouter><Nav /></MemoryRouter>);

    const signOutButton = screen.getByText('Sign out');
    fireEvent.click(signOutButton);

    expect(mockLogout).toHaveBeenCalledTimes(1);
  });

  test('should update document title based on the current route', () => {
    const renderWithRoute = (route) => {
      return render(
        <MemoryRouter initialEntries={[route]}>
          <Nav />
        </MemoryRouter>
      );
    };

    renderWithRoute('/about-us');
    expect(document.title).toMatch(/about us/i);

    renderWithRoute('/profile');
    expect(document.title).toMatch(/profile/i);

    renderWithRoute('/sign-in');
    expect(document.title).toMatch(/sign in/i);
  });
});