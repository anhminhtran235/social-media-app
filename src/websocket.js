const socketio = require('socket.io');

let io = null;
const socketIdToUserIdMap = new Map();
const userIdToSocketIdMap = new Map();

const setupWebsocket = (server) => {
  io = socketio(server);
  setupListeners(io);
};

const setupListeners = (io) => {
  io.on('connection', (socket) => {
    console.log('Client ' + socket.id + ' connected');

    socket.on('userId', (userId) => {
      socketIdToUserIdMap.set(socket.id, userId);
      userIdToSocketIdMap.set(userId, socket.id);
      console.log('Client ' + socket.id + ' sent their userId');
    });

    socket.on('message', (message) => {
      console.log('Client ' + socket.id + ' says:', message);
    });

    socket.on('disconnect', () => {
      console.log('Client ' + socket.id + ' disconnect');

      const userId = socketIdToUserIdMap.get(socket.id);
      socketIdToUserIdMap.delete(socket.id);
      userIdToSocketIdMap.delete(userId);
    });
  });
};

const sendNotification = (toSocketId, notification) => {
  if (toSocketId) {
    io.to(toSocketId).emit('notification', notification);
  }
};

module.exports = {
  setupWebsocket,
  io,
  socketIdToUserIdMap,
  userIdToSocketIdMap,
  sendNotification,
};
