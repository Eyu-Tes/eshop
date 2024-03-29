const asyncHandler = require('express-async-handler')
const Order = require('../models/Order')

// create order
module.exports.createOrder = asyncHandler(async (req, res) => {
    const {
        orderItems,
        shippingInfo,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    } = req.body

    if (orderItems && orderItems.length === 0) {
        res.status(401)
        throw new Error('No order items')
    }
    else {
        const order = new Order({
            user: req.user.id,
            orderItems,
            shippingInfo,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        })

        const newOrder = await order.save()

        res.status(201).json(newOrder)
    }
})

// fetch a single order by id
module.exports.fetchOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email')
    if (order) {
        res.json(order)
    }
    else {
        res.status(404)
        throw new Error('Order not found')
    }
})

// get orders from logged in user
module.exports.getUserOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user.id })
    res.json(orders)
})

// get all orders
module.exports.getAllOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find().populate('user', 'name')
    res.json(orders)
})

// update order to paid
module.exports.updateOrderToPaid = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)
    if (order) {
        order.isPaid = true
        order.paidAt = Date.now()
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address
        }
        const updatedOrder = await order.save()
        res.json(updatedOrder)
    }
    else {
        res.status(404)
        throw new Error('Order not found')
    }
})

// update order to delivered
module.exports.updateOrderToDelivered = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)
    if (order) {
        order.isDelivered = true
        order.deliveredAt = Date.now()
        const updatedOrder = await order.save()
        res.json(updatedOrder)
    }
    else {
        res.status(404)
        throw new Error('Order not found')
    }
})
