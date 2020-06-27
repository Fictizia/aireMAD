const store = require('../services/store')
const { station, pollution, acustic, pollen, weather, flu } = require('./fixtures')

beforeEach(() => {
  store.reset()
})

afterEach(() => {
  store.reset()
})

describe('Store Service', () => {
  test('Should handle Station data', () => {
    const { stationDetail, validId } = station
    expect(store.station.fetchAll()).toStrictEqual([])
    store.station.save(stationDetail)
    expect(store.station.fetchAll()).toStrictEqual([stationDetail])
    expect(store.station.fetchById(validId)).toStrictEqual(stationDetail)
  })

  test('Should handle Pollution data', () => {
    const { stationDetail, validId } = pollution
    expect(store.pollution.fetchAll()).toStrictEqual([])
    store.pollution.save(stationDetail)
    expect(store.pollution.fetchAll()).toStrictEqual([stationDetail])
    expect(store.pollution.fetchById(validId)).toStrictEqual(stationDetail)
  })

  test('Should handle Acustic data', () => {
    const { stationDetail, validId } = acustic
    expect(store.acustic.fetchAll()).toStrictEqual([])
    store.acustic.save(stationDetail)
    expect(store.acustic.fetchAll()).toStrictEqual([stationDetail])
    expect(store.acustic.fetchById(validId)).toStrictEqual(stationDetail)
  })

  test('Should handle Pollen data', () => {
    const { stationDetail, validId } = pollen
    expect(store.pollen.fetchAll()).toStrictEqual([])
    store.pollen.save(stationDetail)
    expect(store.pollen.fetchAll()).toStrictEqual([stationDetail])
    expect(store.pollen.fetchById(validId)).toStrictEqual(stationDetail)
  })

  test('Should handle Weather data', () => {
    const { stationDetail, validId } = weather
    expect(store.weather.fetchAll()).toStrictEqual([])
    store.weather.save(stationDetail)
    expect(store.weather.fetchAll()).toStrictEqual([stationDetail])
    expect(store.weather.fetchById(validId)).toStrictEqual(stationDetail)
  })

  test('Should handle Flu data', () => {
    const { detail } = flu
    expect(store.flu.fetchDetails()).toStrictEqual({})
    store.flu.save(detail)
    expect(store.flu.fetchDetails()).toStrictEqual(detail)
  })
})
