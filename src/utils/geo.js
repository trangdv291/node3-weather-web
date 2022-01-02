const request = require('request')

const geocode = (address,callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoidHJhbmdkb2FuIiwiYSI6ImNreG0wNDNvejB3N28ydm13YzlxNXhieXMifQ.jeBDI5GaI0ih_OJpqjN0XQ'
    request({url, json:true},(error,{body}={}) => {
        if (error){
            callback('Unable to connect to the server', undefined)
        } else if (body.features.length === 0){
            callback('Can not find the location. Try again', undefined)
        } else {
            callback(undefined,{
                lat: body.features[0].geometry.coordinates[1],
                long: body.features[0].geometry.coordinates[0],
                location: body.features[0].place_name
            })

        }
    })

}


module.exports = geocode