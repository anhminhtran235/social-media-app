import React, { Fragment } from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { LOAD_CURRENT_MESSAGE_USER } from '../../../../store/actionTypes';

class PeopleMessageCard extends Component {
  render() {
    const { _id, userName, messages } = this.props.friendMessages;
    let topMessage = null;
    if (messages.length > 0) {
      topMessage = messages[0].content;
    }
    return (
      <div onClick={() => this.props.chooseUser(_id)}>
        <p>Username: {userName}</p>
        <p>Top message: {topMessage}</p>
        ________________________________________________
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
