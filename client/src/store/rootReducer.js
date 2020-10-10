import { combineReducers } from 'redux';
import auth from './reducers/authReducer';
import users from './reducers/usersReducer';

const reducer = combineReducers({ auth, users });

export default reducer;
