import axios from 'axios';
import { FETCH_NOTIFICATIONS, NEW_NOTIFICATION } from '../actionTypes';
import alertify from '../../utils/alertify';

export const getNotifications = (skip, limit) => {
  return async (dispatch) => {
    try {
      let url = '/notifications';
      if (skip && limit) {
        url += '?skip=' + skip + '&limit=' + limit;
      } else if (skip) {
        url += '?skip=' + skip;
      } else if (limit) {
        url += '?limit' + limit;
      }
      const res = await axios.get(url);
      const notifications = res.data;
      dispatch({ type: FETCH_NOTIFICATIONS, payload: notifications });
    } catch (error) {
      console.log(error);
    }
  };
};

export const receivedNewNotification = (notification) => {
  alertify.message('New notification: ' + JSON.stringify(notification));
  return {
    type: NEW_NOTIFICATION,
    payload: notification,
  };
};
