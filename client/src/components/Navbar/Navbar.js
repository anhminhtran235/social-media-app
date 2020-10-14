import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import NavOptions from './NavOptions/NavOptions';
import Notifications from './Notifications/Notifications';

class Navbar extends Component {
  render() {
    let notifications = null;
    if (this.props.isAuthenticated) {
      notifications = <Notifications />;
    }

    return (
      <div>
        <h2>Social media app</h2>
        <Fragment>
          {notifications}
          <NavOptions />
        </Fragment>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
};

export default connect(mapStateToProps)(Navbar);
