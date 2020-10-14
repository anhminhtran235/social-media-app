import axios from 'axios';
import { FETCH_MESSAGES, NEW_MESSAGE } from '../actionTypes';
import alertify from '../../utils/alertify';

export const getFriendsWithMessages = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get('/messages');
      dispatch({ type: FETCH_MESSAGES, payload: res.data });
    } catch (error) {
      console.log(error);
    }
  };
};

export const sendMessage = (receiverId, content) => {
  return async (dispatch) => {
    try {
      const res = await axios.post('/messages', {
        otherUserId: receiverId,
        content,
      });
      dispatch({
        type: NEW_MESSAGE,
        payload: { message: res.data, fromMe: true },
      });
    } catch (error) {
      console.log(error);
      alertify.error(error.response.data);
    }
  };
};

export const receiveMessage = (message) => {
  return {
    type: NEW_MESSAGE,
    payload: { message, fromMe: false },
  };
};
