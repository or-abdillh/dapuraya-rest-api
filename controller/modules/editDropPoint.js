'use strict'

const response = require('../../response')
const conn = require('../../connection.js')

//Edit drop point
module.exports = (req, res) => {

	//Get form and the key
	const { name, gmaps, key } = req.body
	const sql = `UPDATE drop_points SET drop_point_name = '${name}', drop_point_gmaps = '${gmaps}' WHERE drop_point_id = ${key}`

	conn.query(sql, (err, rows) => {
		try {
			if (!err) {
				if (rows.affectedRows > 0) response.success(`Update drop point with id ${key}`, res)
				else response.notFound('Drop point not found', res)
			} else throw err
		} catch(err) {
			response.sqlError(err, res)
		}
	})
}
