import axios from 'axios';
import alertify from '../../utils/alertify';
import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  TOKEN_FROM_STORAGE,
  AUTH_LOADING,
} from '../actionTypes';
import { loadMyUser } from './usersAction';
import { updateTokenAxios } from '../../utils/utils';

export const login = (userName, password) => {
  return async (dispatch) => {
    try {
      dispatch({ type: AUTH_LOADING });
      const res = await axios.post('/auth/login', { userName, password });
      dispatch({ type: LOGIN_SUCCESS, payload: res.data.token });
      alertify.success('Logged in successfully');

      updateTokenAxios();
      dispatch(loadMyUser());
    } catch (error) {
      alertify.error(error.response.data);
      dispatch({ type: LOGIN_FAILURE });
    }
  };
};

export const logout = () => {
  return {
    type: LOGOUT,
  };
};

export const register = (user) => {
  return async (dispatch) => {
    try {
      dispatch({ type: AUTH_LOADING });
      const res = await axios.post('/users', user);
      dispatch({ type: REGISTER_SUCCESS, payload: res.data.token });

      alertify.success('Registered successfully');
      updateTokenAxios();
      dispatch(loadMyUser());
    } catch (error) {
      alertify.error(error.response.data);
      dispatch({ type: REGISTER_FAILURE });
    }
  };
};

export const setTokenFromLocalStorage = (token) => {
  return {
    type: TOKEN_FROM_STORAGE,
    payload: token,
  };
};
