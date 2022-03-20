'use strict'

const response = require('../../response')
const conn = require('../../connection.js')

module.exports  = (req, res) => {

	//Parse body
	const { openOrderId, dropPointId, customer, phone, address, delivered, total } = req.body.order
	let carts = req.body.carts

	//If total is empty but carts is not empty
	if (total.price === 0 && total.item === 0 && carts.length > 0) {
		carts.forEach(cart => {
			total.price += cart.price
			total.item += cart.amounts
		})
	}

	//Insert into orders table
	let sql = `INSERT INTO orders VALUES (0, ${openOrderId}, ${dropPointId}, '${customer}', '${phone}', '${address}', ${delivered}, ${total.price}, ${total.item}, 0)`

	conn.query(sql, (err, rows) => {
		try {
			if (!err && rows.affectedRows > 0) {
				//Insert to table carts using orderId
				const orderId = rows.insertId
				carts = carts.map( item => {
					const { amounts, productId, price } = item
					return [0, amounts, productId, orderId, price]
				})
				
				sql = 'INSERT INTO carts VALUES ?'
				conn.query(sql, [carts], (err, rows) => {
					if (!err) response.success(`Create new order for ${customer}`, res)
					else throw err
				})
			} else throw err
		} catch(err) {
			response.sqlError(err, res)
			console.log(err)
		}
	})
}
