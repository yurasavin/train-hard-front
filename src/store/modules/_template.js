import axios from '@/services/axios.js';

export default {
    namespaced: true,

    state: {
        key: undefined
    },

    mutations: {
        _setKey(state, payload) {
            state.key = payload;
        }
    },

    actions: {
        loadKey(store) {
            axios.get('key/').then(response => {
                store.commit('_setKey', response.data);
            });
        },

        setKey(store, value) {
            store.commit('_setKey', value);
        }
    }
};
