'use strict'

module.exports = {

	index: require('./modules/index.js'),
	dropPoints: {
		getter: {
			all: require('./modules/getDropPoints.js'),
			withOpenOrder: require('./modules/dropPointsWithOpenOrder.js')
		}
	},
	openOrders: {
		getter: {
			all: require('./modules/getOpenOrder.js')
		}
	},
	products: {
		getter: {
			withReadyStock: require('./modules/productsWithReadyStock.js')
		}
	},
	orders: {
		getter: {
			count: require('./modules/getOrdersCount.js'),
			byOpenOrder: require('./modules/getOrdersByOpenOrder.js')
		},
		setter: {
			createOrder: require('./modules/createOrder.js')
		}
	}
}
