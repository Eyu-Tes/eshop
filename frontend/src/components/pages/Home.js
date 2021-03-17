import { useEffect, useState } from 'react'
import axios from 'axios'
import { Col, Row } from 'react-bootstrap'
import Product from '../products/Product'

const Home = () => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const {data} = await axios.get('/api/products')
                setProducts(data)
            } catch (err) {
                console.log(err)
            }
        } 
        
        fetchProducts()
    }, [])

    return (
        <>
            <h1>Latest Products</h1>
            <Row>
                {products.map(product => (
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                        <Product product={product} />
                    </Col>
                ))}
            </Row>
        </>
    )
}

export default Home
