import React, { Fragment } from 'react';
import { Component } from 'react';

class MessageBubble extends Component {
  render() {
    const message = this.props.message;
    return (
      <Fragment>
        <p>fromUserId: {message.fromUserId}</p>
        <p>toUserId: {message.toUserId}</p>
        <p>content: {message.content}</p>
        <p>createdAt: {message.createdAt}</p>
        <p>______________________________________________________</p>
      </Fragment>
    );
  }
}

export default MessageBubble;
