'use strict'

const response = require('../../response')
const conn = require('../../connection.js')
const jwt = require('jsonwebtoken')

require('dotenv').config()

module.exports = (req, res) => {
	//Get TOKEN
	//Verification token
	const { token } = req.body
	console.log(req.body)
	try {
		jwt.verify(
			token, process.env.JWT_SECRET_KEY,
			(err, decoded) => {
				console.log(decoded)
				if (!err) {
					if (decoded.login) response.success('Your session is valid', res)
					else throw String('Your session invalid')
				} else throw String('Your session invalid')
			}
		)
	} catch (err) {
		response.forbidden(err, res)
	}
}
