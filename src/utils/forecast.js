const request = require('request');
const DARKSKY_TOKEN = process.env.DARKSKY_TOKEN;

const forecast = (lat, lng, callback) => {
    const url = `https://api.darksky.net/forecast/${DARKSKY_TOKEN}/${lat},${lng}?units=si`;
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service.', undefined);
        } else if (body.error) {
            callback(`Unable to find location. ${body.error}.`, undefined);
        } else {
            const { temperature, precipProbability } = body.currently;
            const today = body.daily.data[0];
            callback(undefined, `${today.summary} It is currently ${temperature} degress out. There is a ${precipProbability}% chance of rain. High Temperature is ${today.temperatureHigh} and a low of ${today.temperatureLow}`);
        }
    });
};

module.exports = forecast;