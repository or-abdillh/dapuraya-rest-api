'use strict'

const response = require('../../response')
const conn = require('../../connection.js')
const fs = require('fs')

//remove product
module.exports = (req, res) => {

	//Get key
	const { key } = req.body

	//Remove image from uploads
	const sql = `SELECT product_image FROM products WHERE product_id = '${key}' ; DELETE FROM products WHERE product_id = '${key}'`

	try {
		conn.query(sql, (err, rows) => {
			if (!err) {
				const oldPath = rows[0][0].product_image.split('/uploads')[1]
				fs.unlink('uploads' + oldPath, err => {
					if (!err) response.success(`Remove product ID ${key} from table`, res)
					else response.serverError(err, res)
				})
			} else throw err
		})
	} catch(err) {
		response.sqlError(err, res)
	}
}
