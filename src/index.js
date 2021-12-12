const express = require("express");

const weatherForcastModel = require("./controllers/weather.controller");

const app = express();
app.use(express.json());

app.use("/weather" , weatherForcastModel);

module.exports = app;

