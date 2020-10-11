import axios from 'axios';
import alertify from '../../utils/alertify';
import { LOAD_NEWSFEED_FAILURE, LOAD_NEWSFEED_SUCCESS } from '../actionTypes';

export const loadNewsfeed = (skip = null, limit = null) => {
  return async (dispatch) => {
    let url = '/newsfeed';
    if (skip && limit) {
      url += '?skip=' + skip + '&limit=' + limit;
    } else if (skip) {
      url += '?skip=' + skip;
    } else if (limit) {
      url += '?limit' + limit;
    }

    try {
      const res = await axios.get(url);
      console.log(res);
      dispatch({ type: LOAD_NEWSFEED_SUCCESS, payload: res.data });
    } catch (error) {
      console.log(error);
      alertify.error(error.response.data);
      dispatch({ type: LOAD_NEWSFEED_FAILURE });
    }
  };
};
