// Middleware is a function that has access to the request, response cycles

// error middlewares 
module.exports = {
    notFound : (req, res, next) => {
        const error = new Error(`Not Found - ${req.originalUrl}`)
        res.status(404)
        // Call next to move to the next piece of middleware (i.e. errorHandler)
        next(error)
    }, 
    
    // Function that takes err object 1st (overwrites the default middleware, i.e. (req, res, next))
    errorHandler : (err, req, res, next) => {
        const statusCode = res.statusCode === 200 ? 500 : res.statusCode
        res.status(statusCode)
        .json({
            message: err.message, 
            stack: process.env.NODE_ENV === 'production' ? null : err.stack
        })
        // Don't call next because there is no need to call other functions from here
        // Response is returned here
    }
}
