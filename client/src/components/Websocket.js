import React, { Component } from 'react';
import { connect } from 'react-redux';
import { receivedNewNotification } from '../store/actions/notificationsAction';

class Websocket extends Component {
  state = {
    isUserIdSent: false,
  };

  componentDidMount() {
    this.listenToSocketEvent(this.props.socket);
  }

  componentDidUpdate() {
    if (this.props.user && !this.state.isUserIdSent) {
      this.sendUserId(this.props.user._id);
    }
  }

  sendMessage = () => {
    const socket = this.props.socket;
    socket.emit('message', this.state.message);
  };

  sendUserId = (id) => {
    const socket = this.props.socket;
    socket.emit('userId', id);
  };

  listenToSocketEvent = (socket) => {
    socket.on('message', (data) => {
      console.log(data);
    });

    socket.on('notification', (noti) => {
      this.props.receivedNewNoti(noti);
    });
  };

  render() {
    return null;
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    receivedNewNoti: (notification) =>
      dispatch(receivedNewNotification(notification)),
  };
};

const mapStateToProps = (state) => {
  return {
    user: state.users.myUser,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Websocket);
