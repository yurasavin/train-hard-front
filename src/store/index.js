import layout from '@/store/modules/layout';
import programs from '@/store/modules/programs';
import training from '@/store/modules/training';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        programs,
        layout,
        training
    },
    strict: process.env.NODE_ENV !== 'production'
});
