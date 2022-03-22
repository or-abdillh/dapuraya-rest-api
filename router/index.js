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

	app.route('/admin/change-password')
		.put( controller.admin.setter.changePassword )
	
	app.route('/admin/open-orders')
		.put( controller.openOrders.setter.edit )
		.post( controller.openOrders.setter.create )
		.delete( controller.openOrders.setter.remove )

	app.route('/admin/products')
		.post( controller.products.setter.create )
		.put( controller.products.setter.edit )
		.delete( controller.products.setter.remove )

	app.route('/admin/drop-point')
		.post( controller.dropPoints.setter.create )
		.put( controller.dropPoints.setter.edit )
		.delete( controller.dropPoints.setter.remove )
}
