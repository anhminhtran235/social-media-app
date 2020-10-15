import React, { Fragment } from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { getFriendsWithMessages } from '../../../store/actions/messagesAction';
import PeopleMessageCard from './PeopleMessageCard/PeopleMessageCard';

class PeopleMessageList extends Component {
  componentDidUpdate() {
    if (this.props.isAuthenticated && !this.props.friendWithMessages) {
      this.props.getFriendsWithMessages();
    }
  }

  componentDidMount() {
    if (this.props.isAuthenticated) {
      this.props.getFriendsWithMessages();
    }
  }
  render() {
    const friendsWithMessages = this.props.friendsWithMessages;
    let peopleCards = null;
    if (friendsWithMessages) {
      peopleCards = friendsWithMessages.map((fwm) => {
        return <PeopleMessageCard key={fwm._id} friendMessages={fwm} />;
      });
    }
    return peopleCards;
  }
}

const mapStateToProps = (state) => {
  return {
    friendsWithMessages: state.messages.friendsWithMessages,
    isAuthenticated: state.auth.isAuthenticated,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getFriendsWithMessages: () => dispatch(getFriendsWithMessages()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PeopleMessageList);
