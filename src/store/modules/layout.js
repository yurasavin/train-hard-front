export default {
    namespaced: true,

    state: {
        showDrawer: false
    },

    mutations: {
        _setShowDrawer(state, value) {
            state.showDrawer = value;
        }
    },

    actions: {
        setShowDrawer(store, value) {
            store.commit('_setShowDrawer', value);
        }
    }
};
