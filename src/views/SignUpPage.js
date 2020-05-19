import React from 'react';
import { createUseStyles } from 'react-jss';

import { SignUp } from '../components';
import globalStyles from '../helpers/globalStyles';

const useStyles = createUseStyles(globalStyles);


const SignUpPage = props => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <SignUp />
    </div>
  );
};

export default SignUpPage;