import React from 'react';
import { Component } from 'react';
import Login from './Login/Login';
import { connect } from 'react-redux';
import alertify from '../../../utils/alertify';
import { logout } from '../../../store/actions/authAction';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/esm/Button';
import Notifications from '../Notifications/Notifications';
import { withRouter } from 'react-router';
import { CLEAR_DATA } from '../../../store/actionTypes';

class NavOptions extends Component {
  logout = () => {
    this.props.logout();
    this.props.clearData();
    alertify.error('Logged out');
    this.props.history.push('/');
  };

  goToRegister = () => {
    this.props.history.push('/register');
  };

  goToMessage = () => {
    this.props.history.push('/messages');
  };

  render() {
    let options = null;
    if (!this.props.authLoading) {
      if (this.props.isAuthenticated) {
        let numUnreadMessages = 0;
        if (this.props.friendsWithMessages) {
          numUnreadMessages = this.props.friendsWithMessages.filter(
            (fwm) => !fwm.read
          ).length;
        }

        options = (
          <div className='d-flex flex-row justify-content-end align-items-center'>
            <Link to={'/home'} className='mr-2'>
              Home
            </Link>{' '}
            <Link to={'/users/me'} className='mr-2'>
              My Profile
            </Link>{' '}
            <Link to={'/explore'} className='mr-2'>
              Explore
            </Link>{' '}
            <Button
              className='caret-off px-2 py-1 mr-2'
              variant='primary'
              id='dropdown-basic'
              onClick={this.goToMessage}
            >
              <i className='fas fa-envelope'></i>{' '}
              {numUnreadMessages > 0 ? '(' + numUnreadMessages + ')' : null}
            </Button>
            <Notifications />
            <Button className='btn-success' onClick={this.logout}>
              Log out
            </Button>
          </div>
        );
      } else {
        options = (
          <div className='d-flex flex-row justify-content-end align-items-center'>
            <Login />
            <Button onClick={this.goToRegister}>Register</Button>
          </div>
        );
      }
    }

    return options;
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    authLoading: state.auth.loading,
    friendsWithMessages: state.messages.friendsWithMessages,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
    clearData: () => dispatch({ type: CLEAR_DATA }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(NavOptions));
