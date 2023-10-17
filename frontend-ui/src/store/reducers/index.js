// third-party
import { combineReducers } from 'redux';

// project import
import menu from './menu';
import login from './login';

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({ 
    menu :menu,
    login:login
});

export default reducers;
