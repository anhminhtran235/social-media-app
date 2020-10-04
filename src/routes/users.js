const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');

// @route   POST /users
// @desc    Register new user
// @access  Public
router.post('/', async (req, res) => {
  try {
    const { userName, fullName, password, age, bio } = req.body;
    const isUserNameExists = (await User.findOne({ userName })) !== null;
    if (isUserNameExists) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    const passwordHash = await bcrypt.hash(password, 8);
    const newUser = new User({
      userName,
      fullName,
      passwordHash,
      age,
      bio,
    });
    await newUser.save();
    const token = newUser.generateToken();

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

// @route   GET /users/me
// @desc    Get my user
// @access  Private
router.get('/me', auth, (req, res) => {
  const user = req.user;
  res.json({
    userName: user.userName,
    fullName: user.fullName,
    age: user.age,
    bio: user.bio,
  });
});

module.exports = router;
