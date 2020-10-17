import React, { Fragment } from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { LOAD_CURRENT_MESSAGE_USER } from '../../../../store/actionTypes';
import '../../inbox.css';

class PeopleMessageCard extends Component {
  render() {
    const { _id, userName, messages } = this.props.friendMessages;
    let topMessage = null;
    if (messages.length > 0) {
      topMessage = messages[0].content;
    }

    return (
      <div className='chat_list active_chat'>
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
              {userName} <span className='chat_date'>Dec 25</span>
            </h5>
            <p>{topMessage}</p>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    chooseUser: (id) =>
      dispatch({ type: LOAD_CURRENT_MESSAGE_USER, payload: id }),
  };
};

export default connect(null, mapDispatchToProps)(PeopleMessageCard);
