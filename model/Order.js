const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    quantity: {
        type: Number,
        default: 1
    }
})

module.exports = mongoose.model('Order', orderSchema)