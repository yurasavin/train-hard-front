import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

Vue.use(Vuetify);

const opts = {
    // theme: {
    //     dark: false,
    //     themes: {
    //         dark: {
    //             primary: '#204165',
    //             secondary: '#bdbdbd',
    //             accent: '#454C8B',
    //             error: '#200001'
    //         }
    //     }
    // }
};

export default new Vuetify(opts);
