// Middleware is a function that has access to the request and response objects.

const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

/* NB: All private routes are going to use this middleware */
// protect routes from unauthenticated access
// next means move on to the next middleware
module.exports.protectRoute = (req, res, next) => {
    // get token from header
    // x-auth-token is the key to the token inside the header
    const token = req.headers.authorization
    // check if token doesn't exist (return 401 (unauthorized) error code)
    if (!token) {
        res.status(401)
        throw new Error('Not authorized, no token')
    }
    // if token exists, verify it
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        // extract user payload from decoded and assign it as logged user
        req.user = decoded.user
        next()
    } catch (err) {
        console.log(err)
        res.status(401)
        throw new Error('Not authorized, token failed')
    }
}

// Is Admin?
module.exports.isAdmin = asyncHandler(async (req, res, next) => {
    if (req.user) {
        const user = await User.findById(req.user.id)
        if (user.isAdmin) {
            next() 
        }
        else {
            res.status(401)
            throw new Error('Not authorized, Not admin')
        }
    }
})
