import { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button, Card, Image, Col, Row, ListGroup, Form } from 'react-bootstrap'
import Message from '../layout/Message'
import { CartContext } from '../../context/cart/CartContext'

const defaultImg = 'https://res.cloudinary.com/dvmucrzt2/image/upload/v1619034866/default.png'

const Cart = ({ match, location, history }) => {
    const productId = match.params.id
    const qty = location.search ? Number(location.search.split('=')[1]) : 1

    const { cartItems, addToCart, removeFromCart } = useContext(CartContext)

    const checkoutHandler = () => {
        // if user is not logged in proceed to login page otherwise redirect to shipping
        history.push('/signin?redirect=shipping')
    }

    useEffect(() => {
        if (productId) {
            addToCart(productId, qty)
        }
    }, [productId, qty])

    return (
        <Row>
            <Col md={8}>
                <h1>Shopping Cart</h1>
                {cartItems.length === 0 ? (
                    <Message>Your cart is empty <Link to='/'>Go Back</Link></Message>
                ) : (
                    <ListGroup variant='flush'>
                        {cartItems.map(cartItem => (
                            <ListGroup.Item key={cartItem.product}>
                                <Row>
                                    <Col md={2}>
                                        <Image
                                            src={cartItem.image || defaultImg}
                                            alt={cartItem.name}
                                            fluid
                                            rounded
                                        />
                                    </Col>
                                    <Col md={3}>
                                        <Link to={`/product/${cartItem.product}`}>
                                            {cartItem.name}
                                        </Link>
                                    </Col>
                                    <Col md={2}>${cartItem.price}</Col>
                                    <Col md={3}>
                                        <Form.Control
                                            as='select'
                                            value={cartItem.qty}
                                            onChange={(e) =>
                                                addToCart(cartItem.product, Number(e.target.value))
                                            }
                                        >
                                            {[...Array(cartItem.countInStock).keys()]
                                                .map(x =>
                                                    <option key={x + 1} value={x + 1}>{x + 1}</option>
                                                )}
                                        </Form.Control>
                                    </Col>
                                    <Col md={2}>
                                        <Button
                                            type='button'
                                            variant='light'
                                            onClick={() => removeFromCart(cartItem.product)}
                                        >
                                            <i className="fa fa-trash" />
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Subtotal ({
                                cartItems.reduce((acc, cur) => acc + cur.qty, 0)
                            }) items
                            </h2>
                            ${cartItems
                                .reduce((acc, cur) => acc + cur.qty * cur.price, 0)
                                .toFixed(2)
                            }
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button
                                type='button'
                                className='btn-block'
                                disabled={cartItems.length === 0}
                                onClick={checkoutHandler}
                            >
                                Procced To Checkout
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    )
}

export default Cart
