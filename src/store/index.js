import Vue from 'vue';
import Vuex from 'vuex';

import programs from '@/store/modules/programs';
import training from '@/store/modules/training';
import users from '@/store/modules/users';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    programs,
    training,
    users
  },
  strict: process.env.NODE_ENV !== 'production'
});
