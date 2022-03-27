'use strict'

const response = require('../../response')
const conn = require('../../connection.js')

//Create new drop point
module.exports = (req, res) => {

	//Get form
	const { name, gmaps } = req.body
	const sql = `INSERT INTO drop_points (drop_point_name, drop_point_gmaps) VALUES ('${name}', '${gmaps}')`

	conn.query(sql, (err, rows) => {
		try {
			if (!err && rows.affectedRows > 0) response.success({ msg: `Create new drop point at ${name}`, id: rows.insertId }, res)
			else throw err 
		} catch(err) {
			response.sqlError(err, res)
		}
	})
}
