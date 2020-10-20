import React from 'react';
import { Component } from 'react';
import MessageBubble from './MessageBubble/MessageBubble';
import '../../inbox.css';

class Messages extends Component {
  render() {
    const messages = this.props.messages;

    return messages.map((message) => {
      return (
        <div key={message._id}>
          <MessageBubble message={message} />
        </div>
      );
    });
  }
}
export default Messages;
