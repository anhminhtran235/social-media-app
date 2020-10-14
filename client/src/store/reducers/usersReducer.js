import {
  LOAD_MY_USER_SUCCESS,
  LOAD_MY_USER_FAILURE,
  LOGOUT,
  LOAD_USERS_SUCCESS,
  LOAD_CURRENTLY_VIEWING_USER_SUCCESS,
  LOAD_CURRENTLY_VIEWING_USER_FAILURE,
  CLEAR_DATA,
  SET_MY_USER,
  USER_LOADING,
} from '../actionTypes';

const initialState = {
  myUser: null,
  currentlyViewingUser: null,
  users: null,
  loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_MY_USER_SUCCESS:
      return {
        ...state,
        myUser: action.payload,
        loading: false,
      };
    case LOAD_MY_USER_FAILURE:
    case LOGOUT:
      return {
        ...state,
        myUser: null,
        loading: false,
      };
    case LOAD_CURRENTLY_VIEWING_USER_SUCCESS:
      return {
        ...state,
        currentlyViewingUser: action.payload,
        loading: false,
      };
    case LOAD_CURRENTLY_VIEWING_USER_FAILURE:
      return {
        ...state,
        currentlyViewingUser: null,
        loading: false,
      };
    case LOAD_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload,
        loading: false,
      };
    case SET_MY_USER:
      return {
        ...state,
        myUser: action.payload,
      };
    case USER_LOADING:
      return {
        ...state,
        loading: true,
      };
    case CLEAR_DATA:
      return {
        myUser: null,
        currentlyViewingUser: null,
        users: null,
        loading: false,
      };
    default:
      return state;
  }
};

export default reducer;
