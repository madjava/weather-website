const path = require('path');
const express = require('express');
const hbs = require('hbs');
const app = express();
const port = process.env.PORT || 3000;
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

// Define paths for Express config
const publicFolder = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static direcctory to serve
app.use(express.static(publicFolder));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Felix Eyetan'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Weather App',
        name: 'Felix Eyetan'
    });
});

app.get('/others', (req, res) => {
    res.render('others', {
        title: 'More Live Demos',
        message: 'Some other live demos',
        name: 'Felix Eyetan'
    })
});

app.get('/weather', (req, res) => {
    const address = req.query.address;
    if (!address) {
        return res.send({ error: 'Address must be provided' })
    }
    geocode(address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error });
        }
        forecast(latitude, longitude, (error, forecast) => {
            if (error) {
                return res.send({ error });
            }
            res.send({forecast, location, address});
        });
    }); 
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term.'
        });
    }
    res.send({
        products: []
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 - Help Page',
        errorMessage: 'Help article not found',
        name: ' Felix Eyetan'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 - Page',
        errorMessage: 'Page not found',
        name: ' Felix Eyetan'
    });
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}.`);
});