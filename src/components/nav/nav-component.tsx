import { NavLink, useLocation } from 'react-router-dom';
import { Button, List, ListItem } from '@mui/material';
import './nav.css';

const links = [
  {title: "About Us", link: "/", id: 1},
  {title: "Profile", link: "/profile", id: 2},
  {title: "Sign in", link: "/sign-in", id: 3},
]

export const Nav = () => {
  const location = useLocation();

  return (
    <nav className='navbar-container'>
        <List>
          {links.map((link) => (
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
          ))}
        </List>
    </nav>
  );
};