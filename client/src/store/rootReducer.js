import { combineReducers } from 'redux';
import auth from './reducers/authReducer';
import users from './reducers/usersReducer';
import posts from './reducers/postsReducer';
import notifications from './reducers/notificationsReducer';
import messages from './reducers/messagesReducer';

const reducer = combineReducers({
  auth,
  users,
  posts,
  notifications,
  messages,
});

export default reducer;
