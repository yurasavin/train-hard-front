import axios from '@/services/axios.js';

export default {
  namespaced: true,

  state: {
    exercises: [],
    currentExercise: undefined
  },

  mutations: {
    _setExercises(state, payload) {
      state.exercises = payload;
    },

    _setCurrentExercise(state, index) {
      state.currentExercise = state.exercises[index];
    }
  },

  actions: {
    loadExercises(store, program_id) {
      axios.get(`exercises/?program_id=${program_id}`).then(response => {
        store.commit('_setExercises', response.data);
      });
    },

    setCurrentExercise(store, index) {
      store.commit('_setCurrentExercise', index);
    }
  }
};
