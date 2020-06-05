// This file contains functions used to sign up
//  and sign in using AWS Cognito

import {
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoUser,
  AuthenticationDetails,
} from 'amazon-cognito-identity-js';

import { createUser } from './requests';

const POOL_DATA = {
  UserPoolId: 'us-east-1_D6X8kXmMV',
  ClientId: '6r0ibsjru76njil1rtsp12v7qv',
};

const userPool = new CognitoUserPool(POOL_DATA);

// Get details for current logged-in user
export const getAuthenticatedUser = () => {
  return userPool.getCurrentUser();
};

// Get headers for currently logged-in user; this allows us to make
//  subsequent API requests without asking the user to log in each time
export const getAuthorizationHeaders = () => {
  return getAuthenticatedUser().getSession((err, session) => {
    if (err) return {};
    return {
      'Authorization': session.getIdToken().getJwtToken()
    };
  });
};

export const signUp = data => {
  const { username, email, password } = data;

  // This array holds all the attributes EXCEPT username and possword
  //  that we want to send to AWS Cognito
  const attrList = [];

  // Because username and password are defaults in AWS Cognito,
  //  we only need to specify the email attribute here
  const emailAttribute = {
    Name: 'email',
    Value: email,
  };

  attrList.push(new CognitoUserAttribute(emailAttribute));

  userPool.signUp(username, password, attrList, null, (err, result) => {
    if (err) {
      console.error('AWS Cognito error on user sign up');
      return;
    }
    const { user } = result;
    console.log(`New user "${user.getUsername()}" signed up successfully`);
  });
};

export const verifyUser = async data => {
  const { username, code } = data;
  const userData = {
    Username: username,
    Pool: userPool,
  };
  const cognitoUser = new CognitoUser(userData);

  // Wrap AWS method in Promise so we can decide when to resolve/reject
  const apiCall = new Promise((resolve, reject) => {
    cognitoUser.confirmRegistration(code, true, (err) => {
      if (err) return reject('AWS Cognito error - User cannot be verified');

      const data = { id: username };
      return resolve({
        data,
        message: `User "${username}" has been successfully verified`
      });
    });
  });

  return await apiCall;
}

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

export const signIn = async data => {
  const { username, password } = data;

  const authData = {
    Username: username,
    Password: password,
  };
  const authDetails = new AuthenticationDetails(authData);

  const userData = {
    Username: username,
    Pool: userPool,
  };
  const cognitoUser = new CognitoUser(userData);

  const apiCall = new Promise((resolve, reject) => {
    cognitoUser.authenticateUser(authDetails, {
      onSuccess(res) {
        resolve({
          message: 'Authentication success',
          data: res,
        });
      },
      onFailure(err) {
        reject({
          message: 'Authentication failed',
          data: err,
        });
      },
    });
  });

  return await apiCall;
};

// Sign user out and delete the current tokens.
// User must sign in again if they want to continue their session.
export const logout = () => {
  getAuthenticatedUser().signOut();
};