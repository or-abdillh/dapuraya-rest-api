'use strict'

const response = require('../../response')
const conn = require('../../connection.js')

//Change drop point status 
module.exports = (req, res) => {

	//Get the key and status
	const { status, key } = req.body
	const sql = `UPDATE drop_points SET drop_point_status = ${status} WHERE drop_point_id = ${key}`

	conn.query(sql, (err, rows) => {
		try {
			if (!err) {
				if (rows.affectedRows > 0) response.success(`Change status for drop point with id ${key}`, res)
				else response.notFound('Drop point not found', res)
			} else throw err
		} catch(err) {
			response.sqlError(err, res)
		}
	})
}
