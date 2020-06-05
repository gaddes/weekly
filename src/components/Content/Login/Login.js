import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { signIn, getAuthorizationHeaders } from '../../../helpers/awsCognito';

import Content from '../Content';
import { Input } from '../../Input';
import stylesheet from './stylesheet';

const useStyles = createUseStyles(stylesheet);

const schema = yup.object().shape({
  username: yup.string()
    .required("username is required"),
  password: yup.string()
    .required("password is required"),
});


const Login = () => {
  const classes = useStyles();
  const [signInSuccess, setSignInSuccess] = useState(false);

  const { register, handleSubmit, errors } = useForm({
    validationSchema: schema
  });

  const signInUser = async data => {
    try {
      // Get data incl. authentication token
      const result = await signIn(data);
      console.log({
        message: result.message,
        data: result.data,
      });

      // TODO: see lecture 100 - add authorizer to API Gateway
      // Use authentication token to make GET request for user data
      const headers = getAuthorizationHeaders();

      console.log('headers', headers);
      // TODO: make GET request to retrieve user's current tasks
      //  using Cognito authorization headers for security

      setSignInSuccess(true);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Content title="Login">
      <form className={classes.form} onSubmit={handleSubmit(signInUser)}>
        <Input
          innerRef={register}
          name="username"
          // If we allow sign in with verified email address
          //  in AWS Cognito, we can use either username or email here
          placeholder="Username"
        />
        {errors.username && <p>{errors.username.message}</p>}

        <Input
          innerRef={register}
          name="password"
          placeholder="Password"
        />
        {errors.password && <p>{errors.password.message}</p>}

        <input type="submit" />
      </form>
    </Content>
  );
};

export default Login;