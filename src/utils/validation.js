// Using express validator for check and sanitize user inputs
const { query, sanitizeQuery } = require('express-validator');

const validateAddress = [
    query('address')
        .trim()
        .isLength({ min: 2 })
        .withMessage('Address must be longer than two characters.')
        .isString()
        .withMessage('Address is invalid'),
    sanitizeQuery('address').escape()
];


// These would be used as middlewares in app routes.
module.exports = {
    validateAddress
}