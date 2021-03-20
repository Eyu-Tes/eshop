import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Form , Col, Row } from 'react-bootstrap'
import Message from '../../components/layout/Message'
import FormContainer from '../../components/layout/FormContainer'
import { UserContext } from '../../context/user/UserContext'

const Login = ({ history, location }) => {
    const { user, error, loading, login } = useContext(UserContext)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const redirect = location.search.split('=')[1]

    const submitHandler = e => {
        e.preventDefault()
        login(email, password)
    }

    useEffect(() => {
        if (user) {
            history.push(redirect || '/')
        }
    }, [user, history, redirect])

    return (
        loading ? null : (
        <FormContainer>
            <h1>Sign In</h1>
            {error && <Message type='danger'>{error}</Message>}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Enter email'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter password'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary'>Sign In</Button>
            </Form>
            <Row className='py-3'>
                <Col>
                    New Customer? {' '}
                    <Link to={redirect ? `/signup?redirect=${redirect}` : '/signup'}>Register</Link>
                </Col>
            </Row>
        </FormContainer>
        )
    )
}

export default Login
