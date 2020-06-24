require('dotenv').config()

const express = require('express')
const app = express()

const port = process.env.PORT
/*
app.get('/api/v1/pollen', (req, res) => res.json({}))
app.get('/api/v1/pollen/:stationId', (req, res) => {
    const {stationId} = req.params
    res.json({id: stationId}) 
})

app.get('/api/v1/weather', (req, res) => res.json({}))
app.get('/api/v1/weather/:stationId', (req, res) => {
    const {stationId} = req.params
    res.json({id: stationId}) 
})

app.get('/api/v1/station', (req, res) => res.json({}))
app.get('/api/v1/station/:stationId', (req, res) => {
    const {stationId} = req.params
    res.json({id: stationId}) 
})


app.get('/api/v1/acustic', (req, res) => res.json({}))
app.get('/api/v1/acustic/:stationId', (req, res) => {
    const {stationId} = req.params
    res.json({id: stationId}) 
})

app.get('/api/v1/pollution', (req, res) => res.json({}))
app.get('/api/v1/pollution/:stationId', (req, res) => {
    const {stationId} = req.params
    res.json({id: stationId}) 
})

app.get('/api/v1/flu', (req, res) => res.json({}))
*/

app.get('/api/v1/:entity', (req, res) => {
    const {entity} = req.params
    if(!["pollution", "acustic", "station", "pollen", "weather", "flu"].includes(entity)) return res.status(404).json({msg: "not found"})
    res.json({entity: entity}) 
})
app.get('/api/v1/:entity/:stationId', (req, res) => {
    const {stationId} = req.params
    res.json({id: stationId}) 
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
})

module.exports = app
