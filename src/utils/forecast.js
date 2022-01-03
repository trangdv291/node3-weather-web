const { response } = require('express')
const request = require('request')

const forecast = (lat,long,callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=3a219774a15f5ed6c60f2e78b8b7b485&query=' + long +',' + lat + '&units=m'
    
    request ({url,json:true},(error,{body} = {}) => {
        if (error) {
            callback('Can not connect to the server', undefined)
        } else if (body.error) {
            callback('Cannot find the location',undefined)

        } else {
            callback(undefined, {
                
                forecast: body.current.weather_descriptions[0],
                temperature: body.current.temperature,
                feelslike: body.current.feelslike,
                country: body.location.country
            })

        }
    })
}

module.exports = forecast