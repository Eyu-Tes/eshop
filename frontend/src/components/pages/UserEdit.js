import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Form } from 'react-bootstrap'
import Message from '../../components/layout/Message'
import FormContainer from '../../components/layout/FormContainer'
import { UserContext } from '../../context/user/UserContext'

const UserEdit = ({ history, match}) => {
    const targetUserId = match.params.id

    const { 
        user, 
        targetUser, 
        updateSuccess, 
        error, 
        loading, 
        getUserInfo, 
        adminUpdateUser, 
        reset
    } = useContext(UserContext)

    const initialValues = {
        name: '',
        email: ''
    }
    const [values, setValues] = useState(initialValues)
    const [isAdmin, setIsAdmin] = useState(false)
    const {name, email} = values

    const onChange = e => {
        setValues({...values, [e.target.name]: e.target.value})
    }

    const submitHandler = e => {
        e.preventDefault()
        adminUpdateUser({_id: targetUser._id, name, email, isAdmin})
    }

    useEffect(() => {
        if (updateSuccess) {
            reset()
            history.push('/admin/users')
        }
        else {
            if (user && user.isAdmin) {
                if (targetUser && (targetUser._id === targetUserId)) {
                    setValues({name: targetUser.name, email: targetUser.email})
                    setIsAdmin(targetUser.isAdmin)
                }
                else {
                    getUserInfo(targetUserId)
                }
            }
            else {
                history.push('/signin')
            }
        }
    }, [user, targetUser, history])

    return (
        loading ? null : (
        <>
            <Link to='/admin/users' className='btn btn-light my-3'>Go Back</Link>
            <FormContainer>
                <h1>Edit User Information</h1>
                {error && <Message type='danger'>{error}</Message> }
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
                    <Form.Group controlId='isadmin'>
                        <Form.Check
                            type='checkbox'
                            label='Is Admin'
                            name='isAdmin'
                            checked={isAdmin}
                            onChange={e => setIsAdmin(e.target.checked)}
                        ></Form.Check>
                    </Form.Group>
                    <Button type='submit' variant='primary'>Update</Button>
                </Form>
            </FormContainer>
        </>
        )
    )
}

export default UserEdit
