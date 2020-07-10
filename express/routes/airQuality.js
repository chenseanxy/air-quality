var express = require('express');
var router = express.Router();
const { config } = require("../config");
const { default: Axios } = require('axios');
const { query, validationResult } = require('express-validator');
const { addDocument, getCachedDocument } = require('../persistence');
const { isEmpty } = require('../helpers');

router.get('/', [
    query('locid').isAlphanumeric(),
], async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const err = errors.array()[0];
        console.log(err);
        return res.status(422).json(err);
    }

    const { locid } = req.query;
    let resp;
    let result;
    
    try{
        result = await getCachedDocument('locid', locid, 'airQuality');
        if (!isEmpty(result)){
            res.status(200).json(result);
            return;
        }
    } finally {
        result = {}
    }

    try{
        resp = await Axios.get(
            "https://devapi.heweather.net/v7/air/now", {
            params: {
                location: locid, 
                key: config.HEFENG_KEY,
                lang: 'en',
            }
        });    
    } catch (err) {
        // Request error
        console.log(error);
        res.status(error.code).json(error);
    }

    try{
        result = {locid, airQuality: resp.data.now}
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        res.status(400).send(err.toString());
    }

    addDocument(result, 'airQuality')
});

module.exports = router;