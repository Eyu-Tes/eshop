const express = require('express')

const protectRoute = require('../middleware/authMiddleware')

const { 
    createOrder, 
    fetchOrderById, 
    UpdateOrderToPaid
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
// @desc    Fetch a single order by id
router.get('/:id', protectRoute, fetchOrderById)

// @route   /api/orders/:id/pay
// @access  Private
// @method  PUT
// @desc    Update order to paid
router.put('/:id/pay', protectRoute, UpdateOrderToPaid)

module.exports = router
