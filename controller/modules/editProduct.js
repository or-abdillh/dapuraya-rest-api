'use strict'

const response = require('../../response')
const conn = require('../../connection.js')
const md5 = require('md5')
const fs = require('fs')

//Update product 
module.exports = (req, res) => {

	//Get form
	const { name, price, stock, key } = req.body
	let sql = `UPDATE products SET product_name = '${name}', product_price = '${price}', product_stock = '${stock}' WHERE product_id = '${key}'`

	//Upload file again if req.files is exists
	if (req.files) {
		//Get image
		const { image } = req.files
		//Generate name file
		const format = image.name.split('.')
		const fileName = `product-${ md5(new Date().getTime()) }.${format[format.length - 1]}`
	
		//Move file into /uploads
		image.mv('uploads/' + fileName, err => {
			if (!err) {
				const path = `http://${req.headers.host}/uploads/${fileName}`
				
				//get and remove old image from upload
				sql = `SELECT product_image FROM products WHERE product_id = ${key} ; 
					UPDATE products SET product_name = '${name}', product_price = '${price}', product_stock = '${stock}', product_image = '${path}' WHERE product_id = '${key}'`

				try {
					conn.query(sql, (err, rows) => {
						if (!err) {
							const oldPath = rows[0][0].product_image.split('/uploads')[1]
							fs.unlink('uploads' + oldPath, err => {
								if (!err) response.success(`Edit product for product ID ${key}`, res)
								else throw err
							})
						}
						else response.serverError(err, res)
					})
				} catch(err) {
					response.serverError(err, res)
				}
			} else response.serverError(err, res)
		})

	} else {
		//Update product without replace product_image
		try {
			conn.query(sql, (err, rows) => {
				if (!err) response.success(`Edit product for product ID ${key}`, res)
				else throw err
			})
		} catch(err) {
			response.serverError(err, res)
		}
	}
}
