const mongoose = require('mongoose')
const Order = require('../model/Order')

module.exports.order_get_all = async (req, res, next) => {
    try {
        const allOrders = await Order.find()
            .select('_id quantity product')
            .populate('product', 'name')
        if (allOrders.length > 0) {
            res.status(200).send(allOrders)
        } else {
            res.send({ message: 'No orders entries' })
        }
    } catch (err) {
        res.status(400).send(err)
    }
}

module.exports.order_create = async (req, res, next) => {
    const newOrder = new Order({
        product: req.body.product_id,
        quantity: req.body.quantity
    })
    try {
        const saveOrder = await newOrder.save()
        res.status(200).send(saveOrder)
    } catch (err) {
        res.status(400).send(err)
    }

}

module.exports.order_get = async (req, res, next) => {
    try {
        const getOrder = await Order.findById(req.params.id)
            .select('_id quantity product')
            .populate('product')
        if (getOrder) {
            res.status(200).send(getOrder)
        } else {
            res.status(404).send({ message: 'No valid order entry' })
        }
    } catch (error) {
        res.status(400).send({ message: 'Not valid order id' })
    }
}

module.exports.order_update = async (req, res, next) => {
    try {
        const updateOrder = await Order.updateOne({ _id: req.params.id }, req.body)
        res.status(200).send(updateOrder)
    } catch (err) {
        res.status(400).send(err)
    }
}

module.exports.order_delete = async (req, res, next) => {
    try {
        const delOrder = await Order.remove({ _id: req.params.id })
        res.status(200).send({ deletedOrder: delOrder, deletedCount: delOrder.deletedCount })
    } catch (err) {
        res.status(400).send(err)
    }
}

