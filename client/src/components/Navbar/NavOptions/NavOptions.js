import React, { Fragment } from 'react';
import { Component } from 'react';
import Login from './Login/Login';
import { connect } from 'react-redux';
import alertify from '../../../utils/alertify';
import { logout } from '../../../store/actions/authAction';

class NavOptions extends Component {
  logout = () => {
    this.props.logout();
    alertify.message('Logged out');
  };

  render() {
    return (
      <Fragment>
        <Login />
        <button onClick={this.logout}>Log out</button>
      </Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
  };
};

export default connect(null, mapDispatchToProps)(NavOptions);
