const express = require('express')
const dotenv = require('dotenv')
const colors = require('colors')
const connectDB = require('./config/db')
const products = require('./data/products')

/* ===== This needs to loaded before other configurations ===== */
// load environment varibles from a .env file into process.env
// default path = '.env'
dotenv.config()

// load DB connection
connectDB()

const app = express()

app.get('/', (req, res) => {
    res.send('API is running')
})

app.get('/api/products', (req, res) => {
    res.json(products)
})

app.get('/api/products/:id', (req, res) => {
    res.json(products.find(product => product._id === req.params.id))
})

const PORT = process.env.PORT || 5000

app.listen(PORT, 
    console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT} ...`
    .yellow.bold)
)
