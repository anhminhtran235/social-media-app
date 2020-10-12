import React, { Component, Fragment } from 'react';
import Newsfeed from './Newsfeed/Newsfeed';
import Status from './Status/Status';

class Home extends Component {
  render() {
    return (
      <Fragment>
        <Status />
        <Newsfeed />
      </Fragment>
    );
  }
}

export default Home;
