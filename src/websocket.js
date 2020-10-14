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

/**
 * Return true if user is online and false if not
 */
const sendMessage = (message) => {
  const toUserId = message.toUserId.toString();
  const toSocketId = userIdToSocketIdMap.get(toUserId);
  const isReceiverOnline = toSocketId !== null;
  if (isReceiverOnline) {
    io.to(toSocketId).emit('message', message);
    return true;
  } else {
    return false;
  }
};

module.exports = {
  setupWebsocket,
  io,
  socketIdToUserIdMap,
  userIdToSocketIdMap,
  sendNotification,
  sendMessage,
};
