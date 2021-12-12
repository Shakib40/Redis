const express = require('express');
const router = express.Router();

const WeatherForcast = require('../models/weather.model');
const redis = require('../configs/redis');


router.get("" , async (req,res) => {
    
    redis.get("weather_forcasts" , async function(err, forcasts) {
        if(err) console.log(err);

        if(forcasts) return res.status(200).send({forcasts: JSON.parse(forcasts)});    

        const weather_forcast = await WeatherForcast.find().lean().exec();
        
        redis.set("weather_forcasts", JSON.stringify(weather_forcast));

        return res.status(200).send({forcast : weather_forcast});
    })

});

router.post("" , async (req, res) => {

    const weather1 = await WeatherForcast.create(req.body);

    const weather2 = await WeatherForcast.find().lean().exec();

    redis.set("weather_forcasts" , JSON.stringify(weather2));
   
    return res.status(201).send(weather1);

})

router.get("/:id" ,  (req, res) => {
    
    redis.get(`weather_forcasts.${req.params.id}` , async (err , forcast) =>{

        // if(err) return console.error(err);

        if(forcast) {
            return res.status(200).send({ cached_forcast : JSON.parse(forcast) });
        }
        const weather_forcast = await WeatherForcast.findById(req.params.id).lean().exec();
    
        redis.set(`weather_forcasts.${req.params.id}` , JSON.stringify(weather_forcast));

        return res.status(200).send({db_forcast : weather_forcast});
    })

})

module.exports  = router;