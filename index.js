const villains = require('./villains')
const express = require('express')
const bodyParser = require('body-parser')
const { getAllVillains } = require('./controllers/villains')

const app = express()
const PORT = 1337

app.get('/villains', getAllVillains)

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`) // eslint-disable-line no-console
})
