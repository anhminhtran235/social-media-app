import { combineReducers } from 'redux';
import auth from './reducers/authReducer';
import users from './reducers/usersReducer';
import posts from './reducers/postsReducer';

const reducer = combineReducers({ auth, users, posts });

export default reducer;
