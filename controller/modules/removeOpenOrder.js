'use strict'

const response = require('../../response')
const conn = require('../../connection.js')

//Delete open order from table
module.exports = (req, res) => {

	//get key
	const { key } = req.body
	const sql = `DELETE FROM open_orders WHERE open_order_id = ${key}`

	conn.query(sql, (err, rows) => {
		try {
			if (!err) {
				if (rows.affectedRows > 0) response.success(`Delete open order with id ${key}`, res)
				else throw String(`Rows not found for id ${key}`)
			} else throw err
		} catch(err) {
			response.sqlError(err, res)
		}
	})
}
