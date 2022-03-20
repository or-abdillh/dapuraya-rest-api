'use strict'

const controller = require('../controller')

module.exports = app => {

	app.route('/').get( controller.index )

	app.route('/drop-points/open-order')
		.get( controller.dropPoints.getter.withOpenOrder )

	app.route('/drop-points')
		.get( controller.dropPoints.getter.all )

	app.route('/open-orders')
		.get( controller.openOrders.getter.all )
		.put( controller.openOrders.setter.edit )

	app.route('/products/ready-stock')
		.get( controller.products.getter.withReadyStock )

	app.route('/orders/count/:dropPoint')
		.get( controller.orders.getter.count )

	app.route('/orders/:dropPoint')
		.get( controller.orders.getter.byDropPoint )

	app.route('/order')
		.post( controller.orders.setter.createOrder )

	app.route('/login')
		.post( controller.admin.getter.login )

	app.route('/verification')
		.post( controller.admin.getter.verify )
	
}
