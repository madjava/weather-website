const helmet = require('helmet')
const path = require('path');
const express = require('express');
const hbs = require('hbs');
const csrfProtection = require('@authentication/csrf-protection');

// Using express validator for check and sanitize user inputs
const { validationResult } = require('express-validator');
const app = express();
const { validateAddress } = require('./utils/validation');
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

// Guard against CSRF
app.use(csrfProtection());

// Setup static direcctory to serve
app.use(express.static(publicFolder));

// Harden server using helmet
app.use(helmet());

app.get('/', (req, res) => {
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

// Validate user input using custom validation middleware
app.get('/weather', validateAddress, (req, res) => {
    const address = req.query.address;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.send({ errors: errors.array() })
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

/**   
 * Demonstating error handling for all routes and all sub routes
 */
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

module.exports = app;