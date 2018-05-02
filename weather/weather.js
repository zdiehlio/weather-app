const request = require('request')

const keys = require('../keys')

let getWeather = (lat, long, callback) => {
  request.get({
    url: `https://api.darksky.net/forecast/${keys.weatherApi}/${lat},${long}`,
    json: true
    }, 
    (error, response, body) => {
      if(!error && response.statusCode === 200) {
        callback(undefined, {
          temperature: body.currently.temperature,
          summary: body.currently.summary
        })        
      } else {
        callback(error)
      }
    })
  }

  module.exports.getWeather = getWeather