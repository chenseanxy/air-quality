import axios from 'axios';
import {invalidProperties, apiRoot} from "../helpers"

const state = {
    "currentWx": {
        "obsTime": "",
        "temp": "",
        "feelsLike": "",
        "icon": "",
        "text": "",
        "wind360": "",
        "windDir": "",
        "windScale": "",
        "windSpeed": "",
        "humidity": "",
        "precip": "",
        "pressure": "",
        "vis": "",
        "cloud": "",
        "dew": ""
    },
    validCurrentWx: false,
};

const getters = {
    currentWx: state => state.currentWx,
    validCurrentWx: state => state.validCurrentWx,
};

const actions = {
    async updateCurrentWx({commit, rootGetters}){
        if(!rootGetters.validLoc){
            throw Error("Please retry gathering location");
        }

        const resp = await axios.get(`${apiRoot}/weather/current`,{
            params: {locid: rootGetters.loc.id}
        });

        if(invalidProperties(resp.data.currentWx)){
            throw Error("This operation has failed, please try again")
        }

        commit('setCurrentWx', resp.data.currentWx);
    }
};

const mutations = {
    setCurrentWx: (state, currentWx) => {
        state.currentWx = currentWx;
        state.validCurrentWx = true;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}