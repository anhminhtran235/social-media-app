import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { getNotifications } from '../../../store/actions/notificationsAction';
import Notification from './Notification/Notification';
import { Dropdown } from 'react-bootstrap';
import './Notifications.css';

class Notifications extends Component {
  componentDidMount() {
    this.props.getNotifications();
  }

  render() {
    let notifications = null;
    let numUnreadNoti = 0;
    if (this.props.notifications) {
      numUnreadNoti = this.props.notifications.filter((noti) => !noti.read)
        .length;
      notifications = this.props.notifications.map((noti) => {
        const className = noti.read ? '' : 'unread-noti';
        return (
          <Dropdown.Item key={noti._id} className={className}>
            <Notification notification={noti} />
          </Dropdown.Item>
        );
      });
    }
    return (
      <Dropdown>
        <Dropdown.Toggle
          className='caret-off mr-2 px-2 py-1'
          variant='primary'
          id='dropdown-basic'
        >
          <i className='fas fa-bell'></i>{' '}
          {numUnreadNoti > 0 ? '(' + numUnreadNoti + ')' : null}
        </Dropdown.Toggle>
        <Dropdown.Menu className='noti-scrollable'>
          {notifications}
        </Dropdown.Menu>
      </Dropdown>
    );
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
