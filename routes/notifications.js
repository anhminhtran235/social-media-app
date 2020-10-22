const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Notification = require('../models/Notification');

// @route   GET /notifications?skip=5&limit=3
// @desc    Get notifications
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
    res.status(500).send('Server error: Cannot get my notifications');
  }
});

// @route   POST /notifications/read
// @desc    Mark read noti
// @access  Private
router.post('/read', auth, async (req, res) => {
  try {
    const { notiId } = req.body;
    const noti = await Notification.findById(notiId);
    if (!noti) {
      return res.status(404).send('Error: Notification not found');
    }
    if (!req.user.notifications.includes(noti._id)) {
      return res.status(401).send('Error: Unauthorize');
    }
    noti.read = true;
    await noti.save();
    res.json(noti);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error: Cannot mark notification read');
  }
});

module.exports = router;
