const path = require('path')
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

// body parser middleware (required inorder to accept json data in request body)
app.use(express.json())

app.get('/', (req, res) => {
    res.send('API is running ...')
})

// load routers
app.use('/api/users', require('./routes/users'))
app.use('/api/products', require('./routes/products'))
app.use('/api/orders', require('./routes/orders'))
app.use('/api/upload', require('./routes/uploads'))

// paypal config route
app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID))

// Make 'uploads/' folder static, so it can get loaded in the browser
const dir = path.resolve()
app.use('/uploads', express.static(path.join(dir, 'uploads')))

// NB: This should be added after all the routes (otherwise it is going to get fired before the routes)
// error middlewares
app.use(notFound)               // Not Found Errors - non existing urls
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, 
    console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT} ...`
    .yellow.bold)
)
