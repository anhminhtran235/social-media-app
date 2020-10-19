import React, { Fragment } from 'react';
import { Component } from 'react';
import { notiToMessage } from './notificationHandler';
import './Notification.css';

class Notification extends Component {
  render() {
    const { _id, createdAt, data, read, type } = this.props.notification;
    const content = data.from + ' ' + notiToMessage(type, data);
    console.log(data);
    return (
      <div className='d-flex noti-card'>
        <img
          className='rounded-circle mr-2 avatar-image'
          src='https://picsum.photos/50/50'
          alt=''
        />
        <div>
          <h6 className='card-title'>{_id}</h6>
          <p className='card-text'>{content}</p>
        </div>
      </div>
    );
  }
}

export default Notification;
