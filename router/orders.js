const router = require('express').Router()

router.get('/', (req, res, next) => {
    res.status(200).send({
        message: 'Get Orders'
    })
})

router.post('/', (req, res, next) => {
    const order = {
        product_id: req.body.product_id,
        quantity: req.body.quantity
    }
    res.status(201).send({
        message: 'Order was created',
        order: order
    })
})

router.get('/:id', (req, res, next) => {
    res.status(201).send({
        message: 'Order details',
        id: req.params.id
    })
})

router.delete('/:id', (req, res, next) => {
    res.status(201).send({
        message: 'Order was deleted',
        id: req.params.id
    })
})

module.exports = router