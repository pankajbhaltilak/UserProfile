import { Link } from 'react-router-dom';
import routes from './../../routes/routeContainst.json';

const Header = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to={routes.PROFILES}>User Profile</Link>
        </li>
        <li>
          <Link to={routes.CREATE_USER}>Create User</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
