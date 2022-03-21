'use strict'

const response = require('../../response')
const conn = require('../../connection.js')
const md5 = require('md5')

//Create new product
module.exports = (req, res) => {

	//Get form
	const { name, price, stock} = req.body

	//Uploader
	if (!req.files || Object.keys(req.files).length === 0) response.notFound('Image not found', res)

	//Get images form name
	const { image } = req.files

	//Generate name file
	const format = image.name.split('.')
	const fileName = `product-${ md5(new Date().getTime()) }.${format[format.length - 1]}`

	//Move file into /uploads
	image.mv('uploads/' + fileName, err => {
		if (err) response.serverError(err, res)
		else {
			//Success upload file
			const path = `http://${req.headers.host}/uploads/${fileName}`
			const sql = `INSERT INTO products VALUES (0, '${name}', ${price}, ${stock}, '${path}')`

			conn.query(sql, (err, rows) => {
				 try {
					 if (!err) response.success(`Create new product: ${name}`, res)
					 else throw err
				 } catch(err) {
					 response.sqlError(err, res)
				 }
			 })
		}
	})

}
