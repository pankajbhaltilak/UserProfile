import { Route, Routes } from 'react-router-dom';
import CreateUser from '../pages/CreateUser';
import Home from '../pages/Home';
import routes from './routeContainst.json';

const PageRoutes = () => {
  return (
    <Routes>
      <Route path={routes.HOME} element={<Home />} />
      <Route path={routes.PROFILES} element={<Home />} />
      <Route path={`${routes.PROFILES}/:page`} element={<Home />} />
      <Route path={routes.CREATE_USER} element={<CreateUser />} />
    </Routes>
  );
};

export default PageRoutes;
