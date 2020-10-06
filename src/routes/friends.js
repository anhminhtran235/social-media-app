const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');

// @route   GET /friends
// @desc    Get all friends
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    await req.user.populate({
      path: 'friends',
      select:
        '-passwordHash -sentFriendRequests -friends -posts -notifications',
    });
    res.json(req.user.friends);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
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
      return res.json({ msg: 'Friend request accepted' });
    } else {
      me.sentFriendRequests.push(otherUser.id);
      await me.save();
      return res.json({ msg: 'Friend request sent' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
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
    res.status(500).json(error);
  }
});

// @route   DELETE /friends/removeRequest
// @desc    Remove friend request
// @access  Private
router.delete('/removeRequest', auth, async (req, res) => {
  try {
    const { otherUserId } = req.body;
    const me = req.user;

    const otherUser = await User.findById(otherUserId);
    if (!otherUser) {
      return res.json({ error: 'User does not exist' });
    }

    console.log(me.sentFriendRequests);
    console.log(otherUserId);
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
    res.json({ msg: 'Remove friend request successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

module.exports = router;
