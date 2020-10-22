import React, { Component } from 'react';
import io from 'socket.io-client';

const withWebsocket = (ComponentToWrap) => {
  return class WebSocketComponent extends Component {
    render() {
      const socket = io('https://lets-socialize.herokuapp.com');
      return <ComponentToWrap socket={socket} />;
    }
  };
};

export default withWebsocket;
