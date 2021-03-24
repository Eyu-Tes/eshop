const express = require('express')

const { 
    fetchProducts, 
    fetchProduct, 
    deleteProduct
} = require('../controllers/products')

const { protectRoute } = require('../middleware/authMiddleware')


const router = express.Router()

// @route   /api/products
// @access  Public
// @method  GET
// @desc    Fetch all products
router.get('/', fetchProducts)

// @route   /api/products/:id
router.route('/:id')
// @access  Public
// @method  GET
// @desc    Fetch a single product by id
.get(fetchProduct)
// @access  Private
// @method  DELETE
// @desc    Delete product
.delete(protectRoute, deleteProduct)

module.exports = router
