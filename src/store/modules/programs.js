import axios from 'axios';

export default {
  namespaced: true,

  state: {
    programs: [],
    currentProgram: undefined
  },

  mutations: {
    _setPrograms(state, payload) {
      state.programs = payload;
    },

    _setCurrentProgram(state, index) {
      state.currentProgram = state.programs[index];
    }
  },

  actions: {
    loadPrograms(store, user_id) {
      axios.get(`programs/?user_id=${user_id}`).then(response => {
        store.commit('_setPrograms', response.data);
      });
    },

    setCurrentProgram(store, index) {
      store.commit('_setCurrentProgram', index);
    }
  }
};
