import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import { useLocation, Link } from 'react-router-dom';

const TopNavbar = ({ nav, perms, extra, user }) => {
  const Location = useLocation();

  // console.log((!item.perms || (item.perms && perms)),  ( !item.user || (item.user && user.length > 0) ), item.link);
  nav = nav.filter((item) => {
    if (
      (!item.perms || (item.perms && perms)) == true &&
      (!item.user || (item.user && user.length > 0)) == true
    )
      return true;
    return false;
  });

  return (
    <Navbar bg="dark" variant="dark">
      <Nav className="mr-auto">
        {nav.map((item, index) => (
          <Link
            key={`nav-${index}`}
            to={item.link}
            role="button"
            className={
              Location.pathname == item.link ? 'nav-link active' : 'nav-link'
            }
          >
            {<>{item.text}</>}
          </Link>
        ))}
      </Nav>

      {extra}
    </Navbar>
  );
};

export default TopNavbar;
