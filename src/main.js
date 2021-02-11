import AppLayout from '@/layout/index.vue';
import vuetify from '@/plugins/vuetify';
import router from '@/router';
import axios from '@/services/axios.js';
import store from '@/store';
import Vue from 'vue';

Vue.prototype.$axios = axios;
Vue.config.productionTip = false;

new Vue({
    router,
    store,
    vuetify,
    render: h => h(AppLayout)
}).$mount('#app');
