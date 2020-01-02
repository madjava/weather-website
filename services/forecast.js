const axios = require('axios');
const DARKSKY_TOKEN = process.env.DARKSKY_TOKEN;
const LocationError = require('../errors/location.error');

const forecast = async (lat, lng) => {
    const url = `https://api.darksky.net/forecast/${DARKSKY_TOKEN}/${lat},${lng}?units=si`;
    
    const { data } = await axios.get(url);
    if (data.error) {
        throw new LocationError(`Unable to find location. ${data.error}.`);
    }

    const { temperature, precipProbability, icon } = data.currently;
    const today = data.daily.data[0];
    const payload = {
        icon,
        summary: `${today.summary} It is currently ${temperature} degress out. There is a ${precipProbability}% chance of rain. High Temperature is ${today.temperatureHigh} and a low of ${today.temperatureLow}`
    }
    return payload;
};

module.exports = forecast;