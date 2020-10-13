import axios from 'axios';

export const updateTokenAxios = () => {
  const token = localStorage.getItem('token');
  if (token) {
    axios.defaults.headers.common.token = token;
  } else {
    delete axios.defaults.headers.common.token;
  }
};

export const buildUrl = (baseUrl, skip, limit) => {
  let url = baseUrl;
  if (skip && limit) {
    url += '?skip=' + skip + '&limit=' + limit;
  } else if (skip) {
    url += '?skip=' + skip;
  } else if (limit) {
    url += '?limit' + limit;
  }
  return url;
};
