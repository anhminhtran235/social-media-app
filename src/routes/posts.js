const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Post = require('../../models/Post');
const User = require('../../models/User');

// @route   GET /posts
// @desc    Get all posts
// @access  Public
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

// @route   GET /posts/:id
// @desc    Get all posts from a user
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('posts').exec();
    res.json(user.posts);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

// @route   POST /posts/me/new
// @desc    Add new post
// @access  Private
router.post('/me/new', auth, async (req, res) => {
  try {
    const { content } = req.body;
    const user = req.user;

    const newPost = new Post({
      content,
      author: user.id,
    });
    await newPost.save();

    user.posts.push(newPost.id);
    await user.save();

    res.json({ msg: 'Create new post successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

// @route   POST /posts/:id/comment
// @desc    Add new comment
// @access  Private
router.post('/:id/comment', auth, async (req, res) => {
  try {
    const { content } = req.body;
    const user = req.user;

    const post = await Post.findById(req.params.id);
    if (!post) {
      res.json({ error: 'Post does not exist' });
    }

    post.comments.push({
      author: user.id,
      content,
    });

    await post.save();

    res.json({ msg: 'Add new comment successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

// @route   POST /posts/:id/like
// @desc    Like post
// @access  Private
router.post('/:id/like', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.json({ error: 'Post does not exist' });
    }

    const likes = post.likes;
    const index = likes.findIndex((id) => id.toString() === userId);
    if (index !== -1) {
      likes.splice(index, 1);
    } else {
      likes.push(userId);
    }

    await post.save();

    res.json({ msg: 'Toggle like successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

// @route   POST /posts/:postId/comment/:commentId/like
// @desc    Like comment
// @access  Private
router.post('/:postId/comment/:commentId/like', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.json({ error: 'Post does not exist' });
    }
    const commentIndex = post.comments.findIndex(
      (comment) => req.params.commentId === comment.id.toString()
    );
    if (commentIndex === -1) {
      return res.json({ error: 'Comment does not exist' });
    }

    const comment = post.comments[commentIndex];
    const likes = comment.likes;
    const index = likes.findIndex((id) => id.toString() === userId);
    if (index !== -1) {
      likes.splice(index, 1);
    } else {
      likes.push(userId);
    }

    await post.save();

    res.json({ msg: 'Toggle like successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

module.exports = router;
