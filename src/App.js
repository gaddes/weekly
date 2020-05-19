import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { createUseStyles } from 'react-jss';

import { ItemsPage, HomePage, LoginPage, SignUpPage } from './views';
import { Header, Footer } from './components';
import stylesheet from './stylesheet';

const useStyles = createUseStyles(stylesheet);


export default function App() {
  const classes = useStyles();

  return (
    <BrowserRouter>
      <div className={classes.appContainer}>
        <Header />
        <Switch>
          <Route exact path='/'>
            <HomePage />
          </Route>
          <Route path='/signup'>
            <SignUpPage />
          </Route>
          <Route path='/login'>
            <LoginPage />
          </Route>
          <Route path='/items'>
            <ItemsPage />
          </Route>
        </Switch>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
