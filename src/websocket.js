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

      console.log('socketIdToUserIdMap:', socketIdToUserIdMap);
      console.log('userIdToSocketIdMap:', userIdToSocketIdMap);
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
    console.log(notification);
    console.log('Sending notification to ' + toSocketId);
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
