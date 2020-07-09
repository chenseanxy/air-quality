import Vuex from 'vuex';
import Vue from 'vue';
import location from './location'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        location,
    }
})