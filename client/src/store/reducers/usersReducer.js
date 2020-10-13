import {
  LOAD_MY_USER_SUCCESS,
  LOAD_MY_USER_FAILURE,
  LOGOUT,
  LOAD_USERS_SUCCESS,
  LOAD_USERS_FAILURE,
  LOAD_CURRENTLY_VIEWING_USER_SUCCESS,
  LOAD_CURRENTLY_VIEWING_USER_FAILURE,
  CLEAR_DATA_WHEN_RELOAD,
  SET_MY_USER,
} from '../actionTypes';

const initialState = {
  myUser: null,
  currentlyViewingUser: null,
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
    case LOAD_CURRENTLY_VIEWING_USER_SUCCESS:
      return {
        ...state,
        currentlyViewingUser: action.payload,
      };
    case LOAD_CURRENTLY_VIEWING_USER_FAILURE:
      return {
        ...state,
        currentlyViewingUser: null,
      };
    case LOAD_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload,
      };
    case SET_MY_USER:
      return {
        ...state,
        myUser: action.payload,
      };
    case CLEAR_DATA_WHEN_RELOAD:
      return {
        myUser: null,
        currentlyViewingUser: null,
        users: null,
      };

    default:
      return state;
  }
};

export default reducer;
