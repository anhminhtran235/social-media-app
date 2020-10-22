import {
  LOAD_NEWSFEED_SUCCESS,
  LOAD_NEWSFEED_FAILURE,
  LOAD_A_POST_SUCCESS,
  LOAD_A_POST_FAILURE,
  LOAD_POSTS_SUCCESS,
  LOAD_POSTS_FAILURE,
  CLEAR_DATA,
  ADDED_NEW_POST,
  LIKED_POST,
  COMMENTED_POST,
  POST_LOADING,
  DELETE_POST,
} from '../actionTypes';

const initialState = {
  currentPost: null,
  currentPosts: null,
  newsfeedPosts: null,
  loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_NEWSFEED_SUCCESS:
      return {
        ...state,
        newsfeedPosts: action.payload,
        loading: false,
      };
    case LOAD_NEWSFEED_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case LOAD_A_POST_SUCCESS:
      return {
        ...state,
        currentPost: action.payload,
        loading: false,
      };
    case LOAD_A_POST_FAILURE:
      return {
        ...state,
        currentPost: null,
        loading: false,
      };
    case LOAD_POSTS_SUCCESS:
      return {
        ...state,
        currentPosts: action.payload,
        loading: false,
      };
    case LOAD_POSTS_FAILURE:
      return {
        ...state,
        currentPosts: null,
        loading: false,
      };
    case ADDED_NEW_POST:
      const newNewsfeedPosts = [];
      state.newsfeedPosts.forEach((post) => {
        newNewsfeedPosts.push({ ...post });
      });
      const newPost = action.payload;
      newNewsfeedPosts.unshift(newPost);
      return {
        ...state,
        newsfeedPosts: newNewsfeedPosts,
      };
    case DELETE_POST:
      const postId = action.payload;
      const updatedNewsfeed = state.newsfeedPosts
        ? state.newsfeedPosts.filter((p) => p._id.toString() !== postId)
        : null;
      const updatedCurrentPosts = state.currentPost
        ? state.currentPosts.filter((p) => p._id.toString() !== postId)
        : null;
      return {
        ...state,
        newsfeedPosts: updatedNewsfeed,
        currentPosts: updatedCurrentPosts,
      };
    case LIKED_POST:
      const likedPost = action.payload;
      const newPosts = [];
      state.newsfeedPosts.forEach((post) => {
        if (post._id === likedPost._id) {
          newPosts.push(likedPost);
        } else {
          newPosts.push({ ...post });
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
          updatedPosts.push({ ...commentedPost });
        } else {
          updatedPosts.push({ ...post });
        }
      });
      return {
        ...state,
        newsfeedPosts: updatedPosts,
      };
    case POST_LOADING:
      return {
        ...state,
        loading: true,
      };
    case CLEAR_DATA:
      return {
        currentPost: null,
        currentPosts: null,
        newsfeedPosts: null,
        loading: false,
      };
    default:
      return state;
  }
};

export default reducer;
