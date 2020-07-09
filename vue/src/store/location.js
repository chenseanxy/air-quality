import axios from 'axios';
import {invalidProperties, apiRoot} from "../helpers"

const state = {
    coords: {lat: 0, lot: 0},
    loc: {country: "", province: "", city: "", district:""},
    validCoords: false,
    validLoc: false,
};

const getters = {
    coords: state => state.coords,
    loc: state => state.loc,
    validLoc: state => state.validLoc,
    validCoords: state => state.validCoords,
};

const actions = {
    async updateCoords({ commit, dispatch }){

        function getCoordinates() {
            // Wrap geolocation API into async operation
            return new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject, 
                    {enableHighAccuracy: true, maximumAge: 100}
                );
            });
        }
        
        const pos = await getCoordinates();

        const coords = {
            lat: pos.coords.latitude,
            lot: pos.coords.longitude,
        }
        console.log(coords)
        if(invalidProperties(coords)){
            throw Error("This operation has failed, please try again")
        }

        commit('setCoords', coords);

        // Update location data from the updated coords
        await dispatch("updateLoc");
    },

    async updateLoc({ state, commit }){
        const resp = await axios.get(`${apiRoot}/geoToCity`,
            {params: {...state.coords}},
        )

        if(invalidProperties(resp.data.location)){
            throw Error("This operation has failed, please try again")
        }

        commit('setLoc', resp.data.location)
    },
};

const mutations = {
    setCoords: (state, coords) => {
        state.coords = coords;
        state.validCoords = true;
    },

    setLoc: (state, loc) => {
        state.loc = loc;
        state.validLoc = true;
    },
};

export default {
    state,
    getters,
    actions,
    mutations
}