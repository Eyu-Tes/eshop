const express = require('express')

const protectRoute = require('../middleware/authMiddleware')

const { 
    createOrder
} = require('../controllers/orders')

const router = express.Router()

// @route   /api/orders
// @access  Private
// @method  POST
// @desc    Create new order
router.post('/', protectRoute, createOrder)

module.exports = router
