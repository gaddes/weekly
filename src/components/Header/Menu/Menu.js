import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';

import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';

import { Link } from '../../../components';

import stylesheet from './stylesheet';

const useStyles = createUseStyles(stylesheet);


const SwipeableMenu = props => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);

  const SideList = () => (
    <div
      className={classes.list}
      role="presentation"
    >
      <List>
        <ListItem button key='items' onClick={() => setIsOpen(false)}>
          <Link to="/items">
            <ListItemText primary='Items' />
          </Link>
        </ListItem>

        <ListItem button key='login' onClick={() => setIsOpen(false)}>
          <Link to="/login">
            <ListItemText primary='Login' />
          </Link>
        </ListItem>
      </List>
    </div>
  );

  return (
    <>
      <IconButton onClick={() => setIsOpen(true)} color="inherit" aria-label="menu">
        <MenuIcon />
      </IconButton>
      <SwipeableDrawer
        anchor="right"
        open={isOpen}
        onClose={() => setIsOpen(false)}
        onOpen={() => setIsOpen(true)}
      >
        <SideList />
      </SwipeableDrawer>
    </>
  );
};

export default SwipeableMenu;