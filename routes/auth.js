const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// @route   POST /auth/login
// @desc    Login user
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const { userName, password } = req.body;

    const userInDb = await User.findOne({ userName });
    if (!userInDb) {
      return res.status(401).send('Invalid credentials');
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      userInDb.passwordHash
    );
    if (!isPasswordCorrect) {
      return res.status(401).send('Invalid credentials');
    }

    const token = userInDb.generateToken();
    return res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error: Cannot login');
  }
});

module.exports = router;
