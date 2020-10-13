import axios from 'axios';
import alertify from '../../utils/alertify';
import { buildUrl } from '../../utils/utils';
import {
  LOAD_MY_USER_SUCCESS,
  LOAD_MY_USER_FAILURE,
  LOAD_USERS_SUCCESS,
  LOAD_USERS_FAILURE,
  LOAD_CURRENTLY_VIEWING_USER_SUCCESS,
  LOAD_CURRENTLY_VIEWING_USER_FAILURE,
  IS_AUTHENTICATING,
  SET_MY_USER,
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

export const loadUsers = (skip, limit) => {
  return async (dispatch) => {
    try {
      const baseUrl = '/users';
      const url = buildUrl(baseUrl, skip, limit);

      const res = await axios.get(url);
      dispatch({ type: LOAD_USERS_SUCCESS, payload: res.data });
    } catch (error) {
      console.log(error);
    }
  };
};

export const addFriend = (friendId) => {
  return async (dispatch) => {
    try {
      const res = await axios.post('/friends/add', { otherUserId: friendId });
      const newMe = res.data;
      dispatch({ type: SET_MY_USER, payload: newMe });
    } catch (error) {
      alertify.error(error.response.data);
    }
  };
};

export const cancelFriendRequest = (friendId) => {
  return async (dispatch) => {
    try {
      const res = await axios.post('/friends/removeRequest', {
        otherUserId: friendId,
      });
      const newMe = res.data;
      dispatch({ type: SET_MY_USER, payload: newMe });
    } catch (error) {
      alertify.error(error.response.data);
    }
  };
};
