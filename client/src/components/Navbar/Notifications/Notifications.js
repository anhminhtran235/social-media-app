import React, { Fragment } from 'react';
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
    if (this.props.notifications) {
      notifications = this.props.notifications.map((noti) => {
        return (
          <Dropdown.Item>
            <Notification notification={noti} key={noti._id} />
          </Dropdown.Item>
        );
      });
    }
    return (
      <Dropdown>
        <Dropdown.Toggle variant='success' id='dropdown-basic'>
          Notification
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
