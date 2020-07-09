var express = require('express');
var router = express.Router();
const { config } = require("../config");
const { default: Axios } = require('axios');
const { query, validationResult } = require('express-validator');

router.get('/', [
    query('lat').isFloat(),
    query('lot').isFloat()
], (req, res, next) => {

    const lat = req.query.lat;
    const lot = req.query.lot;
    console.log({lat, lot})
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const err = errors.array()[0];
        console.log(err);
        return res.status(422).json(err);
    }

    // Baidu Reverse Geo
    Axios.get("http://api.map.baidu.com/reverse_geocoding/v3/", {
        params: {
            ak: config.BAIDU_AK,
            location: `${lat},${lot}`,
            output: "json",
        }
    })
    .catch((error) => {
        // Request error
        console.log(error);
        res.status(error.code).json(error);
    })
    .then((resp) => {
        const {country, province, city, district} 
            = resp.data.result.addressComponent;
        
        const location = {country, province, city, district}

        res.status(200).json({location, lat, lot});
    })
    .catch((error) => {
        // Parsing error
        console.log(error);
        res.status(400).send(error.toString());
    })

});

module.exports = router;