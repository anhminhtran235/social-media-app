const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Post = require('../../models/Post');
const User = require('../../models/User');
const {
  LIKE_POST,
  LIKE_COMMENT,
  COMMENT,
} = require('../utils/notificationType');
const createNotiAndNotifyUser = require('../utils/notification');

// @route   GET /posts
// @desc    Get all posts
// @access  Public
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json('Server error: Cannot get all posts');
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
    res.status(500).json('Server error: Cannot get posts from this user');
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
    res.status(500).json('Server Error: Cannot add new post');
  }
});

// @route   POST /posts/comment
// @desc    Add new comment
// @access  Private
router.post('/comment', auth, async (req, res) => {
  try {
    const { postId, postOwnerId, content } = req.body;
    const user = req.user;

    const post = await Post.findById(postId);
    if (!post) {
      res.json({ error: 'Post does not exist' });
    }

    post.comments.push({
      author: user.id,
      content,
    });

    await post.save();

    // Notify post owner
    const isOwner = user.id.toString() === postOwnerId;
    if (!isOwner) {
      await createNotiAndNotifyUser(postOwnerId, COMMENT, {
        content,
        from: user.id.toString(),
      });
    }

    res.json({ msg: 'Add new comment successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json('Server Error: Cannot add new comment');
  }
});

// @route   POST /posts/like
// @desc    Like post
// @access  Private
router.post('/like', auth, async (req, res) => {
  try {
    const { postId, postOwnerId } = req.body;
    const userId = req.user.id;
    const post = await Post.findById(postId);

    if (!post) {
      return res.json({ error: 'Post does not exist' });
    }

    let didLike = false;
    const likes = post.likes;
    const index = likes.findIndex((id) => id.toString() === userId.toString());
    if (index !== -1) {
      likes.splice(index, 1);
    } else {
      likes.push(userId);
      didLike = true;
    }

    await post.save();

    // Notify post owner
    const isOwner = userId.toString() === postOwnerId;
    if (!isOwner && didLike) {
      await createNotiAndNotifyUser(postOwnerId, LIKE_POST, {
        from: userId.toString(),
      });
    }

    res.json({ msg: 'Toggle like successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json('Server Error: Cannot like/unlike post');
  }
});

// @route   POST /posts/comment/like
// @desc    Like comment
// @access  Private
router.post('/comment/like', auth, async (req, res) => {
  try {
    const { postId, commentId, commentOwnerId } = req.body;
    const userId = req.user.id;
    const post = await Post.findById(postId);
    if (!post) {
      return res.json({ error: 'Post does not exist' });
    }
    const commentIndex = post.comments.findIndex(
      (comment) => commentId === comment.id.toString()
    );
    if (commentIndex === -1) {
      return res.json({ error: 'Comment does not exist' });
    }

    let didLike = false;
    const comment = post.comments[commentIndex];
    const likes = comment.likes;
    const index = likes.findIndex((id) => id.toString() === userId);
    if (index !== -1) {
      likes.splice(index, 1);
    } else {
      likes.push(userId);
      didLike = true;
    }

    // Notify comment owner
    const isOwner = userId.toString() === commentOwnerId;
    if (!isOwner && didLike) {
      await createNotiAndNotifyUser(commentOwnerId, LIKE_COMMENT, {
        from: userId.toString(),
      });
    }

    await post.save();

    res.json({ msg: 'Toggle like successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json('Server Error: Cannot like/dislike comment');
  }
});

module.exports = router;
