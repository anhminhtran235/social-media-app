import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import NavOptions from './NavOptions/NavOptions';
import Notifications from './Notifications/Notifications';

class Navbar extends Component {
  render() {
    let notifications = null;
    // if (this.props.isAuthenticated) {
    //   notifications = <Notifications />;
    // }

    return (
      <div className='d-flex flex-row justify-content-between mt-3 mb-5'>
        <h2 className='text-primary'>Social media app</h2>
        <div className='d-flex flex-row justify-content-end'>
          {notifications}
          <NavOptions />
        </div>
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
