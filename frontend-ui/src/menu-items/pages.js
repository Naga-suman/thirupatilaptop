// assets
import { LoginOutlined, ProfileOutlined } from '@ant-design/icons';

// icons
const icons = {
  LoginOutlined,
  ProfileOutlined
};

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const pages = {
  id: 'financialOption',
  title: 'Financial Option',
  type: 'group',
  children: [
    {
      id: 'schemes',
      title: 'My Schemes',
      type: 'item',
      url: '/schemes',
      icon: icons.LoginOutlined,
      target: false
    },
    
    {
      id: 'customers',
      title: 'My Customers',
      type: 'item',
      url: '/customers',
      icon: icons.ProfileOutlined,
      target: false
    },
    {
      id: 'newScheme',
      title: 'Create New Scheme',
      type: 'item',
      url: '/newScheme',
      icon: icons.ProfileOutlined,
      target: false
    },
    {
      id: 'newCustomer',
      title: 'Create Customer',
      type: 'item',
      url: '/newCustomer',
      icon: icons.ProfileOutlined,
      target: false
    },
    {
      id: 'financePage',
      title: 'Finance',
      type: 'item',
      url: '/finance',
      icon: icons.ProfileOutlined,
      target: false
    },
    {
      id: 'lotout',
      title: 'Logout',
      type: 'item',
      url: '/logout',
      icon: icons.ProfileOutlined,
      target: false
    }
    
  ]
};

export default pages;
