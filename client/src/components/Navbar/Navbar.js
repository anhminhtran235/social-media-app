import React, { Fragment } from 'react';
import NavOptions from './NavOptions/NavOptions';
import Notifications from './Notifications/Notifications';

const Navbar = () => {
  return (
    <div>
      <h2>Social media app</h2>
      <Fragment>
        <Notifications />
        <NavOptions />
      </Fragment>
    </div>
  );
};

export default Navbar;
