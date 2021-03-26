const mongoose = require('mongoose')

const ReviewSchema = new mongoose.Schema({
    name: {type: String, required: true},
    rating: {type: Number, required: true},
    comment: {type: String, required: true}, 
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true
    }
}, {
    timestamps: true
})

// Note that we didn't create a model of Review

const ProductSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true
    },
    name: {
        type: String, 
        required: true
    }, 
    image: {
        type: String, 
        required: true
    },
    brand: {
        type: String, 
        required: true
    }, 
    category: {
        type: String, 
        required: true
    }, 
    description: {
        type: String, 
        required: true, 
    }, 
    // The array shows that this propery is related to many review objects
    reviews: [ 
        ReviewSchema 
        // OR
        // {
        //     name: {type: String, required: true},
        //     rating: {type: Number, required: true},
        //     comment: {type: String, required: true}, 
        //     user: {
        //         type: mongoose.Schema.Types.ObjectId, 
        //         ref: 'User', 
        //         required: true
        //     }
        // }
    ],
    rating: {
        type: Number, 
        required: true, 
        default: 0
    }, 
    numReviews: {
        type: Number, 
        required: true, 
        default: 0
    }, 
    price: {
        type: Number, 
        required: true, 
        default: 0
    }, 
    countInStock: {
        type: Number, 
        required: true, 
        default: 0
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Product', ProductSchema)
