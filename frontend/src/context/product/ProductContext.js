import {createContext, useContext, useState} from 'react'
import axios from 'axios'
import { UserContext } from '../user/UserContext'

export const ProductContext = createContext()

const ProductContextProvider = (props) => {
    const { user } = useContext(UserContext)

    const [products, setProducts] = useState([])
    const [product, setProduct] = useState(null)
    const [deleteSuccess, setDeleteSuccess] = useState(false)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // fetch products
    const fetchProducts = async () => {
        setProducts([])
        setError(null)
        setLoading(true)
        try {
            const {data} = await axios.get('/api/products')
            setProducts(data)
            setLoading(false)
        } catch (err) {
            console.log(err)
            setError(err.response.data.message)
            setLoading(false)
        }
    } 

    // fetch a single product
    const fetchProduct = async (id) => {
        setProduct(null)
        setError(null)
        setLoading(true)
        try {
            const {data} = await axios.get(`/api/products/${id}`)
            setProduct(data)
            setLoading(false)
        } catch (err) {
            console.log(err)
            setError(err.response.data.message)
            setLoading(false)
        }
    }

    // delere product
    const deleteProduct = async (id) => {
        setDeleteSuccess(false)
        setLoading(true)
        try {
            const customConfig = {
                headers: {...config.headers, Authorization: user.token}
            }
            await axios.delete(`/api/products/${id}`, customConfig)
            setDeleteSuccess(true)
            setLoading(false)
        } catch (err) {
            console.log(err)
            setError(err.response.data.message)
            setLoading(false)
        }
    }

    const clearCurrent = () => {
        setProduct(null)
    }

    return (
        <ProductContext.Provider
            value={{
                products, 
                product,
                error,
                deleteSuccess, 
                loading,
                fetchProducts, 
                fetchProduct, 
                deleteProduct
            }}
        >
            {props.children}
        </ProductContext.Provider>
    )
} 

export default ProductContextProvider
