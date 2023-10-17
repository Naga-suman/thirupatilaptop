import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MinimalLayout from 'layout/MinimalLayout';
import { useNavigate } from 'react-router-dom';
// render - login
const AuthLogin = Loadable(lazy(() => import('pages/authentication/Login')));
const AuthRegister = Loadable(lazy(() => import('pages/authentication/Register')));
const NewScheme = Loadable(lazy(() => import('pages/schemes')));

// ==============================|| AUTH ROUTING ||============================== //

const LoginRoutes = (isLoggedIn) => {
  const navigate = useNavigate();

  return {
    path: '/',
    element: <MinimalLayout />,
    children: [
      {
        path:'/newScheme',
        element:isLoggedIn ? <NewScheme/> :navigate('/login')
      },
      {
        path: 'login',
        element: <AuthLogin />
      },
      {
        path: 'register',
        element: isLoggedIn ? <AuthRegister/> :navigate('/login')
      }
    ]
  };
} 

export default LoginRoutes;
