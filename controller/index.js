'use strict'

module.exports = {

	index: require('./modules/index.js'),
	dropPoints: {
		getter: {
			all: require('./modules/getDropPoints.js'),
			withOpenOrder: require('./modules/dropPointsWithOpenOrder.js')
		},
		setter: {
			create: require('./modules/createDropPoint.js'),
			edit: require('./modules/editDropPoint.js'),
			remove: require('./modules/removeDropPoint.js'),
			changeStatus: require('./modules/changeDropPointStatus.js')
		}
	},
	openOrders: {
		getter: {
			all: require('./modules/getOpenOrder.js')
		},
		setter: {
			edit: require('./modules/editOpenOrder.js'),
			create: require('./modules/createOpenOrder.js'),
			remove: require('./modules/removeOpenOrder.js')
		}
	},
	products: {
		getter: {
			withReadyStock: require('./modules/productsWithReadyStock.js')
		},
		setter: {
			create: require('./modules/createProduct.js'),
			edit: require('./modules/editProduct.js'),
			remove: require('./modules/removeProduct.js')
		}
	},
	orders: {
		getter: {
			count: require('./modules/getOrdersCount.js'),
			byDropPoint: require('./modules/getOrdersByDropPoint.js'),
			byId: require('./modules/getOrderById.js')
		},
		setter: {
			createOrder: require('./modules/createOrder.js'),
			edit: require('./modules/editOrder.js')
		}
	},
	admin: {
		getter: {
			login: require('./modules/login.js'),
			verify: require('./modules/verification.js')
		}, 
		setter: {
			changePassword: require('./modules/changePassword.js')
		}
	},
	carts: {
		setter: {
			create: require('./modules/createCart.js')
		}
	}
}
