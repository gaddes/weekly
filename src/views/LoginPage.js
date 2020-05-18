import React from 'react';
import { createUseStyles } from 'react-jss';

import { Login } from '../components';
import globalStyles from '../helpers/globalStyles';

const useStyles = createUseStyles(globalStyles);


const LoginPage = props => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Login />
    </div>
  );
};

export default LoginPage;