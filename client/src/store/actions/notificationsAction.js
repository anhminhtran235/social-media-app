import axios from 'axios';
import {
  FETCH_NOTIFICATIONS,
  NEW_NOTIFICATION,
  MARK_READ_NOTIFICATION,
  COMMENTED_POST,
} from '../actionTypes';
import { buildUrl } from '../../utils/utils';
import alertify from '../../utils/alertify';

export const getNotifications = (skip, limit) => {
  return async (dispatch) => {
    try {
      const baseUrl = '/notifications';
      const url = buildUrl(baseUrl, skip, limit);

      const res = await axios.get(url);
      const notifications = res.data;
      sortNotiByCreatedDate(notifications);
      dispatch({ type: FETCH_NOTIFICATIONS, payload: notifications });
    } catch (error) {
      console.log(error);
    }
  };
};

const sortNotiByCreatedDate = (noti) => {
  noti.sort(
    (n1, n2) =>
      new Date(n2.createdAt).getTime() - new Date(n1.createdAt).getTime()
  );
};

export const receivedNewNotification = (notification) => {
  return (dispatch) => {
    alertify.success(JSON.stringify(notification));
    if (notification.type === 'COMMENT') {
      dispatch({ type: COMMENTED_POST, payload: notification.data.post });
    }
    return {
      type: NEW_NOTIFICATION,
      payload: notification,
    };
  };
};

export const markReadNoti = (notiId) => {
  return async (dispatch) => {
    try {
      console.log('HERE', notiId);
      await axios.post('/notifications/read', { notiId });
      dispatch({ type: MARK_READ_NOTIFICATION, payload: notiId });
    } catch (error) {
      console.log(error);
    }
  };
};
