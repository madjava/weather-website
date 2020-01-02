const axios = require('axios');
const DARKSKY_TOKEN = process.env.DARKSKY_TOKEN;
const LocationError = require('../errors/location.error');

const forecast = async ({ latitude, longitude }) => {
    if (!latitude || !longitude) {
        throw new LocationError('Unable to find location. Incomplete coordinates provided.');
    }
    
    const url = `https://api.darksky.net/forecast/${DARKSKY_TOKEN}/${latitude},${longitude}?units=si`;

    const { data } = await axios.get(url);
    if (data.error) {
        throw new LocationError(`Unable to find location. ${data.error}.`);
    }

    const { temperature, precipProbability, icon } = data.currently;
    const today = data.daily.data[0];
    const payload = {
        icon,
        summary: summary(today.summary, temperature, precipProbability, today.temperatureHigh, today.temperatureLow)
    }
    return payload;
};

function summary(summary, temperature, precipProbability, temperatureHigh, temperatureLow) {
    return `${summary} It is currently ${temperature} degress out. There is a ${precipProbability}% chance of rain. High Temperature is ${temperatureHigh} and a low of ${temperatureLow}`
}

module.exports = forecast;