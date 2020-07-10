var express = require('express');
var router = express.Router();
const { config } = require("../config");
const { default: Axios } = require('axios');
const { query, validationResult } = require('express-validator');
const { addDocument, getCachedDocument } = require('../persistence');
const { isEmpty } = require("../helpers");

router.get('/current', [
    query('locid').isFloat(),
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
        result = await getCachedDocument('locid', locid, 'currentWx');
        if (!isEmpty(result)){
            res.status(200).json(result);
            return;
        }
    } finally {
        result = {}
    }

    try{
        resp = await Axios.get(
            "https://devapi.heweather.net/v7/weather/now", {
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
        result = {locid, currentWx: resp.data.now};
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        res.status(400).send(err.toString());
    }

    addDocument(result, 'currentWx');
});

router.get('/forecast', [
    query('locid').isFloat(),
], async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const err = errors.array()[0];
        console.log(err);
        return res.status(422).json(err);
    }

    const { locid } = req.query;
    let forecast;
    let result;
        
    try{
        result = await getCachedDocument('locid', locid, 'wxForecast');
        if (!isEmpty(result)){
            res.status(200).json(result);
            return;
        }
    } finally {
        result = {}
    }

    try{
        forecast = await Axios.get(
            "https://devapi.heweather.net/v7/weather/3d", {
            params: {
                location: locid, 
                key: config.HEFENG_KEY,
                lang: 'en',
            }
        });

    } catch (err) {
        // Request error
        console.log(err);
        res.status(err.code).json(err);
    }

    try{
        let wxForecast = {};
        for(const day of forecast.data.daily){
            wxForecast[day.fxDate] = day
        }
        result = {locid, wxForecast}
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        res.status(400).send(err.toString());
    }

    addDocument(result, 'wxForecast');
});

module.exports = router;