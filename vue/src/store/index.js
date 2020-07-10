import Vuex from 'vuex';
import Vue from 'vue';

import location from './location';
import AQI from './airQuality';
import currentWx from "./currentWx";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        location,
        AQI,
        currentWx,
    }
})