import axios from 'axios';
import {invalidProperties, apiRoot} from "../helpers"

const state = {
    airQuality: {
        "pubTime": "",
        "aqi": "",
        "category": "",
        "primary": "",
        "pm10": "",
        "pm2p5": "",
        "no2": "",
        "so2": "",
        "co": "",
        "o3": ""
    },
    validAirQuality: false,
};

const getters = {
    airQuality: state => state.airQuality,
    validAirQuality: state => state.validAirQuality,
};

const actions = {
    async updateAirQuality({commit, rootGetters}){
        if(!rootGetters.validLoc){
            throw Error("Please retry gathering location");
        }

        const resp = await axios.get(`${apiRoot}/airQuality`,{
            params: {locid: rootGetters.loc.id}
        });

        if(invalidProperties(resp.data.airQuality)){
            commit('resetAirQuality');
            throw Error("Air quality data is not available for this location");
        }

        commit('setAirQuality', resp.data.airQuality);
    }
};

const mutations = {
    setAirQuality: (state, airQuality) => {
        state.airQuality = airQuality;
        state.validAirQuality = true;
    },
    resetAirQuality: (state) => {
        state.airQuality = {};
        state.validAirQuality = false;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}