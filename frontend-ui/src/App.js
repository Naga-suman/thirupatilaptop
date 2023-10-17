// project import
import Routes from 'routes';
import { useEffect } from 'react';
import ThemeCustomization from 'themes';
import ScrollTop from 'components/ScrollTop';

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //

const App = () => {

  const logedUserId= useSelector((state) => state.login.userId);
  const navigate = useNavigate();
  useEffect(() => {
    if(logedUserId === null){
      navigate('/login');
    }
  }, []);

  return (
    <ThemeCustomization>
      <ScrollTop>
        <Routes />
      </ScrollTop>
    </ThemeCustomization>
  );
}

export default App;
