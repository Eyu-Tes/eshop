import { useContext, useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import Loader from '../layout/Loader'
import Message from '../layout/Message'
import Product from '../products/Product'
import { ProductContext } from '../../context/product/ProductContext'

const Home = () => {
    const { products, error, loading, fetchProducts } = useContext(ProductContext)

    useEffect(() => {
        fetchProducts()
    }, [])

    return (
        <>
            <h1>Latest Products</h1>
            {
                loading ? <Loader /> :
                (error ? <Message type="danger">{error}</Message> :
                <Row>
                    {products.map(product => (
                        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                            <Product product={product} />
                        </Col>
                    ))}
                </Row>)
            }
        </>
    )
}

export default Home
