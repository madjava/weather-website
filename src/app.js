const helmet = require('helmet')
const path = require('path');
const express = require('express');
const csrfProtection = require('@authentication/csrf-protection');

// Using express validator for check and sanitize user inputs
const { validationResult } = require('express-validator');
const app = express();
const { validateAddress } = require('./utils/validation');
const weather = require('../services/weather.service');
const middleware = require('../middlewares/middleware');
const ErrorMiddleWare = require('../middlewares/error.middleware');

// Define paths for Express config
const publicFolder = path.join(__dirname, '../public');
const htmlHeader = middleware.htmlHeaderMiddleWare;

// Setup handlebars engine and views location
app.set('view engine', 'ejs');

// Guard against CSRF
app.use(csrfProtection());

// Setup static direcctory to serve
app.use(express.static(publicFolder));

// Harden server using helmet
app.use(helmet());

app.get('/', htmlHeader, (req, res) => {
    res.render('pages/index', {
        title: 'Weather App',
        name: 'Felix Eyetan'
    });
});

app.get('/about', htmlHeader, (req, res) => {
    res.render('pages/about', {
        title: 'Weather App',
        name: 'Felix Eyetan'
    });
});


app.get('/others', htmlHeader, (req, res) => {
    res.render('pages/others', {
        title: 'Live Demos',
        message: 'Some other live demos',
        name: 'Felix Eyetan'
    })
});

// Validate user input using custom validation middleware
app.get('/weather', validateAddress, async (req, res, next) => {
    const address = req.query.address;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.send({ errors: errors.array() })
    }
    try {
        const response = await weather(address);
        return res.json(response);
    } catch (error) {
        next(error);
    }

});

/**   
 * Demonstating error handling for all routes and all sub routes
 */
app.get('/help/*', middleware.htmlHeaderMiddleWare, (req, res) => {
    res.render('404', {
        title: '404 - Help Page',
        errorMessage: 'Help article not found',
        name: ' Felix Eyetan'
    });
});

// Custom 404 page rendering
app.use((req, res) => {
    res.render('pages/404', {
        title: '404 - Page',
        errorMessage: 'Sorry! Page Not Found.'
    });
});

// Handles various errors, leaving the app module less cluterred
ErrorMiddleWare(app);


module.exports = app;