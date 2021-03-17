const express = require('express')
const asyncHandler = require('express-async-handler')
const Product = require('../models/Product')

const router = express.Router()

// @route   /api/products
// @access  Public
// @method  GET
// @desc    Fetch all products
router.get('/', asyncHandler(async (req, res) => {
    const products = await Product.find()
    res.json(products)
}))

// @route   /api/products/:id
// @access  Public
// @method  GET
// @desc    Fetch a single product by id
router.get('/:id', asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (product) {
        res.json(product)
    }
    else {
        res.status(404).json({message: 'Product not found'})
    }
}))

module.exports = router
