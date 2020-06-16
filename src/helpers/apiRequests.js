// This file contains helpers for use with HTTP requests

import axios from 'axios';

const url = 'https://ks3143j8ed.execute-api.us-east-1.amazonaws.com/dev/user';

/**
 * GET - retrieve existing user
 * @param {string} username - e.g. 'matt'
 * @param {object} headers - authorization headers required for secure endpoint access e.g. { Authorization: 'JWT token' }
 * @returns {object} containing data for current user
 */
export const getUser = async (username, headers) => {
  const requestUrl = url + '?id=' + username;
  try {
    return await axios(requestUrl, { headers });
  } catch (err) {
    throw new Error(err);
  }
};

// TODO: add JSDoc for this
// POST - create new user
export const createUser = async payload => {
  try {
    return await axios.post(url, payload);
  } catch (err) {
    throw new Error(err);
  }
};

// TODO: add JSDoc for this
// PUT - update existing user data
export const updateUser = async (payload, headers) => {
  try {
    return await axios.put(url, payload, { headers });
  } catch (err) {
    throw new Error(err);
  }
};