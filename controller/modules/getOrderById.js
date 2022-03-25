'use strict'

const response = require('../../response')
const conn = require('../../connection.js')

module.exports = (req, res) => {
	
	//Get the key
	const key = req.params.orderId
	const sql = `
		SELECT * FROM orders WHERE order_id = ${key} ;
		SELECT products.product_name, products.product_price, carts.cart_amounts, carts.cart_price, carts.order_id FROM carts 
		INNER JOIN products ON ( products.product_id = carts.product_id AND carts.order_id = ${key} )
	`

	conn.query(sql, (err, rows) => {
			try {
			if (!err) {
				if (rows[0].length > 0) {
					const order = rows[0][0]
					const carts = rows[1]
					order.carts = carts
					response.success({ order }, res)
				} else response.notFound(`Order with id ${key} not found`, res)
			} else throw err
		} catch(err) {
			response.sqlError(err, res)
		}
	})
}
