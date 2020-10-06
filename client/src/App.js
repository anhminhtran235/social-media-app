import React from 'react';
import Chat from './components/Chat';
import withWebsocket from './hoc/withWebsocket';

function App(props) {
  return (
    <div>
      <Chat socket={props.socket} />
    </div>
  );
}

export default withWebsocket(App);
