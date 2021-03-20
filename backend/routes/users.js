const express = require('express')

const protectRoute = require('../middleware/authMiddleware')

const { 
    authUser,
    signupUser,
    getUserProfile, 
    updateUserProfile
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
router.route('/profile')
// @method  GET
// @desc    Get user profile
.get(protectRoute, getUserProfile)
// @method  PUT
// @desc    Update user profile
.put(protectRoute, updateUserProfile)

module.exports = router
