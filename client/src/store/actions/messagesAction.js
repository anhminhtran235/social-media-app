import axios from 'axios';
import {
  FETCH_MESSAGES,
  LOAD_CURRENT_MESSAGE_USER,
  NEW_MESSAGE,
} from '../actionTypes';
import alertify from '../../utils/alertify';

export const getFriendsWithMessages = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get('/messages');
      const usersWithMessages = res.data;
      usersWithMessages.forEach((uwm) =>
        uwm.messages.sort(
          (m1, m2) =>
            new Date(m1.createdAt).getTime() - new Date(m2.createdAt).getTime()
        )
      );

      dispatch({ type: FETCH_MESSAGES, payload: usersWithMessages });
      if (usersWithMessages.length > 0) {
        const firstUser = usersWithMessages[0];
        dispatch({ type: LOAD_CURRENT_MESSAGE_USER, payload: firstUser._id });
      }
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
