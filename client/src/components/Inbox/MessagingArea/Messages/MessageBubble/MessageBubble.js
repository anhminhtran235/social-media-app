import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import '../../../inbox.css';

class MessageBubble extends Component {
  render() {
    const message = this.props.message;
    const me = this.props.myUser;
    let fromMe = false;
    if (message.fromUserId === me._id) {
      fromMe = true;
    }

    let bubble = null;
    if (fromMe) {
      bubble = (
        <div className='outgoing_msg'>
          <div className='sent_msg'>
            <p>{message.content}</p>
            <span className='time_date'> 11:01 AM | June 9</span>
          </div>
        </div>
      );
    } else {
      bubble = (
        <div className='incoming_msg'>
          <div className='incoming_msg_img'>
            {' '}
            <img
              src='https://ptetutorials.com/images/user-profile.png'
              alt='sunil'
            />{' '}
          </div>
          <div className='received_msg'>
            <div className='received_withd_msg'>
              <p>{message.content}</p>
              <span className='time_date'> 11:01 AM | June 9</span>
            </div>
          </div>
        </div>
      );
    }

    return bubble;
  }
}

const mapStateToProps = (state) => {
  return {
    myUser: state.users.myUser,
  };
};

export default connect(mapStateToProps)(MessageBubble);
