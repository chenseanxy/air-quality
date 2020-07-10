import axios from 'axios';
import {invalidProperties, apiRoot} from "../helpers"

const state = {
    "currentWx": {
        "obsTime": "2020-07-10T16:20+08:00",
        "temp": "31",
        "feelsLike": "34",
        "icon": "104",
        "text": "Overcast",
        "wind360": "176",
        "windDir": "S",
        "windScale": "2",
        "windSpeed": "7",
        "humidity": "69",
        "precip": "0.0",
        "pressure": "998",
        "vis": "16",
        "cloud": "99",
        "dew": "20"
    },
    validCurrentWx: false,
};

const getters = {
    currentWx: state => state.currentWx
};

const actions = {
    async updateCurrentWx({commit, rootGetters}){
        console.log(rootGetters.validLoc);
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