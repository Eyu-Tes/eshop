const express = require('express')
const products = require('./data/products')

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

const PORT = 5000

app.listen(PORT, 
    console.log(`Server is running on port ${PORT} ...`)
)
