const axios = require('axios');
jest.mock('axios');

const geocode = require('../services/geocode');
const geocodeData = require('./fixtures/geocode.json');

describe('geocode', () => {
    beforeAll(() => {
        axios.get.mockImplementationOnce(() => Promise.resolve({ data: geocodeData }));
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
    });
});