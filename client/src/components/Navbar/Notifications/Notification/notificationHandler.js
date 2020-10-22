import {
  LIKE_POST,
  LIKE_COMMENT,
  COMMENT_ON_MY_POST,
  FRIEND_REQUEST,
  FRIEND_REQUEST_ACCEPTED,
  MESSAGE,
  SEND_MESSAGE,
} from './NotificationTypes';

export const notiToMessage = (type, data) => {
  let message = '';
  if (type === LIKE_POST) {
    message = 'liked your post: ' + data.content.substring(0, 20);
    if (data.content.length > 20) {
      message += '...';
    }
  } else if (type === LIKE_COMMENT) {
    message = 'liked your comment ' + data.content.substring(0, 20);
    if (data.content.length > 20) {
      message += '...';
    }
  } else if (type === COMMENT_ON_MY_POST) {
    message = 'commented on your post: ' + data.content.substring(0, 20);
    if (data.content.length > 20) {
      message += '...';
    }
  } else if (type === SEND_MESSAGE || type === MESSAGE) {
    // Handle later
  } else if (type === FRIEND_REQUEST) {
    message = 'sent you a friend request';
  } else if (type === FRIEND_REQUEST_ACCEPTED) {
    message = 'accepted your friend request';
  }

  return message;
};
