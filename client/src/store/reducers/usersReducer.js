import {
  LOAD_MY_USER_SUCCESS,
  LOAD_MY_USER_FAILURE,
  LOGOUT,
  LOAD_USERS_SUCCESS,
  LOAD_USERS_FAILURE,
} from '../actionTypes';

const initialState = {
  myUser: null,
  users: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_MY_USER_SUCCESS:
      return {
        ...state,
        myUser: action.payload,
      };
    case LOAD_MY_USER_FAILURE:
    case LOGOUT:
      return {
        ...state,
        myUser: null,
      };
    default:
      return state;
  }
};

export default reducer;
