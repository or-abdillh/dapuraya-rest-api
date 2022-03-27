'use strict'

const response = require('../../response')
const conn = require('../../connection.js')

//Create new open order field
module.exports = (req, res) => {
	//Get form
	let { dropPointId, date, coureerAvailable } = req.body
	
	//Validation type data of date
	if (typeof(date) !== Number) date = new Date(date).getTime()
	 
	const sql = `INSERT INTO open_orders VALUES (0, ${dropPointId}, ${date}, ${coureerAvailable})`
	conn.query(sql, (err, rows) => {
		if (!err) response.success(`Create new open order on ${new Date(date).toLocaleString('id')}`, res)
		else response.sqlError(err, res)
	})
}
