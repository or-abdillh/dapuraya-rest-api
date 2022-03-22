'use strict'

const response = require('../../response')
const conn = require('../../connection.js')

//Remove drop point
module.exports = (req, res) => {

	//Get the key
	const { key } = req.body
	const sql = `DELETE FROM drop_points WHERE drop_point_id = ${key}`

	conn.query(sql, (err, rows) => {
		try {
			if (!err) {
				if (rows.affectedRows > 0) response.success(`Remove drop point with id ${key}`, res)
				else response.notFound(`Drop point with id ${key} not found`, res)
			} else throw err
		} catch(err) {
			response.sqlError(err, res)
		}
	})
}
