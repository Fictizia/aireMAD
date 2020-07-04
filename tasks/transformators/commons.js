
const stationNames = require('../../dictionaries/estations_codes.json')
const parametersDetails = require('../../dictionaries/parameters_codes.json')
const techniqueDetails = require('../../dictionaries/techniques_codes.json')
const periodDetails = require('../../dictionaries/period_codes.json')
const mesuramentStatusDetail = require('../../dictionaries/mesuraments_status_codes.json')

const getTechniqueDetails = (code) => techniqueDetails[code] || 'unknown'
const getParameterDetails = (code) => parametersDetails[code] || {}
const getPeriodDetails = (code) => periodDetails[code] || 'unknown'
const getDateDetails = (year, month, day, hour = 0) => new Date(Date.UTC(parseInt(year), parseInt(month) - 1, parseInt(day), parseInt(hour), 0, 0, 0)).toISOString()
const getMesuramentStatus = (code) => mesuramentStatusDetail[code] || 'unknown'

const getStationDetails = (code) => {
  return {
    name: stationNames[code] || 'unknown',
    id: parseInt(code)
  }
}

module.exports = {
  getStationDetails,
  getParameterDetails,
  getTechniqueDetails,
  getPeriodDetails,
  getDateDetails,
  getMesuramentStatus
}
