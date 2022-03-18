'use strict'

const response = require('../../response')
const conn = require('../../connection.js')

module.exports  = (req, res) => {

	//Parse body
	const { openOrderId, customer, phone, address, delivered, total, paymentStatus } = req.body.order
	let carts = req.body.carts

	//Insert into orders table
	let sql = `INSERT INTO orders VALUES (0, '${openOrderId}', '${customer}', '${phone}', '${address}', ${delivered}, ${total.price}, ${total.item}, ${paymentStatus})`

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
		}
	})
}
