import axios from 'axios';
import {invalidProperties, apiRoot} from "../helpers"

const state = {
    wxForecast: {},
    validWxForecast: false,
};

const getters = {
    wxForecast: state => state.wxForecast,
    validWxForecast: state => state.validWxForecast,
};

const actions = {
    async updateWxForecast({commit, rootGetters}){
        if(!rootGetters.validLoc){
            throw Error("Please retry gathering location");
        }

        const resp = await axios.get(`${apiRoot}/weather/forecast`,{
            params: {locid: rootGetters.loc.id}
        });

        if(invalidProperties(resp.data.wxForecast)){
            commit("resetWxForecast");
            throw Error("Weather forecast is not available for this location")
        }

        commit('setWxForecast', resp.data.wxForecast);
    }
};

const mutations = {
    setWxForecast: (state, wxForecast) => {
        state.wxForecast = wxForecast;
        state.validWxForecast = true;
    },
    resetWxForecast: (state) => {
        state.wxForecast = {};
        state.validWxForecast = false;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}