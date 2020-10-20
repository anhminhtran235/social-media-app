const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// @route   GET /newsfeed?skip=5&limit=3
// @desc    Get my newsfeed
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const user = req.user;
    const posts = [];

    // Get my posts
    await user.populate('posts').execPopulate();

    user.posts.forEach((post) => {
      posts.push(post);
    });

    // Get my friends' posts
    await user
      .populate({
        path: 'friends',
        populate: {
          path: 'posts',
        },
      })
      .execPopulate();
    user.friends.forEach((friend) => {
      friend.posts.forEach((post) => {
        posts.push(post);
      });
    });

    posts.sort((p1, p2) => p2.createdAt.getTime() - p1.createdAt.getTime());

    const resultPosts = [];
    const { skip, limit } = req.query;
    const startIndex = skip ? skip : 0;
    for (let i = startIndex; i < posts.length; i++) {
      resultPosts.push(posts[i]);
      const count = i - startIndex + 1;
      if (count >= limit) break;
    }

    res.json(resultPosts);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error: Cannot get newsfeed');
  }
});

module.exports = router;
