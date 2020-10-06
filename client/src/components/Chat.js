import React, { Component } from 'react';

class Chat extends Component {
  state = {
    message: '',
  };

  onInputChange = (event) => {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  sendMessage = () => {
    const socket = this.props.socket;
    socket.send('message', this.state.message);
  };

  listenToSocketEvent = (socket) => {
    socket.on('message', (data) => {
      console.log(data);
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
      </div>
    );
  }
}

export default Chat;
