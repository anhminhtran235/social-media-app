import React, { Component } from 'react';
import MessagingArea from './MessagingArea/MessagingArea';
import PeopleMessageList from './PeopleMessageList/PeopleMessageList';
import './inbox.css';

class Inbox extends Component {
  render() {
    return (
      <div className=' inbox_msg d-flex'>
        <PeopleMessageList />
        <MessagingArea />
      </div>
    );
  }
}

export default Inbox;
