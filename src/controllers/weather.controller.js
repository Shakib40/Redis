const express = require('express');
const router = express.Router();

const WeatherForcast = require('../models/weather.model');
const redis = require('../configs/redis');


router.get("" , async(req,res) => {
    
    redis.get("weather_forcasts" , async function(err, forcasts) {
        if(err) console.log(err);
        if(forcasts) return res.status(200).send({cached_forcasts: JSON.parse(forcasts)});    

        const temp = await WeatherForcast.find().lean().exec();
        
        redis.set("weather_forcasts", JSON.stringify(forcast));

        return res.status(200).send({db_forcasts: temp});
    })

});

module.exports  = router;