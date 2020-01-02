const geocodeService = require('./geocode.service');
const forecastService = require('./forecast.service');

 const weather = async (address) => {
    const geocode = await geocodeService(address);
    const forecast = await forecastService(geocode);
    return { forecast, location: geocode.location, address }; 
}

module.exports = weather;