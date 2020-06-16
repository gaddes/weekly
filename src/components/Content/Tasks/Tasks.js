import React from 'react';
import { useStoreState } from 'easy-peasy';

import Content from '../Content';

const Tasks = () => {
  const { tasks } = useStoreState(state => state.userData);

  return (
    <Content title="Tasks">
      <ul>
        {tasks.map(task => <li>{task}</li>)}
      </ul>
    </Content>
  );
};

export default Tasks;