import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Button, Form , Table, Col, Row } from 'react-bootstrap'
import Message from '../../components/layout/Message'
import Loader from '../../components/layout/Loader'
import { UserContext } from '../../context/user/UserContext'
import { OrderContext } from '../../context/order/OrderContext'
import { reset } from 'colors'

const Profile = ({ history}) => {
    const { user, error, updateSuccess, loading , updateUserProfile, reset} = useContext(UserContext)
    const { orders, loading: ordersLoading, error: ordersError, listUserOrders } = useContext(OrderContext)

    const initialValues = {
        name: '',
        email: '', 
        password: '', 
        password2: ''
    }
    const [values, setValues] = useState(initialValues)
    const [message, setMessage] = useState(null)
    const {name, email, password, password2} = values

    const onChange = e => {
        setValues({...values, [e.target.name]: e.target.value})
    }

    const submitHandler = e => {
        e.preventDefault()
        setMessage(null)
        if (name !== user.name || email !== user.email || password !== '') {
            if (password !== password2) {
                setMessage("Passwords do not match")
            }
            else {
                updateUserProfile(name, email, password)
                setValues({...values, password: '', password2: ''})
            }
        }
    }

    useEffect(() => {
        if (updateSuccess) {
            reset()
        }

        if (user) {
            setValues({...values, name: user.name, email: user.email})
            listUserOrders()
        }
        else {
            history.push('/signin')
        }
    }, [user, updateSuccess, history])

    return (
        <Row>
            <Col md={4}>
            <h2>User Profile</h2>
                {error && <Message type='danger'>{error}</Message>}
                {message && <Message type='danger'>{message}</Message>}
                {updateSuccess && <Message type='success'>Profile Updated</Message>}
                {loading && <Loader/>}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name'>
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Enter username'
                            name='name'
                            value={name}
                            onChange={onChange}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='email'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            type='email'
                            placeholder='Enter email'
                            name='email'
                            value={email}
                            onChange={onChange}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='Enter password'
                            name='password'
                            value={password}
                            onChange={onChange}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='password2'>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='Confirm password'
                            name='password2'
                            value={password2}
                            onChange={onChange}
                        ></Form.Control>
                    </Form.Group>
                    <Button type='submit' variant='primary'>Update</Button>
                </Form>
            </Col>
            <Col md={{span: 7, offset: 1}}>
                <h2>My Orders</h2>
                {ordersLoading ? <Loader/> : 
                (ordersError ? <Message type='danger'>{ordersError}</Message> : 
                    <Table striped bordered hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>DATE</th>
                                <th>TOTAL</th>
                                <th>PAID</th>
                                <th>DELIVERED</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => 
                                <tr key={order._id}>
                                    <td>{order._id.substring(0, 5)}...</td>
                                    <td>{order.createdAt.substring(0, 10)}</td>
                                    <td>{order.totalPrice}</td>
                                    <td>{order.isPaid ? order.paidAt.substring(0, 10) : (
                                        <i className="fa fa-times" style={{color: '#f44336'}}></i>
                                    )}</td>
                                    <td>{order.isDelivered ? order.deliveredAt.substring(0, 10) : (
                                        <i className="fa fa-times" style={{color: '#f44336'}}></i>
                                    )}</td>
                                    <td>
                                        <LinkContainer to={`/order/${order._id}`}>
                                            <Button variant='light' className='btn-sm'>Details</Button>
                                        </LinkContainer>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                )}
            </Col>
        </Row>
    )
}

export default Profile
