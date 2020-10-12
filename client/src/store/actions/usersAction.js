import axios from 'axios';
import alertify from '../../utils/alertify';
import {
  LOAD_MY_USER_SUCCESS,
  LOAD_MY_USER_FAILURE,
  LOAD_USERS_SUCCESS,
  LOAD_USERS_FAILURE,
  LOAD_CURRENTLY_VIEWING_USER_SUCCESS,
  LOAD_CURRENTLY_VIEWING_USER_FAILURE,
  IS_AUTHENTICATING,
} from '../actionTypes';

export const loadMyUser = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: IS_AUTHENTICATING });
      const res = await axios.get('/users/me');
      dispatch({ type: LOAD_MY_USER_SUCCESS, payload: res.data });
    } catch (error) {
      dispatch({ type: LOAD_MY_USER_FAILURE });
    }
  };
};

export const updateMyProfile = (fullName, age, bio) => {
  return async (dispatch) => {
    try {
      await axios.put('/users/me', { fullName, age, bio });
      dispatch(loadMyUser());
      alertify.success('Update profile sucessfully');
    } catch (error) {
      alertify.error('Failed. Please try again');
    }
  };
};

export const loadAUser = (id) => {
  return async (dispatch) => {
    try {
      const res = await axios.get('/users/user/' + id);
      dispatch({
        type: LOAD_CURRENTLY_VIEWING_USER_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      alertify.error(error.response.data);
      dispatch({ type: LOAD_CURRENTLY_VIEWING_USER_FAILURE });
    }
  };
};
