'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const connection = require('./connection.js')
const router = require('./router')

const logger = require('./middleware/logger.js')

const PORT = process.env.PORT || 8000

const app = express()

app.use( bodyParser.urlencoded({ extended: true }) )
app.use( bodyParser.json() )
app.use( cors() )

router(app)

app.use(logger)

app.listen(PORT, err => {
	if (err) throw err
	console.log(`Server running at PORT ${PORT}`)
	console.log(`Running from ${new Date().toLocaleString('id')}`)
})
