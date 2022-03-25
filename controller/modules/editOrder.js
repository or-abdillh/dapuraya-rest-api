'use strict'

const response = require('../../response')
const conn = require('../../connection.js')

module.exports = (req, res) => {
	//Get form
	const { customer, phone, address, total, key } = req.body
	const sql = `UPDATE orders SET order_customer = '${customer}', order_customer_phone = '${phone}', order_customer_address = '${address}', order_total_item = ${total.item}, order_total_price = ${total.price}
		WHERE order_id = ${key}`

	conn.query(sql, (err, rows) => {
		try {
			if (!err) {
				if (rows.affectedRows > 0) response.success(`Edit order by id ${key}`, res)
				else response.notFound(`Order with id ${key} not found`, res) 
			} else throw err
		} catch(err) {
			response.sqlError(err, res)
		}
	})
}
