// This file contains functions used to sign up
//  and sign in using AWS Cognito

import { CognitoUserPool, CognitoUserAttribute } from 'amazon-cognito-identity-js';

const POOL_DATA = {
  UserPoolId: 'us-east-1_D6X8kXmMV',
  ClientId: '6r0ibsjru76njil1rtsp12v7qv',
};

const userPool = new CognitoUserPool(POOL_DATA);

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
    console.log(`New user signed up successfully! User name is '${user.getUsername()}'`);
  });
};