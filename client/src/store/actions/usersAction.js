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
  SET_MY_USER,
  USER_LOADING,
} from '../actionTypes';

export const loadMyUser = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: USER_LOADING });
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
      dispatch({ type: USER_LOADING });
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

      dispatch({ type: USER_LOADING });
      const res = await axios.get(url);
      dispatch({ type: LOAD_USERS_SUCCESS, payload: res.data });
    } catch (error) {
      console.log(error);
      dispatch({ type: LOAD_USERS_FAILURE });
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
