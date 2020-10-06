import React, { Component } from 'react';
import io from 'socket.io-client';

const withWebsocket = (ComponentToWrap) => {
  return class WebSocketComponent extends Component {
    render() {
      const socket = io('http://localhost:5000');
      return <ComponentToWrap socket={socket} />;
    }
  };
};

export default withWebsocket;
