import axios from 'axios';
import {
  FETCH_NOTIFICATIONS,
  NEW_NOTIFICATION,
  MARK_READ_NOTIFICATION,
  COMMENTED_POST,
} from '../actionTypes';
import {
  COMMENT_ON_MY_POST,
  COMMENT_ON_SAME_POST,
} from '../../components/Navbar/Notifications/Notification/NotificationTypes';
import { buildUrl } from '../../utils/utils';

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
    if (
      notification.type === COMMENT_ON_MY_POST ||
      notification.type === COMMENT_ON_SAME_POST
    ) {
      dispatch({ type: COMMENTED_POST, payload: notification.data.post });
    }
    if (notification.type !== COMMENT_ON_SAME_POST) {
      dispatch({ type: NEW_NOTIFICATION, payload: notification });
    }
  };
};

export const markReadNoti = (notiId) => {
  return async (dispatch) => {
    try {
      await axios.post('/notifications/read', { notiId });
      dispatch({ type: MARK_READ_NOTIFICATION, payload: notiId });
    } catch (error) {
      console.log(error);
    }
  };
};
