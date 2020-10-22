import React from 'react';
import { Component } from 'react';
import { notiToMessage } from './notificationHandler';
import './Notification.css';
import moment from 'moment';
import { withRouter } from 'react-router-dom';
import {
  COMMENT_ON_MY_POST,
  FRIEND_REQUEST,
  FRIEND_REQUEST_ACCEPTED,
  LIKE_COMMENT,
  LIKE_POST,
  MESSAGE,
} from './NotificationTypes';
import { connect } from 'react-redux';
import { markReadNoti } from '../../../../store/actions/notificationsAction';

class Notification extends Component {
  state = {
    reRender: null,
  };

  componentDidMount() {
    const reRenderEvery20Seconds = 20 * 1000;
    this.interval = setInterval(() => {
      this.setState({ reRender: Date.now() });
    }, reRenderEvery20Seconds);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onClickNotification(notification) {
    const { read, data, type } = notification;
    console.log(notification);
    if (!read) {
      this.props.markReadNoti(notification._id);
    }

    if (
      type === LIKE_POST ||
      type === LIKE_COMMENT ||
      type === COMMENT_ON_MY_POST
    ) {
      this.props.history.push('/post/' + data.postId);
    } else if (type === MESSAGE) {
      this.props.history.push('/messages');
    } else if (type === FRIEND_REQUEST || type === FRIEND_REQUEST_ACCEPTED) {
      const fromUserId = data.from;
      this.props.history.push('/users/' + fromUserId);
    }
  }

  render() {
    const noti = this.props.notification;
    const { _id, createdAt, data, type } = noti;
    const content = data.from + ' ' + notiToMessage(type, data);

    return (
      <div
        className={'d-flex noti-card'}
        onClick={() => this.onClickNotification(noti)}
      >
        <img
          className='rounded-circle mr-2 avatar-image'
          src='https://picsum.photos/50/50'
          alt=''
        />
        <div>
          <h6 className='card-title d-flex justify-content-between mb-0'>
            <p>{_id}</p>
            <div className='text-muted h7'>
              {' '}
              <i className='fa fa-clock-o'></i> {moment(createdAt).fromNow()}
            </div>
          </h6>
          <p className='card-text'>{content}</p>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    markReadNoti: (notiId) => dispatch(markReadNoti(notiId)),
  };
};

export default connect(null, mapDispatchToProps)(withRouter(Notification));
