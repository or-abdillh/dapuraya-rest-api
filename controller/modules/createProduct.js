'use strict'

const response = require('../../response')
const conn = require('../../connection.js')

//Create new product
module.exports = (req, res) => {

	//Get form
	const { name, price, stock, image } = req.body
	const sql = `INSERT INTO products VALUES (0, '${name}', ${price}, ${stock}, '${image}')`

	conn.query(sql, (err, rows) => {
		try {
			if (!err) response.success(`Create new product: ${name}`, res)
			else throw err
		} catch(err) {
			reponse.sqlError(err, res)
		}
	})
}
