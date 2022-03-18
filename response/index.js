'use strict'

const createJSON = (status, code, message, data) => {

	return {
		status,
		code,
		message,
		timestamp: new Date().toLocaleString('id'),
		results: data
	}
}

const success = (data, res) => {
	res.status(200).json( createJSON(true, 200, 'success', data) )
}

module.exports = {
	success
}
