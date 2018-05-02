const request = require('request')

const keys = require('../keys')

let geocodeAddress = (address, callback) => {
  let encodedAddress = encodeURIComponent(address)

  request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${keys.mapsApi}`,
    json: true
  }, (error, response, body) => {
    if(error) {
      callback('Unable to connect to google servers')
  
    } else if(body.status === 'ZERO_RESULTS') {
      callback('unable to find address')
      
    } else if(body.status === 'OK'){
      callback(undefined, {
        address: body.results[0].formatted_address,
        lat: body.results[0].geometry.location.lat,
        long: body.results[0].geometry.location.lng
      })
      console.log(`Address ${body.results[0].formatted_address}`)
      console.log(`lat ${body.results[0].geometry.location.lat}`)
      console.log(`long ${body.results[0].geometry.location.lng}`)

    }
  })
}

module.exports.geocodeAddress = geocodeAddress