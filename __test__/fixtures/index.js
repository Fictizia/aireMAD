const stations = require('./samples/station.json')
const pollution = require('./samples/pollution.json')
const acustic = require('./samples/acustic.json')
const pollen = require('./samples/pollen.json')
const weather = require('./samples/weather.json')
const flu = require('./samples/flu.json')

module.exports = {
  station: {
    allStations: stations,
    stationDetail: stations[0],
    validId: stations[0].id
  },
  pollution: {
    allStations: pollution,
    stationDetail: pollution[0],
    validId: pollution[0].id
  },
  acustic: {
    allStations: acustic,
    stationDetail: acustic[0],
    validId: acustic[0].id
  },
  pollen: {
    allStations: pollen,
    stationDetail: pollen[0],
    validId: pollen[0].id
  },
  weather: {
    allStations: weather,
    stationDetail: weather[0],
    validId: weather[0].id
  },
  flu: {
    detail: flu
  }
}
