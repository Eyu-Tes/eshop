const express = require('express')

const protectRoute = require('../middleware/authMiddleware')

const { 
    createOrder, 
    fetchOrderById, 
    UpdateOrderToPaid, 
    getUserOrders
} = require('../controllers/orders')

const router = express.Router()

// @route   /api/orders
// @access  Private
router.route('/')
// @method  POST
// @desc    Create new order
.post(protectRoute, createOrder)
// @method  GET
// @desc    Get logged in user order
.get(protectRoute, getUserOrders)

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
