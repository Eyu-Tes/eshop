const asyncHandler = require('express-async-handler')
const Product = require('../models/Product')
const User = require('../models/User')

// fetch all products
module.exports.fetchProducts = asyncHandler(async (req, res) => {
    const products = await Product.find()
    res.json(products)
})

// fetch a single product
module.exports.fetchProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (product) {
        res.json(product)
    }
    else {
        res.status(404)
        // This error will be caught by the custom error handler middleware
        throw new Error('Product not found')
    }
})

// delete product
module.exports.deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (product) {
        await product.remove()
        res.json({message: 'Product removed'})
    }
    else {
        res.status(404)
        throw new Error('Product not found')
    }
})

// create product
module.exports.createProduct = asyncHandler(async (req, res) => {
    const product = new Product({
        name: req.body.name, 
        price: req.body.price, 
        image: req.body.image || '/images/sample.jpg', 
        brand: req.body.brand, 
        category: req.body.category, 
        countInStock: req.body.countInStock, 
        numReviews: req.body.numReviews,
        description: req.body.description,
        user: req.user.id
    })

    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
})

// update product
module.exports.updateProduct = asyncHandler(async (req, res) => {
    const {name, price, description, image, brand, category, countInStock} = req.body
    const product = await Product.findById(req.params.id)
    if (product) {
        product.name = name || product.name, 
        product.price = price || product.price, 
        product.description = description || product.description, 
        product.image = image || product.image, 
        product.brand = brand || product.brand, 
        product.category = category || product.category, 
        product.countInStock = countInStock || product.countInStock

        const updatedProduct = await product.save()
        res.json(updatedProduct)
    }
    else {
        res.status(404)
        throw new Error('Product not found')
    }
})

// create review
module.exports.createReview = asyncHandler(async (req, res) => {
    const {rating, comment} = req.body
    const product = await Product.findById(req.params.id)
    const loggedInUser = await User.findById(req.user.id)
    if (product) {
        const alreadyReviewed = await product.reviews.find(review => 
            review.user.toString() === req.user.id.toString()
        )
        
        if (alreadyReviewed) {
            // bad request
            res.status(400)
            throw new Error('Product already reviewed')
        }

        const review = {
            name: loggedInUser.name, 
            rating: Number(rating), 
            comment, 
            user: loggedInUser._id
        }

        product.reviews.push(review)
        product.numReviews = product.reviews.length
        product.rating = product.reviews.reduce((acc, cur) => cur.rating + acc, 0) / product.reviews.length

        const updatedProduct = await product.save()
        res.status(201).json(updatedProduct)
    }
    else {
        res.status(404)
        throw new Error('Product not found')
    }
})
