const express = require('express')

const protectRoute = require('../middleware/authMiddleware')

const { 
    authUser,
    signupUser,
    getUserProfile
} = require('../controllers/users')

const router = express.Router()

// @route   /api/users/signin
// @access  Public
// @method  POST
// @desc    Auth user & get token
router.post('/signin', authUser)


// @route   /api/users/signup
// @access  Public
// @method  POST
// @desc    Register user
router.post('/signup', signupUser)

// @route   /api/users/profile
// @access  Private
// @method  GET
// @desc    Get user profile
router.get('/profile', protectRoute, getUserProfile)

module.exports = router
