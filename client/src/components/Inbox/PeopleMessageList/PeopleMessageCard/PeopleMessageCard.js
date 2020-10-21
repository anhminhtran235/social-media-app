import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { markReadConversation } from '../../../../store/actions/messagesAction';
import { LOAD_CURRENT_MESSAGE_USER } from '../../../../store/actionTypes';
import '../../inbox.css';
import moment from 'moment';

class PeopleMessageCard extends Component {
  render() {
    const { _id, userName, messages } = this.props.friendMessages;
    let read = this.props.friendMessages.read;
    let latestMessage = null;
    if (messages.length > 0) {
      latestMessage = messages[messages.length - 1].content;
      if (latestMessage.length > 20) {
        latestMessage = latestMessage.substring(0, 40) + '...';
      }
    }
    const classNames = ['chat_list', 'clickable'];
    if (_id === this.props.currentlyViewingUserId) {
      classNames.push('active_chat');
      if (!read) {
        this.props.markReadConversation(_id);
        read = true;
      }
    }

    return (
      <div
        className={classNames.join(' ')}
        onClick={() => this.props.chooseUser(_id)}
      >
        <div className='chat_people'>
          <div className='chat_img'>
            {' '}
            <img
              src='https://ptetutorials.com/images/user-profile.png'
              alt='sunil'
            />{' '}
          </div>
          <div className='chat_ib'>
            <h5>
              {userName}{' '}
              <span>
                {latestMessage
                  ? moment(latestMessage.createdAt).format('MMMM D')
                  : null}
                <span className='text-primary'>
                  {read ? null : ' (unread)'}
                </span>
              </span>
            </h5>
            <p>{latestMessage}</p>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentlyViewingUserId: state.messages.currentlyViewingUserId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    chooseUser: (id) =>
      dispatch({ type: LOAD_CURRENT_MESSAGE_USER, payload: id }),
    markReadConversation: (otherUserId) =>
      dispatch(markReadConversation(otherUserId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PeopleMessageCard);
