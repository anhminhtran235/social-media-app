import React, { Fragment } from 'react';
import { Component } from 'react';
import Login from './Login/Login';
import { connect } from 'react-redux';
import alertify from '../../../utils/alertify';
import { logout } from '../../../store/actions/authAction';
import { Link } from 'react-router-dom';
import history from '../../../utils/history';

class NavOptions extends Component {
  logout = () => {
    this.props.logout();
    alertify.message('Logged out');
    history.push('/');
  };

  render() {
    let options = null;
    if (!this.props.authLoading) {
      if (this.props.isAuthenticated) {
        options = (
          <div>
            <Link to={'/home'}>Home</Link> <br />
            <Link to={'/users/me'}>My Profile</Link> <br />
            <Link to={'/explore'}>Explore</Link> <br />
            <button onClick={this.logout}>Log out</button>;
          </div>
        );
      } else {
        options = (
          <Fragment>
            <Login />
            <Link to={'/register'}>Register</Link>
          </Fragment>
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
