'use strict'

const response = require('../../response')

module.exports = (req, res) => {
	response.success('Hello from your server', res)
}
