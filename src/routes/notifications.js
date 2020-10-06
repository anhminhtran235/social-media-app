const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Notification = require('../../models/Notification');

// @route   GET /notifications?skip=5&limit=3
// @desc    Get all notifications
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    await req.user
      .populate({
        path: 'notifications',
        options: {
          limit: parseInt(req.query.limit),
          skip: parseInt(req.query.skip),
        },
      })
      .execPopulate();
    res.json(req.user.notifications);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

// @route   POST /notifications
// @desc    Add test notification
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const { type, content } = req.body;
    const noti = new Notification({
      owner: req.user.id,
      type,
      content,
    });
    await noti.save();
    req.user.notifications.push(noti);
    await req.user.save();
    res.json(noti);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

module.exports = router;