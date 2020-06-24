const request = require('supertest');
const app = require('../index')


/*
- GET /api/v1/flu

- GET /api/v1/weather/{stationId}
- GET /api/v1/weather

- GET /api/v1/pollen/{stationId}
- GET /api/v1/pollen/

- GET /api/v1/station/{stationId}
- GET /api/v1/station/

- GET /api/v1/acustic/{stationId}
- GET /api/v1/acustic/

- GET /api/v1/pollution/{stationId}
- GET /api/v1/pollution/

*/

const stationId = 'P001';

describe('GET /api/v1/pollution/{stationId} endpoint', () => {
    test(`Should respond with pollution for specific station: ${stationId}`, () => request(app)
    .get(`/api/v1/pollution/${stationId}`)
    .expect(200)
    .expect('Content-Type', /json/)
    .then(({body}) => {
      //@TODO: Validate Conten
    }))
  })

describe('GET /api/v1/pollution/ endpoint', () => {
    test('Should respond with pollution data', () => request(app)
    .get('/api/v1/pollution')
    .expect(200)
    .expect('Content-Type', /json/)
    .then(({body}) => {
      //@TODO: Validate Conten
    }))
  })

  describe('GET /api/v1/station/{stationId} endpoint', () => {
    test(`Should respond with station for specific station: ${stationId}`, () => request(app)
    .get(`/api/v1/station/${stationId}`)
    .expect(200)
    .expect('Content-Type', /json/)
    .then(({body}) => {
      //@TODO: Validate Conten
    }))
  })

describe('GET /api/v1/station/ endpoint', () => {
    test('Should respond with station data', () => request(app)
    .get('/api/v1/station')
    .expect(200)
    .expect('Content-Type', /json/)
    .then(({body}) => {
      //@TODO: Validate Conten
    }))
  })

  describe('GET /api/v1/acustic/{stationId} endpoint', () => {
    test(`Should respond with acustic for specific station: ${stationId}`, () => request(app)
    .get(`/api/v1/acustic/${stationId}`)
    .expect(200)
    .expect('Content-Type', /json/)
    .then(({body}) => {
      //@TODO: Validate Conten
    }))
  })

describe('GET /api/v1/acustic/ endpoint', () => {
    test('Should respond with acustic data', () => request(app)
    .get('/api/v1/acustic')
    .expect(200)
    .expect('Content-Type', /json/)
    .then(({body}) => {
      //@TODO: Validate Conten
    }))
  })


  describe('GET /api/v1/pollen/{stationId} endpoint', () => {
    test(`Should respond with pollen for specific station: ${stationId}`, () => request(app)
    .get(`/api/v1/pollen/${stationId}`)
    .expect(200)
    .expect('Content-Type', /json/)
    .then(({body}) => {
      //@TODO: Validate Conten
    }))
  })

describe('GET /api/v1/pollen/ endpoint', () => {
    test('Should respond with pollen data', () => request(app)
    .get('/api/v1/pollen')
    .expect(200)
    .expect('Content-Type', /json/)
    .then(({body}) => {
      //@TODO: Validate Conten
    }))
  })


  describe('GET /api/v1/weather/{stationId} endpoint', () => {
    test(`Should respond with weather for specific station: ${stationId}`, () => request(app)
    .get(`/api/v1/weather/${stationId}`)
    .expect(200)
    .expect('Content-Type', /json/)
    .then(({body}) => {
      //@TODO: Validate Conten
    }))
  })

describe('GET /api/v1/weather/ endpoint', () => {
    test('Should respond with weather data', () => request(app)
    .get('/api/v1/weather')
    .expect(200)
    .expect('Content-Type', /json/)
    .then(({body}) => {
      //@TODO: Validate Conten
    }))
  })

  describe('GET /api/v1/flu/ endpoint', () => {
    test('Should respond with flu data', () => request(app)
    .get('/api/v1/flu')
    .expect(200)
    .expect('Content-Type', /json/)
    .then(({body}) => {
      //@TODO: Validate Conten
    }))
  })


  describe('GET /api/v1/error/ endpoint', () => {
    test('Should respond with 404 if the entity is not real', () => request(app)
    .get('/api/v1/error')
    .expect(404)
    .expect('Content-Type', /json/)
    .then(({body}) => {
      //@TODO: Validate Conten
    }))
  })

/*


describe('GET / endpoint', () => {
  test('Should respond with a Hello world', () => request(app)
  .get('/')
  .expect('Content-Type', /json/)
  .expect(200)
  .then(({body}) => {
    expect(body.message).toBe('Hello World!')
  }))
})
*/
