const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const auth = require('../../middleware/auth');
const Message = require('../../models/Message');
const User = require('../../models/User');
const createNotiAndNotifyUser = require('../utils/notification');
const { MESSAGE } = require('../utils/notificationType');

// @route   POST /message
// @desc    Send message
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const { otherUserId, content } = req.body;

    const message = new Message({
      fromUserId: req.user.id,
      toUserId: new mongoose.mongo.ObjectId(otherUserId),
      content,
    });
    await message.save();

    const otherUser = await User.findById(otherUserId);
    const me = req.user;

    otherUser.messages.push(message.id);
    me.messages.push(message.id);

    otherUser.save();
    me.save();

    await createNotiAndNotifyUser(otherUserId, MESSAGE, {
      from: req.user.id.toString(),
      content,
    });

    res.json({ msg: 'Sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error: Cannot send message');
  }
});

// @route   GET /message
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

module.exports = router;
