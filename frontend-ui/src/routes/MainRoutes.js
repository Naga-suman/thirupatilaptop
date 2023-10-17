import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';
import { useNavigate } from 'react-router-dom';
// import { element } from 'prop-types';

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));
// const Newsheme = Loadable(lazy(() => import('pages/schemes')));
// render - sample page
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/SamplePage')));

// render - utilities
const Typography = Loadable(lazy(() => import('pages/components-overview/Typography')));
const Color = Loadable(lazy(() => import('pages/components-overview/Color')));
const Shadow = Loadable(lazy(() => import('pages/components-overview/Shadow')));
const AntIcons = Loadable(lazy(() => import('pages/components-overview/AntIcons')));
const NewCustomer= Loadable(lazy(() => import('pages/customer')));
const NewScheme= Loadable(lazy(() => import('pages/schemes')));
const CustomersList= Loadable(lazy(() => import('pages/customer/CustomersLIst')));
const SchemesList = Loadable(lazy(() => import('pages/schemes/SchemesList')));
const Loginout= Loadable(lazy(() => import('../pages/authentication/Logout')));
const FinancePage= Loadable(lazy(() => import('../pages/finance/index')))

// ==============================|| MAIN ROUTING ||============================== //


const MainRoutes = (isLoggedIn) => {
  const navigate = useNavigate();

  return {
    path: '/',
    element: <MainLayout />,
    children: [
     
      {
        path: '/',
        element: isLoggedIn ? <DashboardDefault /> : null
      },
      {
        path: 'color',
        element: <Color />
      },
      {
        path:'/newScheme',
        element:isLoggedIn ? <NewScheme/> :navigate('/login')
      },
      {
        path:'/finance',
        element:isLoggedIn ? <FinancePage/> :navigate('/login')
      },
      {
        path: 'newCustomer',
        element: <NewCustomer />
      },
      {
        path: 'customers',
        element: <CustomersList />
      },
      {
        path: 'schemes',
        element: <SchemesList />
      },
      {
        path: 'logout',
        element: <Loginout />
      },
      {
        path: 'dashboard',
        children: [
          {
            path: 'default',
            element:  isLoggedIn ? <DashboardDefault /> : navigate('/login')
          }
        ]
      },
      {
        path: 'sample-page',
        element:isLoggedIn ? <SamplePage /> : navigate('/login')
      },
      {
        path: 'shadow',
        element: isLoggedIn ? <Shadow /> : navigate('/login')
      },
      {
        path: 'typography',
        element: <Typography />
      },
      {
        path: 'icons/ant',
        element: <AntIcons />
      },
    ]
  };
}
export default MainRoutes;
