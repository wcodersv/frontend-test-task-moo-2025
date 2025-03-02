import { useEffect, useCallback, useMemo } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Button, List, ListItem } from '@mui/material';
import { useAuthContext } from '../../providers';
import './nav.css';

export const Nav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuthContext();

  useEffect(() => {
    if (location.pathname === '/sign-out') {
      navigate('/');
    }
  }, [location.pathname]);

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/profile':
        return 'Profile Page';
      case '/sign-in':
        return 'Sign In';
      case '/':
      default:
        return 'About Us';
    }
  };

  useEffect(() => {
    document.title = getPageTitle();
  }, [location.pathname]);

  const links = useMemo(() => {
    const commonLinks = [
      { title: 'About Us', link: '/', id: 1 }
    ];

    if (isAuthenticated) {
      commonLinks.push(
        { title: 'Profile', link: '/profile', id: 2 },
        { title: 'Sign out', link: '/sign-out', id: 3 }
      );
    } else {
      commonLinks.push(
        { title: 'Sign in', link: '/sign-in', id: 4 }
      );
    }

    return commonLinks;
  }, [isAuthenticated]);

  const handleSignOut = useCallback(() => {
    logout();
  }, [logout]);

  return (
    <nav className="navbar-container">
      <List>
        {links.map((link) => (
          <ListItem key={link.id}>
            <Button
              component={NavLink}
              to={link.link}
              variant={location.pathname === link.link ? 'outlined' : 'text'}
              fullWidth
              onClick={link.title === 'Sign out' ? handleSignOut : undefined}
            >
              {link.title}
            </Button>
          </ListItem>
        ))}
      </List>
    </nav>
  );
};