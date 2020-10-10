import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOAD_USER_FAILURE,
  LOGOUT,
} from '../actionTypes';

const initialState = {
  token: null,
  isAuthenticated: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      return {
        token: action.payload,
        isAuthenticated: true,
      };
    case LOGIN_FAILURE:
    case REGISTER_FAILURE:
    case LOGOUT:
    case LOAD_USER_FAILURE:
      return {
        token: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

export default reducer;
