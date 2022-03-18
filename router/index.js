'use strict'

const controller = require('../controller')

module.exports = app => {

	app.route('/').get( controller.index )

	app.route('/droppoints')
		.get( controller.DropPoints.getter )

	app.route('/openorders')
		.get( controller.OpenOrder.getter )
}
