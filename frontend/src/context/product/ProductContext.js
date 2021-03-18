import {createContext, useState} from 'react'
import axios from 'axios'

export const ProductContext = createContext()

const ProductContextProvider = (props) => {
    const [products, setProducts] = useState([])
    const [product, setProduct] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

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

    return (
        <ProductContext.Provider
            value={{
                products, 
                product,
                error,
                loading,
                fetchProducts, 
                fetchProduct
            }}
        >
            {props.children}
        </ProductContext.Provider>
    )
} 

export default ProductContextProvider
