const express = require('express')
const path = require('path')
const app = express()
const hbs = require('hbs')
const geocode = require('./utils/geo.js')
const forecast = require('./utils/forecast.js')

//define path for express config

const publicDirectory = path.join(__dirname, '../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebar engine and views location

app.set('view engine','hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

//set up static directory to serve
app.use(express.static(publicDirectory))

app.get('', (req,res)=>{
    res.render('index', {
        title: 'Weather app',
        name: 'trang'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        message: 'Xin chao',
        title: 'help',
        name: 'trang'

    })
})

/*app.get('', (req,res)=>{
    //send something to the requester using method send
    res.send('Hello')
})*/

/*app.get('/about', (req,res) =>{
    res.send({
        name: "trang" ,
        age: 31
    })
})*/

app.get('/weather', (req,res)=>{
    if (!req.query.address) {
        return res.send({
            error: 'please provide an address'
        })
    } else {
        geocode(req.query.address, (error,{long, lat,location} = {})=>{
            if (error) {
                return res.send({error})
            }
            forecast(long, lat,(error,data) => {
                res.send({
                    forecast: data.forecast,
                    temp: data.temperature,
                    location: req.query.address
                })
            })
        })

        
    }
    
})

app.get('/products', (req,res) =>{
    if (!req.query.search) {
        return res.send({
            error: 'u must provide search term'
        })
    } else {res.send({
        products: []
    })}
    
})


app.get('/help/*', (req,res)=>{
    res.render('404',{
        title: '404',
        errorMessage: 'help not found'
    })
})

app.get('*', (req,res)=>{
    res.render('404', {
        title: 404,
        name: 'trang',
        errorMessage: 'page not found'
    })
})

//start server tren 1 port nao do. port thuong dung cho http la 80
app.listen(3000, ()=>{
    console.log('server has start on port 3000')
})