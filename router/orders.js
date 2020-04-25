const router = require('express').Router()
const Order = require('../model/Order')
const OrderController = require('../controller/OrderController')
const verify = require('./verifyToken')

router.get('/', verify, OrderController.order_get_all)

router.post('/', verify, OrderController.order_create)

router.get('/:id', verify, OrderController.order_get)

router.patch('/:id', verify, OrderController.order_update)

router.delete('/:id', verify, OrderController.order_delete)

module.exports = router