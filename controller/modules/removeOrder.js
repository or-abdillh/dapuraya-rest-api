'use strict'

const response = require('../../response')
const conn = require('../../connection.js')

//Remove order
module.exports = (req, res) => {
	
	//Get the key
	const { key } = req.body
	const sql = `DELETE FROM orders WHERE order_id = ${key}`

	conn.query(sql, (err, rows) => {
		try {
			if (!err) {
				if (rows.affectedRows > 0) response.success(`Remove order with id ${key}`, res)
				else response.notFound(`Order with id ${key} not found`, res)
			} else throw err
		} catch(err) {
			response.sqlError(err, res)
		}
	})
}
