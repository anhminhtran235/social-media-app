const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Post = require('../models/Post');
const User = require('../models/User');
const {
  LIKE_POST,
  COMMENT_ON_MY_POST: COMMENT,
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
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('posts');
    res.json(user.posts);
  } catch (error) {
    console.error(error);
    res.status(500).json('Server error: Cannot get posts from this user');
  }
});

// @route   GET /posts/post/:postId
// @desc    Get post by id
// @access  Public
router.get('/post/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(500).send('Post not found');
    }
    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json('Server error: Cannot find post');
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
      authorName: user.userName,
    });
    await newPost.save();

    user.posts.push(newPost.id);
    await user.save();
    res.json(newPost);
  } catch (error) {
    console.error(error);
    res.status(500).json('Server Error: Cannot add new post');
  }
});

// @route   DELETE /posts/:id
// @desc    Delete a post
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).send('Post not found');
    }
    await post.deleteOne();
    res.send('Delete successfully');
  } catch (error) {
    console.error(error);
    res.status(500).json('Server Error: Cannot delete post');
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
      res.json('Post does not exist');
    }

    post.comments.push({
      author: user.id,
      authorName: user.userName,
      content,
    });

    await post.save();

    // Notify post owner
    const isOwner = user.id.toString() === postOwnerId;
    if (!isOwner) {
      await createNotiAndNotifyUser(postOwnerId, COMMENT, {
        postId: post._id,
        post,
        content,
        from: user.id.toString(),
      });
    }

    res.json(post);
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
      return res.json('Post does not exist');
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
        postId: post._id,
        content: post.content,
        from: userId.toString(),
      });
    }

    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json('Server Error: Cannot like/unlike post');
  }
});

module.exports = router;
