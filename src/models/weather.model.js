const mongoose = require('mongoose');

const weaatherSchema = new mongoose.Schema(
    {
    city_name: { type : 'string' ,   required : true },
    max_temperature : { type : 'number' , required : true},
    min_temperature : { type : 'number' , required : true},
    chance_of_rain : { type : 'number' , required : true},
    humidity : { type : 'number' , required : true},
   },
    {
      
        versionKey : false,
        timestamps : true
    }
)

module.exports = mongoose.model ('weather_forecast' , weaatherSchema);
