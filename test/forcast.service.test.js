const axios = require('axios');
jest.mock('axios');

const forecastData = require('./fixtures/forecast.json');
const forecastError = require('./fixtures/forecast-error.json');
const forecast = require('../services/forecast');
const LocationError = require('../errors/location.error');

describe('forecast', () => {
    const lat = 51.50722;
    const lng = -0.1275;

    beforeEach(() => {
        axios
            .get
            .mockImplementationOnce(() => Promise.resolve({ data: forecastData }))
            .mockImplementationOnce(() => Promise.resolve({ data: forecastError }))
    });

    afterAll(() => {
        axios.get.mockReset();
    });

    test('should return the forcast for a given location', async () => {

        const response = await forecast(lat, lng);

        expect(response).toHaveProperty('icon');
        expect(response).toHaveProperty('summary');
    });

    test('should properly handle errors where API response with error', async () => {
        try {
            await forecast(lat, lng);
        } catch (error) {
            expect(error instanceof LocationError).toBe(true);
        } 
    });
});