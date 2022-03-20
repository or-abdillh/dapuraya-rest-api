'use strict'

//Modules
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const connection = require('./connection.js')
const router = require('./router')

//Middlewares
const logger = require('./middleware/logger.js')
const authentication = require('./middleware/authentication.js')

//Setup 
const PORT = process.env.PORT || 8000
const app = express()

app.use( bodyParser.urlencoded({ extended: true }) )
app.use( bodyParser.json() )
app.use( cors() )
app.use(logger)

//Use authentication just for /admin router path
app.use('/admin', authentication)

router(app)

//Run the server
app.listen(PORT, err => {
	if (err) throw err
	console.log(`Server running at PORT ${PORT}`)
	console.log(`Running from ${new Date().toLocaleString('id')}`)
})
