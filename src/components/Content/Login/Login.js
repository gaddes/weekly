import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useStoreState, useStoreActions } from 'easy-peasy';


import { signIn, getAuthorizationHeaders } from '../../../helpers/awsCognito';
import { getUser } from '../../../helpers/apiRequests';

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

  // TODO: this allows us to grab user data from store, but it's not really necessary here...
  const userData = useStoreState(state => state.userData);
  const setUserData = useStoreActions(actions => actions.setUserData);

  const { register, handleSubmit, errors } = useForm({
    validationSchema: schema
  });

  const signInUser = async data => {
    try {
      // On successful sign-in, get user data
      const result = await signIn(data);
      console.log({
        message: result.message,
        data: result.data,
      });

      // Construct headers object - this must include authentication token for current user
      const headers = getAuthorizationHeaders();

      // Query database for current user, using Cognito authorization headers for security
      const response = await getUser(data.username, headers);

      // Add user data to store model
      setUserData(response.data);

      // TODO: this should trigger page change so that user see their tasks
      //  (which are now stored in the store model)
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