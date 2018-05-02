const request = require('request')

let getWeather = (lat, long, callback) => {
  request.get({
    url: `https://api.darksky.net/forecast/9822d5328215bc13220299cb7052e548/${lat},${long}`,
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