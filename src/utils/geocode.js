const request = require('request');

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoibWFkamF2YSIsImEiOiJjajFtMDdzMjIwMDB2MnFwZjN6c2lsb21wIn0.T85R6XMTQPLwOA_LcMLRyQ&limit=1`;
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to Geolocation service', undefined);
        } else if (body.error) {
            callback(`Unable to find coordinate. ${body.error}.`, undefined);
        } else {
            if (body.features.length > 0) {
                const {center, place_name:location} = body.features[0];
                const [longitude, latitude] = center;
                callback(undefined, { latitude, longitude, location });
            } else {
                callback('No data returned.', undefined);
            }
        }
    });
};

module.exports = geocode;