const axios = require('axios');
jest.mock('axios');

const forecastData = require('./fixtures/forecast.json');
const forecastError = require('./fixtures/forecast-error.json');
const forecast = require('../services/forecast.service');
const LocationError = require('../errors/location.error');

describe('forecast', () => {
    let latitude = 51.50722;
    let longitude = -0.1275;

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

        const response = await forecast({latitude, longitude});
 
        expect(response).toHaveProperty('icon');
        expect(response).toHaveProperty('summary');

        expect(axios.get).toHaveBeenCalledTimes(1);
    });

    test('should properly handle errors where API response with error', async () => {
        try {
            await forecast({latitude, longitude});
        } catch (error) {
            expect(error instanceof LocationError).toBe(true);
            expect(axios.get).toHaveBeenCalledTimes(2);
        }
    });

    test('should throw error if parameters are invalid', async () => {
        axios.get.mockReset();
        try {
            await forecast({latitude: null, longitude});
        } catch (error) {
            expect(error instanceof LocationError).toBe(true);
            expect(axios.get).toHaveBeenCalledTimes(0);
        }
    });
});