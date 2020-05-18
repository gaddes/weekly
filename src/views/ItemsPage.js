import React from 'react';
import { createUseStyles } from 'react-jss';

import { Items } from '../components';
import globalStyles from '../helpers/globalStyles';

const useStyles = createUseStyles(globalStyles);


const ItemsPage = props => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Items />
    </div>
  );
};

export default ItemsPage;