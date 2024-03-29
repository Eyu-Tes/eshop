import {createContext, useContext, useState} from 'react'
import axios from 'axios'
import { UserContext } from '../user/UserContext'

export const ProductContext = createContext()

const ProductContextProvider = (props) => {
    const { user } = useContext(UserContext)

    const [products, setProducts] = useState([])
    const [product, setProduct] = useState(null)
    const [topProducts, setTopProducts] = useState([])
    const [pageObj, setPageObj] = useState('')
    const [formSuccess, setFormSuccess] = useState(false)
    const [deleteSuccess, setDeleteSuccess] = useState(false)
    const [error, setError] = useState(null)
    const [reviewError, setReviewError] = useState(null)
    const [loading, setLoading] = useState(false)

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // fetch products
    const fetchProducts = async (keyword='', page='', limit='') => {
        setProducts([])
        setError(null)
        setLoading(true)
        try {
            const {data} = await axios
            .get(`/api/products?keyword=${keyword}&page=${page}&limit=${limit}`)
            setProducts(data.products)
            setPageObj(data.pageObj)
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

    // delete product
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

    // create product
    const createProduct = async (newProduct) => {
        setProduct(null)
        setError(null)
        setFormSuccess(false)
        setLoading(true)
        try {
            const customConfig = {
                headers: {...config.headers, Authorization: user.token}
            }
            
            const {data} = await axios.post('/api/products', newProduct, customConfig)
            setProduct(data)
            setFormSuccess(true)
            setLoading(false)
        } catch (err) {
            console.log(err)
            setError(err.response.data.message)
            setLoading(false)
        }
    }

    // update product
    const updateProduct = async (id, targetProduct) => {
        setError(null)
        setFormSuccess(false)
        setLoading(true)
        try {
            const customConfig = {
                headers: {...config.headers, Authorization: user.token}
            }
            
            const {data} = await axios.put(`/api/products/${id}`, targetProduct, customConfig)
            setProduct(data)
            setFormSuccess(true)
            setLoading(false)
        } catch (err) {
            console.log(err)
            setError(err.response.data.message)
            setLoading(false)
        }
    }

    // create product rating
    const createProductReview = async (prodId, review) => {
        setReviewError(null)
        setLoading(true)
        try {
            const customConfig = {
                headers: {...config.headers, Authorization: user.token}
            }
            const {data} = await axios.post(`/api/products/${prodId}/reviews`, review, customConfig)
            setProduct(data)
            setLoading(false)
        } catch (err) {
            console.log(err)
            setReviewError(err.response.data.message)
            setLoading(false)
        }
    }

    // get top rated products
    const getTopProducts = async () => {
        setLoading(true)
        try {
            const {data} = await axios.get('/api/products/top')
            setTopProducts(data)
            setLoading(false)
        } catch (err) {
            console.log(err)
            setError(err.response.data.message)
            setLoading(false)
        }
    }

    // reset states
    const reset = () => {
        setProduct(null)
        setFormSuccess(false)
        setError(null)
    }

    return (
        <ProductContext.Provider
            value={{
                products, 
                product,
                topProducts, 
                pageObj,
                error,
                reviewError, 
                formSuccess,
                deleteSuccess, 
                loading,
                fetchProducts, 
                fetchProduct, 
                deleteProduct, 
                createProduct, 
                updateProduct, 
                createProductReview,
                getTopProducts,
                reset
            }}
        >
            {props.children}
        </ProductContext.Provider>
    )
} 

export default ProductContextProvider
