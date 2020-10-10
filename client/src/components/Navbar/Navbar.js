import React, { Fragment } from 'react';
import Login from './NavOptions/Login/Login';
import NavOptions from './NavOptions/NavOptions';

const Navbar = () => {
  return (
    <div>
      <h2>Social media app</h2>
      <Fragment>
        <NavOptions />
      </Fragment>
    </div>
  );
};

export default Navbar;
