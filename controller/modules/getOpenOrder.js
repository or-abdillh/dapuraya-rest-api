'use strict'

const response = require('../../response')
const conn = require('../../connection.js')

//Get all open order date with join into table dropPoints

module.exports = (req, res) => {

	const sql = 'SELECT open_orders.open_order_id, open_orders.coureer_available, drop_points.drop_point_name, open_orders.open_order_date, open_orders.drop_point_id FROM drop_points INNER JOIN open_orders ON drop_points.drop_point_id = open_orders.drop_point_id ORDER BY drop_points.drop_point_name ASC'
	//Get drop points
	conn.query(sql, (err, rows) => {
		try {
			if (!err) {
				response.success({
					openOrders: rows
				}, res)
			} else throw err
		} catch(err) {
			response.sqlError(err, res)
		}
	})
}
