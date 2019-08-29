const request = require('request');

const forecast = (lat, lng, callback) => {
    const url = `https://api.darksky.net/forecast/329a6cebd00eebb1d8a45e976d8d75a2/${lat},${lng}?units=si`;
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service.', undefined);
        } else if (body.error) {
            callback(`Unable to find location. ${body.error}.`, undefined);
        } else {
            const {temperature, precipProbability} = body.currently;
            const daily = body.daily;
            callback(undefined, `${daily.data[0].summary} It is currently ${temperature} degress out. There is a ${precipProbability}% chance of rain.`);
        }
    });
};

module.exports = forecast;