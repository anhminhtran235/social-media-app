import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import '../../../inbox.css';
import moment from 'moment';

class MessageBubble extends Component {
  state = {
    reRender: null,
  };

  componentDidMount() {
    const reRenderEvery20Seconds = 20 * 1000;
    this.interval = setInterval(() => {
      this.setState({ reRender: Date.now() });
    }, reRenderEvery20Seconds);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

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
            <span className='time_date'>
              {' '}
              {moment(message.createdAt).fromNow()}
            </span>
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
              <span className='time_date'>
                {' '}
                {moment(message.createdAt).fromNow()}
              </span>
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
