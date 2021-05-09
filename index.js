const villains = require('./villains')
const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const PORT = 1337

app.get('/villains', (req, res) => {
  res.send('test')
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`) // eslint-disable-line no-console
})
