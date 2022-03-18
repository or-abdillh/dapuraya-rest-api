'use strict'

const response = require('../../response')
const conn = require('../../connection.js')

//Get orders list by open order id
module.exports = (req, res) => {

	//Get openOrderId
	const openOrderId = req.params.openOrderId

	const sql = `
		SELECT * FROM orders WHERE open_order_id = ${openOrderId} ;
		SELECT open_order_date FROM open_orders WHERE open_order_id = ${openOrderId} ;
		SELECT carts.order_id, products.product_name, carts.cart_amounts, carts.cart_price FROM carts INNER JOIN products ON carts.product_id = products.product_id
	`

	conn.query(sql, (err, rows) => {
		try {
			if (!err) {
				const orders = rows[0]
				const openOrder = rows[1]
				const carts = rows[2]
				const results = []

				if ( orders.length > 0 ) {
					for ( const data of orders ) {
						const sample = {
							id: data.order_id,
							date: new Date(openOrder[0].open_order_date).toLocaleString('id'),
							customer: data.order_customer,
							phone: formatingPhone(data.order_customer_phone),
							address: data.order_customer_address,
							delivered: Boolean(data.order_delivered),
							paymentStatus: Boolean(data.order_payment_status),
							total: {
								items: data.order_total_item,
								price: data.order_total_price.toLocaleString('id')	
							},
							carts: []
						}
						//Filter using order_id
						sample.carts = carts.filter( item => item.order_id === sample.id ).map( item => {
							return {
								product: item.product_name,
								amounts: item.cart_amounts,
								price: item.cart_price.toLocaleString('id')
							}
						})
						//push to results
						results.push(sample)
					}
				}
				//Create response
				response.success({ orders: results }, res)
			} else throw err
		} catch(err) {
			response.sqlError(err, res)
		}
	})
} 

//Formating phone number
const formatingPhone = phone => {
	let arr = phone.split('')
	const length = arr.length
	return arr.splice(0, length - 3).join('') + 'XXX'
}
