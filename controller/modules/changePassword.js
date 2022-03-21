'use strict'

const response = require('../../response')
const conn = require('../../connection.js')
const md5 = require('md5')

//Change password for admin
module.exports = (req, res) => {

	//Get form
	const { oldPassword, newPassword } = req.body
	const sql = `UPDATE admin SET password = '${md5(newPassword)}' WHERE password = '${md5(oldPassword)}'`

	try {
		conn.query(sql, (err, rows) => {
			if (!err) {
				if (rows.affectedRows > 0) response.success('Change password success', res)
				else response.notFound('Old password incorect', res)
			} else throw err
		})
	} catch(err) {
		response.sqlError(err, res)
	}
}
