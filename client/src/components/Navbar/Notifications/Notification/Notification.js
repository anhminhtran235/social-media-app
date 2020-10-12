import React, { Fragment } from 'react';
import { Component } from 'react';

class Notification extends Component {
  render() {
    const { _id, createdAt, data, read, type } = this.props.notification;
    return (
      <Fragment>
        <p>Data: {JSON.stringify(data)}</p>
        <p>Read: {read ? 'true' : 'false'}</p>
        <p>type: {type}</p>
        <p>createdAt: {createdAt}</p>
        <p>_____________________________________________</p>
      </Fragment>
    );
  }
}

export default Notification;
