import { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button, Card, Col, Row, Image, ListGroup } from 'react-bootstrap'
import Loader from '../layout/Loader'
import Message from '../layout/Message'
import Rating from '../products/Rating'
import { ProductContext } from '../../context/product/ProductContext'

const ProductDetail = ({match}) => {
    const { product, error, loading, fetchProduct } = useContext(ProductContext)

    useEffect(() => {
        const id = match.params.id
        fetchProduct(id)
    }, [])

    return (
        <>
            <Link className='btn btn-light my-3' to='/'>
                Go Back
            </Link>
            { loading ? <Loader /> : 
            (error ? <Message type="danger">{error}</Message> :
            product && ( 
                <Row>
                    <Col md={6} lg={5}>
                        <Image fluid src={product.image} alt={product.name} />
                    </Col>
                    <Col md={6} lg={4}>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h3>{product.name}</h3>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Rating 
                                    value={product.rating} 
                                    text={`${product.numReviews} reviews`}
                                />
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Price: ${product.price}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Description: {product.description}
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col md={{span: 6, offset: 6}} lg={{span: 3, offset: 0}}>
                        <Card>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>
                                            Price: 
                                        </Col>
                                        <Col>
                                            <strong>${product.price}</strong>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>
                                            Status: 
                                        </Col>
                                        <Col>
                                            {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Button 
                                        className='btn btn-block' 
                                        type='button'
                                        disabled={product.countInStock === 0}
                                    >
                                        Add To Cart
                                    </Button>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            ))}
        </>
    )
}

export default ProductDetail
