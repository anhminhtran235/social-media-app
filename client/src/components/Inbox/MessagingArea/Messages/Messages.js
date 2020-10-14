import React from 'react';
import { Component } from 'react';
import MessageBubble from './MessageBubble/MessageBubble';

class Messages extends Component {
  render() {
    const messages = this.props.messages;
    return messages.map((message) => {
      return <MessageBubble key={message._id} message={message} />;
    });
  }
}
export default Messages;
