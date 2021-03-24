const asyncHandler = require('express-async-handler')
const Product = require('../models/Product')

// fetch all products
module.exports.fetchProducts = asyncHandler(async (req, res) => {
    const products = await Product.find()
    res.json(products)
})

// fetch a single product
module.exports.fetchProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (product) {
        res.json(product)
    }
    else {
        res.status(404)
        // This error will be caught by the custom error handler middleware
        throw new Error('Product not found')
    }
})

// delete product
module.exports.deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (product) {
        await product.remove()
        res.json({message: 'Product removed'})
    }
    else {
        res.status(404)
        throw new Error('Product not found')
    }
})
