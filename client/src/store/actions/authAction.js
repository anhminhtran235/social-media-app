import axios from 'axios';
import alertify from '../../utils/alertify';
import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
} from '../actionTypes';

export const login = (userName, password) => {
  return async (dispatch) => {
    try {
      const res = await axios.post('/auth/login', { userName, password });
      dispatch({ type: LOGIN_SUCCESS, payload: res.data.token });
      alertify.success('Logged in successfully');
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
      const res = await axios.post('/users', user);
      dispatch({ type: REGISTER_SUCCESS, payload: res.data.token });
      alertify.success('Registered successfully');
    } catch (error) {
      alertify.error(error.response.data);
      dispatch({ type: REGISTER_FAILURE });
    }
  };
};
