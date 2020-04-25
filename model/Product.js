const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    price: {
        type: Number,
        required: true,
    },
    productImage: {
        type: String
    }
})

module.exports = mongoose.model('Product', productSchema)