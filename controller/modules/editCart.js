'use strict'

const response = require('../../response')
const conn = require('../../connection.js')

//Edit cart amounts and price
module.exports = (req, res) => {
	
	//Get form
	const { amounts, price, cartId } = req.body
	const sql = `UPDATE carts SET cart_amounts = ${amounts}, cart_price = ${price} WHERE cart_id = ${cartId}`

	//Update Cart
	conn.query(sql, (err, rows) => {
		try {
			if (!err) {
				if (rows.affectedRows > 0) response.success(`Update cart with id ${cartId}`, res)
				else response.notFound(`Cart with id ${cartId} not found`, res)
			} else throw err
		} catch(err) {
			response.sqlError(err, res)
		}
	})
}
