const express = require('express')
const dotenv = require('dotenv')
const colors = require('colors')
const { notFound, errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')

/* ===== This needs to loaded before other configurations ===== */
// load environment varibles from a .env file into process.env
// default path = '.env'
dotenv.config()

// load DB connection
connectDB()

const app = express()

app.get('/', (req, res) => {
    res.send('API is running ...')
})

// load routers
app.use('/api/products', require('./routes/products'))

// error middlewares
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, 
    console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT} ...`
    .yellow.bold)
)
