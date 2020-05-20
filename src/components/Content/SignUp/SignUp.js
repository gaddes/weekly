import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { createUseStyles } from 'react-jss';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { signUp, verifyUser as verify } from '../../../helpers/authService';

import Content from '../Content';
import { Input } from '../../Input';
import stylesheet from './stylesheet';

const useStyles = createUseStyles(stylesheet);

const signUpSchema = yup.object().shape({
  username: yup.string()
    .required("username is required"),
  password: yup.string()
    .required("password is required"),
  email: yup.string()
    .required('email is required')
    .email('please enter a valid email address'),
});

const verificationSchema = yup.object().shape({
  username: yup.string()
    .required("username is required"),
  code: yup.string()
    .required("verification code is required"),
});


const SignUpVerification = () => {
  const classes = useStyles();
  const [verificationSuccess, setVerificationSuccess] = useState(false);

  const { register, handleSubmit, errors } = useForm({
    validationSchema: verificationSchema
  });

  const verifyUser = data => {
    verify(data)
      .then(res => {
        console.log(res);
        setVerificationSuccess(true);
      })
      .catch(err => console.error(err));
  };

  return (
    <>
      <Content title="Verify your Account">
        <form className={classes.form} onSubmit={handleSubmit(verifyUser)}>
          <Input
            innerRef={register}
            name="username"
            placeholder="Username"
          />
          {errors.username && <p>{errors.username.message}</p>}

          <Input
            innerRef={register}
            name="code"
            placeholder="Code"
          />
          {errors.code && <p>{errors.code.message}</p>}

          <input type="submit" />
        </form>
      </Content>

      {verificationSuccess &&
        <Redirect push to="/login" />
      }
    </>
  );
};

const SignUp = () => {
  const classes = useStyles();

  const { register, handleSubmit, errors } = useForm({
    validationSchema: signUpSchema
  });

  return (
    <>
      <Content title="Sign Up">
        <form className={classes.form} onSubmit={handleSubmit(signUp)}>
          <Input
            innerRef={register}
            name="username"
            placeholder="Username"
          />
          {errors.username && <p>{errors.username.message}</p>}

          <Input
            innerRef={register}
            name="email"
            placeholder="Email"
          />
          {errors.email && <p>{errors.email.message}</p>}

          <Input
            innerRef={register}
            name="password"
            placeholder="Password"
          />
          {errors.password && <p>{errors.password.message}</p>}

          <input type="submit" />
        </form>
      </Content>

      <SignUpVerification />
    </>
  );
};

export default SignUp;