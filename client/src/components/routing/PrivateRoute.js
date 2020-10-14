import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({
  component: Component,
  isAuthenticated,
  authLoading,
  ...rest
}) => {
  console.log(isAuthenticated);
  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuthenticated && !authLoading ? (
          <Redirect to='/' />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    authLoading: state.auth.loading,
  };
};

export default connect(mapStateToProps)(PrivateRoute);
