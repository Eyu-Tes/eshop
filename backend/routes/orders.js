const express = require('express')

const protectRoute = require('../middleware/authMiddleware')

const { 
    createOrder, 
    fetchOrderById
} = require('../controllers/orders')

const router = express.Router()

// @route   /api/orders
// @access  Private
// @method  POST
// @desc    Create new order
router.post('/', protectRoute, createOrder)

// @route   /api/orders/:id
// @access  Private
// @method  GET
// @desc    fetch a single order by id
router.get('/:id', protectRoute, fetchOrderById)

module.exports = router
