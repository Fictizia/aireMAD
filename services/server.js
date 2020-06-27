const express = require('express')
const app = express()
const store = require('./store')

app.get('/api/v1/flu', (req, res) => {
  res.json(store.flu.fetchDetails())
})

app.get('/api/v1/:entity', (req, res) => {
  const { entity } = req.params
  if (!['pollution', 'acustic', 'station', 'pollen', 'weather'].includes(entity)) {
    return res.status(404).json({
      code: 404,
      message: 'Entity not found'
    })
  }

  res.json(store[entity].fetchAll())
})
app.get('/api/v1/:entity/:stationId', (req, res) => {
  const { stationId, entity } = req.params
  const data = store[entity].fetchById(stationId)

  if (data) return res.json(data)

  res.status(404).json({
    code: 404,
    message: 'Station not found'
  })
})

module.exports = app
