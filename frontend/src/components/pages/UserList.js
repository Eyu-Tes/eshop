import { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Button, Table } from 'react-bootstrap'
import Message from '../../components/layout/Message'
import Loader from '../../components/layout/Loader'
import { UserContext } from '../../context/user/UserContext'


const UserList = ({ history }) => {
    const { user, users, error, deleteSuccess, loading, listUsers, deleteUser } = useContext(UserContext)

    const deleteHandler = (id) => {
        if (window.confirm('Sure u want to delete user?')) {
            deleteUser(id)
        }
    }

    useEffect(() => {
        if (user && user.isAdmin) {
            listUsers()
        }
        else {
            history.push('/signin')
        }
    }, [user, deleteSuccess, history])

    return (
        <>
            <h1>Users</h1>
            {loading ? <Loader/> : ( error ? <Message type='danger'>{error}</Message> : 
                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>EMALI</th>
                            <th>ADMIN</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id}>
                                <td>{user._id.substring(0, 5)}...</td>
                                <td>{user.name}</td>
                                <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                                <td>
                                    {user.isAdmin 
                                    ? <i className='fa fa-check' style={{color: '#4caf50'}} /> 
                                    : <i className='fa fa-times' style={{color: '#f44336'}} /> }
                                </td>
                                <td>
                                    <LinkContainer to={`/admin/users/${user._id}/edit`}>
                                        <Button variant='light' className='btn-sm'>
                                            <i className="fa fa-edit" />
                                        </Button>
                                    </LinkContainer>
                                    <Button 
                                        variant='danger' 
                                        className='btn-sm' 
                                        onClick={() => deleteHandler(user._id)}
                                    >
                                            <i className="fa fa-trash" />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            ) }
        </>
    )
} 

export default UserList
