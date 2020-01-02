const request = require('supertest');
const app = require('../src/app');

describe('app', () => {
    test('GET: / should reach index route', () => {
        return request(app)
            .get('/')
            .expect('Content-Type', 'text/html; charset=utf-8')
            .expect(200);
    });

    test('GET: /others should return a valid response', () => {
        return request(app)
            .get('/')
            .expect('Content-Type', 'text/html; charset=utf-8')
            .expect(200);
    });

    test.skip('GET: /weather should return a valid response', () => {
        return request(app)
            .get('/weather')
            .query({ address: ' address' })
            .expect('Content-Type', /json/)
            .expect(200);
    });
});