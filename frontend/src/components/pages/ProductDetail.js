import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Card, Form, Col, Row, Image, ListGroup } from 'react-bootstrap'
import Loader from '../layout/Loader'
import Message from '../layout/Message'
import Rating from '../products/Rating'
import Reviews from '../products/Reviews'
import Meta from '../layout/Meta'
import { UserContext } from '../../context/user/UserContext'
import { ProductContext } from '../../context/product/ProductContext'

const ProductDetail = ({match, history}) => {
    const prodId = match.params.id

    const { user } = useContext(UserContext)
    const { product, error, loading, fetchProduct } = useContext(ProductContext)

    const [qty, setQty] = useState(1)

    const addToCartHandler = () => {
        history.push(`/cart/${prodId}?qty=${qty}`)
    }

    useEffect(() => {
        fetchProduct(prodId)
    }, [])

    return (
        <>
            <Link className='btn btn-light my-3' to='/'>
                Go Back
            </Link>
            { loading ? <Loader /> : 
            (error ? <Message type="danger">{error}</Message> :
            product && ( 
                <>
                    <Meta title={product.name} />
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
                                    {
                                        product.countInStock > 0 && (
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>
                                                        Qty:
                                                    </Col>
                                                    <Col xs='auto'>
                                                        <Form.Control 
                                                            as='select' 
                                                            value={qty}
                                                            onChange={(e) => setQty(e.target.value)}
                                                        >
                                                            {[...Array(product.countInStock).keys()]
                                                            .map(x => 
                                                                <option key={x+1} value={x+1}>
                                                                    {x+1}
                                                                </option>
                                                            )}
                                                        </Form.Control>
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        )
                                    }
                                    <ListGroup.Item>
                                        <Button 
                                            className='btn btn-block' 
                                            type='button'
                                            disabled={product.countInStock === 0}
                                            onClick={addToCartHandler}
                                        >
                                            Add To Cart
                                        </Button>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                    {/* Reviews Section */}
                    <Reviews prodId={prodId} />
                </>
            ))}
        </>
    )
}

export default ProductDetail
