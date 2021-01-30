const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=05fcde4a80c61ed04f6fe6a9f2926337&query=${longitude},${latitude}`
    request({url, json: true}, (error, {body})=>{
        if(error){
            callback('Unable to connect to Forecast!')
        } else if(body.error){
            callback('Unable to get weather')
        } else{
            callback(undefined, `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees out. It feels like ${body.current.feelslike} degrees out. The humidity is ${body.current.humidity}%`)
        }
    })
}

module.exports = forecast