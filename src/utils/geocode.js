const request = require('postman-request')

const geocode = (address, callback) => {
    
    if(!address) return callback('Missing address argument')
    
    address = encodeURIComponent(address)
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1Ijoic29sYXJ3aW5kIiwiYSI6ImNrazkxNm90ZzBjc20ybnJ6czR1azhvNngifQ.hctPGxwyFAIYQf42tT-JXw&limit=1`
    request({url, json:true}, (error, {body} = {}) => {
        if(error){
            callback('Unable to connect to location services!')
        } else if(!body.features.length){
            callback('Unable to find location. Try another search.')
        } else {
            callback(undefined, {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].place_name,
            })
        }
    })
}

module.exports = geocode