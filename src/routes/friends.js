const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const createNotiAndNotifyUser = require('../utils/notification');
const {
  FRIEND_REQUEST,
  FRIEND_REQUEST_ACCEPTED,
} = require('../utils/notificationType');

// @route   GET /friends
// @desc    Get all friends
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    await req.user
      .populate({
        path: 'friends',
        select:
          '-passwordHash -sentFriendRequests -friends -posts -notifications -messages',
      })
      .execPopulate();
    res.json(req.user.friends);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error: Cannot get all friends');
  }
});

// @route   POST /friends/add
// @desc    Add new friend
// @access  Private
router.post('/add', auth, async (req, res) => {
  try {
    const { otherUserId } = req.body;
    const me = req.user;

    if (me.friends.findIndex((u) => u.id.toString() === otherUserId) !== -1) {
      return res.json({ error: 'You two are already friends' });
    }

    const otherUser = await User.findById(otherUserId);
    if (!otherUser) {
      return res.json({ error: 'User does not exist' });
    }

    const index = otherUser.sentFriendRequests.findIndex(
      (u) => u.toString() === me.id.toString()
    );
    const otherHasSentRequest = index !== -1;
    if (otherHasSentRequest) {
      otherUser.sentFriendRequests.splice(index, 1);
      me.friends.push(otherUser.id);
      await me.save();
      otherUser.friends.push(me.id);
      await otherUser.save();
      await createNotiAndNotifyUser(otherUserId, FRIEND_REQUEST_ACCEPTED, {
        from: me.id.toString(),
      });
      return res.json(me);
    } else {
      me.sentFriendRequests.push(otherUser.id);
      await me.save();
      await createNotiAndNotifyUser(otherUserId, FRIEND_REQUEST, {
        from: me.id.toString(),
      });
      return res.json(me);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error: Cannot add friend');
  }
});

// @route   DELETE /friends/remove
// @desc    Unfriend
// @access  Private
router.delete('/remove', auth, async (req, res) => {
  try {
    const { otherUserId } = req.body;
    const me = req.user;

    const otherUser = await User.findById(otherUserId);
    if (!otherUser) {
      return res.json({ error: 'User does not exist' });
    }

    const myIndex = me.friends.findIndex(
      (u) => u.id.toString() === otherUserId
    );
    me.friends.splice(myIndex, 1);
    await me.save();

    const otherUserIndex = otherUser.friends.findIndex(
      (u) => u.id.toString() === me.id.toString()
    );
    otherUser.friends.splice(otherUserIndex, 1);
    await otherUser.save();

    if (myIndex === -1) {
      return res.json({ msg: 'You two are not friends' });
    }
    res.json({ msg: 'Unfriend successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error: Cannot unfriend');
  }
});

// @route   POST /friends/removeRequest
// @desc    Remove friend request
// @access  Private
router.post('/removeRequest', auth, async (req, res) => {
  try {
    const { otherUserId } = req.body;
    const me = req.user;

    const otherUser = await User.findById(otherUserId);
    if (!otherUser) {
      return res.json({ error: 'User does not exist' });
    }

    const index = me.sentFriendRequests.findIndex(
      (id) => id.toString() === otherUserId
    );
    if (index === -1) {
      return res.json({
        error: 'You have not sent this person a friend request',
      });
    }
    me.sentFriendRequests.splice(index, 1);
    await me.save();
    res.json(me);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error: Cannot cancel this friend request');
  }
});

module.exports = router;
