'use strict'

const response = require('../../response')
const conn = require('../../connection.js')

//Update open order field
module.exports = (req, res) => {
	//get form update and the key
	const { openOrderId, dropPointId, date } = req.body
	const sql = `UPDATE open_orders SET drop_point_id = '${dropPointId}', open_order_date = ${date} WHERE open_order_id = ${openOrderId}`

	conn.query(sql, (err, rows) => {
		try {
			if (!err) {
				if (rows.affectedRows > 0) response.success(`Update open order for id ${openOrderId}`, res) //success
				else throw String(`Rows not found for id ${openOrderId}`)
			} 
			else throw err
		} catch(err) {
			response.sqlError(err, res)
		}
	})
}
