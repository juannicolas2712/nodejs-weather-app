const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

console.log(__dirname)
console.log(path.join(__dirname, '../public'))

const app = express()

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Juan Varela'
    })
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'About me',
        name: 'Juan Varela'
    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
        message: 'Fuck the police!',
        title: 'Help',
        name: 'Juan Varela'
    })
})

app.get('/weather', (req, res)=>{

    if(!req.query.address){
        return res.send({
            error: 'hey man... gimme an address or something'
        })
    }
    
    geocode(req.query.address, (error, data) => {

        if(error){
            return res.send({
                error: error
            })
        }

        let data_geocode = data
        forecast(data_geocode.latitude, data_geocode.longitude, (error, data) => {
            if(error){
                return res.send({
                    error: error
                })
            }

            let forecast_data = data

            res.send({
                forecast: forecast_data,
                location: data_geocode.location,
                address: req.query.address
            })
        })
    })
    
    /*res.send({
        forecast: forecast_data,
        location: data_geocode.location,
        address: req.query.address
    })*/
})

app.get('/products', (req, res)=>{
    if(!req.query.search){
        return res.send({
            error: 'hey man give us some search thingy...'
        })
    }
    
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res)=>{
    res.render('404', {
        title: '404',
        name: 'Juan Varela',
        message: 'Help article not found'
    })
})

app.get('*', (req, res)=>{
    res.render('404', {
        title: '404',
        name: 'Juan Varela',
        message: 'Page not found'
    })
})

app.listen(3000, ()=>{
    console.log('Server is up on port 3000.')
}) //3000 is a common development port

