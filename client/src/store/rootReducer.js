import { combineReducers } from 'redux';
import auth from './reducers/authReducer';
import users from './reducers/usersReducer';
import posts from './reducers/postsReducer';
import notifications from './reducers/notificationsReducer';

const reducer = combineReducers({ auth, users, posts, notifications });

export default reducer;
