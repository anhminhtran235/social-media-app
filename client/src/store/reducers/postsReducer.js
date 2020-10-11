import {
  LOAD_NEWSFEED_SUCCESS,
  LOAD_NEWSFEED_FAILURE,
  LOAD_POST_SUCCESS,
  LOAD_POST_FAILURE,
} from '../actionTypes';

const initialState = {
  currentPost: null,
  newsfeedPosts: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_NEWSFEED_SUCCESS:
      return {
        ...state,
        newsfeedPosts: action.payload,
      };
    case LOAD_POST_SUCCESS:
      return {
        ...state,
        currentPost: action.payload,
      };
    case LOAD_POST_FAILURE:
      return {
        ...state,
        currentPost: null,
      };
    case LOAD_NEWSFEED_FAILURE:
      // Do nothing
      return state;
    default:
      return state;
  }
};

export default reducer;
