// This file contains helpers for http requests

import axios from 'axios';

const url = 'https://ks3143j8ed.execute-api.us-east-1.amazonaws.com/dev/user';

export const createUser = async payload => {
  try {
    return await axios.post(url, payload);
  } catch (err) {
    throw new Error(err);
  }
};

export const getUserData = async payload => {
  try {
    return await axios.get(url, payload);
  } catch (err) {
    throw new Error(err);
  }
};