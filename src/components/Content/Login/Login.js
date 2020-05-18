import React from 'react';
import { createUseStyles } from 'react-jss';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import Content from '../Content';
import { Input } from '../../Input';
import stylesheet from './stylesheet';

const useStyles = createUseStyles(stylesheet);

const schema = yup.object().shape({
  username: yup.string()
    .required("username is required"),
  password: yup.string()
    .required("password is required"),
  email: yup.string()
    .required('email is required')
    .email('please enter a valid email address'),
});


const Login = props => {
  const classes = useStyles();

  const { register, handleSubmit, errors } = useForm({
    validationSchema: schema
  });

  const onSubmit = data => {
    console.log('data', data);
  };

  return (
    <Content title="Login">
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
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
  );
};

export default Login;