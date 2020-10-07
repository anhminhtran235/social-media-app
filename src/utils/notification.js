const { io, idsMap } = require('../websocket');
const Notification = require('../../models/Notification');

const createNotiAndNotifyUser = (owner, type, content) => {
  try {
    const noti = new Notification({
      owner,
      type,
      content,
    });
    await noti.save();

    const userId = owner.toString();
    const socketId = idsMap.get(userId);
    if (socketId) {
      io.to(socketId).emit('notification', 'You have 1 new notification');
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = createNotiAndNotifyUser;