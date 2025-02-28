import { NavLink} from 'react-router-dom';

const links = [
  {title: "About Us", link: "/", id: 1},
  {title: "Profile", link: "/profile", id: 2},
  {title: "Sign in", link: "/sign-in", id: 3},
]


export const Nav = () => {

  return (
    <nav>
      <ul>
        {links.map((link) => (
          <li key={link.id}>
            <NavLink to={link.link}>{link.title}</NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}