import React, { Fragment } from 'react';
import Login from './Login/Login';

const Navbar = () => {
  return (
    <div>
      <h2>Social media app</h2>
      <Fragment>
        <Login />
        <p>Logout</p>
        <p>Register</p>
      </Fragment>
    </div>
  );
};

export default Navbar;
