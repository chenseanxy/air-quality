var express = require('express');
var router = express.Router();
const { config } = require("../config");
const { default: Axios } = require('axios');
const { query, validationResult } = require('express-validator');

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
        const currentWx = resp.data.now;
        res.status(200).json({locid, currentWx});
    } catch (err) {
        console.log(err);
        res.status(400).send(err.toString());
    }

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
        const wxForecast = forecast.data.daily;
        res.status(200).json({locid, wxForecast});
    } catch (err) {
        console.log(err);
        res.status(400).send(err.toString());
    }

});

module.exports = router;