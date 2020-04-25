const router = require('express').Router()
const multer = require('multer')
const verify = require('./verifyToken')
const ProductController = require('../controller/ProductController')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + file.originalname)
    }
})
const upload = multer({ storage: storage })


router.get('/', verify, ProductController.product_get_all)

router.post('/', verify, upload.single('productImage'), ProductController.product_create)

router.get('/:id', verify, ProductController.product_get)

router.patch('/:id', verify, ProductController.product_update)

router.delete('/:id', verify, ProductController.product_delete)

module.exports = router