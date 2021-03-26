const express = require('express')

const { 
    fetchProducts, 
    fetchProduct, 
    deleteProduct, 
    createProduct, 
    updateProduct, 
    createReview
} = require('../controllers/products')

const { protectRoute, isAdmin } = require('../middleware/authMiddleware')


const router = express.Router()

// @route   /api/products
router.route('/')
// @access  Public
// @method  GET
// @desc    Fetch all products
.get(fetchProducts)
// @access  Public/Admin
// @method  POST
// @desc    Create product
.post(protectRoute, isAdmin, createProduct)

// @route   /api/products/:id
router.route('/:id')
// @access  Public
// @method  GET
// @desc    Fetch a single product by id
.get(fetchProduct)
// @access  Private/Admin
// @method  DELETE
// @desc    Delete product
.delete(protectRoute, isAdmin, deleteProduct)
// @access  Private/Admin
// @method  PUT
// @desc    Update product
.put(protectRoute, isAdmin, updateProduct)

// @route   /api/products/:id/reviews
// @access  Private
// @method  POST
// @desc    Create a new review
router.post('/:id/reviews', protectRoute, createReview)

module.exports = router
