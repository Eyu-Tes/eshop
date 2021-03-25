import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Button, Form, Col, Row } from 'react-bootstrap'
import Message from '../../components/layout/Message'
import Loader from '../../components/layout/Loader'
import FormContainer from '../../components/layout/FormContainer'
import { UserContext } from '../../context/user/UserContext'
import { ProductContext } from '../../context/product/ProductContext'

const ProductForm = ({ history, match}) => {
    const targetProductId = match.params.id

    const { user} = useContext(UserContext)
    const {
        product, 
        formSuccess, 
        loading, 
        error, 
        fetchProduct, 
        createProduct, 
        updateProduct, 
        reset
    } = useContext(ProductContext)

    const initialValues = {
        name: '',
        price: 0, 
        brand: '', 
        category: '', 
        countInStock: 0, 
        description: ''
    }
    const [values, setValues] = useState(initialValues)
    const [image, setImage] = useState('')
    const [uploading, setUploading] = useState(false)
    const {name, price, brand, category, countInStock, description} = values

    const submitHandler = e => {
        const data = {...values, image}
        e.preventDefault()
        targetProductId ? updateProduct(targetProductId, data) : createProduct(data)
    }

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        setUploading(true)
        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            const {data} = await axios.post('/api/upload', formData, config)
            setImage(data)
            setUploading(false)
        } catch (err) {
            console.log(err)
            setUploading(false)
        }
    }

    const onChange = e => {
        setValues({...values, [e.target.name]: e.target.value})
    }

    useEffect(() => {
        if (formSuccess) {
            reset()
            history.push('/admin/products')
        }
        else {
            if (user && user.isAdmin) {
                if (product && (product._id === targetProductId)) {
                    setValues({...product})
                }
                else {
                    targetProductId && fetchProduct(targetProductId)
                }
            }
            else {
                history.push('/signin')
            }
        }
    }, [user, product, formSuccess, history])

    return (
        loading ? null : (
        <>
            <Link to='/admin/products' className='btn btn-light my-3'>Go Back</Link>
            <FormContainer>
                <h1>{targetProductId ? 'Edit Product Information' : 'Create New Product'}</h1>
                {error && <Message type='danger'>{error}</Message> }
                <Form onSubmit={submitHandler}>
                    <Row>
                        <Col md={6}>
                            <Form.Group controlId='name'>
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Enter username'
                                    autoFocus
                                    name='name'
                                    value={name}
                                    onChange={onChange}
                                ></Form.Control>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId='price'>
                                <Form.Label>Price</Form.Label>
                                <Form.Control
                                    type='number'
                                    placeholder='Enter price'
                                    name='price'
                                    value={price}
                                    onChange={onChange}
                                ></Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <Form.Group controlId='image'>
                                <Form.Label>Image</Form.Label>
                                <div>{image}</div>
                                <Form.File 
                                    id='image-file' 
                                    label='Choose File'
                                    custom
                                    onChange={uploadFileHandler}
                                ></Form.File>
                                {uploading  && <Loader/>}
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId='brand'>
                                <Form.Label>Brand</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Enter brand'
                                    name='brand'
                                    value={brand}
                                    onChange={onChange}
                                ></Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <Form.Group controlId='countInStock'>
                                <Form.Label>Count In Stock</Form.Label>
                                <Form.Control
                                    type='number'
                                    placeholder='Enter count in stock'
                                    name='countInStock'
                                    value={countInStock}
                                    onChange={onChange}
                                ></Form.Control>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId='category'>
                                <Form.Label>Category</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Enter category'
                                    name='category'
                                    value={category}
                                    onChange={onChange}
                                ></Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Form.Group controlId='description'>
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Enter description'
                            name='description'
                            value={description}
                            onChange={onChange}
                        ></Form.Control>
                    </Form.Group>
                    <Button type='submit' variant='primary'>
                        {targetProductId ? 'Update' : 'Create'}
                    </Button>
                </Form>
            </FormContainer>
        </>
        )
    )
}

export default ProductForm
