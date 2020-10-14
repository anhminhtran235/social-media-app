import React, { Fragment } from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { sendMessage } from '../../../store/actions/messagesAction';
import Messages from './Messages/Messages';

class MessagingArea extends Component {
  state = {
    message: '',
  };

  onInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  sendMessage = () => {
    const receiverId = this.props.currentUserId;
    const content = this.state.message;
    this.props.sendMessage(receiverId, content);
  };

  render() {
    if (!this.props.usersWithMessages) {
      return null;
    }

    const currentUser = this.props.usersWithMessages.find(
      (u) => u._id.toString() === this.props.currentUserId
    );
    let messages = null;
    if (currentUser) {
      messages = <Messages messages={currentUser.messages} />;
    }
    return (
      <Fragment>
        <h2>Messaging Area</h2>
        <p>Current user: {currentUser && currentUser._id}</p>
        {messages}
        <textarea
          type='text'
          placeholder='Enter your message here'
          rows='5'
          cols='30'
          name='message'
          required
          onChange={this.onInputChange}
          value={this.state.message}
        />
        <button onClick={this.sendMessage}>Send</button>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUserId: state.messages.currentlyViewingUserId,
    usersWithMessages: state.messages.friendsWithMessages,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sendMessage: (toUserId, content) =>
      dispatch(sendMessage(toUserId, content)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MessagingArea);
