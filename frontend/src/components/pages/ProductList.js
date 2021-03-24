import { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Button, Table, Row, Col } from 'react-bootstrap'
import Message from '../../components/layout/Message'
import Loader from '../../components/layout/Loader'
import { UserContext } from '../../context/user/UserContext'
import { ProductContext } from '../../context/product/ProductContext'


const ProductList = ({ history, match }) => {
    const { user } = useContext(UserContext)
    const { products, error, deleteSuccess, loading, fetchProducts, deleteProduct} = useContext(ProductContext)

    const createProductHandler = () => {
        history.push('/admin/products/form')
    }

    const deleteHandler = (id) => {
        if (window.confirm('Sure u want to delete product?')) {
            deleteProduct(id)
        }
    }

    useEffect(() => {
        if (!(user && user.isAdmin)) {
            history.push('/signin')
        }
        else {
            fetchProducts()   
        }
    }, [user, deleteSuccess, history])

    return (
        <>
            <Row className='align-items-center'>
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col className='text-right'>
                    <Button className='my-3' onClick={createProductHandler}>
                        <i className="fa fa-plus mr-1"></i> Create Product
                    </Button>
                </Col>
            </Row>
            {error && <Message type='danger'>{error}</Message>}
            {loading ? <Loader/> : (
                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>PRICE</th>
                            <th>CATEGORY</th>
                            <th>BRAND</th>
                            <th>In Stock</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product._id}>
                                <td>{product._id.substring(0, 5)}...</td>
                                <td><a href={`/product/${product._id}`}>{product.name}</a></td>
                                <td>${product.price}</td>
                                <td>{product.category}</td>
                                <td>{product.brand}</td>
                                <td>
                                    {product.countInStock > 0
                                    ? <i className='fa fa-check' style={{color: '#4caf50'}} /> 
                                    : <i className='fa fa-times' style={{color: '#f44336'}} /> }
                                </td>
                                <td>
                                    <LinkContainer to={`/admin/products/form/${product._id}`}>
                                        <Button variant='light' className='btn-sm'>
                                            <i className="fa fa-edit" />
                                        </Button>
                                    </LinkContainer>
                                    <Button 
                                        variant='danger' 
                                        className='btn-sm' 
                                        onClick={() => deleteHandler(product._id)}
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

export default ProductList
