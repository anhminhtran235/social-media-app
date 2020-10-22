const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const auth = require('../middleware/auth');
const Message = require('../models/Message');
const User = require('../models/User');
const createNotiAndNotifyUser = require('../utils/notification');
const { sendMessage } = require('../websocket');
const { MESSAGE } = require('../utils/notificationType');

// @route   POST /messages
// @desc    Send message
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const { otherUserId, content } = req.body;
    const otherUser = await User.findById(otherUserId);
    if (!otherUser) {
      return res.status(404).send('User does not exist');
    }
    const me = req.user;

    const message = new Message({
      fromUserId: req.user.id,
      toUserId: new mongoose.mongo.ObjectId(otherUserId),
      content,
    });
    await message.save();

    console.log(message);
    otherUser.messages.push(message.id);
    me.messages.push(message.id);

    await otherUser.save();
    await me.save();

    const sendMessageSuccess = sendMessage(message);
    if (!sendMessageSuccess) {
      await createNotiAndNotifyUser(otherUserId, MESSAGE, {
        from: req.user.id.toString(),
        content,
      });
    }

    res.json(message);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error: Cannot send message');
  }
});

// @route   GET /messages
// @desc    Get all friends and messages from friends
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const me = req.user;
    await me
      .populate({
        path: 'friends',
        select:
          '-passwordHash -sentFriendRequests -friends -posts -notifications -messages',
      })
      .execPopulate();

    const friends = me.friends;
    for (let i = 0; i < friends.length; i++) {
      const messagesFromMe = await Message.find({
        fromUserId: me._id,
        toUserId: friends[i]._id,
      });
      const messagesToMe = await Message.find({
        fromUserId: friends[i]._id,
        toUserId: me._id,
      });

      friends[i].messages = messagesFromMe.concat(messagesToMe);
    }
    res.json(friends);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error: Cannot get messages');
  }
});

// @route   POST /messages/read
// @desc    Mark conversation read
// @access  Private
router.post('/read', auth, async (req, res) => {
  try {
    const { otherUserId } = req.body;
    const messages = await Message.find({
      fromUserId: new mongoose.mongo.ObjectId(otherUserId),
      toUserId: req.user._id,
    });
    messages.forEach(async (message) => {
      message.read = true;
      await message.save(); // No await
    });
    res.send('Mark read conversation successfully');
  } catch (error) {
    res.status(500).send('Server error: Cannot mark read');
  }
});

module.exports = router;
