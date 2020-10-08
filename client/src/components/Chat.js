import React, { Component } from 'react';

class Chat extends Component {
  state = {
    message: '',
    userId: '',
  };

  onInputChange = (event) => {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  sendMessage = () => {
    const socket = this.props.socket;
    socket.emit('message', this.state.message);
  };

  sendUserId = () => {
    const socket = this.props.socket;
    socket.emit('userId', this.state.userId);
  };

  listenToSocketEvent = (socket) => {
    socket.on('message', (data) => {
      console.log(data);
    });

    socket.on('notification', (noti) => {
      console.log(noti);
    });
  };
  render() {
    this.listenToSocketEvent(this.props.socket);
    return (
      <div>
        <input
          type='text'
          placeholder='Enter message here'
          name='message'
          value={this.state.message}
          onChange={this.onInputChange}
        />
        <button onClick={this.sendMessage}>Send message</button>
        <br></br>
        <br></br>
        <input
          type='text'
          placeholder='Enter your id here'
          name='userId'
          value={this.state.userId}
          onChange={this.onInputChange}
        />
        <button onClick={this.sendUserId}>Send Id</button>
      </div>
    );
  }
}

export default Chat;
