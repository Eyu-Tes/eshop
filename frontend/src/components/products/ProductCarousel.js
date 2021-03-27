import { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'
import Loader from '../layout/Loader'
import Message from '../layout/Message'
import { ProductContext } from '../../context/product/ProductContext'

const ProductCarousel = () => {
    const { topProducts, loading, error, getTopProducts } = useContext(ProductContext)

    useEffect(() => {
        getTopProducts()
    }, [])

    return (
        error ? <Message type='danger'>{error}</Message> : (
            <Carousel
            pause='hover'
            className='bg-dark'
            >
                {topProducts.map(product => (
                    <Carousel.Item key={product._id}>
                        <Link to={`/product/${product._id}`}>
                            <Image src={product.image} alt={product.name} fluid />
                            <Carousel.Caption className='carousel-caption'>
                                <h2>{product.name} (${product.price})</h2>
                            </Carousel.Caption>
                        </Link>
                    </Carousel.Item>
                ))}
            </Carousel>
        )
    )
}

export default ProductCarousel
