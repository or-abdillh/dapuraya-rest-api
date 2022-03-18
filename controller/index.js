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
	}
}
