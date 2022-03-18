'use strict'

const response = require('../../response')
const conn = require('../../connection.js')

//Get All products
//Each product must contain current ready stock

module.exports = (req, res) => {

	const sql = `
		SELECT * FROM products ;
		SELECT carts.product_id, carts.cart_amounts FROM products INNER JOIN carts ON products.product_id = carts.product_id
	`
	
	conn.query(sql, (err, rows) => {
		try {
			if (!err) {
				const products = rows[0]
				const carts = rows[1]

				const results = []

				for ( const data of products ) {
					const sample = {
						id: data.product_id,
						name: data.product_name,
						price: data.product_price,
						thumbnail: data.product_image,
						stock: data.product_stock,
						readyStock: data.product_stock,
						sold: 0
					}

					const filtered = carts.filter( item => item.product_id === sample.id ) || 0
					if ( filtered.length > 0 ) {
						filtered.forEach( item => sample.readyStock -= item.cart_amounts )
					}
					//Count sold items
					sample.sold = sample.stock - sample.readyStock
					//Push to results
					results.push(sample)
				}
				//Create response
				response.success({ products: results }, res)
			} else throw err
		} catch(err) {
			response.sqlError(err, res)
		}
	})
}
