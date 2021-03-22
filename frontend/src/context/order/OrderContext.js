import { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { UserContext } from '../user/UserContext'
import { CartContext } from '../cart/CartContext'

export const OrderContext = createContext()

const OrderContextProvider = ({ children }) => {
    const { user } = useContext(UserContext)
    const { clearCart } = useContext(CartContext)

    const [order, setOrder] = useState(null)
    const [orders, setOrders] = useState([])
    const [error, setError] = useState(null)
    const [orderSuccess, setOrderSuccess] = useState(false)
    const [paySuccess, setPaySuccess] = useState(false)
    const [payLoading, setPayLoading] = useState(false)
    const [loading, setLoading] = useState(false)

    // create an order
    const createOrder = async (order) => {
        setOrderSuccess(false)
        setError(null)
        setLoading(true)
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json', 
                    Authorization: user.token
                }
            }
            const {data} = await axios.post('/api/orders', order, config)
            setOrder(data)
            setOrderSuccess(true)
            setLoading(false)
            clearCart()
        } catch (err) {
            console.log(err)
            setError(err.response.data.message)
            setLoading(false)
        }
    }

    // fetch order details 
    const fetchOrderDetails = async (id) => {
        setOrder(null)
        setError(null)
        setLoading(true)
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json', 
                    Authorization: user.token
                }
            }
            const {data} = await axios.get(`/api/orders/${id}`, config)
            setOrder(data)
            setLoading(false)
        } catch (err) {
            console.log(err)
            setError(err.response.data.message)
            setLoading(false)
        }
    } 

    // pay order
    const payOrder = async (orderId, paymentResult) => {
        setPaySuccess(false)
        setPayLoading(true)
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json', 
                    Authorization: user.token
                }
            }
            const {data} = await axios.put(`/api/orders/${orderId}/pay`, paymentResult, config)
            setOrder(data)
            setPaySuccess(true)
            setPayLoading(false)
        } catch (err) {
            console.log(err)
            setError(err.response.data.message)
            setPayLoading(false)
        }
    }

    // pay reset
    const payReset = () => {
        setPaySuccess(false)
    }

    // user order list
    const listUserOrders = async () => {
        setLoading(true)
        setOrders([])
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json', 
                    Authorization: user.token
                }
            }
            const {data} = await axios.get('/api/orders', config)
            setOrders(data)
            setLoading(false)
        } catch (err) {
            console.log(err)
            setError(err.response.data.message)
            setLoading(false)
        }
    }

    useEffect(() => {
        if (!user) {
            setOrder(null)
            setOrders([])
        }
    }, [user])

    return (
        <OrderContext.Provider
            value={{
                order, 
                orders,
                error, 
                orderSuccess, 
                paySuccess, 
                payLoading,
                loading,
                createOrder, 
                fetchOrderDetails, 
                payOrder, 
                payReset, 
                listUserOrders
            }}
        >
            {children}
        </OrderContext.Provider>
    )
}

export default OrderContextProvider
