'use strict'

const response = require('../../response')
const conn = require('../../connection.js')

//Update payment status
module.exports = (req, res) => {
	
	//get te key and payload
	const { key, status } = req.body
	const sql = `UPDATE orders SET order_payment_status = ${status} WHERE order_id = ${key}`

	conn.query(sql, (err, rows) => {
		try {
			if (!err) {
				if (rows.affectedRows > 0) response.success(`Update payment status for order id ${key}`, res)
				else response.notFound(`Order with id ${key} no found`, res)
			} else throw err
		} catch(err) {
			response.sqlError(err, res)
		}
	})
}
