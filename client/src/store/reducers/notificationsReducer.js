import {
  FETCH_NOTIFICATIONS,
  NEW_NOTIFICATION,
  CLEAR_DATA,
} from '../actionTypes';

const initialState = {
  notifications: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_NOTIFICATIONS:
      return {
        ...state,
        notifications: action.payload,
      };
    case NEW_NOTIFICATION:
      const updatedNotifications = [];
      if (state.notifications) {
        state.notifications.forEach((noti) => {
          updatedNotifications.push({ ...noti });
        });
      }

      const newestNotification = action.payload;
      updatedNotifications.unshift(newestNotification);
      return {
        ...state,
        notifications: updatedNotifications,
      };
    case CLEAR_DATA:
      console.log('HERE');
      return {
        notifications: null,
      };
    default:
      return state;
  }
};

export default reducer;
