import axios from 'axios';
import alertify from '../../utils/alertify';
import { buildUrl } from '../../utils/utils';
import {
  ADDED_NEW_POST,
  COMMENTED_POST,
  LIKED_POST,
  LOAD_NEWSFEED_FAILURE,
  LOAD_NEWSFEED_SUCCESS,
  LOAD_POSTS_FAILURE,
  LOAD_POSTS_SUCCESS,
} from '../actionTypes';

export const loadNewsfeed = (skip = null, limit = null) => {
  return async (dispatch) => {
    const baseUrl = '/newsfeed';
    const url = buildUrl(baseUrl, skip, limit);

    try {
      const res = await axios.get(url);
      dispatch({ type: LOAD_NEWSFEED_SUCCESS, payload: res.data });
    } catch (error) {
      console.log(error);
      alertify.error(error.response.data);
      dispatch({ type: LOAD_NEWSFEED_FAILURE });
    }
  };
};

export const loadUserPosts = (userId) => {
  return async (dispatch) => {
    try {
      const res = await axios.get('/posts/' + userId);
      dispatch({ type: LOAD_POSTS_SUCCESS, payload: res.data });
    } catch (error) {
      dispatch({ type: LOAD_POSTS_FAILURE });
    }
  };
};

export const addNewPost = (post) => {
  return async (dispatch) => {
    try {
      const res = await axios.post('/posts/me/new', { content: post });
      dispatch({ type: ADDED_NEW_POST, payload: res.data });
      alertify.success('Add post successfully');
    } catch (error) {
      alertify.error(error.response.data);
    }
  };
};

export const likePost = (postId, postOwnerId) => {
  return async (dispatch) => {
    try {
      const res = await axios.post('/posts/like', { postId, postOwnerId });
      const post = res.data;
      dispatch({ type: LIKED_POST, payload: post });
    } catch (error) {
      alertify.error(error.response.data);
    }
  };
};

export const commentOnPost = (postId, postOwnerId, content) => {
  return async (dispatch) => {
    try {
      const res = await axios.post('posts/comment', {
        postId,
        postOwnerId,
        content,
      });
      const post = res.data;
      dispatch({ type: COMMENTED_POST, payload: post });
    } catch (error) {
      alertify.error(error.response.data);
    }
  };
};
