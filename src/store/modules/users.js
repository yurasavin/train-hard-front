import axios from 'axios';

export default {
  namespaced: true,

  state: {
    users: [],
    currentUser: undefined
  },

  mutations: {
    _setUsers(state, payload) {
      state.users = payload;
    },

    _setCurrentUser(state, index) {
      state.currentUser = state.users[index];
    }
  },

  actions: {
    loadUsers(store) {
      axios.get('users/').then(response => {
        store.commit('_setUsers', response.data);
      });
    },

    setCurrentUser(store, index) {
      store.commit('_setCurrentUser', index);
    }
  }
};
