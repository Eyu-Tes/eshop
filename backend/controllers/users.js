const asyncHandler = require('express-async-handler')
const generateToken = require('../utils/generateToken')
const User = require('../models/User')

// auth user & generate token
module.exports.authUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body

    const user = await User.findOne({email})

    if (user && await user.comparePassword(password)) {
        res.json({
            _id: user._id, 
            name: user.name, 
            email: user.email, 
            isAdmin: user.isAdmin, 
            token: generateToken(user._id)
        })
    }
    else {
        res.status(401)
        // This error will be caught by the custom error handler middleware
        throw new Error('Invalid email or password')
    }
})

// register user
module.exports.signupUser = asyncHandler(async (req, res) => {
    try {
        const user = await User.create({...req.body})
        res.status(201).json({
            _id: user._id, 
            name: user.name, 
            email: user.email, 
            isAdmin: user.isAdmin, 
            token: generateToken(user._id)
        })
    } catch (err) {
        console.log(err)
        // email uniqueness error message
        if (err.name === 'MongoError' && err.code === 11000) {
            res.status(400)
            throw new Error('User already exists')
        }
        // field error
        if (err.name === 'ValidationError') {
            res.status(400)
            throw new Error('Invalid user data')
        }
    }
})

// get user profile
module.exports.getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id)
    if (user) {
        res.json({
            _id: user._id, 
            name: user.name, 
            email: user.email, 
            isAdmin: user.isAdmin
        })
    }
    else {
        res.status(404)
        throw new Error('User not found')
    }
})
