import axios from 'axios';

export const updateTokenAxios = () => {
  const token = localStorage.getItem('token');
  if (token) {
    axios.defaults.headers.common.token = token;
  } else {
    delete axios.defaults.headers.common.token;
  }
};
