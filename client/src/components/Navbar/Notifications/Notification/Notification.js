import React from 'react';
import { Component } from 'react';
import { notiToMessage } from './notificationHandler';
import './Notification.css';
import moment from 'moment';

class Notification extends Component {
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
    const { _id, createdAt, read, data, type } = this.props.notification;
    const content = data.from + ' ' + notiToMessage(type, data);

    return (
      <div className='d-flex noti-card'>
        <img
          className='rounded-circle mr-2 avatar-image'
          src='https://picsum.photos/50/50'
          alt=''
        />
        <div>
          <h6 className='card-title d-flex justify-content-between mb-0'>
            <p>{_id}</p>
            <div className='text-muted h7'>
              {' '}
              <i className='fa fa-clock-o'></i> {moment(createdAt).fromNow()}
            </div>
          </h6>
          <p className='card-text'>{content}</p>
        </div>
      </div>
    );
  }
}

export default Notification;
