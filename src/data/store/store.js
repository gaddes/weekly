import { createStore, action } from 'easy-peasy';

const storeModel = {
  tasks: [],

  setTasks: action((state, payload) => {
    state.tasks = payload;
  }),
};

const store = createStore(storeModel);

export default store;