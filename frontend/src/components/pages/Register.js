import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Form , Col, Row } from 'react-bootstrap'
import Message from '../../components/layout/Message'
import FormContainer from '../../components/layout/FormContainer'
import { UserContext } from '../../context/user/UserContext'

const Register = ({ history}) => {
    const { user, error, loading, register } = useContext(UserContext)

    const initialValues = {
        name: '',
        email: '', 
        password: '', 
        password2: ''
    }
    const [values, setValues] = useState(initialValues)
    const [message, setMessage] = useState(null)
    const [submitted, setSubmitted] = useState(false)
    const {name, email, password, password2} = values

    const onChange = e => {
        setValues({...values, [e.target.name]: e.target.value})
    }

    const submitHandler = e => {
        e.preventDefault()
        setMessage(null)
        if(name === '' || email === '' || password === '') {
            setMessage("Please fill all fields")
        }
        else if(password !== password2) {
            setMessage("Passwords do not match")
        }
        else {
            register(name, email, password)
        }
    }

    useEffect(() => {
        if (user) {
            history.push('/')
        }
    }, [user, history])

    return (
        loading ? null : (
        <FormContainer>
            <h1>Sign Up</h1>
            {(error && submitted) && <Message type='danger'>{error}</Message>}
            {message && <Message type='danger'>{message}</Message>}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter username'
                        autoFocus
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
                <Button type='submit' variant='primary'>Sign Up</Button>
            </Form>
            <Row className='py-3'>
                <Col>
                    Already have an account? {' '}
                    <Link to='/signin'>Login</Link>
                </Col>
            </Row>
        </FormContainer>
        )
    )
}

export default Register
