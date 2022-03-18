'use strict'

const response = require('../../response')
const conn = require('../../connection.js')

// Get all drop point
// Each drop point must contains open order date 

module.exports = (req, res) => {

	const sql = `
		SELECT * FROM drop_points ;
		SELECT open_order.drop_point_id, open_order.open_order_date FROM drop_points INNER JOIN open_order ON drop_points.drop_point_id = open_order.drop_point_id
	`

	conn.query(sql, (err, rows) => {
		try {
			if (!err) {
				const dropPoints = rows[0]
				const openOrders = rows[1]

				const results = {
					dropPoints: []
				}

				for (const data of dropPoints) {
					const sample = {
						dropPointID: data.drop_point_id,
						name: data.drop_point_name,
						openOrders: false
					}
					
					const filtered =  openOrders.filter( item => item.drop_point_id === sample.dropPointID ) || false
					if ( filtered.length > 0 ) {
						sample.openOrders = filtered.map( item => new Date(item.open_order_date).toLocaleString('id').split(' ')[0] )
					}

					results.dropPoints.push(sample)
				}
				//Create response
				response.success(results, res)
			} else throw err
		} catch(err) {
			response.serverError({
				code: err.code, sqlMessage: err.sqlMessage
			}, res)
		}
	})
}
