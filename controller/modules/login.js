'use strict'

const response = require('../../response')
const conn = require('../../connection.js')
const jwt = require('jsonwebtoken')
const md5 = require('md5')

require('dotenv').config()

module.exports = (req, res) => {
	//Get form 
	const { username, password } = req.body

	const sql = `SELECT * FROM admin WHERE username = '${username}' AND password = '${md5(password)}'`
	conn.query(sql, (err, rows) => {
		if (!err) {
			if (rows.length > 0) {
				//Create TOKEN
				console.log('jj')
				jwt.sign(
					{ username, login: true },
					process.env.JWT_SECRET_KEY,
					(err, token) => {
						if (!err) response.success({ token }, res)
					}
				)
			} else response.forbidden('Username or password is wrong', res)
		} else response.sqlError(err, res)
	})
}
