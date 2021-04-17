const request = require('postman-request');
require('dotenv').config();

// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=${process.env.WEATHERSTACK_API_KEY}&units=f&query=${latitude},${longitude}`;
  
  request({url, json: true}, (error, {body}) => {
    if (error) {
        callback('Unable to connect to the weather service!');
    } else if (body.error) {
        callback('Unable to find location');
    } else {
        const current = body.current;
        callback(undefined, {
          weather_description: current.weather_descriptions[0],
          temperature: current.temperature,
          feels_like: current.feelslike
        });
    }
  });
}

module.exports = forecast;
