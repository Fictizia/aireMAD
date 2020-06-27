const request = require('supertest')
const app = require('../services/server')
const { populateDb, resetDB } = require('./helpers')
const store = require('../services/store')
const fixtures = require('./fixtures')

beforeAll(() => {
  resetDB()
  populateDb()
})

afterAll(() => {
  resetDB()
})

const stationId = 'P001'

describe('GET /api/v1/pollution/{stationId} endpoint', () => {
  test(`Should respond with pollution for specific station: ${stationId}`, () => request(app)
    .get(`/api/v1/pollution/${fixtures.pollution.validId}`)
    .expect(200)
    .expect('Content-Type', /json/)
    .then(({ body }) => {
      const storedData = store.pollution.fetchById(fixtures.pollution.validId)
      expect(body).toStrictEqual(storedData)
    }))

  test('Should respond with a 404 when the station doesn\'t exist (INVENTED)', () => request(app)
    .get('/api/v1/pollution/INVENTED')
    .expect(404)
    .expect('Content-Type', /json/)
    .then(({ body }) => {
      const storedData = store.pollution.fetchById('INVENTED')
      expect(storedData).toBe(undefined)
      expect(body).toStrictEqual({ message: 'Station not found', code: 404 })
    }))
})

describe('GET /api/v1/pollution/ endpoint', () => {
  test('Should respond with pollution data', () => request(app)
    .get('/api/v1/pollution')
    .expect(200)
    .expect('Content-Type', /json/)
    .then(({ body }) => {
      const storedData = store.pollution.fetchAll()
      expect(body).toStrictEqual(storedData)
    }))
})

describe('GET /api/v1/station/{stationId} endpoint', () => {
  test(`Should respond with station for specific station: ${fixtures.station.validId}`, () => request(app)
    .get(`/api/v1/station/${fixtures.station.validId}`)
    .expect(200)
    .expect('Content-Type', /json/)
    .then(({ body }) => {
      const storedData = store.station.fetchById(fixtures.station.validId)
      expect(body).toStrictEqual(storedData)
    }))

  test('Should respond with a 404 when the station doesn\'t exist (INVENTED)', () => request(app)
    .get('/api/v1/station/INVENTED')
    .expect(404)
    .expect('Content-Type', /json/)
    .then(({ body }) => {
      const storedData = store.station.fetchById('INVENTED')
      expect(storedData).toBe(undefined)
      expect(body).toStrictEqual({ message: 'Station not found', code: 404 })
    }))
})

describe('GET /api/v1/station/ endpoint', () => {
  test('Should respond with station data', () => request(app)
    .get('/api/v1/station')
    .expect(200)
    .expect('Content-Type', /json/)
    .then(({ body }) => {
      const storedData = store.station.fetchAll()
      expect(body).toStrictEqual(storedData)
    }))
})

describe('GET /api/v1/acustic/{stationId} endpoint', () => {
  test(`Should respond with acustic for specific station: ${fixtures.acustic.validId}`, () => request(app)
    .get(`/api/v1/acustic/${fixtures.acustic.validId}`)
    .expect(200)
    .expect('Content-Type', /json/)
    .then(({ body }) => {
      const storedData = store.acustic.fetchById(fixtures.acustic.validId)
      expect(body).toStrictEqual(storedData)
    }))

  test('Should respond with a 404 when the station doesn\'t exist (INVENTED)', () => request(app)
    .get('/api/v1/acustic/INVENTED')
    .expect(404)
    .expect('Content-Type', /json/)
    .then(({ body }) => {
      const storedData = store.acustic.fetchById('INVENTED')
      expect(storedData).toBe(undefined)
      expect(body).toStrictEqual({ message: 'Station not found', code: 404 })
    }))
})

describe('GET /api/v1/acustic/ endpoint', () => {
  test('Should respond with acustic data', () => request(app)
    .get('/api/v1/acustic')
    .expect(200)
    .expect('Content-Type', /json/)
    .then(({ body }) => {
      const storedData = store.acustic.fetchAll()
      expect(body).toStrictEqual(storedData)
    }))
})

describe('GET /api/v1/pollen/{stationId} endpoint', () => {
  test(`Should respond with pollen for specific station: ${fixtures.pollen.validId}`, () => request(app)
    .get(`/api/v1/pollen/${fixtures.pollen.validId}`)
    .expect(200)
    .expect('Content-Type', /json/)
    .then(({ body }) => {
      const storedData = store.pollen.fetchById(fixtures.pollen.validId)
      expect(body).toStrictEqual(storedData)
    }))

  test('Should respond with a 404 when the station doesn\'t exist (INVENTED)', () => request(app)
    .get('/api/v1/pollen/INVENTED')
    .expect(404)
    .expect('Content-Type', /json/)
    .then(({ body }) => {
      const storedData = store.pollen.fetchById('INVENTED')
      expect(storedData).toBe(undefined)
      expect(body).toStrictEqual({ message: 'Station not found', code: 404 })
    }))
})

describe('GET /api/v1/pollen/ endpoint', () => {
  test('Should respond with pollen data', () => request(app)
    .get('/api/v1/pollen')
    .expect(200)
    .expect('Content-Type', /json/)
    .then(({ body }) => {
      const storedData = store.pollen.fetchAll()
      expect(body).toStrictEqual(storedData)
    }))
})

describe('GET /api/v1/weather/{stationId} endpoint', () => {
  test(`Should respond with weather for specific station: ${fixtures.weather.validId}`, () => request(app)
    .get(`/api/v1/weather/${fixtures.weather.validId}`)
    .expect(200)
    .expect('Content-Type', /json/)
    .then(({ body }) => {
      const storedData = store.weather.fetchById(fixtures.weather.validId)
      expect(body).toStrictEqual(storedData)
    }))

  test('Should respond with a 404 when the station doesn\'t exist (INVENTED)', () => request(app)
    .get('/api/v1/weather/INVENTED')
    .expect(404)
    .expect('Content-Type', /json/)
    .then(({ body }) => {
      const storedData = store.weather.fetchById('INVENTED')
      expect(storedData).toBe(undefined)
      expect(body).toStrictEqual({ message: 'Station not found', code: 404 })
    }))
})

describe('GET /api/v1/weather/ endpoint', () => {
  test('Should respond with weather data', () => request(app)
    .get('/api/v1/weather')
    .expect(200)
    .expect('Content-Type', /json/)
    .then(({ body }) => {
      const storedData = store.weather.fetchAll()
      expect(body).toStrictEqual(storedData)
    }))
})

describe('GET /api/v1/flu/ endpoint', () => {
  test('Should respond with flu data', () => request(app)
    .get('/api/v1/flu')
    .expect(200)
    .expect('Content-Type', /json/)
    .then(({ body }) => {
      const storedData = store.flu.fetchDetails()
      expect(body).toStrictEqual(storedData)
    }))
})

describe('GET /api/v1/INVENTED/ endpoint', () => {
  test('Should respond with 404 if the entity is not real', () => request(app)
    .get('/api/v1/INVENTED')
    .expect(404)
    .expect('Content-Type', /json/)
    .then(({ body }) => {
      expect(body).toStrictEqual({ message: 'Entity not found', code: 404 })
    }))
})
