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

	app.route('/products/open-order/:openOrderId')
		.get( controller.products.getter.byOpenOrder )

	app.route('/orders/count/:dropPoint')
		.get( controller.orders.getter.count )

	app.route('/orders/:dropPoint')
		.get( controller.orders.getter.byDropPoint )

	app.route('/login')
		.post( controller.admin.getter.login )

	app.route('/verification')
		.get( controller.admin.getter.verify )

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
	
	app.route('/admin/products-order/:orderId')
		.get( controller.products.getter.notFromOrder )  

	app.route('/order')
		.post( controller.orders.setter.createOrder )

	app.route('/admin/order')
		.put( controller.orders.setter.edit )
		.delete( controller.orders.setter.remove )

	app.route('/admin/order/update-payment')
		.put( controller.orders.setter.updatePayment )

	app.route('/admin/order/:orderId')
		.get( controller.orders.getter.byId )

	app.route('/admin/cart')
		.post( controller.carts.setter.create )
		.put( controller.carts.setter.edit )
		.delete( controller.carts.setter.remove )

	app.route('/admin/drop-point')
		.post( controller.dropPoints.setter.create )
		.put( controller.dropPoints.setter.edit )
		.delete( controller.dropPoints.setter.remove )

	app.route('/admin/drop-point/change-status')
		.post( controller.dropPoints.setter.changeStatus )
}
