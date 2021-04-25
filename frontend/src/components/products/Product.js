import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import Rating from './Rating'

const defaultImg = 'https://res.cloudinary.com/dvmucrzt2/image/upload/v1619034866/default.png'

const Product = ({ product: { _id, image, name, rating, numReviews, price } }) => {
    const [img, setImg] = useState(image)

    const onError = () => {
        setImg(defaultImg)
    }

    return (
        <Card className='my-3 p-3 rounded'>
            <Link to={`/product/${_id}`}>
                <Card.Img
                    src={img}
                    variant='top'
                    onError={onError}
                />
            </Link>
            <Card.Body>
                <Link to={`/product/${_id}`}>
                    <Card.Title as="div">
                        <strong>{name}</strong>
                    </Card.Title>
                </Link>
                <Card.Text as="div">
                    <Rating
                        value={rating}
                        text={`${numReviews} reviews`}
                    />
                </Card.Text>
                <Card.Text as="h3">
                    ${price}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Product
