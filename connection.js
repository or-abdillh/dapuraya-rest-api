'use strict'

const mysql = require('mysql')
const dotenv = require('dotenv')

dotenv.config()

const conn = mysql.createConnection({
	host: process.env.DB_HOSTNAME,
	user: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME
})

conn.connect(err => {
	if (err) console.log(`MySQL fail to connect : ${err}`)
	else console.log('MySQL connected')
})

module.exports = conn
