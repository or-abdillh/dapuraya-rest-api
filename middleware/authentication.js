'use strict'

const response = require('../response')
const jwt = require('jsonwebtoken')

require('dotenv').config()

//Middleware for autentication on /admin path router
module.exports = (req, res, next) => {

	//Get token from headers
	const { authorization } = req.headers
	try {
		jwt.verify(
			authorization, process.env.JWT_SECRET_KEY,
			(err, decoded) => {
				if (!err) {
					if (decoded.login) next()
					else throw String('Your session invalid')
				} else throw String('Access denied for this resource')
			}
		)
	} catch (err) {
		response.forbidden(err, res)
	}
}
