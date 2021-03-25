import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Col, Row, ListGroup, Image, Card } from 'react-bootstrap'
import Message from '../layout/Message'
import CheckoutSteps from '../layout/CheckoutSteps'
import { CartContext } from '../../context/cart/CartContext'
import { OrderContext } from '../../context/order/OrderContext'

const PlaceOrder = ({ history }) => {
    const { cartItems, shippingInfo, paymentMethod } = useContext(CartContext)
    const { order, orderSuccess, error, createOrder } = useContext(OrderContext)

    const addDecimals = num => (Math.round(num * 100) / 100).toFixed(2)

    // calculate prices
    const itemsPrice = addDecimals(cartItems.reduce((acc, cur) => acc + cur.price * cur.qty, 0))
    const shippingPrice = addDecimals(itemsPrice > 100 ? 0 : 100)
    const taxPrice = addDecimals(.15 * itemsPrice)
    const totalPrice = addDecimals(Number(itemsPrice) + Number(shippingPrice) + Number(taxPrice))

    const placeOrderHandler = e => {
        e.preventDefault()
        createOrder({
            orderItems: cartItems, 
            shippingInfo, 
            paymentMethod, 
            itemsPrice: Number(itemsPrice), 
            shippingPrice: Number(shippingPrice), 
            taxPrice: Number(taxPrice), 
            totalPrice: Number(totalPrice)
        })
    }

    useEffect(() => {
        if (order && orderSuccess) {
            history.push(`/order/${order._id}`)
        } 
    }, [orderSuccess])

    return (
        <>
            <CheckoutSteps step1 step2 step3 step4 />
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Address: </strong>
                                {shippingInfo.address}, {' '}
                                {shippingInfo.city}, {' '}
                                {shippingInfo.postalCode}, {' '}
                                {shippingInfo.country} 
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <p>
                                <strong>Method: </strong>
                                {paymentMethod}
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {cartItems.legth === 0 ? (
                                <Message>Your cart is empty</Message>
                            ) : (
                                <ListGroup variant='flush'>
                                    {cartItems.map((cartItem, index) => 
                                    <ListGroup.Item key={index}>
                                        <Row>
                                            <Col md={2}>
                                                <Image 
                                                    src={cartItem.image} 
                                                    alt={cartItem.name} 
                                                    fluid rounded
                                                />
                                            </Col>
                                            <Col>
                                                <Link to={`/product/${cartItem.product}`}>
                                                    {cartItem.name}
                                                </Link>
                                            </Col>
                                            <Col md={4}>
                                                {cartItem.qty} x ${cartItem.price} = ${cartItem.qty * cartItem.price}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>)}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items</Col>
                                    <Col>${itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>${shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>${taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>${totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            { error && 
                                <ListGroup.Item>
                                    <Message type='danger'>{error}</Message> 
                                </ListGroup.Item>
                            }
                            <ListGroup.Item>
                                <Button 
                                    type='button' 
                                    className='btn-block'
                                    disabled={cartItems.legth === 0}
                                    onClick={placeOrderHandler}
                                >Place Order</Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default PlaceOrder
