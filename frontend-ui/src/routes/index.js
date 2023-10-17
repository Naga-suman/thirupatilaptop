import { useRoutes } from 'react-router-dom';

// project import
import LoginRoutes from './LoginRoutes';
import MainRoutes from './MainRoutes';

import { useSelector } from 'react-redux';

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
  const logedUser= useSelector((state) => state.login.islogedIn);

  return useRoutes([MainRoutes(logedUser), LoginRoutes(logedUser)]);
}
