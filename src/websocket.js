const socketio = require('socket.io');

let io = null;
const idsMap = new Map(); // key: socketId, val: userId

const setupWebsocket = (server) => {
  io = socketio(server);
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

module.exports = { setupWebsocket, io, idsMap };
