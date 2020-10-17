import React, { Fragment } from 'react';
import { Component } from 'react';
import Login from './Login/Login';
import { connect } from 'react-redux';
import alertify from '../../../utils/alertify';
import { logout } from '../../../store/actions/authAction';
import { Link } from 'react-router-dom';
import history from '../../../utils/history';
import Button from 'react-bootstrap/esm/Button';

class NavOptions extends Component {
  logout = () => {
    this.props.logout();
    alertify.message('Logged out');
    history.push('/');
  };

  goToRegister = () => {
    history.push('/register');
  };

  render() {
    let options = null;
    if (!this.props.authLoading) {
      if (this.props.isAuthenticated) {
        options = (
          <div className='d-flex flex-row justify-content-end align-items-center'>
            <Link to={'/home'} className='mr-2'>
              Home
            </Link>{' '}
            <br />
            <Link to={'/users/me'} className='mr-2'>
              My Profile
            </Link>{' '}
            <br />
            <Link to={'/explore'} className='mr-2'>
              Explore
            </Link>{' '}
            <br />
            <Link to={'/messages'} className='mr-2'>
              Messages
            </Link>{' '}
            <br />
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavOptions);
