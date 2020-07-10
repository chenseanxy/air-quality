var express = require('express');
var router = express.Router();
const { config } = require("../config");
const { default: Axios } = require('axios');
const { query, validationResult } = require('express-validator');
const { addDocument } = require("../persistence");

router.get('/', [
    query('lat').isFloat(),
    query('lot').isFloat()
], async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const err = errors.array()[0];
        console.log(err);
        return res.status(422).json(err);
    }

    const lat = req.query.lat;
    const lot = req.query.lot;

    let baiduResp, hefengResp;
    let result;

    try{
        // Baidu Reverse Geo
        const baiduProm = Axios.get("http://api.map.baidu.com/reverse_geocoding/v3/", {
            params: {
                ak: config.BAIDU_AK,
                location: `${lat},${lot}`,
                output: "json",
            }
        });

        // Hefeng: get location ID
        const hefengProm = Axios.get("https://geoapi.heweather.net/v2/city/lookup", {
            params: {
                key: config.HEFENG_KEY,
                location: `${lot},${lat}`,
            }
        });

        [baiduResp, hefengResp] = await Promise.all([baiduProm, hefengProm])
    } catch (err) {
        // Request error
        console.log(error);
        res.status(error.code).json(error);
    }

    try{
        const {country, province, city, district} 
            = baiduResp.data.result.addressComponent;
        const {id, tz} = hefengResp.data.location[0]
        const location = {country, province, city, district, id}
        result = {location, lat, lot, tz};

        res.status(200).json(result);
    } catch (error) {
        // Parsing error
        console.log(error);
        res.status(400).send(error.toString());
    }

    addDocument(result, 'reverseGeo');

});

module.exports = router;