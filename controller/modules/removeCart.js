'use strict'

const response = require('../../response')
const conn = require('../../connection.js')

//Delte cart from table
module.exports = (req, res) => {

	//Get form
	const { key } = req.body
	const sql = `DELETE FROM carts WHERE cart_id = ${key}`

	conn.query(sql, (err, rows) => {
		try {
			if (!err) {
				if (rows.affectedRows > 0) response.success(`Remove cart with id ${key}`, res)
				else response.notFound(`Cart with id ${key} not found`, res)
			} else throw err
		} catch(err) {
			response.sqlError(err, res)
		}
	})
}
