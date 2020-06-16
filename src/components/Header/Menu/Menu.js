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
        <ListItem button key='signup' onClick={() => setIsOpen(false)}>
          <Link to="/signup">
            <ListItemText primary='1) Sign Up' />
          </Link>
        </ListItem>

        <ListItem button key='login' onClick={() => setIsOpen(false)}>
          <Link to="/login">
            <ListItemText primary='2) Login' />
          </Link>
        </ListItem>

        <ListItem button key='create' onClick={() => setIsOpen(false)}>
          <Link to="/create">
            <ListItemText primary='3) Create Task' />
          </Link>
        </ListItem>

        <ListItem button key='items' onClick={() => setIsOpen(false)}>
          <Link to="/tasks">
            <ListItemText primary='4) View Tasks' />
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