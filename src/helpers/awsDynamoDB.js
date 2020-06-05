// This file contains helpers for use with DynamoDB

import { createUser } from './apiRequests';

export const addUserToDatabase = async data => {
  try {
    const response = await createUser(data);
    console.log(`User "${data.id}" has been added to database`);
    return response;
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
};