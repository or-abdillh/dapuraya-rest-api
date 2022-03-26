'use strict'

const response = require('../../response')
const conn = require('../../connection.js')

//Get a product that is not in an order
module.exports = (req, res) => {
	
	//Get orderId as the key
	const { orderId } = req.params
	const sql = `
		SELECT * FROM products ;
		SELECT carts.product_id FROM carts WHERE carts.order_id = ${orderId}
	`
	conn.query(sql, (err, rows) => {
		try {
			if (!err) {
				//Parse rows
				let products = rows[0]
				const productsOnOrderCart = rows[1]

				if (productsOnOrderCart.length < 1) response.notFound(`Order with id ${orderId} not found`, res)
				else {
					//Filter products for find a products not in order
					for (const item of productsOnOrderCart) {
						products.forEach((product, x) => {
							if (product.product_id === item.product_id) products.splice(x, 1) 
						})
					}
					//Send response
					response.success({ products }, res)
				}
			} else throw err
		} catch(err) {
			response.sqlError(err, res)
		}
	})
}
