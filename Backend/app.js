const express = require('express')
const notesRoute = require('./routes/notesRoute')
var cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors())
app.use('/api/v1/notes', notesRoute)

module.exports = app
