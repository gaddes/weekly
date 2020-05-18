import React from "react";
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import classnames from 'classnames';

import stylesheet from './stylesheet';

const useStyles = createUseStyles(stylesheet);


const Input = props => {
  const classes = useStyles();

  return (
    <input
      className={classnames(classes.input, props.classes)}
      ref={props.innerRef}
      name={props.name}
      placeholder={props.placeholder}
    />
  );
};

const { string, func } = PropTypes;

Input.propTypes = {
  name: string.isRequired,
  innerRef: func.isRequired,
  placeholder: string,
};

export default Input;