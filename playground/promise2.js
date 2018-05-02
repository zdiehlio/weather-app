const request = require('request')

let geocodeAddress = address => {
  let encodedAddress = encodeURIComponent(address)
  return new Promise((resolve, reject) => {
    request({
      url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyATBp5fRWCDavfnTYF7o6CQi6mG0cbtyTY`,
      json: true
    }, (error, response, body) => {
      if(error) {
        reject('Unable to connect to google servers')
    
      } else if(body.status === 'ZERO_RESULTS') {
        reject('unable to find address')
        
      } else if(body.status === 'OK'){
        resolve({
          address: body.results[0].formatted_address,
          lat: body.results[0].geometry.location.lat,
          long: body.results[0].geometry.location.lng
        })
      }
    })
  })
}

geocodeAddress('diamciema').then(res => {
  console.log(JSON.stringify(res, undefined, 2))
  
}).catch(error => {
  console.log(error)
  
})