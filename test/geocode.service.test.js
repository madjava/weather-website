const axios = require('axios');
jest.mock('axios');

const geocode = require('../services/geocode.service');
const geocodeData = require('./fixtures/geocode.json');
const geocodeErrorData = require('./fixtures/geocode-error.json');
const LocationError = require('../errors/location.error');

describe('geocode', () => {
    beforeAll(() => {
        axios
            .get
            .mockImplementationOnce(() => Promise.resolve({ data: geocodeData }))
            .mockImplementationOnce(() => Promise.resolve({ data: geocodeErrorData }))
            .mockImplementationOnce(() => {
                const geocodeDataNoData = geocodeData.features = [];
                return Promise.resolve({ data: geocodeDataNoData })
            });
    });

    afterAll(() => {
        axios.get.mockReset();
    });

    test('should return a valid geocode response', async () => {
        const address = 'any';
        const response = await geocode(address);

        expect(response).toHaveProperty('latitude');
        expect(response).toHaveProperty('longitude');
        expect(response).toHaveProperty('location');

        expect(axios.get).toHaveBeenCalledTimes(1);
    });

    test('should properly handle errors where API response with error', async () => {
        const address = 'any';
        try {
            await geocode(address);
        } catch (error) {
            expect(error instanceof LocationError).toBe(true);
            expect(axios.get).toHaveBeenCalledTimes(2);
        }
    });

    test('should properly handle no return data', async () => {
        const address = 'any';
        const response = await geocode(address);

        expect(response).toBeNull();
        expect(axios.get).toHaveBeenCalledTimes(3);
    });

});