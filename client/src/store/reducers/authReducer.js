import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOAD_MY_USER_FAILURE,
  LOGOUT,
  TOKEN_FROM_STORAGE,
  LOAD_MY_USER_SUCCESS,
  AUTH_LOADING,
  CLEAR_DATA,
} from '../actionTypes';

const initialState = {
  token: null,
  isAuthenticated: false,
  loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem('token', action.payload);
      return {
        token: action.payload,
        isAuthenticated: true,
        loading: false,
      };
    case LOAD_MY_USER_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
      };
    case TOKEN_FROM_STORAGE:
      return {
        ...state,
        token: action.payload,
      };
    case LOGIN_FAILURE:
    case REGISTER_FAILURE:
    case LOGOUT:
    case LOAD_MY_USER_FAILURE:
      localStorage.removeItem('token');
      return {
        token: null,
        isAuthenticated: false,
        loading: false,
      };
    case CLEAR_DATA:
      return {
        token: null,
        isAuthenticated: false,
        loading: false,
      };
    case AUTH_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export default reducer;
