import axios from 'axios';
import {
  FETCH_MESSAGES,
  LOAD_CURRENT_MESSAGE_USER,
  MARK_READ_CONVERSATION,
  NEW_MESSAGE,
} from '../actionTypes';
import alertify from '../../utils/alertify';

export const getFriendsWithMessages = () => {
  return async (dispatch, getState) => {
    try {
      const res = await axios.get('/messages');
      const usersWithMessages = res.data;
      const myUser = getState().users.myUser;

      sortMessagesByCreatedDate(usersWithMessages);
      markReadUnread(usersWithMessages, myUser._id);

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

const sortMessagesByCreatedDate = (usersWithMessages) => {
  usersWithMessages.forEach((uwm) =>
    uwm.messages.sort(
      (m1, m2) =>
        new Date(m1.createdAt).getTime() - new Date(m2.createdAt).getTime()
    )
  );
};

const markReadUnread = (usersWithMessages, myUserId) => {
  usersWithMessages.forEach((uwm) => {
    const shouldMarkUnread = uwm.messages.some((message) => {
      const isMessageFromOther = message.fromUserId !== myUserId;
      const isRead = message.read;
      return isMessageFromOther && !isRead;
    });

    if (shouldMarkUnread) {
      uwm.read = false;
    } else {
      uwm.read = true;
    }
  });
};

export const markReadConversation = (otherUserId) => {
  return async (dispatch) => {
    try {
      await axios.post('/messages/read', { otherUserId });
      dispatch({ type: MARK_READ_CONVERSATION, payload: otherUserId });
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
