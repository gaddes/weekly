// This file contains helpers for use with HTTP requests

import axios from 'axios';

const url = 'https://ks3143j8ed.execute-api.us-east-1.amazonaws.com/dev/user';

// GET - retrieve existing user
export const getUser = async username => {
  try {
    // TODO: may need to use a second param of JWT token to securely
    //  request user data i.e. prevent anyone from simply passing in a username
    return await axios(url + '?userId=' + username);
  } catch (err) {
    throw new Error(err);
  }
};

// POST - create new user
export const createUser = async payload => {
  try {
    return await axios.post(url, payload);
  } catch (err) {
    throw new Error(err);
  }
};

// PUT - update existing user data
export const updateUser = async payload => {
  try {
    return await axios.put(url, payload);
  } catch (err) {
    throw new Error(err);
  }
};