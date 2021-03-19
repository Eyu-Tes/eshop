const express = require('express')
const { 
    fetchProducts, 
    fetchProduct
} = require('../controllers/products')

const router = express.Router()

// @route   /api/products
// @access  Public
// @method  GET
// @desc    Fetch all products
router.get('/', fetchProducts)

// @route   /api/products/:id
// @access  Public
// @method  GET
// @desc    Fetch a single product by id
router.get('/:id', fetchProduct)

module.exports = router
