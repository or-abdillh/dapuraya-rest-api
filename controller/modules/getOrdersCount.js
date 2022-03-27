'use strict'

const response = require('../../response')
const conn = require('../../connection.js')

//Coount orders

module.exports = (req, res) => {

	const { dropPoint } = req.params

	let sql = `SELECT COUNT(order_id) FROM orders`

	if (dropPoint !== 'all' || typeof(dropPoint) === Number) sql += ` WHERE drop_point_id = ${dropPoint}`

	conn.query(sql, (err, rows) => {
		try {
			if (!err) {
				response.success({ count: rows[0]['COUNT(order_id)'] }, res)
			} else throw err
		} catch(err) {
			response.sqlError(err, res)
		}
	})
}
