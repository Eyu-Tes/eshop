const express = require('express')
const { 
    authUser
} = require('../controllers/users')

const router = express.Router()

// @route   /api/users/signin
// @access  Public
// @method  POST
// @desc    Auth user & get token
router.post('/signin', authUser)

module.exports = router
