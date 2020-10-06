const socketio = require('socket.io');

const setUpWebsocket = (server) => {
  const io = socketio(server);
  setupListeners(io);
};

const setupListeners = (io) => {
  io.on('connection', (socket) => {
    console.log('Client connected');
    socket.on('message', (event, data) => {
      console.log(data);
    });
    setInterval(() => {
      socket.emit('message', 'Hello from server');
    }, 3000);
  });
};

module.exports = setUpWebsocket;
