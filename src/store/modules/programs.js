import axios from '@/services/axios.js';

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
    loadPrograms(store) {
      axios.get('programs/').then(response => {
        store.commit('_setPrograms', response.data);
      });
    },

    setCurrentProgram(store, index) {
      store.commit('_setCurrentProgram', index);
    }
  }
};
