'use strict'

const response = require('../../response')
const conn = require('../../connection.js')

module.exports = (req, res) => {
	
	//Get form 
	const { productId, orderId, amounts, price } = req.body
	let sql = `SELECT order_total_price, order_total_item FROM orders WHERE order_id = ${orderId}`

	//Query for get order by id
	conn.query(sql, (err, rows) => {
		try {
			if (!err) {
				if (rows.length > 0 ) {
					const orders = rows[0]
					//Update order		
					orders.order_total_price += parseInt(price)
					orders.order_total_item += parseInt(amounts)
					
					// Update order and check if new cart with product id is exist
					sql = `
						UPDATE orders SET order_total_price = ${orders.order_total_price}, order_total_item = ${orders.order_total_item} WHERE order_id = ${orderId} ;
						SELECT * FROM carts WHERE product_id = ${productId} AND order_id = ${orderId}`
					
					conn.query(sql, (err, rows) => {
						if (!err) {
							//Product id exist
							if (rows[1].length > 0) {
								//Update cart not create new cart
								const carts = rows[1][0]
								carts.cart_price += parseInt(price)
								carts.cart_amounts += parseInt(amounts)

								sql = `UPDATE carts SET cart_price = ${carts.cart_price}, cart_amounts = ${carts.cart_amounts} WHERE cart_id = ${carts.cart_id}`

								conn.query(sql, (err, rows) => {
									if (!err) response.success(`Update cart with id ${carts.cart_id}`, res)
									else throw err
								})
							} else { //Create new cart
								sql = `INSERT INTO carts (order_id, product_id, cart_price, cart_amounts) VALUES (${orderId}, ${productId}, ${price}, ${amounts})`
								conn.query(sql, (err, rows) => {
									if (!err) response.success(`Create new cart for order id ${orderId}`, res)
									else throw err
								})
							}
						} 
						else throw err
					})
				} else response.notFound(`Order with id ${orderId} not found`, res)
			} else throw err
		} catch(err) {
			response.sqlError(err, res)
		}
	})
}
