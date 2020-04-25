const mongoose = require('mongoose')
const Product = require('../model/Product')

module.exports.product_get_all = async (req, res, next) => {
    try {
        const allProducts = await Product.find()
        if (allProducts.length > 0) {
            res.status(200).send(allProducts)
        } else {
            res.send({ message: 'No product entries' })
        }
    } catch (err) {
        res.status(400).send(err)
    }
}

module.exports.product_create = async (req, res, next) => {
    console.log(req.file)
    const product = new Product({
        name: req.body.name,
        price: req.body.price,
        productImage: req.file.path
    })

    try {
        const saveProduct = await product.save()
        res.status(200).send(saveProduct)
    } catch (err) {
        res.status(400).send(err)
    }

}

module.exports.product_get = async (req, res, next) => {
    try {
        const getProduct = await Product.findById(req.params.id)
        if (getProduct) {
            res.status(200).send(getProduct)
        } else {
            res.status(404).send({ message: 'No valid product entry' })
        }
    } catch (error) {
        res.status(400).send({ message: 'Not valid product id' })
    }

}

module.exports.product_update = async (req, res, next) => {
    try {
        const updateProduct = await Product.updateOne({ _id: req.params.id }, req.body)
        res.status(200).send(updateProduct)
    } catch (err) {
        res.status(400).send(err)
    }
}

module.exports.product_delete = async (req, res, next) => {
    try {
        const delProduct = await Product.remove({ _id: req.params.id })
        res.status(200).send({ deletedProduct: delProduct, deletedCount: delProduct.deletedCount })
    } catch (err) {
        res.status(400).send(err)
    }
}
