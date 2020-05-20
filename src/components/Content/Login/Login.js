import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { signIn } from '../../../helpers/authService';

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

  const signInUser = data => {
    signIn(data)
      .then(res => {
        console.log(res);
        setSignInSuccess(true);
      })
      .catch(err => console.error(err));
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