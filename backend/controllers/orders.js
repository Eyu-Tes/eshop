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
