const forecast = require('../services/forecast.service');
const geocode = require('../services/geocode.service');
const weatherdata = require('./fixtures/weather.json');
const weather = require('../services/weather.service');

jest.mock('../services/forecast.service');
jest.mock('../services/geocode.service');

describe('fetch', () => {
    const payload = {
        "icon": "partly-cloudy-day",
        "summary": "Possible light rain overnight. It is currently 8.44 degress out. There is a 0% chance of rain. High Temperature is 10.47 and a low of 9.08"
    };
    beforeEach(() => {
        forecast.mockImplementation(() => {
            return Promise.resolve(payload);
        });
        geocode.mockImplementation(() => {
            return Promise.resolve({ latitude: 5, longitude: 4, location: 'location' });
        });
    });

    test('should fetch current weather data for location', async () => {
        const address = 'any';
        const response = await weather(address);

        expect(response).toHaveProperty('forecast');
        expect(response).toHaveProperty('location');
        expect(response).toHaveProperty('address');

        expect(geocode).toHaveBeenCalledTimes(1);
        expect(forecast).toHaveBeenCalledTimes(1);
    });
});