const { getStationDetails, getParameterDetails, getTechniqueDetails, getPeriodDetails, getDateDetails, getMesuramentStatus } = require('./commons')
const { chunk } = require('../../helpers')

const pollution = rows => {
  const stations = {}

  rows.forEach(([, , stationCode, parameterCode, techniqueCode, periodCode, year, month, day, ...valueCodes]) => {
    const { id, name } = getStationDetails(stationCode)
    const { parameter, abrebiation } = getParameterDetails(parameterCode)
    const technique = getTechniqueDetails(techniqueCode)
    const period = getPeriodDetails(periodCode)
    const date = getDateDetails(year, month, day)

    if (!stations[id]) stations[id] = {}
    stations[id].id = id
    stations[id].name = name

    if (!stations[id].parameters) stations[id].parameters = {}
    stations[id].parameters[abrebiation] = {
      parameter,
      abrebiation,
      technique,
      date,
      period,
      values: chunk(valueCodes, 2).map(([rawValue, status], index) => ({
        status: getMesuramentStatus(status),
        value: parseInt(rawValue),
        date: getDateDetails(year, month, day, index)
      }))

    }
  })
  return Object.values(stations)
}

module.exports = {
  pollution
}
