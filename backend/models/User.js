const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    }, 
    email: {
        type: String, 
        required: true, 
        unique: true
    }, 
    password: {
        type: String, 
        required: true
    }, 
    isAdmin: {
        type: Boolean, 
        required: true, 
        default: false
    }
}, {
    timestamps: true
})

// compare passwords
// Don't use an arrow function, as it changes the scope of 'this'
UserSchema.methods.comparePassword = async function (candidatePassword) {
    try {
        return (await bcrypt.compare(candidatePassword, this.password))
    } catch (err) {
        console.log(err)
        return null
    }
}

module.exports = mongoose.model('User', UserSchema)
