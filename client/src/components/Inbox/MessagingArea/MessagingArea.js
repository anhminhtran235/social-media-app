import React, { Fragment } from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { sendMessage } from '../../../store/actions/messagesAction';
import Messages from './Messages/Messages';
import '../inbox.css';

class MessagingArea extends Component {
  state = {
    message: '',
  };

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    this.el.scrollIntoView({ behavior: 'smooth' });
  }

  onInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  sendMessage = () => {
    const receiverId = this.props.currentUserId;
    const content = this.state.message;
    this.props.sendMessage(receiverId, content);
    this.setState({ message: '' });
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
    } else {
      const firstUserWithMessages = this.props.usersWithMessages;
      if (firstUserWithMessages && firstUserWithMessages.length > 0) {
        const mes = firstUserWithMessages[0].messages;
        messages = <Messages messages={mes} />;
      }
    }

    return (
      <div className='mesgs'>
        <div className='msg_history'>{messages}</div>
        <div className='type_msg'>
          <div className='input_msg_write'>
            <input
              type='text'
              className='write_msg'
              placeholder='Type a message'
              value={this.state.message}
              onChange={this.onInputChange}
              name='message'
            />
            <button
              className='msg_send_btn'
              type='button'
              onClick={this.sendMessage}
            >
              <i className='fa fa-paper-plane-o' aria-hidden='true'></i>
            </button>
          </div>
        </div>

        {/* For scrolling */}
        <div
          ref={(el) => {
            this.el = el;
          }}
        />
      </div>
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
