import axios from 'axios';
import {invalidProperties, apiRoot} from "../helpers"

const state = {
    "wxForecast": {},
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
            throw Error("This operation has failed, please try again")
        }

        commit('setWxForecast', resp.data.wxForecast);
    }
};

const mutations = {
    setWxForecast: (state, wxForecast) => {
        state.wxForecast = wxForecast;
        state.validWxForecast = true;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}