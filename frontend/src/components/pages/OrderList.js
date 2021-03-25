import { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Button, Table, Row, Col } from 'react-bootstrap'
import Message from '../../components/layout/Message'
import Loader from '../../components/layout/Loader'
import { UserContext } from '../../context/user/UserContext'
import { OrderContext } from '../../context/order/OrderContext'


const OrderList = ({ history, match }) => {
    const { user } = useContext(UserContext)
    const { orders, error, deleteSuccess, loading, fetchAllOrders} = useContext(OrderContext)

    const createProductHandler = () => {
        history.push('/admin/products/form')
    }

    useEffect(() => {
        if (!(user && user.isAdmin)) {
            history.push('/signin')
        }
        else {
            fetchAllOrders()   
        }
    }, [user, history])

    return (
        <>
            <h1>Orders</h1>
            {loading ? <Loader/> : ( error ? <Message type='danger'>{error}</Message> : 
                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>USER</th>
                            <th>DATE</th>
                            <th>TOTAL PRICE</th>
                            <th>PAID</th>
                            <th>DELIVERED</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order._id}>
                                <td>{order._id.substring(0, 5)}...</td>
                                <td>{order.user && order.user.name}</td>
                                <td>{order.createdAt.substring(0, 10)}</td>
                                <td>{order.totalPrice}</td>
                                <td>
                                    {order.isPaid
                                    ? <i className='fa fa-check' style={{color: '#4caf50'}} /> 
                                    : <i className='fa fa-times' style={{color: '#f44336'}} /> }
                                </td>
                                <td>
                                    {order.isDelivered
                                    ? <i className='fa fa-check' style={{color: '#4caf50'}} /> 
                                    : <i className='fa fa-times' style={{color: '#f44336'}} /> }
                                </td>
                                <td>
                                    <LinkContainer to={`/order/${order._id}`}>
                                        <Button variant='light' className='btn-sm'>
                                            Details
                                        </Button>
                                    </LinkContainer>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </>
    )
} 

export default OrderList
