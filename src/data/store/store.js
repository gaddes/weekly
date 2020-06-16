import { createStore, action } from 'easy-peasy';

const storeModel = {
  userData: {
    id: '',
    tasks: [],
  },

  setUserData: action((state, payload) => {
    state.userData = payload;
  }),
};

const store = createStore(storeModel);

export default store;