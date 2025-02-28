import { useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Button, List, ListItem } from '@mui/material';
import { useAuthContext } from '../../providers';
import './nav.css';

const links = [
  {title: "About Us", link: "/", id: 1},
  {title: "Profile", link: "/profile", id: 2},
  {title: "Sign in", link: "/sign-in", id: 3},
]

export const Nav = () => {
  const location = useLocation();
  const { isAuthenticated } = useAuthContext();

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

  return (
    <nav className='navbar-container'>
      <List>
        {links.map((link) => {
          if (link.title === "Profile" && !isAuthenticated) {
            return null;
          }
          return (
            <ListItem key={link.id}>
              <Button
                component={NavLink}
                to={link.link}
                variant={location.pathname === link.link ? 'outlined' : 'text'}
                fullWidth
              >
                {link.title}
              </Button>
            </ListItem>
          );
        })}
      </List>
    </nav>
  );
};