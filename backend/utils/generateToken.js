const jwt = require('jsonwebtoken')

module.exports = generateToken = (id) => (
    jwt.sign({user: {id}}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
)
