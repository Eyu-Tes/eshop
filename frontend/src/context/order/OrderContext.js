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
    const [deliverSuccess, setDeliverSuccess] = useState(false)
    const [payLoading, setPayLoading] = useState(false)
    const [loading, setLoading] = useState(false)

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // create an order
    const createOrder = async (order) => {
        setOrderSuccess(false)
        setError(null)
        setLoading(true)
        try {
            const customConfig = {
                headers: {...config.headers, Authorization: user.token}
            }
            const {data} = await axios.post('/api/orders', order, customConfig)
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
            const customConfig = {
                headers: {...config.headers, Authorization: user.token}
            }
            const {data} = await axios.get(`/api/orders/${id}`, customConfig)
            setOrder(data)
            setLoading(false)
        } catch (err) {
            console.log(err)
            setError(err.response.data.message)
            setLoading(false)
        }
    } 

    // user order list
    const listUserOrders = async () => {
        setLoading(true)
        setOrders([])
        try {
            const customConfig = {
                headers: {...config.headers, Authorization: user.token}
            }
            const {data} = await axios.get('/api/orders/myorders', customConfig)
            setOrders(data)
            setLoading(false)
        } catch (err) {
            console.log(err)
            setError(err.response.data.message)
            setLoading(false)
        }
    }

    // fetch all orders 
    const fetchAllOrders = async () => {
        setOrders([])
        setLoading(true)
        try {
            const customConfig = {
                headers: {...config.headers, Authorization: user.token}
            }
            const {data} = await axios.get('/api/orders/', customConfig)
            setOrders(data)
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
            const customConfig = {
                headers: {...config.headers, Authorization: user.token}
            }
            const {data} = await axios.put(`/api/orders/${orderId}/pay`, paymentResult, customConfig)
            setOrder(data)
            setPaySuccess(true)
            setPayLoading(false)
        } catch (err) {
            console.log(err)
            setError(err.response.data.message)
            setPayLoading(false)
        }
    }

    // deliver order
    const deliverOrder = async (orderId) => {
        setDeliverSuccess(false)
        setLoading()
        try {
            const customConfig = {
                headers: {...config.headers, Authorization: user.token}
            }
            const {data} = await axios.put(`/api/orders/${orderId}/deliver`, {}, customConfig)
            setOrder(data)
            setDeliverSuccess(true)
            setLoading(false)
        } catch (err) {
            console.log(err)
            setError(err.response.data.message)
            setLoading(false)
        }
    }

    // reset states
    const reset = () => {
        setPaySuccess(false)
        setOrderSuccess(false)
        setDeliverSuccess(false)
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
                listUserOrders, 
                fetchAllOrders, 
                payOrder, 
                deliverOrder,
                reset
            }}
        >
            {children}
        </OrderContext.Provider>
    )
}

export default OrderContextProvider
