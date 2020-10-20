const { userIdToSocketIdMap, sendNotification } = require('../websocket');
const Notification = require('../models/Notification');
const User = require('../models/User');
const mongoose = require('mongoose');
const createNotiAndNotifyUser = async (ownerId, type, data) => {
  try {
    const noti = new Notification({
      owner: new mongoose.mongo.ObjectId(ownerId),
      type,
      data,
    });
    await noti.save();

    const owner = await User.findById(ownerId);
    owner.notifications.push(noti.id);
    await owner.save();

    const socketId = userIdToSocketIdMap.get(ownerId);
    sendNotification(socketId, noti);
  } catch (error) {
    console.error(error);
  }
};

module.exports = createNotiAndNotifyUser;
