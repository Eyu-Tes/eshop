import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Col, Row, ListGroup, Image, Card } from 'react-bootstrap'
import Message from '../layout/Message'
import Loader from '../layout/Loader'
import { OrderContext } from '../../context/order/OrderContext'

const Order = ({ match }) => {
    const orderId = match.params.id

    const { order, loading, error, fetchOrderDetails } = useContext(OrderContext)

    const addDecimals = num => (Math.round(num * 100) / 100).toFixed(2)

    const placeOrderHandler = e => {
        e.preventDefault()
 
    }

    useEffect(() => {
        fetchOrderDetails(orderId)
    }, [])

    return (
        loading ? <Loader/> : error ? <Message type='danger'>{error}</Message> :
        order && (
        <>
            <h1>Order {order._id} </h1>
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Customer Information</h2>
                            <p>
                                <strong>Name: </strong>
                                {order.user.name}
                            </p>
                            <p>
                                <strong>Email: </strong>
                                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Address: </strong>
                                {order.shippingInfo.address}, {' '}
                                {order.shippingInfo.city}, {' '}
                                {order.shippingInfo.postalCode}, {' '}
                                {order.shippingInfo.country} 
                            </p>
                            <Message 
                                type={order.isDelivered ? 'success' : 'danger'}
                            >
                                {order.isDelivered ? 'Delivered' : 'Not Delivered'}
                            </Message>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <p>
                                <strong>Method: </strong>
                                {order.paymentMethod}
                            </p>
                            <Message 
                                type={order.isPaid ? 'success' : 'danger'}
                            >
                                {order.Paid ? `Paid on ${order.paidAt}` : 'Not Paid'}
                            </Message>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {order.orderItems.legth === 0 ? (
                                <Message>Order is empty</Message>
                            ) : (
                                <ListGroup variant='flush'>
                                    {order.orderItems.map((orderItem, index) => 
                                    <ListGroup.Item key={index}>
                                        <Row>
                                            <Col md={2}>
                                                <Image 
                                                    src={orderItem.image} 
                                                    alt={orderItem.name} 
                                                    fluid rounded
                                                />
                                            </Col>
                                            <Col>
                                                <Link to={`/product/${orderItem.product}`}>
                                                    {orderItem.name}
                                                </Link>
                                            </Col>
                                            <Col md={4}>
                                                {orderItem.qty} x ${orderItem.price} = ${orderItem.qty * orderItem.price}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>)}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card border='0'>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items</Col>
                                    <Col>${addDecimals(order.itemsPrice)}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>${addDecimals(order.shippingPrice)}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>${addDecimals(order.taxPrice)}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>${addDecimals(order.totalPrice)}</Col>
                                </Row>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
        )
    )
}

export default Order
