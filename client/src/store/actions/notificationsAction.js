import axios from 'axios';
import {
  FETCH_NOTIFICATIONS,
  NEW_NOTIFICATION,
  NOTIFICATION_LOADING,
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
      dispatch({ type: FETCH_NOTIFICATIONS, payload: notifications });
    } catch (error) {
      console.log(error);
    }
  };
};

export const receivedNewNotification = (notification) => {
  alertify.success('New notification: ' + JSON.stringify(notification));
  return {
    type: NEW_NOTIFICATION,
    payload: notification,
  };
};
