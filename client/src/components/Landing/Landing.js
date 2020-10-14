import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class Landing extends Component {
  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to='/home' />;
    }
    return <h1>Landing page</h1>;
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
};

export default connect(mapStateToProps)(Landing);
