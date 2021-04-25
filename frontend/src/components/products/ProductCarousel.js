import { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'
import Loader from '../layout/Loader'
import Message from '../layout/Message'
import { ProductContext } from '../../context/product/ProductContext'

const defaultImg = 'https://res.cloudinary.com/dvmucrzt2/image/upload/v1619034866/default.png'

const ProductCarousel = () => {
    const { topProducts, loading, error, getTopProducts } = useContext(ProductContext)

    useEffect(() => {
        getTopProducts()
    }, [])

    return (
        error ? <Message type='danger'>{error}</Message> : (
            <Carousel
                pause='hover'
                className='bg-secondary'
            >
                {topProducts.map(product => (
                    <Carousel.Item key={product._id}>
                        <Link to={`/product/${product._id}`}>
                            {product.Image}
                            <Image src={product.image || defaultImg} alt={product.name} fluid />
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
