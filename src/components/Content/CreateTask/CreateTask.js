import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useStoreState, useStoreActions } from 'easy-peasy';


import { getAuthorizationHeaders } from '../../../helpers/awsCognito';
import { updateUser } from '../../../helpers/apiRequests';

import Content from '../Content';
import { Input } from '../../Input';
import stylesheet from './stylesheet';

const useStyles = createUseStyles(stylesheet);

const schema = yup.object().shape({
  task: yup.string()
    .required("task is required"),
});


const CreateTask = () => {
  const classes = useStyles();
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const userData = useStoreState(state => state.userData);
  const setUserData = useStoreActions(actions => actions.setUserData);

  const { register, handleSubmit, errors } = useForm({
    validationSchema: schema
  });

  const updateTasks = async data => {
    // TODO: see if this logic can be done on the backend
    // Merge existing tasks (if they exist) with newly-created task
    const tasks = [...userData.tasks, data.task];

    try {
      // Construct headers object incl. authentication token for current user
      const headers = getAuthorizationHeaders();
      const body = {
        id: userData.id,
        tasks,
      };

      // Add updated tasks to database
      const response = await updateUser(body, headers);

      // TODO: use response data here (rather than body)
      //  i.e. only update Redux when response comes back successful
      // Add updated tasks to store model
      setUserData(body);

      // TODO: this should show some kind of validation message so user knows it's successful
      setUpdateSuccess(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Content title="Create Task">
      <form className={classes.form} onSubmit={handleSubmit(updateTasks)}>
        <Input
          innerRef={register}
          name="task"
          placeholder="New task here..."
        />
        {errors.task && <p>{errors.task.message}</p>}

        <input type="submit" />
      </form>
    </Content>
  );
};

export default CreateTask;