const socketio = require('socket.io');

const setUpWebsocket = (server) => {
  const io = socketio(server);
  setupListeners(io);
};

const setupListeners = (io) => {
  io.on('connection', () => {
    console.log('Client connected');
  });
};

module.exports = setUpWebsocket;
