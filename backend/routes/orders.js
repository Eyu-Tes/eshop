const express = require('express')

const { protectRoute, isAdmin } = require('../middleware/authMiddleware')

const { 
    createOrder, 
    fetchOrderById, 
    getUserOrders, 
    getAllOrders,
    updateOrderToPaid, 
    updateOrderToDelivered
} = require('../controllers/orders')

const router = express.Router()

// @route   /api/orders
router.route('/')
// @access  Private
// @method  POST
// @desc    Create new order
.post(protectRoute, createOrder)
// @access  Private/Admin
// @method  GET
// @desc    Get all orders
.get(protectRoute, isAdmin, getAllOrders)

// @route   /api/orders/myorders
// @access  Private
// @method  GET
// @desc    Get logged in user order
router.get('/myorders', protectRoute, getUserOrders)

// @route   /api/orders/:id
// @access  Private
// @method  GET
// @desc    Fetch a single order by id
router.get('/:id', protectRoute, fetchOrderById)

// @route   /api/orders/:id/pay
// @access  Private
// @method  PUT
// @desc    Update order to paid
router.put('/:id/pay', protectRoute, updateOrderToPaid)

// @route   /api/orders/:id/deliver
// @access  Private/Admin
// @method  PUT
// @desc    Update order to delivered
router.put('/:id/deliver', protectRoute, isAdmin, updateOrderToDelivered)

module.exports = router
