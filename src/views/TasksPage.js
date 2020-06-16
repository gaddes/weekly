import React from 'react';
import { createUseStyles } from 'react-jss';

import { Tasks } from '../components';
import globalStyles from '../helpers/globalStyles';

const useStyles = createUseStyles(globalStyles);


const TasksPage = props => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Tasks />
    </div>
  );
};

export default TasksPage;