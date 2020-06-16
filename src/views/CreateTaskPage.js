import React from 'react';
import { createUseStyles } from 'react-jss';

import { CreateTask } from '../components';
import globalStyles from '../helpers/globalStyles';

const useStyles = createUseStyles(globalStyles);


const CreateTaskPage = props => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <CreateTask />
    </div>
  );
};

export default CreateTaskPage;