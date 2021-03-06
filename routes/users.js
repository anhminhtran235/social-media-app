const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const auth = require('../middleware/auth');

// @route   GET /users
// @desc    Get all users
// @access  Public
router.get('/', async (req, res) => {
  try {
    const users = await User.find().select(
      '-passwordHash -friends -posts -notifications -messages'
    );

    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error: Cannot get all users');
  }
});

// @route   POST /users
// @desc    Register new user
// @access  Public
router.post('/', async (req, res) => {
  try {
    const { userName, fullName, password, age, bio } = req.body;
    const isUserNameExists = (await User.findOne({ userName })) !== null;
    if (isUserNameExists) {
      return res.status(400).send('Username already exists');
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
    res.status(500).send('Server error: Cannot register');
  }
});

// @route   GET /users/user/:id
// @desc    Get user by id
// @access  Public
router.get('/user/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select(
      '-passwordHash -notifications -messages'
    );
    if (!user) {
      return res.status(404).send('Error: User not found');
    }
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).send('Server Error: Cannot get this user data');
  }
});

// @route   GET /users/me
// @desc    Get my user
// @access  Private
router.get('/me', auth, (req, res) => {
  const user = req.user;
  res.json({
    _id: user.id,
    userName: user.userName,
    fullName: user.fullName,
    age: user.age,
    bio: user.bio,
    friends: user.friends,
    sentFriendRequests: user.sentFriendRequests,
    posts: user.posts,
  });
});

// @route   PUT /users/me
// @desc    Update my user profile
// @access  Private
router.put('/me', auth, async (req, res) => {
  try {
    const { fullName, age, bio } = req.body;
    const me = req.user;
    me.fullName = fullName;
    me.age = age;
    me.bio = bio;
    await me.save();
    res.json({ msg: 'Update successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error: Cannot update profile');
  }
});

// @route   DELETE /users/me
// @desc    Delete account
// @access  Private
router.delete('/me', auth, async (req, res) => {
  try {
    const user = req.user;
    await User.findByIdAndDelete(user.id);
    // TODO: Delete post, comments, messages
    res.json({ msg: 'Delete account successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error: Cannot delete my account');
  }
});

module.exports = router;
