require('dotenv').config()

const express = require('express')
const app = express()

const port = process.env.PORT

app.get('/', (req, res) => {
  res.json({message: 'Hello World!'})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
})

module.exports = app
