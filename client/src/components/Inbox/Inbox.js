import React, { Component, Fragment } from 'react';
import MessagingArea from './MessagingArea/MessagingArea';
import PeopleMessageList from './PeopleMessageList/PeopleMessageList';

class Inbox extends Component {
  render() {
    return (
      <Fragment>
        <h1>Inbox Component!</h1>
        <PeopleMessageList />
        <MessagingArea />
      </Fragment>
    );
  }
}

export default Inbox;
