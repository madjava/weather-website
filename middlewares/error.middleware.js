const LocationError = require('../errors/location.error');

function errorLogger(err, req, res, next) {
    if (err.message) {
        console.log('Logger: ', err.message);
    }
    if (err.stack) {
        console.log(err.stack);
    }
    next();
}

function locationError(err, req, res, next) {
    if (err instanceof LocationError) {
        res.status(404).send(err.message);
    }
    next();
}

function genericErrors(err, req, res, next) {
    res.sendStatus(500);
}

module.exports = function ErrorMiddleWare(app) {
    app.use([
        errorLogger,
        locationError,
        genericErrors
    ]);
}