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
    res.status(500).json(error);
  }
});

module.exports = router;
