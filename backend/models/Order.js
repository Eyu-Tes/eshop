const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true
    },
    orderItems: [
        {
            name: {type: String, required: true}, 
            qty: {type: Number, required: true}, 
            image: {type: String, required: true}, 
            price: {type: Number, required: true}, 
            product: {
                type: mongoose.Schema.Types.ObjectId, 
                ref: 'Product',
                required: true
            }
        }
    ], 
    shippingInfo: {
        address: {
            type: String, 
            required: true
        }, 
        city: {
            type: String, 
            required: true
        }, 
        postalCode: {
            type: String, 
            required: true
        }, 
        country: {
            type: String, 
            required: true
        }
    }, 
    paymentMethod: {
        type: String, 
        required: true
    }, 
    paymentResult: {
        id: {type: String}, 
        status: {type: String}, 
        update_time: {type: String}, 
        email_address: {type: String}
    }, 
    itemsPrice: {
        type: Number, 
        required: true, 
        default: 0.0
    },
    taxPrice: {
        type: Number, 
        required: true, 
        default: 0.0
    }, 
    shippingPrice: {
        type: Number, 
        required: true, 
        default: 0.0
    }, 
    totalPrice: {
        type: Number, 
        required: true, 
        default: 0.0
    }, 
    isPaid: {
        type: Boolean, 
        required: true, 
        default: false
    }, 
    paidAT: {
        type: Date
    }, 
    isDelivered: {
        type: Boolean, 
        required: true, 
        default: false
    }, 
    deliveredAT: {
        type: Date
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Order', OrderSchema)
