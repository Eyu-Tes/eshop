import { Col, Row } from 'react-bootstrap'
import Product from '../products/Product'
import products from '../../products'

const Home = () => {
    return (
        <>
            <h1>Latest Products</h1>
            <Row>
                {products.map((product, id) => (
                    <Col key={id} sm={12} md={6} lg={4} xl={3}>
                        <Product product={product} />
                    </Col>
                ))}
            </Row>
        </>
    )
}

export default Home
