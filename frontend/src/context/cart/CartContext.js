import { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'

export const CartContext = createContext()

const CartContextProvider = (props) => {
    const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem('cartItems')) || [])
    const [shippingInfo, setShippingInfo] = useState(JSON.parse(localStorage.getItem('shippingInfo')) || null)
    const [paymentMethod, setPaymentMethod] = useState(JSON.parse(localStorage.getItem('paymentMethod')) || null)

    // add item to cart
    const addToCart = async (id, qty) => {
        try {
            const { data } = await axios.get(`/api/products/${id}`)
            const item = {
                product: data._id, 
                name: data.name, 
                image: data.image, 
                price: data.price, 
                countInStock: data.countInStock, 
                qty
            }

            const existingItem = cartItems.find(cartItem => cartItem.product === item.product)

            if (existingItem) {
                setCartItems(cartItems.map(cartItem => 
                    cartItem.product === existingItem.product ? item : cartItem
                ))
            }
            else {
                setCartItems([...cartItems, item])
            } 

            
        } catch (err) {
            console.log(err)
        }
    }

    // remove item from cart
    const removeFromCart = (id) => {
        setCartItems(cartItems.filter(cartItem => cartItem.product !== id))
    }

    // save shipping information
    const saveShippingInfo = (data) => {
        localStorage.setItem('shippingInfo', JSON.stringify(data))
        setShippingInfo(data)
    }

    // save payment method
    const savePaymentMethod = (data) => {
        localStorage.setItem('paymentMethod', JSON.stringify(data))
        setPaymentMethod(data)
    }

    // clear cart
    const clearCart = () => {
        setCartItems([])
    }

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems))
    }, [cartItems])

    return (
        <CartContext.Provider 
            value={{
                cartItems,
                shippingInfo,
                paymentMethod,
                addToCart, 
                removeFromCart, 
                saveShippingInfo, 
                savePaymentMethod, 
                clearCart
            }}
        >
            {props.children}
        </CartContext.Provider>
    )
}

export default CartContextProvider
