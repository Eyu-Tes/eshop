// connect to DB

const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true, 
            useUnifiedTopology: true, 
            useCreateIndex: true
        })
        console.log(`MongoDB connected: ${conn.connection.host} - ${conn.connection.name}`
        .cyan.underline)
    } catch (err) {
        console.log(`Error: ${err}`.red.underline.bold)
        // terminate the script/process that was started by Node with failure ERROR_CODE
        process.exit(1)
    }
}

module.exports = connectDB
