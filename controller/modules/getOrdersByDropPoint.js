'use strict'

const response = require('../../response')
const conn = require('../../connection.js')

//Get orders list by drop point id
module.exports = (req, res) => {

	//Get dropPoint
	const id = req.params.dropPoint

	const sql = `
		SELECT * FROM orders INNER JOIN open_orders ON ( orders.drop_point_id = ${id} AND orders.open_order_id = open_orders.open_order_id ) ORDER BY order_id DESC ;
		SELECT carts.order_id, products.product_name, carts.cart_amounts, carts.cart_price FROM carts INNER JOIN products ON carts.product_id = products.product_id ;
		SELECT drop_point_name FROM drop_points WHERE drop_point_id = ${id}
	`

	conn.query(sql, (err, rows) => {
		try {
			if (!err) {
				const orders = rows[0]
				const carts = rows[1]
				const dropPointName = rows[2][0].drop_point_name
				const results = []
				const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

				if ( orders.length > 0 ) {
					for ( const data of orders ) {
						const sample = {
							id: data.order_id,
							dropPointName,
							openOrderDate: new Date(data.open_order_date).toLocaleDateString(undefined, options),
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
