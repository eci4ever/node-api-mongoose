const router = require('express').Router()
const Order = require('../model/Order')

router.get('/', async (req, res, next) => {
    try {
        const allOrders = await Order.find()
        if (allOrders.length > 0) {
            res.status(200).send(allOrders)
        } else {
            res.send({ message: 'No orders entries' })
        }
    } catch (err) {
        res.status(400).send(err)
    }
})

router.post('/', async (req, res, next) => {
    const newOrder = new Order({
        product_id: req.body.product_id,
        quantity: req.body.quantity
    })
    try {
        const saveOrder = await newOrder.save()
        res.status(200).send(saveOrder)
    } catch (err) {
        res.status(400).send(err)
    }

})

router.get('/:id', async (req, res, next) => {
    try {
        const getOrder = await Order.findById(req.params.id)
        if (getOrder) {
            res.status(200).send(getOrder)
        } else {
            res.status(404).send({ message: 'No valid order entry' })
        }
    } catch (error) {
        res.status(400).send({ message: 'Not valid order id' })
    }
})

router.patch('/:id', async (req, res, next) => {
    try {
        const updateOrder = await Order.updateOne({ _id: req.params.id }, req.body)
        res.status(200).send(updateOrder)
    } catch (err) {
        res.status(400).send(err)
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
        const delOrder = await Order.remove({ _id: req.params.id })
        res.status(200).send({ deletedOrder: delOrder, deletedCount: delOrder.deletedCount })
    } catch (err) {
        res.status(400).send(err)
    }
})

module.exports = router