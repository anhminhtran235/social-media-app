import axios from 'axios';
import {
  LOAD_MY_USER_SUCCESS,
  LOAD_MY_USER_FAILURE,
  LOAD_USERS_SUCCESS,
  LOAD_USERS_FAILURE,
} from '../actionTypes';

export const loadMyUser = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get('/users/me');
      console.log(res.data);
      dispatch({ type: LOAD_MY_USER_SUCCESS, payload: res.data });
    } catch (error) {
      dispatch({ type: LOAD_MY_USER_FAILURE });
    }
  };
};
