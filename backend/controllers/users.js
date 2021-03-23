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

// update user profile
module.exports.updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id)
    
    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.password = req.body.password || user.password

        const updatedUser = await user.save()
        
        res.json({
            _id: updatedUser._id, 
            name: updatedUser.name, 
            email: updatedUser.email, 
            isAdmin: updatedUser.isAdmin, 
            token: generateToken(updatedUser._id)
        })
    }
    else {
        res.status(404)
        throw new Error('User not found')
    }
})

// fetch users
module.exports.fetchUsers = asyncHandler(async (req, res) => {
    const users = await User.find()
    res.json(users)
})

// delete user
module.exports.deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    if (user) {
        await user.remove()
        res.json({message: 'User removed'})
    }
    else {
        res.status(404)
        throw new Error('User not found')
    }
})

// fetch user by id
module.exports.fetchUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password')
    if (user) {
        res.json(user)
    }
    else {
        res.status(404)
        throw new Error('User not found')
    }
})

// update user
module.exports.updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.isAdmin = (req.body.isAdmin !== null) ? req.body.isAdmin : user.isAdmin

        const updatedUser = await user.save()
        
        res.json({
            _id: updatedUser._id, 
            name: updatedUser.name, 
            email: updatedUser.email, 
            isAdmin: updatedUser.isAdmin
        })
    }
    else {
        res.status(404)
        throw new Error('User not found')
    }
})
