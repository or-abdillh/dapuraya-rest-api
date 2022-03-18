'use strict'

const response = require('../../response')
const conn = require('../../connection.js')

//Get all drop point name and gmaps url

module.exports = (req, res) => {

	const sql = 'SELECT * FROM drop_points'
	//Get drop points
	conn.query(sql, (err, rows) => {
		try {
			if (!err) {
				response.success({
					dropPoints: rows
				}, res)
			} else throw err
		} catch(err) {
			response.sqlError(err, res)
		}
	})
}
