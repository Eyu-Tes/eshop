const express = require('express')

const { protectRoute, isAdmin } = require('../middleware/authMiddleware')

const { 
    authUser,
    signupUser,
    getUserProfile, 
    updateUserProfile, 
    fetchUsers, 
    deleteUser
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

// @route   /api/users/
// @access  Private/Admin
// @method  GET
// @desc    Fetch all users
router.get('/', protectRoute, isAdmin, fetchUsers)

// @route   /api/users/:id
// @access  Private/Admin
// @method  DELETE
// @desc    Delete user
router.delete('/:id', protectRoute, isAdmin, deleteUser)

module.exports = router
