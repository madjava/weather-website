const axios = require('axios');
const MAP_BOX_TOKEN = process.env.MAP_BOX_TOKEN;
const _ = require('lodash');
const LocationError = require('../errors/location.error');

const geocode = async (address) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${MAP_BOX_TOKEN}&limit=1`;
    const { data } = await axios.get(url);

    if (data.message) {
        throw new LocationError(`Unable to find coordinate. ${data.message}`)
    }
    if (data.features || _.size(data.features) > 0) {
        const { center, place_name: location } = data.features[0];
        const [longitude, latitude] = center;
        return { latitude, longitude, location };
    } else {
        return null;
    }
};

module.exports = geocode;