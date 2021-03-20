import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Form , Col, Row } from 'react-bootstrap'
import Message from '../../components/layout/Message'
import Loader from '../../components/layout/Loader'
import { UserContext } from '../../context/user/UserContext'

const Profile = ({ history}) => {
    const { user, error, updateSuccess, loading, updateUserProfile } = useContext(UserContext)

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
        if (user) {
            setValues({...values, name: user.name, email: user.email})
        }
        else {
            history.push('/signin')
        }
    }, [user, history])

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
            </Col>
        </Row>
    )
}

export default Profile
