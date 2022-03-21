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
	res.status(200).send( createJSON(true, 200, 'Success', data) )
}

const sqlError = (err, res) => {
	res.status(501).send( createJSON(false, 501, 'Error from SQL', err) )
}

const forbidden = (msg, res) => {
	res.status(403).send( createJSON(false, 403, 'Ilegal access', msg) )
}

const notFound = (msg, res) => {
	res.status(404).send( createJSON(false, 404, 'Not found', msg) )
}

const serverError = (err, res) => {
	res.status(501).send( createJSON(false, 501, 'Something wrong', err) )
}

module.exports = {
	success,
	sqlError,
	forbidden,
	serverError,
	notFound
}
