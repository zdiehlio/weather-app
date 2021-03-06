const axios = require('axios')
const yargs = require('yargs')

const keys = require('./keys')
const geocode = require('./geocode/geocode')
const weather = require('./weather/weather')

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to fetch weather for',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv

let encodedAddress = encodeURIComponent(argv.address)
let geocodeURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${keys.mapsApi}`

axios.get(geocodeURL).then(res => {
  console.log(geocodeURL)
  
  if(res.data.status === 'ZERO_RESULTS') {
    throw new Error('unable to find address')
  }
  let lat = res.data.results[0].geometry.location.lat
  let long = res.data.results[0].geometry.location.lng
  let weatherURL = `https://api.darksky.net/forecast/${keys.weatherApi}/${lat},${long}`

  console.log('res', res.data.results[0].formatted_address)
  return axios.get(weatherURL)
}).then(res => {
  let temp = res.data.currently.temperature
  let summary = res.data.currently.summary
  console.log(`Sky is ${summary} with a temperature of ${temp}`)
  
}).catch(error => {
  if(error.code === 'ENOTFOUND') {
    console.log('unable to connect to server')
    
  } else {
    console.log(error.message)
    
  }
  
})


