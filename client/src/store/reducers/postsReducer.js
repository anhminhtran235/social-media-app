import {
  LOAD_NEWSFEED_SUCCESS,
  LOAD_NEWSFEED_FAILURE,
  LOAD_A_POST_SUCCESS,
  LOAD_A_POST_FAILURE,
  LOAD_POSTS_SUCCESS,
  LOAD_POSTS_FAILURE,
  CLEAR_DATA_WHEN_RELOAD,
  ADDED_NEW_POST,
  LIKED_POST,
  COMMENTED_POST,
} from '../actionTypes';

const initialState = {
  currentPost: null,
  currentPosts: null,
  newsfeedPosts: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_NEWSFEED_SUCCESS:
      return {
        ...state,
        newsfeedPosts: action.payload,
      };
    case LOAD_NEWSFEED_FAILURE:
      // Do nothing
      return state;
    case LOAD_A_POST_SUCCESS:
      return {
        ...state,
        currentPost: action.payload,
      };
    case LOAD_A_POST_FAILURE:
      return {
        ...state,
        currentPost: null,
      };
    case LOAD_POSTS_SUCCESS:
      return {
        ...state,
        currentPosts: action.payload,
      };
    case LOAD_POSTS_FAILURE:
      return {
        ...state,
        currentPosts: null,
      };
    case CLEAR_DATA_WHEN_RELOAD:
      return {
        currentPost: null,
        currentPosts: null,
        newsfeedPosts: null,
      };
    case ADDED_NEW_POST:
      const newNewsfeedPosts = [];
      state.newsfeedPosts.forEach((post) => {
        newNewsfeedPosts.unshift({ ...post });
      });
      const newPost = action.payload;
      newNewsfeedPosts.unshift(newPost);
      return {
        ...state,
        newsfeedPosts: newNewsfeedPosts,
      };
    case LIKED_POST:
      const likedPost = action.payload;
      const newPosts = [];
      state.newsfeedPosts.forEach((post) => {
        if (post._id === likedPost._id) {
          newPosts.unshift(likedPost);
        } else {
          newPosts.unshift({ ...post });
        }
      });
      return {
        ...state,
        newsfeedPosts: newPosts,
      };
    case COMMENTED_POST:
      const commentedPost = action.payload;
      const updatedPosts = [];
      state.newsfeedPosts.forEach((post) => {
        if (post._id === commentedPost._id) {
          updatedPosts.unshift(commentedPost);
        } else {
          updatedPosts.unshift({ ...post });
        }
      });
      return {
        ...state,
        newsfeedPosts: updatedPosts,
      };
    default:
      return state;
  }
};

export default reducer;
