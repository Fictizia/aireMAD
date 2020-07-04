const { pollution: pollutionDownloader } = require('./downloaders')
const { pollution: pollutionParser } = require('./transformators')
const { pollution: pollutionStore } = require('../services/store')
const { pollution: pollutionValidator } = require('./validators')

const pollution = async () => {
  const rawData = await pollutionDownloader()
  const structuredData = await pollutionValidator(rawData)
  const stationValues = await pollutionParser(structuredData)
  stationValues.forEach(pollutionStore.save)
}

module.exports = {
  pollution
}
