import React, { Fragment } from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { getNotifications } from '../../../store/actions/notificationsAction';
import Notification from './Notification/Notification';

class Notifications extends Component {
  componentDidUpdate() {
    if (this.props.isAuthenticated && !this.props.notifications) {
      this.props.getNotifications();
    }
  }

  render() {
    let notifications = null;
    if (this.props.notifications) {
      notifications = this.props.notifications.map((noti) => {
        return <Notification notification={noti} key={noti._id} />;
      });
    }
    return notifications;
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    notifications: state.notifications.notifications,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getNotifications: (skip, limit) => dispatch(getNotifications(skip, limit)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
